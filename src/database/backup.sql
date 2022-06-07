--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 13.3


CREATE TABLE blip_links (
    id character varying,
    radar character varying,
    radar_version character varying,
    sector character varying,
    ring character varying,
    oldring character varying,
    blip character varying,
    value integer
);


CREATE TABLE blip_rights (
    id character varying,
    blip character varying,
    user_id character varying,
    rights character varying
);


CREATE TABLE blips (
    id_version character varying,
    id character varying,
    hash character varying,
    name character varying,
    version integer,
    lastupdate character varying
);


CREATE TABLE column_links (
    id character varying,
    blip character varying,
    name character varying,
    value character varying
);


CREATE TABLE log_actions (
    created_at timestamp with time zone DEFAULT now(),
    action_type character varying,
    action_table character varying,
    action_id character varying,
    action_query character varying,
    mail character varying,
    igg character varying,
    first_name character varying,
    last_name character varying,
    login_ad character varying,
    sesame_id character varying,
    authorizations character varying,
    rc_local_sigle character varying,
    auth_level character varying
);


CREATE TABLE log_headers (
    created_at timestamp with time zone DEFAULT now(),
    sec_ch_ua character varying,
    user_agent character varying,
    referer character varying,
    radar character varying,
    user_identity character varying,
    user_uid character varying,
    user_roles character varying,
    user_vpn_ip character varying,
    user_public_ip character varying,
    user_country_code character varying,
    user_stream character varying,
    user_office character varying,
    user_authmode character varying
);


CREATE TABLE radar_parameters (
    id character varying,
    radar character varying,
    radar_version character varying,
    name character varying,
    value character varying
);


CREATE TABLE radar_rights (
    id character varying,
    radar character varying,
    user_id character varying,
    rights character varying
);


CREATE TABLE radar_tags (
    id character varying,
    name character varying,
    radar character varying,
    radar_version character varying
);


CREATE TABLE radar_versions (
    id character varying,
    radar character varying,
    version integer,
    fork integer,
    fork_version integer,
    user_id character varying
);


CREATE TABLE radars (
    id character varying,
    state integer
);


CREATE TABLE theme_parameters (
    id character varying,
    theme character varying,
    name character varying,
    value character varying
);


CREATE TABLE theme_rights (
    id character varying,
    theme character varying,
    user_id character varying,
    rights character varying
);


CREATE TABLE themes (
    id character varying
);


COPY blip_links (id, radar, radar_version, sector, ring, oldring, blip, value) FROM stdin;
markdown-1-1-1-markdown-24-16	markdown	markdown-1-1-1	Format 2	Simple	\N	markdown-24-16	1
markdown-1-1-1-markdown-25-4	markdown	markdown-1-1-1	Format 2	Simple	\N	markdown-25-4	2
markdown-1-1-1-markdown-27-4	markdown	markdown-1-1-1	Format 2	Simple	\N	markdown-27-4	3
markdown-1-1-1-markdown-26-6	markdown	markdown-1-1-1	Format 2	Simple	\N	markdown-26-6	4
markdown-1-1-1-markdown-28-4	markdown	markdown-1-1-1	Format 2	Complex	\N	markdown-28-4	5
markdown-1-1-1-user2@gmail.com-1642583290264-0-1	markdown	markdown-1-1-1	Format 2	Complex	\N	user2@gmail.com-1642583290264-0-1	6
markdown-1-1-1-markdown-37-6	markdown	markdown-1-1-1	Format 2	Complex	\N	markdown-37-6	7
markdown-1-1-1-markdown-40-6	markdown	markdown-1-1-1	Lists	Simple	\N	markdown-40-6	1
markdown-1-1-1-markdown-39-7	markdown	markdown-1-1-1	Lists	Simple	\N	markdown-39-7	2
markdown-1-1-1-guild-development-radar-data-15-1	markdown	markdown-1-1-1	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-1-1-1-guild-development-radar-data-56-1	markdown	markdown-1-1-1	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-1-1-1-markdown-29-6	markdown	markdown-1-1-1	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-1-1-1-markdown-30-6	markdown	markdown-1-1-1	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-1-1-1-markdown-31-6	markdown	markdown-1-1-1	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-1-1-1-markdown-32-6	markdown	markdown-1-1-1	Heading	Simple	\N	markdown-32-6	1
markdown-1-1-1-markdown-33-6	markdown	markdown-1-1-1	Heading	Simple	\N	markdown-33-6	1
markdown-1-1-1-markdown-34-6	markdown	markdown-1-1-1	Heading	Simple	\N	markdown-34-6	1
markdown-1-1-1-markdown-35-6	markdown	markdown-1-1-1	Heading	Simple	\N	markdown-35-6	1
markdown-1-1-1-markdown-36-8	markdown	markdown-1-1-1	Heading	Simple	\N	markdown-36-8	1
markdown-1-1-1-markdown-38-6	markdown	markdown-1-1-1	Heading	Complex	\N	markdown-38-6	1
markdown-1-1-1-markdown-41-6	markdown	markdown-1-1-1	Full Examples	Complex	\N	markdown-41-6	1
markdown-1-1-1-markdown-42-7	markdown	markdown-1-1-1	Full Examples	Complex	\N	markdown-42-7	1
markdown-0-1-1-markdown-24-16	markdown	markdown-0-1-1	Format 2	Simple	\N	markdown-24-16	1
markdown-0-1-1-user2@gmail.com-1642583290264-0-1	markdown	markdown-0-1-1	Lists	Complex	\N	user2@gmail.com-1642583290264-0-1	1
markdown-0-markdown-40-6	markdown	markdown-0	Lists	Simple	\N	markdown-40-6	1
markdown-0-markdown-39-7	markdown	markdown-0	Lists	Simple	\N	markdown-39-7	1
markdown-0-user2@gmail.com-1642583290264-0-1	markdown	markdown-0	Lists	Complex	\N	user2@gmail.com-1642583290264-0-1	1
markdown-0-markdown-24-16	markdown	markdown-0	Format 2	Simple	\N	markdown-24-16	1
markdown-0-markdown-25-4	markdown	markdown-0	Format 2	Simple	\N	markdown-25-4	1
markdown-0-markdown-27-4	markdown	markdown-0	Format 2	Simple	\N	markdown-27-4	1
markdown-0-markdown-26-6	markdown	markdown-0	Format 2	Simple	\N	markdown-26-6	1
markdown-0-markdown-28-4	markdown	markdown-0	Format 2	Complex	\N	markdown-28-4	1
markdown-0-markdown-37-6	markdown	markdown-0	Format 2	Complex	\N	markdown-37-6	1
markdown-0-markdown-29-6	markdown	markdown-0	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-0-markdown-30-6	markdown	markdown-0	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-0-markdown-31-6	markdown	markdown-0	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-0-markdown-32-6	markdown	markdown-0	Heading	Simple	\N	markdown-32-6	1
markdown-0-markdown-33-6	markdown	markdown-0	Heading	Simple	\N	markdown-33-6	1
markdown-0-markdown-34-6	markdown	markdown-0	Heading	Simple	\N	markdown-34-6	1
markdown-0-markdown-35-6	markdown	markdown-0	Heading	Simple	\N	markdown-35-6	1
markdown-0-markdown-36-8	markdown	markdown-0	Heading	Simple	\N	markdown-36-8	1
markdown-0-markdown-38-6	markdown	markdown-0	Heading	Complex	\N	markdown-38-6	1
markdown-0-markdown-41-6	markdown	markdown-0	Full Examples	Complex	\N	markdown-41-6	1
markdown-0-markdown-42-7	markdown	markdown-0	Full Examples	Complex	\N	markdown-42-7	1
markdown-0-1-1-markdown-40-6	markdown	markdown-0-1-1	Lists	Simple	\N	markdown-40-6	1
markdown-0-1-1-markdown-39-7	markdown	markdown-0-1-1	Lists	Simple	\N	markdown-39-7	1
markdown-0-1-1-markdown-25-4	markdown	markdown-0-1-1	Format 2	Simple	\N	markdown-25-4	1
markdown-0-1-1-markdown-27-4	markdown	markdown-0-1-1	Format 2	Simple	\N	markdown-27-4	1
markdown-0-1-1-markdown-26-6	markdown	markdown-0-1-1	Format 2	Simple	\N	markdown-26-6	1
markdown-0-1-1-markdown-28-4	markdown	markdown-0-1-1	Format 2	Complex	\N	markdown-28-4	1
markdown-0-1-1-markdown-37-6	markdown	markdown-0-1-1	Format 2	Complex	\N	markdown-37-6	1
markdown-0-1-1-markdown-29-6	markdown	markdown-0-1-1	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-0-1-1-markdown-30-6	markdown	markdown-0-1-1	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-1-markdown-24-16	markdown	markdown-1	Format 2	Simple	\N	markdown-24-16	1
markdown-1-markdown-25-4	markdown	markdown-1	Format 2	Simple	\N	markdown-25-4	1
markdown-1-markdown-27-4	markdown	markdown-1	Format 2	Simple	\N	markdown-27-4	1
markdown-1-markdown-26-6	markdown	markdown-1	Format 2	Simple	\N	markdown-26-6	1
markdown-1-markdown-28-4	markdown	markdown-1	Format 2	Complex	\N	markdown-28-4	1
markdown-1-markdown-37-6	markdown	markdown-1	Format 2	Complex	\N	markdown-37-6	1
markdown-1-markdown-29-6	markdown	markdown-1	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-2-2-2-markdown-25-4	markdown	markdown-2-2-2	Format 2	Simple	\N	markdown-25-4	2
markdown-2-2-2-markdown-27-4	markdown	markdown-2-2-2	Format 2	Simple	\N	markdown-27-4	3
markdown-2-2-2-markdown-26-6	markdown	markdown-2-2-2	Format 2	Simple	\N	markdown-26-6	4
markdown-2-2-2-markdown-28-4	markdown	markdown-2-2-2	Format 2	Complex	\N	markdown-28-4	5
markdown-2-2-2-user2@gmail.com-1642583290264-0-1	markdown	markdown-2-2-2	Format 2	Complex	\N	user2@gmail.com-1642583290264-0-1	6
markdown-2-2-2-markdown-37-6	markdown	markdown-2-2-2	Format 2	Complex	\N	markdown-37-6	7
markdown-2-2-2-markdown-40-6	markdown	markdown-2-2-2	Lists	Simple	\N	markdown-40-6	1
markdown-2-2-2-markdown-24-2	markdown	markdown-2-2-2	Lists	Simple	\N	markdown-24-2	1
markdown-2-2-2-markdown-39-7	markdown	markdown-2-2-2	Lists	Simple	\N	markdown-39-7	2
markdown-2-2-2-guild-development-radar-data-15-1	markdown	markdown-2-2-2	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-2-2-2-guild-development-radar-data-56-1	markdown	markdown-2-2-2	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-2-2-2-markdown-29-6	markdown	markdown-2-2-2	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-2-2-1-markdown-25-4	markdown	markdown-2-2-1	Format 2	Simple	\N	markdown-25-4	2
markdown-2-2-1-markdown-27-4	markdown	markdown-2-2-1	Format 2	Simple	\N	markdown-27-4	3
markdown-2-2-1-markdown-26-6	markdown	markdown-2-2-1	Format 2	Simple	\N	markdown-26-6	4
markdown-2-2-1-markdown-28-4	markdown	markdown-2-2-1	Format 2	Complex	\N	markdown-28-4	5
markdown-2-2-1-user2@gmail.com-1642583290264-0-1	markdown	markdown-2-2-1	Format 2	Complex	\N	user2@gmail.com-1642583290264-0-1	6
markdown-2-2-1-markdown-37-6	markdown	markdown-2-2-1	Format 2	Complex	\N	markdown-37-6	7
markdown-2-2-1-markdown-40-6	markdown	markdown-2-2-1	Lists	Simple	\N	markdown-40-6	1
markdown-2-2-1-markdown-24-2	markdown	markdown-2-2-1	Lists	Simple	\N	markdown-24-2	1
markdown-2-2-1-markdown-39-7	markdown	markdown-2-2-1	Lists	Simple	\N	markdown-39-7	2
markdown-2-2-1-guild-development-radar-data-15-1	markdown	markdown-2-2-1	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-2-2-1-guild-development-radar-data-56-1	markdown	markdown-2-2-1	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-2-2-1-markdown-29-6	markdown	markdown-2-2-1	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-2-2-1-markdown-30-6	markdown	markdown-2-2-1	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-2-2-1-markdown-31-6	markdown	markdown-2-2-1	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-2-2-1-markdown-32-6	markdown	markdown-2-2-1	Heading	Simple	\N	markdown-32-6	1
markdown-2-2-1-markdown-33-6	markdown	markdown-2-2-1	Heading	Simple	\N	markdown-33-6	1
markdown-2-2-1-markdown-34-6	markdown	markdown-2-2-1	Heading	Simple	\N	markdown-34-6	1
markdown-2-2-1-markdown-35-6	markdown	markdown-2-2-1	Heading	Simple	\N	markdown-35-6	1
markdown-2-2-1-markdown-36-8	markdown	markdown-2-2-1	Heading	Simple	\N	markdown-36-8	1
markdown-2-2-1-markdown-38-6	markdown	markdown-2-2-1	Heading	Complex	\N	markdown-38-6	1
markdown-2-2-1-markdown-41-6	markdown	markdown-2-2-1	Full Examples	Complex	\N	markdown-41-6	1
markdown-2-2-1-markdown-42-7	markdown	markdown-2-2-1	Full Examples	Complex	\N	markdown-42-7	1
markdown-2-2-2-markdown-30-6	markdown	markdown-2-2-2	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-2-2-2-markdown-31-6	markdown	markdown-2-2-2	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-2-2-2-user1@gmail.com-1648045789455-0-1	markdown	markdown-2-2-2	Multi-line paragraph	Complex	\N	user1@gmail.com-1648045789455-0-1	1
markdown-2-2-2-markdown-32-6	markdown	markdown-2-2-2	Heading	Simple	\N	markdown-32-6	1
markdown-2-2-2-markdown-33-6	markdown	markdown-2-2-2	Heading	Simple	\N	markdown-33-6	1
markdown-2-2-2-markdown-34-6	markdown	markdown-2-2-2	Heading	Simple	\N	markdown-34-6	1
markdown-2-2-2-markdown-35-6	markdown	markdown-2-2-2	Heading	Simple	\N	markdown-35-6	1
markdown-2-2-2-markdown-36-8	markdown	markdown-2-2-2	Heading	Simple	\N	markdown-36-8	1
markdown-2-2-2-markdown-38-6	markdown	markdown-2-2-2	Heading	Complex	\N	markdown-38-6	1
markdown-2-2-2-markdown-41-6	markdown	markdown-2-2-2	Full Examples	Complex	\N	markdown-41-6	1
markdown-2-2-2-markdown-42-7	markdown	markdown-2-2-2	Full Examples	Complex	\N	markdown-42-7	1
markdown-2-markdown-35-6	markdown	markdown-2	Heading	Simple	\N	markdown-35-6	1
markdown-2-guild-development-radar-data-56-1	markdown	markdown-2	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-2-markdown-29-6	markdown	markdown-2	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-2-markdown-30-6	markdown	markdown-2	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-2-markdown-31-6	markdown	markdown-2	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-2-markdown-32-6	markdown	markdown-2	Heading	Simple	\N	markdown-32-6	1
markdown-2-markdown-33-6	markdown	markdown-2	Heading	Simple	\N	markdown-33-6	1
markdown-2-markdown-34-6	markdown	markdown-2	Heading	Simple	\N	markdown-34-6	1
markdown-0-1-1-markdown-31-6	markdown	markdown-0-1-1	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-0-1-1-markdown-32-6	markdown	markdown-0-1-1	Heading	Simple	\N	markdown-32-6	1
markdown-0-1-1-markdown-33-6	markdown	markdown-0-1-1	Heading	Simple	\N	markdown-33-6	1
markdown-0-1-1-markdown-34-6	markdown	markdown-0-1-1	Heading	Simple	\N	markdown-34-6	1
markdown-0-1-1-markdown-35-6	markdown	markdown-0-1-1	Heading	Simple	\N	markdown-35-6	1
markdown-0-1-1-markdown-36-8	markdown	markdown-0-1-1	Heading	Simple	\N	markdown-36-8	1
markdown-0-1-1-markdown-38-6	markdown	markdown-0-1-1	Heading	Complex	\N	markdown-38-6	1
markdown-0-1-1-markdown-41-6	markdown	markdown-0-1-1	Full Examples	Complex	\N	markdown-41-6	1
markdown-0-1-1-markdown-42-7	markdown	markdown-0-1-1	Full Examples	Complex	\N	markdown-42-7	1
markdown-1-markdown-40-6	markdown	markdown-1	Lists	Simple	\N	markdown-40-6	1
markdown-1-markdown-39-7	markdown	markdown-1	Lists	Simple	\N	markdown-39-7	1
markdown-1-user2@gmail.com-1642583290264-0-1	markdown	markdown-1	Lists	Complex	\N	user2@gmail.com-1642583290264-0-1	1
markdown-1-markdown-30-6	markdown	markdown-1	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-1-markdown-31-6	markdown	markdown-1	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-1-markdown-32-6	markdown	markdown-1	Heading	Simple	\N	markdown-32-6	1
markdown-1-markdown-33-6	markdown	markdown-1	Heading	Simple	\N	markdown-33-6	1
markdown-1-markdown-34-6	markdown	markdown-1	Heading	Simple	\N	markdown-34-6	1
markdown-1-markdown-35-6	markdown	markdown-1	Heading	Simple	\N	markdown-35-6	1
markdown-1-markdown-36-8	markdown	markdown-1	Heading	Simple	\N	markdown-36-8	1
markdown-1-markdown-38-6	markdown	markdown-1	Heading	Complex	\N	markdown-38-6	1
markdown-1-markdown-41-6	markdown	markdown-1	Full Examples	Complex	\N	markdown-41-6	1
markdown-1-markdown-42-7	markdown	markdown-1	Full Examples	Complex	\N	markdown-42-7	1
markdown-2-markdown-24-16	markdown	markdown-2	Format 2	Simple	\N	markdown-24-16	1
markdown-2-markdown-25-4	markdown	markdown-2	Format 2	Simple	\N	markdown-25-4	2
markdown-2-markdown-27-4	markdown	markdown-2	Format 2	Simple	\N	markdown-27-4	3
markdown-2-markdown-26-6	markdown	markdown-2	Format 2	Simple	\N	markdown-26-6	4
markdown-2-markdown-28-4	markdown	markdown-2	Format 2	Complex	\N	markdown-28-4	5
markdown-2-user2@gmail.com-1642583290264-0-1	markdown	markdown-2	Format 2	Complex	\N	user2@gmail.com-1642583290264-0-1	6
markdown-2-markdown-37-6	markdown	markdown-2	Format 2	Complex	\N	markdown-37-6	7
markdown-2-markdown-40-6	markdown	markdown-2	Lists	Simple	\N	markdown-40-6	1
markdown-2-markdown-39-7	markdown	markdown-2	Lists	Simple	\N	markdown-39-7	2
markdown-2-guild-development-radar-data-15-1	markdown	markdown-2	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-2-markdown-36-8	markdown	markdown-2	Heading	Simple	\N	markdown-36-8	1
markdown-2-markdown-38-6	markdown	markdown-2	Heading	Complex	\N	markdown-38-6	1
markdown-2-markdown-41-6	markdown	markdown-2	Full Examples	Complex	\N	markdown-41-6	1
markdown-2-markdown-42-7	markdown	markdown-2	Full Examples	Complex	\N	markdown-42-7	1
markdown-2-1-1-guild-development-radar-data-15-1	markdown	markdown-2-1-1	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-2-1-1-guild-development-radar-data-56-1	markdown	markdown-2-1-1	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-2-1-1-markdown-40-6	markdown	markdown-2-1-1	Lists	Simple	\N	markdown-40-6	1
markdown-2-1-1-markdown-39-7	markdown	markdown-2-1-1	Lists	Simple	\N	markdown-39-7	2
markdown-2-1-1-markdown-29-6	markdown	markdown-2-1-1	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-2-1-1-markdown-30-6	markdown	markdown-2-1-1	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-2-1-1-markdown-31-6	markdown	markdown-2-1-1	Multi-line paragraph	Simple	\N	markdown-31-6	1
markdown-2-1-1-markdown-38-6	markdown	markdown-2-1-1	Heading	Complex	\N	markdown-38-6	1
markdown-2-1-1-markdown-32-6	markdown	markdown-2-1-1	Heading	Simple	\N	markdown-32-6	1
markdown-2-1-1-markdown-33-6	markdown	markdown-2-1-1	Heading	Simple	\N	markdown-33-6	1
markdown-2-1-1-markdown-34-6	markdown	markdown-2-1-1	Heading	Simple	\N	markdown-34-6	1
markdown-2-1-1-markdown-35-6	markdown	markdown-2-1-1	Heading	Simple	\N	markdown-35-6	1
markdown-2-1-1-markdown-36-8	markdown	markdown-2-1-1	Heading	Simple	\N	markdown-36-8	1
markdown-2-1-1-markdown-41-6	markdown	markdown-2-1-1	Full Examples	Complex	\N	markdown-41-6	1
markdown-2-1-1-markdown-42-7	markdown	markdown-2-1-1	Full Examples	Complex	\N	markdown-42-7	1
markdown-3-markdown-39-7	markdown	markdown-3	Lists	Simple	\N	markdown-39-7	2
markdown-2-1-2-guild-development-radar-data-15-1	markdown	markdown-2-1-2	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-2-1-2-guild-development-radar-data-56-1	markdown	markdown-2-1-2	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-2-1-2-markdown-24-5	markdown	markdown-2-1-2	Lists	Complex	\N	markdown-24-5	1
markdown-2-1-2-user1@gmail.com-1647017731067-0-1	markdown	markdown-2-1-2	Lists	Complex	\N	user1@gmail.com-1647017731067-0-1	1
markdown-2-1-2-markdown-40-6	markdown	markdown-2-1-2	Lists	Simple	\N	markdown-40-6	1
markdown-2-1-2-markdown-39-7	markdown	markdown-2-1-2	Lists	Simple	\N	markdown-39-7	2
markdown-2-1-2-markdown-29-6	markdown	markdown-2-1-2	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-2-1-2-markdown-31-7	markdown	markdown-2-1-2	Multi-line paragraph	Simple	Complex	markdown-31-7	2
markdown-2-1-2-markdown-30-6	markdown	markdown-2-1-2	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-2-1-2-markdown-38-6	markdown	markdown-2-1-2	Heading	Complex	\N	markdown-38-6	1
markdown-2-1-2-markdown-32-6	markdown	markdown-2-1-2	Heading	Simple	\N	markdown-32-6	1
markdown-2-1-2-markdown-33-6	markdown	markdown-2-1-2	Heading	Simple	\N	markdown-33-6	1
markdown-2-1-2-markdown-34-6	markdown	markdown-2-1-2	Heading	Simple	\N	markdown-34-6	1
markdown-2-1-2-markdown-35-6	markdown	markdown-2-1-2	Heading	Simple	\N	markdown-35-6	1
markdown-2-1-2-markdown-36-8	markdown	markdown-2-1-2	Heading	Simple	\N	markdown-36-8	1
markdown-2-1-2-markdown-42-7	markdown	markdown-2-1-2	Full Examples	Complex	\N	markdown-42-7	1
markdown-2-1-2-markdown-41-7	markdown	markdown-2-1-2	Full Examples	Complex	\N	markdown-41-7	1
markdown-2-1-3-guild-development-radar-data-15-1	markdown	markdown-2-1-3	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-2-1-3-guild-development-radar-data-56-1	markdown	markdown-2-1-3	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-2-1-3-markdown-24-5	markdown	markdown-2-1-3	Lists	Complex	\N	markdown-24-5	1
markdown-2-1-3-user1@gmail.com-1647017731067-0-1	markdown	markdown-2-1-3	Lists	Complex	\N	user1@gmail.com-1647017731067-0-1	1
markdown-2-1-3-markdown-40-6	markdown	markdown-2-1-3	Lists	Simple	\N	markdown-40-6	1
markdown-2-1-3-markdown-39-7	markdown	markdown-2-1-3	Lists	Simple	\N	markdown-39-7	2
markdown-2-1-3-markdown-31-7	markdown	markdown-2-1-3	Multi-line paragraph	Complex	\N	markdown-31-7	2
markdown-2-1-3-markdown-29-6	markdown	markdown-2-1-3	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-2-1-3-markdown-30-6	markdown	markdown-2-1-3	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-2-1-3-markdown-38-6	markdown	markdown-2-1-3	Heading	Complex	\N	markdown-38-6	1
markdown-2-1-3-markdown-32-6	markdown	markdown-2-1-3	Heading	Simple	\N	markdown-32-6	1
markdown-2-1-3-markdown-33-6	markdown	markdown-2-1-3	Heading	Simple	\N	markdown-33-6	1
markdown-2-1-3-markdown-34-6	markdown	markdown-2-1-3	Heading	Simple	\N	markdown-34-6	1
markdown-2-1-3-markdown-35-6	markdown	markdown-2-1-3	Heading	Simple	\N	markdown-35-6	1
markdown-2-1-3-markdown-36-8	markdown	markdown-2-1-3	Heading	Simple	\N	markdown-36-8	1
markdown-2-1-3-markdown-42-7	markdown	markdown-2-1-3	Full Examples	Complex	\N	markdown-42-7	1
markdown-2-1-3-markdown-41-7	markdown	markdown-2-1-3	Full Examples	Complex	\N	markdown-41-7	1
markdown-3-guild-development-radar-data-15-1	markdown	markdown-3	Lists	Complex	\N	guild-development-radar-data-15-1	4
markdown-3-guild-development-radar-data-56-1	markdown	markdown-3	Lists	Complex	\N	guild-development-radar-data-56-1	1
markdown-3-markdown-24-5	markdown	markdown-3	Lists	Complex	\N	markdown-24-5	1
markdown-3-user1@gmail.com-1647017731067-0-1	markdown	markdown-3	Lists	Complex	\N	user1@gmail.com-1647017731067-0-1	1
markdown-3-markdown-40-6	markdown	markdown-3	Lists	Simple	\N	markdown-40-6	1
markdown-3-markdown-31-7	markdown	markdown-3	Multi-line paragraph	Complex	\N	markdown-31-7	2
markdown-3-markdown-29-6	markdown	markdown-3	Multi-line paragraph	Simple	\N	markdown-29-6	1
markdown-3-markdown-30-6	markdown	markdown-3	Multi-line paragraph	Simple	\N	markdown-30-6	1
markdown-3-markdown-38-6	markdown	markdown-3	Heading	Complex	\N	markdown-38-6	1
markdown-3-markdown-32-6	markdown	markdown-3	Heading	Simple	\N	markdown-32-6	1
markdown-3-markdown-33-6	markdown	markdown-3	Heading	Simple	\N	markdown-33-6	1
markdown-3-markdown-34-6	markdown	markdown-3	Heading	Simple	\N	markdown-34-6	1
markdown-3-markdown-35-6	markdown	markdown-3	Heading	Simple	\N	markdown-35-6	1
markdown-3-markdown-36-8	markdown	markdown-3	Heading	Simple	\N	markdown-36-8	1
markdown-3-markdown-42-7	markdown	markdown-3	Full Examples	Complex	\N	markdown-42-7	1
markdown-3-markdown-41-7	markdown	markdown-3	Full Examples	Complex	\N	markdown-41-7	1
\.


