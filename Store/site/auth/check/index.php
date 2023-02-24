<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

if (User::check()) {
    $response = [
        'success' => true
    ];
} else {
    $response = [
        'success' => false,
        'error' => 'юзер не авторизован'
    ];
}

print(json_encode($response, JSON_UNESCAPED_UNICODE));

