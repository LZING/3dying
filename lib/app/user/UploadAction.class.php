<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/type/TypeNamespace.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';

class UploadAction extends BaseAction{

    public function init() {
        $this->addCSS(array(
            'swf/css/default.css',
            'css/list/Dialog.css',

            'css/user/model_upload.css',
        ));
        $this->setJS(array(
            'js/jquery.js',
            'js/index/top.js',
            'swf/swfupload/swfupload.js',
            'swf/swfupload/swfupload.queue.js',
            'swf/js/fileprogress.js',
            'swf/js/handlers.js',
        ));
        parent::init();
        if (!$this->checkLogin()) {
            HttpNamespace::redirect('/');
        }
    }
    
    public function defaultAction() {
        //上传目录
    	$id = (int)HttpNamespace::getGET('uid');
    	if (!$id){
    		$id = $_SESSION['user']['id'];
    	}
        //$id = $_SESSION['user']['id'];
        $user = UserNamespace::getUserById($id);
        $types = TypeNamespace::getAllTypes();
 
        $data = null;
        if (HttpNamespace::isPost()) {
            $data['title']   = HttpNamespace::getPOST('title', '我的模型');
            $data['type_id'] = HttpNamespace::getPOST('type', '1');
            //type判断
            $type = TypeNamespace::getTypeById($data['type_id']);
            $data['type_name'] = $type ? $type['name'] : '人物';
            $data['type_id']   = $type ? $type['id'] : 1;
            $data['private']   = in_array((int)HttpNamespace::getPOST('private'), array(1, 2)) ? (int)HttpNamespace::getPOST('private') : 1;
            $data['intro']     = HttpNamespace::getPOST('intro', '');
            $data['user_id']   = $user['id'];
            $data['username']  = $user['username'];
            
            $UploadedFile      = $_FILES['image']['tmp_name'];
            if($UploadedFile && is_uploaded_file($UploadedFile)) {
                include_once THINKPHP . '/lib/image/UploadFile.class.php';
                $image = $this->_uploadImage('./Public/images/', true, 320, 250);
                
                if ($image['error'] == 0) {
                    $data['image'] = trim($image['msg'][0]['savepath'] . $image['msg'][0]['savename'], '.');
                    $data['thumb'] = trim($image['msg'][0]['savepath'] .'thumb_' .$image['msg'][0]['savename'], '.');
                } else {
                    
                }
            }
            $data['utime'] = $data['etime'] = time();
            $d_id = D3Namespace::saveD3($data);
            //处理附件
            $att = array();
            foreach(HttpNamespace::getPOST('attachment') as $value) {
                $att[] = (int)$value;
            }
            if ($att && $d_id) {
                AttaNamespace::update3dId($att, $d_id, $user['id']);
            }else {
            	$sql = "DELETE FROM `attachment` WHERE `3d_id`=0";
            	DBMysqli::getInstance()->execute($sql);
            }
            HttpNamespace::redirect('/user/upload/su?msg=上传成功&url='.urlencode('http://www.3dying.com/user/?type='.$data['type_id'].'&id='.$user['id']));
        }
        
        $this->assign('user', $user);
        $this->assign('type', $types);
        $this->display();
    }
    public function ad_uploadAction() {
    	
    	if (!$_SESSION['user']['admin']) {
    		HttpNamespace::redirect('/');
    	}
    	//上传目录
    
    	$id = (int)HttpNamespace::getGET('uid');
    	if (!$id){
    		$id = $_SESSION['user']['id'];
    	}
    	$user = UserNamespace::getUserById($id);
    	$types = TypeNamespace::getAllTypes();
    	$data = null;
    	if (HttpNamespace::isPost()) {
    		$data['title']   = HttpNamespace::getPOST('title', '我的模型');
    		$data['type_id'] = HttpNamespace::getPOST('type', '1');
    		//type判断
    		$type = TypeNamespace::getTypeById($data['type_id']);
    		$data['type_name'] = $type ? $type['name'] : '人物';
    		$data['type_id']   = $type ? $type['id'] : 1;
    		$data['private']   = in_array((int)HttpNamespace::getPOST('private'), array(1, 2)) ? (int)HttpNamespace::getPOST('private') : 1;
    		$data['intro']     = HttpNamespace::getPOST('intro', '');
    		$data['user_id']   = $user['id'];
    		$data['username']  = $user['username'];
    
    		$UploadedFile      = $_FILES['image']['tmp_name'];
    		if($UploadedFile && is_uploaded_file($UploadedFile)) {
    			include_once THINKPHP . '/lib/image/UploadFile.class.php';
    			$image = $this->_uploadImage('./Public/images/', true, 320, 250);
    
    			if ($image['error'] == 0) {
    				$data['image'] = trim($image['msg'][0]['savepath'] . $image['msg'][0]['savename'], '.');
    				$data['thumb'] = trim($image['msg'][0]['savepath'] .'thumb_' .$image['msg'][0]['savename'], '.');
    			} else {
    
    			}
    		}
    		$data['utime'] = $data['etime'] = time();

    		$d_id = D3Namespace::saveD3($data);
    		//处理附件
    		$att = array();
    		foreach(HttpNamespace::getPOST('attachment') as $value) {
    			$att[] = (int)$value;
    		}
    		if ($att && $d_id) {
    			AttaNamespace::update3dId($att, $d_id, $user['id']);
    		}
    		
    		HttpNamespace::redirect('/user/upload/su?msg=上传成功&url='.urlencode('http://www.3dying.com/user/?type='.$data['type_id'].'&id='.$user['id']));
    	}
    
    	$this->assign('user', $user);
    	$this->assign('type', $types);
    	$this->display("/user/ad_upload.php");
    }
    public function ad_editAction() {
    	if (!$_SESSION['user']['admin']) {
    		HttpNamespace::redirect('/');
    	}
    	//上传目录
    	$d_id = (int)HttpNamespace::getGET('id');
    	//$id = $_SESSION['user']['id'];
    	$id = (int)HttpNamespace::getGET('uid');
    	$user = UserNamespace::getUserById($id);
    	if (!$user){
    		HttpNamespace::redirect('/user/upload/su?msg=用户不存在&url='.urlencode('http://www.3dying.com/user/upload/ad_edit/?uid='.$id."&id=".$d_id));
    	}
    	$d3_arr = D3Namespace::getD3ById($d_id);
    	$atta_arr = AttaNamespace::getattaById($d_id);
    	$types = TypeNamespace::getAllTypes();
    	$data = null;
    	if (HttpNamespace::isPost()) {
    		$data['title']   = HttpNamespace::getPOST('title', '我的模型');
    		$data['type_id'] = HttpNamespace::getPOST('type', '1');
    		//type判断
    		$type = TypeNamespace::getTypeById($data['type_id']);
    		$data['type_name'] = $type ? $type['name'] : '人物';
    		$data['type_id']   = $type ? $type['id'] : 1;
    		$data['private']   = in_array((int)HttpNamespace::getPOST('private'), array(1, 2)) ? (int)HttpNamespace::getPOST('private') : 1;
    		$data['intro']     = HttpNamespace::getPOST('intro', '');
    		$data['user_id']   = $user['id'];
    		$data['username']  = $user['username'];
    
    		$UploadedFile      = $_FILES['image']['tmp_name'];
    		if($UploadedFile && is_uploaded_file($UploadedFile)) {
    			include_once THINKPHP . '/lib/image/UploadFile.class.php';
    			$image = $this->_uploadImage('./Public/images/', true, 320, 250);
    
    			if ($image['error'] == 0) {
    				$data['image'] = trim($image['msg'][0]['savepath'] . $image['msg'][0]['savename'], '.');
    				$data['thumb'] = trim($image['msg'][0]['savepath'] .'thumb_' .$image['msg'][0]['savename'], '.');
    			} else {
    
    			}
    		}
    		$data['utime'] = $data['etime'] = time();
    		$res = D3Namespace::updateD3($data,$d_id);
    		if(!$res){
    			HttpNamespace::redirect('/user/upload/su?msg=修改失败&url='.urlencode('http://www.3dying.com/user/upload/ad_edit/?uid='.$user['id']."&id=".$d_id));
    		}
    		//处理附件
    		$att = array();
    		$atta_ids = array();
    		$atta_ids = HttpNamespace::getPOST('attachment');
    		foreach($atta_ids as $value) {
    			$att[] = (int)$value;
    		}
    		$check_id = array();
    		$check_rs = AttaNamespace::getattaById($d_id);
    		foreach ($check_rs as $cv){
    			$check_id[] = $cv['id'];
    		}
    		foreach ($check_id as $v){
    			if (!in_array($v, $att)){
    				$sql = "DELETE FROM `attachment` WHERE `id`={$v} and user_id= {$user['id']}";
    				if (DBMysqli::getInstance()->execute($sql)){
    					$r = AttaNamespace::getById($v);
    					unlink($r['path']);
    				}
    			}
    		}
    		 
    		if ($att) {
    			AttaNamespace::update3dId($att, $d_id, $user['id']);
    		}
    		HttpNamespace::redirect('/user/upload/su?msg=修改成功&url='.urlencode('http://127.0.0.1:8088/user/?type='.$data['type_id'].'&id='.$user['id']."&up_tp=admin"));
    	}
    	$this->assign('d3_arr', $d3_arr);
    	$this->assign('atta_arr', $atta_arr);
    	$this->assign('user', $user);
    	$this->assign('type', $types);
    	$this->display("/user/ad_upload_edit.php");
    }
    public function editAction() {
    	//上传目录
    	$d_id = (int)HttpNamespace::getGET('id');
    	//$id = $_SESSION['user']['id'];
    	$id = (int)HttpNamespace::getGET('uid');
    	
    	$user = UserNamespace::getUserById($id);
    	if (!$user){
    		HttpNamespace::redirect('/user/upload/su?msg=用户不存在&url='.urlencode('http://www.3dying.com/user/upload/edit/?uid='.$id."&id=".$d_id));
    	}
    	$d3_arr = D3Namespace::getD3ById($d_id);
    	$atta_arr = AttaNamespace::getattaById($d_id);
    	$types = TypeNamespace::getAllTypes();
    	$data = null;
    	if (HttpNamespace::isPost()) {
    		$data['title']   = HttpNamespace::getPOST('title', '我的模型');
    		$data['type_id'] = HttpNamespace::getPOST('type', '1');
    		//type判断
    		$type = TypeNamespace::getTypeById($data['type_id']);
    		$data['type_name'] = $type ? $type['name'] : '人物';
    		$data['type_id']   = $type ? $type['id'] : 1;
    		$data['private']   = in_array((int)HttpNamespace::getPOST('private'), array(1, 2)) ? (int)HttpNamespace::getPOST('private') : 1;
    		$data['intro']     = HttpNamespace::getPOST('intro', '');
    		$data['user_id']   = $user['id'];
    		$data['username']  = $user['username'];

    		$UploadedFile      = $_FILES['image']['tmp_name'];
    		if($UploadedFile && is_uploaded_file($UploadedFile)) {
    			include_once THINKPHP . '/lib/image/UploadFile.class.php';
    			$image = $this->_uploadImage('./Public/images/', true, 320, 250);
    
    			if ($image['error'] == 0) {
    				$data['image'] = trim($image['msg'][0]['savepath'] . $image['msg'][0]['savename'], '.');
    				$data['thumb'] = trim($image['msg'][0]['savepath'] .'thumb_' .$image['msg'][0]['savename'], '.');
    			} else {
    
    			}
    		}
    		$data['utime'] = $data['etime'] = time();
    		$res = D3Namespace::updateD3($data,$d_id);
    		if(!$res){
    			HttpNamespace::redirect('/user/upload/su?msg=修改失败&url='.urlencode('http://www.3dying.com/user/upload/edit/?uid='.$user['id']."&id=".$d_id));
    		}
    		//处理附件
    		$att = array();
    		$atta_ids = array();
    		$atta_ids = HttpNamespace::getPOST('attachment');
    		foreach($atta_ids as $value) {
    			$att[] = (int)$value;
    		}
    		$check_id = array();
    		$check_rs = AttaNamespace::getattaById($d_id);
    		foreach ($check_rs as $cv){
    			$check_id[] = $cv['id'];
    		}
    		foreach ($check_id as $v){
    			if (!in_array($v, $att)){
    				$sql = "DELETE FROM `attachment` WHERE `id`={$v} and user_id= {$user['id']}";
    				if (DBMysqli::getInstance()->execute($sql)){
    					$r = AttaNamespace::getById($v);
    					unlink($r['path']);
    				}
    			}
    		}
   
    		if ($att) {
    			AttaNamespace::update3dId($att, $d_id, $user['id']);
    		}
    		HttpNamespace::redirect('/user/upload/su?msg=修改成功&url='.urlencode('http://www.3dying.com/user/?type='.$data['type_id'].'&id='.$user['id']));
    	}
    	//user/?type=9&id=15
    	$this->assign('d3_arr', $d3_arr);
    	$this->assign('atta_arr', $atta_arr);
    	$this->assign('user', $user);
    	$this->assign('type', $types);
    	$this->display();
    }
    
