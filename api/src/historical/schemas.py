import pydantic

class Historical(pydantic.BaseModel):
    # _type_: str | None = pydantic.Field(default=None)
    # state: str | None = pydantic.Field(default=None)
    # district_number: str | None = pydantic.Field(default=None)
    # start: int | None = pydantic.Field(default=None)
    # end: int | None = pydantic.Field(default=None)
    name: str | None = pydantic.Field(default=None)
    state_abbr: str | None = pydantic.Field(default=None)
    district_id: str