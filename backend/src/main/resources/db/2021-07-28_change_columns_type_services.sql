ALTER TABLE services
DROP COLUMN service_title,
DROP COLUMN description,
ADD COLUMN service_title json default '{}',
ADD COLUMN description json default '{}';