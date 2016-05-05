<?php
require_once APP . '/common/BaseAction.class.php';

class IndexAction extends BaseAction{
    public function init() {}
    public function defaultAction() {
        $this->display();
    }
}