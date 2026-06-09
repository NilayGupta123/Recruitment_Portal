from datetime import datetime
from pydantic import BaseModel


class ApplicantBase(BaseModel):
    status: str | None = None


class CreateApplicant(ApplicantBase):
    job_id: int


class ReadApplicant(ApplicantBase):
    id: int
    job_id: int
    applicant_id: int
    applied_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UpdateApplicant(ApplicantBase):
    pass