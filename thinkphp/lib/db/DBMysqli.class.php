<?php
require_once CONFIG . '/DBConfig.class.php';

class DBMysqli {
    public static $_INSTANCE = NULL;
    private static $_CONFIG  = NULL;
    
    private $_link    = NULL;
    private $_queryId = NULL;
    
    public static function getInstance($config = null) {
        if (self::$_INSTANCE == null) {
            self::$_INSTANCE = new self($config);
        }
        return self::$_INSTANCE;
    }
    
    private function __construct($config = null) {
        self::$_CONFIG = empty($config) ? DBConfig::$MYSQL_MASTER_SERVER : $config;
        try {
		
            $this->_link = new mysqli(self::$_CONFIG['host'], self::$_CONFIG['username'], self::$_CONFIG['password'], 
                self::$_CONFIG['database'], self::$_CONFIG['port'] ? intval(self::$_CONFIG['port']) : 3306);
            if ($this->_link) {
                $this->_link->set_charset('utf8');
            }
        } catch (Exception $e) {
            Log::error($e->getMessage() . mysqli_connect_errno(), 'Mysqli');
        }
        
    }
    
    private function _checkConnect($sql) {
        if (!$this->_link) {
            Log::getError('mysqli link is empty', 'Mysqli');
            return false;
        }
        $this->_queryId = $this->_link->query($sql);
        if ($this->_queryId === false) {
            Log::getError('SQLError: ' . $sql, 'Mysqli');
            return false;
        }
    }
    
    private function _free() {
        $this->_queryId->free_result();
        $this->_queryId = null;
    }
    
    public function getAll($sql) { 
        $this->_checkConnect($sql);
        $result = array();
        $num = $this->_queryId->num_rows;
        while($re = $this->_queryId->fetch_assoc()) {
            $result[] = $re;
        }
        $this->_queryId->data_seek(0);
        $this->_free();
        
        return $result;
    }
    
    public function getRow($sql) {
        $this->_checkConnect($sql);
        $result = array();
        $num = $this->_queryId->num_rows;
        $result = $this->_queryId->fetch_assoc();
        $this->_queryId->data_seek(0);
        $this->_free();
        return $result;
    }
    
    public function insertAndGetId($sql) {
        $this->_checkConnect($sql);
        return $this->_link->insert_id;
    }
    
    public function query() {
    }
    
    public function execute($sql) {
        $this->_checkConnect($sql);
        return $this->_link->affected_rows;
    }
    
    public function close() {
        if ($this->_link){
            $this->_link->close();
        }
        $this->_link = null;
    }
}