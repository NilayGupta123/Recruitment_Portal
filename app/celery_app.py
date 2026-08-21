from __future__ import annotations

from celery import Celery
from celery.schedules import crontab

from app.core.config import settings

import app.models  # noqa: F401

celery_app = Celery(
    "recruitment_portal",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=[
        "app.tasks.score_application",
        "app.tasks.retry_unscored",
    ],
)

_interval = max(1, int(settings.score_retry_interval_minutes))

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
    beat_schedule={
        "retry-unscored-applications": {
            "task": "retry_unscored_applications",
            # Every N minutes (default 5). crontab minute="*/5" when N==5.
            "schedule": crontab(minute=f"*/{_interval}"),
            "options": {"expires": _interval * 60},
        },
    },
)
