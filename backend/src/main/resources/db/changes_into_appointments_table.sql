DROP TABLE IF EXISTS appointments;

CREATE TABLE appointments
(
    id bigint generated by default as identity
        constraint appointments_pkey
            primary key,
    end_time TIMESTAMP,
    start_time TIMESTAMP,
    barber_id bigint
        constraint fkicx8irhh8pdyhcogevp8a5l7j
            references barbers,
    client_id bigint
        constraint fkfbl6cciquyyvv5s1e31qmflkb
            references clients,
    service_id bigint
        constraint fk5iltr7k9pows18hk8nc101vc1
            references services
);

ALTER TABLE appointments owner to cartel;