import os
import json

from app.core.config import settings

from google import genai
from google.genai import types

from app.services.prompts.description_prompts import (
    get_description_prompt,
)

from app.services.prompts.screening_prompts import (
    get_screening_questions_prompt,
)

client = genai.Client(
    api_key=settings.gemini_api_key
)


class AIService:

    @staticmethod
    async def generate_description(data):
        """
        Generate an AI description for any entity
        (Job, Campaign, etc.)
        """

        # Convert context dictionary into readable text
        context = "\n".join(
            [
                f"{key.replace('_', ' ').title()}: {value}"
                for key, value in data.context.items()
                if value not in [None, "", []]
            ]
        )

        # Entity-specific instructions
        if data.entity.lower() == "job":
            instruction = """
Generate a professional ATS-friendly Job Description.

Include the following sections:

# Job Summary

# Responsibilities

# Required Qualifications

# Preferred Qualifications

# Benefits

# Equal Opportunity Statement
"""

        elif data.entity.lower() == "campaign":
            instruction = """
Generate a professional recruitment campaign description.

Include:

# Campaign Overview

# Objectives

# Target Candidates

# Benefits

# Additional Information
"""

        else:
            instruction = f"""
Generate a professional {data.entity} description.
"""

        prompt = get_description_prompt(
            entity=data.entity,
            context=context,
            additional_prompt=data.additional_prompt,
            instruction=instruction,
        )

        response = client.models.generate_content(
            model="gemini-flash-lite-latest",
            contents=prompt,
        )

        return response.text

    @staticmethod
    async def generate_screening_questions(data):

        prompt = get_screening_questions_prompt(data)

        response = client.models.generate_content(
            model="gemini-flash-lite-latest",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                response_mime_type="application/json",
            ),
        )

        try:
            parsed = json.loads(response.text)
        except json.JSONDecodeError as exc:
            raise ValueError(
                "Gemini returned an invalid JSON response."
            ) from exc

        # Model sometimes returns a bare list instead of {"questions": [...]}
        if isinstance(parsed, list):
            return {"questions": parsed}

        if isinstance(parsed, dict):
            if isinstance(parsed.get("questions"), list):
                return {"questions": parsed["questions"]}
            # Some models nest under other keys
            for key in ("data", "items", "result"):
                value = parsed.get(key)
                if isinstance(value, list):
                    return {"questions": value}

        raise ValueError(
            "Gemini response did not include a questions list."
        )