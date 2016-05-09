<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/lib/image/UploadFile.class.php';

class NewAction extends BaseAction{

    public function init() {
        parent::init();
    }
    
    public function defaultAction() {
        $type = (int)HttpNamespace::getGET('type', 1);
        $size = (int)HttpNamespace::getGET('size',10);
        list($data['list'],$data['count']) = D3Namespace::showPageJson2($size, $type);
        echo json_encode($data);exit;

    }

}
