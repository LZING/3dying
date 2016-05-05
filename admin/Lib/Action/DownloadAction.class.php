<?php
require_once MYROOT . '/my/sta/conf/db/Download.php'; 
require_once MYROOT . '/my/sta/conf/db/Publish.php';
require_once MYROOT . '/my/sta/conf/db/News.php';

class DownloadAction extends PublicBaseAction{
   
    const PAGE_SIZE = 5;
    public $download = null;
    
    function _initialize() {
        
        parent::_initialize();
        $this->download = D('Download');
        $this->getRightMenu('News', 5, 'news');//显示模型
    }
    function index() {
        $result['type']  = intval($_GET['type']);
        $result['types'] = $this->_getSecondMenu();//二级菜单
        
        $result['title'] = "Download - neuro uestc";
        //文章类型
        $map['del'] = array('eq', 0);
        if($result['type'] == 0){
                $map['type'] = array('in', implode(',', $result['types']['allTypes']));
        } else{
            $map['type'] = array('eq', $result['type']);
            $result['title'] = "Download " . $result['types']['child'][$result['type']]['name'] . " - neuro uestc";
        }
        list($result['page'], $result['result']) = DownloadModel::getArticleByTypeShowPage($map, 'id DESC', self::PAGE_SIZE);
        $this->assign("result",$result);
        $this->display('Public:content');
    }
    /**
     * @brief 获取二级惨淡 判断是否登陆
     * @return array
     */
    private function _getSecondMenu() {
        if ($this->isLogin()) {
            $types = Download::$TYPE['public'];
            $types['allTypes'] = array_merge($types['allTypes'], Download::$TYPE['personal']['allTypes']);
            $types['child']    = $this->merge_arrays($types['child'], Download::$TYPE['personal']['child']);
            return $types;
        }
        return Download::$TYPE['public'];
    }
   
    function detail(){
        $id = intval($_GET['id']);
        $result['result'] = DownloadModel::getArticleById($id);
        $result['title']  = $result['result']['title']. "neuro uestc";
        if(!$result['result']){
            $this->redirect->redirected("文章不存在！",__APP__."/Publication",2);
        }
        $menu = $this->_getSecondMenu();
        $result['top_title'] = $menu['child'][$result['result']['type']]['brief'];
        $result['top_title_link'] = __URL__ . '/?type=' .$result['result']['type'];
        //计算图片显示位置
        $this->getImageHeight($result['result']['image']);
        
        $this->assign("result",$result);
        $this->display();
    }
    function download(){
        $id     = intval($_GET['id']);
        $result = DownloadModel::getArticleById($id);
        if ($result['attachment']) {
            include_once MYROOT . '/my/action/File.php';
            DownloadModel::setUpDownloadTimes($id);
            File::downloadFile($result['attachment'], $result['realname']);
        }
    }
}