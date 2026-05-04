from pydantic import BaseModel
from typing import Optional

class CourseCreate(BaseModel):
    code: str
    name: str
    description: str

class CourseUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class CourseOut(BaseModel):
    id: str
    code: str
    name: str
    description: str
    avg_rating: Optional[float]
    review_count: int = 0