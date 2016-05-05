<?php
class DBRedis {

    private static $_INSTANCE = NULL;//redis链接实例
    private static $_CONNECT  = 0;//0未进行过链接，1链接失败，other链接成功
    private static $_CONFIG  = NULL;
    
    private static function _connect() {
        
        if (self::$_CONNECT == 0) {
            //检查端口是否可用
            if (!self::_checkPort()) {
                
                self::$_CONNECT = 1;
                return false;
            }
            
            self::$_INSTANCE = new Redis();
            self::$_INSTANCE->connect(DBConfig::$REDIS['host'], DBConfig::$REDIS['port']);
            if (isset(self::$_INSTANCE->socket) && is_resource(self::$_INSTANCE->socket)){
                self::$_CONNECT = 2;
                return true;
            } else {
                self::$_CONNECT = 1;
                return false;
            }
        } elseif (self::$_CONNECT == 1) {
            return false;
        }
        return true;
    }
    
    /**
     * 
     * @brief 
     * @param string $key
     * @param string $value
     * @param int $time 秒
     */
    public static function set($key, $value, $time = null) {
        if (!self::_connect()) return false;
        if (!$time) {
            return self::$_INSTANCE->set($key, $value);
        } else {
            return self::$_INSTANCE->setex($key, $time, $value);
        }
    }
    
    public static function get($key) {
        if (!self::_connect()) return false;
        return self::$_INSTANCE->get($key);
    }
    
    /**
     * @brief删除指定key的值返回已经删除key的个数（长整数）
     * @param array $key
     */
    public static function delete($key) {
        if (!self::_connect()) return false;
        return self::$_INSTANCE->delete($key);
    }
    
    /**
     * @brief 在名称为key的list左边（头）添加一个值为value的 元素
     * @param string $key
     * @param string $value
     */
    public static function lPush($key, $value) {
        if (!self::_connect()) return false;
        return self::$_INSTANCE->lPush($key, $value);
    }

    /**
     * @brief 在名称为key的list右边（尾）添加一个值为value的 元素
     * @param string $key
     * @param string $value
     */
    public static function rPush($key, $value) {
        if (!self::_connect()) return false;
        return self::$_INSTANCE->rPush($key, $value);
    }
    
    /**
     * @brief 返回名称为key的list中start至end之间的元素（end为 -1 ，返回所有）
     * @brief $time list时间 0 永久 不限制 s
     */
    public static function lRange($key, $start = 0, $end = -1, $time = 600) {
        if (!self::_connect()) return false;
        $list = 'list_' . $key;
        if ($time == 0) {
            return self::$_INSTANCE->lRange($key, $start, $end);
        } else {
            if (self::get($list)) {//没有过期
                return self::$_INSTANCE->lRange($key, $start, $end);
            } else {//过期或者不存在
                self::delete($key);//删除列表
                self::set($list, 1, $time);
                return false;
            }
        }
    }
    
    /**
     * @brief 截取名称为key的list，保留start至end之间的元素
     * 
     */
    public static function lTrim($key, $start = 0, $end) {
        if (!self::_connect()) return false;
        return self::$_INSTANCE->lTrim($key, $start, $end);
    }
    
    private static function _checkPort() {
        $t=getMicrosecond();
        try {
            $fp = fsockopen(DBConfig::$REDIS['host'], DBConfig::$REDIS['port'], $errno, $errstr, 0.1);
        } catch (Exception $e) {
            return false;
        }
   
        if ($fp) {
            fclose($fp); 
            return true;
        }
        
        return false;
       
    }
}