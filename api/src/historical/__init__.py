from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from sqlalchemy import Column, String, Integer

from sqlalchemy.orm import declarative_base

from src.db_sessions import db_session_context
#from src.security import verify_key

from .schemas import Historical
import logging

Base = declarative_base()

class HistoricalModel(Base):
    __tablename__ = "historical"
    _type_: str = Column("type", String(128))
    state: str = Column("state", String(128))
    district_number: str = Column("district_number", String(8))
    start: int = Column("start", Integer)
    end: int = Column("end", Integer)
    name: str = Column("name", String(256))
    state_abbr: str = Column("state_abbr", String(2))
    district_id: str = Column("district_id", String(4), nullable=False)
    id: int = Column("id", Integer, primary_key=True)



router = APIRouter(
    prefix="/historical",
    tags=["Historical"],
    responses={404: {"description": "Not found"}},
    #dependencies=[Depends(verify_key)],
)

@router.get("", response_model=Historical)
def get_historical_info(name: str, state_abbr: str) -> Historical:
    with db_session_context("fteam") as db_session:
        # first validate the state input is an abbreviation to match the ContactSenate Table
        
        if '(' in name:
            name = name.split(' (')[0]

        if ',' in name:
            name = name.split(',')[0]

        historical_query = (
            select(
                HistoricalModel.name,
                HistoricalModel.district_id,
                HistoricalModel.state_abbr

            ).where(HistoricalModel.state_abbr==state_abbr
            ).where(HistoricalModel.name.like(f"%{name}%"))
        )
        historical_info = db_session.execute(historical_query).first()

        if historical_info is None:
            raise HTTPException(
                404,
                detail=f'No Historical District ID found for "{name}"',
            )
        return Historical(
            district_id=historical_info.district_id,
            name=historical_info.name,
            state_abbr=historical_info.state_abbr
        )
