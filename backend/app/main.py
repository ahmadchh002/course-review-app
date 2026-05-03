from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.database import init_db
from app.api.routes import courses, reviews, users
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to the db
    await init_db()
    yield
    # Shutdown: Clean up if needed (client will close automatically)

app = FastAPI(lifespan = lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(reviews.router, prefix="/reviews", tags=["Reviews"])
app.include_router(users.router, prefix="/users", tags=["Users"])
