insert into social_media (id, facebook, instagram) values (2, '', '');
insert into social_media (id, facebook, instagram) values (3, '', '');

UPDATE social_media SET facebook = 'https://cartel.bg', instagram = 'https://cartel.bg';

UPDATE general_configuration set social_media_id = 1;

UPDATE barbers set social_media_id = 2 where id=1;
UPDATE barbers set social_media_id = 3 where id=2;
