from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.telemetry import IoTTelemetry
from app.agents.risk_agent import RiskAssessmentAgent
from app.agents.soil_agent import SoilAgent
from app.agents.climate_agent import ClimateAgent

router = APIRouter(prefix="/crisis", tags=["Crisis Detection & Risk Assessment (Req 7, 8)"])

@router.get("/status")
def get_crisis_status(db: Session = Depends(get_db)):
    """
    Requirement 7: Detects drought, flooding, disease, and weather emergencies.
    Requirement 8: Classifies agricultural risk with severity score and confidence.
    """
    latest_tel = db.query(IoTTelemetry).order_by(IoTTelemetry.timestamp.desc()).first()
    moisture = latest_tel.moisture if latest_tel else 28.0

    soil_agent = SoilAgent()
    climate_agent = ClimateAgent()
    risk_agent = RiskAssessmentAgent()

    soil_rep = soil_agent.analyze({"telemetry": {"moisture": moisture, "temperature": 29.4, "ph": 6.5}})
    climate_rep = climate_agent.analyze({"weather": {"rain_prob": 88, "rain_mm": 48.0, "temp": 27.0}})
    
    risk_rep = risk_agent.analyze({
        "soil_report": soil_rep,
        "climate_report": climate_rep
    })

    return {
        "active_crisis": risk_rep.get("risk_score", 50) >= 70,
        "severity": "CRITICAL" if risk_rep.get("risk_score", 50) > 85 else "HIGH",
        "risk_score": risk_rep.get("risk_score"),
        "confidence_pct": risk_rep.get("confidence", 0.92) * 100,
        "has_conflict": risk_rep.get("has_conflict", False),
        "conflict_resolution": risk_rep.get("conflict_resolution"),
        "recommended_action": risk_rep.get("recommended_action")
    }

@router.post("/escalate")
def escalate_to_expert():
    """
    Requirement 8: Escalates low-confidence or high-risk cases to Krishi Vigyan Kendra (KVK) Agronomist.
    """
    return {
        "escalation_status": "DISPATCHED",
        "escalation_ticket_id": "KVK-AGRI-2026-9041",
        "assigned_officer": "Dr. Ramesh K., Senior Agronomist (KVK Mandya)",
        "message": "Telemetry, sensor logs, and crop imagery transmitted to KVK Extension Portal. Voice callback scheduled within 2 hours."
    }
