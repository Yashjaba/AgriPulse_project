from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
import app.models  # ensure models are registered with Base metadata
from app.routes import (
    farmer_router,
    iot_router,
    weather_router,
    vision_router,
    agents_router,
    crisis_router,
    voice_router,
    alerts_router,
    schedule_router
)

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Multi-Agent AI-Powered Agricultural Crisis Command System Backend for GATEWAYS 2026 Round 1 (Team Titans)"
)

# Enable CORS for frontend connection (port 3000, port 5173, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all feature routes under /api
app.include_router(farmer_router, prefix=settings.API_PREFIX)
app.include_router(iot_router, prefix=settings.API_PREFIX)
app.include_router(weather_router, prefix=settings.API_PREFIX)
app.include_router(vision_router, prefix=settings.API_PREFIX)
app.include_router(agents_router, prefix=settings.API_PREFIX)
app.include_router(crisis_router, prefix=settings.API_PREFIX)
app.include_router(voice_router, prefix=settings.API_PREFIX)
app.include_router(alerts_router, prefix=settings.API_PREFIX)
app.include_router(schedule_router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "status": "ONLINE",
        "system": settings.PROJECT_NAME,
        "team": settings.TEAM_NAME,
        "event": settings.EVENT,
        "docs_url": "/docs",
        "api_prefix": settings.API_PREFIX,
        "architecture": {
            "frontend": "React.js + Tailwind CSS",
            "backend": "Python + FastAPI",
            "ai_agents": [
                "🌱 Soil Agent",
                "🌦️ Climate Agent",
                "🌾 Crop Health Agent",
                "🐛 Pest/Disease Agent",
                "📍 Location Agent",
                "📊 Risk Assessment Agent",
                "🧠 Crisis Command Agent"
            ],
            "database": "SQLite / PostgreSQL / Firebase Compatible (SQLAlchemy ORM)",
            "iot": "ESP32 Sensors (Moisture, Temp, pH, NPK)"
        }
    }
