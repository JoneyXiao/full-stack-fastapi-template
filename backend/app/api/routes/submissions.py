"""Resource submission routes for AI Resource Hub."""

import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import (
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
)

router = APIRouter(prefix="/submissions", tags=["submissions"])


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

    return ResourceSubmissionsPublic(data=submissions, count=count)


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

    submission = ResourceSubmission(
        title=submission_in.title,
        description=submission_in.description,
        destination_url=submission_in.destination_url,
        type=submission_in.type,
        submitter_id=current_user.id,
        status="pending",
    )
    session.add(submission)
    session.commit()
    session.refresh(submission)
    return submission


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

    return submission


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
    submission.sqlmodel_update(update_data)
    session.add(submission)
    session.commit()
    session.refresh(submission)
    return submission


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

    session.delete(submission)
    session.commit()
    return Message(message="Submission deleted successfully")


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
    List submissions (auth required, all authenticated users can view pending).
    Admins can filter by status.
    """
    query = select(ResourceSubmission)

    # Non-admin users only see pending submissions
    if not current_user.is_superuser:
        query = query.where(ResourceSubmission.status == "pending")
    elif status:
        query = query.where(ResourceSubmission.status == status)

    count_query = select(func.count()).select_from(query.subquery())
    count = session.exec(count_query).one()

    query = (
        query.offset(skip).limit(limit).order_by(ResourceSubmission.created_at.desc())
    )
    submissions = session.exec(query).all()

    return ResourceSubmissionsPublic(data=submissions, count=count)


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

    # Create the published resource
    resource = Resource(
        title=submission.title,
        description=submission.description,
        destination_url=submission.destination_url,
        type=submission.type,
        is_published=True,
    )
    session.add(resource)

    # Update submission status
    submission.status = "approved"
    session.add(submission)

    session.commit()
    session.refresh(submission)
    return submission


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
    return submission


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
        select(SubmissionComment)
        .where(SubmissionComment.submission_id == id)
        .offset(skip)
        .limit(limit)
        .order_by(SubmissionComment.created_at.asc())
    )
    comments = session.exec(query).all()

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
    return comment
