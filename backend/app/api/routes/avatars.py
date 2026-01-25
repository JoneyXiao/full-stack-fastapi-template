"""
Public avatar serving endpoint.

GET /avatars/{user_id}/{version}.{ext} - serves avatar image with caching headers.
"""

import uuid
from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi import Path as PathParam
from fastapi.responses import FileResponse

from app.api.deps import SessionDep
from app.core.config import settings
from app.models import User

router = APIRouter()


def get_avatar_url(user: User) -> str | None:
    """Generate public avatar URL from user metadata. Returns None if no avatar."""
    if not user.avatar_key or not user.avatar_content_type:
        return None

    ext = "webp" if user.avatar_content_type == "image/webp" else "jpg"
    return f"{settings.API_V1_STR}/avatars/{user.id}/{user.avatar_version}.{ext}"


@router.get(
    "/{user_id}/{version}.{ext}",
    responses={
        200: {
            "description": "Avatar image file",
            "content": {"image/webp": {}, "image/jpeg": {}},
        },
        404: {"description": "Avatar not found"},
    },
)
def get_avatar(
    session: SessionDep,
    user_id: Annotated[uuid.UUID, PathParam(description="User ID")],
    version: Annotated[int, PathParam(description="Avatar version", ge=0)],
    ext: Annotated[
        str, PathParam(description="File extension", pattern="^(webp|jpg)$")
    ],
) -> FileResponse:
    """
    Serve a user's avatar image.

    Returns the avatar with aggressive caching headers (immutable, 1 year).
    The versioned URL ensures cache invalidation on avatar changes.
    """
    # Get user from DB to validate version
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if avatar exists and version matches
    if not user.avatar_key or user.avatar_version != version:
        raise HTTPException(status_code=404, detail="Avatar not found")

    # Determine expected content type
    expected_content_type = "image/webp" if ext == "webp" else "image/jpeg"
    if user.avatar_content_type != expected_content_type:
        raise HTTPException(status_code=404, detail="Avatar not found")

    # Construct file path
    avatar_path = Path(settings.AVATAR_STORAGE_PATH) / user.avatar_key
    if not avatar_path.exists():
        raise HTTPException(status_code=404, detail="Avatar not found")

    # Serve with cache headers
    return FileResponse(
        path=avatar_path,
        media_type=user.avatar_content_type,
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff",
        },
    )
