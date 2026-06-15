
from datetime import datetime
from pydantic import BaseModel


class BaseJob(BaseModel):
    title: str
    description: str | None = None
    department: str | None = None
    employment_type: str | None = None
    experience_required: int | None = None


class CreateJob(BaseJob):
    pass

class ReadJob(BaseJob):
    id: int
    posted_by: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True

class UpdateJob(BaseJob):
    pass

class PartialUpdateJob(BaseModel):
    title: str | None = None
    description: str | None = None
    department: str | None = None
    employment_type: str | None = None
    experience_required: int | None = None