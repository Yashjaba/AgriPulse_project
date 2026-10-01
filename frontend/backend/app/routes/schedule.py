from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.schedule import FarmScheduleItem
from app.schemas.agent import ScheduleItemCreate, ScheduleItemResponse

router = APIRouter(prefix="/schedule", tags=["Dynamic Farm Scheduling (Req 11)"])

@router.get("/", response_model=List[ScheduleItemResponse])
def get_farm_schedule(db: Session = Depends(get_db)):
    """Fetch AI-optimized dynamic farming schedule."""
    items = db.query(FarmScheduleItem).all()
    if not items:
        defaults = [
            FarmScheduleItem(
                activity="Drip Irrigation Cycle",
                plot="Paddy • Plot A",
                scheduled_window="Today, 5:00 PM",
                status="POSTPONED",
                reason="Climate Agent predicts 48mm storm in 4h. Irrigation delayed to prevent root hypoxia.",
                is_completed=False
            ),
            FarmScheduleItem(
                activity="Bio-Fungicide Foliar Spray",
                plot="Tomato • Plot B",
                scheduled_window="Friday, 7:30 AM",
                status="RECOMMENDED",
                reason="Clear sunny window (0mm rain) following the storm. Best window to treat Early Blight.",
                is_completed=False
            ),
            FarmScheduleItem(
                activity="Potassium & Urea Top Dressing",
                plot="Cotton • Plot C",
                scheduled_window="Saturday, 9:00 AM",
                status="SCHEDULED",
                reason="Optimal soil moisture retention after rain will maximize nutrient absorption.",
                is_completed=False
            ),
            FarmScheduleItem(
                activity="Clear Main Field Outflows",
                plot="All Plots (A, B, C)",
                scheduled_window="Immediate (Before 3 PM)",
                status="URGENT",
                reason="Unblock drainage furrows immediately before 48mm storm arrives to avoid pooling.",
                is_completed=False
            )
        ]
        db.add_all(defaults)
        db.commit()
        return defaults
    return items

@router.post("/item", response_model=ScheduleItemResponse)
def add_schedule_item(item: ScheduleItemCreate, db: Session = Depends(get_db)):
    """Add a new activity to the farm calendar."""
    new_item = FarmScheduleItem(**item.dict(), is_completed=False)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.patch("/item/{item_id}/toggle")
def toggle_schedule_item(item_id: int, db: Session = Depends(get_db)):
    """Toggle completion status of a schedule item."""
    task = db.query(FarmScheduleItem).filter(FarmScheduleItem.id == item_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.is_completed = not task.is_completed
    db.commit()
    return {"id": task.id, "is_completed": task.is_completed}
