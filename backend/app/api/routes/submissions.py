"""Resource submission routes for AI Resource Hub."""

import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import APIRouter, File, HTTPException, UploadFile
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.core.config import settings
from app.models import (
    Category,
    CommentCreate,
    Message,
    Resource,
    ResourceSubmission,
    ResourceSubmissionCreate,
    ResourceSubmissionPublic,
    ResourceSubmissionsPublic,
    ResourceSubmissionUpdate,
    SubmissionComment,
    SubmissionCommentPublic,
    SubmissionCommentsPublic,
    User,
)
from app.utils import (
    SubmissionImageValidationError,
    delete_submission_image_file,
    save_resource_image_file,
    save_submission_image_file,
    validate_and_process_submission_image,
)

router = APIRouter(prefix="/submissions", tags=["submissions"])


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------


def _build_submission_image_url(submission: ResourceSubmission) -> str | None:
    """
    Build the image URL for a submission.

    Returns external URL if set, otherwise internal versioned URL if image_key exists.
    """
    if submission.image_external_url:
        return submission.image_external_url
    if submission.image_key:
        return f"/api/v1/submission-images/{submission.id}?v={submission.image_version}"
    return None


def _build_submission_public(
    submission: ResourceSubmission, session: SessionDep
) -> ResourceSubmissionPublic:
    """
    Build a ResourceSubmissionPublic response with category_name and image_url.
    """
    category_name = None
    if submission.category_id:
        cat = session.get(Category, submission.category_id)
        if cat:
            category_name = cat.name

    return ResourceSubmissionPublic(
        id=submission.id,
        title=submission.title,
        description=submission.description,
        destination_url=submission.destination_url,
        category_id=submission.category_id,
        category_name=category_name,
        status=submission.status,
        submitter_id=submission.submitter_id,
        created_at=submission.created_at,
        updated_at=submission.updated_at,
        image_url=_build_submission_image_url(submission),
    )


# ---------------------------------------------------------------------------
# User submission endpoints
# ---------------------------------------------------------------------------


@router.get("/mine", response_model=ResourceSubmissionsPublic)
def list_my_submissions(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 50
) -> Any:
    """
    List submissions created by the current user.
    """
    count_query = (
        select(func.count())
        .select_from(ResourceSubmission)
        .where(ResourceSubmission.submitter_id == current_user.id)
    )
    count = session.exec(count_query).one()

    query = (
        select(ResourceSubmission)
        .where(ResourceSubmission.submitter_id == current_user.id)
        .offset(skip)
        .limit(limit)
        .order_by(ResourceSubmission.created_at.desc())
    )
    submissions = session.exec(query).all()

    data = [_build_submission_public(s, session) for s in submissions]

    return ResourceSubmissionsPublic(data=data, count=count)


@router.post("/", response_model=ResourceSubmissionPublic)
def create_submission(
    session: SessionDep,
    current_user: CurrentUser,
    submission_in: ResourceSubmissionCreate,
) -> Any:
    """
    Create a new resource submission.

    Rejects with 409 if a Resource with the same destination_url already exists.
    """
    # Check for existing Resource with same URL
    existing_resource = session.exec(
        select(Resource).where(
            Resource.destination_url == submission_in.destination_url
        )
    ).first()
    if existing_resource:
        raise HTTPException(
            status_code=409,
            detail="A resource with this destination URL already exists",
        )

    # Check for pending submission with same URL by this user
    existing_submission = session.exec(
        select(ResourceSubmission).where(
            ResourceSubmission.destination_url == submission_in.destination_url,
            ResourceSubmission.submitter_id == current_user.id,
            ResourceSubmission.status == "pending",
        )
    ).first()
    if existing_submission:
        raise HTTPException(
            status_code=409,
            detail="You already have a pending submission for this URL",
        )

    # Validate image_external_url if provided
    if submission_in.image_external_url:
        from urllib.parse import urlparse

        parsed = urlparse(submission_in.image_external_url)
        if parsed.scheme not in ("http", "https"):
            raise HTTPException(
                status_code=400,
                detail="image_external_url must use http or https scheme",
            )
        if not parsed.netloc:
            raise HTTPException(
                status_code=400, detail="image_external_url must have a valid host"
            )

    submission = ResourceSubmission(
        title=submission_in.title,
        description=submission_in.description,
        destination_url=submission_in.destination_url,
        category_id=submission_in.category_id,
        submitter_id=current_user.id,
        status="pending",
        image_external_url=submission_in.image_external_url,
    )
    session.add(submission)
    session.commit()
    session.refresh(submission)

    return _build_submission_public(submission, session)


