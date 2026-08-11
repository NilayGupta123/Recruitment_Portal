from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import delete, func, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.job import Job
from app.models.campaign import CampaignJobMapping
from app.models.applicant import Applicant
from app.schemas.applicant import ReadApplicantList
from app.schemas.campaign_job_mapping import CampaignJobsRequest, CampaignJobResponse, CampaignJobDetail

from app.db.session import get_db
from app.models.campaign import Campaign, CampaignStatus
from app.models.user import User
from app.routers.auth import get_current_user

from app.schemas.campaign import CreateCampaign, ReadCampaign, UpdateCampaign, PartialUpdateCampaign
from app.schemas.pagination import Paginated


router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("/list", response_model=Paginated[ReadCampaign])
async def list_campaigns(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=200),
    q: str | None = Query(None, description="Search title or location"),
    status_filter: str | None = Query(None, alias="status"),
) -> Paginated[ReadCampaign]:
    filters = []
    if q:
        term = f"%{q.strip()}%"
        filters.append(
            or_(
                Campaign.title.ilike(term),
                Campaign.location.ilike(term),
            )
        )
    if status_filter:
        filters.append(Campaign.status == status_filter)

    count_stmt = select(func.count()).select_from(Campaign)
    list_stmt = select(Campaign)
    if filters:
        count_stmt = count_stmt.where(*filters)
        list_stmt = list_stmt.where(*filters)

    total = int((await db.execute(count_stmt)).scalar_one())
    result = await db.execute(
        list_stmt.order_by(Campaign.id.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    return Paginated[ReadCampaign].of(
        result.scalars().all(),
        total=total,
        page=page,
        page_size=page_size,
    )


@router.post("/create", response_model=ReadCampaign, status_code=status.HTTP_201_CREATED)
async def create_campaign(payload: CreateCampaign, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadCampaign:

    campaign = Campaign(
        title=payload.title,
        description=payload.description,
        location=payload.location,
        status=payload.status,
        start_date=payload.start_date,
        end_date=payload.end_date,
        hosted_by=current_user.id
    )

    db.add(campaign)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Campaign creation failed")
    await db.refresh(campaign)
    return campaign


@router.get("/get/{campaign_id}", response_model=ReadCampaign)
async def get_campaign(campaign_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadCampaign:

    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.put("/put/{campaign_id}", response_model=ReadCampaign)
async def update_campaign(campaign_id: int, payload: UpdateCampaign, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadCampaign:
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if campaign.hosted_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this campaign")

    campaign.title = payload.title
    campaign.description = payload.description
    campaign.location = payload.location
    campaign.status = payload.status
    campaign.start_date = payload.start_date
    campaign.end_date = payload.end_date

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Campaign update failed")
    await db.refresh(campaign)
    return campaign

@router.patch("/patch/{campaign_id}", response_model=ReadCampaign)
async def partial_update_campaign(campaign_id: int, payload: PartialUpdateCampaign, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> ReadCampaign:
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if campaign.hosted_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this campaign")

    if payload.title:
        campaign.title = payload.title
    if payload.description:
        campaign.description = payload.description
    if payload.location:
        campaign.location = payload.location
    if payload.status:
        campaign.status = payload.status
    if payload.start_date is not None:
        campaign.start_date = payload.start_date
    if payload.end_date is not None:
        campaign.end_date = payload.end_date

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Campaign update failed")
    await db.refresh(campaign)
    return campaign


@router.delete("/delete/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_campaign(
    campaign_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if campaign.hosted_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this campaign")
    if campaign.status == CampaignStatus.PUBLISHED:
        raise HTTPException(
            status_code=409,
            detail="Cannot delete a published campaign; close it first.",
        )

    await db.delete(campaign)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Campaign delete failed")


@router.get("/{campaign_id}/jobs", response_model=list[CampaignJobDetail])
async def get_campaign_jobs(campaign_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):

    result = await db.execute(
        select(
            CampaignJobMapping.id.label("mapping_id"),
            Job.id.label("job_id"),
            Job.title,
            Job.description,
            Job.department,
            Job.employment_type,
            Job.experience_required,
            CampaignJobMapping.salary_min,
            CampaignJobMapping.salary_max,
            CampaignJobMapping.vacancies,
        )
        .join(Job, CampaignJobMapping.job_id == Job.id)
        .where(CampaignJobMapping.campaign_id == campaign_id)
        .order_by(CampaignJobMapping.id)
    )
    return result.mappings().all()

# Get Applicants for a specific job under a specific campaign (i.e. one campaign_job_mapping row).
# Scoping by both campaign_id and job_id keeps applicants isolated when the same job is
# reused across multiple campaigns.
@router.get("/{campaign_id}/jobs/{job_id}/applicants", response_model=list[ReadApplicantList])
async def get_campaign_job_applicants(campaign_id: int, job_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):

    mapping_result = await db.execute(
        select(CampaignJobMapping).where(
            CampaignJobMapping.campaign_id == campaign_id,
            CampaignJobMapping.job_id == job_id,
        )
    )
    mapping = mapping_result.scalar_one_or_none()
    if mapping is None:
        raise HTTPException(status_code=404, detail="This job is not mapped to this campaign")

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
        .join(User, Applicant.applicant_id == User.id)
        .where(Applicant.mapping_id == mapping.id)
        .order_by(Applicant.applied_at.desc())
    )
    return result.mappings().all()

@router.put("/{campaign_id}/jobs", response_model=list[CampaignJobResponse])
async def update_campaign_jobs(campaign_id: int, payload: CampaignJobsRequest, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):

    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalar_one_or_none()
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    if campaign.hosted_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    await db.execute(delete(CampaignJobMapping).where(CampaignJobMapping.campaign_id == campaign_id))

    mappings = []

    for job in payload.jobs:

        mapping = CampaignJobMapping(
            campaign_id=campaign_id,
            job_id=job.job_id,
            salary_min=job.salary_min,
            salary_max=job.salary_max,
            vacancies=job.vacancies,
        )

        db.add(mapping)
        mappings.append(mapping)
    await db.commit()
    for mapping in mappings:
        await db.refresh(mapping)
    return mappings