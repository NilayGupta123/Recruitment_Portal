from __future__ import annotations

from io import BytesIO
from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File as FastAPIFile, status
from fastapi.responses import RedirectResponse, StreamingResponse
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.applicant import ReadApplicantProfile
from app.db.session import get_db
from app.models.applicant import Applicant
from app.models.user import User , UserType
from app.models.applicant import ApplicantDetail
from app.models.file import File as FileRecord
from app.routers.auth import get_current_user

from app.schemas.applicant import CreateApplicant, ReadApplicantCore, UpdateApplicant, PartialUpdateApplicant, ReadApplicantProfile, MyApplication
from app.models.job import Job
from app.services.storage import S3StorageManager

router = APIRouter(prefix="/applicants", tags=["applicants"])


def build_resume_detail_payload(details: ApplicantDetail | None, file_record: FileRecord | None = None):
    if details is None:
        return None

    resume_url = None
    resume_name = None
    if file_record is not None:
        resume_name = file_record.file_name
        storage = S3StorageManager()
        # Prefer a direct S3 (or still-valid) URL so the browser doesn't hit the Vite host.
        resume_url = storage.resolve_download_url(file_record.file_link)
        if not resume_url and file_record.id is not None:
            # Fall back to API file proxy (frontend must prefix API base URL).
            resume_url = f"/applicants/files/{file_record.id}"

    # SQLAlchemy instance dict includes internal keys; strip those.
    raw = {k: v for k, v in details.__dict__.items() if not k.startswith("_")}
    return {
        **raw,
        "resume_file_url": resume_url,
        "resume_file_name": resume_name,
    }


@router.get("/list", response_model=List[ReadApplicantCore])
async def list_applicants(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> List[ReadApplicantCore]:

    result = await db.execute(select(Applicant).order_by(Applicant.id))
    return list(result.scalars().all())


@router.post("/applicant-register", response_model=ReadApplicantCore, status_code=status.HTTP_201_CREATED)
async def create_applicant(payload: CreateApplicant, db: AsyncSession = Depends(get_db)) -> ReadApplicantCore:

    result = await db.execute(select(User).where(User.email == payload.email))
    applicant_user = result.scalar_one_or_none()
    if not applicant_user:
        
        print("\n\n got new user \n\n")

        applicant_user = User(
            email=payload.email,
            full_name=payload.full_name,
            user_type=UserType.APPLICANT,
            password="PENDING_SIGNUP",
            phone_number=payload.phone_number,
            is_registered=False,
        )
        db.add(applicant_user)
        await db.flush()

    else:
        applicant_user.full_name = payload.full_name
        applicant_user.phone_number = payload.phone_number
    
    applicant = Applicant(
        job_id=payload.job_id,
        applicant_id=applicant_user.id,
        status=payload.status
    )
    db.add(applicant)

    try:
        await db.flush()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="You have already applied for this job")

    print(f"applicant created with id {applicant.id}" )

    detail_result = await db.execute(
        select(ApplicantDetail).where(
            ApplicantDetail.applicant_id == applicant_user.id
        )
    )

    applicant_details = detail_result.scalar_one_or_none()

    if applicant_details is None:

        applicant_details = ApplicantDetail(
            applicant_id=applicant_user.id,
            address=payload.address,
            linkedin_url=payload.linkedin_url,
            github_url=payload.github_url,
            years_of_experience=payload.years_of_experience,
            resume_file=payload.resume_file,
            current_company=payload.current_company,
            current_ctc=payload.current_ctc,
            expected_ctc=payload.expected_ctc,
            notice_period=payload.notice_period,
        )

        db.add(applicant_details)

    else:

        applicant_details.address = payload.address
        applicant_details.linkedin_url = payload.linkedin_url
        applicant_details.github_url = payload.github_url
        applicant_details.years_of_experience = payload.years_of_experience
        applicant_details.resume_file = payload.resume_file
        applicant_details.current_company = payload.current_company
        applicant_details.current_ctc = payload.current_ctc
        applicant_details.expected_ctc = payload.expected_ctc
        applicant_details.notice_period = payload.notice_period
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="You have already applied for this job")
    await db.refresh(applicant)
    return applicant


