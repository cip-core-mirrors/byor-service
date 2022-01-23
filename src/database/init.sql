CREATE TABLE IF NOT EXISTS log_headers (
    created_at timestamptz DEFAULT now(),
    sec_ch_ua varchar,
    user_agent varchar,
    referer varchar,
    radar varchar,
    user_identity varchar,
    user_uid varchar,
    user_roles varchar,
    user_vpn_ip varchar,
    user_public_ip varchar,
    user_country_code varchar,
    user_stream varchar,
    user_office varchar,
    user_authmode varchar
);

CREATE TABLE IF NOT EXISTS log_actions (
    created_at timestamptz DEFAULT now(),
    action_type varchar,
    action_table varchar,
    action_id varchar,
    action_query varchar,
    mail varchar,
    igg varchar,
    first_name varchar,
    last_name varchar,
    login_ad varchar,
    sesame_id varchar,
    authorizations varchar,
    rc_local_sigle varchar,
    auth_level varchar
);

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
    name varchar,
    value varchar
);

CREATE TABLE IF NOT EXISTS blip_links (
    id varchar unique,
    radar varchar,
    radar_version integer,
    sector varchar,
    ring varchar,
    blip varchar,
    value integer
);

CREATE TABLE IF NOT EXISTS radars (
    id varchar unique,
    published_version integer,
    state integer
);

CREATE TABLE IF NOT EXISTS radar_versions (
    id varchar unique,
    radar varchar,
    version integer
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
    radar_version integer,
    name varchar,
    value varchar
);

CREATE TABLE IF NOT EXISTS themes (
    id varchar unique
);

CREATE TABLE IF NOT EXISTS theme_parameters (
    id varchar unique,
    theme varchar,
    name varchar,
    value varchar
);

CREATE TABLE IF NOT EXISTS theme_rights (
    id varchar unique,
    theme varchar,
    user_id varchar,
    rights varchar
);