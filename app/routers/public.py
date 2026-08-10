from __future__ import annotations
from io import BytesIO
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File as FastAPIFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.user import User, UserType
from app.models.job import Job
from app.models.applicant import Applicant
from app.models.applicant import ApplicantDetail
from app.models.file import File as FileRecord
from app.schemas.public import CheckApplicantRequest, CheckApplicantResponse, ApplicantDetailsResponse, PublicApplicationCreate, PublicApplicationResponse, UploadResumeResponse
from app.schemas.campaign import ReadCampaign
from app.models.campaign import Campaign
from app.services.storage import S3StorageManager

router = APIRouter(prefix="/public", tags=["Public"])

@router.get("/jobs")
async def list_public_jobs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job))
    return result.scalars().all()

@router.get("/jobs/{job_id}")
async def get_public_job(job_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()

    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/check-applicant", response_model=CheckApplicantResponse)
async def check_applicant(payload: CheckApplicantRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if user is None:
        return {"exists": False}
    detail_result = await db.execute(
        select(ApplicantDetail).where(ApplicantDetail.applicant_id == user.id))
    details = detail_result.scalar_one_or_none()
    return {
        "exists": True,
        "applicant_id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "phone_number": user.phone_number,
        "details": ApplicantDetailsResponse(
            address=details.address if details else None,
            linkedin_url=details.linkedin_url if details else None,
            github_url=details.github_url if details else None,
            years_of_experience=details.years_of_experience if details else None,
            current_company=details.current_company if details else None,
            current_ctc=details.current_ctc if details else None,
            expected_ctc=details.expected_ctc if details else None,
            notice_period=details.notice_period if details else None,
            resume_file=details.resume_file if details else None,
        )
        if details
        else None,
    }

@router.post("/apply", response_model=PublicApplicationResponse)
async def apply_job(payload: PublicApplicationCreate, db: AsyncSession = Depends(get_db)):
    # ----------------------------------------
    # Check if user exists
    # ----------------------------------------

    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()

    # ----------------------------------------
    # Create anonymous applicant if required
    # ----------------------------------------

    if user is None:
        user = User(
            full_name=payload.full_name,
            email=payload.email,
            password="",                   # Will be updated after signup
            phone_number=payload.phone_number,
            user_type=UserType.APPLICANT,
            is_registered=False,
        )

        db.add(user)
        await db.flush()
    else:
        user.full_name = payload.full_name
        user.phone_number = payload.phone_number

    # ----------------------------------------
    # Applicant Detail
    # ----------------------------------------

    result = await db.execute(select(ApplicantDetail).where(ApplicantDetail.applicant_id == user.id))
    details = result.scalar_one_or_none()
    if details is None:
        details = ApplicantDetail(
            applicant_id=user.id,
            address=payload.address,
            linkedin_url=payload.linkedin_url,
            github_url=payload.github_url,
            years_of_experience=payload.years_of_experience,
            current_company=payload.current_company,
            current_ctc=payload.current_ctc,
            expected_ctc=payload.expected_ctc,
            notice_period=payload.notice_period,
            resume_file=payload.resume_file,
        )
        db.add(details)
    else:
        details.address = payload.address
        details.linkedin_url = payload.linkedin_url
        details.github_url = payload.github_url
        details.years_of_experience = payload.years_of_experience
        details.current_company = payload.current_company
        details.current_ctc = payload.current_ctc
        details.expected_ctc = payload.expected_ctc
        details.notice_period = payload.notice_period
        details.resume_file = payload.resume_file

    # ----------------------------------------
    # Prevent duplicate applications
    # ----------------------------------------

    result = await db.execute(
        select(Applicant).where(
            Applicant.job_id == payload.job_id,
            Applicant.applicant_id == user.id,
        )
    )
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="You have already applied for this job.")

    # ----------------------------------------
    # Create Application
    # ----------------------------------------

    application = Applicant(
        job_id=payload.job_id,
        applicant_id=user.id,
        status="Applied",
    )
    db.add(application)
    await db.commit()
    await db.refresh(application)
    return PublicApplicationResponse(
        success=True,
        application_id=application.id,
        applicant_id=user.id,
        message="Application submitted successfully.",
    )

@router.post("/upload-resume", response_model=UploadResumeResponse)
async def upload_resume(
    file: UploadFile = FastAPIFile(...),
    db: AsyncSession = Depends(get_db),
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file selected")

    storage = S3StorageManager()
    contents = await file.read()
    upload_result = storage.upload_file(
        file_obj=BytesIO(contents),
        file_name=file.filename,
        folder="resumes",
        content_type=file.content_type or "application/octet-stream",
    )

    db_file = FileRecord(
        file_type=file.content_type or "application/octet-stream",
        file_name=file.filename,
        # Prefer durable S3 object key over short-lived signed URLs.
        file_link=upload_result.get("key") or upload_result.get("url"),
    )
    db.add(db_file)
    await db.flush()
    await db.commit()
    await db.refresh(db_file)

    download_url = (
        storage.resolve_download_url(db_file.file_link)
        or upload_result.get("url")
        or f"/applicants/files/{db_file.id}"
    )

    return UploadResumeResponse(
        file_id=db_file.id,
        file_name=db_file.file_name or file.filename,
        file_link=download_url,
        message="File uploaded successfully.",
    )

@router.get("/campaigns", response_model=List[ReadCampaign])
async def list_public_campaigns(
    db: AsyncSession = Depends(get_db),
) -> List[ReadCampaign]:

    result = await db.execute(
        select(Campaign)
        .where(Campaign.status == "PUBLISHED")
        .order_by(Campaign.id)
    )

    return list(result.scalars().all())