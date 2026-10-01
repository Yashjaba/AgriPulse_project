from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class FarmerProfileBase(BaseModel):
    name: str = Field(..., example="S Vinod Kumar")
    phone: str = Field(..., example="+91 98450 12345")
    farm_title: str = Field(default="Titans Green Acres Farm")
    location: str = Field(default="Mandya, Karnataka")
    latitude: float = Field(default=12.5234)
    longitude: float = Field(default=76.8967)
    size_acres: float = Field(default=4.5)
    soil_type: str = Field(default="Red Loamy")
    irrigation_method: str = Field(default="Drip Irrigation")
    crops: str = Field(default="Paddy (Basmati), Tomato, Cotton")
    esp32_device_id: str = Field(default="ESP32-NODE-KA-094")
    preferred_language: str = Field(default="kn")

class FarmerProfileCreate(FarmerProfileBase):
    pass

class FarmerProfileResponse(FarmerProfileBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
