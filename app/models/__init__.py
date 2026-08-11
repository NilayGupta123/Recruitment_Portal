"""Import all models so SQLAlchemy metadata is complete for workers/sync sessions."""

from app.models.applicant import Applicant, ApplicantDetail, ApplicantSkillMapping, Certification
from app.models.campaign import Campaign, CampaignJobMapping
from app.models.file import File
from app.models.job import Job, JobSkillMapping
from app.models.skill import Skill
from app.models.user import User

__all__ = [
    "Applicant",
    "ApplicantDetail",
    "ApplicantSkillMapping",
    "Certification",
    "Campaign",
    "CampaignJobMapping",
    "File",
    "Job",
    "JobSkillMapping",
    "Skill",
    "User",
]
