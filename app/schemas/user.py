from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.models.user import UserType


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None
    user_type: UserType = UserType.APPLICANT


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
