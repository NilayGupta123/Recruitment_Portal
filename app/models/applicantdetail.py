from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Integer,Numeric, String, Text, func

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ApplicantDetail(Base):
    __tablename__ = "applicant_details"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    applicant_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    address: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    linkedin_url: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    github_url: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    years_of_experience: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    resume_file: Mapped[int | None] = mapped_column(
        ForeignKey("files.id"),
        nullable=True
    )

    current_company: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    current_ctc: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True
    )

    expected_ctc: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True
    )

    notice_period: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        onupdate=func.now(),
        nullable=True
    )