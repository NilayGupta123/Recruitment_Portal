def get_description_prompt(
    entity: str,
    context: str,
    additional_prompt: str,
    instruction: str,
) -> str:

    return f"""
You are an experienced HR Recruiter.

{instruction}

Context

{context}

Additional Instructions

{additional_prompt}

Requirements

- Keep the entire description between 250 and 350 words.
- Job Summary: maximum 70 words.
- Responsibilities: 5-7 bullet points.
- Required Qualifications: 5 bullet points.
- Preferred Qualifications: maximum 3 bullet points.
- Benefits: maximum 4 bullet points.
- Equal Opportunity Statement: one short sentence.

Return VALID HTML ONLY.

Do NOT return markdown.
Do NOT wrap the response in ```html.

Use only these HTML tags:

<h2>
<p>
<ul>
<li>
<strong>

Structure exactly like this:

<h2>Job Summary</h2>

<p>...</p>

<h2>Responsibilities</h2>

<ul>
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

No CSS.

No inline styles.

Professional tone.

Leave a space and bold and underline each title of each section also each point should have a bullet point in front of it.
"""