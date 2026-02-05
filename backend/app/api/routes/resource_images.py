"""
Public resource image serving router.

Serves uploaded resource images via immutable versioned URLs.
"""

from pathlib import Path
from uuid import UUID

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.core.config import settings

router = APIRouter()


@router.get("/{resource_id}/{version}.{ext}")
async def serve_resource_image(
    resource_id: UUID,
    version: int,  # noqa: ARG001 - version used for cache-busting in URL
    ext: str,
) -> FileResponse:
    """
    Serve a resource image file.

    The URL pattern includes the version number for cache-busting.
    The version in the URL is informational only (used for immutability);
    we serve whatever file exists for the resource.

    Args:
        resource_id: The resource's UUID
        version: Image version (for cache-busting, not validated)
        ext: File extension (webp or jpg)

    Returns:
        The image file with appropriate content-type and caching headers

    Raises:
        HTTPException 404: If the image file doesn't exist
    """
    # Validate extension
    if ext not in ("webp", "jpg"):
        raise HTTPException(status_code=404, detail="Resource image not found")

    # Construct the file path
    image_key = f"{resource_id}.{ext}"
    file_path = Path(settings.RESOURCE_IMAGE_STORAGE_PATH) / image_key

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Resource image not found")

    # Determine content type
    content_type = "image/webp" if ext == "webp" else "image/jpeg"

    # Return with caching headers (immutable + long cache since URL is versioned)
    return FileResponse(
        path=file_path,
        media_type=content_type,
        headers={
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    )
