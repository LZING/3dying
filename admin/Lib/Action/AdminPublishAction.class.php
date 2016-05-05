<?php
require_once MYROOT . '/my/sta/conf/db/Publish.php';
class AdminPublishAction extends AdminAction {

    public function _initialize() {
        parent::_initialize();
    }
    public function index() {
        //$result['allType'] = PublicationModel::
    }
    public function addPublish() {
        $id     = HttpNamespace::getGET('id');
        $result = PublishModel::getArticleById($id);
       
        $result['allType'] = Publish::$TYPE['labs']['child'];
        $this->assign('result', $result);
        $this->display();
    }
    public function publishPost() {
    
        $data = array();
        $id = HttpNamespace::getPOST('id');
        $data['user_id']  = $_SESSION['user_id'];
        $data['title']    = HttpNamespace::getPOST('title');
        $data['content']  = htmlspecialchars($_POST['content']);
        $data['video']    = HttpNamespace::getPOST('video', '');
        $data['type']     = HttpNamespace::getPOST('type');
        $data['year']     = HttpNamespace::getPOST('year');
        $data['author']   = HttpNamespace::getPOST('author');
        $data['magazine'] = HttpNamespace::getPOST('magazine');
        $data['period']   = HttpNamespace::getPOST('period');
        $data['link']     = urlFormat(HttpNamespace::getPOST('link'));
        $UploadedFile=$_FILES['image']['tmp_name']; 
       // dump($data);exit();
        if($UploadedFile && is_uploaded_file($UploadedFile)) {
            include_once MYROOT . '/my/action/File.php';
            $image = File::uploadFile($UploadedFile);
            if ($image['error'] == 0) {
                $data['image'] = $image['msg'][0]['savepath'] . $image['msg'][0]['savename'];
            } else {
                HttpNamespace::redirect(__URL__.'/addPublish', 2, $image['msg']);
            }
        }
        if($id <= 0) {
          $data['time'] = time();  
        }
        if(PublishModel::saveData($data, $id)) {
            HttpNamespace::redirect(__URL__."/addPublish", 1, "添加成功");
        }else {
            HttpNamespace::redirect(__URL__."/addPublish", 2, "添加失败");
        }
    }
    public function publishList() {
        $result['type']  = intval($_GET['type']);
        $result['types'] = Publish::$TYPE['labs']['child'];//二级菜单
        $result['title'] = "Publish - neuro uestc";
        //文章类型
        $map['del'] = array('eq', 0);
        if($result['type'] == 0){
            $map['type'] = array('in', implode(',', Publish::$TYPE['labs']['allTypes']));
        } else{
            $map['type'] = array('eq', $result['type']);
            $result['title'] = "Publish " . Publish::$TYPE['labs']['child'][$result['type']]['name'] . " - neuro uestc";
        }
        list($result['page'], $result['result']) = PublishModel::getArticleByTypeShowPage($map,'id DESC' ,self::PAGE_SIZE);
        $this->assign("result",$result);
       
        $this->assign('allType', $result['types']);
        
        $this->assign('result',$result['result']);
        $this->assign('page',$result['page']);
        $this->display();
    }
}