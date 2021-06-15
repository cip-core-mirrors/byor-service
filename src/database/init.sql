CREATE TABLE IF NOT EXISTS blips (
    id varchar unique,
    hash varchar,
    name varchar,
    lastUpdate varchar
);

CREATE TABLE IF NOT EXISTS column_links (
    id varchar unique,
    blip varchar,
    name varchar,
    value varchar
);

CREATE TABLE IF NOT EXISTS blip_links (
    id varchar unique,
    radar varchar,
    sector varchar,
    ring varchar,
    blip varchar,
    value integer
);

CREATE TABLE IF NOT EXISTS radars (
    id varchar unique
);

CREATE TABLE IF NOT EXISTS radar_parameters (
    id varchar unique,
    radar varchar,
    name varchar,
    value varchar
);