from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.applicant import ApplicantDetail
from app.models.user import User
from app.routers.auth import get_current_user

from app.schemas.applicant_detail import CreateApplicantDetail, ReadApplicantDetail


router = APIRouter(prefix="/applicant-details", tags=["applicant-details"])


@router.get("/list", response_model=List[ReadApplicantDetail])
async def list_applicant_details(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> List[ReadApplicantDetail]:

    result = await db.execute(select(ApplicantDetail).order_by(ApplicantDetail.id))
    return list(result.scalars().all())


@router.post("/create", response_model=ReadApplicantDetail, status_code=status.HTTP_201_CREATED)
async def create_applicant_detail(payload: CreateApplicantDetail, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantDetail:

    applicant_detail = ApplicantDetail(
        applicant_id=current_user.id,
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

    db.add(applicant_detail)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Applicant detail creation failed")
    await db.refresh(applicant_detail)
    return applicant_detail


@router.get("/get/{applicant_detail_id}", response_model=ReadApplicantDetail)
async def get_applicant_detail(applicant_detail_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantDetail:
    result = await db.execute(select(ApplicantDetail).where(ApplicantDetail.id == applicant_detail_id))
    applicant_detail = result.scalar_one_or_none()
    if not applicant_detail:
        raise HTTPException(status_code=404, detail="Applicant detail not found")

    return applicant_detail