from datetime import datetime
from pydantic import BaseModel

from app.schemas.user import UserCreate, UserRead
from app.schemas.applicant_detail import CreateApplicantDetail, ReadApplicantDetail

class ApplicantBase(BaseModel):
    status: str = "APPLIED"


class CreateApplicant(ApplicantBase, UserCreate, CreateApplicantDetail):
    job_id: int


# Minimal read model that matches the applicants table only
class ReadApplicantCore(ApplicantBase):
    id: int
    job_id: int
    applicant_id: int
    applied_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


# Kept for future use if a joined/nested response is desired.
# Note: This flattened model mixes fields from User and ApplicantDetail and
# can be ambiguous; prefer nested models if you plan to expose joined data.
class ReadApplicant(ApplicantBase, UserRead, ReadApplicantDetail):
    id: int
    job_id: int
    applicant_id: int
    applied_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UpdateApplicant(ApplicantBase):
    pass