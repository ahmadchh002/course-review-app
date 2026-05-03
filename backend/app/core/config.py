from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    # MongoDB connection
    MONGO_DETAILS: str
    
    # JWT settings
    SECRET_KEY: str
    ALGORITHM: str = "HS256"  # default if not in .env
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # default if not in .env
    
    # Tell pydantic-settings where to find the .env file
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"  # ignore extra env vars not defined here
    )

@lru_cache()
def get_settings() -> Settings:
    return Settings()