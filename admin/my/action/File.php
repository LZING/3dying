<?php
/**
 * @author zzq
 * @since 2013-03 -06
 */
require_once MYROOT . '/my/sta/conf/FileConf.php';
require_once MYROOT . '/my/sta/conf/ImageConf.php';
class File {
    /**
     * 
     * @brief 文件下载
     * @param string $filePath 文件路径
     * @param stirng $fileName
     * @param  $mimeType
     * @return void
     */
    public static function downloadFile($filePath, $fileName = null, $mimeType = 'audio/x-matroska' ) {
        set_time_limit(0);
        session_write_close();//关闭session
        if(empty($filePath) || !file_exists($filePath)) {
            echo('<script>alert("文件不存在");history.go(-1);</script>');exit;
        }
        if($fileName == null) {
            $fileName = $filePath;
        }
        
        date_default_timezone_set('Asia/Chengdu');
        include_once MYROOT . '/my/core/file/Transfer.php';
        $range = isset($_SERVER['HTTP_RANGE']) ? $_SERVER['HTTP_RANGE'] : null;
        $transfer = new Transfer($filePath, $fileName, $mimeType, $range);
        $transfer->send();
    }
    /**
     * @brief 上传文件
     * @param $fileTempName 临时文件名
     * @param $savePath 文件保存路径
     */
    public static  function uploadFile($fileTempName = null , $type = 'image', $savePath = null, $isThumb = false, $thumbMaxWidth = 50, $thumbMaxHeight = 50000) {
        $UploadedFile = $fileTempName;
        $conf = ($type == 'image') ? 'ImageConf' : 'FileConf';//配置文件
        if($UploadedFile) {
            include_once MYROOT . '/my/core/file/UploadFile.php';
            $upload = new UploadFile(); // 实例化上传类
            $upload->maxSize    = $conf::$MAX_ALLOW_SIZE * 1024 * 1024; // 设置附件上传大小
            $upload->allowExts  = $conf::$ALLOW_TYPE; // 设置附件上传类型
            $upload->savePath = './'. $savePath . '/' . date( "Y-m" ) . '/';;
            if ($savePath == null) {
                $upload->savePath =  './'. $conf::$SAVE_PATH . '/' . date( "Y-m" ) . '/'; // 设置附件上传目录
            }
            if ( !file_exists($upload->savePath ) ) {
                if ( !mkdir( $upload->savePath , 0777 , true ) ) {
                    return array('error' => 1, 'msg' => '目录创建失败');
                }
            }
            $upload->saveRule= time().rand(10000, 999999);//多个文件是只能用uniqid或者com_create_guid，time会出现重复
            
            //缩微图
            if ($isThumb && $type == 'image') {
                $upload->thumb = true;
                //设置需要生成缩略图的文件后缀
                $upload->thumbPrefix = 'thumb_';  //生产2张缩略图
                //设置缩略图最大宽度
                $upload->thumbMaxWidth = $thumbMaxWidth;
                //设置缩略图最大高度
                $upload->thumbMaxHeight = $thumbMaxHeight;
            }
            //上传文件的保存规则，必须是一个无需任何参数的函数名，例如可以是 time、 uniqid com_create_guid 等，但必须能保证生成的文件名是唯一的，默认是uniqid
            if(!$upload->upload()) {
                  return array('error' => 1, 'msg' => $upload->getErrorMsg());// 上传错误 提示错误信息

             } else { // 上传成功 获取上传文件信息
                $info =  $upload->getUploadFileInfo();
                return array('error' => 0, 'msg' => $info);
            }
        }
    }
}