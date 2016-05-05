<?php
require_once APP . '/common/include/BaseAction.class.php';

class IndexAction extends BaseAction{
    public function init() {
        echo 'init';
    }
    public function defaultAction() {
        echo 'indexAction';
    }
}