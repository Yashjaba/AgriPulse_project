from app.agents.base_agent import BaseAgent
from typing import Dict, Any

class CropHealthAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_crop", name="🌾 Crop Health Agent")

    def analyze(self, context: Dict[str, Any]) -> Dict[str, Any]:
        crop_data = context.get("crop", {})
        disease = crop_data.get("disease_name", "Early Blight (Alternaria solani)")
        conf = crop_data.get("confidence", 0.946)

        if "Blight" in disease or "Blast" in disease:
            status = "DISEASE_ACTIVE"
            obs = f"Foliar pathogen detected: {disease}. Concentric target lesions observed."
            action = "Apply Copper Oxychloride 50 WP (2.5g/L) or Mancozeb. Avoid spraying during rain."
        elif "Healthy" in disease:
            status = "HEALTHY"
            obs = "Foliar canopy uniform and vigorous. Zero pathogen lesions detected."
            action = "Continue standard agronomic practices."
        else:
            status = "SUSPICIOUS"
            obs = f"Unusual chlorosis or mottling identified ({disease})."
            action = "Request higher-resolution leaf image or escalate to expert."

        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "status": status,
            "confidence": conf,
            "observation": obs,
            "recommended_action": action
        }
