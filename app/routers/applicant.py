from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.applicant import ReadApplicantProfile
from app.db.session import get_db
from app.models.applicant import Applicant
from app.models.user import User , UserType
from app.models.applicant import ApplicantDetail
from app.routers.auth import get_current_user

from app.schemas.applicant import CreateApplicant, ReadApplicantCore, UpdateApplicant, PartialUpdateApplicant, ReadApplicantProfile, MyApplication
from app.models.job import Job

router = APIRouter(prefix="/applicants", tags=["applicants"])


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

    return {
        "application_id": application.id,
        "job_id": application.job_id,
        "status": application.status,
        "applied_at": application.applied_at,
        "user": user,
        "details": details,
    }

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

    # Create application
    application = Applicant(
        job_id=job_id,
        applicant_id=current_user.id,
        status="Applied",
    )

    db.add(application)

    await db.commit()

    await db.refresh(application)

    return {
        "message": "Application submitted successfully.",
        "application_id": application.id,
    }