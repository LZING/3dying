<?php
class PublishModel extends BaseModel {
    private static $instance = null;
    public static function init() {
        if (!self::$instance) {
            self::$instance = M('Publication');
        }
    }
    public static function getInstance() {
        self::init();
        return self::$instance;
    }
    /*
     * @brief 得到所有文章分类
     */
    public static function getAllType() {
        self::init();
    }
    /**
     * @brief 得到type 文章
     * @param array $type
     * @param string $order
     * @param int $limit
     */
    public static function getArticleByType($type = null, $order = 'id desc', $limit = 10) {
        self::init();
        return parent::getArticleByType(self::$instance, $type, $order, $limit); 
    }
    /**
     * @brief 得到type 文章分页
     * @param array $type
     * @param string $order
     * @param int $limit
     */
    public static function getArticleByTypeShowPage($map = null, $order = 'id desc', $limit = 10) {
        self::init();
        return parent::getArticleByTypeShowPage(self::$instance, $map, $order, $limit); 
    }
   /**
     * @brief 得到id 文章
     * @param int $id
     */
    public static function getArticleById($id = null) {
        self::init();
        if (!$id) return null;
        return parent::getArticleById(self::$instance, $id);
    }
    /**
     * @brief 保存
     */
    public static function saveData($data = null, $id = null) {
        self::init();
        return parent::saveData(self::$instance, $data, $id);
    }
    /**
     * @brief 删除对应文章图片
     * @param int $id
     */
    public static function delImage($id = null) {
        self::init();
        return parent::delImage(self::$instance, $id);
    }
    /**
     * @brief 删除对应文章
     * @param int $id
     */
    public static function delArticle($id = null) {
        self::init();
        return parent::delArticle(self::$instance, $id);
    }
}