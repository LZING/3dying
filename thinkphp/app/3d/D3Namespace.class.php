<?php
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
include_once THINKPHP . '/lib/core/SqlBuilderNamespace.class.php';
require_once THINKPHP . '/lib/page/Page.class.php';

class D3Namespace { 
    
   
    
    public static function getD3ById($id) {
        $sql = "SELECT * FROM `3d` WHERE `id` = " . $id;
        return DBMysqli::getInstance()->getRow($sql);
    }

    
    public static function saveD3($data) {
        $sql = SqlBuilderNamespace::buildInsertSql('3d', $data);
        return DBMysqli::getInstance()->insertAndGetId($sql);
    }
    
    public static function updateD3($data, $d_id) {
    	$sql = SqlBuilderNamespace::buildUpdateSql('3d', $data, array(array('id', '=', $d_id)));
    	return DBMysqli::getInstance()->execute($sql);
    }

    public static function getLatestByType($limit = 10, $type = 0) {
        $limit = $limit < 100 ? $limit : 100;
        $sql = "SELECT * FROM `3d` WHERE del=0 order by `id` DESC limit ". $limit;
        if ($type > 0) {
            $sql = "SELECT * FROM `3d` WHERE `type_id` = ".$type." AND del=0 order by `id` DESC limit ". $limit;
        }
        return DBMysqli::getInstance()->getAll($sql);
    }
    
    
    public static function getTop($limit = 10) {
        
        $sql = "SELECT * FROM `3d` WHERE del=0 order by `read` DESC limit ". $limit;
       
        return DBMysqli::getInstance()->getAll($sql);
    }

    public static function showPageJson($limit = 12, $type = 0) {

        $where    = 'del=0';
        if ($type > 0) {
            $where = '`type_id`=' . $type .' AND del=0';
        }
        $q = HttpNamespace::getGET('q', '');
        if ($q) {
            $where .= " AND `title` like '%".$q."%'";
        }
        $page     = (int)HttpNamespace::getGET('p', 1);
        $page = $page >0 ? $page : 1;
        $offset   = ($page-1) * $limit;
        $orderTime    = HttpNamespace::getGET('time', '');
        $readTime     = HttpNamespace::getGET('read', '');
        $order = '';
        $o = '';
        $orderUrl = '';
        $readUrl  = '';
        if ($readTime == 'asc') {
            $order = '`read` asc';
            $readUrl = UrlNamespace::searchUrl($type, $q, $orderTime, 'desc');
        } else{
            if ($readTime == 'desc') {
                $order = '`read` desc';
            }
            $readUrl = UrlNamespace::searchUrl($type, $q, $orderTime, 'asc');
        }
        if ($order) {
            $o = ',';
        }
        if ($orderTime == 'asc') {
            $order .= $o . 'id asc';
            $orderUrl = UrlNamespace::searchUrl($type, $q, 'desc', '');
        } else{
            $order .= $o . 'id desc';
            $orderUrl = UrlNamespace::searchUrl($type, $q, 'asc', '');
        }
        $sqlCount = "SELECT count(*) as count FROM `3d` WHERE {$where}";
        $sql      = "SELECT * FROM `3d` WHERE {$where} ORDER BY ". $order ." LIMIT {$offset},{$limit}";

        $num = DBMysqli::getInstance()->getRow($sqlCount);

        $result[]   = DBMysqli::getInstance()->getAll($sql);
        $result[] = $num['count'];

        return $result;
    }

    public static function showPage($limit = 12, $type = 0) {

        $where    = 'del=0';
        if ($type > 0) {
            $where = '`type_id`=' . $type .' AND del=0';
        }
        $q = HttpNamespace::getGET('q', '');
        if ($q) {
            $where .= " AND `title` like '%".$q."%'"; 
        }
        $page     = (int)HttpNamespace::getGET('p', 1);
        $page = $page >0 ? $page : 1;
        $offset   = ($page-1) * $limit;
        $orderTime    = HttpNamespace::getGET('time', '');
        $readTime     = HttpNamespace::getGET('read', '');
        $order = '';
        $o = '';
        $orderUrl = '';
        $readUrl  = '';
        if ($readTime == 'asc') {
            $order = '`read` asc';
            $readUrl = UrlNamespace::searchUrl($type, $q, $orderTime, 'desc');
        } else{
            if ($readTime == 'desc') {
                $order = '`read` desc';
            }
            $readUrl = UrlNamespace::searchUrl($type, $q, $orderTime, 'asc');
        }
        if ($order) {
            $o = ',';
        }
        if ($orderTime == 'asc') {
            $order .= $o . 'id asc';
            $orderUrl = UrlNamespace::searchUrl($type, $q, 'desc', '');
        } else{
            $order .= $o . 'id desc';
            $orderUrl = UrlNamespace::searchUrl($type, $q, 'asc', '');
        }
        $sqlCount = "SELECT count(*) as count FROM `3d` WHERE {$where}";
        $sql      = "SELECT * FROM `3d` WHERE {$where} ORDER BY ". $order ." LIMIT {$offset},{$limit}";

        $num = DBMysqli::getInstance()->getRow($sqlCount);
        $page = new Page($num['count'], $limit);
        $result[]   = $page->show();
        $result[]   = DBMysqli::getInstance()->getAll($sql);
        $result[] = $orderUrl;
        $result[] = $readUrl;
        return $result;
    }
   
