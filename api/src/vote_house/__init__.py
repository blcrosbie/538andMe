#from decimal import Decimal
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, desc

from sqlalchemy import Column, String, DateTime, Integer

from sqlalchemy.orm import declarative_base

from src.db_sessions import db_session_context
#from src.security import verify_key

from .schemas import VoteHouse, VoteDetail
import logging

Base = declarative_base()

class VoteHouseModel(Base):
    __tablename__ = "vote_house"

    sort_field: str = Column("sort_field", String(32), nullable=False)
    unaccented_name: str = Column("unaccented_name", String(32), nullable=False)
    party: str = Column("party", String(2), nullable=False)
    state: str = Column("state", String(2), nullable=False)
    role: str = Column("role", String(16), nullable=False)
    vote: str = Column("vote", String(16), nullable=False)
    majority: str = Column("majority", String(2))
    congress: int = Column("congress", Integer)
    session: str = Column("session", String(8))
    chamber: str = Column("chamber", String(128))
    rollcall_num: int = Column("rollcall_num", Integer, nullable=False)
    legis_num: str = Column("legis_num", String(32))
    vote_question: str = Column("vote_question", String(512))
    vote_type: str = Column("vote_type", String(64))
    vote_result: str = Column("vote_result", String(32))
    action_date: datetime = Column("action_date", DateTime)
    action_time: str = Column("action_time", String(16))
    vote_desc: str = Column("vote_desc", String)
    vote_totals: int = Column("vote_totals", Integer)
    vote_datetime: datetime = Column("vote_datetime", DateTime)
    year: int = Column("year", Integer, nullable=False)
    roll: int = Column("roll", Integer, nullable=False)
    vote_url: str = Column("vote_url", String(256), nullable=False)
    id: int = Column("id", Integer, primary_key=True)
    name_id: str = Column("name_id", String(8), nullable=False)
    committee: str = Column("committee", String(256))
    amendment_num: int = Column("amendment_num", Integer)
    amendment_author: str = Column("amendment_author", String(256))
    district_id: str = Column("district_id", String(8))


router = APIRouter(
    prefix="/vote_house",
    tags=["Vote_House"],
    responses={404: {"description": "Not found"}},
    #dependencies=[Depends(verify_key)],
)

@router.get("/by_name_id/{name_id}", response_model=list[VoteHouse])
def get_all_votes_from_representative(name_id: str) -> list[VoteHouse]:
    results: [VoteHouse] = []
    with db_session_context("fteam") as db_session:
        vote_house_query = (
            select(
                VoteHouseModel.district_id,
                VoteHouseModel.state,
                VoteHouseModel.vote_url,
                VoteHouseModel.vote,
                VoteHouseModel.majority,
                VoteHouseModel.congress,
                VoteHouseModel.rollcall_num,
                VoteHouseModel.legis_num,
                VoteHouseModel.vote_question,
                VoteHouseModel.vote_type,
                VoteHouseModel.vote_result,
                VoteHouseModel.action_date,
                VoteHouseModel.vote_desc,
                VoteHouseModel.year,
                VoteHouseModel.roll,
                VoteHouseModel.committee,
                VoteHouseModel.amendment_num,
                VoteHouseModel.amendment_author,
                VoteHouseModel.party,
                VoteHouseModel.name_id,
                VoteHouseModel.unaccented_name
            ).where(VoteHouseModel.name_id==name_id
            ).order_by(desc(VoteHouseModel.action_date)
            ).order_by(desc(VoteHouseModel.roll))
        )
        for row in db_session.execute(vote_house_query):
            #if contact_house_all_info is None:
            #raise HTTPException(
            #    404,
            #    detail=f'No Data found',
            #)
            results.append(
                VoteHouse(
                    district_id=row.district_id,
                    state=row.state,
                    vote_url=row.vote_url,
                    vote=row.vote,
                    majority=row.majority,
                    congress=row.congress,
                    rollcall_num=row.rollcall_num,
                    legis_num=row.legis_num,
                    vote_question=row.vote_question,
                    vote_type=row.vote_type,
                    vote_result=row.vote_result,
                    action_date=row.action_date,
                    vote_desc=row.vote_desc,
                    year=row.year,
                    roll=row.roll,
                    committee=row.committee,
                    amendment_num=row.amendment_num,
                    amendment_author=row.amendment_author,
                    party=row.party,
                    name_id=row.name_id,
                    unaccented_name=row.unaccented_name
                )
            )
        return results

