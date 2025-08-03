#from decimal import Decimal
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, desc

from sqlalchemy import Column, String, DateTime, Integer

from sqlalchemy.orm import declarative_base

from src.db_sessions import db_session_context
#from src.security import verify_key

from .schemas import VoteSenate
import logging

Base = declarative_base()

class VoteSenateModel(Base):
    __tablename__ = "vote_senate"
    
    member_full: str = Column("member_full", String(256), nullable=False)
    last_name: str = Column("last_name", String(256), nullable=False)
    first_name: str = Column("first_name", String(256), nullable=False)
    party: str = Column("party", String(2), nullable=False)
    state: str = Column("state", String(2), nullable=False)
    vote_cast: str = Column("vote_cast", String(32), nullable=False)
    lis_member_id: str = Column("lis_member_id", String(8), nullable=False)
    congress: int = Column("congress", Integer, nullable=False)
    session: int = Column("session", Integer, nullable=False)
    congress_year: int = Column("congress_year", Integer, nullable=False)
    vote_number: int = Column("vote_number", Integer, nullable=False)
    vote_date: datetime = Column("vote_date", DateTime, nullable=False)
    modify_date: datetime = Column("modify_date", DateTime)
    vote_question_text: str = Column("vote_question_text", String, nullable=False)
    vote_document_text: str = Column("vote_document_text", String)
    vote_result_text: str = Column("vote_result_text", String)
    question: str = Column("question", String)
    vote_title: str = Column("vote_title", String)
    majority_requirement: str = Column("majority_requirement", String(16))
    vote_result: str = Column("vote_result", String)
    count: int = Column("count", Integer)
    tie_breaker: str = Column("tie_breaker", String)
    name_id: str = Column("name_id", String(8))
    id: int = Column("id", Integer, primary_key=True)
    vote_url: str = Column("vote_url", String(256))


router = APIRouter(
    prefix="/vote_senate",
    tags=["Vote_Senate"],
    responses={404: {"description": "Not found"}},
    #dependencies=[Depends(verify_key)],
)

@router.get("/by_name_id/{name_id}", response_model=list[VoteSenate])
def get_all_votes_from_representative(name_id: str) -> list[VoteSenate]:
    results: [VoteSenate] = []
    with db_session_context("fteam") as db_session:
        vote_senate_query = (
            select(
                VoteSenateModel.member_full,
                VoteSenateModel.last_name,
                VoteSenateModel.first_name,
                VoteSenateModel.party,
                VoteSenateModel.state,
                VoteSenateModel.vote_cast,
                VoteSenateModel.lis_member_id,
                VoteSenateModel.congress,
                VoteSenateModel.session,
                VoteSenateModel.congress_year,
                VoteSenateModel.vote_number,
                VoteSenateModel.vote_date,
                VoteSenateModel.modify_date,
                VoteSenateModel.vote_question_text,
                VoteSenateModel.vote_document_text,
                VoteSenateModel.vote_result_text,
                VoteSenateModel.question,
                VoteSenateModel.vote_title,
                VoteSenateModel.majority_requirement,
                VoteSenateModel.vote_result,
                VoteSenateModel.count,
                VoteSenateModel.tie_breaker,
                VoteSenateModel.name_id,
                VoteSenateModel.vote_url

            ).where(VoteSenateModel.name_id==name_id
            ).order_by(desc(VoteSenateModel.vote_date)
            ).order_by(desc(VoteSenateModel.vote_number)
            )
        )
        for row in db_session.execute(vote_senate_query):
            #if contact_house_all_info is None:
            #raise HTTPException(
            #    404,
            #    detail=f'No Data found',
            #)
            results.append(
                VoteSenate(
                    member_full=row.member_full,
                    last_name=row.last_name,
                    first_name=row.first_name,
                    party=row.party,
                    state=row.state,
                    vote_cast=row.vote_cast,
                    lis_member_id=row.lis_member_id,
                    congress=row.congress,
                    session=row.session,
                    congress_year=row.congress_year,
                    vote_number=row.vote_number,
                    vote_date=row.vote_date,
                    modify_date=row.modify_date,
                    vote_question_text=row.vote_question_text,
                    vote_document_text=row.vote_document_text,
                    vote_result_text=row.vote_result_text,
                    question=row.question,
                    vote_title=row.vote_title,
                    majority_requirement=row.majority_requirement,
                    vote_result=row.vote_result,
                    count=row.count,
                    tie_breaker=row.tie_breaker,
                    name_id=row.name_id,
                    vote_url=row.vote_url
                )
            )
        return results

@router.get("/detail", response_model=list[VoteSenate])
def get_all_votes_from_representative(year: int = 2023, vote_number: int = 1) -> list[VoteSenate]:
    results: [VoteSenate] = []
    with db_session_context("fteam") as db_session:
        vote_senate_query = (
            select(
                VoteSenateModel.member_full,
                VoteSenateModel.last_name,
                VoteSenateModel.first_name,
                VoteSenateModel.party,
                VoteSenateModel.state,
                VoteSenateModel.vote_cast,
                VoteSenateModel.lis_member_id,
                VoteSenateModel.congress,
                VoteSenateModel.session,
                VoteSenateModel.congress_year,
                VoteSenateModel.vote_number,
                VoteSenateModel.vote_date,
                VoteSenateModel.modify_date,
                VoteSenateModel.vote_question_text,
                VoteSenateModel.vote_document_text,
                VoteSenateModel.vote_result_text,
                VoteSenateModel.question,
                VoteSenateModel.vote_title,
                VoteSenateModel.majority_requirement,
                VoteSenateModel.vote_result,
                VoteSenateModel.count,
                VoteSenateModel.tie_breaker,
                VoteSenateModel.name_id,
                VoteSenateModel.vote_url

            ).where(VoteSenateModel.congress_year==year
            ).where(VoteSenateModel.vote_number==vote_number
            ).order_by(VoteSenateModel.state
            ).order_by(VoteSenateModel.last_name
            )
        )
        for row in db_session.execute(vote_senate_query):
            #if contact_house_all_info is None:
            #raise HTTPException(
            #    404,
            #    detail=f'No Data found',
            #)
            results.append(
                VoteSenate(
                    member_full=row.member_full,
                    last_name=row.last_name,
                    first_name=row.first_name,
                    party=row.party,
                    state=row.state,
                    vote_cast=row.vote_cast,
                    lis_member_id=row.lis_member_id,
                    congress=row.congress,
                    session=row.session,
                    congress_year=row.congress_year,
                    vote_number=row.vote_number,
                    vote_date=row.vote_date,
                    modify_date=row.modify_date,
                    vote_question_text=row.vote_question_text,
                    vote_document_text=row.vote_document_text,
                    vote_result_text=row.vote_result_text,
                    question=row.question,
                    vote_title=row.vote_title,
                    majority_requirement=row.majority_requirement,
                    vote_result=row.vote_result,
                    count=row.count,
                    tie_breaker=row.tie_breaker,
                    name_id=row.name_id,
                    vote_url=row.vote_url
                )
            )
        return results
