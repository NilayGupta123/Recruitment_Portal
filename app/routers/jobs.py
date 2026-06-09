from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.job import Job
from app.routers.auth import get_current_user

from app.schemas.job import CreateJob, ReadJob


router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/list", response_model=List[ReadJob])
async def list_jobs(db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> List[ReadJob]:

    result = await db.execute(select(Job).order_by(Job.id))
    return list(result.scalars().all())

@router.post("/create", response_model=ReadJob, status_code=status.HTTP_201_CREATED)
async def create_job(payload: CreateJob, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadJob:
    job = Job(title=payload.title, description=payload.description, posted_by=current_user)
    db.add(job)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Job creation failed")
    await db.refresh(job)
    return job


@router.get("/get/{job_id}", response_model=ReadJob)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadJob:
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
