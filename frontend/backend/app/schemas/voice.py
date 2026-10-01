from pydantic import BaseModel, Field
from typing import Optional

class VoiceQueryRequest(BaseModel):
    query_text: str = Field(..., example="Should I spray pesticide today?")
    language: str = Field(default="kn", example="kn") # kn, hi, en, te, ta, mr

class VoiceQueryResponse(BaseModel):
    detected_intent: str
    language: str
    spoken_response: str
    audio_synthesis_ready: bool = True
