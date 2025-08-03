from datetime import datetime
from decimal import Decimal

import pydantic

class ContactHouse(pydantic.BaseModel):
    #statedistrict: str
    #namelist: str
    name_id: str
    #lastname: str
    #firstname: str
    #middlename: str | None = pydantic.Field(default=None)
    #sort_name: str
    #suffix: str | None = pydantic.Field(default=None)
    #courtesy: str | None = pydantic.Field(default=None)
    #prior_congress: str | None = pydantic.Field(default=None)
    #official_name: str | None = pydantic.Field(default=None)
    #formal_name: str | None = pydantic.Field(default=None)
    party: str | None = pydantic.Field(default=None)
    #caucus: str | None = pydantic.Field(default=None)
    state: str | None = pydantic.Field(default=None)
    #district: str | None = pydantic.Field(default=None)
    #townname: str | None = pydantic.Field(default=None)
    #office_building: str | None = pydantic.Field(default=None)
    #office_room: str | None = pydantic.Field(default=None)
    #office_zip: str | None = pydantic.Field(default=None)
    #office_zip_suffix: str | None = pydantic.Field(default=None)
    phone: str | None = pydantic.Field(default=None)
    elected_date: datetime
    #sworn_date: datetime
    name: str | None = pydantic.Field(default=None)
    website: str | None = pydantic.Field(default=None)
    district_id: str
