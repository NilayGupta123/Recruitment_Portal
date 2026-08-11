from __future__ import annotations

from celery import Celery

from app.core.config import settings

import app.models  # noqa: F401

celery_app = Celery(
    "recruitment_portal",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=["app.tasks.score_application"],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    broker_connection_retry_on_startup=True,
)
