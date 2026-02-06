"""
Submission cover image serving endpoint.

Provides versioned image URLs for submission cover images stored on the filesystem.
"""

import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse

from app.core.config import settings

router = APIRouter()


@router.get("/{submission_id}")
async def get_submission_image(
    submission_id: uuid.UUID,
    _v: int = Query(default=0, description="Image version for cache busting"),
) -> FileResponse:
    """
    Serve a submission cover image by submission ID.

    The `v` query parameter is used for cache-busting when images are updated.
    Returns 404 if no image is found for the submission.
    """
    storage_path = Path(settings.SUBMISSION_IMAGE_STORAGE_PATH)

    # Try common extensions
    for ext in ["webp", "jpg"]:
        file_path = storage_path / f"{submission_id}.{ext}"
        if file_path.exists():
            content_type = "image/webp" if ext == "webp" else "image/jpeg"
            return FileResponse(
                path=file_path,
                media_type=content_type,
                headers={
                    "Cache-Control": "public, max-age=31536000, immutable",
                },
            )

    raise HTTPException(status_code=404, detail="Submission image not found")
