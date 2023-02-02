-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `sale` tinyint DEFAULT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category_id` int unsigned NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `consist` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `photo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `goods` (`sale`, `id`, `name`, `description`, `category_id`, `category`, `price`, `consist`, `photo`) VALUES
(7,	1,	'На Вечеринку!',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	1,	'Латексные шары',	3699,	'6 латексных шаров металлик 30 см \"Ассорти\"  4 латексных прозрачных шара 30 см с разноцветным конфетти',	'https://ir.ozone.ru/s3/multimedia-p/wc1000/6015837217.jpg'),
(NULL,	2,	'На День Рождения бирюзовый',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	2,	'Фольгированные шары',	3799,	'1 фольгированная цифра  на Ваш выбор 2 фольгированных звезды 46 см бирюзового и розового цвета',	'http://arkidutti.ru/image/cache/catalog/product/mimodutti-heart-mint2-600x600.jpg'),
(7,	3,	'Розовое золото',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	1,	'Латексные шары',	3299,	'4 латексных шара Розовое золото металлик 30 см 4 латексных прозрачных шара 30 см с конфетти розовое золото 3 латексных шара белый металлик 30 см',	'https://cdn1.ozone.ru/s3/multimedia-k/6125244884.jpg'),
(7,	4,	'Пламенное сердце',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	1,	'Латексные шары',	2999,	'9 латексных красных сердец 30 см',	'https://shariki-v-butovo.ru/image/cache/catalog/shariki-pod-potolok/shar-lateks-serdce-krasnoe-700x700.jpg'),
(7,	5,	'Мужчине',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	1,	'Латексные шары',	2999,	'3 латексных камуфляжных шара 30 см 3 латексных прозрачных шара 30 см с золотым конфетти',	'http://i-am-balloon.by/image/cache/catalog/logos/475-1500x1500.jpg');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- 2023-02-02 17:09:26