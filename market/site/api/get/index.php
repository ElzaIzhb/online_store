<?php

 $host = 'mysql';
 $db   = 'shop';
 $user = 'root';
 $pass = 'test123';
 $charset = 'utf8';

 $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
 $opt = [
     PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
     PDO::ATTR_EMULATE_PREPARES   => false,
 ];
 //создание объекта для подключения к БД
 $pdo = new PDO($dsn, $user, $pass, $opt);
