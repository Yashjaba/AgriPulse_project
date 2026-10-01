from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.alert import CrisisAlert
from app.schemas.alert import AlertCreate, AlertResponse, SMSDispatchPayload
from app.services.sms_service import sms_service

router = APIRouter(prefix="/alerts", tags=["Multi-Channel Alert System (Req 10)"])

@router.get("/recent", response_model=List[AlertResponse])
def get_recent_alerts(limit: int = 10, db: Session = Depends(get_db)):
    """Fetch history of dispatched in-app and SMS crisis alerts."""
    alerts = db.query(CrisisAlert).order_by(CrisisAlert.created_at.desc()).limit(limit).all()
    if not alerts:
        # Default alert seeds
        seed1 = CrisisAlert(
            alert_type="HEAVY_RAIN_IRRIGATION_CONFLICT",
            severity="CRITICAL",
            title="🚨 URGENT CRISIS ALERT",
            message="CRITICAL: 48mm heavy rain within 4 hours. STOP ALL IRRIGATION PUMPS. Open field drainage ditches immediately to protect paddy crops. - Team Titans Agri Command",
            channel="SMS",
            recipient_phone="+91 98450 12345"
        )
        seed2 = CrisisAlert(
            alert_type="CROP_DISEASE_ADVISORY",
            severity="MODERATE",
            title="🌾 ಬೆಳೆ ಎಚ್ಚರಿಕೆ (CROP ADVISORY)",
            message="ಟೊಮೆಟೊ ಬೆಳೆಯಲ್ಲಿ ಅರ್ಲಿ ಬ್ಲೈಟ್ ಶಿಲೀಂಧ್ರ ರೋಗ ಪತ್ತೆಯಾಗಿದೆ. ಮಳೆ ನಿಂತ ನಂತರ ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (2.5 ಗ್ರಾಂ/ಲೀ) ಸಿಂಪಡಿಸಿ. - ಅಗ್ರಿಕ್ರೈಸಿಸ್",
            channel="SMS",
            recipient_phone="+91 98450 12345"
        )
        db.add(seed1)
        db.add(seed2)
        db.commit()
        return [seed1, seed2]
    return alerts

@router.post("/dispatch-sms")
def send_sms_alert(payload: SMSDispatchPayload, db: Session = Depends(get_db)):
    """
    Requirement 10: Dispatch warning SMS via GSM gateway to farmer mobile.
    """
    delivery_report = sms_service.dispatch_sms(
        phone=payload.phone_number,
        message=payload.message,
        sender_id=payload.sender_id
    )

    alert_log = CrisisAlert(
        alert_type="MANUAL_SMS",
        severity="HIGH",
        title="📱 SMS ALERT DISPATCH",
        message=payload.message,
        channel="SMS",
        recipient_phone=payload.phone_number,
        is_dispatched=True
    )
    db.add(alert_log)
    db.commit()

    return delivery_report
