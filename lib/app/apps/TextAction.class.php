<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';

class TextAction extends BaseAction{
    
    public function init() {

        parent::init();
    }
    public function defaultAction() {

        $this->display();
    }
    
    
}