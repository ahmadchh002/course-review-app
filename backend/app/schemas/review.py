from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class ReviewCreate(BaseModel):
    course_code: str
    rating: int = Field(..., ge=1, le=5)
    content: str
    grade: Optional[str] = None
    difficulty_level: Optional[int] = Field(None, ge=1, le=5)
    resources: List[str] = []
    goodInstructors: List[str] = []
    badInstructors: List[str] = []

class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    content: Optional[str] = None
    grade: Optional[str] = None
    difficulty_level: Optional[int] = Field(None, ge=1, le=5)
    resources: Optional[List[str]] = None
    goodInstructors: Optional[List[str]] = None
    badInstructors: Optional[List[str]] = None

class ReviewOut(BaseModel):
    id: str
    user_id: str
    course_code: str
    rating: int
    content: str
    grade: Optional[str] = None
    difficulty_level: Optional[int] = None
    resources: List[str] = []
    goodInstructors: List[str] = []
    badInstructors: List[str] = []
    created_at: datetime