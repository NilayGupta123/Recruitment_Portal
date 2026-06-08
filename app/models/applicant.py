from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, String, Text, Integer, Numeric, UniqueConstraint, func

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Applicant(Base):
    __tablename__ = "applicants"
    # A particular applicant can apply to a particular job only once.
    __table_args__ = (
        UniqueConstraint(
            "job_id",
            "applicant_id",
            name="uq_job_applicant"
        ),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    job_id: Mapped[int] = mapped_column(
        ForeignKey("jobs.id"),
        nullable=False,
        index=True
    )

    applicant_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    status: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    applied_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        onupdate=func.now(),
        nullable=True
    )

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

class ApplicantSkillMapping(Base):
    __tablename__ = "applicant_skills_mapping"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    applicant_id: Mapped[int] = mapped_column(
        ForeignKey("applicant_details.id"),
        nullable=False,
        index=True
    )

    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id"),
        nullable=False,
        index=True
    )

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