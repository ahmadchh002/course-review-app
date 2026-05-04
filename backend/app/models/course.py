from beanie import Document
from typing import Optional, List

class Course(Document):
    code: str
    name: str
    description: str
    avg_rating: Optional[float] = 0.0
    class Settings:
        name = "courses"
        indexes = [
            "code", # Simple index for fast lookup
            [("code", 1)] # Or use a standard directive
        ]

