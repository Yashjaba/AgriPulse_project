from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime
from app.database import Base

class FarmScheduleItem(Base):
    __tablename__ = "farm_schedules"

    id = Column(Integer, primary_key=True, index=True)
    activity = Column(String(100), nullable=False)
    plot = Column(String(50), default="Plot A")
    scheduled_window = Column(String(100), nullable=False)
    status = Column(String(30), default="RECOMMENDED") # "RECOMMENDED", "POSTPONED", "SCHEDULED", "URGENT"
    reason = Column(Text, nullable=False)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
