from datetime import datetime
from pydantic import BaseModel


class SkillBase(BaseModel):
    skill_name: str


class CreateSkill(SkillBase):
    pass


class ReadSkill(SkillBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UpdateSkill(SkillBase):
    pass