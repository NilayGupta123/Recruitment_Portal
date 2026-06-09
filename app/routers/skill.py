from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from Recruitment_Portal.app.models.skill import Skill
from app.db.session import get_db
from app.models.job import Job
from app.routers.auth import get_current_user

from app.schemas.skill import CreateSkill, ReadSkill

router = APIRouter(prefix="/skills", tags=["skills"])

@router.get("/list", response_model=List[ReadSkill])
async def list_skills(db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> List[ReadSkill]:
    result = await db.execute(select(Skill).order_by(Skill.id))
    return list(result.scalars().all())

@router.post("/create", response_model=ReadSkill, status_code=status.HTTP_201_CREATED)
async def create_skill(payload: CreateSkill, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadSkill:
    skill = Skill(name=payload.skill_name)
    db.add(skill)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Skill creation failed")
    await db.refresh(skill)
    return skill

@router.get("/get/{skill_id}", response_model=ReadSkill)
async def get_skill(skill_id: int, db: AsyncSession = Depends(get_db), current_user: int = Depends(get_current_user)) -> ReadSkill:
    result = await db.execute(select(Skill).where(Skill.id == skill_id))
    skill = result.scalar_one_or_none()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill