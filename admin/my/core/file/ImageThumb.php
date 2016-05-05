<?php
/**
 * @brief 图片缩微图
 * Enter description here ...
 * @author zzq
 *
 */
class ImageThumb {
    public $thumb       = null;//缩微图默认前缀
    public $thumbWith   = null;
    public $thumbHeight = null;
    /**
     * @param String $thumb 缩微图前缀
     * @param String $filename 原文件名
     * @param String $thumbWidth 缩微图宽度
     * @param string $thumbHeight 缩微图高度
     */
    public function __construct($filename = null, $thumb = 'thumb-', $thumbWidth = 200, $thumbHeight = 1000) {
        if (!$filename) {
            return false;
        }
        if (!file_exists($filename)) {
            return false;
        }
        $this->thumb       = $thumb;
        $this->thumbWith   = $thumbWidth;
        $this->thumbHeight = $thumbHeight;
        $this->_save($filename);
    }
    private function _save($filename) {
        $file_name = basename($filename);//文件名字
        $image =  getimagesize($filename);
        if(false !== $image) {
            $thumbWidth  = 200;
            $thumbHeight = 1000;
            $thumbname   = dirname($filename) . "/" . $this->thumb .$this->extend($file_name).'.'.$this->extendss($file_name);
            $this->_thumb($filename,$thumbname,'',$thumbWidth,$thumbHeight,true);
        }
        return true;
    }
    private function _thumb($image, $thumbname, $type='', $maxWidth, $maxHeight, $interlace=true) {
        $info = $this->_getImageInfo($image);
        
        if ($info !== false) {
            $srcWidth = $info['width'];
            $srcHeight = $info['height'];
            $type = empty($type) ? $info['type'] : $type;
            $type = strtolower($type);
            $interlace = $interlace ? 1 : 0;
            unset($info);
            $scale = min($maxWidth / $srcWidth, $maxHeight / $srcHeight); //
            if ($scale >= 1) {
                $width = $srcWidth;
                $height = $srcHeight;
            } else {
                $width = (int) ($srcWidth * $scale);
                $height = (int) ($srcHeight * $scale);
            }
            $createFun = 'ImageCreateFrom' . ($type == 'jpg' ? 'jpeg' : $type);
            $srcImg = $createFun($image);
            if ($type != 'gif' && function_exists('imagecreatetruecolor'))
                $thumbImg = imagecreatetruecolor($width, $height);
            else
                $thumbImg = imagecreate($width, $height);

            if (function_exists("ImageCopyResampled"))
                imagecopyresampled($thumbImg, $srcImg, 0, 0, 0, 0, $width, $height, $srcWidth, $srcHeight);
            else
                imagecopyresized($thumbImg, $srcImg, 0, 0, 0, 0, $width, $height, $srcWidth, $srcHeight);
            if ('gif' == $type || 'png' == $type) {
                $background_color = imagecolorallocate($thumbImg, 0, 255, 0);  //  ָ��һ����ɫ
                imagecolortransparent($thumbImg, $background_color);  //  ����Ϊ͸��ɫ����ע�͵������������ɫ��ͼ
            }
            if ('jpg' == $type || 'jpeg' == $type)
                imageinterlace($thumbImg, $interlace);
            $imageFun = 'image' . ($type == 'jpg' ? 'jpeg' : $type);
            $imageFun($thumbImg, $thumbname);
            imagedestroy($thumbImg);
            imagedestroy($srcImg);
            return $thumbname;
        }
        return false;
    }
    private function _getImageInfo($img) {
        $imageInfo = getimagesize($img);
        if ($imageInfo !== false) {
            $imageType = strtolower(substr(image_type_to_extension($imageInfo[2]), 1));
            $imageSize = filesize($img);
            $info = array(
                "width" => $imageInfo[0],
                "height" => $imageInfo[1],
                "type" => $imageType,
                "size" => $imageSize,
                "mime" => $imageInfo['mime']
            );
            return $info;
        } else {
            return false;
        }
    }
    public function extend($file_name) {   
        $extend=explode(".",$file_name);   
        
        return $extend[0];   
    } 
    public function extendss($file_name) {   
        $extend=explode(".",$file_name);   
        $va=count($extend)-1;   
        return $extend[$va];   
    }
}