<?php
class UserAction extends BaseAction{
    public $user = null;
    
    public function _initialize() {
        parent::_initialize();
        $this->user = D('User');
    }

    function index(){
       $this->display();
    } 
    function checkusername(){
        $username=htmlspecialchars($_GET['username']);
        $user=$this->user->where("username='$username'")->find();
        if($user){
            echo("1");exit;
        }
        else{
            echo("2");exit;
        }
    }
    function detail(){
        $id=intval($_GET['id']);
        if($id<=0){
            $this->redirect->redirected("错误！",'',2);
        }
        else{
            $result=D("User")->where("id='$id' AND privite!=0")->find();
           // dump($result);exit;
            if($result){
                $publication=D("Publication")->where("class=0 AND user_id='$id'")->select();
                $recent=D("User")->where("privite!=0")->limit("5")->order("id desc")->select();
                $this->assign("recent",$recent);
                $this->assign("result",$result);
                $this->assign("publication",$publication);
              //  dump($publication);
            }
            else{
                $this->redirect->redirected("错误！",'',2);
            }
        }
        $this->display();
    }
    function setting(){
        $this->check_login();
        $id=$_SESSION['information']['id'];
        $result=D("User")->where("id='$id'")->find();
        $recent=D("User")->where("privite!=0")->order("id DESC")->limit(6)->select();
        if($result){
            $this->assign("recent",$recent);
            $this->assign("title","Setting");
            $this->assign("result",$result);
              //  dump($result);exit;
            $this->display();
        }
        else{
            $this->redirect->redirected("ERROE",__APP__);
        }
    }
    function post(){
        $this->check_login();
        $id=$_SESSION['information']['id'];
        $data=array();
        $UploadedFile=$_FILES['UploadedFile']['tmp_name']; 
        if($UploadedFile && is_uploaded_file($UploadedFile)){  
            import("ORG.Net.UploadFile");   
            $upload = new UploadFile(); // 实例化上传类   
            $upload->maxSize  = 314572811 ; // 设置附件上传大小   
            $upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg'); // 设置附件上传类型    
           // $upload->allowTypes =   array('image/pjpeg','pjpeg','jpg');//允许上传的文件类型（留空为不限制），使用数组设置，默认为空数组
            $upload->savePath =  './images/'; // 设置附件上传目录(所有头像目录)
            $upload->saveRule= com_create_guid;//多个文件是只能用uniqid或者com_create_guid，time会出现重复
            //上传文件的保存规则，必须是一个无需任何参数的函数名，例如可以是 time、 uniqid com_create_guid 等，但必须能保证生成的文件名是唯一的，默认是uniqid
            if(!$upload->upload()) { 
                $this->redirect->redirected($upload->getErrorMsg(),'') ;// 上传错误 提示错误信息   
           //$this->error($upload->getErrorMsg());   
            
            }
            else{ // 上传成功 获取上传文件信息   
            
                $info =  $upload->getUploadFileInfo();   
                $data['image']=$info[0]["savename"];
            }   
        }
        $error=null;
        $leadership=0;
        $data['Chinese_name']=htmlspecialchars($_POST['Chinese_name']);
        $data['English_name']=trim(htmlspecialchars($_POST['English_name']));
        $data['leadership']=intval($_POST['leadership']);
        $data['degree']=intval($_POST['degree']);
        $data['title']=intval($_POST['title']);
        $data['email']=htmlspecialchars($_POST['email']);
        $data['phone']=htmlspecialchars($_POST['phone']);
        $data['homepage']=urlFormat(trim(htmlspecialchars($_POST['homepage'])));
        $data['introduction_study']=htmlspecialchars($_POST['introduction_study']);
        $data['introduction_work']=htmlspecialchars($_POST['introduction_work']);
        $data['research_main']=htmlspecialchars($_POST['research_main']);
        $data['teach_class']=htmlspecialchars($_POST['teach_class']);
        $data['lastupdate_time']=time();
        if($data['leadership']==5){//如果申请director时要通过管理员验证，通过后当前状态再改变
            $data['leadership']=$_SESSION['information']['leadership'];
            $data['cofirm_director']=0;
            $leadership=5;
        }
        if(empty($data['English_name'])){
            $error.="请填写English Name,";
        }
        if(!ereg("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9\-\.])+", $data['email'])){
            $error.="请输入正确的email";
        }
        if($error==null){
            $result=D("user")->where("id='$id'")->save($data);
            if($result){
                if($leadership==5 && $_SESSION['information']['leadership']!=5){
                    $message=array();
                    $message['cduid']=16;//接受人id（此处为超级管理员）
                    $message['content']="用户".$_SESSION['information']['username']."(".$_SESSION['information']['English_name'].")正在申请实验室 Director！";
                    $message['date']=time();
                    $message['fromid']=$_SESSION['information']['id'];
                    $re=D("Msg")->add($message);
                    if($re){
                        $this->redirect->redirected("修改成功,等待管理员审核通过！",__APP__."/user/setting",3);
                    }
                    else{
                        $this->redirect->redirected("修改失败！",__APP__."/user/setting",3);
                    }
                }
                else{
                    $this->redirect->redirected("修改成功",__APP__."/user/setting");
                }
                
            }
            else{
                $this->redirect->redirected("ERROR",__APP__."/user/setting");
            }
        }
        else{
            $this->redirect->redirected($error,__APP__."/user/setting");
        }
    }
    function change_pass(){
        $this->check_login();
        $this->display();
    }
    function post_pass(){
        $this->check_login();
        $data=array();
        $id=$_SESSION['information']['id'];
        $old=$_POST['oldpass'];
        $newpass=trim($_POST['newpass']);
        $confirmpass=$_POST['confirmpass'];
        if(md5($old)!=$_SESSION['information']['password']){
            $this->redirect->redirected("原密码错误！",__APP__."/user/change_pass",2);
        }
        if($newpass!=$confirmpass){
            $this->redirect->redirected("两次输入的密码不相同！",__APP__."/user/change_pass",2);
        }
        else{
            $data['password']=md5($newpass);
            $result=D("User")->where("id='$id'")->save($data);
            if($result){
                $this->redirect->redirected("密码修改成功",__APP__."/user/change_pass",2);
            }
            else{
                $this->redirect->redirected("修改失败！",__APP__."/user/change_pass",2);
            }
        }
    }
    
}