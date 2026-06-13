from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.campaign import Campaign
from app.models.user import User
from app.routers.auth import get_current_user

from app.schemas.campaign import CreateCampaign, ReadCampaign, UpdateCampaign, PartialUpdateCampaign


router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("/list", response_model=List[ReadCampaign])
async def list_campaigns(
    db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> List[ReadCampaign]:

    result = await db.execute(select(Campaign).order_by(Campaign.id))
    return list(result.scalars().all())


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