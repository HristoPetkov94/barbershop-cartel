ALTER TABLE email_details
DROP COLUMN subject,
DROP COLUMN text,
ADD COLUMN subject json default '{}',
ADD COLUMN text json default '{}';

-- delete the rows.
DELETE FROM email_details;
-- insert blank entries for each email type.
INSERT INTO public.email_details (id, email_type, email_from, subject, text) VALUES (1, 0, 'admin@cartel.bg', '{"en": "Test Subject", "bg": "Пробно заглавие"}', '{"en": "Test message", "bg": "Пробен текст"}');
INSERT INTO public.email_details (id, email_type, email_from, subject, text) VALUES (2, 1, 'admin@cartel.bg', '{"en": "Test Subject", "bg": "Пробно заглавие"}', '{"en": "Test message", "bg": "Пробен текст"}');