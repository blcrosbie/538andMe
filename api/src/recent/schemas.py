import pydantic

class Recent(pydantic.BaseModel):
    # id: int
    roll: int
    vote: int
    year: int