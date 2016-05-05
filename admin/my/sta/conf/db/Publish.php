<?php
/**
 * @author zzq
 */
class Publish {
    /**
     * @brief 一级分类
     * @var unknown_type
     */
    /**
     * @brief 二级分类
     * @var unknown_type
     */
    public static $TYPE = array(
        'personal' => array(
            'value' => 1,
            'name'  => '个人文章',
            'allTypes' => array(11),//所有类型 方便获取
            'child' => array(
                11 => array(
                    'value' => 11,
                    'brief' => 'personal',
                    'name'  => '个人文章'
                ),
            ),
               
        ),
        'labs'    => array(
            'value'    => 2,
            'name'     => 'Publish',
            'allTypes' => array(21,22),
            'child' => array(
                21 => array(
                    'value' => 21,
                    'brief' => 'Journal',
                    'name'  => 'Journal Papers'
                ),
                22 => array(
                    'value' => 22,
                    'brief' => 'Conference',
                    'name'  => 'Conference Papers'
                ),
            ),
        ),
    );
}