COPY blip_rights (id, blip, user_id, rights) FROM stdin;
markdown-24-user2@gmail.com	markdown-24	user2@gmail.com	edit
markdown-25-user2@gmail.com	markdown-25	user2@gmail.com	edit
markdown-26-user2@gmail.com	markdown-26	user2@gmail.com	edit
markdown-27-user2@gmail.com	markdown-27	user2@gmail.com	edit
markdown-28-user2@gmail.com	markdown-28	user2@gmail.com	edit
markdown-29-user2@gmail.com	markdown-29	user2@gmail.com	edit
markdown-30-user2@gmail.com	markdown-30	user2@gmail.com	edit
markdown-31-user2@gmail.com	markdown-31	user2@gmail.com	edit
markdown-32-user2@gmail.com	markdown-32	user2@gmail.com	edit
markdown-33-user2@gmail.com	markdown-33	user2@gmail.com	edit
markdown-34-user2@gmail.com	markdown-34	user2@gmail.com	edit
markdown-35-user2@gmail.com	markdown-35	user2@gmail.com	edit
markdown-36-user2@gmail.com	markdown-36	user2@gmail.com	edit
markdown-37-user2@gmail.com	markdown-37	user2@gmail.com	edit
markdown-38-user2@gmail.com	markdown-38	user2@gmail.com	edit
markdown-39-user2@gmail.com	markdown-39	user2@gmail.com	edit
markdown-40-user2@gmail.com	markdown-40	user2@gmail.com	edit
markdown-41-user2@gmail.com	markdown-41	user2@gmail.com	edit
markdown-42-user2@gmail.com	markdown-42	user2@gmail.com	edit
markdown-24-user1@gmail.com	markdown-24	user1@gmail.com	owner,edit
markdown-25-user1@gmail.com	markdown-25	user1@gmail.com	owner,edit
markdown-26-user1@gmail.com	markdown-26	user1@gmail.com	owner,edit
markdown-27-user1@gmail.com	markdown-27	user1@gmail.com	owner,edit
markdown-28-user1@gmail.com	markdown-28	user1@gmail.com	owner,edit
markdown-29-user1@gmail.com	markdown-29	user1@gmail.com	owner,edit
markdown-30-user1@gmail.com	markdown-30	user1@gmail.com	owner,edit
markdown-31-user1@gmail.com	markdown-31	user1@gmail.com	owner,edit
markdown-32-user1@gmail.com	markdown-32	user1@gmail.com	owner,edit
markdown-33-user1@gmail.com	markdown-33	user1@gmail.com	owner,edit
markdown-34-user1@gmail.com	markdown-34	user1@gmail.com	owner,edit
markdown-35-user1@gmail.com	markdown-35	user1@gmail.com	owner,edit
markdown-36-user1@gmail.com	markdown-36	user1@gmail.com	owner,edit
markdown-37-user1@gmail.com	markdown-37	user1@gmail.com	owner,edit
markdown-38-user1@gmail.com	markdown-38	user1@gmail.com	owner,edit
markdown-39-user1@gmail.com	markdown-39	user1@gmail.com	owner,edit
markdown-40-user1@gmail.com	markdown-40	user1@gmail.com	owner,edit
markdown-41-user1@gmail.com	markdown-41	user1@gmail.com	owner,edit
markdown-42-user1@gmail.com	markdown-42	user1@gmail.com	owner,edit
\.


