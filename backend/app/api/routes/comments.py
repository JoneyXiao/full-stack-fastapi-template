"""Comment routes for AI Resource Hub."""

import uuid
from typing import Any

from fastapi import APIRouter, HTTPException

from app.api.deps import CurrentUser, SessionDep
from app.models import (
    Comment,
    CommentPublic,
    CommentUpdate,
    Message,
    SubmissionComment,
    SubmissionCommentPublic,
)

router = APIRouter(prefix="/comments", tags=["comments"])


@router.put("/{id}", response_model=CommentPublic)
def update_comment(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    comment_in: CommentUpdate,
) -> Any:
    """
    Update a comment. Only the author can update their own comments.
    """
    comment = session.get(Comment, id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    update_data = comment_in.model_dump(exclude_unset=True)
    comment.sqlmodel_update(update_data)
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return comment


@router.delete("/{id}", response_model=Message)
def delete_comment(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Delete a comment. Author can delete their own; admin can delete any.
    """
    comment = session.get(Comment, id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.author_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    session.delete(comment)
    session.commit()
    return Message(message="Comment deleted successfully")


# ---------------------------------------------------------------------------
# Submission comment endpoints
# ---------------------------------------------------------------------------


@router.put("/submission/{id}", response_model=SubmissionCommentPublic)
def update_submission_comment(
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    comment_in: CommentUpdate,
) -> Any:
    """
    Update a submission comment. Only the author can update their own comments.
    """
    comment = session.get(SubmissionComment, id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    update_data = comment_in.model_dump(exclude_unset=True)
    comment.sqlmodel_update(update_data)
    session.add(comment)
    session.commit()
    session.refresh(comment)
    return comment


@router.delete("/submission/{id}", response_model=Message)
def delete_submission_comment(
    session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Delete a submission comment. Author can delete their own; admin can delete any.
    """
    comment = session.get(SubmissionComment, id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.author_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    session.delete(comment)
    session.commit()
    return Message(message="Comment deleted successfully")
