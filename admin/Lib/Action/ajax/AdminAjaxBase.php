<?php
require_once MYROOT . '/Lib/Action/ajax/AjaxBase.php';
class AdminAjaxBase extends AjaxBase {
    public function init() {
        parent::init();
        if(!EmptyAction::adminCheck()) {
            echo json_encode(array('error' => 1, 'message' => 'error'));
        }
    }
    /**
     * @brief 删除
     */
    public function delete($instance, $id) {
        $result = $instance::delArticle($id);
        if ($result) {
            echo json_encode(array('error' => 0, 'message' => ''));
        } else {
            echo json_encode(array('error' => 1, 'message' => '删除失败'));
        }
        exit();
    }
    public function delImage($instance, $id) {
        if($instance::delImage($id)) {
            echo json_encode(array('error' => 0, 'message' => ''));
        } else {
            echo json_encode(array('error' => 1, 'message' => '删除失败'));
        }
        exit();
    }
}