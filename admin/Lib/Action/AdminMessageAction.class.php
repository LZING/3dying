<?php
/**
 * @author myj
 *
 */
//require_once MYROOT . '/my/conf/db/MessageConf.php';

class AdminMessageAction extends AdminAction {
	public function _initialize() {
        parent::_initialize();
    }

	function message() {
		import("ORG.Util.Page");
		$num = D("Msg")->count();
		$page=new Page($num,15);
		$result['page']=$page->show();
		$result['result']=D("Msg")->where("del = 0")->limit($page->firstRow.','.$page->listRows)->order('id DESC')->select();


		$this->assign('result',$result['result']);
		$this->assign('page',$result['page']);
		$this->display();
	}
}
?>