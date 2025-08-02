-- CREATE USER dev WITH PASSWORD 'fuckRu' CREATEDB;

-- CREATE DATABASE IF NOT EXISTS fte
--     WITH
--     OWNER = dev
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.utf8'
--     LC_CTYPE = 'en_US.utf8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS public.fips
(
    state character varying(128) COLLATE pg_catalog."default" NOT NULL,
    state_abbr character varying(2) COLLATE pg_catalog."default" NOT NULL,
    fips character varying(2) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT fips_pkey PRIMARY KEY (fips)
);


CREATE TABLE IF NOT EXISTS public.contact_house
(
    statedistrict character varying(8) COLLATE pg_catalog."default" NOT NULL,
    namelist character varying(256) COLLATE pg_catalog."default" NOT NULL,
    name_id character varying(8) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(256) COLLATE pg_catalog."default" NOT NULL,
    firstname character varying(256) COLLATE pg_catalog."default" NOT NULL,
    middlename character varying(256) COLLATE pg_catalog."default",
    sort_name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    suffix character varying(32) COLLATE pg_catalog."default",
    courtesy character varying(32) COLLATE pg_catalog."default",
    prior_congress character varying(64) COLLATE pg_catalog."default",
    official_name character varying(256) COLLATE pg_catalog."default",
    formal_name character varying(256) COLLATE pg_catalog."default",
    party character varying(2) COLLATE pg_catalog."default",
    caucus character varying(2) COLLATE pg_catalog."default",
    state character varying(32) COLLATE pg_catalog."default",
    district character varying(32) COLLATE pg_catalog."default",
    townname character varying(256) COLLATE pg_catalog."default",
    office_building character varying(256) COLLATE pg_catalog."default",
    office_room character varying(256) COLLATE pg_catalog."default",
    office_zip character varying(8) COLLATE pg_catalog."default",
    office_zip_suffix character varying(8) COLLATE pg_catalog."default",
    phone character varying(16) COLLATE pg_catalog."default",
    elected_date date,
    sworn_date date,
    name character varying(256) COLLATE pg_catalog."default",
    website character varying(256) COLLATE pg_catalog."default",
    district_id character varying(8) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT contact_house_pkey PRIMARY KEY (name_id)
);


CREATE TABLE IF NOT EXISTS public.contact_senate
(
    member_full character varying(256) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    party character varying(2) COLLATE pg_catalog."default" NOT NULL,
    state character varying(2) COLLATE pg_catalog."default" NOT NULL,
    address character varying(256) COLLATE pg_catalog."default",
    phone character varying(16) COLLATE pg_catalog."default",
    email character varying(256) COLLATE pg_catalog."default",
    website character varying(256) COLLATE pg_catalog."default",
    class_type character varying(16) COLLATE pg_catalog."default",
    name_id character varying(8) COLLATE pg_catalog."default" NOT NULL,
    leadership_position character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT contact_senate_pkey PRIMARY KEY (name_id)
);


CREATE SEQUENCE IF NOT EXISTS public.vote_house_id_seq
    INCREMENT 1
    START 100000000
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.vote_senate_id_seq
    INCREMENT 1
    START 100000000
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.vote_house
(
    sort_field character varying(32) COLLATE pg_catalog."default" NOT NULL,
    unaccented_name character varying(32) COLLATE pg_catalog."default" NOT NULL,
    party character varying(2) COLLATE pg_catalog."default" NOT NULL,
    state character varying(2) COLLATE pg_catalog."default" NOT NULL,
    vote character varying(16) COLLATE pg_catalog."default" NOT NULL,
    majority character varying(2) COLLATE pg_catalog."default",
    congress integer,
    session character varying(8) COLLATE pg_catalog."default",
    chamber character varying(128) COLLATE pg_catalog."default",
    rollcall_num integer NOT NULL,
    legis_num character varying(32) COLLATE pg_catalog."default",
    vote_question character varying(512) COLLATE pg_catalog."default",
    vote_type character varying(64) COLLATE pg_catalog."default",
    vote_result character varying(32) COLLATE pg_catalog."default",
    action_date date,
    action_time character varying(16) COLLATE pg_catalog."default",
    vote_desc text COLLATE pg_catalog."default",
    vote_totals integer,
    vote_datetime timestamp without time zone,
    year integer NOT NULL,
    roll integer NOT NULL,
    vote_url character varying(256) COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 100000000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name_id character varying(8) COLLATE pg_catalog."default" NOT NULL,
    committee character varying(256) COLLATE pg_catalog."default",
    amendment_num integer,
    amendment_author character varying(256) COLLATE pg_catalog."default",
    district_id character varying(8) COLLATE pg_catalog."default",
    CONSTRAINT vote_house_pkey PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS public.vote_senate
(
    member_full character varying(256) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    party character varying(2) COLLATE pg_catalog."default" NOT NULL,
    state character varying(2) COLLATE pg_catalog."default" NOT NULL,
    vote_cast character varying(32) COLLATE pg_catalog."default" NOT NULL,
    lis_member_id character varying(8) COLLATE pg_catalog."default" NOT NULL,
    congress integer NOT NULL,
    session integer NOT NULL,
    congress_year integer NOT NULL,
    vote_number integer NOT NULL,
    vote_date timestamp(0) without time zone NOT NULL,
    modify_date timestamp(0) without time zone,
    vote_question_text text COLLATE pg_catalog."default" NOT NULL,
    vote_document_text text COLLATE pg_catalog."default",
    vote_result_text text COLLATE pg_catalog."default",
    question text COLLATE pg_catalog."default",
    vote_title text COLLATE pg_catalog."default",
    majority_requirement character varying(16) COLLATE pg_catalog."default",
    vote_result text COLLATE pg_catalog."default",
    count integer,
    tie_breaker text COLLATE pg_catalog."default",
    name_id character varying(8) COLLATE pg_catalog."default",
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 100000000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    vote_url character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT vote_senate_pkey PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS public.historical (
    "type" character varying(128) NULL,
    state character varying(128) NULL,
    district_number character varying(8) NULL,
    "start" integer NULL,
    "end" integer NULL,
    "name" character varying(256) NULL,
    state_abbr character varying(2) NULL,
    district_id character varying(4) NULL,
    id integer NOT NULL GENERATED by DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    constraint historical_pkey primary key (id)
);

CREATE TABLE IF NOT EXISTS public.recent (
    roll integer not null default 1,
    vote integer not null default 1,
    congress integer not null default 1,
    "session" integer not null default 1,
    id integer NOT NULL GENERATED by DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    constraint recent_pkey primary key (id)
);


CREATE TABLE public.bill (
    title varchar NOT NULL,
    congress integer NOT NULL,
    stage varchar NULL,
    "text" text NULL,
    url varchar NOT NULL,
    file_type varchar NOT NULL,
    "date" date NULL,
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    constraint bill_pkey primary key (id)
);


ALTER DATABASE fte OWNER to dev;

ALTER SEQUENCE public.vote_house_id_seq
    OWNER TO dev;

ALTER SEQUENCE public.vote_senate_id_seq
    OWNER TO dev;

ALTER TABLE IF EXISTS public.fips
    OWNER to dev;

ALTER TABLE IF EXISTS public.contact_house
    OWNER to dev;

ALTER TABLE IF EXISTS public.contact_senate
    OWNER to dev;

ALTER TABLE IF EXISTS public.vote_house
    OWNER to dev;

ALTER TABLE IF EXISTS public.vote_senate
    OWNER to dev;

ALTER TABLE IF EXISTS public.recent
    OWNER to dev;

ALTER TABLE IF EXISTS public.bill
    OWNER to dev;
