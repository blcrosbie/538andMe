import logging
import os
import sys

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
load_dotenv()


handler = logging.StreamHandler(sys.stdout)
root_log = logging.getLogger()
if not root_log.hasHandlers():
    root_log.addHandler(handler)
root_log.setLevel(logging.DEBUG)

app = FastAPI(title="538andMe API",
	servers=[
	{"url": "https://538andme.io/api", "description": "prod"},
	],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get("/", include_in_schema=False)
def index():
    return "Hello Wolrd"

@app.get("/living", include_in_schema=False)
def liveness():
    return "yes, it is alive"

from src.contact_house import router as contact_house_router
from src.contact_senate import router as contact_senate_router
from src.historical import router as historical_router
from src.recent import router as recent_router
from src.vote_house import router as vote_house_router
from src.vote_senate import router as vote_senate_router


app.include_router(contact_house_router)
app.include_router(contact_senate_router)
app.include_router(historical_router)
app.include_router(recent_router)
app.include_router(vote_house_router)
app.include_router(vote_senate_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, log_level="info")
