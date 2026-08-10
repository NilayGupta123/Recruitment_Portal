from __future__ import annotations

import os
import uuid
from io import BytesIO
from pathlib import Path
from typing import BinaryIO, Optional

from app.core.config import settings

try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:  # pragma: no cover - optional dependency
    boto3 = None
    ClientError = Exception


class S3StorageManager:
    def __init__(
        self,
        bucket_name: Optional[str] = None,
        region_name: Optional[str] = None,
        access_key_id: Optional[str] = None,
        secret_access_key: Optional[str] = None,
        endpoint_url: Optional[str] = None,
        client=None,
    ) -> None:
        self.bucket_name = bucket_name or settings.s3_bucket_name
        self.region_name = region_name or settings.s3_region_name
        self.access_key_id = access_key_id or settings.s3_access_key_id
        self.secret_access_key = secret_access_key or settings.s3_secret_access_key
        self.endpoint_url = endpoint_url or settings.s3_endpoint_url
        self.client = client

        self._local_root = Path(settings.upload_dir)
        self._local_root.mkdir(parents=True, exist_ok=True)

        if self.client is None and boto3 is not None and self.bucket_name and self.access_key_id and self.secret_access_key:
            client_kwargs = {
                "region_name": self.region_name,
                "aws_access_key_id": self.access_key_id,
                "aws_secret_access_key": self.secret_access_key,
            }
            if self.endpoint_url:
                client_kwargs["endpoint_url"] = self.endpoint_url
            self.client = boto3.client("s3", **client_kwargs)

    def _build_key(self, file_name: str, folder: str = "uploads") -> str:
        safe_name = os.path.basename(file_name or "file")
        safe_name = safe_name.replace(" ", "_")
        safe_name = safe_name.replace("/", "_")
        stem, ext = os.path.splitext(safe_name)
        unique_name = f"{uuid.uuid4().hex}-{stem}{ext}" if ext else f"{uuid.uuid4().hex}-{stem}"
        folder_name = (folder or "uploads").strip("/").replace(" ", "_")
        return f"{folder_name}/{unique_name}" if folder_name else unique_name

    def upload_file(
        self,
        file_obj: BinaryIO | BytesIO,
        file_name: str,
        folder: str = "uploads",
        content_type: Optional[str] = None,
        expires_in: int = 3600,
    ) -> dict:
        if hasattr(file_obj, "seek"):
            file_obj.seek(0)

        file_bytes = file_obj.read()
        key = self._build_key(file_name=file_name, folder=folder)

        if self.client is None:
            local_path = self._local_root / key
            local_path.parent.mkdir(parents=True, exist_ok=True)
            local_path.write_bytes(file_bytes)
            return {
                "bucket": None,
                "key": key,
                "file_name": file_name,
                "content_type": content_type or "application/octet-stream",
                "url": str(local_path),
                "storage_type": "local",
            }

        try:
            self.client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=file_bytes,
                ContentType=content_type or "application/octet-stream",
            )
        except Exception:
            local_path = self._local_root / key
            local_path.parent.mkdir(parents=True, exist_ok=True)
            local_path.write_bytes(file_bytes)
            return {
                "bucket": None,
                "key": key,
                "file_name": file_name,
                "content_type": content_type or "application/octet-stream",
                "url": str(local_path),
                "storage_type": "local",
            }

        return {
            "bucket": self.bucket_name,
            "key": key,
            "file_name": file_name,
            "content_type": content_type or "application/octet-stream",
            "url": self.generate_presigned_url(key, expires_in=expires_in),
            "storage_type": "s3",
        }

    def get_file(self, key: str) -> dict:
        if self.client is None:
            local_path = self._local_root / key
            if not local_path.exists():
                raise FileNotFoundError(key)
            return {
                "key": key,
                "body": local_path.read_bytes(),
                "content_type": "application/octet-stream",
                "storage_type": "local",
            }

        try:
            response = self.client.get_object(Bucket=self.bucket_name, Key=key)
        except Exception:
            local_path = self._local_root / key
            if not local_path.exists():
                raise FileNotFoundError(key)
            return {
                "key": key,
                "body": local_path.read_bytes(),
                "content_type": "application/octet-stream",
                "storage_type": "local",
            }

        return {
            "key": key,
            "body": response["Body"].read(),
            "content_type": response.get("ContentType", "application/octet-stream"),
            "storage_type": "s3",
        }

    def generate_presigned_url(self, key: str, expires_in: int = 3600) -> Optional[str]:
        if self.client is None or not key:
            return None

        # Already a full URL (legacy rows that stored temporary signed links).
        if key.startswith(("http://", "https://")):
            extracted = self.extract_key_from_url(key)
            if extracted:
                key = extracted
            else:
                return key

        try:
            return self.client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": key},
                ExpiresIn=expires_in,
            )
        except Exception:
            return None

    @staticmethod
    def extract_key_from_url(url: str) -> Optional[str]:
        """Best-effort extract of an S3 object key from a URL or path."""
        if not url:
            return None
        if "://" not in url and not url.startswith("/") and "\\" not in url:
            # Looks like a bare object key already.
            return url.lstrip("/")

        try:
            from urllib.parse import unquote, urlparse

            parsed = urlparse(url)
            path = unquote(parsed.path or "").lstrip("/")
            if not path:
                return None

            # Virtual-hosted–style: bucket.s3.amazonaws.com/key
            # Path-style: s3.amazonaws.com/bucket/key
            host = (parsed.netloc or "").lower()
            if ".s3." in host or host.startswith("s3.") or "amazonaws.com" in host:
                parts = path.split("/", 1)
                if host.startswith("s3.") and len(parts) == 2:
                    return parts[1]
                return path
            return path
        except Exception:
            return None

    def resolve_download_url(self, file_link: str | None, expires_in: int = 3600) -> Optional[str]:
        """Return a browser-openable URL for a stored file_link (key or URL)."""
        if not file_link:
            return None

        # Prefer a fresh S3 signed URL whenever possible.
        signed = self.generate_presigned_url(file_link, expires_in=expires_in)
        if signed:
            return signed

        if file_link.startswith(("http://", "https://")):
            return file_link

        return None