     public static function showMyType($userId) {

        $sql      = "SELECT `3d`.`type_id`,`3d`.`type_name`,count(*) as count FROM `3d` WHERE `user_id`=" . $userId . " AND del=0 GROUP BY `type_id` ORDER BY id desc";
       
        
        $result   = DBMysqli::getInstance()->getAll($sql);
        foreach($result as &$value) {
            $value['list'] = DBMysqli::getInstance()->getAll("SELECT * FROM `3d` WHERE `user_id`=".$userId." AND `type_id`=".$value['type_id']." AND del=0 ORDER BY id desc limit 4");
        }
        return $result;
    }
    
    public static function showMyModelPage($userId,$limit = 12, $type) {

        $page     = HttpNamespace::getGET('p', 1);
        $offset   = ($page-1) * $limit;
        $sqlCount = "SELECT count(*) as count FROM `3d` WHERE `user_id`=" . $userId ." AND `type_id`=" . $type . " AND del=0";
        $sql      = "SELECT * FROM `3d` WHERE `user_id`=" . $userId . " AND `type_id`=" . $type . " AND del=0 ORDER BY id desc LIMIT {$offset},{$limit}";
       
        $num = DBMysqli::getInstance()->getRow($sqlCount);
        $page = new Page($num['count'], $limit);
        $result[]   = $page->show();
        $result[]   = DBMysqli::getInstance()->getAll($sql);
        return $result;
    }
    public static function showMyCollectPage($userId,$limit = 12) {
        $page     = HttpNamespace::getGET('p', 1);
        $offset   = ($page-1) * $limit;
        $sqlCount = "SELECT count(*) as count FROM `collect` WHERE `user_id`=" . $userId;
        $sql      = "SELECT `3d`.* FROM `collect` left join `3d` on `collect`.`3d_id`=`3d`.`id` and `collect`.`user_id`=" . $userId . " ORDER BY id desc LIMIT {$offset},{$limit}";
        $num  = DBMysqli::getInstance()->getRow($sqlCount);
        $page = new Page($num['count'], $limit);
        $result[]   = $page->show();
        $result[]   = DBMysqli::getInstance()->getAll($sql);
        return $result;
    }
    public static function vote($id) {
        $sql = "UPDATE `3d` SET `like`=`like`+1 WHERE `id` = " . $id;
        return DBMysqli::getInstance()->execute($sql);
    }
    
    public static function collect($user_id, $id) {
        $sql = "SELECT * FROM `collect` WHERE `user_id`=" . $user_id . " AND `3d_id`=" . $id;
        if(DBMysqli::getInstance()->getRow($sql)) {
            DBMysqli::getInstance()->execute("DELETE FROM `collect` WHERE `user_id`=" . $user_id . " AND `3d_id`=" . $id);
        } else{
            DBMysqli::getInstance()->execute("INSERT INTO `collect` (`user_id`,`3d_id`)VALUES({$user_id},{$id})");
        }
    }
    
    
    public static function getCollect($user_id, $id) {
        $sql = "SELECT * FROM `collect` WHERE `user_id`=" . $user_id . " AND `3d_id`=" . $id;
        return DBMysqli::getInstance()->getRow($sql);
    }
    
    public static function comment($user_id, $username, $content, $id) {
        $time = time();
        $sql = "INSERT INTO `comment` (`user_id`,`username`, `3d_id`, `content`, `time`)VALUES('{$user_id}','{$username}', '{$id}', '{$content}', '{$time}')";
        return DBMysqli::getInstance()->execute($sql);
    }
    
    public static function getComment($id) {
        $sql = "SELECT * FROM `comment` WHERE `3d_id`=" . $id . " ORDER BY `id` DESC limit 50";
        $count = DBMysqli::getInstance()->getRow("SELECT count(*) as count FROM `comment` WHERE `3d_id`=" . $id);
        return array($count['count'], DBMysqli::getInstance()->getAll($sql));
    }
}