<?php
/**
 +------------------------------------------------------------------------------
 * ThinkPHP内置的Dispatcher类
 * 完成URL解析、路由和调度
 +------------------------------------------------------------------------------

 +------------------------------------------------------------------------------
 */
class Dispatcher {

    private $_filePath  = null;
    private $_className = null;
   
    /**
     * 
     * @brief 执行分发
     * @param string $channel
     * @param string $module
     * @param string $action
     * @param array $cumtomParams
     */
    public static function run($channel = CHANNEL_NAME, $module = MODULE_NAME, $action = ACTION_NAME, $cumtomParams = array()) {
     
		new Dispatcher($channel, $module, $action, $cumtomParams);
    }

    private function __construct($channel = "", $module = "", $action = "", $cumtomParams = array()) {
        $this->_creatFilePath($channel, $module);
        $className = $this->_className;
        
        try { 
            include_once $this->_filePath;

            $obj = new $className();
            
            if (method_exists($obj, 'setCustomParams')) {
                $obj->setCustomParams($cumtomParams);
            }

            if (method_exists($obj, 'init')) {
                $obj->init();
            } 

            $action .= "Action";
            if (method_exists($obj, $action)) {
                $obj->$action();
            }
        }
        catch (Exception $e) {
            Log::error(sprintf('Exception in Dispatcher.class.php! errstr=%s, getTraceAsString=%s', 
                    $e->getMessage(), $e->getTraceAsString()), 'Dispatcher.class.php');
            //throw new Exception($e->getMessage());
           // trigger_error($e->getMessage(), E_USER_ERROR);
        }
    }
    
    /**
     * @brief得到相应文件
     */
    private function _creatFilePath($channel, $module) {
        $this->_className = $this->_getClassName($module);
        $this->_filePath   = APP . '/' . $channel . '/' . $this->_className . ".class.php";;
        if (!file_exists($this->_filePath)) {
            $error = basename($this->_filePath);
            trigger_error('文件' . $this->_filePath . '不存在', E_USER_ERROR);
        }
    }
    
    /**
     * @brief 得到调度class名
     * @param string $module
     */
    private function _getClassName($module) {
        if (strpos($module, '_') === false)
            return ucfirst($module) . 'Action';

        $modules = explode("_", $module);
        $str = '';
        foreach ($modules as $module) {
            $str .= ucfirst($module);
        }
        return $str . "Action";
    }
}