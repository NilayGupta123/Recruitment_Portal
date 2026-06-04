from __future__ import annotations

from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, String, func

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

class Certification(Base):
    __tablename__ = "certifications"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    applicant_id: Mapped[int] = mapped_column(
        ForeignKey("applicant_details.id"),
        nullable=False,
        index=True
    )

    certification_title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    certification_expiration_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True
    )

    certification_file: Mapped[int | None] = mapped_column(
        ForeignKey("files.id"),
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