COPY blips (id_version, id, hash, name, version, lastupdate) FROM stdin;
markdown-24-1	markdown-24	25751d3b75305abc911881c8719f5c0f582380561cfd2c41e1accd278af858b2	Bold (with *)	1	+044307-01-01 00:00:00.000+00
markdown-25-1	markdown-25	8bdd79bdee5312883ce30bb9717d98a1ae14e8187039f9cff8f895c4ed79758d	Bold (with _)	1	+044217-01-01 00:00:00.000+00
markdown-26-1	markdown-26	af72d0f1de2a4fbbdcbd75be370dea8f3178a06ced89d87f2be1445aaba36593	Italic (with *)	1	2021-10-21 12:08:43.043+00
markdown-27-1	markdown-27	2091f96fe72812ce8902d6efdf537c3b2224ead493e22a61c4ee05335ef5a62c	Italic (with _)	1	+044307-01-01 00:00:00.000+00
markdown-28-1	markdown-28	fc0b0404534a85fb793404351633ceff34a607ca75388ca75c030471a68fdf49	Bold and Italic (with *)	1	+044307-01-01 00:00:00.000+00
markdown-29-1	markdown-29	44de4427dea8388fb44f1002e8ed91e442ff008322061dafb809c3b7dc9aec06	One line 2	1	2021-10-21 12:08:43.043+00
markdown-30-1	markdown-30	fcde6ebf241a3e453935d895551493003cc2294047d95b4dfbc3575c74884f14	Line-break in one paragraph	1	2021-10-21 12:08:43.043+00
markdown-31-1	markdown-31	995262bbe3ab56f3071eb0f401d3b14da948404754c0dde841b5ce91a576109f	Two paragraphs	1	2021-10-21 12:08:43.043+00
markdown-32-1	markdown-32	d5904c1a381fa8adb34695905e598b127bb0e3cb33703b5ccc8707c5c560395c	Heading 1	1	2021-10-21 12:08:43.043+00
markdown-33-1	markdown-33	3d527d1c90792bba81e36a05a1c58388ab97215432083e686694050b796d5cb1	Heading 2	1	2021-10-21 12:08:43.043+00
markdown-34-1	markdown-34	c0a3febb8712a6a879ff45d919b2d55b2fcfd7253ed7c69eb347dec475e6cb83	Heading 3	1	2021-10-21 12:08:43.043+00
markdown-35-1	markdown-35	5944160b3cc642c21e5f1c53a4b905627fd9a3da530cee7021f39114b180bd16	Heading 4	1	2021-10-21 12:08:43.043+00
markdown-36-1	markdown-36	da0a5de87880161c4d64c2a58bf6f468843834750d5cebec17fe747c7194e1aa	Heading 5	1	2021-10-21 12:08:43.043+00
markdown-37-1	markdown-37	cff6d232dff82fde0d806a59f2109f1d2ea2366b0e1036dd58af730f90d9b3c9	Bold and Italic (with _)	1	2021-10-21 12:08:43.043+00
markdown-38-1	markdown-38	14c71b4e840878f337a89754296f3f9afcff2bc69722d252034888c9f445d9c5	Heading and Paragraph	1	2021-10-21 12:08:43.043+00
markdown-39-1	markdown-39	f2bb6b3426d257342edc40e1ef68af5e672b1d52e450d86e3c3e878a1251fec3	Ordered list	1	2021-10-21 12:08:43.043+00
markdown-40-1	markdown-40	eb70168864024ae4e6a0f7cc506a661b963a1f22b188feb5080c9b00528a551a	Unordered list	1	2021-10-21 12:08:43.043+00
markdown-41-1	markdown-41	9e7e97fdbc9cbdaf2810cf9e7dc19e6caec76c5d9233537718c8d90afc774dac	Example 1	1	2021-10-21 12:08:43.043+00
markdown-42-1	markdown-42	1fbabb6fb96718a05fcb112eee4434466103969832aa5efc8c77d8cf1e4bd4e1	Raw HTML	1	2021-10-21 12:08:43.043+00
\.


