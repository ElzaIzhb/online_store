<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

 if (User::exists()) {
    echo json_encode("Юзер уже есть", JSON_UNESCAPED_UNICODE);
    exit(0);
    
 }

User::createUser();

$res = json_encode("Юзер записан", JSON_UNESCAPED_UNICODE);

echo $res;


