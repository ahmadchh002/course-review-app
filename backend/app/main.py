from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.database import init_db
from app.api.routes import courses, reviews, users

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to the db
    await init_db()
    yield
    # Shutdown: Clean up if needed (client will close automatically)

app = FastAPI(lifespan = lifespan)


# Include routers
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
app.include_router(users.router, prefix="/users", tags=["Users"])
