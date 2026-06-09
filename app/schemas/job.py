
from datetime import datetime
from pydantic import BaseModel


class JobBase(BaseModel):
    title: str
    description: str | None = None
    department: str | None = None
    employment_type: str | None = None
    experience_required: int | None = None


class CreateJob(JobBase):
    pass

class ReadJob(JobBase):
    id: int
    posted_by: int
    created_at: datetime

    class Config:
        from_attributes = True

class UpdateJob(JobBase):
    pass
