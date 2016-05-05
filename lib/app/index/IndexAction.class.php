<?php

require_once APP . '/common/include/BaseAction.class.php';

require_once THINKPHP . '/app/3d/D3Namespace.class.php';

require_once THINKPHP . '/app/type/TypeNamespace.class.php';



class IndexAction extends BaseAction{

    

    public function init() {



        parent::init();

    }

    

   public function defaultAction() {



       //1推荐，9创意，7人物，

       $data['chuangyi']  = D3Namespace::getLatestByType(6, 1);

       $data['yishu']  = D3Namespace::getLatestByType(6, 9);

       $data['sheji']  = D3Namespace::getLatestByType(6, 7);

       $this->assign($data);

       $this->display();

   }

    

    public function moreAction() {



       //最新发布

       $type = (int)HttpNamespace::getGET('id');

       

       $result = D3Namespace::getLatestByType(13, $type);

       foreach ($result as &$value) {

           $value['title'] = mb_substr($value['title'], 0 , 15, 'utf8');

       }

       echo json_encode($result);exit;

       

   }

}

