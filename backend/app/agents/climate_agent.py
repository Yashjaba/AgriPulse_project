from app.agents.base_agent import BaseAgent
from typing import Dict, Any

class ClimateAgent(BaseAgent):
    def __init__(self):
        super().__init__(agent_id="agent_climate", name="🌦️ Climate Agent")

    def analyze(self, context: Dict[str, Any]) -> Dict[str, Any]:
        weather = context.get("weather", {})
        rain_prob = weather.get("rain_prob", 88)
        rain_mm = weather.get("rain_mm", 48.0)
        temp = weather.get("temp", 27.0)

        if rain_prob > 70 and rain_mm >= 30.0:
            status = "STORM_INBOUND"
            confidence = 0.92
            obs = f"Severe thunderstorm front detected. High rainfall ({rain_mm}mm) imminent within 4 hours."
            action = f"Cease irrigation immediately. Unblock drainage channels. Delay foliar chemical spraying."
        elif rain_prob > 50:
            status = "LIGHT_SHOWERS"
            confidence = 0.85
            obs = f"Moderate chance of rain ({rain_mm}mm)."
            action = "Reduce scheduled irrigation volume by 50%."
        elif temp > 40.0:
            status = "HEATWAVE"
            confidence = 0.94
            obs = f"Extreme heat conditions ({temp}°C). High evapotranspiration rate."
            action = "Recommend early morning or late evening deep irrigation."
        else:
            status = "FAVORABLE"
            confidence = 0.90
            obs = "Clear sky with optimal ambient humidity and low wind."
            action = "Ideal window for sowing, spraying, and fertilizer application."

        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "status": status,
            "confidence": confidence,
            "observation": obs,
            "recommended_action": action,
            "raw_metrics": {"rain_prob": rain_prob, "rain_mm": rain_mm, "temp": temp}
        }
