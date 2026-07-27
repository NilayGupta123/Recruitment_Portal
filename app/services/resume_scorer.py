import json
import os

from dotenv import load_dotenv
from google import genai

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

        prompt = f"""
You are an experienced Senior Technical Recruiter.

Your task is to evaluate how well a candidate matches a job.

=========================
JOB DETAILS
=========================

{json.dumps(job, indent=2)}

=========================
CANDIDATE PROFILE
=========================

{json.dumps(parsed_resume, indent=2)}

=========================

Evaluate the candidate objectively.

Consider:

• Required Skills
• Relevant Experience
• Education
• Certifications
• Projects
• Employment History
• Overall Fit

Scoring Guidelines

0-3
Candidate is unsuitable.

4-7
Candidate has potential but requires HR review.

8-10
Candidate is an excellent match.

Return ONLY valid JSON.

Do not return markdown.

Return exactly this schema.

{
    "score": 0,
    "decision": "",

    "summary": "",

    "matched_skills": [],

    "missing_skills": [],

    "strengths": [],

    "weaknesses": [],

    "experience_match": "",

    "education_match": "",

    "recommendation": ""
}

Rules

- score must be between 0 and 10.

- decision must be one of

AUTO_ACCEPT
REVIEW
AUTO_REJECT

- Do not invent information.

- If a required skill is absent, include it in missing_skills.

- recommendation should explain the hiring decision.

Return only JSON.
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0].strip()

        return json.loads(text)