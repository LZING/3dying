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
// $Id: LocationTemplateBehavior.class.php 2702 2012-02-02 12:35:01Z liu21st $

/**
 +------------------------------------------------------------------------------
 * 系统行为扩展 自动定位模板文件
 +------------------------------------------------------------------------------
 */
class LocationTemplateBehavior extends Behavior {
    // 行为扩展的执行入口必须是run
    public function run(&$templateFile){
        // 自动定位模板文件
        if(!file_exists($templateFile)) {
            $templateFile = $this->parseTemplateFile($templateFile);
        }
    }

    /**
     +----------------------------------------------------------
     * 自动定位模板文件
     +----------------------------------------------------------
     * @access private
     +----------------------------------------------------------
     * @param string $templateFile 文件名
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     * @throws ThinkExecption
     +----------------------------------------------------------
     */
    private function parseTemplateFile($templateFile) {
        if($templateFile == '') {
            // 如果模板文件名为空 按照默认规则定位
            $templateFile = TPL . '/' . CHANNEL_NAME . '/' . MODULE_NAME . '.php';
            if (ACTION_NAME != Convention::DEFAULT_ACTION) {
                $templateFile = TPL . '/' . CHANNEL_NAME . '/' . MODULE_NAME . '_' . ACTION_NAME . '.php';
            }
        }else{
            // 解析
            $path = TPL;
            $templateFile  =  $path . '/' . $templateFile;
        }
        
        if(!file_exists($templateFile)) {
            trigger_error('文件' . $templateFile . '不存在');
        }
        return $templateFile;
    }
}