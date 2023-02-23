<?php

require_once('/var/www/classes/autoload.php');

if (isset($_GET['all'])) {

Good::getGoods();

}

if (isset($_GET['allcategories'])) {

Categories::getAllCategories();

}

if (isset($_GET['category_id'])) {

CategoryId::getAllCategoriesId();

} 

if (isset($_GET['category'])) {

Category::getCategory();

}

if (isset($_GET['sale'])) {

Sale::getSale();

}


if (isset($_GET['review'])) {

Review::reviews();

}


if (isset($_GET['reviewGet'])) {

Review::reviewsGet();

}

if (isset($_GET['logIn'])) {

include_once 'auth/login/index.php';

}

if (isset($_GET['createUser'])) {

include_once 'auth/signup/index.php';
    
}