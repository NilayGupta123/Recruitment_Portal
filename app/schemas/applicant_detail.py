from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel


class ApplicantDetailBase(BaseModel):
    address: str | None = None
    linkedin_url: str | None = None
    github_url: str | None = None
    years_of_experience: int | None = None
    resume_file: int | None = None
    current_company: str | None = None
    current_ctc: Decimal | None = None
    expected_ctc: Decimal | None = None
    notice_period: int | None = None


class CreateApplicantDetail(ApplicantDetailBase):
    pass


class ReadApplicantDetail(ApplicantDetailBase):
    id: int
    applicant_id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UpdateApplicantDetail(ApplicantDetailBase):
    pass