<?php
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
include_once THINKPHP . '/lib/core/SqlBuilderNamespace.class.php';


class ImageNamespace { 
    
    
    public static function saveD3($data) {
        $sql = SqlBuilderNamespace::buildInsertSql('image', $data);
        return DBMysqli::getInstance()->insertAndGetId($sql);
    }

    public static function getAll() {
        $sql = "SELECT * FROM `image` order by `time` desc,id desc";
        return DBMysqli::getInstance()->getAll($sql);
    }
    
    public static function delete($id) {
        $sql = "DELETE FROM `image` WHERE `id`=" . $id;
        return DBMysqli::getInstance()->execute($sql);
    }
    
    public static function setUp($id) {
        $sql = "UPDATE `image` SET `time` = " . time() . " WHERE `id`=" . $id;
        return DBMysqli::getInstance()->execute($sql);
    }
}