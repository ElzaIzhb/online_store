<?php
//разрешаю запросы из браузера
header('Access-Control-Allow-Origin: *');

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

//получение всех данных из таблицы goods
if (isset($_GET['all'])) {
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

}

//получение всех данных из таблицы categories
if (isset($_GET['allcategories'])) {
    //достаём данные из бд
    $sql = "SELECT * FROM categories";
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
    
    }

   
//получение данных по отдельным категориям из сджойненных таблиц goods и categories

if (isset($_GET['category_id'])) {
    $catId = $_GET['category_id'];
    //достаём данные из бд
    $sql = "SELECT * FROM goods AS g
                LEFT JOIN categories AS c
                ON g.category = c.category
                WHERE category_id = $catId";
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
    
    }
    

//строка фильтрации
$filterStr = '';

//строка фильтрации
if (isset($_GET['category'])) {
    //получаем название таблицы из GET параметра
    $table = $_GET['table'];
    $category = $_GET['category'];
    $filterStr = $filterStr . " AND category LIKE '%$category%' ";


    //СЧИТЫВАНИЕ ДАННЫХ

//достаём данные из БД
$sqltext_category = "SELECT * FROM " . $table . ' WHERE id > 0 ' . $filterStr;

$result_category = $pdo->query($sqltext_category);

//отрезаем по одной строчке из результата и показываем каждую в виде ассоц массива
$category = [];
while($row = $result_category->fetch()) {

    $category[] = $row;

}


//кодируем и выводим на экран
$data_category = json_encode($category, JSON_UNESCAPED_UNICODE);

print_r($data_category); 
}



?>