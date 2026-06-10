from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.applicant import Applicant
from app.routers.auth import get_current_user

from app.schemas.applicant import CreateApplicant, ReadApplicant


router = APIRouter(prefix="/applicants", tags=["applicants"])


@router.get("/list", response_model=List[ReadApplicant])
async def list_applicants(db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> List[ReadApplicant]:

    result = await db.execute(select(Applicant).order_by(Applicant.id))
    return list(result.scalars().all())


@router.post("/create", response_model=ReadApplicant, status_code=status.HTTP_201_CREATED)
async def create_applicant(payload: CreateApplicant, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadApplicant:

    applicant = Applicant(
        job_id=payload.job_id,
        applicant_id=current_user,
        status=payload.status
    )

    db.add(applicant)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="You have already applied for this job")
    await db.refresh(applicant)
    return applicant


@router.get("/get/{applicant_id}", response_model=ReadApplicant)
async def get_applicant(applicant_id: int, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadApplicant:

    result = await db.execute(select(Applicant).where(Applicant.id == applicant_id))
    applicant = result.scalar_one_or_none()
    if not applicant:
        raise HTTPException(status_code=404,detail="Application not found")
    return applicant