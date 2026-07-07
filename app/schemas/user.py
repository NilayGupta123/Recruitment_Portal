from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, EmailStr
from app.models.user import UserType


class BaseUser(BaseModel):
    email: EmailStr
    full_name: str
    user_type: UserType = UserType.APPLICANT
    phone_number: str | None = None


class CreateUser(BaseUser):
    password: str


class ReadUser(BaseUser):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True

class UpdateUser(BaseUser):
    pass


class PasswordResetUser(BaseModel):
    current_password: str
    new_password: str


class PartialUpdateUser(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None
    phone_number: str | None = None
    user_type: UserType | None = None

class ApplicantSignup(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class SignupResponse(BaseModel):
    message: str
    user_id: int
    is_registered: bool

