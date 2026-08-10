import json


def get_screening_questions_prompt(data):

    return f"""
You are an experienced Senior Technical Interviewer.

Generate {data.number_of_questions} interview questions.

Interview Round

{data.interview_round}

Difficulty

{data.difficulty}

Job

{json.dumps(data.job, indent=2)}

Return ONLY valid JSON.

Schema

{{
    "questions":[
        {{
            "question":"",
            "expected_answer":"",
            "difficulty":"",
            "topic":""
        }}
    ]
}}

Rules

- Cover every important skill.
- Include conceptual and practical questions.
- Expected answers should explain what an ideal candidate should answer.
- Difficulty must be Easy, Medium or Hard.
- Return ONLY JSON.
"""