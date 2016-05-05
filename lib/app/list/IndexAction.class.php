<?php
require_once APP . '/common/include/BaseAction.class.php';
require_once THINKPHP . '/app/3d/D3Namespace.class.php';
require_once THINKPHP . '/app/type/TypeNamespace.class.php';
require_once THINKPHP . '/app/atta/AttaNamespace.class.php';

class IndexAction extends BaseAction{
    public function init() {

        parent::init();
    }
    
    public function defaultAction() {
        $type = (int)HttpNamespace::getGET('type','');
        list($data['page'], $data['list'],$data['orderUrl'], $data['readUrl']) = D3Namespace::showPage(9, $type);
        $orderTime    = HttpNamespace::getGET('time', '');
        $readTime     = HttpNamespace::getGET('read', '');
        
        $data['q'] = HttpNamespace::getGET('q','');
        $data['type'] = TypeNamespace::getAllTypes();
        $data['cate_id'] = $type;
        $this->assign($data);
        $this->display();
    }
    
    
    
    public function detailAction() {
        
        $id = (int)HttpNamespace::getGET('id');
        
        if (!$id) {
            HttpNamespace::redirect(__APP__);
        }
        $result = D3Namespace::getD3ById($id);
        if (!$result) {
            HttpNamespace::redirect(__APP__);
        }
        $collect = '';
        if ($this->checkLogin()) {
            $collect = D3Namespace::getCollect($_SESSION['user']['id'], $id);
        }
        $user = UserNamespace::getUserById($result['user_id']);
        $comment = D3Namespace::getComment($id);
        
        
        if ($result) {
            
            $atta = AttaNamespace::getattaById($result['id']);
            if ($atta) {
                foreach($atta as $value) {
                    if (strpos($value['path'], '.stl') != false) {
                        $stl[] = $value;
                    }
                    if (strpos(strtolower($value['path']), '.obj') != false) {
                        $stl[] = $value;
                    }
                }
            }
        }
        if (!isset($stl)) {
            HttpNamespace::redirect('/user/upload/su?msg=模型不存在&url='.urlencode('http://www.3dying.com/list'));
        }
        
        $this->assign('result', $result);
        
        $this->assign('obj', $stl);
        
        
        $this->assign('collect', $collect);
        $this->assign('comment', $comment);
        $this->assign('result', $result);
        $this->assign('user', $user);
        $this->assign('atta', $atta);
        $this->display();
    }
    
    
    public function voteAction() {
        $id = (int)HttpNamespace::getGET('id');
        if (empty($id)) {
            echo 0;exit;
        }
        $vote = array();
        if (isset($_COOKIE['vote'])) {
            $vote = json_decode($_COOKIE['vote'],true);
        }
        if (is_array($vote) && in_array($id, $vote)) {
            echo 0;exit;
        } else {
            $vote[] = $id;
        }
        D3Namespace::vote($id);
        
        setcookie("vote", json_encode($vote), time()+3600*24*5, '/');
        echo 1;exit;
    }
    
    public function collectAction() {
        if (!$this->checkLogin()) {
            echo 0;exit;
        }
        $id = (int)HttpNamespace::getGET('id');
        if ($id) {
            D3Namespace::collect($_SESSION['user']['id'], $id);
        }
        echo 1;exit;
    }
    
    public function commentAction() {
        if (!$this->checkLogin()) {
            echo 0;exit;
        }
        $id = (int)HttpNamespace::getGET('id');
        $content = HttpNamespace::getGET('content');
        if (trim($content) == '') {
            echo 2;exit;
        }
        if ($id) {
            if (D3Namespace::comment($_SESSION['user']['id'], $_SESSION['user']['username'], $content, $id)) {
                echo 1;exit;
            }
        }
        echo 3;exit;
    }
}
