<?php
require_once APP . '/common/include/BaseAction.class.php';


class LoginAction extends BaseAction{
    
    public $error = array(); 
    
    public function init() {
	    parent::init();
    }
    
    function defaultAction() {
        if(HttpNamespace::isPost()) {
            $username = HttpNamespace::getPOST('username');
            $password = HttpNamespace::getPOST('password');
			$save     = HttpNamespace::getPOST('expires');
            if (empty($username) || empty($password)) {
                $this->error = array('code' => 1, 'msg' => '用户名和密码不能为空');
            } else {
                if (UserNamespace::login($username, $password, $save)) {
                    $this->error = array('code' => 0, 'msg' => '');
                } else {
                    $this->error = array('code' => 1, 'msg' => '用户名或密码错误');
                }
            }
            echo json_encode($this->error);exit;
        }else {
        	HttpNamespace::redirect('/user/register/');
        }
        
    }

}