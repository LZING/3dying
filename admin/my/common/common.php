<?php
// 优化的require_once
function require_file($filename) {
    static $_importFiles = array();
    if (!isset($_importFiles[$filename])) {
        if (is_file($filename)) {
            require $filename;
            $_importFiles[$filename] = true;
        } else {
            $_importFiles[$filename] = false;
        }
    }
    return $_importFiles[$filename];
}
/**
 * @brief 处理昵称过长 最长占位16
 * @author zhaozhiqiang
 */
function subStrs($str, $l) {
    //统计字符串占位长度
    $realLength = (strlen($str) + mb_strlen($str,'UTF8')) / 2;//实际占位长度
    if ($realLength <= $l) {
        return $str;
    }
    $length = strlen($str);
    $len = 0;
    $newStr = '';
    for ($i =0; $i < $length; $i++) {
        if (ord($str[$i]) > 127) {
            $newStr.=$str[$i].$str[$i+1].$str[$i+2];
            $i= $i+2;
            $len = $len + 2;
        } else {
            $newStr.=$str[$i];
            $len++;
        }
        if ($len >= $l) {
            return $newStr;
        }
    }
}
/**
 * @brief 是否加了http://
 */
function urlFormat($url = null){
    if($url != null){
        if(!preg_match("/^(http|https)/i", $url)){
            $url = "http://" .$url;
        }
        return $url;
    }
    else{
        return "";
    }
}
/**
     * @author zzq
     * @brief 插件方法 
     */
function helper($funName, $params = array()) {
    $funName  = $funName.'_helper';
    $filePath = MYROOT . '/my/plugin/' . $funName . '.php';
    if (file_exists($filePath)) {
        include_once($filePath);
        if (function_exists($funName)) {
            return $funName($params);
        }
    }
}
?>

