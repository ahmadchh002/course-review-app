from beanie import Document
from pydantic import EmailStr
from typing import Optional, Literal
from datetime import datetime

class User(Document):
    role: Literal["user", "admin"] = "user"
    email: EmailStr
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = datetime.utcnow()
    class Settings:
        name = "users"  # The name of the collection in MongoDB