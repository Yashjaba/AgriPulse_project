from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AlertCreate(BaseModel):
    alert_type: str = Field(..., example="HEAVY_RAIN_IRRIGATION_CONFLICT")
    severity: str = Field(default="HIGH", example="HIGH")
    title: str = Field(..., example="Torrential Rain Impending")
    message: str = Field(..., example="Override irrigation pumps: 48mm storm inbound.")
    channel: str = Field(default="ALL")
    recipient_phone: Optional[str] = Field(default="+91 98450 12345")

class AlertResponse(AlertCreate):
    id: int
    is_dispatched: bool
    created_at: datetime

    class Config:
        from_attributes = True

class SMSDispatchPayload(BaseModel):
    phone_number: str
    message: str
    sender_id: str = "AGRI-CRISIS"
