<?php
/**
 * 完成URL解析、路由和调度
 */
class ThinkPHP {
    
    public function run() {
        $this->loadRunFile();
        $this->parseURL();
    }
    
    /**
     * @brief 加载运行常用文件
     */
    public function loadRunFile() {
        require THINKPHP . '/common/function.php';
        //配置文件
        require_cache(CONFIG . '/Convention.class.php');
        if(Convention::SESSION_AUTO_START) {
            session_start();
        }
        
        require_cache(CONFIG . '/ErrorConfig.class.php');
        require_cache(CONFIG . '/DBConfig.class.php');
        //日志文件
        require_cache(THINKPHP . '/lib/log/Log.class.php');
        //核心文件
//      echo THINKPHP . '/lib/dispatch/Dispatcher.class.php';exit;
        require_cache(THINKPHP . '/lib/dispatch/Dispatcher.class.php');
        require_cache(THINKPHP . '/lib/core/Action.class.php');
        require_cache(THINKPHP . '/lib/core/Model.class.php');
        require_cache(THINKPHP . '/lib/core/View.class.php');
        //http类
        require_cache(THINKPHP.'/lib/http/HttpNamespace.class.php');
        //behavior文件
        $behavior = array(
            THINKPHP . '/lib/core/Behavior.class.php',
            THINKPHP . '/lib/behavior/ContentReplaceBehavior.class.php',
            THINKPHP . '/lib/behavior/LocationTemplateBehavior.class.php',
        );
        foreach ($behavior as $value) {
            require_cache($value);
        }
        //其他
		
        require_cache(ROOT . '/common/common.php');
        
    }
    
    /**
     * @brief 解析当前的url并且分发到webroot下面支持channel/module/action
     */
    public function parseURL() {

        $paths = array();
        // 解析URL
		$_SERVER['PATH_INFO'] = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : $_SERVER['REQUEST_URI'];
        $pos = strpos($_SERVER['PATH_INFO'], '?');
        if ($pos) {
            $_SERVER['PATH_INFO'] = substr($_SERVER['PATH_INFO'], 0, $pos);
        }
        if(!empty($_SERVER['PATH_INFO'])) {
            $paths = explode('/', trim($_SERVER['PATH_INFO'],'/'));
        } else {
            $paths = array(Convention::DEFAULT_CHANNEL, Convention::DEFAULT_MODULE , Convention::DEFAULT_ACTION);
        }
        //判断执行channel,module,action
        $paths[0] = !empty($paths[0]) ? $paths[0] : Convention::DEFAULT_CHANNEL;
        $paths[1] = !empty($paths[1]) ? $paths[1] : Convention::DEFAULT_MODULE;
        $paths[2] = !empty($paths[2]) ? $paths[2] : Convention::DEFAULT_ACTION;

        if (!isset($paths[0]) || !file_exists(WEBROOT . '/' . $paths[0] . '/' . $paths[1] . '.php')) {
            $paths = array(Convention::DEFAULT_ERROR_CHANNEL, Convention::DEFAULT_MODULE, Convention::DEFAULT_ACTION);
        }
        define('CHANNEL_NAME', $paths[0]);
        define('MODULE_NAME', $paths[1]);
        define('ACTION_NAME', $paths[2]);
        
        include_once(WEBROOT . '/' . $paths[0] . '/' . $paths[1] . '.php');

        //处理log
        Log::doLog();
    }
}
$t = new ThinkPHP();$t->run();
