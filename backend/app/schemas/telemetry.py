from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class IoTTelemetryInput(BaseModel):
    device_id: str = Field(default="ESP32-NODE-KA-094")
    moisture: float = Field(..., ge=0.0, le=100.0, description="Soil moisture in percentage")
    temperature: float = Field(..., description="Soil/Ambient temperature in °C")
    ph: float = Field(..., ge=0.0, le=14.0, description="Soil acidity/alkalinity pH")
    nitrogen: Optional[float] = Field(default=140.0, description="mg/kg")
    phosphorus: Optional[float] = Field(default=45.0, description="mg/kg")
    potassium: Optional[float] = Field(default=180.0, description="mg/kg")
    battery_level: Optional[float] = Field(default=95.0, description="Battery percentage")

class IoTTelemetryResponse(IoTTelemetryInput):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
