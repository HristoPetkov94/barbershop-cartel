-- barbers
UPDATE barbers
SET first_name = '{"en": "Plamen", "bg": "Пламен"}',
    last_name = '{"en": "Marinov", "bg": "Маринов"}',
    description = '{"en": "The Engineer-Architect under whose supervision this project is implemented.", "bg": "Инженер-Архитектът под чиито надзор се изпълнява този проект."}'
WHERE id = 1;

UPDATE barbers
SET first_name = '{"en": "Hristo", "bg": "Христо"}',
    last_name = '{"en": "Petkov", "bg": "Петков"}',
    description = '{"en": "The Engineer-Entrepreneur who will get this project to an end.", "bg": "Инженер-Предприемач, който ще доведе до край този проект."}'
WHERE id = 2;

-- services
UPDATE services
SET service_title = '{"en": "Haircurt", "bg": "Подстригване"}',
    description = '{"en": "Modern man''s haircut and styling from our professional Barbers.", "bg": "Модерна прическа и стил на мъжете от нашите професионални Барбъри."}'
WHERE id = 1;

UPDATE services
SET service_title = '{"en": "Complex", "bg": "Комплекс"}',
    description = '{"en": "Haircut and Styling, correction of your beard.", "bg": "Подстригване и стайлинг, корекция на брадата Ви."}'
WHERE id = 2;

UPDATE services
SET service_title = '{"en": "Children''s haircut", "bg": "Детско постригване"}',
    description = '{"en": "Professional hairstyle for children up to 5 years.", "bg": "Професионална прическа за деца до 5год."}'
WHERE id = 3;

UPDATE services
SET service_title = '{"en": "Beard / Shaving", "bg": "Брада / Бръснене"}',
    description = '{"en": "Professional beard design or a nice shave.", "bg": "Професионален дизайн на брада или бръснене."}'
WHERE id = 4;