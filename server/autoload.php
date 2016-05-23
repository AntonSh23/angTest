<?php

spl_autoload_register(
    function($className) {
        foreach(ANGAPI::$config['autoload'] as $dir) {
            if(file_exists($dir . '/' . $className . '.php')){
                include $dir . '/' . $className . '.php';
                return;
            }
            else continue;
        }
        ANGAPI::$response['action'] = 'undefined';
        ANGAPI::returnResponse();
        die;
    }
);