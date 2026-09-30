from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from app.database import get_db
from app.models.telemetry import IoTTelemetry
from app.schemas.telemetry import IoTTelemetryInput, IoTTelemetryResponse

router = APIRouter(prefix="/iot", tags=["IoT & Soil Monitoring (Req 2)"])

@router.post("/telemetry", response_model=IoTTelemetryResponse)
def ingest_iot_telemetry(payload: IoTTelemetryInput, db: Session = Depends(get_db)):
    """
    Ingest live ESP32 soil sensor telemetry via REST/MQTT.
    Collects Soil Moisture, Temperature, pH, and optional NPK.
    """
    telemetry_record = IoTTelemetry(**payload.dict(), timestamp=datetime.utcnow())
    db.add(telemetry_record)
    db.commit()
    db.refresh(telemetry_record)
    return telemetry_record

@router.get("/telemetry/latest", response_model=IoTTelemetryResponse)
def get_latest_telemetry(db: Session = Depends(get_db)):
    """Fetch the latest active sensor reading."""
    record = db.query(IoTTelemetry).order_by(IoTTelemetry.timestamp.desc()).first()
    if not record:
        # Default benchmark reading
        record = IoTTelemetry(
            device_id="ESP32-NODE-KA-094",
            moisture=28.0,
            temperature=29.4,
            ph=6.5,
            nitrogen=140.0,
            phosphorus=45.0,
            potassium=180.0,
            battery_level=92.0,
            timestamp=datetime.utcnow()
        )
        db.add(record)
        db.commit()
        db.refresh(record)
    return record

@router.get("/telemetry/history", response_model=List[IoTTelemetryResponse])
def get_telemetry_history(limit: int = 24, db: Session = Depends(get_db)):
    """Fetch historical telemetry points for real-time charting."""
    records = db.query(IoTTelemetry).order_by(IoTTelemetry.timestamp.desc()).limit(limit).all()
    if not records:
        # Seed mock 24h trend
        base_time = datetime.utcnow()
        samples = [
            (45.0, 27.5), (42.0, 28.2), (38.0, 29.8),
            (35.0, 30.5), (31.0, 30.0), (29.0, 29.6), (28.0, 29.4)
        ]
        created = []
        for i, (m, t) in enumerate(reversed(samples)):
            rec = IoTTelemetry(
                device_id="ESP32-NODE-KA-094",
                moisture=m,
                temperature=t,
                ph=6.5,
                timestamp=base_time - timedelta(hours=i)
            )
            db.add(rec)
            created.append(rec)
        db.commit()
        return created
    return list(reversed(records))
