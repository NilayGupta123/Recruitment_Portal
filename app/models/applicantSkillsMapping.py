from __future__ import annotations

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


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