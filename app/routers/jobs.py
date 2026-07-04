from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.job import Job
from app.models.user import User
from app.routers.auth import get_current_user
from app.schemas.applicant import ReadApplicantList
from app.schemas.job import CreateJob, ReadJob, UpdateJob, PartialUpdateJob
from app.models.applicant import Applicant


router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/list", response_model=List[ReadJob])
async def list_jobs(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> List[ReadJob]:

    result = await db.execute(select(Job).order_by(Job.id))
    return list(result.scalars().all())

@router.post("/create", response_model=ReadJob, status_code=status.HTTP_201_CREATED)
async def create_job(payload: CreateJob, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadJob:
    
    job = Job(
        title=payload.title,
        description=payload.description,
        department=payload.department,
        employment_type=payload.employment_type,
        experience_required=payload.experience_required,
        posted_by=current_user.id,
    )
    db.add(job)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Job creation failed")
    await db.refresh(job)
    return job


@router.get("/get/{job_id}", response_model=ReadJob)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadJob:
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/put/{job_id}", response_model=ReadJob)
async def update_job(job_id: int, payload: UpdateJob, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadJob:
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.user_type not in ["ADMIN", "HR"]:
        raise HTTPException(status_code=403, detail="Only Admin or HR can update jobs")

    job.title = payload.title
    job.description = payload.description
    job.department = payload.department
    job.employment_type = payload.employment_type
    job.experience_required = payload.experience_required

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Job update failed")
    await db.refresh(job)
    return job

@router.patch("/patch/{job_id}", response_model=ReadJob)
async def partial_update_job(job_id: int, payload: PartialUpdateJob, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadJob:
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.user_type not in ["ADMIN", "HR"]:
        raise HTTPException(status_code=403, detail="Only Admin or HR can update jobs")


    if payload.title:
        job.title = payload.title
    if payload.description:
        job.description = payload.description
    if payload.department:
        job.department = payload.department
    if payload.employment_type:
        job.employment_type = payload.employment_type
    if payload.experience_required is not None:
        job.experience_required = payload.experience_required

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Job update failed")
    await db.refresh(job)
    return job

# Get Applicants for a Job
@router.get("/{job_id}/applicants", response_model=list[ReadApplicantList])
async def get_job_applicants(job_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(
        select(
            Applicant.id.label("application_id"),
            Applicant.applicant_id,
            User.full_name,
            User.email,
            User.phone_number,
            Applicant.status,
            Applicant.applied_at,
        )
        .join(User, Applicant.applicant_id == User.id).where(Applicant.job_id == job_id).order_by(Applicant.applied_at.desc()))

    return result.mappings().all()

@router.get("/public")
async def get_public_jobs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job))
    jobs = result.scalars().all()
    return jobs

@router.get("/public/{job_id}")
async def get_public_job(job_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
