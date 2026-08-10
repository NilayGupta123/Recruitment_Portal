from typing import Any

from pydantic import BaseModel


class GenerateDescriptionRequest(BaseModel):
    entity: str
    context: dict[str, Any]
    additional_prompt: str = ""


class GenerateDescriptionResponse(BaseModel):
    description: str

class GenerateScreeningQuestionsRequest(BaseModel):
    job: dict[str, Any]
    interview_round: str = "Technical"
    difficulty: str = "Mixed"
    number_of_questions: int = 10


class ScreeningQuestion(BaseModel):
    question: str
    expected_answer: str
    difficulty: str
    topic: str


class GenerateScreeningQuestionsResponse(BaseModel):
    questions: list[ScreeningQuestion]