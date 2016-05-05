<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';
require_once THINKPHP . '/app/type/TypeNamespace.class.php';

class IndexAction extends BaseAction{

    public function init() {
        parent::init();
        $this->addCSS(array(
            'css/list/Dialog.css',
            'css/user/profile_lib.css',
            'css/user/model_thumbnail.css'
        ));
    }
    
    public function defaultAction() {
        $id = (int)HttpNamespace::getGet('id') ? (int)HttpNamespace::getGet('id') : $_SESSION['user']['id'];
        if (!$id) {
            HttpNamespace::redirect('/');
        }
        $user = UserNamespace::getUserById($id);
        if (!$user) {
            HttpNamespace::redirect('/');
        }
        $up_tp = HttpNamespace::getGET('up_tp');
        $type = (int)HttpNamespace::getGET('type');
        $nowtype = TypeNamespace::getTypeById($type);
        if (!$nowtype) {
            HttpNamespace::redirect('/user/index/typelist?id='.$id);
        }
        list($data['page'], $data['list']) = D3Namespace::showMyModelPage($user['id'], 12, $type);
        $this->assign('up_tp',$up_tp);
        $this->assign('checkid',$_SESSION['user']['admin']);
        $this->assign('user_id',$user['id']);
        $this->assign($data);
        $this->assign('user', $user);
        $this->assign('bread', '3d作品 > ' . $nowtype['name']);
        $this->assign('show', false);
        $this->assign("type",$type);
        $this->assign('template', 'index.php');
        $this->display('user/default.php');
    }
    
    public function typelistAction() {
         $this->setCSS(array(
             'css/index.css',
             'css/sequencejs-theme.modern-slide-in.css',
            'css/list/Dialog.css',
            'css/user/profile_libs.css',
        ));
        $id = (int)HttpNamespace::getGet('id') ? (int)HttpNamespace::getGet('id') : $_SESSION['user']['id'];
        if (!$id) {
            HttpNamespace::redirect('/');
        }
        $user = UserNamespace::getUserById($id);
        if (!$user) {
            HttpNamespace::redirect('/');
        }
        
        $data['list'] = D3Namespace::showMyType($user['id']);
    
        $this->assign($data);
        $this->assign('user', $user);
        $this->assign('bread', '3d作品');
        $this->assign('show', false);
        $this->assign('template', 'typelist.php');
        $this->display('user/default.php');
    }
    
    public function collectAction() {
        $id = (int)HttpNamespace::getGet('id') ? (int)HttpNamespace::getGet('id') : $_SESSION['user']['id'];
        if (!$id) {
            HttpNamespace::redirect('/');
        }
        $user = UserNamespace::getUserById($id);
        if (!$user) {
            HttpNamespace::redirect('/');
        }
        list($data['page'], $data['list']) = D3Namespace::showMyCollectPage($user['id'], 12);

        $this->assign($data);
        $this->assign('user', $user);
        $this->assign('bread', '我的收藏');
        $this->assign('show', true);
        $this->assign('template', 'index.php');
        $this->display('user/default.php');
    }
    
    public function listAction() {
    
    } 
    public function detailAction() {
        if (!$this->checkLogin()) {
            HttpNamespace::redirect('/');
        }
        $this->setCSS(array(
            'css/index.css',
            'css/sequencejs-theme.modern-slide-in.css',
            'css/user/message_two.css'
        ));
        $user = UserNamespace::getUserById($_SESSION['user']['id']);
        $this->assign('user', $user);
        $id = (int)HttpNamespace::getGET('id');
        $message = MessageNamespace::getDetail($id, $_SESSION['user']['id']);
        if(!$message) {
            HttpNamespace::redirect('/user/index/message');
        }
        //我收到的
        if($message['read'] == 0 && $message['to_id']==$_SESSION['user']['id']) {
            MessageNamespace::readed($id);
        }
        $this->assign('message', $message);
        $this->assign('bread', '私信对话');
        $this->assign('template', 'detail.php');
        $this->assign('ismessage', true);
        $this->display('user/default.php');
    }
    
    public function messageAction() {
        if (!$this->checkLogin()) {
            HttpNamespace::redirect('/');
        }
        $id   = $_SESSION['user']['id'];
        $type = HttpNamespace::getGET('type');
        if($type == 1) {
            list($message, $page, $count) = MessageNamespace::getSendMessage($_SESSION['user']['id']);
        } else {
            $type = 0;
            list($message, $page, $count) = MessageNamespace::getReceiveMessage($_SESSION['user']['id']);
        }
        
        $this->setCSS(array(
            'css/index.css',
            'css/sequencejs-theme.modern-slide-in.css',
            'css/user/message.css'
        ));
        $user = UserNamespace::getUserById($id);
        $this->assign('template', 'message.php');
        $this->assign('type', $type);
        $this->assign('bread', '我的私信');
        $this->assign('user', $user);
        $this->assign('count', $count);
        $this->assign('message', $message);
        $this->assign('page', $page);
        $this->assign('ismessage', true);
        $this->display('user/default.php');
    } 
    
    
    public function sendAction() {
        if (!$this->checkLogin()) {
            echo 0;exit;
        }
        $username = HttpNamespace::getPOST('username');
        $to_user = UserNamespace::getUserInfo($username);
        if (!$to_user) {
            echo 2;exit;
        }
        $data['from_id'] = $_SESSION['user']['id'];
        $data['from_name'] = $_SESSION['user']['username'];
        $data['to_name'] = $to_user['username'];
        $data['to_id'] = $to_user['id'];
        $data['content'] = HttpNamespace::getPOST('content');
        $data['time'] = time();
        MessageNamespace::sendMessage($data);
        echo 1;exit;
    }
    
     public function deleteAction() {
        if (!$this->checkLogin()) {
            echo 0;exit;
        }
       
        $id = (int)HttpNamespace::getGET('id');
        MessageNamespace::delete($id, $_SESSION['user']['id']);
        echo 1;exit;
    }
    public function del3dAction() {
    	if (!$this->checkLogin()) {
    		echo 0;exit;
    	}
    	if (HttpNamespace::isPost()){
    		$id   = (int)HttpNamespace::getPOST('id');
    		$d3_arr = D3Namespace::getD3ById($id);
    		$atta_arr = AttaNamespace::getattaById($id);
    		if (!$_SESSION['user']['admin']){
    			if ($d3_arr['user_id'] !=$_SESSION['user']['id']) {
    				echo 0;exit;
    			}
    		}
    		$sql = "DELETE FROM `3d` WHERE `id`={$id} and user_id= {$d3_arr['user_id']}";
    		$sql1 = "DELETE FROM `attachment` WHERE `3d_id`={$id} and user_id= {$d3_arr['user_id']}";
    		if(DBMysqli::getInstance()->execute($sql) && DBMysqli::getInstance()->execute($sql1)){
    			if ($d3_arr){
    				unlink(".".$d3_arr['thumb']);
    			}
    			if ($atta_arr){
    				foreach ($atta_arr as $v){
    					unlink($v['path']);
    				}
    			}
    			echo 1;exit;
    		}else {
    			echo 0;exit;
    		}
    		
//     		HttpNamespace::redirect('/user/?type='.$type.'&id='.$id);
    	}
    	
    }
}
