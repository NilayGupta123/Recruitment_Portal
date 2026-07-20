from io import BytesIO
from unittest.mock import MagicMock

from app.services.storage import S3StorageManager


def test_upload_file_uses_s3_client_and_returns_metadata():
    fake_client = MagicMock()
    manager = S3StorageManager(
        bucket_name="test-bucket",
        region_name="us-east-1",
        access_key_id="test-key",
        secret_access_key="test-secret",
        client=fake_client,
    )

    file_obj = BytesIO(b"resume bytes")

    result = manager.upload_file(
        file_obj=file_obj,
        file_name="resume.pdf",
        folder="resumes",
        content_type="application/pdf",
    )

    fake_client.put_object.assert_called_once()
    assert result["file_name"] == "resume.pdf"
    assert result["bucket"] == "test-bucket"
    assert result["key"].startswith("resumes/")
    assert result["content_type"] == "application/pdf"


def test_generate_presigned_url_uses_client():
    fake_client = MagicMock()
    fake_client.generate_presigned_url.return_value = "https://example.com/presigned"
    manager = S3StorageManager(
        bucket_name="test-bucket",
        region_name="us-east-1",
        access_key_id="test-key",
        secret_access_key="test-secret",
        client=fake_client,
    )

    url = manager.generate_presigned_url("resumes/resume.pdf", expires_in=900)

    fake_client.generate_presigned_url.assert_called_once()
    assert url == "https://example.com/presigned"