COPY column_links (id, blip, name, value) FROM stdin;
markdown-24-1-Sample text	markdown-24-1	Sample text	I just love **bold text**.
markdown-24-1-Markdown	markdown-24-1	Markdown	`I just love **bold text**.`
markdown-24-1-Raw HTML	markdown-24-1	Raw HTML	test
markdown-24-1-col1	markdown-24-1	col1	col1
markdown-24-1-col2	markdown-24-1	col2	col2
markdown-24-1-col3	markdown-24-1	col3	col3
markdown-25-1-Sample text	markdown-25-1	Sample text	I just love __bold text__.
markdown-25-1-Markdown	markdown-25-1	Markdown	`I just love __bold text__.`
markdown-25-1-Raw HTML	markdown-25-1	Raw HTML	
markdown-25-1-col1	markdown-25-1	col1	
markdown-25-1-col2	markdown-25-1	col2	
markdown-25-1-col3	markdown-25-1	col3	
markdown-26-1-Sample text	markdown-26-1	Sample text	This is an *italic* text
markdown-26-1-Markdown	markdown-26-1	Markdown	`This is an *italic* text`
markdown-26-1-Raw HTML	markdown-26-1	Raw HTML	
markdown-26-1-col1	markdown-26-1	col1	
markdown-26-1-col2	markdown-26-1	col2	
markdown-26-1-col3	markdown-26-1	col3	
markdown-27-1-Sample text	markdown-27-1	Sample text	This is an _italic_ text too
markdown-27-1-Markdown	markdown-27-1	Markdown	`This is an _italic_ text too`
markdown-27-1-Raw HTML	markdown-27-1	Raw HTML	
markdown-27-1-col1	markdown-27-1	col1	
markdown-27-1-col2	markdown-27-1	col2	
markdown-27-1-col3	markdown-27-1	col3	
markdown-28-1-Sample text	markdown-28-1	Sample text	This text is ***really important***.
markdown-28-1-Markdown	markdown-28-1	Markdown	`This text is ***really important***.`
markdown-28-1-Raw HTML	markdown-28-1	Raw HTML	
markdown-28-1-col1	markdown-28-1	col1	
markdown-28-1-col2	markdown-28-1	col2	
markdown-28-1-col3	markdown-28-1	col3	
markdown-29-1-Sample text	markdown-29-1	Sample text	This is a         one-line text.
markdown-29-1-Markdown	markdown-29-1	Markdown	`This is a one-line text.`
markdown-29-1-Raw HTML	markdown-29-1	Raw HTML	
markdown-29-1-col1	markdown-29-1	col1	
markdown-29-1-col2	markdown-29-1	col2	
markdown-29-1-col3	markdown-29-1	col3	
markdown-30-1-Sample text	markdown-30-1	Sample text	This is a first line.\nThis is a second line.
markdown-30-1-Markdown	markdown-30-1	Markdown	`This is a first line.`\n`This is a second line.`
markdown-30-1-Raw HTML	markdown-30-1	Raw HTML	
markdown-30-1-col1	markdown-30-1	col1	
markdown-30-1-col2	markdown-30-1	col2	
markdown-30-1-col3	markdown-30-1	col3	
markdown-31-1-Sample text	markdown-31-1	Sample text	This is a first paragraph.\n\nThis is a second paragraph.
markdown-31-1-Markdown	markdown-31-1	Markdown	`This is a first paragraph.`\n\n`This is a second paragraph.`
markdown-31-1-Raw HTML	markdown-31-1	Raw HTML	
markdown-31-1-col1	markdown-31-1	col1	
markdown-31-1-col2	markdown-31-1	col2	
markdown-31-1-col3	markdown-31-1	col3	
markdown-32-1-Sample text	markdown-32-1	Sample text	# Title
markdown-32-1-Markdown	markdown-32-1	Markdown	`# Title`
markdown-32-1-Raw HTML	markdown-32-1	Raw HTML	
markdown-32-1-col1	markdown-32-1	col1	
markdown-32-1-col2	markdown-32-1	col2	
markdown-32-1-col3	markdown-32-1	col3	
markdown-33-1-Sample text	markdown-33-1	Sample text	## Title
markdown-33-1-Markdown	markdown-33-1	Markdown	`## Title`
markdown-33-1-Raw HTML	markdown-33-1	Raw HTML	
markdown-33-1-col1	markdown-33-1	col1	
markdown-33-1-col2	markdown-33-1	col2	
markdown-33-1-col3	markdown-33-1	col3	
markdown-34-1-Sample text	markdown-34-1	Sample text	### Title
markdown-34-1-Markdown	markdown-34-1	Markdown	`### Title`
markdown-34-1-Raw HTML	markdown-34-1	Raw HTML	
markdown-34-1-col1	markdown-34-1	col1	
markdown-34-1-col2	markdown-34-1	col2	
markdown-34-1-col3	markdown-34-1	col3	
markdown-35-1-Sample text	markdown-35-1	Sample text	##### Title
markdown-35-1-Markdown	markdown-35-1	Markdown	`##### Title`
markdown-35-1-Raw HTML	markdown-35-1	Raw HTML	
markdown-35-1-col1	markdown-35-1	col1	
markdown-35-1-col2	markdown-35-1	col2	
markdown-35-1-col3	markdown-35-1	col3	
markdown-36-1-Sample text	markdown-36-1	Sample text	###### Title
markdown-36-1-Markdown	markdown-36-1	Markdown	`###### Title`
markdown-36-1-Raw HTML	markdown-36-1	Raw HTML	
markdown-36-1-col1	markdown-36-1	col1	
markdown-36-1-col2	markdown-36-1	col2	
markdown-36-1-col3	markdown-36-1	col3	
markdown-37-1-Sample text	markdown-37-1	Sample text	This text is ___really important___.
markdown-37-1-Markdown	markdown-37-1	Markdown	`This text is ___really important___.`
markdown-37-1-Raw HTML	markdown-37-1	Raw HTML	
markdown-37-1-col1	markdown-37-1	col1	
markdown-37-1-col2	markdown-37-1	col2	
markdown-37-1-col3	markdown-37-1	col3	
markdown-38-1-Sample text	markdown-38-1	Sample text	#### This is a title\nFollowed by a paragraph
markdown-38-1-Markdown	markdown-38-1	Markdown	`#### This is a title`\n`Followed by a paragraph`
markdown-38-1-Raw HTML	markdown-38-1	Raw HTML	
markdown-38-1-col1	markdown-38-1	col1	
markdown-38-1-col2	markdown-38-1	col2	
markdown-38-1-col3	markdown-38-1	col3	
markdown-39-1-Sample text	markdown-39-1	Sample text	1. First item\n3. Second item\n2. Third item\n4. Fourth item
markdown-39-1-Markdown	markdown-39-1	Markdown	`1. First item`\n`2. Second item`\n`3. Third item`\n`4. Fourth item`
markdown-39-1-Raw HTML	markdown-39-1	Raw HTML	
markdown-39-1-col1	markdown-39-1	col1	
markdown-39-1-col2	markdown-39-1	col2	
markdown-39-1-col3	markdown-39-1	col3	
markdown-36-6-col1	markdown-36-6	col1	
markdown-40-1-Sample text	markdown-40-1	Sample text	- First item\n- Second item\n  - Nested item 1\n  - Nested item 2\n- Third item\n- Fourth item
markdown-40-1-Markdown	markdown-40-1	Markdown	`- First item`\n`- Second item`\n`  - Nested item 1`\n`  - Nested item 2`\n`- Third item`\n`- Fourth item`
markdown-40-1-Raw HTML	markdown-40-1	Raw HTML	
markdown-40-1-col1	markdown-40-1	col1	
markdown-40-1-col2	markdown-40-1	col2	
markdown-40-1-col3	markdown-40-1	col3	
markdown-41-1-Sample text	markdown-41-1	Sample text	# Marked - Markdown Parser\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n## How To Use The Demo\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
markdown-41-1-Markdown	markdown-41-1	Markdown	`# Marked - Markdown Parser`\n\n`[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.`\n\n`## How To Use The Demo`\n\n`1. Type in stuff on the left.`\n`2. See the live updates on the right.`\n\n`That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:`\n\n`- **Preview:**  A live display of the generated HTML as it would render in a browser.`\n`- **HTML Source:**  The generated HTML before your browser makes it pretty.`\n`- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.`\n`- **Quick Reference:**  A brief run-down of how to format things using markdown.`\n\n`Why Markdown?`\n`-------------`\n\n`It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,`\n\n`> The overriding design goal for Markdown's`\n`> formatting syntax is to make it as readable`\n`> as possible. The idea is that a`\n`> Markdown-formatted document should be`\n`> publishable as-is, as plain text, without`\n`> looking like it's been marked up with tags`\n`> or formatting instructions.`\n\n`Ready to start writing?  Either start changing stuff on the left or`\n`[clear everything](/demo/?text=) with a simple click.`\n\n`[Marked]: https://github.com/markedjs/marked/`\n`[Markdown]: http://daringfireball.net/projects/markdown/`
markdown-41-1-Raw HTML	markdown-41-1	Raw HTML	
markdown-41-1-col1	markdown-41-1	col1	
markdown-41-1-col2	markdown-41-1	col2	
markdown-41-1-col3	markdown-41-1	col3	
markdown-42-1-Sample text	markdown-42-1	Sample text	
markdown-42-1-Markdown	markdown-42-1	Markdown	
markdown-42-1-Raw HTML	markdown-42-1	Raw HTML	<h5>Description</h5><p>Application topologies as a Service as described in 'App Boxes' entry but based on a Docker Enterprise stack.</p><h5>Why do we care?</h5><p>Available on-premise and delivered by the Cloud Platform but not available on the external Cloud Innovation Platform</p><h5>Action plan</h5><p>Will be studied if requested by users</p>
markdown-42-1-col1	markdown-42-1	col1	
markdown-42-1-col2	markdown-42-1	col2	
markdown-42-1-col3	markdown-42-1	col3	
markdown-36-6-col2	markdown-36-6	col2	
markdown-36-6-col3	markdown-36-6	col3	
markdown-40-6-col1	markdown-40-6	col1	
markdown-40-6-col2	markdown-40-6	col2	
markdown-40-6-col3	markdown-40-6	col3	
markdown-40-4-col2	markdown-40-4	col2	
markdown-40-4-col3	markdown-40-4	col3	
markdown-35-5-col2	markdown-35-5	col2	
markdown-35-5-col3	markdown-35-5	col3	
markdown-24-11-Raw HTML	markdown-24-11	Raw HTML	test2
markdown-36-7-Sample text	markdown-36-7	Sample text	###### Title
markdown-24-9-Raw HTML	markdown-24-9	Raw HTML	test2
markdown-36-7-Markdown	markdown-36-7	Markdown	`###### Title`
markdown-24-7-Sample text	markdown-24-7	Sample text	I just love **bold text**.
markdown-24-2-Sample text	markdown-24-2	Sample text	I just love **bold text**.
markdown-24-2-Markdown	markdown-24-2	Markdown	`I just love **bold text**.`
markdown-24-2-Raw HTML	markdown-24-2	Raw HTML	test
markdown-25-2-Sample text	markdown-25-2	Sample text	I just love __bold text__.
markdown-25-2-Markdown	markdown-25-2	Markdown	`I just love __bold text__.`
markdown-26-2-Sample text	markdown-26-2	Sample text	This is an *italic* text
markdown-26-2-Markdown	markdown-26-2	Markdown	`This is an *italic* text`
markdown-27-2-Sample text	markdown-27-2	Sample text	This is an _italic_ text too
markdown-27-2-Markdown	markdown-27-2	Markdown	`This is an _italic_ text too`
markdown-28-2-Sample text	markdown-28-2	Sample text	This text is ***really important***.
markdown-28-2-Markdown	markdown-28-2	Markdown	`This text is ***really important***.`
markdown-29-2-Sample text	markdown-29-2	Sample text	This is a         one-line text.
markdown-29-2-Markdown	markdown-29-2	Markdown	`This is a one-line text.`
markdown-30-2-Sample text	markdown-30-2	Sample text	This is a first line.\nThis is a second line.
markdown-30-2-Markdown	markdown-30-2	Markdown	`This is a first line.`\n`This is a second line.`
markdown-31-2-Sample text	markdown-31-2	Sample text	This is a first paragraph.\n\nThis is a second paragraph.
markdown-31-2-Markdown	markdown-31-2	Markdown	`This is a first paragraph.`\n\n`This is a second paragraph.`
markdown-32-2-Sample text	markdown-32-2	Sample text	# Title
markdown-32-2-Markdown	markdown-32-2	Markdown	`# Title`
markdown-33-2-Sample text	markdown-33-2	Sample text	## Title
markdown-33-2-Markdown	markdown-33-2	Markdown	`## Title`
markdown-34-2-Sample text	markdown-34-2	Sample text	### Title
markdown-34-2-Markdown	markdown-34-2	Markdown	`### Title`
markdown-35-2-Sample text	markdown-35-2	Sample text	##### Title
markdown-35-2-Markdown	markdown-35-2	Markdown	`##### Title`
markdown-36-2-Sample text	markdown-36-2	Sample text	###### Title
markdown-36-2-Markdown	markdown-36-2	Markdown	`###### Title`
markdown-37-2-Sample text	markdown-37-2	Sample text	This text is ___really important___.
markdown-37-2-Markdown	markdown-37-2	Markdown	`This text is ___really important___.`
markdown-38-2-Sample text	markdown-38-2	Sample text	#### This is a title\nFollowed by a paragraph
markdown-38-2-Markdown	markdown-38-2	Markdown	`#### This is a title`\n`Followed by a paragraph`
markdown-39-2-Sample text	markdown-39-2	Sample text	1. First item\n3. Second item\n2. Third item\n4. Fourth item
markdown-39-2-Markdown	markdown-39-2	Markdown	`1. First item`\n`2. Second item`\n`3. Third item`\n`4. Fourth item`
markdown-40-2-Sample text	markdown-40-2	Sample text	- First item\n- Second item\n  - Nested item 1\n  - Nested item 2\n- Third item\n- Fourth item
markdown-40-2-Markdown	markdown-40-2	Markdown	`- First item`\n`- Second item`\n`  - Nested item 1`\n`  - Nested item 2`\n`- Third item`\n`- Fourth item`
markdown-24-9-lastupdate	markdown-24-9	lastupdate	2021-10-24
markdown-24-10-Raw HTML	markdown-24-10	Raw HTML	test2
markdown-24-10-Sample text	markdown-24-10	Sample text	I just love **bold text**.
markdown-24-10-Markdown	markdown-24-10	Markdown	`I just love **bold text**.`
markdown-24-10-Test Patrice	markdown-24-10	Test Patrice	Hello World
markdown-24-10-lastupdate	markdown-24-10	lastupdate	2021-10-24
markdown-41-2-Sample text	markdown-41-2	Sample text	# Marked - Markdown Parser\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n## How To Use The Demo\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
markdown-41-2-Markdown	markdown-41-2	Markdown	`# Marked - Markdown Parser`\n\n`[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.`\n\n`## How To Use The Demo`\n\n`1. Type in stuff on the left.`\n`2. See the live updates on the right.`\n\n`That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:`\n\n`- **Preview:**  A live display of the generated HTML as it would render in a browser.`\n`- **HTML Source:**  The generated HTML before your browser makes it pretty.`\n`- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.`\n`- **Quick Reference:**  A brief run-down of how to format things using markdown.`\n\n`Why Markdown?`\n`-------------`\n\n`It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,`\n\n`> The overriding design goal for Markdown's`\n`> formatting syntax is to make it as readable`\n`> as possible. The idea is that a`\n`> Markdown-formatted document should be`\n`> publishable as-is, as plain text, without`\n`> looking like it's been marked up with tags`\n`> or formatting instructions.`\n\n`Ready to start writing?  Either start changing stuff on the left or`\n`[clear everything](/demo/?text=) with a simple click.`\n\n`[Marked]: https://github.com/markedjs/marked/`\n`[Markdown]: http://daringfireball.net/projects/markdown/`
markdown-42-2-Raw HTML	markdown-42-2	Raw HTML	<h5>Description</h5><p>Application topologies as a Service as described in 'App Boxes' entry but based on a Docker Enterprise stack.</p><h5>Why do we care?</h5><p>Available on-premise and delivered by the Cloud Platform but not available on the external Cloud Innovation Platform</p><h5>Action plan</h5><p>Will be studied if requested by users</p>
markdown-24-3-Sample text	markdown-24-3	Sample text	I just love **bold text**.
markdown-24-3-Markdown	markdown-24-3	Markdown	`I just love **bold text**.`
markdown-24-3-Raw HTML	markdown-24-3	Raw HTML	test1
markdown-42-3-Raw HTML	markdown-42-3	Raw HTML	<h5>Description</h5><p>Application topologies as a Service as described in 'App Boxes' entry but based on a Docker Enterprise stack.</p><h5>Why do we care?</h5><p>Available on-premise and delivered by the Cloud Platform but not available on the external Cloud Innovation Platform</p><h5>Action plan</h5><p>Will be studied if requested by users</p>
markdown-42-3-lastupdate	markdown-42-3	lastupdate	2021-10-21 00:00:00.000+00
markdown-36-3-Sample text	markdown-36-3	Sample text	###### Title
markdown-36-3-Markdown	markdown-36-3	Markdown	`###### Title`
markdown-36-3-lastupdate	markdown-36-3	lastupdate	2021-10-21 00:00:00.000+00
markdown-36-4-Sample text	markdown-36-4	Sample text	###### Title---
markdown-36-4-Markdown	markdown-36-4	Markdown	`###### Title`
markdown-36-4-lastupdate	markdown-36-4	lastupdate	2021-10-21 00:00:00.000+00
markdown-24-4-Sample text	markdown-24-4	Sample text	I just love **bold text**.
markdown-24-4-Markdown	markdown-24-4	Markdown	`I just love **bold text**.`
markdown-24-4-Raw HTML	markdown-24-4	Raw HTML	test1
markdown-24-4-lastupdate	markdown-24-4	lastupdate	+044307-01-01 00:00:00.000+00
markdown-24-5-Sample text	markdown-24-5	Sample text	I just love **bold text**.
markdown-24-5-Markdown	markdown-24-5	Markdown	`I just love **bold text**.`
markdown-24-5-Raw HTML	markdown-24-5	Raw HTML	test1
markdown-24-5-lastupdate	markdown-24-5	lastupdate	+044307-01-01 00:00:00.000+00
markdown-24-6-Sample text	markdown-24-6	Sample text	I just love **bold text**.
markdown-24-6-Markdown	markdown-24-6	Markdown	`I just love **bold text**.`
markdown-24-6-Raw HTML	markdown-24-6	Raw HTML	test2
markdown-24-6-lastupdate	markdown-24-6	lastupdate	+044307-01-01 00:00:00.000+00
markdown-24-7-Markdown	markdown-24-7	Markdown	`I just love **bold text**.`
markdown-24-7-Raw HTML	markdown-24-7	Raw HTML	test2
markdown-24-7-New column	markdown-24-7	New column	New value
markdown-24-7-lastupdate	markdown-24-7	lastupdate	+044307-01-01 00:00:00.000+00
markdown-24-8-Sample text	markdown-24-8	Sample text	I just love **bold text**.
markdown-24-8-Markdown	markdown-24-8	Markdown	`I just love **bold text**.`
markdown-24-8-Raw HTML	markdown-24-8	Raw HTML	test2
markdown-24-8-lastupdate	markdown-24-8	lastupdate	+044307-01-01 00:00:00.000+00
markdown-24-9-Sample text	markdown-24-9	Sample text	I just love **bold text**.
markdown-24-9-Markdown	markdown-24-9	Markdown	`I just love **bold text**.`
markdown-24-11-Sample text	markdown-24-11	Sample text	I just love **bold text**.
markdown-24-11-Markdown	markdown-24-11	Markdown	`I just love **bold text**.`
markdown-24-11-lastupdate	markdown-24-11	lastupdate	2021-10-24
markdown-24-12-Raw HTML	markdown-24-12	Raw HTML	test2
markdown-24-12-Sample text	markdown-24-12	Sample text	I just love **bold text**.
markdown-24-12-Markdown	markdown-24-12	Markdown	`I just love **bold text**.`
markdown-24-12-lastupdate	markdown-24-12	lastupdate	2021-10-24
markdown-24-13-Raw HTML	markdown-24-13	Raw HTML	test2
markdown-24-13-Sample text	markdown-24-13	Sample text	I just love **bold text**.
markdown-24-13-Markdown	markdown-24-13	Markdown	`I just love **bold text**.`
markdown-24-13-lastupdate	markdown-24-13	lastupdate	2021-10-24
markdown-25-3-Sample text	markdown-25-3	Sample text	I just love __bold text__.
markdown-25-3-Markdown	markdown-25-3	Markdown	`I just love __bold text__.`
markdown-25-3-lastupdate	markdown-25-3	lastupdate	2021-01-23
markdown-27-3-Sample text	markdown-27-3	Sample text	This is an _italic_ text too
markdown-27-3-Markdown	markdown-27-3	Markdown	`This is an _italic_ text too`
markdown-27-3-lastupdate	markdown-27-3	lastupdate	2021-04-23
markdown-28-3-Sample text	markdown-28-3	Sample text	This text is ***really important***.
markdown-28-3-Markdown	markdown-28-3	Markdown	`This text is ***really important***.`
markdown-28-3-lastupdate	markdown-28-3	lastupdate	2021-04-23
markdown-24-14-Raw HTML	markdown-24-14	Raw HTML	test3
markdown-24-14-Sample text	markdown-24-14	Sample text	I just love **bold text**.
markdown-24-14-Markdown	markdown-24-14	Markdown	`I just love **bold text**.`
markdown-24-14-lastupdate	markdown-24-14	lastupdate	2021-10-24
markdown-36-7-Raw HTML	markdown-36-7	Raw HTML	
markdown-36-7-col1	markdown-36-7	col1	
markdown-36-7-col2	markdown-36-7	col2	
markdown-36-7-col3	markdown-36-7	col3	
markdown-32-6-Sample text	markdown-32-6	Sample text	# Title
markdown-32-6-Markdown	markdown-32-6	Markdown	`# Title`
markdown-39-3-Sample text	markdown-39-3	Sample text	1. First item\n3. Second item\n2. Third item\n4. Fourth item
markdown-39-3-Markdown	markdown-39-3	Markdown	`1. First item`\n`2. Second item`\n`3. Third item`\n`4. Fourth item`
markdown-39-3-test	markdown-39-3	test	
markdown-39-3-lastupdate	markdown-39-3	lastupdate	2021-10-21 00:00:00.000+00
markdown-24-15-Raw HTML	markdown-24-15	Raw HTML	test3
markdown-24-15-Sample text	markdown-24-15	Sample text	I just love **bold text**.
markdown-24-15-Markdown	markdown-24-15	Markdown	`I just love **bold text**.`
markdown-24-15-test	markdown-24-15	test	
markdown-24-15-lastupdate	markdown-24-15	lastupdate	2021-10-24
markdown-24-16-Sample text	markdown-24-16	Sample text	I just love **bold text**.
markdown-24-16-Markdown	markdown-24-16	Markdown	`I just love **bold text**.`
markdown-24-16-Raw HTML	markdown-24-16	Raw HTML	test
markdown-24-16-col1	markdown-24-16	col1	col1
markdown-24-16-col2	markdown-24-16	col2	col2
markdown-24-16-col3	markdown-24-16	col3	col3
markdown-25-4-Sample text	markdown-25-4	Sample text	I just love __bold text__.
markdown-25-4-Markdown	markdown-25-4	Markdown	`I just love __bold text__.`
markdown-25-4-Raw HTML	markdown-25-4	Raw HTML	
markdown-25-4-col1	markdown-25-4	col1	
markdown-25-4-col2	markdown-25-4	col2	
markdown-25-4-col3	markdown-25-4	col3	
markdown-26-3-Sample text	markdown-26-3	Sample text	This is an *italic* text
markdown-26-3-Markdown	markdown-26-3	Markdown	`This is an *italic* text`
markdown-26-3-Raw HTML	markdown-26-3	Raw HTML	
markdown-26-3-col1	markdown-26-3	col1	
markdown-26-3-col2	markdown-26-3	col2	
markdown-26-3-col3	markdown-26-3	col3	
markdown-27-4-Sample text	markdown-27-4	Sample text	This is an _italic_ text too
markdown-27-4-Markdown	markdown-27-4	Markdown	`This is an _italic_ text too`
markdown-27-4-Raw HTML	markdown-27-4	Raw HTML	
markdown-27-4-col1	markdown-27-4	col1	
markdown-27-4-col2	markdown-27-4	col2	
markdown-27-4-col3	markdown-27-4	col3	
markdown-28-4-Sample text	markdown-28-4	Sample text	This text is ***really important***.
markdown-28-4-Markdown	markdown-28-4	Markdown	`This text is ***really important***.`
markdown-28-4-Raw HTML	markdown-28-4	Raw HTML	
markdown-28-4-col1	markdown-28-4	col1	
markdown-28-4-col2	markdown-28-4	col2	
markdown-28-4-col3	markdown-28-4	col3	
markdown-29-3-Sample text	markdown-29-3	Sample text	This is a         one-line text.
markdown-29-3-Markdown	markdown-29-3	Markdown	`This is a one-line text.`
markdown-29-3-Raw HTML	markdown-29-3	Raw HTML	
markdown-29-3-col1	markdown-29-3	col1	
markdown-29-3-col2	markdown-29-3	col2	
markdown-29-3-col3	markdown-29-3	col3	
markdown-30-3-Sample text	markdown-30-3	Sample text	This is a first line.\nThis is a second line.
markdown-30-3-Markdown	markdown-30-3	Markdown	`This is a first line.`\n`This is a second line.`
markdown-30-3-Raw HTML	markdown-30-3	Raw HTML	
markdown-30-3-col1	markdown-30-3	col1	
markdown-30-3-col2	markdown-30-3	col2	
markdown-30-3-col3	markdown-30-3	col3	
markdown-31-3-Sample text	markdown-31-3	Sample text	This is a first paragraph.\n\nThis is a second paragraph.
markdown-31-3-Markdown	markdown-31-3	Markdown	`This is a first paragraph.`\n\n`This is a second paragraph.`
markdown-31-3-Raw HTML	markdown-31-3	Raw HTML	
markdown-31-3-col1	markdown-31-3	col1	
markdown-31-3-col2	markdown-31-3	col2	
markdown-31-3-col3	markdown-31-3	col3	
markdown-32-3-Sample text	markdown-32-3	Sample text	# Title
markdown-32-3-Markdown	markdown-32-3	Markdown	`# Title`
markdown-32-3-Raw HTML	markdown-32-3	Raw HTML	
markdown-32-3-col1	markdown-32-3	col1	
markdown-32-3-col2	markdown-32-3	col2	
markdown-32-3-col3	markdown-32-3	col3	
markdown-33-3-Sample text	markdown-33-3	Sample text	## Title
markdown-33-3-Markdown	markdown-33-3	Markdown	`## Title`
markdown-33-3-Raw HTML	markdown-33-3	Raw HTML	
markdown-33-3-col1	markdown-33-3	col1	
markdown-33-3-col2	markdown-33-3	col2	
markdown-33-3-col3	markdown-33-3	col3	
markdown-34-3-Sample text	markdown-34-3	Sample text	### Title
markdown-34-3-Markdown	markdown-34-3	Markdown	`### Title`
markdown-34-3-Raw HTML	markdown-34-3	Raw HTML	
markdown-34-3-col1	markdown-34-3	col1	
markdown-34-3-col2	markdown-34-3	col2	
markdown-34-3-col3	markdown-34-3	col3	
markdown-35-3-Sample text	markdown-35-3	Sample text	##### Title
markdown-35-3-Markdown	markdown-35-3	Markdown	`##### Title`
markdown-35-3-Raw HTML	markdown-35-3	Raw HTML	
markdown-35-3-col1	markdown-35-3	col1	
markdown-35-3-col2	markdown-35-3	col2	
markdown-35-3-col3	markdown-35-3	col3	
markdown-36-5-Sample text	markdown-36-5	Sample text	###### Title
markdown-36-5-Markdown	markdown-36-5	Markdown	`###### Title`
markdown-36-5-Raw HTML	markdown-36-5	Raw HTML	
markdown-36-5-col1	markdown-36-5	col1	
markdown-36-5-col2	markdown-36-5	col2	
markdown-36-5-col3	markdown-36-5	col3	
markdown-37-3-Sample text	markdown-37-3	Sample text	This text is ___really important___.
markdown-37-3-Markdown	markdown-37-3	Markdown	`This text is ___really important___.`
markdown-37-3-Raw HTML	markdown-37-3	Raw HTML	
markdown-37-3-col1	markdown-37-3	col1	
markdown-37-3-col2	markdown-37-3	col2	
markdown-37-3-col3	markdown-37-3	col3	
markdown-38-3-Sample text	markdown-38-3	Sample text	#### This is a title\nFollowed by a paragraph
markdown-38-3-Markdown	markdown-38-3	Markdown	`#### This is a title`\n`Followed by a paragraph`
markdown-38-3-Raw HTML	markdown-38-3	Raw HTML	
markdown-38-3-col1	markdown-38-3	col1	
markdown-38-3-col2	markdown-38-3	col2	
markdown-38-3-col3	markdown-38-3	col3	
markdown-39-4-Sample text	markdown-39-4	Sample text	1. First item\n3. Second item\n2. Third item\n4. Fourth item
markdown-39-4-Markdown	markdown-39-4	Markdown	`1. First item`\n`2. Second item`\n`3. Third item`\n`4. Fourth item`
markdown-39-4-Raw HTML	markdown-39-4	Raw HTML	
markdown-39-4-col1	markdown-39-4	col1	
markdown-39-4-col2	markdown-39-4	col2	
markdown-39-4-col3	markdown-39-4	col3	
markdown-40-3-Sample text	markdown-40-3	Sample text	- First item\n- Second item\n  - Nested item 1\n  - Nested item 2\n- Third item\n- Fourth item
markdown-40-3-Markdown	markdown-40-3	Markdown	`- First item`\n`- Second item`\n`  - Nested item 1`\n`  - Nested item 2`\n`- Third item`\n`- Fourth item`
markdown-40-3-Raw HTML	markdown-40-3	Raw HTML	
markdown-40-3-col1	markdown-40-3	col1	
markdown-40-3-col2	markdown-40-3	col2	
markdown-40-3-col3	markdown-40-3	col3	
markdown-41-3-Sample text	markdown-41-3	Sample text	# Marked - Markdown Parser\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n## How To Use The Demo\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
markdown-41-3-Markdown	markdown-41-3	Markdown	`# Marked - Markdown Parser`\n\n`[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.`\n\n`## How To Use The Demo`\n\n`1. Type in stuff on the left.`\n`2. See the live updates on the right.`\n\n`That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:`\n\n`- **Preview:**  A live display of the generated HTML as it would render in a browser.`\n`- **HTML Source:**  The generated HTML before your browser makes it pretty.`\n`- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.`\n`- **Quick Reference:**  A brief run-down of how to format things using markdown.`\n\n`Why Markdown?`\n`-------------`\n\n`It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,`\n\n`> The overriding design goal for Markdown's`\n`> formatting syntax is to make it as readable`\n`> as possible. The idea is that a`\n`> Markdown-formatted document should be`\n`> publishable as-is, as plain text, without`\n`> looking like it's been marked up with tags`\n`> or formatting instructions.`\n\n`Ready to start writing?  Either start changing stuff on the left or`\n`[clear everything](/demo/?text=) with a simple click.`\n\n`[Marked]: https://github.com/markedjs/marked/`\n`[Markdown]: http://daringfireball.net/projects/markdown/`
markdown-41-3-Raw HTML	markdown-41-3	Raw HTML	
markdown-41-3-col1	markdown-41-3	col1	
markdown-41-3-col2	markdown-41-3	col2	
markdown-41-3-col3	markdown-41-3	col3	
markdown-42-4-Sample text	markdown-42-4	Sample text	
markdown-42-4-Markdown	markdown-42-4	Markdown	
markdown-42-4-Raw HTML	markdown-42-4	Raw HTML	<h5>Description</h5><p>Application topologies as a Service as described in 'App Boxes' entry but based on a Docker Enterprise stack.</p><h5>Why do we care?</h5><p>Available on-premise and delivered by the Cloud Platform but not available on the external Cloud Innovation Platform</p><h5>Action plan</h5><p>Will be studied if requested by users</p>
markdown-42-4-col1	markdown-42-4	col1	
markdown-42-4-col2	markdown-42-4	col2	
markdown-42-4-col3	markdown-42-4	col3	
markdown-32-6-Raw HTML	markdown-32-6	Raw HTML	
markdown-32-6-col1	markdown-32-6	col1	
markdown-32-6-col2	markdown-32-6	col2	
markdown-32-6-col3	markdown-32-6	col3	
markdown-33-6-Sample text	markdown-33-6	Sample text	## Title
markdown-40-4-col1	markdown-40-4	col1	
markdown-26-4-Sample text	markdown-26-4	Sample text	This is an *italic* text
markdown-26-4-Markdown	markdown-26-4	Markdown	`This is an *italic* text`
markdown-26-4-Raw HTML	markdown-26-4	Raw HTML	
markdown-26-4-col1	markdown-26-4	col1	
markdown-26-4-col2	markdown-26-4	col2	
markdown-26-4-col3	markdown-26-4	col3	
markdown-29-4-Sample text	markdown-29-4	Sample text	This is a         one-line text.
markdown-29-4-Markdown	markdown-29-4	Markdown	`This is a one-line text.`
markdown-29-4-Raw HTML	markdown-29-4	Raw HTML	
markdown-29-4-col1	markdown-29-4	col1	
markdown-29-4-col2	markdown-29-4	col2	
markdown-29-4-col3	markdown-29-4	col3	
markdown-30-4-Sample text	markdown-30-4	Sample text	This is a first line.\nThis is a second line.
markdown-30-4-Markdown	markdown-30-4	Markdown	`This is a first line.`\n`This is a second line.`
markdown-30-4-Raw HTML	markdown-30-4	Raw HTML	
markdown-30-4-col1	markdown-30-4	col1	
markdown-30-4-col2	markdown-30-4	col2	
markdown-30-4-col3	markdown-30-4	col3	
markdown-31-4-Sample text	markdown-31-4	Sample text	This is a first paragraph.\n\nThis is a second paragraph.
markdown-31-4-Markdown	markdown-31-4	Markdown	`This is a first paragraph.`\n\n`This is a second paragraph.`
markdown-31-4-Raw HTML	markdown-31-4	Raw HTML	
markdown-31-4-col1	markdown-31-4	col1	
markdown-31-4-col2	markdown-31-4	col2	
markdown-31-4-col3	markdown-31-4	col3	
markdown-32-4-Sample text	markdown-32-4	Sample text	# Title
markdown-32-4-Markdown	markdown-32-4	Markdown	`# Title`
markdown-32-4-Raw HTML	markdown-32-4	Raw HTML	
markdown-32-4-col1	markdown-32-4	col1	
markdown-32-4-col2	markdown-32-4	col2	
markdown-32-4-col3	markdown-32-4	col3	
markdown-33-4-Sample text	markdown-33-4	Sample text	## Title
markdown-33-4-Markdown	markdown-33-4	Markdown	`## Title`
markdown-33-4-Raw HTML	markdown-33-4	Raw HTML	
markdown-33-4-col1	markdown-33-4	col1	
markdown-33-4-col2	markdown-33-4	col2	
markdown-33-4-col3	markdown-33-4	col3	
markdown-34-4-Sample text	markdown-34-4	Sample text	### Title
markdown-34-4-Markdown	markdown-34-4	Markdown	`### Title`
markdown-34-4-Raw HTML	markdown-34-4	Raw HTML	
markdown-34-4-col1	markdown-34-4	col1	
markdown-34-4-col2	markdown-34-4	col2	
markdown-34-4-col3	markdown-34-4	col3	
markdown-35-4-Sample text	markdown-35-4	Sample text	##### Title
markdown-35-4-Markdown	markdown-35-4	Markdown	`##### Title`
markdown-35-4-Raw HTML	markdown-35-4	Raw HTML	
markdown-35-4-col1	markdown-35-4	col1	
markdown-35-4-col2	markdown-35-4	col2	
markdown-35-4-col3	markdown-35-4	col3	
markdown-36-6-Sample text	markdown-36-6	Sample text	###### Title
markdown-36-6-Markdown	markdown-36-6	Markdown	`###### Title`
markdown-36-6-Raw HTML	markdown-36-6	Raw HTML	
markdown-37-4-Sample text	markdown-37-4	Sample text	This text is ___really important___.
markdown-37-4-Markdown	markdown-37-4	Markdown	`This text is ___really important___.`
markdown-37-4-Raw HTML	markdown-37-4	Raw HTML	
markdown-37-4-col1	markdown-37-4	col1	
markdown-37-4-col2	markdown-37-4	col2	
markdown-37-4-col3	markdown-37-4	col3	
markdown-38-4-Sample text	markdown-38-4	Sample text	#### This is a title\nFollowed by a paragraph
markdown-38-4-Markdown	markdown-38-4	Markdown	`#### This is a title`\n`Followed by a paragraph`
markdown-38-4-Raw HTML	markdown-38-4	Raw HTML	
markdown-38-4-col1	markdown-38-4	col1	
markdown-38-4-col2	markdown-38-4	col2	
markdown-38-4-col3	markdown-38-4	col3	
markdown-39-5-Sample text	markdown-39-5	Sample text	1. First item\n3. Second item\n2. Third item\n4. Fourth item
markdown-39-5-Markdown	markdown-39-5	Markdown	`1. First item`\n`2. Second item`\n`3. Third item`\n`4. Fourth item`
markdown-39-5-Raw HTML	markdown-39-5	Raw HTML	
markdown-39-5-col1	markdown-39-5	col1	
markdown-39-5-col2	markdown-39-5	col2	
markdown-39-5-col3	markdown-39-5	col3	
markdown-40-4-Sample text	markdown-40-4	Sample text	- First item\n- Second item\n  - Nested item 1\n  - Nested item 2\n- Third item\n- Fourth item
markdown-40-4-Markdown	markdown-40-4	Markdown	`- First item`\n`- Second item`\n`  - Nested item 1`\n`  - Nested item 2`\n`- Third item`\n`- Fourth item`
markdown-40-4-Raw HTML	markdown-40-4	Raw HTML	
markdown-41-4-Sample text	markdown-41-4	Sample text	# Marked - Markdown Parser\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n## How To Use The Demo\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
markdown-41-4-Markdown	markdown-41-4	Markdown	`# Marked - Markdown Parser`\n\n`[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.`\n\n`## How To Use The Demo`\n\n`1. Type in stuff on the left.`\n`2. See the live updates on the right.`\n\n`That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:`\n\n`- **Preview:**  A live display of the generated HTML as it would render in a browser.`\n`- **HTML Source:**  The generated HTML before your browser makes it pretty.`\n`- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.`\n`- **Quick Reference:**  A brief run-down of how to format things using markdown.`\n\n`Why Markdown?`\n`-------------`\n\n`It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,`\n\n`> The overriding design goal for Markdown's`\n`> formatting syntax is to make it as readable`\n`> as possible. The idea is that a`\n`> Markdown-formatted document should be`\n`> publishable as-is, as plain text, without`\n`> looking like it's been marked up with tags`\n`> or formatting instructions.`\n\n`Ready to start writing?  Either start changing stuff on the left or`\n`[clear everything](/demo/?text=) with a simple click.`\n\n`[Marked]: https://github.com/markedjs/marked/`\n`[Markdown]: http://daringfireball.net/projects/markdown/`
markdown-41-4-Raw HTML	markdown-41-4	Raw HTML	
markdown-41-4-col1	markdown-41-4	col1	
markdown-41-4-col2	markdown-41-4	col2	
markdown-41-4-col3	markdown-41-4	col3	
markdown-42-5-Sample text	markdown-42-5	Sample text	
markdown-42-5-Markdown	markdown-42-5	Markdown	
markdown-42-5-Raw HTML	markdown-42-5	Raw HTML	<h5>Description</h5><p>Application topologies as a Service as described in 'App Boxes' entry but based on a Docker Enterprise stack.</p><h5>Why do we care?</h5><p>Available on-premise and delivered by the Cloud Platform but not available on the external Cloud Innovation Platform</p><h5>Action plan</h5><p>Will be studied if requested by users</p>
markdown-42-5-col1	markdown-42-5	col1	
markdown-42-5-col2	markdown-42-5	col2	
markdown-42-5-col3	markdown-42-5	col3	
markdown-26-5-Sample text	markdown-26-5	Sample text	This is an *italic* text
markdown-26-5-Markdown	markdown-26-5	Markdown	`This is an *italic* text`
markdown-26-5-Raw HTML	markdown-26-5	Raw HTML	
markdown-26-5-col1	markdown-26-5	col1	
markdown-26-5-col2	markdown-26-5	col2	
markdown-26-5-col3	markdown-26-5	col3	
markdown-29-5-Sample text	markdown-29-5	Sample text	This is a         one-line text.
markdown-29-5-Markdown	markdown-29-5	Markdown	`This is a one-line text.`
markdown-29-5-Raw HTML	markdown-29-5	Raw HTML	
markdown-29-5-col1	markdown-29-5	col1	
markdown-29-5-col2	markdown-29-5	col2	
markdown-29-5-col3	markdown-29-5	col3	
markdown-30-5-Sample text	markdown-30-5	Sample text	This is a first line.\nThis is a second line.
markdown-30-5-Markdown	markdown-30-5	Markdown	`This is a first line.`\n`This is a second line.`
markdown-30-5-Raw HTML	markdown-30-5	Raw HTML	
markdown-30-5-col1	markdown-30-5	col1	
markdown-30-5-col2	markdown-30-5	col2	
markdown-30-5-col3	markdown-30-5	col3	
markdown-31-5-Sample text	markdown-31-5	Sample text	This is a first paragraph.\n\nThis is a second paragraph.
markdown-31-5-Markdown	markdown-31-5	Markdown	`This is a first paragraph.`\n\n`This is a second paragraph.`
markdown-31-5-Raw HTML	markdown-31-5	Raw HTML	
markdown-31-5-col1	markdown-31-5	col1	
markdown-31-5-col2	markdown-31-5	col2	
markdown-31-5-col3	markdown-31-5	col3	
markdown-32-5-Sample text	markdown-32-5	Sample text	# Title
markdown-32-5-Markdown	markdown-32-5	Markdown	`# Title`
markdown-32-5-Raw HTML	markdown-32-5	Raw HTML	
markdown-32-5-col1	markdown-32-5	col1	
markdown-32-5-col2	markdown-32-5	col2	
markdown-32-5-col3	markdown-32-5	col3	
markdown-33-5-Sample text	markdown-33-5	Sample text	## Title
markdown-33-5-Markdown	markdown-33-5	Markdown	`## Title`
markdown-33-5-Raw HTML	markdown-33-5	Raw HTML	
markdown-33-5-col1	markdown-33-5	col1	
markdown-33-5-col2	markdown-33-5	col2	
markdown-33-5-col3	markdown-33-5	col3	
markdown-34-5-Sample text	markdown-34-5	Sample text	### Title
markdown-34-5-Markdown	markdown-34-5	Markdown	`### Title`
markdown-34-5-Raw HTML	markdown-34-5	Raw HTML	
markdown-34-5-col1	markdown-34-5	col1	
markdown-34-5-col2	markdown-34-5	col2	
markdown-34-5-col3	markdown-34-5	col3	
markdown-35-5-Sample text	markdown-35-5	Sample text	##### Title
markdown-35-5-Markdown	markdown-35-5	Markdown	`##### Title`
markdown-35-5-Raw HTML	markdown-35-5	Raw HTML	
markdown-35-5-col1	markdown-35-5	col1	
markdown-37-5-Sample text	markdown-37-5	Sample text	This text is ___really important___.
markdown-37-5-Markdown	markdown-37-5	Markdown	`This text is ___really important___.`
markdown-37-5-Raw HTML	markdown-37-5	Raw HTML	
markdown-37-5-col1	markdown-37-5	col1	
markdown-37-5-col2	markdown-37-5	col2	
markdown-37-5-col3	markdown-37-5	col3	
markdown-38-5-Sample text	markdown-38-5	Sample text	#### This is a title\nFollowed by a paragraph
markdown-38-5-Markdown	markdown-38-5	Markdown	`#### This is a title`\n`Followed by a paragraph`
markdown-38-5-Raw HTML	markdown-38-5	Raw HTML	
markdown-38-5-col1	markdown-38-5	col1	
markdown-38-5-col2	markdown-38-5	col2	
markdown-38-5-col3	markdown-38-5	col3	
markdown-39-6-Sample text	markdown-39-6	Sample text	1. First item\n3. Second item\n2. Third item\n4. Fourth item
markdown-39-6-Markdown	markdown-39-6	Markdown	`1. First item`\n`2. Second item`\n`3. Third item`\n`4. Fourth item`
markdown-39-6-Raw HTML	markdown-39-6	Raw HTML	
markdown-39-6-col1	markdown-39-6	col1	
markdown-39-6-col2	markdown-39-6	col2	
markdown-39-6-col3	markdown-39-6	col3	
markdown-40-5-Sample text	markdown-40-5	Sample text	- First item\n- Second item\n  - Nested item 1\n  - Nested item 2\n- Third item\n- Fourth item
markdown-40-5-Markdown	markdown-40-5	Markdown	`- First item`\n`- Second item`\n`  - Nested item 1`\n`  - Nested item 2`\n`- Third item`\n`- Fourth item`
markdown-40-5-Raw HTML	markdown-40-5	Raw HTML	
markdown-40-5-col1	markdown-40-5	col1	
markdown-40-5-col2	markdown-40-5	col2	
markdown-40-5-col3	markdown-40-5	col3	
markdown-41-5-Sample text	markdown-41-5	Sample text	# Marked - Markdown Parser\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n## How To Use The Demo\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
markdown-41-5-Markdown	markdown-41-5	Markdown	`# Marked - Markdown Parser`\n\n`[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.`\n\n`## How To Use The Demo`\n\n`1. Type in stuff on the left.`\n`2. See the live updates on the right.`\n\n`That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:`\n\n`- **Preview:**  A live display of the generated HTML as it would render in a browser.`\n`- **HTML Source:**  The generated HTML before your browser makes it pretty.`\n`- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.`\n`- **Quick Reference:**  A brief run-down of how to format things using markdown.`\n\n`Why Markdown?`\n`-------------`\n\n`It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,`\n\n`> The overriding design goal for Markdown's`\n`> formatting syntax is to make it as readable`\n`> as possible. The idea is that a`\n`> Markdown-formatted document should be`\n`> publishable as-is, as plain text, without`\n`> looking like it's been marked up with tags`\n`> or formatting instructions.`\n\n`Ready to start writing?  Either start changing stuff on the left or`\n`[clear everything](/demo/?text=) with a simple click.`\n\n`[Marked]: https://github.com/markedjs/marked/`\n`[Markdown]: http://daringfireball.net/projects/markdown/`
markdown-41-5-Raw HTML	markdown-41-5	Raw HTML	
markdown-41-5-col1	markdown-41-5	col1	
markdown-41-5-col2	markdown-41-5	col2	
markdown-41-5-col3	markdown-41-5	col3	
markdown-42-6-Sample text	markdown-42-6	Sample text	
markdown-42-6-Markdown	markdown-42-6	Markdown	
markdown-42-6-Raw HTML	markdown-42-6	Raw HTML	<h5>Description</h5><p>Application topologies as a Service as described in 'App Boxes' entry but based on a Docker Enterprise stack.</p><h5>Why do we care?</h5><p>Available on-premise and delivered by the Cloud Platform but not available on the external Cloud Innovation Platform</p><h5>Action plan</h5><p>Will be studied if requested by users</p>
markdown-42-6-col1	markdown-42-6	col1	
markdown-42-6-col2	markdown-42-6	col2	
markdown-42-6-col3	markdown-42-6	col3	
markdown-40-6-Raw HTML	markdown-40-6	Raw HTML	
markdown-26-6-Sample text	markdown-26-6	Sample text	This is an *italic* text
markdown-26-6-Markdown	markdown-26-6	Markdown	`This is an *italic* text`
markdown-26-6-Raw HTML	markdown-26-6	Raw HTML	
markdown-26-6-col1	markdown-26-6	col1	
markdown-26-6-col2	markdown-26-6	col2	
markdown-26-6-col3	markdown-26-6	col3	
markdown-29-6-Sample text	markdown-29-6	Sample text	This is a         one-line text.
markdown-29-6-Markdown	markdown-29-6	Markdown	`This is a one-line text.`
markdown-29-6-Raw HTML	markdown-29-6	Raw HTML	
markdown-29-6-col1	markdown-29-6	col1	
markdown-29-6-col2	markdown-29-6	col2	
markdown-29-6-col3	markdown-29-6	col3	
markdown-30-6-Sample text	markdown-30-6	Sample text	This is a first line.\nThis is a second line.
markdown-30-6-Markdown	markdown-30-6	Markdown	`This is a first line.`\n`This is a second line.`
markdown-30-6-Raw HTML	markdown-30-6	Raw HTML	
markdown-30-6-col1	markdown-30-6	col1	
markdown-30-6-col2	markdown-30-6	col2	
markdown-30-6-col3	markdown-30-6	col3	
markdown-31-6-Sample text	markdown-31-6	Sample text	This is a first paragraph.\n\nThis is a second paragraph.
markdown-31-6-Markdown	markdown-31-6	Markdown	`This is a first paragraph.`\n\n`This is a second paragraph.`
markdown-31-6-Raw HTML	markdown-31-6	Raw HTML	
markdown-31-6-col1	markdown-31-6	col1	
markdown-31-6-col2	markdown-31-6	col2	
markdown-31-6-col3	markdown-31-6	col3	
markdown-33-6-Markdown	markdown-33-6	Markdown	`## Title`
markdown-33-6-Raw HTML	markdown-33-6	Raw HTML	
markdown-33-6-col1	markdown-33-6	col1	
markdown-33-6-col2	markdown-33-6	col2	
markdown-33-6-col3	markdown-33-6	col3	
markdown-34-6-Sample text	markdown-34-6	Sample text	### Title
markdown-34-6-Markdown	markdown-34-6	Markdown	`### Title`
markdown-34-6-Raw HTML	markdown-34-6	Raw HTML	
markdown-34-6-col1	markdown-34-6	col1	
markdown-34-6-col2	markdown-34-6	col2	
markdown-34-6-col3	markdown-34-6	col3	
markdown-35-6-Sample text	markdown-35-6	Sample text	##### Title
markdown-35-6-Markdown	markdown-35-6	Markdown	`##### Title`
markdown-35-6-Raw HTML	markdown-35-6	Raw HTML	
markdown-35-6-col1	markdown-35-6	col1	
markdown-35-6-col2	markdown-35-6	col2	
markdown-35-6-col3	markdown-35-6	col3	
markdown-36-8-Sample text	markdown-36-8	Sample text	###### Title
markdown-36-8-Markdown	markdown-36-8	Markdown	`###### Title`
markdown-36-8-Raw HTML	markdown-36-8	Raw HTML	
markdown-36-8-col1	markdown-36-8	col1	
markdown-36-8-col2	markdown-36-8	col2	
markdown-36-8-col3	markdown-36-8	col3	
markdown-37-6-Sample text	markdown-37-6	Sample text	This text is ___really important___.
markdown-37-6-Markdown	markdown-37-6	Markdown	`This text is ___really important___.`
markdown-37-6-Raw HTML	markdown-37-6	Raw HTML	
markdown-37-6-col1	markdown-37-6	col1	
markdown-37-6-col2	markdown-37-6	col2	
markdown-37-6-col3	markdown-37-6	col3	
markdown-38-6-Sample text	markdown-38-6	Sample text	#### This is a title\nFollowed by a paragraph
markdown-38-6-Markdown	markdown-38-6	Markdown	`#### This is a title`\n`Followed by a paragraph`
markdown-38-6-Raw HTML	markdown-38-6	Raw HTML	
markdown-38-6-col1	markdown-38-6	col1	
markdown-38-6-col2	markdown-38-6	col2	
markdown-38-6-col3	markdown-38-6	col3	
markdown-39-7-Sample text	markdown-39-7	Sample text	1. First item\n3. Second item\n2. Third item\n4. Fourth item
markdown-39-7-Markdown	markdown-39-7	Markdown	`1. First item`\n`2. Second item`\n`3. Third item`\n`4. Fourth item`
markdown-39-7-Raw HTML	markdown-39-7	Raw HTML	
markdown-39-7-col1	markdown-39-7	col1	
markdown-39-7-col2	markdown-39-7	col2	
markdown-39-7-col3	markdown-39-7	col3	
markdown-40-6-Sample text	markdown-40-6	Sample text	- First item\n- Second item\n  - Nested item 1\n  - Nested item 2\n- Third item\n- Fourth item
markdown-40-6-Markdown	markdown-40-6	Markdown	`- First item`\n`- Second item`\n`  - Nested item 1`\n`  - Nested item 2`\n`- Third item`\n`- Fourth item`
markdown-41-6-Sample text	markdown-41-6	Sample text	# Marked - Markdown Parser\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n## How To Use The Demo\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
markdown-41-6-Markdown	markdown-41-6	Markdown	`# Marked - Markdown Parser`\n\n`[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.`\n\n`## How To Use The Demo`\n\n`1. Type in stuff on the left.`\n`2. See the live updates on the right.`\n\n`That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:`\n\n`- **Preview:**  A live display of the generated HTML as it would render in a browser.`\n`- **HTML Source:**  The generated HTML before your browser makes it pretty.`\n`- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.`\n`- **Quick Reference:**  A brief run-down of how to format things using markdown.`\n\n`Why Markdown?`\n`-------------`\n\n`It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,`\n\n`> The overriding design goal for Markdown's`\n`> formatting syntax is to make it as readable`\n`> as possible. The idea is that a`\n`> Markdown-formatted document should be`\n`> publishable as-is, as plain text, without`\n`> looking like it's been marked up with tags`\n`> or formatting instructions.`\n\n`Ready to start writing?  Either start changing stuff on the left or`\n`[clear everything](/demo/?text=) with a simple click.`\n\n`[Marked]: https://github.com/markedjs/marked/`\n`[Markdown]: http://daringfireball.net/projects/markdown/`
markdown-41-6-Raw HTML	markdown-41-6	Raw HTML	
markdown-41-6-col1	markdown-41-6	col1	
markdown-41-6-col2	markdown-41-6	col2	
markdown-41-6-col3	markdown-41-6	col3	
markdown-42-7-Sample text	markdown-42-7	Sample text	
markdown-42-7-Markdown	markdown-42-7	Markdown	
markdown-42-7-Raw HTML	markdown-42-7	Raw HTML	<h5>Description</h5><p>Application topologies as a Service as described in 'App Boxes' entry but based on a Docker Enterprise stack.</p><h5>Why do we care?</h5><p>Available on-premise and delivered by the Cloud Platform but not available on the external Cloud Innovation Platform</p><h5>Action plan</h5><p>Will be studied if requested by users</p>
markdown-42-7-col1	markdown-42-7	col1	
markdown-42-7-col2	markdown-42-7	col2	
markdown-42-7-col3	markdown-42-7	col3	
markdown-24-17-Sample text	markdown-24-17	Sample text	I just love **bold text**.
markdown-24-17-Markdown	markdown-24-17	Markdown	`I just love **bold text**.`
markdown-24-17-Raw HTML	markdown-24-17	Raw HTML	test2
markdown-24-17-col1	markdown-24-17	col1	col1
markdown-24-17-col2	markdown-24-17	col2	col2
markdown-24-17-col3	markdown-24-17	col3	col3
markdown-24-17-lastupdate	markdown-24-17	lastupdate	+044307-01-01 00:00:00.000+00
markdown-24-18-Sample text	markdown-24-18	Sample text	I just love **bold text**.
markdown-24-18-Markdown	markdown-24-18	Markdown	`I just love **bold text**.`
markdown-24-18-Raw HTML	markdown-24-18	Raw HTML	test3
markdown-24-18-col1	markdown-24-18	col1	col1
markdown-24-18-col2	markdown-24-18	col2	col2
markdown-24-18-col3	markdown-24-18	col3	col3
markdown-31-7-Sample text	markdown-31-7	Sample text	This is a first paragraph\n\nThis is a second paragraph.
markdown-31-7-Markdown	markdown-31-7	Markdown	`This is a first paragraph.`\n\n`This is a second paragraph.`
markdown-31-7-Raw HTML	markdown-31-7	Raw HTML	
markdown-31-7-col1	markdown-31-7	col1	
markdown-31-7-col2	markdown-31-7	col2	
markdown-31-7-col3	markdown-31-7	col3	
markdown-24-19-Sample text	markdown-24-19	Sample text	I just love **bold text**.
markdown-24-19-Markdown	markdown-24-19	Markdown	`I just love **bold text**.`
markdown-24-19-Raw HTML	markdown-24-19	Raw HTML	test3
markdown-24-19-col1	markdown-24-19	col1	col1
markdown-24-19-col2	markdown-24-19	col2	col2
markdown-24-19-col3	markdown-24-19	col3	col3
markdown-24-20-Sample text	markdown-24-20	Sample text	I just love **bold text**.
markdown-24-20-Markdown	markdown-24-20	Markdown	`I just love **bold text**.`
markdown-24-20-Raw HTML	markdown-24-20	Raw HTML	test3
markdown-24-20-col1	markdown-24-20	col1	col1
markdown-24-20-col2	markdown-24-20	col2	col2
markdown-24-20-col3	markdown-24-20	col3	col3
markdown-24-21-Sample text	markdown-24-21	Sample text	I just love **bold text**.
markdown-24-21-Markdown	markdown-24-21	Markdown	`I just love **bold text**.`
markdown-24-21-Raw HTML	markdown-24-21	Raw HTML	test3
markdown-24-21-col1	markdown-24-21	col1	col1
markdown-24-21-col2	markdown-24-21	col2	col2
markdown-24-21-col3	markdown-24-21	col3	col3
markdown-24-22-Sample text	markdown-24-22	Sample text	I just love **bold text**.
markdown-24-22-Markdown	markdown-24-22	Markdown	`I just love **bold text**.`
markdown-24-22-Raw HTML	markdown-24-22	Raw HTML	test3
markdown-24-22-col1	markdown-24-22	col1	col1
markdown-24-22-col2	markdown-24-22	col2	col2
markdown-24-22-col3	markdown-24-22	col3	col3
markdown-25-5-Sample text	markdown-25-5	Sample text	I just love __bold text__.
markdown-25-5-Markdown	markdown-25-5	Markdown	`I just love __bold text__.`
markdown-25-5-Raw HTML	markdown-25-5	Raw HTML	
markdown-25-5-col1	markdown-25-5	col1	
markdown-25-5-col2	markdown-25-5	col2	
markdown-25-5-col3	markdown-25-5	col3	
markdown-41-7-Sample text	markdown-41-7	Sample text	# Marked - Markdown Parser\n\n[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.\n\n## How To Use The Demo\n\n1. Type in stuff on the left.\n2. See the live updates on the right.\n\nThat's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:\n\n- **Preview:**  A live display of the generated HTML as it would render in a browser.\n- **HTML Source:**  The generated HTML before your browser makes it pretty.\n- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.\n- **Quick Reference:**  A brief run-down of how to format things using markdown.\n\nWhy Markdown?\n-------------\n\nIt's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n> Markdown-formatted document should be\n> publishable as-is, as plain text, without\n> looking like it's been marked up with tags\n> or formatting instructions.\n\nReady to start writing?  Either start changing stuff on the left or\n[clear everything](/demo/?text=) with a simple click.\n\n[Marked]: https://github.com/markedjs/marked/\n[Markdown]: http://daringfireball.net/projects/markdown/\n
markdown-41-7-Markdown	markdown-41-7	Markdown	`# Marked - Markdown Parser`\n\n`[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.`\n\n`## How To Use The Demo`\n\n`1. Type in stuff on the left.`\n`2. See the live updates on the right.`\n\n`That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:`\n\n`- **Preview:**  A live display of the generated HTML as it would render in a browser.`\n`- **HTML Source:**  The generated HTML before your browser makes it pretty.`\n`- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.`\n`- **Quick Reference:**  A brief run-down of how to format things using markdown.`\n\n`Why Markdown?`\n`-------------`\n\n`It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,`\n\n`> The overriding design goal for Markdown's`\n`> formatting syntax is to make it as readable`\n`> as possible. The idea is that a`\n`> Markdown-formatted document should be`\n`> publishable as-is, as plain text, without`\n`> looking like it's been marked up with tags`\n`> or formatting instructions.`\n\n`Ready to start writing?  Either start changing stuff on the left or`\n`[clear everything](/demo/?text=) with a simple click.`\n\n`[Marked]: https://github.com/markedjs/marked/`\n`[Markdown]: http://daringfireball.net/projects/markdown/`
markdown-41-7-Raw HTML	markdown-41-7	Raw HTML	
markdown-41-7-col1	markdown-41-7	col1	
markdown-41-7-col2	markdown-41-7	col2	
markdown-41-7-col3	markdown-41-7	col3	
markdown-41-7-az	markdown-41-7	az	
markdown-41-7-Date Freeze	markdown-41-7	Date Freeze	
\.


