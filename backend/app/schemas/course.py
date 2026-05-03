from pydantic import BaseModel
from typing import Optional

class CourseCreate(BaseModel):
    code: str
    name: str
    description: str
    instructor: str

class CourseUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    instructor: Optional[str] = None

class CourseOut(BaseModel):
    id: str
    code: str
    name: str
    description: str
    instructor: str
    avg_rating: Optional[float]