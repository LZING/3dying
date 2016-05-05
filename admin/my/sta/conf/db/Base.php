<?php
/**
 * @brief 定义各个表的id 配置文件
 * @author zzq
 */
class Base {
    /**
     * @brief 表id
     * @var unknown_type
     */
    const CD_CONF        = 'conf';
    const CD_USER        = 1;
    const CD_PUBLICATION = 2;
    const CD_IMAGE       = 3;
    const CD_DOWNLOAD    = 4;
    const CD_CONTACT     = 5;
  
    /**
     * @brief 用户类别
     * @var unknown_type
     */
    public static $USER = array(
        'un_auth'  => array('value' => 0, 'name' => '未认证用户'),
        'common'   => array('value' => 1, 'name' => '普通用户'),
        'admin'    => array('value' => 2, 'name' => '管理员'),
        'su_admin' => array('value' => 3, 'name' => '超级管理员'),
    );
}