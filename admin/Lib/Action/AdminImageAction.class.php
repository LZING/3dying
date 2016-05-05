<?php
/**
 * @author zzq
 *
 */
class AdminImageAction extends AdminAction {

    public function _initialize() {
        parent::_initialize();
    }
    public function image() {
        $imageType = ImagesModel::getAllImageType();
        $this->assign('imageType', $imageType);
        $this->display();
    }
    /**
     * 
     */
    public function imageList() {
        
        $imageType = ImagesModel::getAllImageType();
        $type      = intval($_GET['type']);
        $image     = D("Image");
        if ($type != 0) {
            $map['type'] = array('eq', $type);
        }
        list($result['page'], $result['result'])  = ImagesModel::getImagesByTypeShowPage($type, 'id desc', TRUE);
        $this->assign('imageType', $imageType);
        $this->assign('result',    $result);
        $this->display();
    }
    /**
     * 
     */
    public function imagePost() {
        $flag = 0;
        $type = intval($_POST['type']);
        if(count($_POST['imagess']) < 1) {
            HttpNamespace::redirect(__URL__."/image",2,"ERROR2！");
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
            $filename      = basename($data['image']);
            $filepath      = dirname($data['image']);
            if(is_file($filepath.'/thumb-'.$filename)) {
                $data['thumb'] = $filepath.'/thumb-'.$filename;
            } else {
                $data['thumb'] = $data['image'];
            }
            $data['user_id'] = $_SESSION['user_id'];
            $data['time']    = time();
            $data['type']    = $type;

            $result = ImagesModel::saveData($data);
            //
            if(!$result) {
                HttpNamespace::redirect(__URL__."/image", 2, "保存失败");
            }
        }
        if($flag==0){
            HttpNamespace::redirect(__URL__."/image", 2, "您没有做修改");
        }
        HttpNamespace::redirect(__URL__."/image", 2, "修改成功");
    }
    /**
     *
     */
    public function imageType() {
        $imageType = ImagesModel::getAllImageType();
      
        $this->assign('imageType', $imageType);
        $this->display();
    }
}