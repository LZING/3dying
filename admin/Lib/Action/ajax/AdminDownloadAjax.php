<?php
/**
 * @author zzq
 */
require_once MYROOT . '/Lib/Action/ajax/AdminAjaxBase.php';

class AdminDownloadAjax extends AdminAjaxBase {

    public function init() {
       
        parent::init();
    }
    public function delete() {
        $id     = intval($_POST['id']);
        parent::delete('DownloadModel', $id);
    }
    public function delImage() {
        $id = intval($_POST['id']);
        parent::delImage('DownloadModel', $id);
    }
}