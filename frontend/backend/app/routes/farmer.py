from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.farmer import FarmerProfile
from app.schemas.farmer import FarmerProfileCreate, FarmerProfileResponse

router = APIRouter(prefix="/farmer", tags=["Farmer Profile (Req 1)"])

@router.get("/profile", response_model=FarmerProfileResponse)
def get_farmer_profile(db: Session = Depends(get_db)):
    """Fetch current registered farmer and farm details."""
    farmer = db.query(FarmerProfile).first()
    if not farmer:
        # Seed default profile if none exists
        farmer = FarmerProfile(
            name="S Vinod Kumar",
            phone="+91 98450 12345",
            farm_title="Titans Green Acres Farm",
            location="Mandya, Karnataka",
            size_acres=4.5,
            soil_type="Red Loamy",
            irrigation_method="Drip Irrigation",
            crops="Paddy (Basmati), Tomato, Cotton",
            esp32_device_id="ESP32-NODE-KA-094",
            preferred_language="kn"
        )
        db.add(farmer)
        db.commit()
        db.refresh(farmer)
    return farmer

@router.post("/profile", response_model=FarmerProfileResponse)
def register_or_update_farmer(profile_data: FarmerProfileCreate, db: Session = Depends(get_db)):
    """Register or update farmer registration."""
    farmer = db.query(FarmerProfile).first()
    if not farmer:
        farmer = FarmerProfile(**profile_data.dict())
        db.add(farmer)
    else:
        for key, value in profile_data.dict().items():
            setattr(farmer, key, value)
    db.commit()
    db.refresh(farmer)
    return farmer
