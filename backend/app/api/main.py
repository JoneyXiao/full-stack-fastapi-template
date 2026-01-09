from fastapi import APIRouter

from app.api.routes import comments, items, login, private, resources, submissions, users, utils
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(items.router)
api_router.include_router(resources.router)
api_router.include_router(submissions.router)
api_router.include_router(comments.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