    public function editattaAction() {
    	//上传目录
    	$d_id = (int)HttpNamespace::getGET('id');
    	//$id = $_SESSION['user']['id'];
    	$id = (int)HttpNamespace::getGET('uid');
    	$user = UserNamespace::getUserById($id);
    	if (!$user){
    		echo 0;exit;
    	}
    	$d3_arr = D3Namespace::getD3ById($d_id);
    	$atta_arr = AttaNamespace::getattaById($d_id);
    	$types = TypeNamespace::getAllTypes();
    	$data = null;
    	if (HttpNamespace::isPost()) {
    		$data['title']   = HttpNamespace::getPOST('title', '我的模型');
    		$data['type_id'] = HttpNamespace::getPOST('type', '1');
    		//type判断
    		$type = TypeNamespace::getTypeById($data['type_id']);
    		$data['type_name'] = $type ? $type['name'] : '人物';
    		$data['type_id']   = $type ? $type['id'] : 1;
    		$data['private']   = in_array((int)HttpNamespace::getPOST('private'), array(1, 2)) ? (int)HttpNamespace::getPOST('private') : 1;
    		$data['intro']     = HttpNamespace::getPOST('intro', '');
    		$data['user_id']   = $user['id'];
    		$data['username']  = $user['username'];
    
    		$UploadedFile      = $_FILES['image']['tmp_name'];
    		if($UploadedFile && is_uploaded_file($UploadedFile)) {
    			include_once THINKPHP . '/lib/image/UploadFile.class.php';
    			$image = $this->_uploadImage('./Public/images/', true, 320, 250);
    
    			if ($image['error'] == 0) {
    				$data['image'] = trim($image['msg'][0]['savepath'] . $image['msg'][0]['savename'], '.');
    				$data['thumb'] = trim($image['msg'][0]['savepath'] .'thumb_' .$image['msg'][0]['savename'], '.');
    			} else {
    
    			}
    		}
    		$data['utime'] = $data['etime'] = time();
    		$res = D3Namespace::updateD3($data,$d_id);
    		if(!$res){
    			echo 0;exit;
    		}
    		//处理附件
    		$att = array();
    		$atta_ids = array();
    		$atta_ids = HttpNamespace::getPOST('attachment');
    		foreach($atta_ids as $value) {
    			$att[] = (int)$value;
    		}
    		$check_id = array();
    		$check_rs = AttaNamespace::getattaById($d_id);
    		foreach ($check_rs as $cv){
    			$check_id[] = $cv['id'];
    		}
    		foreach ($check_id as $v){
    			if (!in_array($v, $att)){
    				$sql = "DELETE FROM `attachment` WHERE `id`={$v} and user_id= {$user['id']}";
    				if (DBMysqli::getInstance()->execute($sql)){
    					$r = AttaNamespace::getById($v);
    					unlink($r['path']);
    				}
    			}
    		}
    		 
    		if ($att) {
    			AttaNamespace::update3dId($att, $d_id, $user['id']);
    		}
    		HttpNamespace::redirect('/user/upload/su?msg=修改成功&url='.urlencode('http://www.3dying.com/user/?type'.$type['id']."&id=".$d_id));
    	}
    }
    
    public function suAction() {
        $this->display();
    }
}