#from decimal import Decimal
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from sqlalchemy import Column, String, DateTime

from sqlalchemy.orm import declarative_base

from src.db_sessions import db_session_context
#from src.security import verify_key

from .schemas import ContactHouse
import logging

Base = declarative_base()

class ContactHouseModel(Base):
    __tablename__ = "contact_house"

    statedistrict: str = Column("statedistrict", String(8), nullable=False)
    namelist: str = Column("namelist", String(256), nullable=False)
    name_id: str = Column("name_id", String(8), primary_key=True)
    lastname: str = Column("lastname", String(256), nullable=False)
    firstname: str = Column("firstname", String(256), nullable=False)
    middlename: str = Column("middlename", String(256))
    sort_name: str = Column("sort_name", String(256), nullable=False)
    suffix: str = Column("suffix", String(32))
    courtesy: str = Column("courtesy", String(32))
    prior_congress: str = Column("prior_congress", String(64))
    official_name: str = Column("official_name", String(256))
    formal_name: str = Column("formal_name", String(256))
    party: str = Column("party", String(2))
    caucus: str = Column("caucus", String(2))
    state: str = Column("state", String(32))
    district: str = Column("district", String(32))
    townname: str = Column("townname", String(256))
    office_building: str = Column("office_building", String(256))
    office_room: str = Column("office_room", String(256))
    office_zip: str = Column("office_zip", String(8))
    office_zip_suffix: str = Column("office_zip_suffix", String(8))
    phone: str = Column("phone", String(16))
    elected_date: datetime = Column("elected_date", DateTime)
    sworn_date: datetime = Column("sworn_date", DateTime)
    name: str = Column("name", String(256))
    website: str = Column("website", String(256))
    district_id: str = Column("district_id", String(8), nullable=False)


router = APIRouter(
    prefix="/contact_house",
    tags=["Contact_House"],
    responses={404: {"description": "Not found"}},
    #dependencies=[Depends(verify_key)],
)

@router.get("", response_model=list[ContactHouse])
def get_all_info_contact_house() -> list[ContactHouse]:
    results: [ContactHouse] = []
    with db_session_context("fteam") as db_session:
        contact_house_query = (
            select(
                ContactHouseModel.district_id,
                ContactHouseModel.name,
                ContactHouseModel.elected_date,
                ContactHouseModel.party,
                ContactHouseModel.state,
                ContactHouseModel.phone,
                ContactHouseModel.website,
                ContactHouseModel.name_id
            )
        )
        for row in db_session.execute(contact_house_query):
            #if contact_house_all_info is None:
            #raise HTTPException(
            #    404,
            #    detail=f'No Data found',
            #)
            results.append(
                ContactHouse(
                    district_id=row.district_id,
                    name=row.name,
                    elected_date=row.elected_date,
                    party=row.party,
                    state=row.state,
                    phone=row.phone,
                    website=row.website,
                    name_id=row.name_id
                )
            )
        return results

@router.get("/{district_id}", response_model=ContactHouse)
def get_info_contact_house(district_id: str) -> ContactHouse:
    with db_session_context("fteam") as db_session:
        contact_house_query = (
            select(
                ContactHouseModel.district_id,
                ContactHouseModel.name,
                ContactHouseModel.elected_date,
                ContactHouseModel.party,
                ContactHouseModel.state,
                ContactHouseModel.phone,
                ContactHouseModel.website,
                ContactHouseModel.name_id
            ).where(ContactHouseModel.district_id==district_id)
        )
        contact_house_info = db_session.execute(contact_house_query).first()
        logging.info(contact_house_info)
        if contact_house_info is None:
            raise HTTPException(
                404,
                detail=f'No District found with id: "{district_id}"',
            )
        return ContactHouse(
            #statedistrict=contact_house_info.statedistrict,
            #namelist=contact_house_info.namelist,
            district_id=contact_house_info.district_id,
            name=contact_house_info.name,
            elected_date=contact_house_info.elected_date,
            party=contact_house_info.party,
            state=contact_house_info.state,
            phone=contact_house_info.phone,
            website=contact_house_info.website,
            name_id=contact_house_info.name_id,
        )
