from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from ..models.user import User
from ..models.course import Course
from ..models.review import Review
from .config import get_settings

settings = get_settings()

async def init_db():
    # Create MongoDB client
    client = AsyncIOMotorClient(settings.MONGO_DETAILS)
    
    database_name = "course_review_db"
    database = client[database_name]
    
    # If database is None (common with Atlas URIs), specify your DB name
    if database.name is None:
        database = client["course_review_db"]  # replace with your actual DB name
    
    await init_beanie(
        database=database,           # <-- changed from client to database
        document_models=[User, Course, Review]
    )