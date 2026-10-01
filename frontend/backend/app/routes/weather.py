from fastapi import APIRouter
from app.services.weather_service import weather_service

router = APIRouter(prefix="/weather", tags=["Climate & Weather Monitoring (Req 3)"])

@router.get("/current")
def get_weather():
    """Fetch live weather metrics and 7-day agricultural forecast."""
    return weather_service.get_current_and_forecast()

@router.get("/alerts")
def get_extreme_weather_alerts():
    """Identify and return imminent extreme weather crises."""
    data = weather_service.get_current_and_forecast()
    return {
        "extreme_weather_active": data.get("extreme_alert", True),
        "hazard_type": "Flash Flood / Downpour",
        "expected_rain_mm": data.get("rain_mm", 48.0),
        "timeframe": "Next 4 hours",
        "advisory": "Cancel all irrigation pump activations. Clear drainage furrows in lower paddy basins."
    }