COPY radar_parameters (id, radar, radar_version, name, value) FROM stdin;
markdown-2-2-1-title	markdown	markdown-2-2-1	title	Markdown Examples 2
markdown-2-2-1-themeId	markdown	markdown-2-2-1	themeId	default-theme
markdown-2-2-1-blipNewDuration	markdown	markdown-2-2-1	blipNewDuration	120
markdown-2-2-1-titlePageHTML	markdown	markdown-2-2-1	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text 2</text><text style="font-size: small;">Small text</text></div>
markdown-2-2-1-isProportional	markdown	markdown-2-2-1	isProportional	1
markdown-2-2-1-embed	markdown	markdown-2-2-1	embed	1
markdown-0-1-1-title	markdown	markdown-0-1-1	title	Markdown Examples 2
markdown-0-1-1-themeId	markdown	markdown-0-1-1	themeId	default-theme
markdown-0-1-1-blipNewDuration	markdown	markdown-0-1-1	blipNewDuration	120
markdown-2-2-1-legend1	markdown	markdown-2-2-1	legend1	New or moved
markdown-2-2-1-legend2	markdown	markdown-2-2-1	legend2	No change 2
markdown-2-2-1-legend3	markdown	markdown-2-2-1	legend3	legend test
markdown-2-2-1-legend4	markdown	markdown-2-2-1	legend4	 
markdown-2-2-1-ringsOrder	markdown	markdown-2-2-1	ringsOrder	Simple,Complex
markdown-2-2-1-sectorsOrder	markdown	markdown-2-2-1	sectorsOrder	Format 2,Lists,Multi-line paragraph,Heading,Full Examples
markdown-2-2-1-ignoreColumns	markdown	markdown-2-2-1	ignoreColumns	col1,col3
markdown-2-2-1-hideColumnTitle	markdown	markdown-2-2-1	hideColumnTitle	Raw HTML,col2
markdown-2-2-1-legendBox1	markdown	markdown-2-2-1	legendBox1	Nouveauté
markdown-2-2-1-legendBox2	markdown	markdown-2-2-1	legendBox2	Tendance
markdown-2-2-1-sheetId	markdown	markdown-2-2-1	sheetId	markdown
markdown-0-1-1-titlePageHTML	markdown	markdown-0-1-1	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-0-1-1-isProportional	markdown	markdown-0-1-1	isProportional	1
markdown-0-1-1-embed	markdown	markdown-0-1-1	embed	1
markdown-0-1-1-legend1	markdown	markdown-0-1-1	legend1	New or moved
markdown-0-1-1-legend2	markdown	markdown-0-1-1	legend2	No change 2
markdown-0-1-1-legend3	markdown	markdown-0-1-1	legend3	legend 3
markdown-0-1-1-ringsOrder	markdown	markdown-0-1-1	ringsOrder	Complex,Simple
markdown-0-1-1-ignoreColumns	markdown	markdown-0-1-1	ignoreColumns	col1,col3
markdown-0-1-1-hideColumnTitle	markdown	markdown-0-1-1	hideColumnTitle	Raw HTML,col2
markdown-0-1-1-legendBox1	markdown	markdown-0-1-1	legendBox1	Nouveauté
markdown-0-1-1-legendBox2	markdown	markdown-0-1-1	legendBox2	Tendance
markdown-0-1-1-sheetId	markdown	markdown-0-1-1	sheetId	markdown
markdown-0-ignoreColumns	markdown	markdown-0	ignoreColumns	col1,col3
markdown-0-title	markdown	markdown-0	title	Markdown Examples 2
markdown-0-themeId	markdown	markdown-0	themeId	default-theme
markdown-0-blipNewDuration	markdown	markdown-0	blipNewDuration	120
markdown-0-titlePageHTML	markdown	markdown-0	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-0-isProportional	markdown	markdown-0	isProportional	1
markdown-0-embed	markdown	markdown-0	embed	1
markdown-0-legend1	markdown	markdown-0	legend1	New or moved
markdown-0-legend2	markdown	markdown-0	legend2	No change
markdown-0-legend3	markdown	markdown-0	legend3	legend 3
markdown-0-ringsOrder	markdown	markdown-0	ringsOrder	Complex,Simple
markdown-0-hideColumnTitle	markdown	markdown-0	hideColumnTitle	Raw HTML,col2
markdown-0-legendBox1	markdown	markdown-0	legendBox1	Nouveauté
markdown-0-legendBox2	markdown	markdown-0	legendBox2	Tendance
markdown-0-sheetId	markdown	markdown-0	sheetId	markdown
markdown-2-2-2-title	markdown	markdown-2-2-2	title	Markdown Examples 2
markdown-2-2-2-themeId	markdown	markdown-2-2-2	themeId	default-theme
markdown-2-2-2-blipNewDuration	markdown	markdown-2-2-2	blipNewDuration	120
markdown-2-2-2-titlePageHTML	markdown	markdown-2-2-2	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text 2</text><text style="font-size: small;">Small text</text></div>
markdown-2-2-2-isProportional	markdown	markdown-2-2-2	isProportional	1
markdown-2-2-2-embed	markdown	markdown-2-2-2	embed	1
markdown-2-2-2-legend1	markdown	markdown-2-2-2	legend1	New or moved
markdown-2-2-2-legend2	markdown	markdown-2-2-2	legend2	No change 2
markdown-2-2-2-legend3	markdown	markdown-2-2-2	legend3	legend test
markdown-2-2-2-legend4	markdown	markdown-2-2-2	legend4	 
markdown-2-2-2-ringsOrder	markdown	markdown-2-2-2	ringsOrder	Simple,Complex
markdown-1-title	markdown	markdown-1	title	Markdown Examples 2
markdown-1-themeId	markdown	markdown-1	themeId	default-theme
markdown-1-blipNewDuration	markdown	markdown-1	blipNewDuration	120
markdown-1-titlePageHTML	markdown	markdown-1	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-1-isProportional	markdown	markdown-1	isProportional	1
markdown-1-embed	markdown	markdown-1	embed	1
markdown-1-legend1	markdown	markdown-1	legend1	New or moved
markdown-1-legend2	markdown	markdown-1	legend2	No change 2
markdown-1-legend3	markdown	markdown-1	legend3	legend test
markdown-1-ringsOrder	markdown	markdown-1	ringsOrder	Complex,Simple
markdown-1-ignoreColumns	markdown	markdown-1	ignoreColumns	col1,col3
markdown-1-hideColumnTitle	markdown	markdown-1	hideColumnTitle	Raw HTML,col2
markdown-1-legendBox1	markdown	markdown-1	legendBox1	Nouveauté
markdown-1-legendBox2	markdown	markdown-1	legendBox2	Tendance
markdown-1-sheetId	markdown	markdown-1	sheetId	markdown
markdown-1-sectorsOrder	markdown	markdown-1	sectorsOrder	Format 2,Lists,Multi-line paragraph,Heading,Full Examples
markdown-2-2-2-sectorsOrder	markdown	markdown-2-2-2	sectorsOrder	Format 2,Lists,Multi-line paragraph,Heading,Full Examples
markdown-2-2-2-ignoreColumns	markdown	markdown-2-2-2	ignoreColumns	col1,col3
markdown-2-2-2-hideColumnTitle	markdown	markdown-2-2-2	hideColumnTitle	Raw HTML,col2
markdown-2-2-2-legendBox1	markdown	markdown-2-2-2	legendBox1	Nouveauté
markdown-2-2-2-legendBox2	markdown	markdown-2-2-2	legendBox2	Tendance
markdown-2-2-2-sheetId	markdown	markdown-2-2-2	sheetId	markdown
markdown-2-1-2-title	markdown	markdown-2-1-2	title	Markdown Examples 2
markdown-2-1-2-themeId	markdown	markdown-2-1-2	themeId	default-theme
markdown-2-1-2-blipNewDuration	markdown	markdown-2-1-2	blipNewDuration	1
markdown-2-1-2-titlePageHTML	markdown	markdown-2-1-2	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-2-1-2-isProportional	markdown	markdown-2-1-2	isProportional	1
markdown-2-1-2-embed	markdown	markdown-2-1-2	embed	1
markdown-2-1-2-legend1	markdown	markdown-2-1-2	legend1	New or moved
markdown-2-1-2-legend2	markdown	markdown-2-1-2	legend2	No change 2
markdown-2-1-2-legend3	markdown	markdown-2-1-2	legend3	legend test
markdown-2-1-2-legend4	markdown	markdown-2-1-2	legend4	 
markdown-2-1-2-source1	markdown	markdown-2-1-2	source1	hello
markdown-2-1-2-ringsOrder	markdown	markdown-2-1-2	ringsOrder	Complex,Simple
markdown-2-1-2-sectorsOrder	markdown	markdown-2-1-2	sectorsOrder	Lists,Multi-line paragraph,Heading,Full Examples
markdown-2-1-2-ignoreColumns	markdown	markdown-2-1-2	ignoreColumns	col1,col3
markdown-2-1-2-hideColumnTitle	markdown	markdown-2-1-2	hideColumnTitle	Raw HTML,col2
markdown-2-1-2-legendBox1	markdown	markdown-2-1-2	legendBox1	Nouveauté
markdown-2-1-2-legendBox2	markdown	markdown-2-1-2	legendBox2	Tendance
markdown-2-1-2-sheetId	markdown	markdown-2-1-2	sheetId	markdown
markdown-2-1-3-title	markdown	markdown-2-1-3	title	Markdown Examples 2
markdown-2-1-3-themeId	markdown	markdown-2-1-3	themeId	default-theme
markdown-2-1-3-blipNewDuration	markdown	markdown-2-1-3	blipNewDuration	1
markdown-2-1-3-titlePageHTML	markdown	markdown-2-1-3	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-2-1-3-isProportional	markdown	markdown-2-1-3	isProportional	1
markdown-2-1-3-embed	markdown	markdown-2-1-3	embed	1
markdown-2-1-3-legend1	markdown	markdown-2-1-3	legend1	New or moved
markdown-2-1-3-legend2	markdown	markdown-2-1-3	legend2	No change 2
markdown-2-1-3-legend3	markdown	markdown-2-1-3	legend3	legend test
markdown-2-1-3-legend4	markdown	markdown-2-1-3	legend4	 
markdown-2-1-3-source1	markdown	markdown-2-1-3	source1	hello
markdown-2-1-3-ringsOrder	markdown	markdown-2-1-3	ringsOrder	Complex,Simple
markdown-2-1-3-sectorsOrder	markdown	markdown-2-1-3	sectorsOrder	Lists,Multi-line paragraph,Heading,Full Examples
markdown-2-1-3-ignoreColumns	markdown	markdown-2-1-3	ignoreColumns	col1,col3
markdown-2-1-3-hideColumnTitle	markdown	markdown-2-1-3	hideColumnTitle	Raw HTML,col2
markdown-2-1-3-legendBox1	markdown	markdown-2-1-3	legendBox1	Nouveauté
markdown-2-1-3-legendBox2	markdown	markdown-2-1-3	legendBox2	Tendance
markdown-2-1-3-sheetId	markdown	markdown-2-1-3	sheetId	markdown
markdown-3-title	markdown	markdown-3	title	Markdown Examples 2
markdown-3-themeId	markdown	markdown-3	themeId	default-theme
markdown-3-blipNewDuration	markdown	markdown-3	blipNewDuration	1
markdown-3-titlePageHTML	markdown	markdown-3	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-3-isProportional	markdown	markdown-3	isProportional	1
markdown-3-embed	markdown	markdown-3	embed	1
markdown-3-legend1	markdown	markdown-3	legend1	New or moved
markdown-3-legend2	markdown	markdown-3	legend2	No change 2
markdown-3-legend3	markdown	markdown-3	legend3	legend test
markdown-3-legend4	markdown	markdown-3	legend4	 
markdown-3-source1	markdown	markdown-3	source1	hello
markdown-3-ringsOrder	markdown	markdown-3	ringsOrder	Complex,Simple
markdown-3-sectorsOrder	markdown	markdown-3	sectorsOrder	Lists,Multi-line paragraph,Heading,Full Examples
markdown-0-1-1-sectorsOrder	markdown	markdown-0-1-1	sectorsOrder	Format 2,Lists,Multi-line paragraph,Heading,Full Examples
markdown-0-sectorsOrder	markdown	markdown-0	sectorsOrder	Format 2,Lists,Multi-line paragraph,Heading,Full Examples
markdown-3-ignoreColumns	markdown	markdown-3	ignoreColumns	col1,col3
markdown-3-hideColumnTitle	markdown	markdown-3	hideColumnTitle	Raw HTML,col2
markdown-3-legendBox1	markdown	markdown-3	legendBox1	Nouveauté
markdown-1-1-1-title	markdown	markdown-1-1-1	title	Markdown Examples 2
markdown-1-1-1-themeId	markdown	markdown-1-1-1	themeId	default-theme
markdown-1-1-1-blipNewDuration	markdown	markdown-1-1-1	blipNewDuration	120
markdown-1-1-1-titlePageHTML	markdown	markdown-1-1-1	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-1-1-1-isProportional	markdown	markdown-1-1-1	isProportional	1
markdown-1-1-1-embed	markdown	markdown-1-1-1	embed	1
markdown-1-1-1-legend1	markdown	markdown-1-1-1	legend1	New or moved
markdown-1-1-1-legend2	markdown	markdown-1-1-1	legend2	No change 2
markdown-1-1-1-legend3	markdown	markdown-1-1-1	legend3	legend test
markdown-1-1-1-legend4	markdown	markdown-1-1-1	legend4	 
markdown-1-1-1-ringsOrder	markdown	markdown-1-1-1	ringsOrder	Simple,Complex
markdown-1-1-1-sectorsOrder	markdown	markdown-1-1-1	sectorsOrder	Format 2,Lists,Multi-line paragraph,Heading,Full Examples
markdown-1-1-1-ignoreColumns	markdown	markdown-1-1-1	ignoreColumns	col1,col3
markdown-1-1-1-hideColumnTitle	markdown	markdown-1-1-1	hideColumnTitle	Raw HTML,col2
markdown-1-1-1-legendBox1	markdown	markdown-1-1-1	legendBox1	Nouveauté
markdown-1-1-1-legendBox2	markdown	markdown-1-1-1	legendBox2	Tendance
markdown-1-1-1-sheetId	markdown	markdown-1-1-1	sheetId	markdown
markdown-3-legendBox2	markdown	markdown-3	legendBox2	Tendance
markdown-3-sheetId	markdown	markdown-3	sheetId	markdown
markdown-2-1-1-title	markdown	markdown-2-1-1	title	Markdown Examples 2
markdown-2-1-1-themeId	markdown	markdown-2-1-1	themeId	default-theme
markdown-2-1-1-blipNewDuration	markdown	markdown-2-1-1	blipNewDuration	120
markdown-2-1-1-titlePageHTML	markdown	markdown-2-1-1	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-2-1-1-isProportional	markdown	markdown-2-1-1	isProportional	1
markdown-2-1-1-embed	markdown	markdown-2-1-1	embed	1
markdown-2-1-1-legend1	markdown	markdown-2-1-1	legend1	New or moved
markdown-2-1-1-legend2	markdown	markdown-2-1-1	legend2	No change 2
markdown-2-1-1-legend3	markdown	markdown-2-1-1	legend3	legend test
markdown-2-1-1-legend4	markdown	markdown-2-1-1	legend4	 
markdown-2-1-1-ringsOrder	markdown	markdown-2-1-1	ringsOrder	Complex,Simple
markdown-2-1-1-sectorsOrder	markdown	markdown-2-1-1	sectorsOrder	Lists,Multi-line paragraph,Heading,Full Examples
markdown-2-1-1-ignoreColumns	markdown	markdown-2-1-1	ignoreColumns	col1,col3
markdown-2-1-1-hideColumnTitle	markdown	markdown-2-1-1	hideColumnTitle	Raw HTML,col2
markdown-2-1-1-legendBox1	markdown	markdown-2-1-1	legendBox1	Nouveauté
markdown-2-1-1-legendBox2	markdown	markdown-2-1-1	legendBox2	Tendance
markdown-2-1-1-sheetId	markdown	markdown-2-1-1	sheetId	markdown
markdown-2-title	markdown	markdown-2	title	Markdown Examples 2
markdown-2-themeId	markdown	markdown-2	themeId	default-theme
markdown-2-blipNewDuration	markdown	markdown-2	blipNewDuration	120
markdown-2-titlePageHTML	markdown	markdown-2	titlePageHTML	<div style="height: 100%; display: grid; align-content: center; justify-items: center;"><text style="font-weight: bold; font-size: xx-large;">Big Text</text><text style="font-size: small;">Small text</text></div>
markdown-2-isProportional	markdown	markdown-2	isProportional	1
markdown-2-embed	markdown	markdown-2	embed	1
markdown-2-legend1	markdown	markdown-2	legend1	New or moved
markdown-2-legend2	markdown	markdown-2	legend2	No change 2
markdown-2-legend3	markdown	markdown-2	legend3	legend test
markdown-2-legend4	markdown	markdown-2	legend4	 
markdown-2-ringsOrder	markdown	markdown-2	ringsOrder	Simple,Complex
markdown-2-sectorsOrder	markdown	markdown-2	sectorsOrder	Format 2,Lists,Multi-line paragraph,Heading,Full Examples
markdown-2-ignoreColumns	markdown	markdown-2	ignoreColumns	col1,col3
markdown-2-hideColumnTitle	markdown	markdown-2	hideColumnTitle	Raw HTML,col2
markdown-2-legendBox1	markdown	markdown-2	legendBox1	Nouveauté
markdown-2-legendBox2	markdown	markdown-2	legendBox2	Tendance
markdown-2-sheetId	markdown	markdown-2	sheetId	markdown
\.


