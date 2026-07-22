from typing import Any

from pydantic import BaseModel


class GenerateDescriptionRequest(BaseModel):
    entity: str
    context: dict[str, Any]
    additional_prompt: str = ""


class GenerateDescriptionResponse(BaseModel):
    description: str