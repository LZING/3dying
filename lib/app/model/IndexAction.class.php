<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/type/TypeNamespace.class.php';

class IndexAction extends BaseAction{
    
    public function init() {
         $this->addCSS(array(
            'css/model/css.css',
        ));
        parent::init();
    }
    
   public function aboutAction() {
   	
       $this->display("/model/about.php");
   }
    
   public function contactAction() {
   
   	$this->display("/model/contact.php");
   }
   public function helpAction() {
   
   	$this->display("/model/help.php");
   }
   
   public function serviceAction() {
   
   	$this->display("/model/service.php");
   }
   
   public function secretAction() {
   
   	$this->display("/model/secret.php");
   }
   
   public function powerAction() {
   
   	$this->display("/model/power.php");
   }
   
}
