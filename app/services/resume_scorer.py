from __future__ import annotations

import html
import json

from google import genai
from google.genai import types

from app.core.config import settings
from app.services.prompts.resume_scorer_prompt import get_resume_scoring_prompt

client = genai.Client(api_key=settings.gemini_api_key)


def _list_to_html(items: list | None) -> str:
    if not items:
        return ""
    lis = "".join(f"<li>{html.escape(str(item))}</li>" for item in items if item)
    return f"<ul>{lis}</ul>" if lis else ""


class ResumeScorer:
    @staticmethod
    async def score(parsed_resume: dict, job: dict) -> dict:
        prompt = get_resume_scoring_prompt(parsed_resume, job)

        response = client.models.generate_content(
            model=settings.gemini_model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2,
                response_mime_type="application/json",
            ),
        )

        text = (response.text or "").strip()

        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0].strip()

        try:
            result = json.loads(text)
        except json.JSONDecodeError as exc:
            raise ValueError("Gemini returned an invalid JSON response.") from exc

        if "score" in result:
            result["score"] = max(0.0, min(10.0, float(result["score"])))

        decision = str(result.get("decision") or "REVIEW").upper()
        if decision not in {"AUTO_ACCEPT", "REVIEW", "AUTO_REJECT"}:
            decision = "REVIEW"
        result["decision"] = decision

        praise = (result.get("praise_html") or result.get("praiseHtml") or "").strip()
        critique = (
            result.get("critique_html") or result.get("critiqueHtml") or ""
        ).strip()

        if not praise:
            praise = _list_to_html(result.get("strengths") or [])
        if not critique:
            critique = _list_to_html(result.get("weaknesses") or [])

        result["praise_html"] = praise
        result["critique_html"] = critique
        result["summary"] = (result.get("summary") or result.get("recommendation") or "").strip()

        return result
