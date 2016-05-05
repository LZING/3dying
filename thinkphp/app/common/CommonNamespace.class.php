<?php
include_once THINKPHP . '/lib/db/DBMysqli.class.php';
include_once THINKPHP . '/lib/db/DBRedis.class.php';
require_once THINKPHP . '/lib/page/Page.class.php';

class CommonNamespace {
    
    private static $_FIELDS = array(
        'puid',
        'majory',
        'majory_id',
        'title',
        'times',
        'author',
        'comment_times',
        'weight',
    );
    
    private static $_TABLE = NULL;
    private static $_SQL   = NULL;
    private static $_LIMIT = 60;
    /**
     * @brief 最热的文章，默认存放50条
     * @param int $type
     * @param int $majory
     * @param int $limit 
     */
    public static function getHotArticle($categoryId, $majoryId, $limit = 10) {
        $limit = ($limit < 51) ? $limit : 60;
        $key = 'hot_' . $categoryId . '_' . $majoryId;
        //list时间默认10分钟;
        $t = getMicrosecond();
        $result = DBRedis::lRange($key, 0, $limit - 1, 300);
        if ($result){
            
            return array_map('unserialize', $result);
        } else {
            //echo 'hot mysql/';
           $sql = self::_buildSql($categoryId, $majoryId, 'hot');
          
           $result = DBMysqli::getInstance()->getAll($sql);
            
            foreach ($result as $value) {
                DBRedis::rPush($key, serialize($value));
                
            }
           //echo $sql.' -> '.((getMicrosecond()-$t)/1000).'<br>';
            return array_slice($result, 0, $limit);
        }
        
    }

    /**
     * 
     * @brief 最新发布的文章,默认存放50条
     * @param int $type
     * @param int $majory
     * @param int $limit
     */
    public static function getNewArticle($categoryId, $majoryId, $limit = 10, $offset = 0) {
        $limit = ($limit < 51) ? $limit : 50;
        $key = 'new_' . $categoryId . '_' . $majoryId;
        //list时间默认5分钟;
        $t = getMicrosecond();
        $result = DBRedis::lRange($key, $offset, $limit + $offset - 1, 1000);
        if ($result){
            return array_map('unserialize', $result);
        } else {
            //echo 'new mysql/';
            $sql = self::_buildSql($categoryId, $majoryId, 'new');
            $result = DBMysqli::getInstance()->getAll($sql);
            foreach ($result as $value) {
                DBRedis::rPush($key, serialize($value));
                
            }
            //echo $sql.' -> '.((getMicrosecond()-$t)/1000).'<br>';
            return array_slice($result, 0, $limit);
        }
    }
    /**
     * 
     * @brief 分页
     * @param unknown_type $model
     * @param unknown_type $pageSize
     * @param unknown_type $map
     * @param unknown_type $order
     * @param unknown_type $join
     * @param unknown_type $field
     */
    public static function showPage($category, $majory, $limit = 30) {
        $field = self::_getFields($category['table']);
        $where = "`type_id` = {$category['id']} AND `majory_id` = {$majory['id']}";
        $sqlCount = "SELECT count(*) as count FROM {$category['table']} WHERE {$where}";
        $page = HttpNamespace::getGET('p', 1);
        $offset = ($page-1) * $limit;
        $sql = "SELECT " . implode(',', $field) . " FROM {$category['table']} WHERE {$where} ORDER BY `puid` ASC LIMIT {$offset},{$limit}";
        $num = DBMysqli::getInstance()->getRow($sqlCount);
        $page = new Page($num['count'], $limit);
        $result[]   = $page->show();
        $result[]   = DBMysqli::getInstance()->getAll($sql);;
        return $result;
        
    }
    
    private static function _getFields($table) {
        return ($table == 'article_diarybook') ? array_merge(self::$_FIELDS, array('diary_book')) : self::$_FIELDS;
    }
    private static function _buildSql($categoryId, $majoryId, $type) {
        $category = CategoryNamespace::getCategoryById($categoryId);
        $table = empty($category['table']) ? 'article' : $category['table'];
        //日记类型 增加日记本
        $field = self::_getFields($table);
        
      
        $sql = "SELECT " . implode(',', $field) . " FROM
               " . $table;
        if ($majoryId) {
            $sql .= " WHERE `majory_id` = {$majoryId}";
        }
        if ($type == 'new') {
            $sql .= " ORDER BY `puid` DESC LIMIT " . self::$_LIMIT;
        } else if ($type == 'hot') {
            $sql .= " ORDER BY `weight` DESC LIMIT " . self::$_LIMIT;
        } else {
            $sql .= " LIMIT " . self::$_LIMIT;
        }
        return $sql;
    }
}