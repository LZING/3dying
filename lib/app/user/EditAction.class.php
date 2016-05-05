<?php
require_once APP . '/common/include/BaseAction.class.php';

class EditAction extends BaseAction{

    public function init() {
        $this->addCSS(array(
            'css/user/profile_info.css',
        ));
        $this->addJS(array(
            'js/jquery.js',
            'js/index/top.js',
        ));
        parent::init();
        if (!$this->checkLogin()) {
            HttpNamespace::redirect('/');
        }
    }
    
    public function defaultAction() {
        $id = $_SESSION['user']['id'];
        $user = UserNamespace::getUserById($id);
        
        $data = null;
        if (HttpNamespace::isPost()) {

            $info['sex']  = (int)HttpNamespace::getPOST('sex', 1);
            $info['sign'] = mb_substr(HttpNamespace::getPOST('sign'), 0, 30, 'utf8');
            $oldpass = HttpNamespace::getPOST('oldpass');
            if ($oldpass) {
                if (md5($oldpass) == $user['password']) {
                    
                    if (strlen(HttpNamespace::getPOST('newpass')) < 6 || strlen(HttpNamespace::getPOST('newpass')) > 20) {
                        $data['newpass'] = '密码长度6-20个字符串';
                    }
                    
                    if (HttpNamespace::getPOST('newpass') == HttpNamespace::getPOST('repass')) {
                        $info['password'] = md5(HttpNamespace::getPOST('newpass'));
                    } else {
                        $data['repass'] = '密码不一致';
                    }
                } else {
                    $data['oldpass'] = '旧密码错误';
                }
            }
            if ($data == null) {
                $UploadedFile = $_FILES['image']['tmp_name'];
                if($UploadedFile && is_uploaded_file($UploadedFile)) {
                    include_once THINKPHP . '/lib/image/UploadFile.class.php';
                    $image = $this->_uploadImage('./Public/avatar/', true);
                    
                    if ($image['error'] == 0) {
                        $info['image'] = trim($image['msg'][0]['savepath'] . $image['msg'][0]['savename'], '.');
                        $info['thumb'] = trim($image['msg'][0]['savepath'] .'thumb_' .$image['msg'][0]['savename'], '.');
                    } else {
                        $data['image'] = $image['msg'];
                    }
                }
                $info['ltime'] = time();
                if(UserNamespace::updateUserInfo($info, $_SESSION['user']['id'])) {
                    HttpNamespace::redirect('/user/edit');
                }
            }
        }
        
        $this->assign('user', $user);
        $this->assign('bread', '个人信息');
        $this->assign($data);
        $this->assign('template', 'edit.php');
        $this->display('user/default.php');
    }
    
    
    
    public function listAction() {
    
    }
}
