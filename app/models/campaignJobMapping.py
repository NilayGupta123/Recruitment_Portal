from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Numeric, UniqueConstraint, func

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class CampaignJobMapping(Base):
    __tablename__ = "campaign_job_mapping"

    __table_args__ = (
        UniqueConstraint(
            "campaign_id",
            "job_id",
            name="uq_campaign_job"
        ),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    campaign_id: Mapped[int] = mapped_column(
        ForeignKey("campaigns.id"),
        nullable=False,
        index=True
    )

    job_id: Mapped[int] = mapped_column(
        ForeignKey("jobs.id"),
        nullable=False,
        index=True
    )

    salary_min: Mapped[Decimal | None] = mapped_column(
        Numeric,
        nullable=True
    )

    salary_max: Mapped[Decimal | None] = mapped_column(
        Numeric,
        nullable=True
    )

    vacancies: Mapped[int | None] = mapped_column(
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