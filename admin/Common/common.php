<?php
//require_once MYROOT . '/my/sta/conf/BaseConf.php';
//require_once MYROOT . '/my/sta/conf/MyConf.php';
function msubstr($str, $start=0, $length, $charset="utf-8", $suffix=true)
{
    if(function_exists("mb_substr")) {
        if($suffix)
        {
            if($str==mb_substr($str, $start, $length, $charset)) 
            {
                return mb_substr($str, $start, $length, $charset); 
            }
            else
            {
                return mb_substr($str, $start, $length, $charset)."..."; 
            }  
        }
        else  
        {
            return mb_substr($str, $start, $length, $charset);
        }
    }
    elseif(function_exists('iconv_substr')) {
        if($suffix)
        {
            if($str==iconv_substr($str,$start,$length,$charset)) 
            {
                return iconv_substr($str,$start,$length,$charset); 
            }
            else
            {
                return iconv_substr($str,$start,$length,$charset)."..."; 
            } 
        }
        else  
        {
            return iconv_substr($str,$start,$length,$charset);
        }
    }
    $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
    $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
    $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
    $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
    preg_match_all($re[$charset], $str, $match);
    $slice = join("",array_slice($match[0], $start, $length));
    if($suffix) return $slice."…";
    return $slice;
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
 * 高亮显示搜索结果
 */
 function HighLightKeyWord($keyWord, $oldStr)
    {
    	$newStr = $oldStr;
    	strlen($keyWord) > 0 && $newStr = preg_replace("/".$keyWord."/i", "<b><font color='red'>".$keyWord."</font></b>", $oldStr);
    	return $newStr;
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
 * 过滤特殊字符
 * Enter description here ...
 * @param unknown_type $data
 */
function filterChar($data)
{
    if(is_array($data)){
        
        foreach($data as $key=>$value)
        {
            if(!is_array($value))
            {
                $data[$key] = htmlentities($value,ENT_COMPAT,'UTF-8');
            }
            else
                $this->addslash($data[$key]);
        }
    }
    else
    {
        $data = htmlentities($data,ENT_COMPAT,'UTF-8');
    }
    return $data;
}  
/**
 * 输出时解析,高级表单编辑器
 */
function uh($str)
{
    $str = preg_replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '', $str);
   	$farr = array(
        "/\s+/",//过滤多余的空白
        "/<(\/?)(script|i?frame|style|html|body|title|link|meta|\?|\%)([^>]*?)>/isU",//过滤 <script 等可能引入恶意内容或恶意改变显示布局的代码,如果不需要插入flash等,还可以加入<object的过滤
        "/(<[^>]*)on[a-zA-Z]+\s*=([^>]*>)/isU",//过滤JavaScript的on事件
    );
    $tarr = array(
        " ",
        "", //如果要直接清除不安全的标签，这里可以留空
        "",
    );
    $str = preg_replace($farr,$tarr,$str);
    $str = htmlspecialchars($str);
    return $str;
}
/**
 +----------------------------------------------------------
 * 去掉对特殊字符的转意，输入是数组
 +----------------------------------------------------------
 * @参数 array $array 引用传递
 +----------------------------------------------------------
 * @return void
 +----------------------------------------------------------
 */
function StripS(&$array)
{
	foreach($array as $key=>$value){
		if(!is_array($array[$key])){
			$array[$key] = stripslashes($value);
		}
		else{
			StripS($array[$key]);
		}
	}
    return $array;
}
/**
 * @brif 获得用户ip
 */
function getIp() {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else
        $ip = $_SERVER['REMOTE_ADDR'];
    return $ip;
}
/**
 +----------------------------------------------------------
 * 隐藏十进制ip最后一段，变为*号
 +----------------------------------------------------------
 * @参数 string $ip
 +----------------------------------------------------------
 * @return string
 +----------------------------------------------------------
 */
function HiddenLastIP($ip)
{
	return preg_replace("/\.[\d]+$/", ".*", $ip);
}
/**
 * 读取换行空格
 */
function htmtocode($content){
   // $content = str_replace(" ","&nbsp;",$content);
    return $content;
}

//
 function upload(){
        $UploadedFile=$_FILES['image']['tmp_name']; 
          if($UploadedFile){  
            import("ORG.Net.UploadFile");   
            $upload = new UploadFile(); // 实例化上传类   
            $upload->maxSize  = 314572811 ; // 设置附件上传大小   
            $upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg','wma','mp3'); // 设置附件上传类型    
            //$upload->allowTypes =   array('img','audio');//允许上传的文件类型（留空为不限制），使用数组设置，默认为空数组
            $upload->savePath =  './Uploadss/'; // 设置附件上传目录   
            $upload->saveRule= com_create_guid;//多个文件是只能用uniqid或者com_create_guid，time会出现重复
            //上传文件的保存规则，必须是一个无需任何参数的函数名，例如可以是 time、 uniqid com_create_guid 等，但必须能保证生成的文件名是唯一的，默认是uniqid
            if(!$upload->upload()) { 
                print_r($upload->getErrorMsg()) ;// 上传错误 提示错误信息   
           //$this->error($upload->getErrorMsg());   
            
            }else{ // 上传成功 获取上传文件信息   
            
            $info =  $upload->getUploadFileInfo();   
            dump($info) ;
         }
        }
        exit;
        $this->assign('inm',$info[0]["savename"]);
        $this->display();
}
/**
 * @author zhaozhiqiang
 * @brief 盘点是否是图片
 * @param string $type 
 */
function isImage($type) {
    switch(strtolower($type)) {
        case ".jpg":
            $ok = 1;
            break;
        case ".gif":
            $ok = 1;
            break;
        case ".jpeg":
            $ok = 1;
            break;
        default :
            $ok = 0;
            break;
    }
    return $ok;
}
