<?php

namespace AbstractClasses;

abstract class Unit 
{
    public static function getGoods() {

        $pdo = \Connection::getConnection();

        //получение всех данных из таблицы goods

            //достаём данные из бд
            $sql = "SELECT * FROM " . static::TABLE . ";";
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




    public static function getAllCategories() {

    $pdo = \Connection::getConnection();

    //получение всех данных из таблицы categories

        //достаём данные из бд
        $sql = "SELECT * FROM " . static::TABLE . ";";
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




    public static function getAllCategoriesId() {

    $pdo = \Connection::getConnection();

    //получение данных по отдельным категориям из сджойненных таблиц goods и categories


        $catId = $_GET['category_id'];
        //достаём данные из бд
        $sql = "SELECT * FROM " . static::TABLE . " AS g
                    LEFT JOIN " . static::TABLE2 . " AS c
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

   

    public static function getSale() {

        $pdo = \Connection::getConnection();
        //получение данных для акций ПОКА НЕ РАБОТАЕТ

    
            //достаём данные из бд
            $sql = "SELECT * FROM " . static::TABLE . " AS g
                        LEFT JOIN " . static::TABLE2 . " AS c
                        ON g.category = c.category
                        WHERE sale  IS NOT NULL";

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

    public static function reviews() {

        $json = file_get_contents('php://input');

        print_r ($json);

        $pdo = \Connection::getConnection();
    
        //запрос на создание пользователя
        $username = $_POST['username'];
        $review = $_POST['review'];
    
        $sql_ins = " INSERT INTO " . static::TABLE . " (`username`, `review`) VALUES('$username', '$review') ";
        
        $pdo->query($sql_ins);

    }

    public static function reviewsGet() {

        $pdo = \Connection::getConnection();

        //достаём данные из бд
        $sql = "SELECT * FROM " . static::TABLE;
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


}