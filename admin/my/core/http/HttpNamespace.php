<?php
class HttpNamespace {
    /**
     * 取得http头信息
     */
    public static function header($header) {
        if (empty($header)) {
            return null;
        }
        // Try to get it from the $_SERVER array first
        $temp = 'HTTP_' . strtoupper(str_replace('-', '_', $header));
        if (isset($_SERVER[$temp]) && $_SERVER[$temp] !== '') {
            return $_SERVER[$temp];
        }
        // This seems to be the only way to get the Authorization header on
        // Apache
        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            if (!empty($headers[$header])) {
                return $headers[$header];
            }
        }
        return false;
    }
    /**
     *  判断是否是ajax操作的数据
     */
    public static function isAjax() {
        return ('XMLHttpRequest' == self::header('X_REQUESTED_WITH'));
    }
    /**
     * 判断页面是否是数据post过来
     * @return boolean
     */
    public static function isPost() {
        return $_SERVER['REQUEST_METHOD'] == 'POST';
    }
    
    /**
     *  判断 http  method 是否为get
     */
    public static function isGet() {
        return $_SERVER['REQUEST_METHOD'] == 'GET';
    }
    /**
     * 获取GET中的数据
     * @param $key				GET中的key
     * @param $default			如果数据不存在，默认返回的值。默认情况下为false
     * @param $enableHtml		返回的结果中是否允许html标签，默认为false
     * @return string
     */
    public static function getGET($key, $default = false, $enableHtml = false) {
        if (isset ($_GET[$key])) {
            return !$enableHtml ? strip_tags($_GET[$key]) : $_GET[$key];
        }
        return $default;
    }
    /**
     * 获取POST中的数据
     * @param $key				POST中的key
     * @param $default			如果数据不存在，默认返回的值。默认情况下为false
     * @param $enableHtml		返回的结果中是否允许html标签，默认为false
     * @return string
     */
    public static function getPOST($key, $default = false, $enableHtml = false) {
        if (isset ($_POST[$key])) {
            return !$enableHtml ? strip_tags($_POST[$key]) : $_POST[$key];
        }
        return $default;
    }
    // 获取REQUEST中的数据
    /// @param $key				REQUEST中的key
    /// @param $default			如果数据不存在，默认返回的值。默认情况下为false
    /// @param $enableHtml		返回的结果中是否允许html标签，默认为false
    /// @return string
    public static function getREQUEST($key, $default = false, $enableHtml = false) {
        if (isset ($_REQUEST[$key])) {
            return !$enableHtml ? strip_tags($_REQUEST[$key]) : $_REQUEST[$key];
        }
        return $default;
    }
    /**
     * @author zzq
     * @brief 跳转函数
     */
    public static function redirect($goto, $stop = 1, $content='') {
        //多行URL地址支持
         $root = __ROOT__;
        if ($goto){
            $refresh    = "<meta http-equiv=\"refresh\" content=\"$stop;URL=$goto\">";
            $action     = "<a href=\"$goto\">如果您的浏览器没有自动跳转,请点击这里</a>";
    	}else if($goto==""){
            if($content!=""){
                $refresh	= '';
    		    $action		= '<a href="#" onclick="javascript:history.go(-1)"><< 返 回 继 续 操 作</a>';
            }
            if($content==""){
                $goto=__APP__;
                $refresh	= "<meta http-equiv=\"refresh\" content=\"$stop;URL=$goto\">";
    		    $action		= "<a href=\"$goto\">如果您的浏览器没有自动跳转,请点击这里</a>";
            }		
    	}
        $html = <<<EOT
    	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    	<html xmlns="http://www.w3.org/1999/xhtml">
    	<head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    	<link href="$root/Tpl/Public/css/register.css" type="text/css" rel="stylesheet" />
    	$refresh
    	<title>Prompting Message !</title>
    	</head>
    	<body style="background-color: #f2f2ff;">
    	<div id="wrap">
    		<div id="succeed">
    			<p id="registerOK" style="text-align:center;">$content</p>
    			<p id="welcJoin"><strong>UESTC perception-Motor Interation Labratory</strong></p>
    			<p id="jump">$action</p>
    		</div>
    	</div><!--wrap-->
    	</body>
    	</html>
EOT;
exit($html);
    }
}