--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: application_modules; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE application_modules (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    home character varying(255),
    url character varying(255),
    icon character varying(255),
    description character varying(255),
    application_type_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    ancestry character varying(255),
    ancestry_depth integer DEFAULT 0,
    xtype character varying(255)
);


--
-- Name: application_modules_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE application_modules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: application_modules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE application_modules_id_seq OWNED BY application_modules.id;


--
-- Name: application_types; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE application_types (
    id integer NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    default_css_class character varying(255) DEFAULT ''::character varying,
    description character varying(255) DEFAULT ''::character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: application_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE application_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: application_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE application_types_id_seq OWNED BY application_types.id;


--
-- Name: delayed_jobs; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE delayed_jobs (
    id integer NOT NULL,
    priority integer DEFAULT 0,
    attempts integer DEFAULT 0,
    handler text,
    last_error text,
    run_at timestamp without time zone,
    locked_at timestamp without time zone,
    failed_at timestamp without time zone,
    locked_by character varying(255),
    queue character varying(255),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: delayed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE delayed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: delayed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE delayed_jobs_id_seq OWNED BY delayed_jobs.id;


--
-- Name: enzymes; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE enzymes (
    id integer NOT NULL,
    ec_number character varying(255),
    name character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    ancestry character varying(255),
    ancestry_depth integer DEFAULT 0
);


--
-- Name: enzymes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE enzymes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: enzymes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE enzymes_id_seq OWNED BY enzymes.id;


--
-- Name: role_profiles; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE role_profiles (
    id integer NOT NULL,
    priv_create integer,
    priv_read integer,
    priv_update integer,
    priv_destroy integer,
    application_module_id integer NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: role_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE role_profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: role_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE role_profiles_id_seq OWNED BY role_profiles.id;


--
-- Name: role_users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE role_users (
    id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: role_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE role_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: role_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE role_users_id_seq OWNED BY role_users.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE roles (
    id integer NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    description character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE roles_id_seq OWNED BY roles.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: tsv_files; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE tsv_files (
    id integer NOT NULL,
    uuid character varying(255),
    percentage integer DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status character varying(255) DEFAULT 'processing'::character varying
);


--
-- Name: tsv_file_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tsv_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tsv_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tsv_file_id_seq OWNED BY tsv_files.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    login character varying(255) DEFAULT ''::character varying NOT NULL,
    name character varying(255) DEFAULT ''::character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    email character varying(255) DEFAULT ''::character varying NOT NULL,
    crypted_password character varying(255) DEFAULT ''::character varying NOT NULL,
    password_salt character varying(255) DEFAULT ''::character varying NOT NULL,
    persistence_token character varying(255) DEFAULT ''::character varying NOT NULL,
    single_access_token character varying(255) DEFAULT ''::character varying NOT NULL,
    perishable_token character varying(255) DEFAULT ''::character varying NOT NULL,
    login_count integer DEFAULT 0 NOT NULL,
    failed_login_count integer DEFAULT 0 NOT NULL,
    last_request_at timestamp without time zone,
    current_login_at timestamp without time zone,
    last_login_at timestamp without time zone,
    current_login_ip character varying(255),
    last_login_ip character varying(255)
);


--
-- Name: user_applications; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW user_applications AS
    SELECT am.id, am.id AS application_module_id, am.ancestry, am.home, am.description, am.name, am.url, CASE WHEN (am.icon IS NULL) THEN at.default_css_class ELSE am.icon END AS icon, at.name AS application_type, r.id AS role_id, r.name AS role_name, u.id AS user_id, u.login, rp.priv_create, rp.priv_read, rp.priv_update, rp.priv_destroy, am.ancestry_depth FROM (((((users u JOIN role_users ru ON ((ru.user_id = u.id))) JOIN roles r ON ((r.id = ru.role_id))) JOIN role_profiles rp ON ((rp.role_id = r.id))) JOIN application_modules am ON ((am.id = rp.application_module_id))) JOIN application_types at ON ((at.id = am.application_type_id))) WHERE (NOT (EXISTS (SELECT NULL::unknown AS unknown FROM (role_profiles rp1 JOIN role_users ru1 ON ((rp1.role_id = ru1.role_id))) WHERE ((((rp1.application_module_id = rp.application_module_id) AND (ru1.user_id = u.id)) AND ((((rp1.priv_read IS NOT NULL) OR (rp1.priv_create IS NOT NULL)) OR (rp1.priv_update IS NOT NULL)) OR (rp1.priv_destroy IS NOT NULL))) AND (rp1.role_id <> r.id))))) UNION SELECT am.id, am.id AS application_module_id, am.ancestry, am.home, am.description, am.name, am.url, CASE WHEN (am.icon IS NULL) THEN at.default_css_class ELSE am.icon END AS icon, at.name AS application_type, r.id AS role_id, r.name AS role_name, NULL::integer AS user_id, 'Public'::character varying(255) AS login, rp.priv_create, rp.priv_read, rp.priv_update, rp.priv_destroy, am.ancestry_depth FROM (((roles r JOIN role_profiles rp ON ((rp.role_id = r.id))) JOIN application_modules am ON ((am.id = rp.application_module_id))) JOIN application_types at ON ((at.id = am.application_type_id))) WHERE ((r.name)::text = 'Public'::text);


--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE user_sessions (
    id integer NOT NULL,
    session_id character varying(255) NOT NULL,
    data text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: user_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_sessions_id_seq OWNED BY user_sessions.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY application_modules ALTER COLUMN id SET DEFAULT nextval('application_modules_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY application_types ALTER COLUMN id SET DEFAULT nextval('application_types_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY delayed_jobs ALTER COLUMN id SET DEFAULT nextval('delayed_jobs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY enzymes ALTER COLUMN id SET DEFAULT nextval('enzymes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY role_profiles ALTER COLUMN id SET DEFAULT nextval('role_profiles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY role_users ALTER COLUMN id SET DEFAULT nextval('role_users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY roles ALTER COLUMN id SET DEFAULT nextval('roles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tsv_files ALTER COLUMN id SET DEFAULT nextval('tsv_file_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_sessions ALTER COLUMN id SET DEFAULT nextval('user_sessions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: application_modules_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY application_modules
    ADD CONSTRAINT application_modules_pkey PRIMARY KEY (id);


--
-- Name: application_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY application_types
    ADD CONSTRAINT application_types_pkey PRIMARY KEY (id);


--
-- Name: delayed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY delayed_jobs
    ADD CONSTRAINT delayed_jobs_pkey PRIMARY KEY (id);


--
-- Name: enzymes_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY enzymes
    ADD CONSTRAINT enzymes_pkey PRIMARY KEY (id);


--
-- Name: role_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY role_profiles
    ADD CONSTRAINT role_profiles_pkey PRIMARY KEY (id);


--
-- Name: role_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY role_users
    ADD CONSTRAINT role_users_pkey PRIMARY KEY (id);


--
-- Name: roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: tsv_file_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY tsv_files
    ADD CONSTRAINT tsv_file_pkey PRIMARY KEY (id);


--
-- Name: user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: delayed_jobs_priority; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX delayed_jobs_priority ON delayed_jobs USING btree (priority, run_at);


--
-- Name: index_application_modules_on_ancestry; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_application_modules_on_ancestry ON application_modules USING btree (ancestry);


--
-- Name: index_enzymes_on_ancestry; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_enzymes_on_ancestry ON enzymes USING btree (ancestry);


--
-- Name: index_enzymes_on_name; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_enzymes_on_name ON enzymes USING btree (name);


--
-- Name: index_user_sessions_on_session_id; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_user_sessions_on_session_id ON user_sessions USING btree (session_id);


--
-- Name: index_user_sessions_on_updated_at; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_user_sessions_on_updated_at ON user_sessions USING btree (updated_at);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- PostgreSQL database dump complete
--

INSERT INTO schema_migrations (version) VALUES ('20110609111549');

INSERT INTO schema_migrations (version) VALUES ('20110609111824');

INSERT INTO schema_migrations (version) VALUES ('20110616081628');

INSERT INTO schema_migrations (version) VALUES ('20110621064542');

INSERT INTO schema_migrations (version) VALUES ('20110621064614');

INSERT INTO schema_migrations (version) VALUES ('20110621065015');

INSERT INTO schema_migrations (version) VALUES ('20110621065126');

INSERT INTO schema_migrations (version) VALUES ('20110621065316');

INSERT INTO schema_migrations (version) VALUES ('20110705065438');

INSERT INTO schema_migrations (version) VALUES ('20110706071224');

INSERT INTO schema_migrations (version) VALUES ('20110706095944');

INSERT INTO schema_migrations (version) VALUES ('20110708075544');

INSERT INTO schema_migrations (version) VALUES ('20110722080546');

INSERT INTO schema_migrations (version) VALUES ('20110722081140');

INSERT INTO schema_migrations (version) VALUES ('20130129153604');

INSERT INTO schema_migrations (version) VALUES ('20130130094912');

INSERT INTO schema_migrations (version) VALUES ('20130130102856');