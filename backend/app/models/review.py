from beanie import Document
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from bson import ObjectId
from beanie import PydanticObjectId

class Review(Document):
    user_id: PydanticObjectId
    course_code: str
    rating: int  # e.g., 1 to 5
    content: str
    grade: Optional[str] = None
    difficulty_level: Optional[int] = None
    resources: List[str] = []
    goodInstructors: List[str] = []
    badInstructors: List[str] = []
    created_at: datetime = datetime.utcnow()
    class Settings:
        name = "reviews"
        indexes = [
            [("course_code", 1)],  # Index for course lookups
            [("user_id", 1)],      # Index for user lookups
        ]