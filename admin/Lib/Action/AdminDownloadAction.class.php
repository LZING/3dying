<?php
/**
 * @author zzq
 *
 */
require_once MYROOT . '/my/sta/conf/db/Download.php';
class AdminDownloadAction extends AdminAction {

    public function _initialize() {
        parent::_initialize();
    }
 public function addDownload() {
        $id     = HttpNamespace::getGET('id');
        $result = DownloadModel::getArticleById($id);
        $result['allType'] = array_merge(Download::$TYPE['public']['child'], Download::$TYPE['personal']['child']);
        $this->assign('result', $result);
        $this->display();
    }
    public function downloadPost() {
    
        $data = array();
        $id = HttpNamespace::getPOST('id');
        $data['user_id']    = $_SESSION['user_id'];
        $data['title']      = HttpNamespace::getPOST('title');
        $data['author']     = HttpNamespace::getPOST('author');
        $data['from']       = HttpNamespace::getPOST('from');
        $data['content']    = htmlspecialchars($_POST['content']);
        $data['type']       = HttpNamespace::getPOST('type');
        $data['link']       = HttpNamespace::getPOST('link');//文章作者
        $data['attachment'] = HttpNamespace::getPOST('attachment', '');//
        $data['realname']   = HttpNamespace::getPOST('realname', '');//
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
        
        if(DownloadModel::saveData($data, $id)) {
            HttpNamespace::redirect(__URL__."/addDownload", 1, "添加成功");
        }else {
            HttpNamespace::redirect(__URL__."/addDownload", 2, "添加失败");
        }
    }
    public function downloadList(){
       
        $result['type']  = intval($_GET['type']);
        $result['types'] = $this->merge_arrays(Download::$TYPE['public']['child'], Download::$TYPE['personal']['child']);//二级菜单
        
        $result['title'] = "download - neuro uestc";
        
        //文章类型
        $map['del'] = array('eq', 0);
        if($result['type'] == 0){
            $allT = array_merge(Download::$TYPE['public']['allTypes'], Download::$TYPE['personal']['allTypes']);
            $map['type'] = array('in', implode(',', $allT));
        } else{
            $map['type'] = array('eq', $result['type']);
        }
        list($result['page'], $result['result']) = DownloadModel::getArticleByTypeShowPage($map,'id DESC' ,self::PAGE_SIZE);
        $this->assign("result",$result);
       
        $this->assign('allType', $result['types']);
        
        $this->assign('result',$result['result']);
        $this->assign('page',$result['page']);
        $this->display();
    }
}
