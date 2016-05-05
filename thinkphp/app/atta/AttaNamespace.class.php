<?php
/**
 * @brief 附近处理
 */
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
include_once THINKPHP . '/lib/core/SqlBuilderNamespace.class.php';

class AttaNamespace {
    
	
    public static function insert($path, $user_id, $username, $name) {
        $sql = "INSERT INTO `attachment`(`path`, `user_id`, `username`, `name`, `utime`)VALUES ".
               "('". $path ."','". $user_id ."','". $username ."','". $name ."','".time()."')";
        return DBMysqli::getInstance()->insertAndGetId($sql);
    }
    
    /**
     * @brief 发布成功后更新相应id
     * @param array $ids
     * @param int $dId 模型文章id
     * @param int $user_id 用户id
     */
    public static function update3dId($ids, $dId,$user_id) {
        if(!is_array($ids)) $ids = (array)$ids;
        if (empty($ids)) return false;
        $sql = "UPDATE `attachment` SET `3d_id` = " . $dId . " WHERE id IN(" . implode(",", $ids) . ") AND `user_id` = ". $user_id;
        return DBMysqli::getInstance()->insertAndGetId($sql);
    }
    public static function getAllAtta($limit = 15) {
    
    	$page     = HttpNamespace::getGET('p', 1);
    	$offset   = ($page-1) * $limit;
    	$sqlCount = "SELECT count(*) as count FROM `attachment`";
    	$sql      = "SELECT * FROM `attachment` ORDER BY id desc LIMIT {$offset},{$limit}";
    
    	$num = DBMysqli::getInstance()->getRow($sqlCount);
    	$page = new Page($num['count'], $limit);
    	$result[]   = DBMysqli::getInstance()->getAll($sql);
    	$result[]   = $page->show();
    	return $result;
    
    	$sql = "SELECT * FROM `attachment` ORDER BY id desc";
    	return DBMysqli::getInstance()->getAll($sql);
    }
    public static function getattaById($id) {
        $sql = "SELECT * FROM `attachment` WHERE `3d_id` = " . $id;
        
        return DBMysqli::getInstance()->getAll($sql);
    }
    
    public static function getById($id) {
        $sql = "SELECT * FROM `attachment` WHERE `id` = " . $id;
        return DBMysqli::getInstance()->getRow($sql);
    }
  
}