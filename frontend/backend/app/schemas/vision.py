from pydantic import BaseModel
from typing import List, Optional

class CropDiseaseDiagnosis(BaseModel):
    crop: str
    disease_name: str
    scientific_name: str
    severity: str             # "CRITICAL", "HIGH", "MODERATE", "HEALTHY"
    confidence_pct: float     # e.g. 94.6
    symptoms: str
    organic_remedies: List[str]
    chemical_treatments: List[str]
    pest_threat_note: Optional[str] = None
    weather_interaction_note: Optional[str] = None

class PestSurveillanceReport(BaseModel):
    pest_name: str
    threat_level: str
    density_per_acre: str
    spread_direction: str
    recommended_bio_control: List[str]
    recommended_chemical: List[str]
