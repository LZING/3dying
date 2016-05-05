<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2012 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
// $Id: View.class.php 2702 2012-02-02 12:35:01Z liu21st $

/**
 +------------------------------------------------------------------------------
 * ThinkPHP 视图输出
 +------------------------------------------------------------------------------
 * @category   Think
 * @package  Think
 * @subpackage  Core
 * @author liu21st <liu21st@gmail.com>
 * @version  $Id: View.class.php 2702 2012-02-02 12:35:01Z liu21st $
 +------------------------------------------------------------------------------
 */
class View {
    
    protected $tVar =  array(); // 模板输出变量
    
    /**
     +----------------------------------------------------------
     * 加载模板和页面输出 可以返回输出内容
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @param string $templateFile 模板文件名
     * @param string $charset 模板输出字符集
     * @param string $contentType 输出类型
     +----------------------------------------------------------
     * @return mixed
     +----------------------------------------------------------
     */
    public function display($templateFile='',$charset='',$contentType='',$templValue) {
        // 视图开始标签
        foreach ((array)$templValue as $k => $v){
            $this->$k = $v;
        }
        //解析并获取模板内容
        $content = $this->fetch($templateFile);
        // 输出模板内容
        $this->show($content,$charset,$contentType);
    }

    /**
     +----------------------------------------------------------
     * 输出内容文本可以包括Html
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @param string $content 输出内容
     * @param string $charset 模板输出字符集
     * @param string $contentType 输出类型
     +----------------------------------------------------------
     * @return mixed
     +----------------------------------------------------------
     */
    public function show($content,$charset='',$contentType=''){
        if(empty($charset))  $charset = Convention::DEFAULT_CHARSET;
        if(empty($contentType)) $contentType = 'text/html';
        // 网页字符编码
        
        header('Content-Type:'.$contentType.'; charset='.$charset);
     
        // 输出模板文件
         
        echo $content;
    }

    /**
     +----------------------------------------------------------
     * 解析和获取模板内容 用于输出
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @param string $templateFile 模板文件名
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function fetch($templateFile='') {
        // 模板文件解析标签
        $this->getTemplateFile($templateFile);
        // 模板文件不存在直接返回
        if(!is_file($templateFile)) {
            
        }
        // 页面缓存
        ob_start();
        ob_implicit_flush(0);
        
        if('php' == strtolower(Convention::TMPL_ENGINE_TYPE)) { // 使用PHP原生模板
            // 模板阵列变量分解成为独立变量
            extract($this->tVar, EXTR_OVERWRITE);
            // 直接载入PHP模板
            
            include $templateFile;
            
        }else{
//            // 视图解析标签
//            $params = array('var'=>$this->tVar,'file'=>$templateFile);
//            tag('view_parse',$params);
            
        }
       
        // 获取并清空缓存
        $content = ob_get_clean();
        //替换常量
        $this->constantReplace($content);
        // 输出模板文件
        return $content;
    }
    
    /**
     * @brief 获取模板
     * @param string $templateFile
     */
    public function getTemplateFile(&$templateFile) {
        $locationTemplate = new LocationTemplateBehavior();
        $locationTemplate->run($templateFile);
    }
    
    /**
     * @brief 内容过滤标签 替换../Public,__APP__等
     * @param sting $content
     */
    public function constantReplace(&$content) {
        $contentReplace = new ContentReplaceBehavior();
        $contentReplace->run($content);
    }
    
    /**
     * 加载helper文件
     * Enter description here ...
     */
    function helper($funName, $params = array()) {
        
        $fun  = $funName.'_helper';
        $filePath = PLUGIN . '/helper/' . $fun . '.php';
        if (file_exists($filePath)) {
            include_once($filePath);
            if (function_exists($funName)) {
                return $funName($params);
            }
        } else {
            trigger_error('文件' . $filePath . '不存在');
        }
    }
    /**
     * @brief加载文件template
     * @param string $fileName
     * @param array $params
     */
    public function load($fileName, $params = array()) {
        $filePath = TPL . '/' .$fileName;
        if (!file_exists($filePath)){
            trigger_error('文件' . $filePath . '不存在');
        } else {
            if ($params != null) {
                extract((array)$params);
            }
            include $filePath;
        }
       
    }
}