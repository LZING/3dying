<?php
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
include_once THINKPHP . '/lib/core/SqlBuilderNamespace.class.php';

class MessageNamespace {
      
     
    public static function getReceiveMessage($user_id, $limit = 10) {
        $page     = HttpNamespace::getGET('p', 1);
        $offset   = ($page-1) * $limit;
        $sql = "SELECT message.*,user.thumb FROM `message` left join user on message.from_id=user.id where `message`.`to_id`=".$user_id." ORDER BY message.id desc LIMIT {$offset},{$limit}";
        $sqlCount = "SELECT count(*) as count FROM `message` WHERE `to_id`=" . $user_id ;
        
        $num = DBMysqli::getInstance()->getRow($sqlCount);
        $page = new Page($num['count'], $limit);
        $result[]   = DBMysqli::getInstance()->getAll($sql);
        $result[]   = $page->show();
        $result[] = $num['count'];
        return $result;
    }
    
     public static function getUnReadCount($user_id) {
       $sqlCount = "SELECT count(*) as count FROM `message` WHERE `to_id`=" . $user_id ." AND `read`=0";

        $num = DBMysqli::getInstance()->getRow($sqlCount);
        
        return $num['count'];
        
        
        
    }
    
     public static function getSendMessage($user_id, $limit = 10) {
        $page     = HttpNamespace::getGET('p', 1);
        $offset   = ($page-1) * $limit;
        $sql = "SELECT * FROM `message` where `from_id`=".$user_id." ORDER BY id desc LIMIT {$offset},{$limit}";
        $sqlCount = "SELECT count(*) as count FROM `message` WHERE `from_id`=" . $user_id ;
       
        $num = DBMysqli::getInstance()->getRow($sqlCount);
        $page = new Page($num['count'], $limit);
        $result[] = DBMysqli::getInstance()->getAll($sql);
        $result[] = $page->show();
        $result[] = $num['count'];
        return $result;
    }
    
    public static function sendMessage($data) {
         $sql = SqlBuilderNamespace::buildInsertSql('message', $data);
        return DBMysqli::getInstance()->insertAndGetId($sql);
    }
    
    public static function getDetail($id, $user_id) {
        $sql = "SELECT * FROM `message` WHERE `id`=".$id." AND (`from_id`=".$user_id." OR `to_id`=".$user_id.")";
        return DBMysqli::getInstance()->getRow($sql);
    }
    
    public static function readed($id) {
        $sql = "UPDATE `message` SET `read`=1 WHERE `id`=".$id;
        return DBMysqli::getInstance()->execute($sql);
    }
    
     public static function delete($id, $user_id) {
        $sql = "DELETE FROM `message` WHERE `id`=".$id." AND (`from_id`=".$user_id." OR `to_id`=".$user_id.")";
        
        return DBMysqli::getInstance()->execute($sql);
    }
}