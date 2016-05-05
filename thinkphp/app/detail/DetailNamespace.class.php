<?php
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
class DetailNamespace {
    
    /**
     * @param string $table
     * @param int $puid
     */
    public static function getArticle($category, $puid) {
        $sql = "SELECT * FROM {$category['table']} WHERE `puid`={$puid}";
        return DBMysqli::getInstance()->getRow($sql);
    }
    
    public static function increaseReadTimes($category, $puid) {
        $sql = "UPDATE {$category['table']} SET `read_times` = `read_times` + 1,`weight`=`weight`+1 WHERE `puid` = {$puid}";
        return DBMysqli::getInstance()->execute($sql);
    }
    
    public static function increaseShareTimes($category, $puid) {
        $sql = "UPDATE {$category['table']} SET `share_times` = `share_times` + 1,`weight`=`weight`+1 WHERE `puid` = {$puid}";
        return DBMysqli::getInstance()->execute($sql);
    }
    public static function getNearArticle($category ,$puid) {
        $sql1 = "SELECT * FROM  {$category['table']} WHERE puid < {$puid} ORDER BY puid DESC LIMIT 1";
        $sql2 = "SELECT * FROM  {$category['table']} WHERE puid > {$puid} ORDER BY puid ASC LIMIT 1";
        return array(
            0 => DBMysqli::getInstance()->getRow($sql1),
            1 => DBMysqli::getInstance()->getRow($sql2)
        );
    }
    
    public static function getRelateArticle($category, $article , $limit = 6) {
        
        $result = array();
        $half = (int)$limit/2;
        $left = $limit - $half;
        if ($category == 'article_diarybook') {
            $sql="SELECT * FROM  {$category['table']} WHERE diary_book_id = {$article['diary_book_id']} AND puid < {$article['puid']} ORDER BY puid DESC LIMIT {$half}";
            $re[0] = DBMysqli::getInstance()->getAll($sql);
            $sql = "SELECT * FROM  {$category['table']} WHERE diary_book_id = {$article['diary_book_id']} AND puid > {$article['puid']} ORDER BY puid ASC LIMIT {$left}";
            $re[1] = DBMysqli::getInstance()->getAll($sql);
            $result = array_merge((array)$re[0], (array)$re[1]);
        } else {
            $sql = "SELECT * FROM  {$category['table']} WHERE user_id = {$article['user_id']} AND puid < {$article['puid']} ORDER BY puid DESC LIMIT {$half}";
            $re[0] = DBMysqli::getInstance()->getAll($sql);
            $sql = "SELECT * FROM  {$category['table']} WHERE user_id = {$article['user_id']} AND puid > {$article['puid']} ORDER BY puid ASC LIMIT {$left}";
            $re[1] = DBMysqli::getInstance()->getAll($sql);
            $result = array_merge((array)$re[0], (array)$re[1]);
        }
        //不够的话补齐
        if (count($result) < $limit) {
             $sql = "SELECT * FROM  {$category['table']} WHERE majory_id = {$article['majory_id']} AND puid > {$article['puid']} ORDER BY puid ASC LIMIT " . ($limit - count($result));
             $re = DBMysqli::getInstance()->getAll($sql);
             $result = array_merge($result, $re);
        }
        return $result;
    }
    
    public static function getComment($category, $puid, $limit = 6) {
        $table = $category['table'] . '_comment';
        $sql = "SELECT * FROM {$table} WHERE puid = {$puid} ORDER BY id desc LIMIT {$limit}";
        return DBMysqli::getInstance()->getAll($sql);
    }
}