<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';

class DemoimageAction extends BaseAction{
    
    public function init() {

        parent::init();
    }
    public function defaultAction() {

        $data= UserNamespace::getfangkuai(intval($_GET['id']));
        echo $data['data'];exit;
    }
    
    
}