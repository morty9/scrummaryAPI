--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

-- Started on 2017-07-26 23:53:27 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12655)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2480 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 24701)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE projects (
    id integer NOT NULL,
    title character varying(256),
    id_creator integer NOT NULL,
    id_members integer[],
    id_sprint integer[],
    "createdAt" date,
    "updatedAt" date,
    status boolean
);


ALTER TABLE projects OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 24707)
-- Name: projects_id_creator_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE projects_id_creator_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE projects_id_creator_seq OWNER TO postgres;

--
-- TOC entry 2481 (class 0 OID 0)
-- Dependencies: 186
-- Name: projects_id_creator_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE projects_id_creator_seq OWNED BY projects.id_creator;


--
-- TOC entry 187 (class 1259 OID 24709)
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE projects_id_seq OWNER TO postgres;

--
-- TOC entry 2482 (class 0 OID 0)
-- Dependencies: 187
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE projects_id_seq OWNED BY projects.id;


--
-- TOC entry 188 (class 1259 OID 24711)
-- Name: sprints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sprints (
    id integer NOT NULL,
    "beginningDate" date,
    "endDate" date,
    id_creator integer NOT NULL,
    "id_listTasks" integer[],
    id_members integer[],
    "createdAt" date,
    "updatedAt" date,
    title character varying(50)
);


ALTER TABLE sprints OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 24717)
-- Name: sprints_id_creator_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sprints_id_creator_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sprints_id_creator_seq OWNER TO postgres;

--
-- TOC entry 2483 (class 0 OID 0)
-- Dependencies: 189
-- Name: sprints_id_creator_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sprints_id_creator_seq OWNED BY sprints.id_creator;


--
-- TOC entry 190 (class 1259 OID 24719)
-- Name: sprints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sprints_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sprints_id_seq OWNER TO postgres;

--
-- TOC entry 2484 (class 0 OID 0)
-- Dependencies: 190
-- Name: sprints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sprints_id_seq OWNED BY sprints.id;


--
-- TOC entry 191 (class 1259 OID 24721)
-- Name: stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE stats (
    id integer NOT NULL,
    "createdAt" date,
    "updatedAt" date,
    id_project integer
);


ALTER TABLE stats OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 24727)
-- Name: stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE stats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stats_id_seq OWNER TO postgres;

--
-- TOC entry 2485 (class 0 OID 0)
-- Dependencies: 192
-- Name: stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE stats_id_seq OWNED BY stats.id;


--
-- TOC entry 193 (class 1259 OID 24729)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tasks (
    id integer NOT NULL,
    title character varying(256),
    description text,
    difficulty integer,
    priority integer,
    category integer NOT NULL,
    "businessValue" double precision,
    id_creator integer NOT NULL,
    id_members numeric[],
    "createdAt" date,
    "updatedAt" date,
    status character varying,
    duration double precision,
    "taskDone" text
);


ALTER TABLE tasks OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 24735)
-- Name: tasks_id_category_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tasks_id_category_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_category_seq OWNER TO postgres;

--
-- TOC entry 2486 (class 0 OID 0)
-- Dependencies: 194
-- Name: tasks_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tasks_id_category_seq OWNED BY tasks.category;


--
-- TOC entry 195 (class 1259 OID 24737)
-- Name: tasks_id_creator_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tasks_id_creator_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_creator_seq OWNER TO postgres;

--
-- TOC entry 2487 (class 0 OID 0)
-- Dependencies: 195
-- Name: tasks_id_creator_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tasks_id_creator_seq OWNED BY tasks.id_creator;


--
-- TOC entry 196 (class 1259 OID 24739)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_seq OWNER TO postgres;

--
-- TOC entry 2488 (class 0 OID 0)
-- Dependencies: 196
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tasks_id_seq OWNED BY tasks.id;


--
-- TOC entry 197 (class 1259 OID 24741)
-- Name: token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE token (
    id integer NOT NULL,
    id_user integer,
    "createdAt" date,
    "updatedAt" date
);


ALTER TABLE token OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 24744)
-- Name: token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE token_id_seq OWNER TO postgres;

--
-- TOC entry 2489 (class 0 OID 0)
-- Dependencies: 198
-- Name: token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE token_id_seq OWNED BY token.id;


--
-- TOC entry 199 (class 1259 OID 24746)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    nickname character varying(256),
    fullname character varying(256),
    email character varying(512),
    password character varying(50),
    "createdAt" date,
    "updatedAt" date,
    id_tasks integer[]
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 24752)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- TOC entry 2490 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 2310 (class 2604 OID 24754)
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY projects ALTER COLUMN id SET DEFAULT nextval('projects_id_seq'::regclass);


--
-- TOC entry 2311 (class 2604 OID 24755)
-- Name: projects id_creator; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY projects ALTER COLUMN id_creator SET DEFAULT nextval('projects_id_creator_seq'::regclass);


