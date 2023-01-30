-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS goods;
CREATE TABLE goods (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  description varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  category varchar(100) NOT NULL,
  price int NOT NULL,
  consist varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO goods (id, name, description, category, price, consist) VALUES
(1,  'На Вечеринку!',  'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',  'Латексные шары',  3699,  '6 латексных шаров металлик 30 см \"Ассорти\"  4 латексных прозрачных шара 30 см с разноцветным конфетти'),
(2,  'На День Рождения бирюзовый',  'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',  'Фольгированные шары',  3799,  '1 фольгированная цифра  на Ваш выбор 2 фольгированных звезды 46 см бирюзового и розового цвета'),
(3,  'Розовое золото',  'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',  'Латексные шары',  3299,  '4 латексных шара Розовое золото металлик 30 см 4 латексных прозрачных шара 30 см с конфетти розовое золото 3 латексных шара белый металлик 30 см'),
(4,  'Пламенное сердце',  'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',  'Латексные шары',  2999,  '9 латексных красных сердец 30 см'),
(5,  'Мужчине',  'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',  'Латексные шары',  2999,  '3 латексных камуфляжных шара 30 см 3 латексных прозрачных шара 30 см с золотым конфетти');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id bigint NOT NULL,
  username varchar(50) DEFAULT NULL,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO users (id, username, first_name, last_name) VALUES
(223054377,  'timondecathlon',  'Timon',  'Decathlon'),
(293833623,  'Baku',  'Baku',  'Baku');

-- 2023-01-30 18:48:13