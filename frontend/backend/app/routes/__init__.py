from app.routes.farmer import router as farmer_router
from app.routes.iot import router as iot_router
from app.routes.weather import router as weather_router
from app.routes.vision import router as vision_router
from app.routes.agents import router as agents_router
from app.routes.crisis import router as crisis_router
from app.routes.voice import router as voice_router
from app.routes.alerts import router as alerts_router
from app.routes.schedule import router as schedule_router

__all__ = [
    "farmer_router",
    "iot_router",
    "weather_router",
    "vision_router",
    "agents_router",
    "crisis_router",
    "voice_router",
    "alerts_router",
    "schedule_router"
]
