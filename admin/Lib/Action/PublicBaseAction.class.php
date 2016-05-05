<?php
class PublicBaseAction extends BaseAction {
    public function _initialize() {
        parent::_initialize();
    }
    
    public function isLogin() {
        if($this->userId == null || empty($this->userId)) {
            return false;
        }
        return true;
    }
}