-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category_img` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `categories` (`category_id`, `category`, `category_img`) VALUES
(1,	'Латексные шары',	'https://ir.ozone.ru/s3/multimedia-p/wc1000/6015837217.jpg'),
(2,	'Фольгированные шары',	'http://arkidutti.ru/image/cache/catalog/product/mimodutti-heart-mint2-600x600.jpg'),
(3,	'Цифры',	'https://megashar-nsk.ru/images/Dlya-detei/gelievue_sharu102.jpg'),
(4,	'3D Сферы',	'https://goo.su/HcfRJ'),
(5,	'Хромовые шары',	'https://ae04.alicdn.com/kf/H4ccf2618aab449c3bb01802f1076eff97/1-50-5-10.jpg_640x640.jpg');

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` int NOT NULL,
  `consist` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `photo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sale` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `goods` (`id`, `name`, `description`, `category`, `price`, `consist`, `photo`, `sale`) VALUES
(1,	'На Вечеринку!',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	3699,	'6 латексных шаров металлик 30 см \"Ассорти\"  4 латексных прозрачных шара 30 см с разноцветным конфетти',	'https://ir.ozone.ru/s3/multimedia-p/wc1000/6015837217.jpg',	7),
(2,	'На День Рождения бирюзовый',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Фольгированные шары',	3799,	'1 фольгированная цифра  на Ваш выбор 2 фольгированных звезды 46 см бирюзового и розового цвета',	'http://arkidutti.ru/image/cache/catalog/product/mimodutti-heart-mint2-600x600.jpg',	NULL),
(3,	'Розовое золото',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	3299,	'4 латексных шара Розовое золото металлик 30 см 4 латексных прозрачных шара 30 см с конфетти розовое золото 3 латексных шара белый металлик 30 см',	'https://cdn1.ozone.ru/s3/multimedia-k/6125244884.jpg',	7),
(4,	'Пламенное сердце',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	2999,	'9 латексных красных сердец 30 см',	'https://shariki-v-butovo.ru/image/cache/catalog/shariki-pod-potolok/shar-lateks-serdce-krasnoe-700x700.jpg',	7),
(5,	'Мужчине',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	2999,	'3 латексных камуфляжных шара 30 см 3 латексных прозрачных шара 30 см с золотым конфетти',	'http://i-am-balloon.by/image/cache/catalog/logos/475-1500x1500.jpg',	7),
(6,	'Шар цифра напольная ',	'Высота 81см. Наполняется воздухом',	'Цифры',	3550,	'10 шаров цифр',	'https://zatey.ru/upload/iblock/7e0/u8vxtl3y5d7uaqkkhhepp6w7mhfjazlj/tsifry_i_chisla_shar_tsifra_9_66sm_blue_1207_3686.jpg',	8),
(7,	'Шар 3D ЗВЕЗДА 64см Составная Light Pink',	'Объемная фольгированная звезда нежно розового цвета. Комплект содержит 13 элементов (конусов). Каждый элемент имеет встроенный клапан и надувается воздухом. ',	'3D Сферы',	500,	'Надутые элементы (12 штук) необходимо попарно связать между собой за хвосты и затем соединить пары друг с другом таким образом, чтобы получилась звезда. В комплект добавлен запасной, 13й элемент.',	'https://zatey.ru/upload/resize_cache/webp/iblock/478/kfs2e3l6r4eal7afjlvstqnhx2kmgsht/rozovaya_shar_3d_zvezda_64sm_sostavnaya_light_pink_1209_0439.webp',	NULL),
(8,	'Шары Сердце 30см хром ассорти В.Затея',	'Шары в форме объемных сердец зеркально-блестящих оттенков (хром).',	'Хромовые шары',	562,	'Цвета: серебро, золото, розовый, розовое золото, синий, зеленый.',	'https://zatey.ru/upload/resize_cache/webp/iblock/3a3/dsf3kyodw3m7h3ofdt1uv2lrpvs2beoa/goryachie_serdtsa_shary_serdtse_30sm_khrom_assorti_v_zateya_1105_0440.webp',	5);

-- 2023-02-06 09:43:37
