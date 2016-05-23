<?php

class Identity
{

    public function checkIdentity()
    {
        if (!isset(ANGAPI::$requestParams['login']) || !isset(ANGAPI::$requestParams['password']))
            ANGAPI::showError(__METHOD__, 'No authentication data!');

        $res = ANGAPI::query_select("SELECT id
                FROM users
                WHERE uemail = '" . ANGAPI::$requestParams['login'] .
            "' AND upassword = '" . md5(ANGAPI::$requestParams['password']) . "'");

        if (empty($res)) {
            ANGAPI::$response['access'] = 'denied';
            ANGAPI::returnResponse();
        }
    }

    public function getUserInfo(){
        $res = ANGAPI::query_select("SELECT u.id, u.uname, u.usecondname, u.uemail, u.upassword
                FROM users u
                WHERE u.uemail = '" . ANGAPI::$requestParams['login'] .
            "' AND u.upassword = '" . md5(ANGAPI::$requestParams['password']) . "'");
        ANGAPI::$response['userdata'] = $res;
        ANGAPI::returnResponse();
    }


}