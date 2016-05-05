<?php
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
include_once THINKPHP . '/lib/core/SqlBuilderNamespace.class.php';

class TypeNamespace {
     
    
    public static function getAllTypes($limit = null) {
        $sql = "SELECT * FROM `type` WHERE `del` = 0";
        return DBMysqli::getInstance()->getAll($sql);
    }
    
    public static function getTypeById($id) {
        $sql = "SELECT * FROM `type` WHERE `id` = " . $id . " AND del=0";
        return DBMysqli::getInstance()->getRow($sql);
    }
}