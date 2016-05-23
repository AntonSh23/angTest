<?php

class SupportData
{

    function addNewProduct() {

        $res = ANGAPI::query_select("INSERT INTO `products` (`name`, `price`, `description`)
                                      VALUES ('".ANGAPI::$requestParams['product']['name']."',
                                              '".ANGAPI::$requestParams['product']['price']."',
                                              '".ANGAPI::$requestParams['product']['description']."')");
        ANGAPI::$response = $res;
        ANGAPI::returnResponse();
    }

    function getAllProducts(){
        $res = ANGAPI::query_select('SELECT id, name, price, description FROM products');
        ANGAPI::$response = $res;
        ANGAPI::returnResponse();
    }


    function updateUserData(){
        $res = ANGAPI::query_execute("UPDATE `users` SET `uname`='".ANGAPI::$requestParams['newData']['name']."',
                                                  `usecondname`='".ANGAPI::$requestParams['newData']['surname']."',
                                                  `uemail`='".ANGAPI::$requestParams['newData']['email']."',
                                                  `utel`='".ANGAPI::$requestParams['newData']['tel']."'
                                                   WHERE `id`='".ANGAPI::$requestParams['oldData']['id']."';");
        ANGAPI::$response = $res;
        ANGAPI::returnResponse();
    }


    function changePassword(){
        $res = ANGAPI::query_execute("UPDATE `users` SET `upassword`='".md5(ANGAPI::$requestParams['newData']['password'])."'
                                                   WHERE `id`='".ANGAPI::$requestParams['oldData']['id']."';");
        ANGAPI::$response = $res;
        ANGAPI::returnResponse();
    }
}