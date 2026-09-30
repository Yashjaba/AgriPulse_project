from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class AgentReport(BaseModel):
    agent_id: str
    name: str
    status: str
    confidence: float
    observation: str
    recommended_action: str

class MultiAgentCoordinationResult(BaseModel):
    timestamp: str
    active_crisis: bool
    crisis_name: str
    composite_risk_score: int         # 0 - 100
    composite_confidence_pct: float   # 0 - 100
    has_conflict: bool
    conflict_resolution: Optional[str] = None
    master_mandate: str
    agent_reports: List[AgentReport]
    dispatched_alerts: List[str]

class ScheduleItemCreate(BaseModel):
    activity: str
    plot: str = "Plot A"
    scheduled_window: str
    status: str = "RECOMMENDED"
    reason: str

class ScheduleItemResponse(ScheduleItemCreate):
    id: int
    is_completed: bool

    class Config:
        from_attributes = True
