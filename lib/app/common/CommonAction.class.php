<?php
require_once APP . '/common/include/BaseAction.class.php';

class CommonAction extends BaseAction{
    
    
    public static $CATEGORY = NULL;
    public static $MAJORY   = NULL;
    
    public function init() {
        self::$REQUEST = self::getGet();
        if (isset(self::$REQUEST['category'])) {
            self::$CATEGORY = CategoryNamespace::getCategoryById(self::$REQUEST['category']);
            $this->assign('category', self::$CATEGORY);
        }
        if (isset(self::$REQUEST['majory'])) {
            self::$MAJORY   = CategoryNamespace::getMajoryById(self::$REQUEST['majory']);
            self::$CATEGORY = CategoryNamespace::getCategoryById(self::$MAJORY['parent']['id']);
            $this->assign('majory', self::$MAJORY);
            $this->assign('category', self::$CATEGORY);
        }
    }
    
    public function getNewArticle($majory, $limit, $offset = 0) {
        return CommonNamespace::getNewArticle(self::$CATEGORY['id'], $majory, $limit, $offset);
    }
    
    public function getHotArticle($majory, $limit, $offset = 0) {
        return CommonNamespace::getHotArticle(self::$CATEGORY['id'], $majory, $limit, $offset);
    }
    
    public static function getErrorCode() {
        return (int)HttpNamespace::getGET('error', 0);
    }
       
}