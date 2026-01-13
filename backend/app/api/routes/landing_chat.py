"""Landing page chat recommendation endpoint."""

import logging
from typing import Any

from fastapi import APIRouter, HTTPException

from app.api.deps import SessionDep
from app.core.config import settings
from app.models import (
    LandingChatRequest,
    LandingChatResponse,
)
from app.utils import get_chat_recommendations

router = APIRouter(prefix="/landing/chat", tags=["landing-chat"])

logger = logging.getLogger(__name__)


@router.post("/recommendations", response_model=LandingChatResponse)
def recommend_resources(
    *,
    session: SessionDep,
    request: LandingChatRequest,
) -> Any:
    """
    Get AI-powered resource recommendations based on user message.
    Requires authentication. Returns grounded recommendations from the catalog.
    """
    if not settings.chat_enabled:
        raise HTTPException(
            status_code=503,
            detail="Chat is currently unavailable. Please try keyword search instead.",
        )

    try:
        response = get_chat_recommendations(
            session=session,
            user_message=request.message,
        )
        return response
    except Exception as e:
        # Log error without sensitive content
        logger.error("Chat recommendation failed: %s", type(e).__name__)
        raise HTTPException(
            status_code=503,
            detail="Chat is temporarily unavailable. Please try keyword search instead.",
        )