--
-- TOC entry 2312 (class 2604 OID 24756)
-- Name: sprints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sprints ALTER COLUMN id SET DEFAULT nextval('sprints_id_seq'::regclass);


--
-- TOC entry 2313 (class 2604 OID 24757)
-- Name: sprints id_creator; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sprints ALTER COLUMN id_creator SET DEFAULT nextval('sprints_id_creator_seq'::regclass);


--
-- TOC entry 2314 (class 2604 OID 24758)
-- Name: stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stats ALTER COLUMN id SET DEFAULT nextval('stats_id_seq'::regclass);


--
-- TOC entry 2315 (class 2604 OID 24759)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tasks ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);


--
-- TOC entry 2316 (class 2604 OID 24760)
-- Name: tasks category; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tasks ALTER COLUMN category SET DEFAULT nextval('tasks_id_category_seq'::regclass);


--
-- TOC entry 2317 (class 2604 OID 24761)
-- Name: tasks id_creator; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tasks ALTER COLUMN id_creator SET DEFAULT nextval('tasks_id_creator_seq'::regclass);


--
-- TOC entry 2318 (class 2604 OID 24762)
-- Name: token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token ALTER COLUMN id SET DEFAULT nextval('token_id_seq'::regclass);


--
-- TOC entry 2319 (class 2604 OID 24763)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 2458 (class 0 OID 24701)
-- Dependencies: 185
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY projects (id, title, id_creator, id_members, id_sprint, "createdAt", "updatedAt", status) FROM stdin;
1	Scrummary	1	{1}	{1}	2017-07-26	2017-07-26	f
3	Python	3	{3}	{3}	2017-07-26	2017-07-26	f
4	Solarus	4	{4}	{4}	2017-07-26	2017-07-26	f
6	Android	2	{1,2,2}	{6,7}	2017-07-26	2017-07-26	f
7	Linux	2	{2}	{8}	2017-07-26	2017-07-26	t
9	Projet Annuel	5	{1,3,5,2,5}	{10}	2017-07-26	2017-07-26	f
2	Hermes	2	{2}	{2,11}	2017-07-26	2017-07-26	f
\.


--
-- TOC entry 2491 (class 0 OID 0)
-- Dependencies: 186
-- Name: projects_id_creator_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('projects_id_creator_seq', 1, false);


--
-- TOC entry 2492 (class 0 OID 0)
-- Dependencies: 187
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('projects_id_seq', 9, true);


--
-- TOC entry 2461 (class 0 OID 24711)
-- Dependencies: 188
-- Data for Name: sprints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sprints (id, "beginningDate", "endDate", id_creator, "id_listTasks", id_members, "createdAt", "updatedAt", title) FROM stdin;
1	2017-07-26	2017-08-03	1	\N	\N	2017-07-26	2017-07-26	Sprint 1
3	2017-07-26	2017-08-27	3	\N	\N	2017-07-26	2017-07-26	Sprint 1
4	2017-07-26	2017-10-26	4	\N	\N	2017-07-26	2017-07-26	Sprint 1
5	2017-07-26	2017-07-27	5	\N	\N	2017-07-26	2017-07-26	Sprint 1
6	2017-07-25	2017-08-25	2	{3}	\N	2017-07-26	2017-07-26	Sprint 1
8	2017-07-25	2017-07-26	2	{8}	\N	2017-07-26	2017-07-26	Sprint 1
10	2017-07-26	2017-07-27	5	\N	\N	2017-07-26	2017-07-26	Sprint A
2	2017-07-18	2017-07-20	2	{5,6,2}	\N	2017-07-26	2017-07-26	Sprint 1
11	2017-07-24	2017-08-01	2	{9,1}	\N	2017-07-26	2017-07-26	Sprint 2
7	2017-07-22	2017-09-22	2	{4,7,10}	\N	2017-07-26	2017-07-26	Sprint 2
\.


--
-- TOC entry 2493 (class 0 OID 0)
-- Dependencies: 189
-- Name: sprints_id_creator_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sprints_id_creator_seq', 1, false);


--
-- TOC entry 2494 (class 0 OID 0)
-- Dependencies: 190
-- Name: sprints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sprints_id_seq', 11, true);


--
-- TOC entry 2464 (class 0 OID 24721)
-- Dependencies: 191
-- Data for Name: stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY stats (id, "createdAt", "updatedAt", id_project) FROM stdin;
2	2017-07-26	2017-07-26	6
5	2017-07-26	2017-07-26	2
\.


--
-- TOC entry 2495 (class 0 OID 0)
-- Dependencies: 192
-- Name: stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('stats_id_seq', 5, true);


