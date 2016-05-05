<?php
/**
 * @author zzq
 */
class Images {
    const SAVE_PATH   = 'upload/images';
    const IAMGE_THUMB = 'thumb';
    public static $TYPE = array(
        'up_image'    => array(
            'value' => 1,
            'name'  => '首页上部图片'
        ),//首页上部图片
        'right_image' => array(
            'value' => 2,
            'name'  => '右侧图片'
        ),//右侧图片
    );
}