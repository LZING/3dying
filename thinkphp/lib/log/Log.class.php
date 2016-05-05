<?php
class Log {
    private static $_ERROR = array();
    private static $_WARMING = array();
    
    public static function error($message = '', $category = '') {
        self::$_ERROR[] = array($message, $category);
    }
    
    public static function warming($message = '', $category) {
        self::$_WARMING[] = array($message, $category);
    }
    
    public static function getError() {
        return self::$_ERROR;
    }
    
    public static function getWarming() {
        return self::$_WARMING;
    }
    
    public static function getAll() {
        return array(
            'error'   => self::$_ERROR,
            'warming' => self::$_WARMING,
        );
    }
    
    /**
     * 处理log日志
     * Enter description here ...
     */
    public static function doLog() {
    }
}