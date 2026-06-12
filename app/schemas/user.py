from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.models.user import UserType


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None
    user_type: UserType = UserType.APPLICANT
    phone_number: str | None = None


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True

class UserUpdate(UserBase):
    pass


class UserPasswordReset(BaseModel):
    new_password: str
    model_password: str


class UserPartialUpdate(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    phone_number: str | None = None



