<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';
require_once THINKPHP . '/lib/image/UploadFile.class.php';

class ModelAction extends BaseAction{

    public function init() {
        parent::init();
    }
    
    public function defaultAction() {
        $path = './Public/file/';
        set_time_limit(0);
        $upload = new UploadFile(); // 实例化上传类
        $upload->maxSize    = 300 * 1024 * 1024; // 设置附件上传大小
        $upload->allowExts  = array('stl', 'png');//图片类型
        $upload->savePath = $path . date( "Y-m" ) . '/';;

        if ( !file_exists($upload->savePath ) ) {
            if ( !mkdir( $upload->savePath , 0777 , true ) ) {
                return array('error' => 1, 'msg' => '目录创建失败');
            }
        }
        $upload->saveRule= 'uniqid';//多个文件是只能用uniqid或者com_create_guid，time会出现重复


        //上传文件的保存规则，必须是一个无需任何参数的函数名，例如可以是 time
        if(!$upload->upload()) {

            echo  0;// 上传错误 提示错误信息
        } else { // 上传成功 获取上传文件信息
            $info =  $upload->getUploadFileInfo();
            $id = UserNamespace::savestl(
                htmlspecialchars($_POST['name']),
                $info[0]['savepath'].$info[0]['savename'],
                $info[1]['savepath'].$info[1]['savename'],
                intval($_GET['type'])
                );
            echo $id;
        }
exit;

    }

}
