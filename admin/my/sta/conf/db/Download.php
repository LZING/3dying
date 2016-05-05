<?php

class Download {
 /**
     * @brief 一级分类
     * @var unknown_type
     */
    /**
     * @brief 二级分类
     * @var unknown_type
     */
    public static $TYPE = array(
        'public'   => array(
            'name'  => 'download',
            'allTypes' => array(11, 12, 13, 14),//所有类型 方便获取
            'child' => array(
                11 => array(
                    'value' => 11,
                    'brief' => 'software',
                    'name'  => 'software'
                ),
                12 => array(
                    'value' => 12,
                    'brief' => 'video',
                    'name'  => 'video'
                ),
                13 => array(
                    'value' => 13,
                    'brief' => 'tool',
                    'name'  => 'tool'
                ),
                14 => array(
                    'value' => 14,
                    'brief' => 'others',
                    'name'  => 'others'
                ),
            ),
               
        ),
        'personal' => array(
            'name' => 'personal',
            'allTypes' => array(21),
            'child' => array(
                21 => array (
                    'value' => 21,
                    'brief' => 'personal',
                    'name'  => 'personal',
                ),
            ),
        )
       
    );
}