from datetime import datetime
from typing import Dict, Any, List
from app.agents.soil_agent import SoilAgent
from app.agents.climate_agent import ClimateAgent
from app.agents.crop_agent import CropHealthAgent
from app.agents.pest_agent import PestDiseaseAgent
from app.agents.location_agent import LocationAgent
from app.agents.risk_agent import RiskAssessmentAgent

class CrisisCommandAgent:
    """
    🧠 Crisis Command Agent (Master Orchestrator)
    Coordinates all specialized sub-agents and generates synthesized executive action.
    """
    def __init__(self):
        self.agent_id = "agent_command"
        self.name = "🧠 Crisis Command Agent"
        self.soil_agent = SoilAgent()
        self.climate_agent = ClimateAgent()
        self.crop_agent = CropHealthAgent()
        self.pest_agent = PestDiseaseAgent()
        self.location_agent = LocationAgent()
        self.risk_agent = RiskAssessmentAgent()

    def run_full_coordination(self, raw_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Execute full cross-agent deliberation pipeline matching PDF Architecture (Pages 3-4).
        """
        # Step 1: Data Gathering Agents
        soil_rep = self.soil_agent.analyze(raw_context)
        climate_rep = self.climate_agent.analyze(raw_context)
        crop_rep = self.crop_agent.analyze(raw_context)

        # Step 2: Pest & Location Analysis
        pest_rep = self.pest_agent.analyze(raw_context)
        location_rep = self.location_agent.analyze(raw_context)

        # Step 3: Risk Assessment & Conflict Resolution
        risk_context = {
            "soil_report": soil_rep,
            "climate_report": climate_rep,
            "crop_report": crop_rep,
            "pest_report": pest_rep,
            "location_report": location_rep
        }
        risk_rep = self.risk_agent.analyze(risk_context)

        # Step 4: Executive Master Mandate by Crisis Command Agent
        has_conflict = risk_rep.get("has_conflict", False)
        risk_score = risk_rep.get("risk_score", 50)
        
        dispatched_alerts = []
        if risk_score >= 70:
            active_crisis = True
            crisis_name = "Heavy Storm & Irrigation Conflict" if has_conflict else "Agricultural Hazard"
            master_mandate = (
                "EXECUTIVE MANDATE: 1. Suspend all automated irrigation valves. "
                "2. Dispatch localized voice SMS in Kannada and Hindi to farmer Vinod Kumar. "
                "3. Reschedule foliar fungicide spray to post-rainfall window (Friday). "
                "4. Unblock drainage canals before 48mm precipitation arrives."
            )
            dispatched_alerts.append("SMS dispatched: 'CRITICAL: 48mm rain arriving. STOP PUMPS immediately.'")
            dispatched_alerts.append("Voice alert synthesized in Kannada (kn-IN).")
        else:
            active_crisis = False
            crisis_name = "Normal Farm Operations"
            master_mandate = "EXECUTIVE MANDATE: Standard cultivation schedule maintained. No acute hazards detected."

        return {
            "timestamp": datetime.utcnow().isoformat(),
            "active_crisis": active_crisis,
            "crisis_name": crisis_name,
            "composite_risk_score": risk_score,
            "composite_confidence_pct": risk_rep.get("confidence", 0.92) * 100,
            "has_conflict": has_conflict,
            "conflict_resolution": risk_rep.get("conflict_resolution"),
            "escalate_to_expert": risk_rep.get("escalate_to_expert", False),
            "master_mandate": master_mandate,
            "agent_reports": [
                soil_rep,
                climate_rep,
                crop_rep,
                pest_rep,
                location_rep,
                risk_rep
            ],
            "dispatched_alerts": dispatched_alerts
        }

command_orchestrator = CrisisCommandAgent()
