from fastapi import APIRouter, HTTPException

from app.schemas.ai import (
    GenerateDescriptionRequest,
    GenerateDescriptionResponse,
    GenerateScreeningQuestionsRequest,
    GenerateScreeningQuestionsResponse,
)

from app.services.ai_service import AIService

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post(
    "/generate-description",
    response_model=GenerateDescriptionResponse,
)
async def generate_description(
    payload: GenerateDescriptionRequest,
):

    description = (
        await AIService.generate_description(
            payload
        )
    )

    return {
        "description": description
    }

@router.post(
    "/generate-screening-questions",
    response_model=GenerateScreeningQuestionsResponse,
)
async def generate_screening_questions(
    payload: GenerateScreeningQuestionsRequest,
):
    try:
        response = await AIService.generate_screening_questions(
            payload
        )
    except ValueError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    # Final guard so response_model always gets an object
    if isinstance(response, list):
        return {"questions": response}
    if isinstance(response, dict) and "questions" not in response:
        return {"questions": []}
    return response