"""Chat transcript CRUD endpoints (user-owned)."""

import uuid
from typing import Any

from fastapi import APIRouter, HTTPException

from app.api.deps import CurrentUser, SessionDep
from app.crud import (
    create_chat_transcript,
    delete_chat_transcript,
    get_chat_transcript_by_user,
    list_chat_transcripts,
)
from app.models import (
    ChatMessageSchema,
    ChatTranscriptCreate,
    ChatTranscriptPublic,
    ChatTranscriptsPublic,
    Message,
)

router = APIRouter(prefix="/me/chat-transcripts", tags=["chat-transcripts"])


@router.get("/", response_model=ChatTranscriptsPublic)
def list_my_transcripts(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 50,
) -> Any:
    """List saved chat transcripts for the current user."""
    if limit > 200:
        limit = 200
    transcripts, count = list_chat_transcripts(
        session=session, user_id=current_user.id, skip=skip, limit=limit
    )
    # Convert messages from dict to schema
    data = []
    for t in transcripts:
        data.append(
            ChatTranscriptPublic(
                id=t.id,
                title=t.title,
                messages=[ChatMessageSchema(**m) for m in t.messages],
                created_at=t.created_at,
                updated_at=t.updated_at,
            )
        )
    return ChatTranscriptsPublic(data=data, count=count)


@router.post("/", response_model=ChatTranscriptPublic)
def save_transcript(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    transcript_in: ChatTranscriptCreate,
) -> Any:
    """Save a chat transcript (explicit user action)."""
    transcript = create_chat_transcript(
        session=session, transcript_in=transcript_in, user_id=current_user.id
    )
    return ChatTranscriptPublic(
        id=transcript.id,
        title=transcript.title,
        messages=[ChatMessageSchema(**m) for m in transcript.messages],
        created_at=transcript.created_at,
        updated_at=transcript.updated_at,
    )


@router.get("/{id}", response_model=ChatTranscriptPublic)
def get_my_transcript(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
) -> Any:
    """Get a saved chat transcript by ID (owner only)."""
    transcript = get_chat_transcript_by_user(
        session=session, transcript_id=id, user_id=current_user.id
    )
    if not transcript:
        raise HTTPException(status_code=404, detail="Transcript not found")
    return ChatTranscriptPublic(
        id=transcript.id,
        title=transcript.title,
        messages=[ChatMessageSchema(**m) for m in transcript.messages],
        created_at=transcript.created_at,
        updated_at=transcript.updated_at,
    )


@router.delete("/{id}", response_model=Message)
def delete_my_transcript(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
) -> Any:
    """Delete a saved chat transcript (owner only, hard delete)."""
    transcript = get_chat_transcript_by_user(
        session=session, transcript_id=id, user_id=current_user.id
    )
    if not transcript:
        raise HTTPException(status_code=404, detail="Transcript not found")
    delete_chat_transcript(session=session, db_transcript=transcript)
    return Message(message="Transcript deleted")
