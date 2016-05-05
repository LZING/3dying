<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/lib/image/UploadFile.class.php';

class ViewAction extends BaseAction{

    public function init() {
        parent::init();
    }
    
    public function defaultAction() {
        $id = (int)HttpNamespace::getGET('id');
        do {
            $error = '';
            if (!$id) {
                $error = '模型不存在';
                break;
            }
            $result = D3Namespace::getD3ById($id);
            if (!$result) {
                $error = '模型不存在';
                break;
            }
            $collect = '';
            if ($this->checkLogin()) {
                $collect = D3Namespace::getCollect($_SESSION['user']['id'], $id);
            }
            $user = UserNamespace::getUserById($result['user_id']);
            $comment = D3Namespace::getComment($id);


            if ($result) {

                $atta = AttaNamespace::getattaById($result['id']);
                if ($atta) {
                    foreach($atta as $value) {
                        if (strpos($value['path'], '.stl') != false) {
                            $stl[] = $value;
                        }
                        if (strpos(strtolower($value['path']), '.obj') != false) {
                            $stl[] = $value;
                        }
                    }
                }
            }
            if (!isset($stl)) {
                $error = '模型不存在';
                break;
            }
            $result['stl'] = $stl;


        }while(false);
        echo json_encode(array('error' => $error,'data' => $result));exit;

    }

}
