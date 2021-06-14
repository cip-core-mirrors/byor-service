CREATE TABLE IF NOT EXISTS blips (
    id varchar unique,
    hash varchar unique,
    name varchar,
    lastUpdate varchar,
    value integer
);

CREATE TABLE IF NOT EXISTS column_links (
    blip varchar,
    name varchar,
    value varchar
);

CREATE TABLE IF NOT EXISTS blip_links (
    blip varchar,
    radar varchar,
    value varchar
);

CREATE TABLE IF NOT EXISTS radars (
    id varchar unique
);

CREATE TABLE IF NOT EXISTS radar_links (
    radar varchar,
    sector varchar,
    ring varchar
);

CREATE TABLE IF NOT EXISTS radar_parameters (
    radar varchar,
    name varchar,
    value varchar
);