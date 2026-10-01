from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime
from app.database import Base

class CrisisAlert(Base):
    __tablename__ = "crisis_alerts"

    id = Column(Integer, primary_key=True, index=True)
    alert_type = Column(String(50), nullable=False)     # e.g., "DROUGHT", "FLOOD", "DISEASE_OUTBREAK"
    severity = Column(String(20), nullable=False)       # "CRITICAL", "HIGH", "MODERATE", "LOW"
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    channel = Column(String(30), default="ALL")         # "SMS", "VOICE", "IN_APP", "ALL"
    recipient_phone = Column(String(20), nullable=True)
    is_dispatched = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