@router.get("/get/{applicant_id}", response_model=ReadApplicantCore)
async def get_applicant(applicant_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantCore:

    result = await db.execute(select(Applicant).where(Applicant.id == applicant_id))
    applicant = result.scalar_one_or_none()
    if not applicant:
        raise HTTPException(status_code=404,detail="Application not found")
    return applicant

@router.put("/put/{applicant_id}", response_model=ReadApplicantCore)
async def update_applicant(applicant_id: int, payload: UpdateApplicant, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantCore:
    result = await db.execute(select(Applicant).where(Applicant.id == applicant_id))
    applicant = result.scalar_one_or_none()
    if not applicant:
        raise HTTPException(status_code=404, detail="Application not found")

    applicant.status = payload.status

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Application update failed")
    await db.refresh(applicant)
    return applicant


@router.patch("/patch/{applicant_id}", response_model=ReadApplicantCore)
async def patch_applicant(applicant_id: int, payload: PartialUpdateApplicant, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantCore:
    result = await db.execute(select(Applicant).where(Applicant.id == applicant_id))
    applicant = result.scalar_one_or_none()
    if not applicant:
        raise HTTPException(status_code=404, detail="Application not found")

    if payload.status is not None:
        applicant.status = payload.status

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Application update failed")
    await db.refresh(applicant)
    return applicant


@router.get("/profile/{application_id}", response_model=ReadApplicantProfile)
async def get_applicant_profile(application_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Applicant).where(Applicant.id == application_id))
    application = result.scalar_one_or_none()

    if application is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )

    user_result = await db.execute(select(User).where(User.id == application.applicant_id))
    user = user_result.scalar_one()
    detail_result = await db.execute(select(ApplicantDetail).where(ApplicantDetail.applicant_id == application.applicant_id))
    details = detail_result.scalar_one_or_none()

    file_record = None
    if details and details.resume_file is not None:
        file_result = await db.execute(select(FileRecord).where(FileRecord.id == details.resume_file))
        file_record = file_result.scalar_one_or_none()

    return {
        "application_id": application.id,
        "job_id": application.job_id,
        "status": application.status,
        "applied_at": application.applied_at,
        "user": user,
        "details": build_resume_detail_payload(details, file_record),
    }


@router.get("/files/{file_id}")
async def get_uploaded_file(file_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FileRecord).where(FileRecord.id == file_id))
    file_record = result.scalar_one_or_none()

    if file_record is None:
        raise HTTPException(status_code=404, detail="File not found")

    file_link = file_record.file_link or ""
    storage = S3StorageManager()

    # Always try a fresh S3 signed URL first (works for keys and legacy signed URLs).
    signed = storage.resolve_download_url(file_link)
    if signed and signed.startswith(("http://", "https://")):
        return RedirectResponse(url=signed, status_code=307)

    # Local / fallback stream.
    key = storage.extract_key_from_url(file_link) or file_link
    try:
        file_data = storage.get_file(key)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail="File not found") from exc

    filename = (file_record.file_name or "file").replace('"', "")
    return StreamingResponse(
        BytesIO(file_data["body"]),
        media_type=file_record.file_type or "application/octet-stream",
        headers={
            "Content-Disposition": f'inline; filename="{filename}"'
        },
    )

@router.get("/my", response_model=list[MyApplication])
async def get_my_applications(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Applicant, Job).join(Job, Applicant.job_id == Job.id).where(Applicant.applicant_id == current_user.id).order_by(Applicant.applied_at.desc()))
    rows = result.all()
    return [
        {
            "id": application.id,
            "job_id": job.id,
            "job_title": job.title,
            "status": application.status,
            "applied_at": application.applied_at,
        }
        for application, job in rows
    ]

@router.post("/apply/{job_id}")
async def apply_to_job(
    job_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    file: UploadFile | None = FastAPIFile(default=None),
):
    # Only applicants can apply
    if current_user.user_type != UserType.APPLICANT:
        raise HTTPException(
            status_code=403,
            detail="Only applicants can apply for jobs.",
        )

    # Check job exists
    result = await db.execute(
        select(Job).where(Job.id == job_id)
    )
    job = result.scalar_one_or_none()

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found.",
        )

    # Prevent duplicate applications
    result = await db.execute(
        select(Applicant).where(
            Applicant.job_id == job_id,
            Applicant.applicant_id == current_user.id,
        )
    )

    existing = result.scalar_one_or_none()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="You have already applied for this job.",
        )

    application = Applicant(
        job_id=job_id,
        applicant_id=current_user.id,
        status="Applied",
    )

    db.add(application)
    await db.flush()

    if file is not None and file.filename:
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

        detail_result = await db.execute(select(ApplicantDetail).where(ApplicantDetail.applicant_id == current_user.id))
        applicant_detail = detail_result.scalar_one_or_none()
        if applicant_detail is None:
            applicant_detail = ApplicantDetail(
                applicant_id=current_user.id,
                resume_file=db_file.id,
            )
            db.add(applicant_detail)
        else:
            applicant_detail.resume_file = db_file.id

    await db.commit()
    await db.refresh(application)

    return {
        "message": "Application submitted successfully.",
        "application_id": application.id,
    }