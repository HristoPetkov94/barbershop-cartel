ALTER TABLE general_configuration
ADD COLUMN working_time_info json default '{}';

UPDATE general_configuration SET working_time_info = '{"en": "", "bg": ""}' WHERE id = 1;