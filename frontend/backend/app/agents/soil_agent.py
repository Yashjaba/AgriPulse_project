from app.agents.base_agent import BaseAgent
from typing import Dict, Any

class SoilAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_soil", name="🌱 Soil Agent")

    def analyze(self, context: Dict[str, Any]) -> Dict[str, Any]:
        telemetry = context.get("telemetry", {})
        moisture = telemetry.get("moisture", 28.0)
        temp = telemetry.get("temperature", 29.4)
        ph = telemetry.get("ph", 6.5)

        if moisture < 20.0:
            status = "CRITICAL_DROUGHT"
            confidence = 0.98
            obs = f"Critical soil moisture deficit ({moisture}%). Below permanent wilting point."
            action = "Immediate irrigation required unless extreme rain predicted."
        elif moisture < 35.0:
            status = "DRY_DEFICIT"
            confidence = 0.96
            obs = f"Soil moisture at {moisture}% (Dry deficit). Normal threshold recommends 50-70%."
            action = "Recommend standard drip irrigation cycle."
        elif moisture > 85.0:
            status = "WATERLOGGED"
            confidence = 0.97
            obs = f"Soil moisture saturated at {moisture}%. Roots at risk of hypoxia."
            action = "Open drainage furrows immediately. Suspend all water inputs."
        else:
            status = "OPTIMAL"
            confidence = 0.95
            obs = f"Soil moisture optimal at {moisture}%, pH {ph} balanced."
            action = "Maintain normal cultivation."

        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "status": status,
            "confidence": confidence,
            "observation": obs,
            "recommended_action": action,
            "raw_metrics": {"moisture": moisture, "temperature": temp, "ph": ph}
        }
