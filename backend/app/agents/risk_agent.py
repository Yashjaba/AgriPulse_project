from app.agents.base_agent import BaseAgent
from typing import Dict, Any

class RiskAssessmentAgent(BaseAgent):
    """
    Risk Assessment Agent with Edge Case Conflict Resolution Engine
    Directly implements Section 6 from GATEWAYS 2026 Round 1 Architecture Document.
    """
    def __init__(self):
        super().__init__(agent_id="agent_risk", name="📊 Risk Assessment Agent")

    def analyze(self, context: Dict[str, Any]) -> Dict[str, Any]:
        soil_rep = context.get("soil_report", {})
        climate_rep = context.get("climate_report", {})
        crop_rep = context.get("crop_report", {})
        
        soil_status = soil_rep.get("status", "OPTIMAL")
        climate_status = climate_rep.get("status", "FAVORABLE")
        
        has_conflict = False
        conflict_resolution = None
        risk_score = 50
        confidence = 0.92
        escalate_to_expert = False

        # =========================================================================
        # PDF EDGE CASE: Conflicting Telemetry (Soil Dry vs Climate Heavy Rain)
        # =========================================================================
        if soil_status in ["DRY_DEFICIT", "CRITICAL_DROUGHT"] and climate_status == "STORM_INBOUND":
            has_conflict = True
            risk_score = 74
            confidence = 0.92
            conflict_resolution = (
                "CONFLICT RESOLVED: Soil moisture sensor indicates dry soil (deficit), normally triggering "
                "an irrigation command. However, Climate Agent forecasts an imminent 48mm storm in 4 hours. "
                "DECISION: OVERRIDE soil sensor and SUSPEND irrigation pumps. Irrigating now will compound "
                "precipitation, causing severe waterlogging, anaerobic root hypoxia, and fertilizer leaching."
            )
            action = "Block automated irrigation solenoids; instruct farmer to clear drainage furrows."
            obs = "Conflict detected between Soil Agent (Dry) and Climate Agent (Storm). Auto-resolved via risk matrix."

        elif climate_status == "STORM_INBOUND" and soil_status == "WATERLOGGED":
            # Compounding crisis
            has_conflict = False
            risk_score = 95
            confidence = 0.96
            action = "DISPATCH EMERGENCY FLOOD ALERT: Soil already saturated and heavy storm incoming."
            obs = "Severe compounding flood hazard."

        elif soil_status == "CRITICAL_DROUGHT" and climate_status == "FAVORABLE":
            has_conflict = False
            risk_score = 88
            confidence = 0.97
            action = "DISPATCH DROUGHT ALERT: Turn on irrigation pump immediately."
            obs = "Prolonged drought deficit without rain in forecast."

        elif crop_rep.get("status") == "SUSPICIOUS":
            escalate_to_expert = True
            confidence = 0.65
            risk_score = 60
            obs = "Crop leaf diagnosis uncertain (<70% confidence). Escalating to KVK Agronomist."
            action = "Transmit telemetry and leaf image to Agricultural Extension Officer."
        else:
            risk_score = 25
            confidence = 0.94
            obs = "No acute crisis detected. All parameters within safe agricultural variance."
            action = "Continue scheduled farm operations."

        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "status": "ASSESSED",
            "confidence": confidence,
            "risk_score": risk_score,
            "has_conflict": has_conflict,
            "conflict_resolution": conflict_resolution,
            "escalate_to_expert": escalate_to_expert,
            "observation": obs,
            "recommended_action": action
        }
