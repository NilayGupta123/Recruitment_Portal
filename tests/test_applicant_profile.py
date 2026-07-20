from types import SimpleNamespace

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
    file_record = SimpleNamespace(file_link="https://example.com/resume.pdf", file_name="resume.pdf")

    payload = build_resume_detail_payload(details, file_record)

    assert payload.resume_file == 7
    assert payload.resume_file_url == "https://example.com/resume.pdf"
    assert payload.resume_file_name == "resume.pdf"
