from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.campaign import Campaign
from app.routers.auth import get_current_user

from app.schemas.campaign import CreateCampaign, ReadCampaign


router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("/list", response_model=List[ReadCampaign])
async def list_campaigns(
    db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> List[ReadCampaign]:

    result = await db.execute(select(Campaign).order_by(Campaign.id))
    return list(result.scalars().all())


@router.post("/create", response_model=ReadCampaign, status_code=status.HTTP_201_CREATED)
async def create_campaign(payload: CreateCampaign, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadCampaign:

    campaign = Campaign(
        title=payload.title,
        description=payload.description,
        location=payload.location,
        status=payload.status,
        start_date=payload.start_date,
        end_date=payload.end_date,
        hosted_by=current_user
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
async def get_campaign(campaign_id: int, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadCampaign:

    result = await db.execute(select(Campaign).where(Campaign.id == campaign_id))
    campaign = result.scalar_one_or_none()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign