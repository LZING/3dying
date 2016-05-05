<?php
require_once APP . '/common/UrlNamespace.class.php';
require_once THINKPHP . '/app/user/UserNamespace.class.php';
require_once THINKPHP . '/app/message/MessageNamespace.class.php';
 
class BaseAction extends Action{
    
    /**
     *@brief cookie登陆
     */
    public function init() {
        session_start();
        $this->addCSS(array(
            'css/index.css',
            'css/sequencejs-theme.modern-slide-in.css'
        ));
        $this->addJS(array(
            'js/jquery.min.js',
            'js/jquery.sequence-min.js',
            'js/bannnerscroll.js',
        ));

        if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
            if (isset($_COOKIE['userInfo']) && !empty($_COOKIE['userInfo'])) {
                if(!UserNamespace::loginByCookie(json_decode($_COOKIE['userInfo'], true))) {
                    setcookie('userInfo', null, 1, '/');
                }
            }
        } elseif($_SESSION['user']) {
            $countM = MessageNamespace::getUnReadCount($_SESSION['user']['id']);
            $this->assign('messageCount',(int)$countM);
        }
    }
    
     /**
     *@brief 登陆状态
     */
    public function checkLogin() {
    	if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    		return false;
    	}
    	$r = UserNamespace::getUserById($_SESSION['user']['id']);
    	if ($_SESSION['user']['password'] !== $r['password'] ){
    		return false;
    	}
       
        return true;
    }
    
    public function _uploadImage($path = './Public/file/', $thumb = false, $thumbWidth = 100, $thumbHeight = 100) {
    
        $upload = new UploadFile(); // 实例化上传类
        $upload->maxSize    = 3 * 1024 * 1024; // 设置附件上传大小
        $upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');//图片类型
        $upload->savePath = $path . date( "Y-m" ) . '/';;
     
        if ( !file_exists($upload->savePath ) ) {
            if ( !mkdir( $upload->savePath , 0777 , true ) ) {
                return array('error' => 1, 'msg' => '目录创建失败');
            }
        }
        $upload->saveRule= time().rand(10000, 999999);//多个文件是只能用uniqid或者com_create_guid，time会出现重复
        
        if ($thumb) {
            //缩微图
            $upload->thumb = true;
            //设置需要生成缩略图的文件后缀
            $upload->thumbPrefix = 'thumb_';  //生产缩略图
            //设置缩略图最大宽度
            $upload->thumbMaxWidth = $thumbWidth;
            //设置缩略图最大高度
            $upload->thumbMaxHeight = $thumbHeight;
        }
        //上传文件的保存规则，必须是一个无需任何参数的函数名，例如可以是 time
        if(!$upload->upload()) {
              return array('error' => 1, 'msg' => $upload->getErrorMsg());// 上传错误 提示错误信息
         } else { // 上传成功 获取上传文件信息
            $info =  $upload->getUploadFileInfo();
            return array('error' => 0, 'msg' => $info);
        }
    }
}