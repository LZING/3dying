<?php
require_once APP . '/common/include/BaseAction.class.php';

class LogoutAction extends BaseAction{
    
    public $result = array(); 
    
    public function init() {
        
    }
    
    function defaultAction() {
        session_unset();
        session_destroy();
        $_SESSION  =array();
        setcookie("PHPSESSID", null, 1, '/');
        HttpNamespace::redirect(__APP__);
    }
    
   
}