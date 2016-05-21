<?php
require_once THINKPHP . '/lib/image/UploadFile.class.php';
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/type/TypeNamespace.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';

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
//            $id = UserNamespace::savestl(
//                htmlspecialchars($_POST['name']),
//                $info[0]['savepath'].$info[0]['savename'],
//                $info[1]['savepath'].$info[1]['savename'],
//                intval($_GET['type'])
//                );
//            echo $id;
            $this->addStl(
                htmlspecialchars($_POST['name']),
                $info[0]['savepath'].$info[0]['savename'],
                $info[1]['savepath'].$info[1]['savename'],
                htmlspecialchars($_POST['name'])
            );
            echo 1;exit;
        }
exit;

    }


    public function addStl($title, $image, $stlPath, $stlName) {

        $id = $_SESSION['user']['id'];
        $user = UserNamespace::getUserById($id);

        $data['title']   = $title;
        $data['type_id'] = 18;
        //type判断
        $type = TypeNamespace::getTypeById($data['type_id']);
        $data['type_name'] = $type ? $type['name'] : '人物';
        $data['type_id']   = $type ? $type['id'] : 1;
        $data['private']   = 1;
        $data['intro']     = $title;
        $data['user_id']   = $user['id'];
        $data['username']  = $user['username'];

        $data['image'] = $image;
        $data['thumb'] = $image;

        $data['utime'] = $data['etime'] = time();
        $d_id = D3Namespace::saveD3($data);
        //处理附件
        $id = AttaNamespace::insert($stlPath, $user['id'], $user['username'], $stlName);
        AttaNamespace::update3dId($id, $d_id, $user['id']);

    }

}
