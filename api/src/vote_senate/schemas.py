from datetime import datetime
import pydantic


class VoteSenate(pydantic.BaseModel):
    member_full: str
    last_name: str
    first_name: str
    party: str
    state: str
    vote_cast: str
    lis_member_id: str
    congress: int
    session: int
    congress_year: int
    vote_number: int
    vote_date: datetime
    modify_date: datetime | None = pydantic.Field(default=None)
    vote_question_text: str
    vote_document_text: str | None = pydantic.Field(default=None)
    vote_result_text: str | None = pydantic.Field(default=None)
    question: str | None = pydantic.Field(default=None)
    vote_title: str | None = pydantic.Field(default=None)
    majority_requirement: str | None = pydantic.Field(default=None)
    vote_result: str | None = pydantic.Field(default=None)
    count: int | None = pydantic.Field(default=None)
    tie_breaker: str | None = pydantic.Field(default=None)
    name_id: str | None = pydantic.Field(default=None)
    #id: int
    vote_url: str | None = pydantic.Field(default=None)