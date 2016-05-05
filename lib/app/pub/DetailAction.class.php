<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/app/common/CommonNamespace.class.php';


class DetailAction extends CommonAction{
    
    public $result = array();
    
    public function init() {
        $this->assign('css', array(
            'header-1.css',
            'footer.css',
            'user/common.css',
        ));
        parent::init();
    }
    public function defaultAction() {
        $this->result['top_image'] = IndexPageConfig::$IMAGE_TOP;
        if (empty(self::$MAJORY) || empty(self::$CATEGORY)) {
            HttpNamespace::redirect(__APP__.'/pub');
        }
        
        if (self::$CATEGORY['id'] == 2) {//发表日记类型文章
            $this->result['diary'] = true;
        }
        if (HttpNamespace::isPost()) {
            $title = HttpNamespace::getPOST('title');
            $content = htmlspecialchars($_POST['content']);
        }
        $this->assign($this->result);
        $this->display();
    }
    
    private function  _save() {
        if (self::$CATEGORY['id'] == 2) {
            $sql = "INSERT INTO " . self::$CATEGORY['name'] . " (`user_id`,`author`,`type_id`,
            `majory`,`majory_id`,`title`,`content`,`times`,`time_step`,`update_time`)VALUES(
            '".$_SESSION['user']['id']."','".$_SESSION['nick_name']."','".self::$CATEGORY['id']."',
            '".self::$MAJORY['name']."','".self::$MAJORY['id']."','".$title."','".$content."',
            '".time()."','".time()."','".$data['private']."',)"; 
        } else {
            $sql = "INSERT INTO " . self::$CATEGORY['name'] . " (`user_id`,`author`,`type_id`,
                `majory`,`majory_id`,`title`,`content`,`times`,`time_step`,`update_time`)VALUES(
                '".$_SESSION['user']['id']."','".$_SESSION['nick_name']."','".self::$CATEGORY['id']."',
                '".self::$MAJORY['name']."','".self::$MAJORY['id']."','".$title."','".$content."',
                '".time()."','".time()."')";
        }
    }
}