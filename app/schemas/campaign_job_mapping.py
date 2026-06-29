from decimal import Decimal

from pydantic import BaseModel


class CampaignJobItem(BaseModel):
    job_id: int
    salary_min: Decimal | None = None
    salary_max: Decimal | None = None
    vacancies: int | None = None


class CampaignJobsRequest(BaseModel):
    jobs: list[CampaignJobItem]


class CampaignJobResponse(BaseModel):
    id: int
    campaign_id: int
    job_id: int
    salary_min: Decimal | None = None
    salary_max: Decimal | None = None
    vacancies: int | None = None

    class Config:
        from_attributes = True