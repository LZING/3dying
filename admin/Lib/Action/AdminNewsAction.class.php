<?php
require_once MYROOT . '/my/sta/conf/db/News.php';
class AdminNewsAction extends AdminAction {
    public function _initialize(){
        parent::_initialize();
    }
    public function addNews() {
        $id     = HttpNamespace::getGET('id');
        $result = NewsModel::getArticleById($id);
        $result['allType'] = News::$TYPE['news']['child'];
        $this->assign('result', $result);
        $this->display();
    }
    public function newsPost() {
        $data = array();
        $id = HttpNamespace::getPOST('id');
        $data['user_id']  = $_SESSION['user_id'];
        $data['title']    = HttpNamespace::getPOST('title');
        $data['content']  = htmlspecialchars($_POST['content']);
        $data['type']     = HttpNamespace::getPOST('type');
        $data['author']   = HttpNamespace::getPOST('author');//文章作者
        $data['from']     = HttpNamespace::getPOST('from');//文章来源
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
        
        if(NewsModel::saveData($data, $id)) {
            HttpNamespace::redirect(__URL__."/addNews", 1, "添加成功");
        }else {
            HttpNamespace::redirect(__URL__."/addNews", 2, "添加失败");
        }
    }
    public function newsList(){
        $result['type']  = intval($_GET['type']);
        $result['types'] = News::$TYPE['news']['child'];//二级菜单
        $result['title'] = "news - neuro uestc";
        //文章类型
        $map['del'] = array('eq', 0);
        if($result['type'] == 0){
            $map['type'] = array('in', implode(',', News::$TYPE['news']['allTypes']));
        } else{
            $map['type'] = array('eq', $result['type']);
            $result['title'] = "Publish " . News::$TYPE['news']['child'][$result['type']]['name'] . " - neuro uestc";
        }
        list($result['page'], $result['result']) = NewsModel::getArticleByTypeShowPage($map,'id DESC' ,self::PAGE_SIZE);
        $this->assign("result",$result);
        $this->assign('allType', $result['types']);
        $this->assign('result',$result['result']);
        $this->assign('page',$result['page']);
        $this->display();
    }
}