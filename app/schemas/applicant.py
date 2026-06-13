from datetime import datetime
from pydantic import BaseModel

from app.schemas.user import CreateUser, ReadUser
from app.schemas.applicant_detail import CreateApplicantDetail, ReadApplicantDetail

class BaseApplicant(BaseModel):
    status: str = "APPLIED"


class CreateApplicant(BaseApplicant, CreateUser, CreateApplicantDetail):
    job_id: int


# Minimal read model that matches the applicants table only
class ReadApplicantCore(BaseApplicant):
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
class ReadApplicant(BaseApplicant, ReadUser, ReadApplicantDetail):
    id: int
    job_id: int
    applicant_id: int
    applied_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UpdateApplicant(BaseApplicant):
    pass

class PartialUpdateApplicant(BaseModel):
    status: str | None = None