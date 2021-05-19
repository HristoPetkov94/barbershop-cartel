DROP TABLE IF EXISTS email_details;

CREATE TABLE public.email_details
(
    id bigint NOT NULL,
    email_type integer,
    email_from character varying(255),
    language integer,
    subject character varying(255),
    text character varying(255),
    CONSTRAINT email_details_pkey PRIMARY KEY (id)
)
    WITH (
        OIDS=FALSE
        );
ALTER TABLE public.email_details
    OWNER TO cartel;

-- BOTH EMAIL TYPES FOR BULGARIAN LANGUAGE
INSERT INTO public.email_details(
    id, email_type, email_from, language, subject, text)
VALUES (1, 0, 'admin@cartel.bg', 0, '', '');

INSERT INTO public.email_details(
    id, email_type, email_from, language, subject, text)
VALUES (2, 1, 'admin@cartel.bg', 0, '', '');

-- BOTH EMAIL TYPES FOR ENGLISH LANGUAGE
INSERT INTO public.email_details(
    id, email_type, email_from, language, subject, text)
VALUES (3, 0, 'admin@cartel.bg', 1, '', '');

INSERT INTO public.email_details(
    id, email_type, email_from, language, subject, text)
VALUES (4, 1, 'admin@cartel.bg', 1, '', '');
