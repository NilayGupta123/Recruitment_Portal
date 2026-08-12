from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone

from sqlalchemy import and_, or_, select

from app.celery_app import celery_app
from app.core.config import settings
from app.db.sync_session import SyncSessionLocal
from app.models.applicant import Applicant, ApplicantDetail
from app.tasks.score_application import enqueue_score_application

logger = logging.getLogger(__name__)

# Errors that will not succeed on retry without a data fix.
_PERMANENT_ERROR_SNIPPETS = (
    "no resume",
    "resume file record missing",
    "no campaign/job mapping",
    "campaign job mapping not found",
    "job not found",
)


def _is_permanent_failure(error: str | None) -> bool:
    if not error:
        return False
    lowered = error.lower()
    return any(snippet in lowered for snippet in _PERMANENT_ERROR_SNIPPETS)


@celery_app.task(name="retry_unscored_applications")
def retry_unscored_applications() -> dict:
    """
    Every few minutes, find applications that still need an AI score and
    re-enqueue score_application (worker downtime, network blips, rate limits).
    """
    batch_size = max(1, int(settings.score_retry_batch_size))
    stale_minutes = max(1, int(settings.score_processing_stale_minutes))
    stale_before = datetime.now(timezone.utc) - timedelta(minutes=stale_minutes)

    db = SyncSessionLocal()
    try:
        # Applications with a resume that are not done:
        # - pending / failed / null status
        # - processing stuck longer than stale window
        stmt = (
            select(Applicant.id, Applicant.ai_score_status, Applicant.ai_score_error)
            .join(
                ApplicantDetail,
                ApplicantDetail.applicant_id == Applicant.applicant_id,
            )
            .where(
                ApplicantDetail.resume_file.is_not(None),
                or_(
                    # never started or waiting
                    Applicant.ai_score_status.is_(None),
                    Applicant.ai_score_status.in_(("pending", "failed")),
                    # stuck mid-run (worker crash / hang)
                    and_(
                        Applicant.ai_score_status == "processing",
                        or_(
                            Applicant.updated_at.is_(None),
                            Applicant.updated_at < stale_before,
                            and_(
                                Applicant.updated_at.is_(None),
                                Applicant.applied_at < stale_before,
                            ),
                        ),
                    ),
                ),
            )
            .order_by(Applicant.id.asc())
            .limit(batch_size * 3)  # fetch extra so we can skip permanent failures
        )

        rows = db.execute(stmt).all()
        enqueued: list[int] = []
        skipped_permanent = 0

        for app_id, status, error in rows:
            if status == "failed" and _is_permanent_failure(error):
                skipped_permanent += 1
                continue

            # Mark pending so UI shows "Scoring..." again
            application = db.get(Applicant, app_id)
            if application is None:
                continue
            if application.ai_score_status == "done" and application.ai_score is not None:
                continue

            application.ai_score_status = "pending"
            if status == "failed":
                # keep last error visible until the next attempt overwrites it
                pass
            db.commit()

            enqueue_score_application(app_id)
            enqueued.append(app_id)
            if len(enqueued) >= batch_size:
                break

        result = {
            "ok": True,
            "enqueued": enqueued,
            "enqueued_count": len(enqueued),
            "skipped_permanent": skipped_permanent,
            "scanned": len(rows),
        }
        logger.info("retry_unscored_applications: %s", result)
        return result
    finally:
        db.close()
