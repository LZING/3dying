<?php
require_once APP . '/common/CommonAction.class.php';
require_once THINKPHP . '/lib/image/Image.class.php';

class IndexAction extends CommonAction{
   
    public function init() {
        parent::init();
    }
    public function defaultAction() {
       Image::buildImageVerify(4,0,'png',60,27);
    }
}