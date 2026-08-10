from types import SimpleNamespace
from unittest.mock import patch

from app.routers.applicant import build_resume_detail_payload


def test_build_resume_detail_payload_includes_resume_link():
    details = SimpleNamespace(
        id=1,
        applicant_id=2,
        address="123 Main",
        linkedin_url=None,
        github_url=None,
        years_of_experience=3,
        resume_file=7,
        current_company="Acme",
        current_ctc=1000,
        expected_ctc=1200,
        notice_period=30,
        created_at=None,
        updated_at=None,
    )
    file_record = SimpleNamespace(
        id=7,
        file_link="https://example.com/resume.pdf",
        file_name="resume.pdf",
    )

    with patch(
        "app.routers.applicant.S3StorageManager.resolve_download_url",
        return_value="https://example.com/resume.pdf",
    ):
        payload = build_resume_detail_payload(details, file_record)

    assert payload["resume_file"] == 7
    assert payload["resume_file_url"] == "https://example.com/resume.pdf"
    assert payload["resume_file_name"] == "resume.pdf"


def test_build_resume_detail_payload_falls_back_to_api_proxy():
    details = SimpleNamespace(
        id=1,
        applicant_id=2,
        resume_file=9,
    )
    file_record = SimpleNamespace(id=9, file_link="resumes/doc.pdf", file_name="doc.pdf")

    with patch(
        "app.routers.applicant.S3StorageManager.resolve_download_url",
        return_value=None,
    ):
        payload = build_resume_detail_payload(details, file_record)

    assert payload["resume_file_url"] == "/applicants/files/9"
    assert payload["resume_file_name"] == "doc.pdf"
