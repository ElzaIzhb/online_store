<?php

//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

$result = User::logIn();

// echo 'penis' . $result;

// if ($result !== null) {
//     $response = [
//         'success' => true,
//         'token' => $result
//     ];
// } else {
//     $response = [
//         'success' => false,
//         'error' => 'неверный логин или пароль'
//     ];
// }

// echo json_encode($response, JSON_UNESCAPED_UNICODE);