<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/type/TypeNamespace.class.php';

class IndexAction extends BaseAction{
    
    public function init() {

        parent::init();
    }
    
   public function aboutAction() {
   	
       $this->display("/model/about.php");
   }
    
   public function contactAction() {
   
   	$this->display("/model/contact.php");
   }
   
}
