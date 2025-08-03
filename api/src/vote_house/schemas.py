from datetime import datetime
from decimal import Decimal

import pydantic

class VoteDetail(pydantic.BaseModel):
    roll_num: int
    year: int

class VoteHouse(pydantic.BaseModel):
    #sort_field: str
    unaccented_name: str
    party: str
    state: str
    name_id: str
    roll: int
    vote: str
    majority: str | None = pydantic.Field(default=None)
    congress: int | None = pydantic.Field(default=None)
    session: str | None = pydantic.Field(default=None)
    chamber: str | None = pydantic.Field(default=None)
    rollcall_num: int
    legis_num: str | None = pydantic.Field(default=None)
    vote_question: str | None = pydantic.Field(default=None)
    vote_type: str | None = pydantic.Field(default=None)
    vote_result: str | None = pydantic.Field(default=None)
    action_date: datetime | None = pydantic.Field(default=None)
    action_time: str | None = pydantic.Field(default=None)
    vote_desc: str | None = pydantic.Field(default=None)
    vote_totals: int | None = pydantic.Field(default=None)
    vote_datetime: datetime | None = pydantic.Field(default=None)
    year: int
    vote_url: str
    #id: int
    committee: str | None = pydantic.Field(default=None)
    amendment_num: int | None = pydantic.Field(default=None)
    amendment_author: str | None = pydantic.Field(default=None)
    district_id: str | None = pydantic.Field(default=None)