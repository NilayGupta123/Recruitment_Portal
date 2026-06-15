from datetime import datetime
from pydantic import BaseModel


class BaseSkill(BaseModel):
    skill_name: str


class CreateSkill(BaseSkill):
    pass


class ReadSkill(BaseSkill):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UpdateSkill(BaseSkill):
    pass

class PartialUpdateSkill(BaseModel):
    skill_name: str | None = None