<?php
class DBConfig {
     
    public static $MYSQL_MASTER_SERVER = array(
        'host'     => '127.0.0.1',
        'username' => 'root',
        'database' => '3dying',
        'password' => '123456',
        'port'     => 3307,
    ); 
    public static $MYSQL_SLAVER_SERVER = array(
        'host'     => '127.0.0.1',
        'username' => '3dying',
        'database' => 'diary',
        'password' => '',
        'port'     => 3306,
    );
    
    public static $REDIS = array(
        'host' => '127.0.0.1',
        'port' => 6379,
    );
}
