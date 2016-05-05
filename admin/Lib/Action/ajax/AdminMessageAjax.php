<?php
/**
 * @author myj
 */
require_once MYROOT . '/Lib/Action/ajax/AdminAjaxBase.php';

class AdminMessageAjax extends AdminAjaxBase {
		public $message = null;
		public function init() {
			parent::init();
			$this->message = D("Msg");
		}
		/**
	     * @brief 删除留言
	     */
		function delete_msg() {
			$id=intval($_GET['id']);
			$result=$this->message->where("id='$id'")->setField('del',1);
			if ($result) {
            	echo json_encode(array('error' => 0, 'message' => ''));
	        } else {
	            echo json_encode(array('error' => 1, 'message' => '删除失败'));
	        }
	        exit();
		}
		/**
	     * @brief 阅读留言
	     */
		function read(){
	        if(session("admin") == false) {
	    		echo 0;exit;
	    	}
	        $id=intval($_GET['id']);
	        if(D('Msg')->where("id='".$id."'")->setField('read',1)){
	            echo json_encode(array('error' => 0, 'message' => ''));
	        }else{
	            echo json_encode(array('error' => 1, 'message' => '删除失败'));
            }
            exit();
        }
        function message(){
	        if(session("admin") == false) {
	    		echo 0;exit;
	    	}
	        $id=intval($_GET['id']);
	        $data['replay']=htmlspecialchars($_GET['content']);
	        $data['replay_time']=time();
	         if($id>0){
	            $re=$this->message->where("`id`='".$id."'")->data($data)->save();
	            if($re){
	                echo json_encode(array('error' => 0, 'message' => ''));
	            }else{
	                echo json_encode(array('error' => 1, 'message' => '删除失败'));
	            }
	        }
	        exit();
        
    	}
}
?>