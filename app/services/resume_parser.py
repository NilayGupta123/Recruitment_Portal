import json
import os
import tempfile

import requests
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
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

            prompt = """
You are an experienced recruitment assistant.

Analyze the uploaded resume.

Extract all information accurately.

Return ONLY valid JSON.

Do NOT wrap the response inside markdown.

Schema:

{
  "full_name": null,
  "email": null,
  "phone_number": null,
  "address": null,

  "summary": null,

  "linkedin_url": null,
  "github_url": null,
  "portfolio_url": null,

  "current_company": null,
  "current_designation": null,

  "years_of_experience": 0,

  "skills": [],

  "education": [
    {
      "degree": null,
      "institution": null,
      "start_year": null,
      "end_year": null,
      "cgpa": null
    }
  ],

  "experience": [
    {
      "company": null,
      "designation": null,
      "start_date": null,
      "end_date": null,
      "description": null
    }
  ],

  "projects": [
    {
      "title": null,
      "description": null,
      "technologies": []
    }
  ],

  "certifications": [
    {
      "name": null,
      "issuer": null,
      "year": null
    }
  ],

  "languages": []
}

Rules:

- Do not invent information.
- Return null if information is unavailable.
- Extract every technical skill.
- Extract internships as experience.
- Extract projects separately.
- Return only JSON.
"""

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    uploaded_file,
                    prompt,
                ],
            )

            text = response.text.strip()

            if text.startswith("```"):
                text = text.split("\n", 1)[1]
                text = text.rsplit("```", 1)[0].strip()

            return json.loads(text)

        finally:
            if os.path.exists(local_file):
                os.remove(local_file)