@router.get("/by_district_id/{district_id}", response_model=list[VoteHouse])
def get_all_votes_from_district(district_id: str) -> list[VoteHouse]:
    results: [VoteHouse] = []
    with db_session_context("fteam") as db_session:
        vote_house_query = (
            select(
                VoteHouseModel.district_id,
                VoteHouseModel.state,
                VoteHouseModel.vote_url,
                VoteHouseModel.vote,
                VoteHouseModel.majority,
                VoteHouseModel.congress,
                VoteHouseModel.rollcall_num,
                VoteHouseModel.legis_num,
                VoteHouseModel.vote_question,
                VoteHouseModel.vote_type,
                VoteHouseModel.vote_result,
                VoteHouseModel.action_date,
                VoteHouseModel.vote_desc,
                VoteHouseModel.year,
                VoteHouseModel.roll,
                VoteHouseModel.committee,
                VoteHouseModel.amendment_num,
                VoteHouseModel.amendment_author,
                VoteHouseModel.party,
                VoteHouseModel.name_id,
                VoteHouseModel.unaccented_name
            ).where(VoteHouseModel.district_id==district_id)
        )
        for row in db_session.execute(vote_house_query):
            #if contact_house_all_info is None:
            #raise HTTPException(
            #    404,
            #    detail=f'No Data found',
            #)
            results.append(
                VoteHouse(
                    district_id=row.district_id,
                    state=row.state,
                    vote_url=row.vote_url,
                    vote=row.vote,
                    majority=row.majority,
                    congress=row.congress,
                    rollcall_num=row.rollcall_num,
                    legis_num=row.legis_num,
                    vote_question=row.vote_question,
                    vote_type=row.vote_type,
                    vote_result=row.vote_result,
                    action_date=row.action_date,
                    vote_desc=row.vote_desc,
                    year=row.year,
                    roll=row.roll,
                    committee=row.committee,
                    amendment_num=row.amendment_num,
                    amendment_author=row.amendment_author,
                    party=row.party,
                    name_id=row.name_id,
                    unaccented_name=row.unaccented_name
                )
            )
        return results

@router.get("/detail", response_model=list[VoteHouse])
def get_all_votes_from_detail(year: int = 2023, roll_number: int = 1) -> list[VoteHouse]:
    results: [VoteHouse] = []
    with db_session_context("fteam") as db_session:
        vote_house_query = (
            select(
                VoteHouseModel.district_id,
                VoteHouseModel.state,
                VoteHouseModel.vote_url,
                VoteHouseModel.vote,
                VoteHouseModel.majority,
                VoteHouseModel.congress,
                VoteHouseModel.rollcall_num,
                VoteHouseModel.legis_num,
                VoteHouseModel.vote_question,
                VoteHouseModel.vote_type,
                VoteHouseModel.vote_result,
                VoteHouseModel.action_date,
                VoteHouseModel.vote_desc,
                VoteHouseModel.year,
                VoteHouseModel.roll,
                VoteHouseModel.committee,
                VoteHouseModel.amendment_num,
                VoteHouseModel.amendment_author,
                VoteHouseModel.party,
                VoteHouseModel.name_id,
                VoteHouseModel.unaccented_name
            ).where(VoteHouseModel.year==year
            ).where(VoteHouseModel.rollcall_num==roll_number
            ).order_by(VoteHouseModel.state
            ).order_by(VoteHouseModel.unaccented_name)
        )
        for row in db_session.execute(vote_house_query):
            #if contact_house_all_info is None:
            #raise HTTPException(
            #    404,
            #    detail=f'No Data found',
            #)
            results.append(
                VoteHouse(
                    district_id=row.district_id,
                    state=row.state,
                    vote_url=row.vote_url,
                    vote=row.vote,
                    majority=row.majority,
                    congress=row.congress,
                    rollcall_num=row.rollcall_num,
                    legis_num=row.legis_num,
                    vote_question=row.vote_question,
                    vote_type=row.vote_type,
                    vote_result=row.vote_result,
                    action_date=row.action_date,
                    vote_desc=row.vote_desc,
                    year=row.year,
                    roll=row.roll,
                    committee=row.committee,
                    amendment_num=row.amendment_num,
                    amendment_author=row.amendment_author,
                    party=row.party,
                    name_id=row.name_id,
                    unaccented_name=row.unaccented_name
                )
            )
        return results
