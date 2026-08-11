from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path

from sqlalchemy import select

from app.celery_app import celery_app
from app.core.config import settings
from app.db.sync_session import SyncSessionLocal
from app.models.applicant import Applicant, ApplicantDetail
from app.models.campaign import CampaignJobMapping
from app.models.file import File as FileRecord
from app.models.job import Job
from app.services.resume_parser import ResumeParser
from app.services.resume_scorer import ResumeScorer
from app.services.storage import S3StorageManager

logger = logging.getLogger(__name__)


def _run(coro):
    return asyncio.run(coro)


def _job_payload(job: Job) -> dict:
    return {
        "title": job.title,
        "description": job.description,
        "department": job.department,
        "employment_type": job.employment_type,
        "experience_required": job.experience_required,
    }


def _resolve_resume_source(file_link: str | None) -> str | None:
    """Prefer a real local file; otherwise return a downloadable URL/key."""
    if not file_link:
        return None

    storage = S3StorageManager()
    candidates = [
        Path(file_link),
        Path(settings.upload_dir) / file_link,
        storage._local_root / file_link,  # noqa: SLF001
    ]
    key = storage.extract_key_from_url(file_link)
    if key:
        candidates.append(Path(settings.upload_dir) / key)
        candidates.append(storage._local_root / key)  # noqa: SLF001

    for path in candidates:
        try:
            if path.is_file():
                return str(path.resolve())
        except OSError:
            continue

    return storage.resolve_download_url(file_link)


def _mark_failed(db, application: Applicant, message: str) -> None:
    application.ai_score_status = "failed"
    application.ai_score_error = message[:2000]
    application.ai_scored_at = datetime.now(timezone.utc)
    db.commit()


@celery_app.task(
    name="score_application",
    bind=True,
    max_retries=2,
    default_retry_delay=30,
)
def score_application(self, application_id: int) -> dict:
    """Parse resume + score applicant against the applied job."""
    db = SyncSessionLocal()
    try:
        application = db.get(Applicant, application_id)
        if application is None:
            logger.warning("score_application: application %s not found", application_id)
            return {"ok": False, "error": "not_found"}

        application.ai_score_status = "processing"
        application.ai_score_error = None
        db.commit()

        if application.mapping_id is None:
            _mark_failed(db, application, "Application has no campaign/job mapping.")
            return {"ok": False, "error": "no_mapping"}

        mapping = db.get(CampaignJobMapping, application.mapping_id)
        if mapping is None:
            _mark_failed(db, application, "Campaign job mapping not found.")
            return {"ok": False, "error": "mapping_missing"}

        job = db.get(Job, mapping.job_id)
        if job is None:
            _mark_failed(db, application, "Job not found for this application.")
            return {"ok": False, "error": "job_missing"}

        detail = db.execute(
            select(ApplicantDetail).where(
                ApplicantDetail.applicant_id == application.applicant_id
            )
        ).scalar_one_or_none()

        if detail is None or detail.resume_file is None:
            _mark_failed(db, application, "No resume on file to score.")
            return {"ok": False, "error": "no_resume"}

        file_record = db.get(FileRecord, detail.resume_file)
        if file_record is None or not file_record.file_link:
            _mark_failed(db, application, "Resume file record missing.")
            return {"ok": False, "error": "resume_missing"}

        resume_url = _resolve_resume_source(file_record.file_link)
        if not resume_url:
            _mark_failed(db, application, "Could not resolve a downloadable resume URL.")
            return {"ok": False, "error": "resume_url"}

        try:
            parsed = _run(
                ResumeParser.parse(resume_url, file_name=file_record.file_name)
            )
            scored = _run(ResumeScorer.score(parsed, _job_payload(job)))
        except Exception as exc:
            logger.exception("score_application failed for %s", application_id)
            message = str(exc)
            # Don't burn retries on permanent client errors (missing object, bad input).
            permanent = any(
                token in message
                for token in ("404", "Not Found", "No such file", "invalid JSON")
            )
            if not permanent and self.request.retries < self.max_retries:
                application.ai_score_status = "pending"
                application.ai_score_error = message[:2000]
                db.commit()
                raise self.retry(exc=exc)
            _mark_failed(db, application, message)
            return {"ok": False, "error": message}

        application.ai_score = Decimal(str(scored.get("score", 0)))
        application.ai_decision = scored.get("decision") or "REVIEW"
        application.ai_summary = scored.get("summary") or None
        application.ai_praise_html = scored.get("praise_html") or None
        application.ai_critique_html = scored.get("critique_html") or None
        application.ai_score_raw = {
            "parsed_resume": parsed,
            "score_result": scored,
        }
        application.ai_score_status = "done"
        application.ai_score_error = None
        application.ai_scored_at = datetime.now(timezone.utc)
        db.commit()

        return {
            "ok": True,
            "application_id": application_id,
            "score": float(application.ai_score),
            "decision": application.ai_decision,
        }
    finally:
        db.close()


def enqueue_score_application(application_id: int) -> None:
    """Fire-and-forget enqueue; never break the HTTP apply path."""
    try:
        score_application.delay(application_id)
        logger.info("Enqueued score_application for application_id=%s", application_id)
    except Exception:
        logger.exception(
            "Failed to enqueue score_application for application_id=%s",
            application_id,
        )
