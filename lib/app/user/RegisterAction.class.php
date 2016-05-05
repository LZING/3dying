<?php
require_once APP . '/common/include/BaseAction.class.php';

class RegisterAction extends BaseAction{
    
    private $_username = null;
    private $_email    = null;
    private $_password = null;
    
    public function init() {
        parent::init();
        $this->addCSS(array(
            'css/user/register.css',
        ));
        $this->addJS(array(
            'js/login.js',
            'js/user/register.js',
        ));

    }
    public function defaultAction() {
       
        if (HttpNamespace::isPost()) {
            $this->_username = HttpNamespace::getPOST('username');
            $this->_password = HttpNamespace::getPOST('password');
            $this->_email    = HttpNamespace::getPOST('email');
            if ($this->_validator()) {
                if (UserNamespace::saveUser($this->_username, $this->_password, $this->_email)) {
                    if (UserNamespace::login($this->_username, $this->_password)) {
                        $this->error = array('code' => 0, 'msg' => '');
                    } else {
                        $this->error = array('code' => 1, 'msg' => '登陆失败');
                    }
                } else {
                    $this->error = array('code' => 1, 'msg' => '登陆失败');
                }
            }
            echo json_encode($this->error);exit;
        }
        
        $this->display();
    }
    
    public function repwdAction(){
    	$this->display('user/repwd.php');
    
    }
    
    private function _validator() {
        if ($this->_username == '') {
            $this->error = array('code' => 5 ,'msg' => '请填写用户名');
            return false;
        }
        $len = mb_strlen($this->_username, 'utf8');
        $badCharactors = '`~!@#$%^&*()-=+[]{}\\|;:\'",.<>/?';// 除_之外的其它字符
        for($i=0, $n=strlen($badCharactors);$i<$n;++$i) {
            if( strpos($this->_username, $badCharactors[$i]) !== false ) {
                $this->error = array('code' => 5 , 'msg' => '用户名只能由中英文，数字和下划线组成');
                return false;
            }
        }
        if ($len < 4 || $len > 20) {
            $this->error = array('code' => 5 , 'msg' => '用户名长度4-20个字符');
            return false;
        }
        if(UserNamespace::getUserInfo($this->_username)) {
            $this->error = array('code' => 5 , 'msg' => '用户名已存在');
            return false;
        }

        if ($this->_password == '') {
            $this->error = array('code' => 4 , 'msg' => '密码不能为空');
            return false;
        }
        
        if (strlen($this->_password) < 6 || strlen($this->_password) > 20) {
            $this->error = array('code' => 4 , 'msg' => '密码长度6-20个字符串');
            return false;
        }
        
        if(!preg_match('/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/', $this->_email, $out)) {
            $this->error = array('code' => 3 , 'msg' => '邮箱格式错误');
            return false;
        }
        return true;
    }
}
