<?php
class BaseModel {

    public static $PAGE_SIZE = 10;
    
   
    /**
     * @brief 获得id 数据
     * @param object $instance
     * @param int $id
     */
    public static function getArticleById($instance = null, $id = null) {
        return $instance->where("`id` = " . $id ." AND `del` = 0")->find();
    }
    /**
     * @brief 保存数据
     * @param object $instance
     * @param array $data
     * @param int $id
     */
    public static function saveData($instance = null, $data = null, $id = null) {
        if ($id > 0){
            return $instance->where("`id`= " . $id)->save($data);
        } else {
            return $instance->add($data);
        }
    }
    /**
     * @brief 删除对应文章
     * @param int $id
     */
    public static function delArticle($instance = null, $id = null) {
        if ($id > 0) {
            return $instance->where("`id`= " . $id)->setField('del', 1);
        }
        return false;
    }
    /**
     * @brief 得到type 文章分页
     * @param array $type
     * @param string $order
     * @param int $limit
     */
    public static function getArticleByTypeShowPage($instance = null, $map = null, $order = 'id desc', $limit = 10) {
        if (!$map) return null;
        $result = EmptyAction::showPage($instance, $limit, $map, $order);
      
        return $result;
    }
    /**
     * @brief 得到type 文章
     * @param array $type
     * @param string $order
     * @param int $limit
     */
    public static function getArticleByType($instance = null, $type = null, $order = 'id desc', $limit = 10) {
        if (!$type) return null;
        return $instance->where("`type` IN (" . implode(',', $type) . ") AND `del` = 0")->order($order)->limit($limit)->select();
    }
    /**
     * @brief 删除对应文章图片
     * @param int $id
     */
    public static function delImage($instance = null, $id = null) {
        if ($id > 0) {
            return $instance->where("`id`= " . $id)->setField('image', './upload/images/default.png');
        }
        return false;
    }
}