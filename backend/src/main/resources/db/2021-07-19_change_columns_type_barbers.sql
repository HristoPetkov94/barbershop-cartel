ALTER TABLE barbers
DROP COLUMN first_name,
DROP COLUMN last_name,
DROP COLUMN description,
ADD COLUMN first_name json default '{}',
ADD COLUMN last_name json default '{}',
ADD COLUMN description json default '{}';