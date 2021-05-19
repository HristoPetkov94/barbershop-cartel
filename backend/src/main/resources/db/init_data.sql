--users
INSERT INTO public.users (id, email, password) VALUES (1, 'admin@cartel.bg', '$2a$10$rgdB9nnkUAENiG3swLgIkOk0c7rcKxH5n3twRS529vyil8X/J6Zxq');


-- barbers
INSERT INTO public.barbers (id, description, facebook, first_name, instagram, last_name, picture) VALUES (1, 'Инженер-Архитектът под чиито надзор се изпълнява този проект.', null, 'Пламен', null, 'Маринов', '/api/images/default-profile-image.png');
INSERT INTO public.barbers (id, description, facebook, first_name, instagram, last_name, picture) VALUES (2, 'Инженер-Предприемач, който ще доведе до край този проект.', null, 'Христо', null, 'Петков', '/api/images/default-profile-image.png');

-- services
INSERT INTO public.services (id, description, picture, service_title) VALUES (1, 'Модерна прическа и стил на мъжете от нашите професионални Барбъри / Modern man''s haircut and styling from our professional Barbers', '/api/images/default-service-image.png', 'Подстригване / Haircurt');
INSERT INTO public.services (id, description, picture, service_title) VALUES (2, 'Подстригване и стайлинг, корекция на брадата Ви. / Haircut and Styling, correction of your beard', '/api/images/default-service-image.png', 'Комплекс / Complex');
INSERT INTO public.services (id, description, picture, service_title) VALUES (3, 'Професионална прическа за деца до 5год. / Professional hairstyle for children up to 5 years
', '/api/images/default-service-image.png', 'Детско постригване / Children''s haircut');
INSERT INTO public.services (id, description, picture, service_title) VALUES (4, 'Професионален дизайн на брада или бръснене. / Professional beard design or a nice shave.', '/api/images/default-service-image.png', 'Beard / Shaving - Брада / Бръснене');

-- assignments
INSERT INTO public.assignments (id, duration, price, barber_id, service_id) VALUES (1, 30, 15, 1, 1);
INSERT INTO public.assignments (id, duration, price, barber_id, service_id) VALUES (2, 60, 23, 1, 2);
INSERT INTO public.assignments (id, duration, price, barber_id, service_id) VALUES (3, 30, 10, 2, 3);
INSERT INTO public.assignments (id, duration, price, barber_id, service_id) VALUES (4, 30, 15, 2, 4);
INSERT INTO public.assignments (id, duration, price, barber_id, service_id) VALUES (5, 60, 23, 2, 2);

-- general_configuration
INSERT INTO public.general_configuration (id, address, appointment_success_message, city, front_page_message, language, phone_number) VALUES (1, '', '', '', '', 1, '');
INSERT INTO public.general_configuration (id, address, appointment_success_message, city, front_page_message, language, phone_number) VALUES (2, '', '', '', '', 0, '');

-- email_details
INSERT INTO public.email_details (id, email_type, email_from, language, subject, text) VALUES (1, 0, 'admin@cartel.bg', 0, null, null);
INSERT INTO public.email_details (id, email_type, email_from, language, subject, text) VALUES (2, 1, 'admin@cartel.bg', 0, null, null);
INSERT INTO public.email_details (id, email_type, email_from, language, subject, text) VALUES (3, 0, 'admin@cartel.bg', 1, null, null);
INSERT INTO public.email_details (id, email_type, email_from, language, subject, text) VALUES (4, 1, 'admin@cartel.bg', 1, null, null);

-- social_media
INSERT INTO public.social_media (id, facebook, instagram) VALUES (1, null, null);
