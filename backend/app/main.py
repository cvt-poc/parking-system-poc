from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import parking_router
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="Parking System API")

# Configure CORS - add all required origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Add prometheus metrics
Instrumentator().instrument(app).expose(app)

# Include routers
app.include_router(parking_router, prefix="/api/parking", tags=["parking"])