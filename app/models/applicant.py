from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, String, Text, Integer, Numeric, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Applicant(Base):
    __tablename__ = "applicants"
    # A particular applicant can apply to a particular campaign posting (campaign+job pairing) only once.
    __table_args__ = (
        UniqueConstraint(
            "mapping_id",
            "applicant_id",
            name="uq_mapping_applicant"
        ),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    mapping_id: Mapped[int | None] = mapped_column(
        ForeignKey("campaign_job_mapping.id", ondelete="SET NULL"),
        nullable=True,
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

    # AI resume scoring (Celery task fills these after apply)
    ai_score: Mapped[Decimal | None] = mapped_column(Numeric(4, 1), nullable=True)
    ai_decision: Mapped[str | None] = mapped_column(String(32), nullable=True)
    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_praise_html: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_critique_html: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_score_status: Mapped[str | None] = mapped_column(String(20), nullable=True, index=True)
    ai_score_error: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_scored_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    ai_score_raw: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

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