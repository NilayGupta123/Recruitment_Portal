from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.applicant import Applicant
from app.models.user import User
from app.models.applicant import ApplicantDetail
from app.routers.auth import get_current_user

from app.schemas.applicant import CreateApplicant, ReadApplicantCore


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
            user_type=payload.user_type,
            password=payload.password,
            phone_number=payload.phone_number,
        )
        db.add(applicant_user)
        await db.flush()

    else:
        print(f"\n\n got old user - {applicant_user.email}\n\n")
    
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