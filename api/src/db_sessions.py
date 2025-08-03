import os
from contextlib import contextmanager
from functools import cache

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

ConnectionString = str

from dotenv import load_dotenv
from pathlib import Path

import urllib.parse

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

POSTGRES_USER: str = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")

POSTGRES_PORT: str = os.getenv("POSTGRES_PORT")
POSTGRES_DB: str = os.getenv("POSTGRES_DB")
escape_pw = urllib.parse.quote_plus(POSTGRES_PASSWORD)
DB_CONN_STRING = f"postgresql://{POSTGRES_USER}:{escape_pw}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

@cache
def get_sessionmaker(database: str):
    if database == "fteam":
        return sessionmaker(create_engine(DB_CONN_STRING, pool_size=5, max_overflow=100))
    else:
        raise ValueError('invalid database choice')

def get_db_session(database: str):
    return get_sessionmaker(database)()

@contextmanager
def db_session_context(database: str):
    session = get_db_session(database)
    try:
        yield session
    except Exception as e:
        raise e
    finally:
        session.close()
