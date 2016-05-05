<?php
/**
 * @author zzq
 */
require_once MYROOT . '/Lib/Action/ajax/AdminAjaxBase.php';

class AdminNewsAjax extends AdminAjaxBase {

    public function init() {
       
        parent::init();
    }
    public function delete() {
        $id     = intval($_POST['id']);
        parent::delete('NewsModel', $id);
    }
    public function delImage() {
        $id = intval($_POST['id']);
        parent::delImage('NewsModel', $id);
    }
}