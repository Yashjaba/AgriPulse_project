from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base

class FarmerProfile(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    farm_title = Column(String(150), default="Titans Green Acres Farm")
    location = Column(String(150), default="Mandya, Karnataka")
    latitude = Column(Float, default=12.5234)
    longitude = Column(Float, default=76.8967)
    size_acres = Column(Float, default=4.5)
    soil_type = Column(String(50), default="Red Loamy")
    irrigation_method = Column(String(50), default="Drip Irrigation")
    crops = Column(String(200), default="Paddy (Basmati), Tomato, Cotton")
    esp32_device_id = Column(String(50), default="ESP32-NODE-KA-094", unique=True)
    preferred_language = Column(String(10), default="kn")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
