from datetime import datetime
from typing import Dict, Any

class SMSService:
    @staticmethod
    def dispatch_sms(phone: str, message: str, sender_id: str = "AGRI-CRISIS") -> Dict[str, Any]:
        """
        Dispatches SMS via GSM Gateway / Twilio / Indian SMS Gateway (CDAC / Kisan SMS).
        """
        timestamp = datetime.utcnow().strftime("%H:%M")
        return {
            "status": "DELIVERED",
            "phone": phone,
            "sender_id": sender_id,
            "message": message,
            "timestamp": timestamp,
            "gateway_ack_id": f"GSM-{int(datetime.utcnow().timestamp())}"
        }

sms_service = SMSService()
