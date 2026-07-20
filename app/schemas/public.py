from typing import Optional
from pydantic import BaseModel, EmailStr

# -------------------------------------------------
# Check Applicant
# -------------------------------------------------

class CheckApplicantRequest(BaseModel):
    email: EmailStr

class ApplicantDetailsResponse(BaseModel):
    address: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    years_of_experience: Optional[int] = None
    current_company: Optional[str] = None
    current_ctc: Optional[float] = None
    expected_ctc: Optional[float] = None
    notice_period: Optional[int] = None
    resume_file: Optional[int] = None

class CheckApplicantResponse(BaseModel):
    exists: bool
    applicant_id: Optional[int] = None
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    details: Optional[ApplicantDetailsResponse] = None

# -------------------------------------------------
# Upload Resume
# -------------------------------------------------

class UploadResumeResponse(BaseModel):
    file_id: int
    file_name: str
    file_link: Optional[str] = None
    message: str

# -------------------------------------------------
# Apply Job
# -------------------------------------------------

class PublicApplicationCreate(BaseModel):
    job_id: int
    full_name: str
    email: EmailStr
    phone_number: str
    address: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    years_of_experience: Optional[int] = None
    current_company: Optional[str] = None
    current_ctc: Optional[float] = None
    expected_ctc: Optional[float] = None
    notice_period: Optional[int] = None
    resume_file: Optional[int] = None

class PublicApplicationResponse(BaseModel):
    success: bool
    application_id: int
    applicant_id: int
    message: str