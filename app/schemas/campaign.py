from datetime import date, datetime
from pydantic import BaseModel
from app.models.campaign import CampaignStatus


class BaseCampaign(BaseModel):
    title: str
    description: str | None = None
    location: str | None = None
    status: CampaignStatus = CampaignStatus.DRAFT
    start_date: date | None = None
    end_date: date | None = None


class CreateCampaign(BaseCampaign):
    pass


class ReadCampaign(BaseCampaign):
    id: int
    hosted_by: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UpdateCampaign(BaseCampaign):
    pass

class PartialUpdateCampaign(BaseModel):
    title: str | None = None
    description: str | None = None
    location: str | None = None
    status: CampaignStatus | None = None
    start_date: date | None = None
    end_date: date | None = None