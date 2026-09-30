from fastapi import APIRouter
from app.schemas.voice import VoiceQueryRequest, VoiceQueryResponse
from app.services.voice_service import voice_service

router = APIRouter(prefix="/voice", tags=["Multilingual Voice Assistant (Req 9)"])

@router.post("/query", response_model=VoiceQueryResponse)
def query_voice_assistant(payload: VoiceQueryRequest):
    """
    Requirement 9: Process farmer speech-to-text queries in regional languages
    (Kannada, Hindi, Telugu, Tamil, Marathi, English) and returns localized response.
    """
    res = voice_service.process_voice_query(payload.query_text, payload.language)
    return VoiceQueryResponse(**res)
