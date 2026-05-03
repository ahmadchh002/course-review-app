from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class ReviewCreate(BaseModel):
    course_code: str
    rating: int = Field(..., ge=1, le=5)
    content: str

class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    content: Optional[str] = None

class ReviewOut(BaseModel):
    id: str
    user_id: str
    course_code: str
    rating: int
    content: str
    created_at: datetime