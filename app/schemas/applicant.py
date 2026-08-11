from datetime import datetime
from pydantic import BaseModel

from app.schemas.user import CreateUser, ReadUser
from app.schemas.applicant_detail import CreateApplicantDetail, ReadApplicantDetail
from app.schemas.user import ReadUser
from app.schemas.applicant_detail import ReadApplicantDetail

class BaseApplicant(BaseModel):
    status: str = "APPLIED"


class CreateApplicant(BaseApplicant, CreateUser, CreateApplicantDetail):
    mapping_id: int


# Minimal read model that matches the applicants table only
class ReadApplicantCore(BaseApplicant):
    id: int
    mapping_id: int | None = None
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
    mapping_id: int | None = None
    applicant_id: int
    applied_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class UpdateApplicant(BaseApplicant):
    pass

class PartialUpdateApplicant(BaseModel):
    status: str | None = None

# return the applicants for a specific job along with basic user information
class ReadApplicantList(BaseModel):
    application_id: int
    applicant_id: int

    full_name: str
    email: str
    phone_number: str | None = None

    status: str | None = None
    applied_at: datetime

    class Config:
        from_attributes = True


class ReadApplicantProfile(BaseModel):
    application_id: int
    job_id: int
    campaign_id: int
    campaign_title: str
    status: str | None = None
    applied_at: datetime

    # AI scoring (filled async by Celery after apply)
    ai_score: float | None = None
    ai_decision: str | None = None
    ai_summary: str | None = None
    ai_praise_html: str | None = None
    ai_critique_html: str | None = None
    ai_score_status: str | None = None
    ai_score_error: str | None = None
    ai_scored_at: datetime | None = None

    user: ReadUser
    details: ReadApplicantDetail

class MyApplication(BaseModel):
    id: int
    mapping_id: int
    job_id: int
    job_title: str
    campaign_id: int
    campaign_title: str
    status: str
    applied_at: datetime

    class Config:
        from_attributes = True