--
-- TOC entry 2466 (class 0 OID 24729)
-- Dependencies: 193
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tasks (id, title, description, difficulty, priority, category, "businessValue", id_creator, id_members, "createdAt", "updatedAt", status, duration, "taskDone") FROM stdin;
3	Digramme de CU	Créer les digrammes de cas d'utilisation	2	2	1	20	2	{3}	2017-07-26	2017-07-26	A faire	1	\N
4	Diagramme de Gantt	Créer le diagramme de gantt	2	2	1	20	2	{1}	2017-07-26	2017-07-26	En cours	1	\N
5	Digramme techniques	Créer les diagrammes techniques	2	0	1	50	2	{4}	2017-07-26	2017-07-26	En cours	1	\N
6	Chartes graphiques	Créer la charte graphique	1	0	1	20	2	{1}	2017-07-26	2017-07-26	Finies	1	26/07/2017
7	Rapport de bugs	Créer le rapport de bug	5	2	1	50	2	{2}	2017-07-26	2017-07-26	En cours	1	\N
8	Linux from scratch	Faire un linux de zero	2	0	1	50	2	{2,3,1}	2017-07-26	2017-07-26	A faire	2	\N
2	Arborescence du projet	Créer l'arborescence des fichiers	3	0	1	100	2	{2}	2017-07-26	2017-07-26	Finies	2	26/07/2017
9	Nouvelle Tache	c'est une nouvelle tache	2	0	1	50	2	{4}	2017-07-26	2017-07-26	A faire	2	\N
1	Cahier des charges	Créer le cahier des charges du projet	2	0	1	50	2	{2}	2017-07-26	2017-07-26	Finies	3	26/07/2017
10	Google map	Créer la google map pour géolocalisation	2	0	1	50	2	{3,4}	2017-07-26	2017-07-26	En cours	1	00-00-0000
\.


--
-- TOC entry 2496 (class 0 OID 0)
-- Dependencies: 194
-- Name: tasks_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tasks_id_category_seq', 1, false);


--
-- TOC entry 2497 (class 0 OID 0)
-- Dependencies: 195
-- Name: tasks_id_creator_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tasks_id_creator_seq', 1, false);


--
-- TOC entry 2498 (class 0 OID 0)
-- Dependencies: 196
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tasks_id_seq', 10, true);


--
-- TOC entry 2470 (class 0 OID 24741)
-- Dependencies: 197
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY token (id, id_user, "createdAt", "updatedAt") FROM stdin;
8	2	2017-07-26	2017-07-26
10	5	2017-07-26	2017-07-26
14	2	2017-07-26	2017-07-26
15	2	2017-07-26	2017-07-26
\.


--
-- TOC entry 2499 (class 0 OID 0)
-- Dependencies: 198
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('token_id_seq', 15, true);


--
-- TOC entry 2472 (class 0 OID 24746)
-- Dependencies: 199
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, nickname, fullname, email, password, "createdAt", "updatedAt", id_tasks) FROM stdin;
1	Morty	Bérangère La Touche	berangere.lt@gmail.com	71fda9a62e321fbf95908e89b337bfc64307b281	2017-07-26	2017-07-26	\N
3	Zeke	Nam Nguyen	nam.nguyen@gmail.com	ce4004f150ebf406d62405f54e26e18fba13ffff	2017-07-26	2017-07-26	\N
4	Hrv	Hervé La Touche	hrv.latouche@gmail.com	8fee7024c1c229f92f581b7a3ac583298f1aad8b	2017-07-26	2017-07-26	\N
2	Tomilkyway1	Thomas Pain-Surget	thomas.painsurget@gmail.com	5f50a84c1fa3bcff146405017f36aec1a10a9e38	2017-07-26	2017-07-26	\N
5	BestProfEver	Frédéric Sananes	frederic.sananes@gmail.com	58692fd42329d32571d999fbcdd2ddd08a5186db	2017-07-26	2017-07-26	\N
\.


--
-- TOC entry 2500 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 5, true);


--
-- TOC entry 2321 (class 2606 OID 24765)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 2323 (class 2606 OID 24767)
-- Name: sprints sprints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sprints
    ADD CONSTRAINT sprints_pkey PRIMARY KEY (id);


--
-- TOC entry 2325 (class 2606 OID 24769)
-- Name: stats stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY stats
    ADD CONSTRAINT stats_pkey PRIMARY KEY (id);


--
-- TOC entry 2327 (class 2606 OID 24771)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 2329 (class 2606 OID 32895)
-- Name: tasks tasks_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_title_key UNIQUE (title);


--
-- TOC entry 2331 (class 2606 OID 24775)
-- Name: token token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- TOC entry 2333 (class 2606 OID 24777)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2335 (class 2606 OID 24779)
-- Name: users users_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_id_key UNIQUE (id);


--
-- TOC entry 2337 (class 2606 OID 24781)
-- Name: users users_nickname_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_nickname_key UNIQUE (nickname);


--
-- TOC entry 2339 (class 2606 OID 24783)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2340 (class 2606 OID 24784)
-- Name: projects projects_id_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_id_creator_fkey FOREIGN KEY (id_creator) REFERENCES users(id);


-- Completed on 2017-07-26 23:53:28 CEST

--
-- PostgreSQL database dump complete
--

