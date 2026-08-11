from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.campaign import Campaign, CampaignJobMapping, CampaignStatus
from app.models.job import Job
from app.models.user import User
from app.routers.auth import get_current_user
from app.schemas.job import CreateJob, ReadJob, UpdateJob, PartialUpdateJob
from app.schemas.pagination import Paginated


router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/list", response_model=Paginated[ReadJob])
async def list_jobs(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=200),
    q: str | None = Query(None, description="Search title, department, employment type"),
    department: str | None = Query(None),
    employment_type: str | None = Query(None),
) -> Paginated[ReadJob]:
    filters = []
    if q:
        term = f"%{q.strip()}%"
        filters.append(
            or_(
                Job.title.ilike(term),
                Job.department.ilike(term),
                Job.employment_type.ilike(term),
            )
        )
    if department:
        filters.append(Job.department == department)
    if employment_type:
        filters.append(Job.employment_type == employment_type)

    count_stmt = select(func.count()).select_from(Job)
    list_stmt = select(Job)
    if filters:
        count_stmt = count_stmt.where(*filters)
        list_stmt = list_stmt.where(*filters)

    total = int((await db.execute(count_stmt)).scalar_one())
    result = await db.execute(
        list_stmt.order_by(Job.id.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    return Paginated[ReadJob].of(
        result.scalars().all(),
        total=total,
        page=page,
        page_size=page_size,
    )

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


@router.delete("/delete/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job(
    job_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.user_type not in ["ADMIN", "HR"]:
        raise HTTPException(status_code=403, detail="Only Admin or HR can delete jobs")

    published = await db.execute(
        select(CampaignJobMapping.id)
        .join(Campaign, CampaignJobMapping.campaign_id == Campaign.id)
        .where(
            CampaignJobMapping.job_id == job_id,
            Campaign.status == CampaignStatus.PUBLISHED,
        )
        .limit(1)
    )
    if published.scalar_one_or_none() is not None:
        raise HTTPException(
            status_code=409,
            detail="Cannot delete a job that is part of a published campaign.",
        )

    await db.delete(job)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Job delete failed")

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
