DROP TABLE IF EXISTS social_media_entity;

CREATE TABLE public.social_media
(
    id bigint NOT NULL,
    facebook character varying(255),
    instagram character varying(255),
    CONSTRAINT social_media_pkey PRIMARY KEY (id)
)
    WITH (
        OIDS=FALSE
        );
ALTER TABLE public.social_media
    OWNER TO cartel;

INSERT INTO public.social_media(
    id, facebook, instagram)
VALUES (1, '', '');
