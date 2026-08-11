from __future__ import annotations

import json
import os
import tempfile
from pathlib import Path

import requests
from google import genai

from app.core.config import settings
from app.services.prompts.resume_parser_prompt import RESUME_PARSER_PROMPT

client = genai.Client(api_key=settings.gemini_api_key)


class ResumeParser:
    @staticmethod
    def _download_resume(resume_url: str, file_name: str | None = None) -> str:
        """
        Resolve a local path or download from URL; return a temp file path.
        """
        if resume_url and not resume_url.startswith(("http://", "https://")):
            local = Path(resume_url)
            if local.exists():
                return str(local)

        response = requests.get(resume_url, timeout=60)
        response.raise_for_status()

        extension = ""
        if file_name:
            extension = os.path.splitext(file_name)[1]
        if not extension:
            extension = os.path.splitext(resume_url.split("?", 1)[0])[1] or ".pdf"

        with tempfile.NamedTemporaryFile(delete=False, suffix=extension) as temp_file:
            temp_file.write(response.content)
            return temp_file.name

    @staticmethod
    async def parse(resume_url: str, file_name: str | None = None) -> dict:
        local_file = ResumeParser._download_resume(resume_url, file_name=file_name)
        created_temp = resume_url.startswith(("http://", "https://"))

        try:
            uploaded_file = client.files.upload(file=local_file)

            response = client.models.generate_content(
                model=settings.gemini_model,
                contents=[
                    uploaded_file,
                    RESUME_PARSER_PROMPT,
                ],
            )

            text = (response.text or "").strip()

            if text.startswith("```"):
                text = text.split("\n", 1)[1]
                text = text.rsplit("```", 1)[0].strip()

            try:
                return json.loads(text)
            except json.JSONDecodeError as exc:
                raise ValueError("Gemini returned an invalid JSON response.") from exc
        finally:
            if created_temp and os.path.exists(local_file):
                os.remove(local_file)
