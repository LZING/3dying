<?php
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
include_once THINKPHP . '/lib/core/SqlBuilderNamespace.class.php';

class UserNamespace {

    public static function savestl($name, $image,$stl,$type) {
        $sql = "INSERT INTO `print`(`type`, `name`, `image`,`stl`, `userid`, `ctime`)VALUES ".
            "('". $type ."','".$name."','".$image."','".$stl."','". intval($_SESSION['user']['id']) ."','".time()."')";
        return DBMysqli::getInstance()->insertAndGetId($sql);
    }

    public static function getprint($id){
        $sql = "SELECT * FROM `print` WHERE `id` = " . $id;
        return DBMysqli::getInstance()->getRow($sql);
    }

    public static function updateUserInfo($data, $user_id) {
        
        $sql = SqlBuilderNamespace::buildUpdateSql('user', $data, array(array('id', '=', $user_id)));
        return DBMysqli::getInstance()->execute($sql);
    }
    
    public static function getUserByUsername() {
        
    }
    
    public static function getUserInfo($username) {
        $sql = "SELECT * FROM `user` WHERE `username` = '" . $username . "' AND forbid=0";
        return DBMysqli::getInstance()->getRow($sql);
    }
    
    public static function getAllUser($limit = 15) {
        
        $page     = HttpNamespace::getGET('p', 1);
        $offset   = ($page-1) * $limit;
        $sqlCount = "SELECT count(*) as count FROM `user`";
        $sql      = "SELECT * FROM `user` ORDER BY id desc LIMIT {$offset},{$limit}";
        
        $num = DBMysqli::getInstance()->getRow($sqlCount);
        $page = new Page($num['count'], $limit);
        $result[]   = DBMysqli::getInstance()->getAll($sql);
        $result[]   = $page->show();
        return $result;
        
        $sql = "SELECT * FROM `user` ORDER BY id desc";
        return DBMysqli::getInstance()->getAll($sql);
    }
    
    public static function forbidUser($id) {
        $sql = "UPDATE `user` set `forbid` =1 WHERE `id` = " . $id;
        return DBMysqli::getInstance()->execute($sql);
    }
    
    public static function userUser($id) {
        $sql = "UPDATE `user` set `forbid` =0 WHERE `id` = " . $id;
        return DBMysqli::getInstance()->execute($sql);
    }
    public static function upgradeUser($id) {
    	$sql = "UPDATE `user` set `admin` =1 WHERE `id` = " . $id;
    	return DBMysqli::getInstance()->execute($sql);
    }
    public static function unupgradeUser($id) {
    	$sql = "UPDATE `user` set `admin` =0 WHERE `id` = " . $id;
    	return DBMysqli::getInstance()->execute($sql);
    }
    public static function getUserById($user_id) {
        $sql = "SELECT * FROM `user` WHERE `id` = " . $user_id;
        return DBMysqli::getInstance()->getRow($sql);
    }
    
    public static function loginByCookie($userInfo) {
        $sql = "SELECT * FROM `user` WHERE `username` = '" . $userInfo['username'] . "' AND `email` = '".$userInfo['email']."' AND `rtime` = " . $userInfo['rtime'];
        $result = DBMysqli::getInstance()->getRow($sql);
        if($result) {
            self::_writeUserStatus($result, false);
            return true;
        }
        return false;
    }
    
    public static function saveUser($username, $password, $email) {
        $sql = "INSERT INTO `user`(`username`, `password`, `email`, `rtime`, `ltime`)VALUES ".
               "('". $username ."','".md5($password)."','".$email."','".time()."','".time()."')";
        return DBMysqli::getInstance()->execute($sql);
    }
    public static function savefangkuai($userid, $name, $image,$data,$ctime) {
        $sql = "INSERT INTO `fangkuai`(`userid`, `image`, `data`, `ctime`, `name`)VALUES ".
            "('". $userid ."','".$image."','".$data."','".time()."','".$name."')";
        return DBMysqli::getInstance()->execute($sql);
    }
    
    public static function login($username, $password, $save = false) {
        if ($result = self::getUserInfo($username)) {
            if ($result['password'] == md5($password)) {
                self::_writeUserStatus($result, $save);
                return $result;
            }
        }
        return false;
    }

    public static function fangkuai() {
        $sql = "SELECT * FROM `fangkuai` WHERE `userid` = " . $_SESSION['user']['id'];
        $result = DBMysqli::getInstance()->getAll($sql);
        return $result;
    }

    public static function getfangkuai($id){
        $sql = "SELECT * FROM `fangkuai` WHERE `id` = " . $id;
        $result = DBMysqli::getInstance()->getRow($sql);
        return $result;
    }

    public static function deletefangkuai($id) {
        $sql = "delete from fangkuai where `id` =$id and userid=" . $_SESSION['user']['id'];
        return DBMysqli::getInstance()->execute($sql);
    }

    private static function _writeUserStatus($user, $save) {
        //更新登陆状态
        $sql = "UPDATE `user` set `ltime` =".time()." WHERE `id` = " . $user['id'];
        DBMysqli::getInstance()->execute($sql);
        $_SESSION['user'] = $user;
        if ($save) {
            unset($user['forbid'], $user['admin'], $user['password'], $user['ltime']);
            setcookie("userInfo", json_encode($user), time()+3600*24*30, '/');
        }
    }
}