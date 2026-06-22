from __future__ import annotations

from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import jwt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
# from passlib.context import CryptContext

from app.core.config import settings
from app.db.session import get_db
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

# Simple in-memory blacklist for revoked tokens. Replace with persistent store in production.
token_blacklist: set[str] = set()

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(payload_password: str, user_password: str) -> bool:
	# return pwd_context.verify(plain_password, hashed_password
    return payload_password == user_password  # Replace with actual hash verification in production


# def get_password_hash(password: str) -> str:
# 	return pwd_context.hash(password)


class TokenResponse(BaseModel):
	access_token: str
	token_type: str = "bearer"


class LoginRequest(BaseModel):
	email: str
	password: str


async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
	to_encode = data.copy()
	expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
	to_encode.update({"exp": expire})
	encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
	return encoded_jwt


@router.post("/login", response_model=TokenResponse)
async def login(
	payload: LoginRequest,
	db: AsyncSession = Depends(get_db)
) -> TokenResponse:
	
	result = await db.execute(select(User).where(User.email == payload.email))
	user = result.scalar_one_or_none()
	
	if not user:
		raise HTTPException(status_code=400, detail="Invalid Email")
	
	if not verify_password(payload.password, user.password):
		raise HTTPException(status_code=400, detail="Invalid credentials")

	token = await create_access_token({"user_id": str(user.id), "email": user.email})
	return {"access_token": token, "token_type": "bearer"}


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: AsyncSession = Depends(get_db)) -> User:
	token = credentials.credentials
	if token in token_blacklist:
		raise HTTPException(status_code=401, detail="Token revoked")
	try:
		payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
		user_id = int(payload.get("user_id"))
	except Exception:
		raise HTTPException(status_code=401, detail="Could not validate credentials")
	result = await db.execute(select(User).where(User.id == user_id))
	user = result.scalar_one_or_none()
	if not user:
		raise HTTPException(status_code=401, detail="User not found")
	return user


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
	token = credentials.credentials
	token_blacklist.add(token)
	return None


@router.get("/me", response_model=dict)
async def me(current: User = Depends(get_current_user)) -> dict:
	return {"id": current.id, "email": current.email, "full_name": current.full_name,"user_type": current.user_type}

