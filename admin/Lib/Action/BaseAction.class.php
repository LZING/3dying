<?php
class BaseAction extends EmptyAction {
    /**
     * --------------------
     * 设置redirect,user,msg全局变量(所有model),userid 用户id
     * --------------------
    */
    
    public $confSheet = null;//配置表 保存各个表中字段对应的值
    
    
    public $userId = null;
    /**
     * -------------------
     * -------------------
     */ 
   
    public function _initialize() {
        parent::_initialize();
        $this->confSheet = D('Conf');
        $this->getActionName();
    }
    /**
     * @brief 右侧功能菜单
     * @param string $dbConf
     * @param object $model
     * @param string $type
     */
    public function getRightMenu($dbConf, $limit, $type) {
        $right['type'] = $dbConf;
        $dbConfModel = $dbConf.'Model';
        $right['title']  = $dbConf::$TYPE[$type]['name'];
        $right['result'] = $dbConfModel::getArticleByType($dbConf::$TYPE[$type]['allTypes'], 'id DESC', 5);
        $this->assign("right",$right);
    }
    /**
     * @brief 计算图片高度显示
     * Enter description here ...
     * @param unknown_type $images
     */
    public function getImageHeight($images) {
        $image  = getimagesize($images);
        if (($image[1] * 960 / $image[0]) > 200) {
            $height = $image[1] * 960 / ($image[0] * 2.5);
            $this->assign("height",$height);
        }
    }
    /**
     * @brief 合并数组 键值不变
     * @param array $array1,$array2
     */
    public function merge_arrays($arry1, $arry2) {
       foreach ($arry2 as $key => $value) {
           $arry1[$key] = $value;
       }
       return $arry1;
    }
    function check_privite() {
        if(empty($_SESSION['login']) || ($_SESSION['information']['privite']==0)){
            $url=__APP__;
            $this->redirect->redirected("请求的页面不存在",$url);
        }
    }
}