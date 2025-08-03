import pydantic

class ContactSenate(pydantic.BaseModel):
    member_full: str
    last_name: str
    first_name: str
    party: str
    state: str
    address: str | None = pydantic.Field(default=None)
    phone: str | None = pydantic.Field(default=None)
    email: str | None = pydantic.Field(default=None)
    website: str | None = pydantic.Field(default=None)
    class_type: str | None = pydantic.Field(default=None)
    name_id: str
    leadership_position: str | None = pydantic.Field(default=None)