@router.get("/{id}", response_model=ResourceSubmissionPublic)
def get_submission(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Get a submission by ID.
    Users can view their own submissions; admins can view any.
    """
    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    # Only owner or admin can view
    if submission.submitter_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    return _build_submission_public(submission, session)


@router.put("/{id}", response_model=ResourceSubmissionPublic)
def update_submission(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    submission_in: ResourceSubmissionUpdate,
) -> Any:
    """
    Update a pending submission.
    Only the owner can update, and only if status is pending.

    Accepts `category_id`.
    """
    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    if submission.submitter_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    if submission.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Cannot update a submission that is not pending",
        )

    # Check for URL conflict if destination_url is changing
    if (
        submission_in.destination_url
        and submission_in.destination_url != submission.destination_url
    ):
        existing_resource = session.exec(
            select(Resource).where(
                Resource.destination_url == submission_in.destination_url
            )
        ).first()
        if existing_resource:
            raise HTTPException(
                status_code=409,
                detail="A resource with this destination URL already exists",
            )

    update_data = submission_in.model_dump(exclude_unset=True)

    # Handle mutual exclusivity: if setting external URL, clear uploaded image
    if "image_external_url" in update_data and update_data["image_external_url"]:
        # Delete existing uploaded image if present
        if submission.image_key:
            delete_submission_image_file(submission.image_key)
            update_data["image_key"] = None
            update_data["image_version"] = 0
            update_data["image_content_type"] = None
            update_data["image_updated_at"] = None

    submission.sqlmodel_update(update_data)
    session.add(submission)
    session.commit()
    session.refresh(submission)

    return _build_submission_public(submission, session)


@router.delete("/{id}", response_model=Message)
def delete_submission(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Delete a submission.
    Only the owner can delete, and only if status is pending.
    """
    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    if submission.submitter_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    if submission.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Cannot delete a submission that is not pending",
        )

    # Delete image file if present
    if submission.image_key:
        delete_submission_image_file(submission.image_key)

    session.delete(submission)
    session.commit()
    return Message(message="Submission deleted successfully")


# ---------------------------------------------------------------------------
# Submission image endpoints
# ---------------------------------------------------------------------------


@router.post("/{id}/image", response_model=ResourceSubmissionPublic)
async def upload_submission_image(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    file: UploadFile = File(...),
) -> Any:
    """
    Upload or replace the cover image for a pending submission.
    Only the owner can upload images, and only if submission is pending.
    """
    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    if submission.submitter_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    if submission.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Cannot modify images on a submission that is not pending",
        )

    # Read file data
    file_data = await file.read()
    content_type = file.content_type or "application/octet-stream"

    # Validate and process the image
    try:
        processed = validate_and_process_submission_image(file_data, content_type)
    except SubmissionImageValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Delete old image if present
    if submission.image_key:
        delete_submission_image_file(submission.image_key)

    # Save new image
    image_key = save_submission_image_file(
        submission.id, processed.data, processed.extension
    )

    # Update submission record (clear external URL for mutual exclusivity)
    submission.image_key = image_key
    submission.image_version = (submission.image_version or 0) + 1
    submission.image_content_type = processed.content_type
    submission.image_updated_at = datetime.now(timezone.utc)
    submission.image_external_url = None  # Clear external URL

    session.add(submission)
    session.commit()
    session.refresh(submission)

    return _build_submission_public(submission, session)


@router.delete("/{id}/image", response_model=ResourceSubmissionPublic)
def clear_submission_image(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
) -> Any:
    """
    Clear the cover image (uploaded or external) from a pending submission.
    Only the owner can clear images, and only if submission is pending.
    """
    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    if submission.submitter_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    if submission.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Cannot modify images on a submission that is not pending",
        )

    # Delete uploaded image file if present
    if submission.image_key:
        delete_submission_image_file(submission.image_key)

    # Clear all image fields
    submission.image_key = None
    submission.image_version = 0
    submission.image_content_type = None
    submission.image_updated_at = None
    submission.image_external_url = None

    session.add(submission)
    session.commit()
    session.refresh(submission)

    return _build_submission_public(submission, session)