COPY radar_rights (id, radar, user_id, rights) FROM stdin;
markdown-user1@gmail.com	markdown	user1@gmail.com	edit,owner
\.


COPY radar_tags (id, name, radar, radar_version) FROM stdin;
markdown-hors-prod	hors-prod	markdown	markdown-2
\.


COPY radar_versions (id, radar, version, fork, fork_version, user_id) FROM stdin;
markdown-1-1-1	markdown	1	1	1	user1@gmail.com
markdown-0	markdown	0	\N	\N	user1@gmail.com
markdown-0-1-1	markdown	0	1	1	user1@gmail.com
markdown-1	markdown	1	\N	\N	user1@gmail.com
markdown-2	markdown	2	\N	\N	user1@gmail.com
markdown-2-1-1	markdown	2	1	1	user1@gmail.com
markdown-2-1-2	markdown	2	1	2	user1@gmail.com
markdown-2-1-3	markdown	2	1	3	user1@gmail.com
markdown-3	markdown	3	\N	\N	user1@gmail.com
markdown-2-2-1	markdown	2	2	1	user1@gmail.com
markdown-2-2-2	markdown	2	2	2	user1@gmail.com
\.


COPY radars (id, state) FROM stdin;
markdown	0
\.


COPY theme_parameters (id, theme, name, value) FROM stdin;
default-theme-sectorTitleBorderColor1	default-theme	sectorTitleBorderColor1	\N
default-theme-sectorTitleBorderColor2	default-theme	sectorTitleBorderColor2	\N
default-theme-sectorTitleBorderColor3	default-theme	sectorTitleBorderColor3	\N
default-theme-sectorTitleBorderColor4	default-theme	sectorTitleBorderColor4	\N
default-theme-sectorTitleBorderColor5	default-theme	sectorTitleBorderColor5	\N
default-theme-sectorTitleBorderColor6	default-theme	sectorTitleBorderColor6	\N
default-theme-sectorTitleBorderColor7	default-theme	sectorTitleBorderColor7	\N
default-theme-sectorTitleBorderColor8	default-theme	sectorTitleBorderColor8	\N
default-theme-sectorTitleBorderColor9	default-theme	sectorTitleBorderColor9	\N
default-theme-sectorTitleBorderColor10	default-theme	sectorTitleBorderColor10	\N
default-theme-sectorTitleBorderColor11	default-theme	sectorTitleBorderColor11	\N
default-theme-sectorTitleBorderColor12	default-theme	sectorTitleBorderColor12	\N
default-theme-sectorTitleBorderColor13	default-theme	sectorTitleBorderColor13	\N
default-theme-sectorTitleBorderColor14	default-theme	sectorTitleBorderColor14	\N
default-theme-sectorTitleBorderColor15	default-theme	sectorTitleBorderColor15	\N
default-theme-sectorTitleBorderColor16	default-theme	sectorTitleBorderColor16	\N
default-theme-sectorTitleBorderColor17	default-theme	sectorTitleBorderColor17	\N
default-theme-sectorTitleBorderColor18	default-theme	sectorTitleBorderColor18	\N
default-theme-sectorTitleBorderColor19	default-theme	sectorTitleBorderColor19	\N
default-theme-sectorTitleBorderColor20	default-theme	sectorTitleBorderColor20	\N
default-theme-sectorTitleBorderColor21	default-theme	sectorTitleBorderColor21	\N
default-theme-sectorTitleBorderColor22	default-theme	sectorTitleBorderColor22	\N
default-theme-sectorTitleBorderColor23	default-theme	sectorTitleBorderColor23	\N
default-theme-sectorTitleBorderColor24	default-theme	sectorTitleBorderColor24	\N
default-theme-sectorTitleBorderColor25	default-theme	sectorTitleBorderColor25	\N
default-theme-sectorTitleFontColor1	default-theme	sectorTitleFontColor1	white
default-theme-sectorTitleFontColor2	default-theme	sectorTitleFontColor2	white
default-theme-sectorTitleFontColor3	default-theme	sectorTitleFontColor3	white
default-theme-sectorTitleFontColor4	default-theme	sectorTitleFontColor4	white
default-theme-sectorTitleFontColor5	default-theme	sectorTitleFontColor5	white
default-theme-sectorTitleFontColor6	default-theme	sectorTitleFontColor6	white
default-theme-sectorTitleFontColor7	default-theme	sectorTitleFontColor7	white
default-theme-sectorTitleFontColor8	default-theme	sectorTitleFontColor8	white
default-theme-sectorTitleFontColor9	default-theme	sectorTitleFontColor9	white
default-theme-sectorTitleFontColor10	default-theme	sectorTitleFontColor10	white
default-theme-sectorTitleFontColor11	default-theme	sectorTitleFontColor11	white
default-theme-sectorTitleFontColor12	default-theme	sectorTitleFontColor12	white
default-theme-sectorTitleFontColor13	default-theme	sectorTitleFontColor13	white
default-theme-sectorTitleFontColor14	default-theme	sectorTitleFontColor14	white
default-theme-sectorTitleFontColor15	default-theme	sectorTitleFontColor15	white
default-theme-sectorTitleFontColor16	default-theme	sectorTitleFontColor16	white
default-theme-sectorTitleFontColor17	default-theme	sectorTitleFontColor17	white
default-theme-sectorTitleFontColor18	default-theme	sectorTitleFontColor18	white
default-theme-sectorTitleFontColor19	default-theme	sectorTitleFontColor19	white
default-theme-sectorTitleFontColor20	default-theme	sectorTitleFontColor20	white
default-theme-sectorTitleFontColor21	default-theme	sectorTitleFontColor21	white
default-theme-sectorTitleFontColor22	default-theme	sectorTitleFontColor22	white
default-theme-sectorTitleFontColor23	default-theme	sectorTitleFontColor23	white
default-theme-sectorTitleFontColor24	default-theme	sectorTitleFontColor24	white
default-theme-sectorTitleFontColor25	default-theme	sectorTitleFontColor25	white
default-theme-sectorTitleFillColor1	default-theme	sectorTitleFillColor1	#8b1e3f
default-theme-sectorTitleFillColor2	default-theme	sectorTitleFillColor2	#3c153b
default-theme-sectorTitleFillColor3	default-theme	sectorTitleFillColor3	#89bd9e
default-theme-sectorTitleFillColor4	default-theme	sectorTitleFillColor4	#f0c987
default-theme-sectorTitleFillColor5	default-theme	sectorTitleFillColor5	#70F7F0
default-theme-sectorTitleFillColor6	default-theme	sectorTitleFillColor6	#91908A
default-theme-sectorTitleFillColor7	default-theme	sectorTitleFillColor7	#FF9CAF
default-theme-sectorTitleFillColor8	default-theme	sectorTitleFillColor8	#d96c06
default-theme-sectorTitleFillColor9	default-theme	sectorTitleFillColor9	#EBCC50
default-theme-sectorTitleFillColor10	default-theme	sectorTitleFillColor10	#036016
default-theme-sectorTitleFillColor11	default-theme	sectorTitleFillColor11	#EBEB38
default-theme-sectorTitleFillColor12	default-theme	sectorTitleFillColor12	#832400
default-theme-sectorTitleFillColor13	default-theme	sectorTitleFillColor13	#002400
default-theme-sectorTitleFillColor14	default-theme	sectorTitleFillColor14	#70F743
default-theme-sectorTitleFillColor15	default-theme	sectorTitleFillColor15	#7016F0
default-theme-sectorTitleFillColor16	default-theme	sectorTitleFillColor16	#DB2400
default-theme-sectorTitleFillColor17	default-theme	sectorTitleFillColor17	#DB8F40
default-theme-sectorTitleFillColor18	default-theme	sectorTitleFillColor18	#EB1BB8
default-theme-sectorTitleFillColor19	default-theme	sectorTitleFillColor19	#19A6F0
default-theme-sectorTitleFillColor20	default-theme	sectorTitleFillColor20	#22F202
default-theme-sectorTitleFillColor21	default-theme	sectorTitleFillColor21	\N
default-theme-sectorTitleFillColor22	default-theme	sectorTitleFillColor22	\N
default-theme-sectorTitleFillColor23	default-theme	sectorTitleFillColor23	\N
default-theme-sectorTitleFillColor24	default-theme	sectorTitleFillColor24	\N
default-theme-sectorTitleFillColor25	default-theme	sectorTitleFillColor25	\N
default-theme-ringFillColor1	default-theme	ringFillColor1	#A9A9A9
default-theme-ringFillColor2	default-theme	ringFillColor2	#BABABA
default-theme-ringFillColor3	default-theme	ringFillColor3	#DADADA
default-theme-ringFillColor4	default-theme	ringFillColor4	#EEE
default-theme-ringFillColor5	default-theme	ringFillColor5	#FAFAFA
\.


