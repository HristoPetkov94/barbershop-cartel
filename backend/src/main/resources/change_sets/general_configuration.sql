DROP TABLE IF EXISTS general_configuration;

CREATE TABLE public.general_configuration
(
    id bigint NOT NULL,
    address character varying(255),
    appointment_success_message character varying(255),
    city character varying(255),
    front_page_message character varying(255),
    language integer,
    phone_number character varying(255),
    CONSTRAINT general_configuration_pkey PRIMARY KEY (id)
)
    WITH (
        OIDS=FALSE
        );
ALTER TABLE public.general_configuration
    OWNER TO cartel;

INSERT INTO public.general_configuration(
    id, address, appointment_success_message, city, front_page_message, language, phone_number)
VALUES (1, '', '', '', '', 1, '');

INSERT INTO public.general_configuration(
    id, address, appointment_success_message, city, front_page_message, language, phone_number)
VALUES (2, '', '', '', '', 0, '');
