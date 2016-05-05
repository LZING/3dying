<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/user/UserNamespace.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';
require_once THINKPHP . '/app/image/ImageNamespace.class.php';

class IndexAction extends BaseAction{
    
    public function init() {
        parent::init();

    }
    
   public function defaultAction() {
	   	if (!$this->checkLogin() || !$_SESSION['user']['admin']) {
	   		HttpNamespace::redirect('/SJZws/index/login/');
	   	}else {
	   		$this->display();
	   	}
   	    
   }
   
   public function loginAction() {

   	if(HttpNamespace::isPost()) {
   		$username = HttpNamespace::getPOST('username');
   		$password = HttpNamespace::getPOST('password');
   		$save     = HttpNamespace::getPOST('expires');
   		$msg= array();
   		if (empty($username) || empty($password)) {
   			$msg = array('code' => 1, 'msg' => '用户名和密码不能为空');
   		} else {
   			if (UserNamespace::login($username, $password, $save)) {
   				$msg = array('code' => 0, 'msg' => '');
   			} else {
   				$msg = array('code' => 1, 'msg' => '用户名或密码错误');
   			}
   		}
   		if ($msg['code']==1){
   			$this->assign("msg",$msg);
   			$this->display("/SJZws/login.php");
   		}else {
   			//$this->display("/SJZws/index.php");
   			HttpNamespace::redirect('/SJZws/index/');
   		}
   	}else {
   		$this->display("/SJZws/login.php");
   	}
   
   
   }
    
   public function repwdAction() {
   		$uid = (int)HttpNamespace::getGET('uid', 0);
   		$user = UserNamespace::getUserById($uid);
   		if ($user){
   			$data = null;
   			if (HttpNamespace::isPost()) {
   				$newpass = HttpNamespace::getPOST('newpass');
   				if ($newpass) {
   					if (strlen(HttpNamespace::getPOST('newpass')) < 6 || strlen(HttpNamespace::getPOST('newpass')) > 20) {
   						$data['newpass'] = '密码长度6-20个字符串';
   					}
   					
   					if (HttpNamespace::getPOST('newpass') == HttpNamespace::getPOST('repass')) {
   						$info['password'] = md5(HttpNamespace::getPOST('newpass'));
   					} else {
   						$data['repass'] = '密码不一致';
   					}
   				}
   				if ($data == null){
   					$info['ltime'] = time();
   					if(UserNamespace::updateUserInfo($info, $uid)) {
   						HttpNamespace::redirect('/SJZws/index/user/',3,"修改成功",'target="content"');
   					}
   				}else {
   					$this->assign($data);
   				}
   				
   			}
   			//exit;
   			$info = UserNamespace::getUserInfo($user['username']);
   			$this->assign('info',$info);
   			$this->display();
   		}else{
   			HttpNamespace::redirect('/SJZws/index/user/');
   		}
   		
   }
   public function upgradeAction() {
   	$id = (int)$_POST['id'];
   	UserNamespace::upgradeUser($id);
   	echo 1;exit;
   }
   public function unupgradeAction() {
   	$id = (int)$_POST['id'];
   	UserNamespace::unupgradeUser($id);
   	echo 1;exit;
   }
    public function sideAction(){
        $this->display();
    }
    public function topAction(){
        $this->display();
    }
    
    public function imagelistAction() {
    	echo "initindexAction";exit;
        $image = ImageNamespace::getAll();
        $this->assign('image', $image);
        
        $this->display();
    }
    public function imagedeleteAction() {
        $id = (int)$_POST['id'];
        ImageNamespace::delete($id);
        echo 1;exit;
    }
    
    public function setUpImageAction() {
        $id = (int)$_POST['id'];
        ImageNamespace::setUp($id);
        echo 1;exit;
    }
    
    public function userAction() {
        list($user,$page) = UserNamespace::getAllUser();
        $this->assign('user',$user);
        $this->assign('page',$page);
        $this->display();
    }
    public function attaAction() {
    	
    	list($atta,$page) = AttaNamespace::getAllAtta(20);
    	foreach ($atta as $k=>$v){
    		$d3 = D3Namespace::getD3ById($v['3d_id']);
    		$atta[$k]['title'] = $d3['title'];
    		$atta[$k]['type_name'] = $d3['type_name'];
    		$atta[$k]['type_id'] = $d3['type_id'];
    	}
    	$this->assign('atta',$atta);
    	$this->assign('page',$page);
    	$this->display("/SJZws/index_atta.php");
    }
    public function forbidAction() {
        $id = (int)$_POST['id'];
        UserNamespace::forbidUser($id);
        echo 1;exit;
    }
    
    public function resumeAction() {
        $id = (int)$_POST['id'];
        UserNamespace::userUser($id);
        echo 1;exit;
    }
    
    
    public function imageAction(){
        if (HttpNamespace::isPost()) {
            $flag = 0;
            if(count($_POST['imagess']) < 1) {
                echo '请上传图片';exit;
            }
            for($i=0; $i < count($_POST['imagess']); $i++) {
                $flag = 1;
                $data = array();
                $data['title']=htmlspecialchars($_POST['title_'.$i]);
                if($_POST['link_'.$i] == null || $_POST['link_'.$i] == " ") {
                    $_POST['link_'.$i] = " ";
                } else {
                    $data['link'] = urlFormat(htmlspecialchars($_POST['link_'.$i]));
                }
    
                $data['image'] = htmlspecialchars($_POST['imagess'][$i]);
                $data['user_id'] = $_SESSION['user']['id'];
                $data['time']    = time();

                $result = ImageNamespace::saveD3($data);
                //
                if(!$result) {
                    echo '修改失败';exit;
                }
            }
            HttpNamespace::redirect('/SJZws/index/image');
        }
        $this->display();
    }
    public function delattaAction() {
    	if (!$_SESSION['user']['admin']) {
    		echo 0;exit;
    	}
    	 
    	$id  = (int)$_POST['id'];
    	$atta_arr = AttaNamespace::getById($id);
    	$sql = "DELETE FROM `attachment` WHERE `id`={$id}";
    	if(DBMysqli::getInstance()->execute($sql)){
    		if ($atta_arr){
    				unlink($atta_arr['path']);
    		}
    		$check_id = AttaNamespace::getattaById($atta_arr['3d_id']);
    		if (!$check_id){
    			$sql1 = "DELETE FROM `3d` WHERE `id`={$atta_arr['3d_id']}";
    			
    			if (DBMysqli::getInstance()->execute($sql1)){
    				$d3=D3Namespace::getD3ById($atta_arr['3d_id']);
    				unlink(".".$d3['thumb']);
    				unlink(".".$d3['image']);
    			}
    		}
    		echo 1;exit;
    	}else {
    		echo 0;exit;
    	}
    	
    }
    function logoutAction() {
    	session_unset();
    	session_destroy();
    	$_SESSION  =array();
    	setcookie("PHPSESSID", null, 1, '/');
    	HttpNamespace::redirect("/SJZws/index/");
    }
}
