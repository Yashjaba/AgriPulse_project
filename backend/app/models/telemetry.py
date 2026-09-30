from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime
from app.database import Base

class IoTTelemetry(Base):
    __tablename__ = "telemetry_records"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(50), index=True, default="ESP32-NODE-KA-094")
    moisture = Column(Float, nullable=False)        # % (0-100)
    temperature = Column(Float, nullable=False)     # °C
    ph = Column(Float, nullable=False)              # pH (0-14)
    nitrogen = Column(Float, default=140.0)         # mg/kg
    phosphorus = Column(Float, default=45.0)        # mg/kg
    potassium = Column(Float, default=180.0)        # mg/kg
    battery_level = Column(Float, default=95.0)     # %
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
