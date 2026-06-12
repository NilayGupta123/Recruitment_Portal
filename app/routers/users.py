from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.user import User
from app.routers.auth import get_current_user
from app.schemas.user import UserCreate, UserRead, UserUpdate, UserPartialUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/list", response_model=List[UserRead])
async def list_users(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)) -> List[UserRead]:
    result = await db.execute(select(User).order_by(User.id))
    return list(result.scalars().all())


@router.post("/create", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserRead:
    # hashed = get_password_hash(payload.password)
    user = User(email=payload.email, full_name=payload.full_name, user_type=payload.user_type, password=payload.password, phone_number=payload.phone_number)
    db.add(user)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")
    await db.refresh(user)
    return user


@router.get("/{user_id}", response_model=UserRead)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserRead:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserRead)
async def update_user(
    user_id: int,
    payload: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserRead:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.email = payload.email
    user.full_name = payload.full_name if payload.full_name is not None else user.full_name
    user.phone_number = payload.phone_number

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")
    await db.refresh(user)
    return user


@router.patch("/{user_id}", response_model=UserRead)
async def patch_user(
    user_id: int,
    payload: UserPartialUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> UserRead:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # update_data = payload.model_dump(exclude_unset=True)
    # for field, value in update_data.items():
    #     setattr(user, field, value)

    if payload.email:
        user.email = payload.email

    if payload.full_name:
        user.full_name = payload.full_name

    if payload.phone_number:
        user.phone_number = payload.phone_number


    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")
    await db.refresh(user)
    return user
