import os

from fastapi import Header, HTTPException

ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")
API_MANAGER_SECRET = os.environ.get("API_MANAGER_SECRET")

__header = Header(default=None, include_in_schema=False)


async def verify_key(x_api_manager_secret_key: str | None = __header):
    if ENVIRONMENT == "production":
        if API_MANAGER_SECRET is None:
            raise HTTPException(status_code=500, detail="Header security missing")
        else:
            if x_api_manager_secret_key != API_MANAGER_SECRET:
                raise HTTPException(
                    status_code=400,
                    detail="x-api-manager-secret-key header invalid",
                )
