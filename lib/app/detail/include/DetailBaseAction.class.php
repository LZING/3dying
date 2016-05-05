<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';

class DetailBaseAction extends CommonAction{
    
    public static $PUID     = NULL;
    public function init() {
        parent::init();
        self::$PUID = self::$REQUEST['puid'];
        
    }
    
    public function _error() {
        HttpNamespace::redirect(__APP__);
    }
}