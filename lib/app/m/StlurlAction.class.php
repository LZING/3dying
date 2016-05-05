<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/type/TypeNamespace.class.php';

class StlurlAction extends BaseAction{
    
    public function init() {
         $this->addCSS(array(
            'css/model/css.css',
        ));
        parent::init();
    }
    
    public function defaultAction() {
        $data = UserNamespace::getprint(intval($_GET['id']));
        $new = array(
            'id' => $data['id'],
            'create_time' => $data['ctime'],
            'name' => $data['name'],
            'image' => $data['image'],
            'stl_name' => $data['name'],
            'big_stl' => __APP__.$data['stl'],
            'small_stl' => __APP__.$data['stl'],
            'big_stl_size' => 11111,
            'small_stl_size' => false,
            'is_for_app' => '0',
            'from_type' => '0',
            'upload_type' => $data['type']
        );
        echo json_encode($new);
    }
   
}