COPY theme_rights (id, theme, user_id, rights) FROM stdin;
default-theme-user2@gmail.com	default-theme	user2@gmail.com	owner,edit
\.


COPY themes (id) FROM stdin;
default-theme
\.


ALTER TABLE ONLY blip_links
    ADD CONSTRAINT blip_links_id_key UNIQUE (id);


ALTER TABLE ONLY blip_rights
    ADD CONSTRAINT blip_rights_id_key UNIQUE (id);


ALTER TABLE ONLY blips
    ADD CONSTRAINT blips_id_version_key UNIQUE (id_version);


ALTER TABLE ONLY column_links
    ADD CONSTRAINT column_links_id_key UNIQUE (id);


ALTER TABLE ONLY radar_parameters
    ADD CONSTRAINT radar_parameters_id_key UNIQUE (id);


ALTER TABLE ONLY radar_rights
    ADD CONSTRAINT radar_rights_id_key UNIQUE (id);


ALTER TABLE ONLY radar_tags
    ADD CONSTRAINT radar_tags_id_key UNIQUE (id);


ALTER TABLE ONLY radar_versions
    ADD CONSTRAINT radar_versions_id_key UNIQUE (id);


ALTER TABLE ONLY radars
    ADD CONSTRAINT radars_id_key UNIQUE (id);


ALTER TABLE ONLY theme_parameters
    ADD CONSTRAINT theme_parameters_id_key UNIQUE (id);


ALTER TABLE ONLY theme_rights
    ADD CONSTRAINT theme_rights_id_key UNIQUE (id);


ALTER TABLE ONLY themes
    ADD CONSTRAINT themes_id_key UNIQUE (id);


--
-- PostgreSQL database dump complete
--

