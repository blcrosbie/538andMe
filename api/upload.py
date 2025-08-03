import pandas as pd
from sqlalchemy import create_engine
import os
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
DATABASE_URL = f"postgresql://{POSTGRES_USER}:{escape_pw}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

DIR_CONTACTS = Path('../ETL/contacts/')    
DIR_VOTES_HOUSE = Path('../ETL/votes/house')
DIR_VOTES_SENATE = Path('../ETL/votes/senate')
    

def englishify_vowels(text):
    """
    Remove accented characters and return regular english
    """
    if "\u00e1" in text:
        text = text.replace("\u00e1", "a")

    if "\u00e9" in text:
        text = text.replace("\u00e9", "e")

    if "\u00ed" in text:
        text = text.replace("\u00ed", "i")

    if "\u00f3" in text:
        text = text.replace("\u00f3", "o")

    if "\u00fa" in text:
        text = text.replace("\u00fa", "u")

    return text


def getFips(district_id):
    state_abbr = district_id[0:2]
    fips_code = fips_df[fips_df['state_abbr'] == state_abbr]['fips'].values
    if fips_code.size == 0:
        return district_id

    numeric_district_id = fips_code[0] + district_id[2:4] 
    return numeric_district_id


def create_senate_url(congress, session, vote_number):
    if vote_number < 10:
        str_vote_number = '0000' + str(vote_number)
    elif vote_number < 100:
        str_vote_number = '000' + str(vote_number)
    else:
        str_vote_number = '00' + str(vote_number)

    congress = str(congress)
    session = str(session)
    url = f"https://www.senate.gov/legislative/LIS/roll_call_votes/vote{congress}{session}/vote_{congress}_{session}_{str_vote_number}.htm".format(congress=congress, session=session, str_vote_number=str_vote_number)
    return url


def upload_fips(engine):
    fips_df = pd.read_csv(os.path.join(os.path.join(os.path.dirname(os.getcwd()), 'ETL'), 'fips.csv'), dtype={"fips": str})
    with engine.connect() as conn:
        fips_df.to_sql("fips", conn, if_exists='append', index=False)



def upload_contacts(engine):
    contact_files = [{'contact_house': 'house_contacts.csv'}, {'contact_senate': 'senate_contacts.csv'}]
    with engine.connect() as conn:
        for file in contact_files:
            for tbl, fn in file.items():
                db_df = pd.read_sql_table(tbl, conn)
                load_fn = os.path.join(DIR_CONTACTS, fn)
                df = pd.read_csv(load_fn)

                if 'house' in fn:
                    df.rename(columns={'bioguideID': 'name_id'}, inplace=True)
                    df['district_id'] = df['statedistrict'].apply(lambda x: getFips(x))
                elif 'senate' in fn:
                    df.rename(columns={'bioguide_id': 'name_id'}, inplace=True)
                    df.rename(columns={'class': 'class_type'}, inplace=True)
                else:
                    pass
                    
                for col in df.columns:
                    if col not in db_df.columns:
                        del df[col]
                    if 'name' in col:
                        try:
                            df[col] = df[col].apply(lambda x: englishify_vowels(x))
                        except:
                            pass
                
                df.to_sql(tbl, con=conn, if_exists='append', index=False)


def upload_votes_house(engine):
    with engine.connect() as conn:
        db_df = pd.read_sql_table('vote_house', con=conn)
        ch = pd.read_sql_table('contact_house', con=conn)
        for file in os.listdir(DIR_VOTES_HOUSE):
            if file != '.DS_Store':
                if '2019' not in file:
                    print(file)
                    load_fn = os.path.join(DIR_VOTES_HOUSE, file)
                    df = pd.read_csv(load_fn)
                    df['vote_totals'] = None
                    df = pd.merge(df, ch[['name_id', 'district_id']], on='name_id', how='left')
                    for col in df.columns:
                        if col not in db_df.columns:
                            del df[col]
                    df.to_sql('vote_house', con=conn, if_exists='append', index=False)


def upload_votes_senate(engine):
    with engine.connect() as conn:
        db_df = pd.read_sql_table('vote_senate', con=conn)
        cs = pd.read_sql_table('contact_senate', con=conn)
        for file in os.listdir(DIR_VOTES_SENATE):
            if file != '.DS_Store' and '2019' not in file:
                print(file)
                load_fn = os.path.join(DIR_VOTES_SENATE, file)
                df = pd.read_csv(load_fn)
                df["member_full"] = df["member_full"].apply(lambda x: englishify_vowels(x))
                df = pd.merge(df, cs[['name_id', 'member_full']], on='member_full', how='left')
                if 'vote_url' not in df.columns:
                    df['vote_url'] = df[['congress', 'session', 'vote_number']].apply(lambda x: create_senate_url(*x), axis=1)
                if 'document' in df.columns:
                    del df['document']
                if 'amendment' in df.columns:
                    del df['amendment']

                for col in df.columns:
                    if col not in db_df.columns:
                        del df[col]

                df.to_sql('vote_senate', con=conn, if_exists='append', index=False)



def main():
    engine = create_engine(DATABASE_URL)
    upload_fips(engine=engine)
    upload_contacts(engine=engine)
    upload_votes_house(engine=engine)
    upload_votes_senate(engine=engine)
    

if __name__ == '__main__':
    main()