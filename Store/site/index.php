<?php

$host = 'mysql';
$db   = 'inordic';
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

//достаём данные из бд
$sql = "SELECT * FROM goods";
$result = $pdo->query($sql);

//создаём пустой массив
$array = array();

//с помощью цикла перебираем каждую строчку массива с данными из бд
while($row = $result->fetch()){

    //записываем строчки в пустой массив
    array_push($array, $row);
}

//кодируем данные в json
$data = json_encode($array, JSON_UNESCAPED_UNICODE);

print_r($data); 
?>