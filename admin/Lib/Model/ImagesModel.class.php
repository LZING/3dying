<?php
class ImagesModel extends BaseModel {
    private static $instanceImage     = null;//图片表
    private static $instanceImageType = null;//图片类别表

    public static function init() {
        if (!self::$instanceImage || !self::$instanceImageType) {
            self::$instanceImage     = M("Image");
            self::$instanceImageType = M("ImageType");
        }
    }
    public static function getInstance() {
        self::init();
        return array(self::$instanceImage, self::$instanceImageType);
    }
    /**
     * @brief 得到相册列表 和相册相片数
     * @param boolen $showCount 是否显示相册对应照片数
     * Enter description here ...
     */
    public static function getAllImageType($showCount = false) {
        self::init();
        $newType   = array();
        $type   = self::$instanceImageType->where("del = 0")->order("id asc")->select();
        if ($showCount) {
            $images = self::$instanceImage->field("count(type) as counts, type")->where("del = 0")->group("type")->select();
            
            foreach ($images as $key => $value) {
                $newType[$value['type']] = $value['counts'];
            }
            
            foreach ($type as $k => $val) {
                $type[$k]['count'] = intval($newType[$val['id']]);
            }
        }
        return $type;
    }
    /**
     * @brief 得到对应相册图片 分页
     * @param int $type
     */
    public static function getImagesByTypeShowPage($type = null, $order = 'id asc', $showTypeName = false) {
        self::init();
        if ($type) {
            $map['cd_image.type'] = array('eq', $type);
        }
       
        $result      = array();
        $map['cd_image.del']  = array('eq', 0);
        if ($showTypeName) {
            $result = EmptyAction::showPage(self::$instanceImage, 20, $map, $order, 'LEFT JOIN cd_image_type ON cd_image.type = cd_image_type.id', 'cd_image.*, cd_image_type.name as type_name');
        } else {
            $result = EmptyAction::showPage(self::$instanceImage, 20, $map, $order);
        }
        return $result;
    }
    public static function getImageByType($type = null, $order = 'id desc', $limit = 10) {
        self::init();
        return self::$instanceImage->where("`type` = " . $type . " AND `del` = 0")->limit($limit)->order($order)->select();
    }
    /**
     * 
     */
    public static function getImageTypeById($id = null) {
        self::init();
        if (!$id) {
            return '';
        }
        return self::$instanceImageType->where("id = " . $id . " AND del = 0")->find();
    }
    /**
     * @brief 删除图片
     */
    public static function delArticle($id = null) {
        if (!$id) return false;
        self::init();
        return parent::delArticle(self::$instanceImage, $id);
    }
    /**
     * @brief 添加相册
     * @param string $name 相册名字
     */
    public static function addImageType($name = null) {
        if (!name) return false;
        self::init();
        return self::$instanceImageType->add(array('name' => $name));
    }
    /**
     * @brief 删除相册
     * @param unknown_type $id
     */
    public static function delImageType($id = null) {
        if (!$id) return false;
        self::init();
        return self::$instanceImageType->where("id = " .$id)->setField('del', 1);
    }
    /**
     * @brief 修改相册名字
     * @param int $id
     * @param string $name
     */
    public static function editImageType($id = null, $name = null) {
        if (!$id || !$name) return false;
        self::init();
        return self::$instanceImageType->where("id = " . $id)->setField('name', $name);;
    }
    /**
     * @brief 设置相册封面
     * @param int $id
     * @param string $name
     */
    public static function coverImageType($id = null) {
        if (!$id) return false;
        self::init();
        $image = self::$instanceImage->where("id = " . $id)->find();
        if ($image) {
            $thumb = $image['thumb'];
            $type  = $image['type'];
            return self::$instanceImageType->where("id = " . $type)->setField('albums', $thumb);
        }
        return false;
    }
    /**
     * @brief 置顶
     * @param int $id
     */
    public static function setUpImage($id = null) {
        if (!$id) return false;
        self::init();
        return self::$instanceImage->where("id = " . $id)->setField('time', time());
      
    }
    /**
     * @brief 保存
     */
    public static function saveData($data = null, $id = null) {
        self::init();
        return parent::saveData(self::$instanceImage, $data, $id);
    }
    
}