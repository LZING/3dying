<?php 
/**
 * @author zzq
 */
require_once MYROOT . '/my/sta/conf/db/Base.php';
require_once MYROOT . '/Lib/Model/BaseModel.class.php';
require_once MYROOT . '/my/core/http/HttpNamespace.php';
class EmptyAction extends Action {

    public $moduleName = null;
    public $actionName = null;
    
    public function _initialize() {
        header("Content-type: text/html; charset=utf-8");
        $this->getActionName();
        if (HttpNamespace::isAjax()) {
            $action = ACTION_NAME;
            $moduleName = $this->getAjaxAction();
            $moduleName->init();
            $moduleName->$action();
            exit();
        } 
    }
    public function _empty() {
        HttpNamespace::redirect(__APP__, 22, "请求的页面不存在");
    }
    
    /**
     * @brief 得到module action 
     * 
     */
     public function getActionName() {
        $this->moduleName = MODULE_NAME;
        $this->actionName = ACTION_NAME;
        $this->assign("action", strtolower($this->actionName));
        $this->assign("module", strtolower($this->moduleName));
    }
    
    private function getAjaxAction() {
        $instanceClassName = "{$this->moduleName}Ajax";
        $instanceClassPath = MYROOT . "/Lib/Action/ajax/{$instanceClassName}.php";
        if (!file($instanceClassPath)) {
            echo json_encode(array('error' => 1, 'message' => '不存在file'));exit();
        }
        include_once $instanceClassPath;
        if (!class_exists($instanceClassName)) {
            echo json_encode(array('error' => 1, 'message' => '不存在module'));exit();
        }
        return new $instanceClassName();
    }
    /**
     * @brief分页
     * @param object $model
     * @param array $map 查询条件
     * @param $order 排序
     * @return array page样式 ，数据
     */
    public static function showPage($model, $pageSize = 10, $map = null, $order = 'id desc', $join = null, $field = null) {
        if ($model == "") {
            return false;
        }
        import("ORG.Util.Page");    //count总数；num每页显示数
        $num  = $model->where($map)->count();
        $page = new Page($num, $pageSize);
        $result[]   = $page->show();
        $result[]   = $model->where($map)->field($field)->join($join)->limit($page->firstRow.','.$page->listRows)->order($order)->select();
        return $result;
        
    }
    /**
     * @brief 管理员判断 保护ajax 其他 请求
     */
    public static function adminCheck() {
        if ($_SESSION['login'] && $_SESSION['admin']) return true;
        return false; 
    }
/**
     * @brief 保护ajax 其他 请求
     */
    public static function loginCheck() {
        if ($_SESSION['login']) return true;
        return false; 
    }
}