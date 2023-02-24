<?php

include "config_db.php";

 /*
  * Создаем переменные со значениями, которые были получены с $_POST
  */
 
 $name = $_POST['name'];
 $description = $_POST['description'];
 $price = $_POST['price'];
 $sale = $_POST['sale'];
 $consist = $_POST['consist'];
 $category = $_POST['category'];
 
 /*
  * Делаем запрос на добавление новой строки в таблицу products
  */
 
 mysqli_query($db,"INSERT INTO `goods` (`id`, `name`, `description`, `category`, `price`, `consist`, `photo`, `sale`) VALUES (NULL, '$name', '$description', '$category', '$price', '$consist', NULL, '$sale')");


 
 /*
  * Переадресация на страницу c товарами
  */

//   echo $name . "<br>";
//   echo $description . "<br>";
//   echo $price . "<br>";
//   echo $sale . "<br>";
//   echo $consist . "<br>";
//   echo $category . "<br>";
 
header('Location: /products.php');