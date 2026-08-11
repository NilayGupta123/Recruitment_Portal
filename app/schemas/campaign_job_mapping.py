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


# A job as it appears under one specific campaign (i.e. one CampaignJobMapping row),
# carrying that campaign's own salary/vacancy figures plus the mapping id needed to
# scope applicants/applications to this exact campaign+job pairing.
class CampaignJobDetail(BaseModel):
    mapping_id: int
    job_id: int
    title: str
    description: str | None = None
    department: str | None = None
    employment_type: str | None = None
    experience_required: int | None = None
    salary_min: Decimal | None = None
    salary_max: Decimal | None = None
    vacancies: int | None = None