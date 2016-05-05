<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';

class IndexAction extends BaseAction{
    
    public function init() {
        $this->assign('css', array(
            'category/common.css',
            'footer.css',
        ));
        parent::init();
    }
    public function defaultAction() {
        $list = array();
        if($_SESSION['user']['id']) {
            $list = UserNamespace::fangkuai();
        }

        $this->assign('list', $list);
        $this->display();
    }
    
    
}