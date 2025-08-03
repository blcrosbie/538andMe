#from decimal import Decimal
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from sqlalchemy import Column, String, DateTime

from sqlalchemy.orm import declarative_base

from src.db_sessions import db_session_context
#from src.security import verify_key

from .schemas import ContactSenate
import logging

Base = declarative_base()

class ContactSenateModel(Base):
    __tablename__ = "contact_senate"

    member_full: str = Column("member_full", String(256), nullable=False)
    last_name: str = Column("last_name", String(256), nullable=False)
    first_name: str = Column("first_name", String(256), nullable=False)
    party: str = Column("party", String(2), nullable=False)
    state: str = Column("state", String(2), nullable=False)
    address: str = Column("address", String(256))
    phone: str = Column("phone", String(16))
    email: str = Column("email", String(256))
    website: str = Column("website", String(256))
    class_type: str = Column("class_type", String(16))
    name_id: str = Column("name_id", String(8), primary_key=True)
    leadership_position: str = Column("leadership_position", String(256))


class FipsModel(Base):
    __tablename__ = "fips"

    state: str = Column("state", String(32), nullable=False)
    state_abbr: str = Column("state_abbr", String(2), nullable=False)
    fips: str = Column("fips", String(2), primary_key=True)


router = APIRouter(
    prefix="/contact_senate",
    tags=["Contact_Senate"],
    responses={404: {"description": "Not found"}},
    #dependencies=[Depends(verify_key)],
)

@router.get("", response_model=list[ContactSenate])
def get_all_info_contact_senate() -> list[ContactSenate]:
    results: [ContactSenate] = []
    with db_session_context("fteam") as db_session:
        contact_senate_query = (
            select(
                ContactSenateModel.member_full,
                ContactSenateModel.last_name,
                ContactSenateModel.first_name,
                ContactSenateModel.party,
                ContactSenateModel.state,
                ContactSenateModel.phone,
                ContactSenateModel.email,
                ContactSenateModel.website,
                ContactSenateModel.class_type,
                ContactSenateModel.name_id,
                ContactSenateModel.leadership_position
            )
        )
        for row in db_session.execute(contact_senate_query):
            #if contact_house_all_info is None:
            #raise HTTPException(
            #    404,
            #    detail=f'No Data found',
            #)
            results.append(
                ContactSenate(
                    member_full=row.member_full,
                    last_name=row.last_name,
                    first_name=row.first_name,
                    phone=row.phone,
                    email=row.email,
                    class_type=row.class_type,
                    leadership_position=row.leadership_position,
                    party=row.party,
                    state=row.state,
                    website=row.website,
                    name_id=row.name_id
                )
            )
        return results

@router.get("/{state}", response_model=list[ContactSenate])
def get_info_contact_senate(state: str) -> list[ContactSenate]:
    results: [ContactSenate] = []
    with db_session_context("fteam") as db_session:
        # first validate the state input is an abbreviation to match the ContactSenate Table
        state_abbr = state
        try:
            if isinstance(int(state), int):
                state_check = select(FipsModel.state_abbr).where(FipsModel.fips==state)
                state_abbr = db_session.execute(state_check).first().state_abbr
        except:
            if isinstance(state, str):
              if len(state) > 2:
                state_check = select(FipsModel.state_abbr).where(FipsModel.state==state)
                state_abbr = db_session.execute(state_check).first()
              elif len(state) == 2:
                state_abbr = state.upper()
              else:
                raise Exception


        if state_abbr is None:
          raise Exception

        contact_senate_query = (
            select(
                ContactSenateModel.member_full,
                ContactSenateModel.last_name,
                ContactSenateModel.first_name,
                ContactSenateModel.party,
                ContactSenateModel.state,
                ContactSenateModel.phone,
                ContactSenateModel.email,
                ContactSenateModel.website,
                ContactSenateModel.class_type,
                ContactSenateModel.name_id,
                ContactSenateModel.leadership_position
            ).where(ContactSenateModel.state==state_abbr)
        )
        for row in db_session.execute(contact_senate_query):
            results.append(
                ContactSenate(
                    member_full=row.member_full,
                    last_name=row.last_name,
                    first_name=row.first_name,
                    phone=row.phone,
                    email=row.email,
                    class_type=row.class_type,
                    leadership_position=row.leadership_position,
                    party=row.party,
                    state=row.state,
                    website=row.website,
                    name_id=row.name_id
                )
            )
        return results
