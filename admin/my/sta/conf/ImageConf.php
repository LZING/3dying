<?php
/**
 * @brief 图片上传配置文件
 * Enter description here ...
 * @author zzq
 *
 */
class ImageConf {
    public static $MAX_ALLOW_SIZE     = 3; //图片最大 M
    public static $SWF_MAX_ALLOW_SIZE = 5;//flash最大长传
    public static $ALLOW_TYPE         = array('jpg', 'gif', 'png', 'jpeg');//图片类型
    public static $SAVE_PATH          = 'upload/images';//图片路径
}