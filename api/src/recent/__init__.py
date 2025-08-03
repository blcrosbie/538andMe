from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy import Column, Integer

from sqlalchemy.orm import declarative_base

from src.db_sessions import db_session_context
#from src.security import verify_key

from .schemas import Recent
import logging

Base = declarative_base()

class RecentModel(Base):
    __tablename__ = "recent"

    roll: int = Column("roll", Integer, nullable=False)
    vote: int = Column("vote", Integer, nullable=False)
    year: int = Column("year", Integer, nullable=False)
    id: int = Column("id", Integer, primary_key=True)



router = APIRouter(
    prefix="/recent",
    tags=["Recent"],
    responses={404: {"description": "Not found"}},
    #dependencies=[Depends(verify_key)],
)

@router.get("", response_model=Recent)
def get_recent_info() -> Recent:
    with db_session_context("fteam") as db_session:

        recent_query = (
            select(
                RecentModel.roll,
                RecentModel.vote,
                RecentModel.year
            )
        )
        recent_info = db_session.execute(recent_query).first()

        if recent_info is None:
            raise HTTPException(
                404,
                detail=f'Error trying to access most Recent info',
            )
        return Recent(
            roll=recent_info.roll,
            vote=recent_info.vote,
            year=recent_info.year
        )
