from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.agents.crisis_command import command_orchestrator
from app.schemas.agent import MultiAgentCoordinationResult
from app.models.telemetry import IoTTelemetry
from app.models.farmer import FarmerProfile

router = APIRouter(prefix="/agents", tags=["Multi-Agent AI Coordination (Req 6)"])

@router.post("/deliberate", response_model=MultiAgentCoordinationResult)
def trigger_agent_deliberation(
    simulated_moisture: float = None,
    db: Session = Depends(get_db)
):
    """
    Triggers full deliberation cycle among all 7 specialized AI agents:
    - Soil Agent
    - Climate Agent
    - Crop Health Agent
    - Pest/Disease Agent
    - Location Agent
    - Risk Assessment Agent
    - Crisis Command Agent
    """
    # Fetch real or latest telemetry
    latest_tel = db.query(IoTTelemetry).order_by(IoTTelemetry.timestamp.desc()).first()
    farmer = db.query(FarmerProfile).first()

    moisture = simulated_moisture if simulated_moisture is not None else (latest_tel.moisture if latest_tel else 28.0)
    temp = latest_tel.temperature if latest_tel else 29.4
    ph = latest_tel.ph if latest_tel else 6.5

    context = {
        "telemetry": {"moisture": moisture, "temperature": temp, "ph": ph},
        "weather": {"rain_prob": 88, "rain_mm": 48.0, "temp": 27.0},
        "crop": {"disease_name": "Early Blight (Alternaria solani)", "confidence": 0.946},
        "pest": {"type": "Aphids", "density": "Low-to-Moderate"},
        "farmer": {
            "name": farmer.name if farmer else "S Vinod Kumar",
            "latitude": farmer.latitude if farmer else 12.5234,
            "longitude": farmer.longitude if farmer else 76.8967,
            "location": farmer.location if farmer else "Mandya, Karnataka"
        }
    }

    result = command_orchestrator.run_full_coordination(context)
    return result
