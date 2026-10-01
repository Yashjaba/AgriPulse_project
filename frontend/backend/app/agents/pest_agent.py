from app.agents.base_agent import BaseAgent
from typing import Dict, Any

class PestDiseaseAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_pest", name="🐛 Pest / Disease Agent")

    def analyze(self, context: Dict[str, Any]) -> Dict[str, Any]:
        pest_data = context.get("pest", {})
        pest_type = pest_data.get("type", "Aphids")
        density = pest_data.get("density", "Low-to-Moderate")

        if density in ["High", "Severe"]:
            status = "PEST_OUTBREAK"
            confidence = 0.93
            obs = f"Critical pest concentration detected ({pest_type}). Spreading rapidly across plots."
            action = "Deploy pheromone lure traps and spray bio-pesticide (Bacillus thuringiensis / Neem extract)."
        else:
            status = "MONITORING"
            confidence = 0.89
            obs = f"Border perimeter monitoring: {pest_type} detected at low density 1.8km east."
            action = "Maintain border marigold barrier crops and yellow sticky cards."

        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "status": status,
            "confidence": confidence,
            "observation": obs,
            "recommended_action": action
        }
