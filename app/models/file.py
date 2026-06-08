from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, String, Text, func

from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class File(Base):
    __tablename__ = "files"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    file_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    file_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    file_link: Mapped[str | None] = mapped_column(
        Text,
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