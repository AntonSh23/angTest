<?php

error_reporting(E_ERROR);
ANGAPI::init();

class ANGAPI
{
    static $config;
    static $response;
    static $requestParams;
    static $db;

    static function init() {
        session_start();
        require_once('config.php');
        require_once('autoload.php');

        if($_REQUEST == '' || empty($_REQUEST) || !isset($_REQUEST['action'])) self::showError(__METHOD__, 'Wrong request!');
        self::$requestParams = $_REQUEST;
        foreach(self::$requestParams as $key => $value) if( json_decode($value) != null ) self::$requestParams[$key] = json_decode($value, true);
        self::dbConnect();
        $module = substr($_REQUEST['action'], 0, strpos($_REQUEST['action'],'/'));
        $action = substr($_REQUEST['action'], strrpos($_REQUEST['action'],'/') + 1);

        $m = new $module;
        $m->$action();
        unset($m);
        self::returnResponse();
    }

    // base mathods for return response to client ----------------------------------------------------------------------
    static function showError($place = __CLASS__, $problem = ' undefined error', $system_message = ' none ') {
        self::$response['serverError']['place'] = $place;
        self::$response['serverError']['problem'] = $problem;
        self::$response['serverError']['message'] = $system_message;
        echo json_encode(self::$response);
        die;
    }

    static function returnResponse() {
        echo json_encode(self::$response);
        die;
    }

    // simple requested fields validator -------------------------------------------------------------------------------
    /*
     * Input parameter:
     * $fields = [
     *      'required' => [ <<strings>> ],
     *      'optional' => [
     *          [ <<strings>> ]
     *          [ <<strings>> ]
     *          ...
     *          [ <<strings>> ]
     *      ]
     * ]
     * */
    static function requiredFieldsValidate($fields = []) {

        $validationResult = true;

        if(in_array('required', $fields)) if( count($fields['required']) != count(array_intersect($fields['required'], ANGAPI::$requestParams)) ) $validationResult = false;

        if(in_array('optional', $fields)) {
            $anyone_is_correct = false;
            foreach($fields['optional'] as $opt_fields) {
                if( count($opt_fields) == count(array_intersect($opt_fields, ANGAPI::$requestParams)) ) {
                    $anyone_is_correct = true;
                    break;
                }
            }
            if(!$anyone_is_correct) $validationResult = false;
        }

        if(!$validationResult) {
            ANGAPI::$response['requestResult'] = [
                'status' => 'error',
                'time_assigned' => 'Some requested fields are empty or doesn`t exist',
            ];
            ANGAPI::returnResponse();
        }
    }

    // base methods for database ---------------------------------------------------------------------------------------
    private function dbConnect() {
        $connSTR = 'mysql:host=' . self::$config['DB']['hostname'] . /*':' . WMSAPI::$config['DB']['hostport'] .*/ ';' .
            'dbname=' . self::$config['DB']['database'] .';' .
            'charset=' . self::$config['DB']['charset'];
        try {
            self::$db = new PDO($connSTR, self::$config['DB']['user'], self::$config['DB']['password'],
                array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => false));
        } catch (PDOException $e) {
            self::showError(__METHOD__, $connSTR, $e->getMessage());
        }
    }

    static function query_select($queryStr = '') {
        if($queryStr == '' || strpos($queryStr, 'INSERT') || strpos($queryStr, 'UPDATE'))
            self::showError(__METHOD__, $queryStr, ' Wrong method using');
        try {
            self::$db->quote($queryStr);
            $result = self::$db->prepare( $queryStr );
            $result->execute();
            $dbArray = $result->fetchAll(PDO::FETCH_ASSOC);
            $result->closeCursor();
            return $dbArray;
        } catch (PDOException $e) {
            self::showError(__METHOD__, $queryStr, $e->getMessage());
        }
    }

    static function query_execute($queryStr = '') {
        try {
            self::$db->quote($queryStr);
            $result = self::$db->prepare( $queryStr );
            return $result->execute();
        } catch (PDOException $e) {
            self::showError(__METHOD__, $queryStr, $e->getMessage());
        }
    }
}