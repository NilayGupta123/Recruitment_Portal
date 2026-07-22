import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
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

        prompt = f"""
You are an experienced HR Recruiter.

{instruction}

Context

{context}

Additional Instructions

{data.additional_prompt}

Requirements

- Keep the entire description between 250 and 350 words.
- Job Summary: maximum 70 words.
- Responsibilities: 5-7 bullet points.
- Required Qualifications: 5 bullet points.
- Preferred Qualifications: maximum 3 bullet points.
- Benefits: maximum 4 bullet points.
- Equal Opportunity Statement: one short sentence.
- Return VALID HTML ONLY.
  Do NOT return markdown.
  Do NOT wrap the response in ```html.
  Use only these HTML tags:
    <h2>
    <p>
    <ul>
    <li>
    <strong>
-Structure exactly like this:

    <h2>Job Summary</h2>

    <p>...</p>

    <h2>Responsibilities</h2>

    <ul>
    <li>...</li>
    <li>...</li>
    </ul>

    <h2>Required Qualifications</h2>

    <ul>
    <li>...</li>
    </ul>

    <h2>Benefits</h2>

    <ul>
    <li>...</li>
    </ul>

    <h2>Equal Opportunity</h2>

    <p>One short sentence.</p>
-No CSS.
-No inline styles.
-Professional tone.
-Leave a space and bold and underline each title of each section also each point should have a bullet point in front of it.
"""

        response = client.models.generate_content(
            model="gemini-flash-lite-latest",
            contents=prompt,
        )

        return response.text