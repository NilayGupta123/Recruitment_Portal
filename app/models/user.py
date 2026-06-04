from __future__ import annotations

from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, String, func, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class UserType(str, Enum):
    ADMIN = "ADMIN"
    HR = "HR"
    APPLICANT = "APPLICANT"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    user_type: Mapped[UserType] = mapped_column(
        SAEnum(UserType, name="user_type"), server_default="APPLICANT", nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
