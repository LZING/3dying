<?php
class Action {
    
    protected $tVar        =  array(); // 模板输出变量
    // 视图实例对象
    protected $view   =  null;
    // 当前Action名称
    private $name =  '';
    
    public $cumtomParams = array();
    // 设置自定义参数，在入口调用
    
    public function setCustomParams($cumtomParams = array()) {
        $this->cumtomParams = $cumtomParams;
    }

   /**
     +----------------------------------------------------------
     * 架构函数 取得模板对象实例
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     */
    public function __construct() {
        //实例化视图类
        $this->view       = new View();
        
		$this->tVar['jsfile'] = array();
		$this->tVar['cssfile'] = array();
    }

    public function init() {
    }

    /**
     +----------------------------------------------------------
     * 模板显示
     * 调用内置的模板引擎显示方法，
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $templateFile 指定要调用的模板文件
     * 默认为空 由系统自动定位模板文件
     * @param string $charset 输出编码
     * @param string $contentType 输出类型
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    protected function display($templateFile='',$charset='',$contentType='') {
        $this->view->display($templateFile,$charset,$contentType, $this->tVar);
    }

    /**
     +----------------------------------------------------------
     *  获取输出页面内容
     * 调用内置的模板引擎fetch方法，
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $templateFile 指定要调用的模板文件
     * 默认为空 由系统自动定位模板文件
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    protected function fetch($templateFile='') {
        return $this->view->fetch($templateFile);
    }

	
	 /**
     * @param mix array|string $js
     */

    public function addJS($js) {
        if ($js == '' || empty($js)) {
            return false;
        }

        if(is_array($js)) {
            foreach($js as $v) {
                $this->tVar['jsfile'][] = $v;
            }
        }else {
            $this->tVar['jsfile'][] = $js;
        }
    }

     public function setJS($js) {
        if ($js == '' || empty($js)) {
            return false;
        } 
        if(is_array($js)) {
            $this->tVar['jsfile'] = $js;
        }else {
            $this->tVar['jsfile'] = (array)$js;
        }
    }
	
	 /**

     * 

     * @param array|string $css

     */

    public function addCSS($css) {
        if ($css == '' || empty($css)) {
            return false;
        }
        if(is_array($css)) {
            $this->tVar['cssfile']   =  array_merge($this->tVar['cssfile'], $css);
        }else {
            $this->tVar['cssfile'] = (array)$css;

        }
    }
    /**
     +----------------------------------------------------------
     * 模板变量赋值
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param mixed $name 要显示的模板变量
     * @param mixed $value 变量的值
     +----------------------------------------------------------
     * @return void
     +----------------------------------------------------------
     */
    public function assign($name,$value=''){
        if ($name == '' || empty($name)) {
            return false;
        }
        if(is_array($name)) {
            $this->tVar   =  array_merge($this->tVar,$name);
        }elseif(is_object($name)){
            foreach($name as $key =>$val)
                $this->tVar[$key] = $val;
        }else {
            $this->tVar[$name] = $value;
        }
    }

    public function __set($name,$value) {
        $this->assign($name,$value);
    }
     /**
     +----------------------------------------------------------
     * 取得模板变量的值
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @param string $name
     +----------------------------------------------------------
     * @return mixed
     +----------------------------------------------------------
     */
    

    /* 取得所有模板变量 */
    public function getAllVar(){
        return $this->tVar;
    }
    
    public function get($name){
        if(isset($this->tVar[$name]))
            return $this->tVar[$name];
        else
            return false;
    }
    /**
     +----------------------------------------------------------
     * 取得模板显示变量的值
     +----------------------------------------------------------
     * @access protected
     +----------------------------------------------------------
     * @param string $name 模板显示变量
     +----------------------------------------------------------
     * @return mixed
     +----------------------------------------------------------
     */
    public function __get($name) {
        return $this->get($name);
    }

   
   /**
     +----------------------------------------------------------
     * 析构方法
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     */
    public function __destruct() {
      
    }
}