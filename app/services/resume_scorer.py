import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.services.prompts.resume_scorer_prompt import (
    get_resume_scoring_prompt,
)

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


class ResumeScorer:

    @staticmethod
    async def score(
        parsed_resume: dict,
        job: dict,
    ) -> dict:

        prompt = get_resume_scoring_prompt(
            parsed_resume,
            job,
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                response_mime_type="application/json",
            ),
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0].strip()

        try:
            result = json.loads(text)

            # Ensure score stays between 0 and 10
            if "score" in result:
                result["score"] = max(
                    0,
                    min(
                        10,
                        float(result["score"]),
                    ),
                )

            return result

        except json.JSONDecodeError:
            raise ValueError(
                "Gemini returned an invalid JSON response."
            )