# ---------------------------------------------------------------------------
# Admin endpoints
# ---------------------------------------------------------------------------


@router.get("/", response_model=ResourceSubmissionsPublic)
def list_pending_submissions(
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 50,
    status: str | None = None,
) -> Any:
    """
    List all submissions (admin only).
    Admins can filter by status.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    query = select(ResourceSubmission)

    if status:
        query = query.where(ResourceSubmission.status == status)

    count_query = select(func.count()).select_from(query.subquery())
    count = session.exec(count_query).one()

    query = (
        query.offset(skip).limit(limit).order_by(ResourceSubmission.created_at.desc())
    )
    submissions = session.exec(query).all()

    data = [_build_submission_public(s, session) for s in submissions]

    return ResourceSubmissionsPublic(data=data, count=count)


@router.post("/{id}/approve", response_model=ResourceSubmissionPublic)
def approve_submission(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Approve a submission and create a corresponding published Resource.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    if submission.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Only pending submissions can be approved",
        )

    # Check if resource with this URL already exists (race condition protection)
    existing = session.exec(
        select(Resource).where(Resource.destination_url == submission.destination_url)
    ).first()
    if existing:
        raise HTTPException(
            status_code=409,
            detail="A resource with this destination URL already exists",
        )

    # Create the published resource (carry over category_id from submission)
    resource = Resource(
        title=submission.title,
        description=submission.description,
        destination_url=submission.destination_url,
        category_id=submission.category_id,
        is_published=True,
        published_by_id=current_user.id,
    )

    # Carry over cover image (T029)
    if submission.image_external_url:
        # External URL: just copy the reference
        resource.image_external_url = submission.image_external_url
    elif submission.image_key:
        # Uploaded image: copy the file to resource storage
        submission_image_path = (
            Path(settings.SUBMISSION_IMAGE_STORAGE_PATH) / submission.image_key
        )
        if submission_image_path.exists():
            image_data = submission_image_path.read_bytes()
            extension = submission.image_key.rsplit(".", 1)[-1]
            resource.image_key = save_resource_image_file(
                resource.id, image_data, extension
            )
            resource.image_version = 1
            resource.image_content_type = submission.image_content_type
            resource.image_updated_at = datetime.now(timezone.utc)

    session.add(resource)

    # Update submission status
    submission.status = "approved"
    session.add(submission)

    session.commit()
    session.refresh(submission)

    return _build_submission_public(submission, session)


@router.post("/{id}/reject", response_model=ResourceSubmissionPublic)
def reject_submission(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Reject a submission.
    """
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    if submission.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Only pending submissions can be rejected",
        )

    submission.status = "rejected"
    session.add(submission)
    session.commit()
    session.refresh(submission)

    return _build_submission_public(submission, session)


# ---------------------------------------------------------------------------
# Submission comment endpoints
# ---------------------------------------------------------------------------


@router.get("/{id}/comments", response_model=SubmissionCommentsPublic)
def list_submission_comments(
    session: SessionDep,
    id: uuid.UUID,
    skip: int = 0,
    limit: int = 50,
) -> Any:
    """
    List comments for a submission (auth required).
    """
    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    count_query = (
        select(func.count())
        .select_from(SubmissionComment)
        .where(SubmissionComment.submission_id == id)
    )
    count = session.exec(count_query).one()

    query = (
        select(SubmissionComment, User.full_name, User.email)
        .join(User, User.id == SubmissionComment.author_id)
        .where(SubmissionComment.submission_id == id)
        .offset(skip)
        .limit(limit)
        .order_by(SubmissionComment.created_at.asc())
    )
    rows = session.exec(query).all()

    comments = [
        SubmissionCommentPublic.model_validate(
            {
                **c.model_dump(),
                "author_display": full_name or email,
            }
        )
        for c, full_name, email in rows
    ]

    return SubmissionCommentsPublic(data=comments, count=count)


@router.post("/{id}/comments", response_model=SubmissionCommentPublic)
def create_submission_comment(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    comment_in: CommentCreate,
) -> Any:
    """
    Create a comment on a submission (auth required).
    """
    submission = session.get(ResourceSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    comment = SubmissionComment(
        body=comment_in.body,
        author_id=current_user.id,
        submission_id=id,
    )
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return SubmissionCommentPublic.model_validate(
        {
            **comment.model_dump(),
            "author_display": (current_user.full_name or current_user.email),
        }
    )
