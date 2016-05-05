<?php
/**
 * @author zzq
 */
require_once MYROOT . '/Lib/Action/ajax/AdminAjaxBase.php';

class AdminUserAjax extends AdminAjaxBase {
    public function init() {
        parent::init();
    }
    public function editLeadership() {
        $data['leadership'] = intval($_POST['leadership']);
        $id = intval($_POST['id']);
        if (UserModel::saveData($data, $id)) {
            echo json_encode(array('error' => 0, 'message' => ''));
        } else {
            echo json_encode(array('error' => 1, 'message' => '修改失败'));
        }
        exit();
    }
    public function editAdmin() {
        $data['privite'] = intval($_POST['privates']);
        $id = intval($_POST['id']);
        if (UserModel::saveData($data, $id)) {
            echo json_encode(array('error' => 0, 'message' => ''));
        } else {
            echo json_encode(array('error' => 1, 'message' => '修改失败'));
        }
        exit();
    }
}