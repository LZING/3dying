<?php
/**
 * @author zzq
 */
require_once MYROOT . '/Lib/Action/ajax/AdminAjaxBase.php';

class AdminPublishAjax extends AdminAjaxBase {
    public function init() {
        parent::init();
    }
    public function delImage() {
        $id = intval($_POST['id']);
        parent::delImage('PublishModel', $id);
    }
    public function delete() {
        $id     = intval($_POST['id']);
        parent::delete('PublishModel', $id);
    }
}