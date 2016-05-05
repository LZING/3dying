<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';
require_once THINKPHP . '/lib/file/Transfer.php';

class IndexAction extends BaseAction{
    
    public function init() {
      
        parent::init();
    }
    
   public function defaultAction() {
        $id = (int)HttpNamespace::getGET('id');
        $result = AttaNamespace::getById($id);
        if (!$result || !file_exists($result['path'])) {
            echo '附件不存在';exit;
        }
        date_default_timezone_set('Asia/Chengdu');
        $range = isset($_SERVER['HTTP_RANGE']) ? $_SERVER['HTTP_RANGE'] : null;
        $transfer = new Transfer($result['path'], $result['name'], null, $range);
        $transfer->send();
   }

}
