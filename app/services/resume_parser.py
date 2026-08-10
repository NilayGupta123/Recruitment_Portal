import json
import os
import tempfile

import requests
from app.core.config import settings
from google import genai

from app.services.prompts.resume_parser_prompt import (
    RESUME_PARSER_PROMPT,
)


client = genai.Client(
    api_key=settings.gemini_api_key
)


class ResumeParser:

    @staticmethod
    def _download_resume(resume_url: str) -> str:
        """
        Download the resume from S3 and return
        the local temporary file path.
        """

        response = requests.get(resume_url)
        response.raise_for_status()

        extension = os.path.splitext(resume_url)[1]

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=extension,
        ) as temp_file:
            temp_file.write(response.content)
            return temp_file.name

    @staticmethod
    async def parse(resume_url: str) -> dict:

        local_file = ResumeParser._download_resume(
            resume_url
        )

        try:

            uploaded_file = client.files.upload(
                file=local_file
            )

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    uploaded_file,
                    RESUME_PARSER_PROMPT,
                ],
            )

            text = response.text.strip()

            if text.startswith("```"):
                text = text.split("\n", 1)[1]
                text = text.rsplit("```", 1)[0].strip()

            try:
                return json.loads(text)

            except json.JSONDecodeError:
                raise ValueError(
                    "Gemini returned an invalid JSON response."
                )

        finally:
            if os.path.exists(local_file):
                os.remove(local_file)