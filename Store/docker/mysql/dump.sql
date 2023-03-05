-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `e_mail` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_hash` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `adress` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `Users` (`id`, `name`, `e_mail`, `login`, `password`, `user_hash`, `phone`, `adress`) VALUES
(1,	'Родион',	'rodion@bk.ru',	'rodion',	'strong',	NULL,	NULL,	NULL),
(2,	'n',	'n@ya.ru',	'nn',	'1234',	NULL,	NULL,	NULL),
(7,	'nnn',	'dshzrsnzd',	'xfdhnfngf',	'shCpKRzWWVSCI',	NULL,	NULL,	NULL),
(12,	'test2',	'test22',	'uiioooooo',	'shPcCgnGWTEA2',	NULL,	NULL,	NULL),
(14,	'test3',	'test3',	'kkkkkk',	'sh/97BLdMVV8Y',	NULL,	NULL,	NULL),
(15,	'555',	'555',	'555',	'in2otoFMr2qlQ',	NULL,	NULL,	NULL),
(16,	'555',	'555',	'555',	'in2otoFMr2qlQ',	NULL,	NULL,	NULL),
(17,	'555',	'555',	'555',	'in2otoFMr2qlQ',	NULL,	NULL,	NULL),
(18,	'555',	'555',	'555',	'in2otoFMr2qlQ',	NULL,	NULL,	NULL),
(19,	'555',	'555',	'555',	'in2otoFMr2qlQ',	NULL,	NULL,	NULL),
(20,	'555',	'555',	'555',	'in2otoFMr2qlQ',	NULL,	NULL,	NULL),
(21,	'dgnghdmyg',	's5r',	'srthrtjn',	'inMemIhVJArEE',	NULL,	NULL,	NULL),
(22,	'пвоаоа',	'testest',	'чарар',	'inMJtY1rNvcTI',	NULL,	NULL,	NULL),
(23,	'xfbb',	'yyy',	'dbxdf',	'inuQi87XMNiac',	NULL,	NULL,	NULL),
(24,	'ачпва',	'test55',	'авч',	'inpfdBMpN./GA',	NULL,	NULL,	NULL),
(25,	'gngn',	'test56',	'gfdnxgf',	'inRH0.4x6/7UQ',	NULL,	NULL,	NULL),
(26,	'gfxfg',	'test57',	'fxbf',	'innzwIUP3XZHg',	NULL,	NULL,	NULL),
(29,	'test',	'test',	'ewferf',	'sh48AF4SplA/Q',	'shLSdxGW6z6/Q',	'24224244',	NULL),
(31,	'1',	'1',	'1',	'shoAN5qc.L4Fs',	'shsxxXSvYpUHU',	'123113131',	'Арбат');

DROP TABLE IF EXISTS `basket`;
CREATE TABLE `basket` (
  `goods_id` int unsigned NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `goods_price` mediumint unsigned NOT NULL,
  `goods_img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `goods_sale` tinyint unsigned DEFAULT NULL,
  `quantity` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`goods_id`),
  CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category_img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` int unsigned NOT NULL,
  `consist` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `photo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sale` tinyint unsigned DEFAULT NULL,
  `quantity` mediumint unsigned DEFAULT NULL,
  `popularity` int DEFAULT NULL,
  `rating` decimal(2,1) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `good` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `review` varchar(600) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `pass` char(60) NOT NULL,
  `verified` enum('N','Y') NOT NULL DEFAULT 'N',
  `created_at` timestamp NOT NULL,
  `confirmation_token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- 2023-03-05 17:53:40