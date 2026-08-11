import json


def get_resume_scoring_prompt(parsed_resume, job):
    return f"""
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

Do not return markdown fences.

Return exactly this schema:

{{
    "score": 0,
    "decision": "",
    "summary": "",
    "matched_skills": [],
    "missing_skills": [],
    "strengths": [],
    "weaknesses": [],
    "praise_html": "",
    "critique_html": "",
    "experience_match": "",
    "education_match": "",
    "recommendation": ""
}}

Rules

- score must be between 0 and 10.
- decision must be one of: AUTO_ACCEPT, REVIEW, AUTO_REJECT
- praise_html must be HTML (use <ul><li>…</li></ul>) describing what is strong about the candidate.
- critique_html must be HTML (use <ul><li>…</li></ul>) describing gaps, risks, or missing requirements.
- Do not invent information not present in the profile or job.
- If a required skill is absent, include it in missing_skills and mention it in critique_html.
- recommendation should explain the hiring decision in plain text.
- summary should be 1–2 sentences of plain text.

Return only JSON.
"""
