from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@db:5432/parking_db"
    )
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Parking System"

    class Config:
        env_file = ".env"

settings = Settings()