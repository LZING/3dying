<?php
require_once APP . '/common/include/BaseAction.class.php';

class MyfangkuaiAction extends BaseAction{

    public function init() {

        parent::init();
        if (!$this->checkLogin()) {
            HttpNamespace::redirect('/');
        }
    }
    
    public function defaultAction() {
        $id = $_SESSION['user']['id'];



        include_once THINKPHP . '/lib/image/UploadFile.class.php';
        $image = $this->_uploadImage('./Public/images/', true, 320, 250);

        if ($image['error'] == 0) {
            $data['image'] = trim($image['msg'][0]['savepath'] . $image['msg'][0]['savename'], '.');
        } else {

        }
        UserNamespace::savefangkuai(
            $id,
            htmlspecialchars($_POST['name']),
            $data['image'],
            htmlspecialchars($_POST['data']),
            time());
        echo 1;exit;

        

    }
    
    
    
    public function listAction() {
    
    }
}
