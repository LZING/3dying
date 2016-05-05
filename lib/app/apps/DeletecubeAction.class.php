<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';

class DeletecubeAction extends BaseAction{
    
    public function init() {

        parent::init();
    }
    public function defaultAction() {
        if($_SESSION['user']['id']) {
            UserNamespace::deletefangkuai($_GET['id']);
        }

    }
    
    
}