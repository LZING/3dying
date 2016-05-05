<?php
class AdminAction extends BaseAction{
    const PAGE_SIZE = 20;
    /**
     * ----------------------------------------------
     * 后台管理员
     * ----------------------------------------------
     */
    public function _initialize() {
        parent::_initialize();
        if (!EmptyAction::adminCheck()) {//是否是管理员
            HttpNamespace::redirect(__APP__, 2, "请求的页面不存在");
        }
    }
    function index(){
        $this->display();
    }
    function side(){
        $this->display();
    }
    function top(){
        $this->display();
    }
    function members(){
        $type = $_GET['type'];
        $allType = $this->confSheet->where("`sheet` = " . Base::CD_USER . " AND `field` = 'leadership'")->order('value asc')->select();
        $degree  = $this->confSheet->where("`sheet` = " . Base::CD_USER . " AND `field` = 'degree'")->order('value asc')->select();
        $titles   = $this->confSheet->where("`sheet` = " . Base::CD_USER . " AND `field` = 'titles'")->order('value asc')->select();
       
        $newDegree = array(); $newTitles = array();
        foreach($degree as $key => $value) {
            $newDegree[$value['value']] = $value['name'];
        }
        foreach($titles as $key => $value) {
            $newTitles[$value['value']] = $value['name'];
        }
       
        if (!isset($type)) {
             $map['leadership'] = array('egt', 0);
        } else {
             $map['leadership'] = array('eq', $type);
        }
        list($result['page'], $result['result']) = UserModel::getUserByTypeShowPage($map, 'id DESC', self::PAGE_SIZE);
        
        $this->assign('result',$result['result']);
        $this->assign('newDegree',$newDegree);
        $this->assign('newTitles',$newTitles);
        $this->assign('allType',$allType);
        $this->assign('page',$result['page']);
        $this->assign("type",$type);
        
        $this->display();
    }


   
    
    function setting_leadership(){
        $id=intval($_GET['id']);
        $leadership=intval($_GET['leadership']);
        $result=D("User")->where("id='$id'")->setField('leadership',$leadership);
        if($result){
            echo 1;exit;
        }
        else{
            echo 0;exit;
        }
        
    }
    function setting(){
        $data=null;
        $data['privite']=intval($_GET['type']);
        $id=intval($_GET['id']);
        
        if($data['privite']!=0 && $data['privite']!=1 && $data['privite']!=2){
            echo 0;exit;
        }
        else{
            $result=D("User")->where("id='$id'")->save($data);
            if($result){
                echo 1;exit;
            }
            else{
                echo 0;exit;
            }
        }
    }
  
  
    
    //contact
    function contact(){
        $result=D("Contact")->find();
        $this->assign("result",$result);
        $this->display();
    }
    function contact_post(){
        $data = array();
       
        $data['belong']   = htmlspecialchars($_POST['belong']);
        $data['tel']      = htmlspecialchars($_POST['tel']);
        $data['fax']      = htmlspecialchars($_POST['fax']);
        $data['email']    = htmlspecialchars($_POST['email']);
        $data['postcode'] = htmlspecialchars($_POST['postcode']);
        $data['address']  = htmlspecialchars($_POST['address']);
        $data['user_id']  = $_SESSION['information']['id'];
        $data['time']     = time();
        $UploadedFile     = $_FILES['image']['tmp_name']; 
       // dump($data);exit();
        if($UploadedFile && is_uploaded_file($UploadedFile)) {
            include_once MYROOT . '/my/action/File.php';
            $image = File::uploadFile($UploadedFile);
            
            if ($image['error'] == 0) {
                $data['image'] = $image['msg'][0]['savepath'] . $image['msg'][0]['savename'];
               
            } else {
                HttpNamespace::redirect(__URL__.'/contact', 2, $image['msg']);
            }
        }
       
        $result=D("Contact")->where("id = 1")->save($data);
        if($result){
            HttpNamespace::redirect( __APP__.'/Admin/contact', 1, "修改成功！"); 
        }
        else{
            HttpNamespace::redirect( __APP__.'/Admin/contact', 2, "修改失败！");
        }
        
    }
}    
?>