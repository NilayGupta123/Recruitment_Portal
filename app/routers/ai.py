from fastapi import APIRouter

from app.schemas.ai import (
    GenerateDescriptionRequest,
    GenerateDescriptionResponse,
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