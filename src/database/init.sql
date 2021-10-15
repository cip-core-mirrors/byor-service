CREATE TABLE IF NOT EXISTS blips (
    id_version varchar unique,
    id varchar,
    hash varchar,
    name varchar,
    version integer,
    lastUpdate varchar
);

CREATE TABLE IF NOT EXISTS blip_rights (
    id varchar unique,
    blip varchar,
    user_id varchar,
    rights varchar
);

CREATE TABLE IF NOT EXISTS column_links (
    id varchar unique,
    blip varchar,
    blip_version integer,
    name varchar,
    value varchar
);

CREATE TABLE IF NOT EXISTS blip_links (
    id varchar unique,
    radar varchar,
    sector varchar,
    ring varchar,
    blip varchar,
    blip_version integer,
    value integer
);

CREATE TABLE IF NOT EXISTS radars (
    id varchar unique,
    state integer
);

CREATE TABLE IF NOT EXISTS radar_rights (
    id varchar unique,
    radar varchar,
    user_id varchar,
    rights varchar
);

CREATE TABLE IF NOT EXISTS radar_parameters (
    id varchar unique,
    radar varchar,
    name varchar,
    value varchar
);