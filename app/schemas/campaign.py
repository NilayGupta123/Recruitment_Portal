from datetime import date, datetime
from pydantic import BaseModel
from app.models.campaign import CampaignStatus


class CampaignBase(BaseModel):
    title: str
    description: str | None = None
    location: str | None = None
    status: CampaignStatus = CampaignStatus.DRAFT
    start_date: date | None = None
    end_date: date | None = None


class CreateCampaign(CampaignBase):
    pass


class ReadCampaign(CampaignBase):
    id: int
    hosted_by: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UpdateCampaign(CampaignBase):
    pass