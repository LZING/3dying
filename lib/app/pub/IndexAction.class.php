<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';


class IndexAction extends CommonAction{
    public static $PAGE_SIZE = 30;
    public function init() {
        $this->assign('css', array(
            'header-1.css',
            'footer.css',
            'user/common.css',
        ));
        parent::init();
    }
    public function defaultAction() {
      
        $result['top_image'] = IndexPageConfig::$IMAGE_TOP;
        $this->assign($result);
        $this->display();
    }
}