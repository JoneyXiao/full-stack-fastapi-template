from fastapi import APIRouter

from app.api.routes import (
    avatars,
    categories,
    chat_transcripts,
    comments,
    items,
    landing_chat,
    login,
    private,
    resources,
    submissions,
    users,
    utils,
    wechat_login,
)
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(wechat_login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(items.router)
api_router.include_router(categories.router)
api_router.include_router(resources.router)
api_router.include_router(submissions.router)
api_router.include_router(comments.router)
api_router.include_router(landing_chat.router)
api_router.include_router(chat_transcripts.router)
api_router.include_router(avatars.router, prefix="/avatars", tags=["avatars"])


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
