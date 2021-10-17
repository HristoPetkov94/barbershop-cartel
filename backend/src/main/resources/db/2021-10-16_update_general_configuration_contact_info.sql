ALTER TABLE general_configuration
DROP COLUMN appointment_success_message,
DROP COLUMN city,
DROP COLUMN address,
DROP COLUMN front_page_message,
DROP COLUMN language,
ADD COLUMN appointment_success_message json default '{}',
ADD COLUMN city json default '{}',
ADD COLUMN address json default '{}';

DELETE FROM general_configuration WHERE id = 2;
UPDATE general_configuration
SET appointment_success_message = '{"en": "", "bg": ""}',
    city = '{"en": "", "bg": ""}',
    address = '{"en": "", "bg": ""}'
WHERE id = 1;