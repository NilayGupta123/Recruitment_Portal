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

from app.schemas.applicant_detail import CreateApplicantDetail, ReadApplicantDetail, UpdateApplicantDetail, PartialUpdateApplicantDetail


router = APIRouter(prefix="/applicant-details", tags=["applicant-details"])


@router.get("/list", response_model=List[ReadApplicantDetail])
async def list_applicant_details(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> List[ReadApplicantDetail]:

    result = await db.execute(select(ApplicantDetail).order_by(ApplicantDetail.id))
    return list(result.scalars().all())


@router.post("/create", response_model=ReadApplicantDetail, status_code=status.HTTP_201_CREATED)
async def create_applicant_detail(payload: CreateApplicantDetail, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantDetail:

    detail_result = await db.execute(
        select(ApplicantDetail).where(
            ApplicantDetail.applicant_id == current_user.id
        )
    )

    applicant_details = detail_result.scalar_one_or_none()

    if applicant_details is None:

        applicant_details = ApplicantDetail(
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
        raise HTTPException(status_code=400, detail="Applicant detail creation failed")
    await db.refresh(applicant_details)
    return applicant_details


@router.get("/get/{applicant_detail_id}", response_model=ReadApplicantDetail)
async def get_applicant_detail(applicant_detail_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantDetail:
    result = await db.execute(select(ApplicantDetail).where(ApplicantDetail.id == applicant_detail_id))
    applicant_detail = result.scalar_one_or_none()
    if not applicant_detail:
        raise HTTPException(status_code=404, detail="Applicant detail not found")

    return applicant_detail

@router.put("/put/{applicant_detail_id}", response_model=ReadApplicantDetail)
async def update_applicant_detail(applicant_detail_id: int, payload: UpdateApplicantDetail, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantDetail:
    result = await db.execute(select(ApplicantDetail).where(ApplicantDetail.id == applicant_detail_id))
    applicant_detail = result.scalar_one_or_none()
    if not applicant_detail:
        raise HTTPException(status_code=404, detail="Applicant detail not found")

    applicant_detail.address = payload.address
    applicant_detail.linkedin_url = payload.linkedin_url
    applicant_detail.github_url = payload.github_url
    applicant_detail.years_of_experience = payload.years_of_experience
    applicant_detail.resume_file = payload.resume_file
    applicant_detail.current_company = payload.current_company
    applicant_detail.current_ctc = payload.current_ctc
    applicant_detail.expected_ctc = payload.expected_ctc
    applicant_detail.notice_period = payload.notice_period

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Applicant detail update failed")
    await db.refresh(applicant_detail)
    return applicant_detail

@router.patch("/patch/{applicant_detail_id}", response_model=ReadApplicantDetail)
async def patch_applicant_detail(applicant_detail_id: int, payload: PartialUpdateApplicantDetail, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadApplicantDetail:
    result = await db.execute(select(ApplicantDetail).where(ApplicantDetail.id == applicant_detail_id))
    applicant_detail = result.scalar_one_or_none()
    if not applicant_detail:
        raise HTTPException(status_code=404, detail="Applicant detail not found")

    if payload.address:
        applicant_detail.address = payload.address
    if payload.linkedin_url:
        applicant_detail.linkedin_url = payload.linkedin_url
    if payload.github_url:
        applicant_detail.github_url = payload.github_url
    if payload.years_of_experience is not None:
        applicant_detail.years_of_experience = payload.years_of_experience
    if payload.resume_file is not None:
        applicant_detail.resume_file = payload.resume_file
    if payload.current_company:
        applicant_detail.current_company = payload.current_company
    if payload.current_ctc is not None:
        applicant_detail.current_ctc = payload.current_ctc
    if payload.expected_ctc is not None:
        applicant_detail.expected_ctc = payload.expected_ctc
    if payload.notice_period is not None:
        applicant_detail.notice_period = payload.notice_period

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Applicant detail patch failed")
    await db.refresh(applicant_detail)
    return applicant_detail

@router.get("/me", response_model=ReadApplicantDetail)
async def get_my_applicant_detail(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(ApplicantDetail).where(
            ApplicantDetail.applicant_id == current_user.id
        )
    )

    detail = result.scalar_one_or_none()

    if detail is None:
        raise HTTPException(
            status_code=404,
            detail="Applicant detail not found",
        )

    return detail

@router.put("/me", response_model=ReadApplicantDetail)
async def update_my_applicant_detail(
    payload: UpdateApplicantDetail,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(ApplicantDetail).where(
            ApplicantDetail.applicant_id == current_user.id
        )
    )

    detail = result.scalar_one_or_none()

    if detail is None:
        raise HTTPException(
            status_code=404,
            detail="Applicant detail not found",
        )

    detail.address = payload.address
    detail.linkedin_url = payload.linkedin_url
    detail.github_url = payload.github_url
    detail.years_of_experience = payload.years_of_experience
    detail.resume_file = payload.resume_file
    detail.current_company = payload.current_company
    detail.current_ctc = payload.current_ctc
    detail.expected_ctc = payload.expected_ctc
    detail.notice_period = payload.notice_period

    await db.commit()

    await db.refresh(detail)

    return detail