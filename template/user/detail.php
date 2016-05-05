<?php 
if($this->message['from_id'] == $_SESSION['user']['id']) {
    $name = $this->message['to_name'];
    $id = $this->message['to_id'];
    $mName = '我';
    $type = 1;
} else {
    
    $name = $this->message['from_name'];
    $mName = $name;
    $id = $this->message['from_id'];
    $type = 0;
}
?>
<div class="panel_pageturner panel_main">
    <div id="label_message_title">我和<?php echo $name;?>的对话</div>
    <div id="label_message_num"></div>
    <div id="label_message_edit">发私信给：<?php echo $name;?></div>
    <textarea id="edit_message" maxlength="140"></textarea>
    <div id="label_message_word_num"></div>
    <div class="button_send_message label_click">发送</div>
    <div id="panel_messages">
        <div class="panel_one_message">
            
            <div class="panel_message_info" style="left: 0px;">
                <div class="label_message_time"><?php echo date('Y-m-d H:i',$this->message['time']);?></div>
                <div class="label_message_content" style="text-indent: <?php echo (strlen($mName)+1)*10;?>px;"><?php echo $this->message['content'];?></div>
                <div class="img_message_delete img_message_delete_detail label_click"></div>
                <div class="label_message_reply label_click"></div>
                <div class="img_message_more_than"></div>
                <div class="label_message_author label_click" style="color: black;"><?php echo $mName;?>：</div>
            </div>
        </div>
    </div>
</div>
<script>
$(function(){
    $(".button_send_message").click(function(){
        var name = '<?php echo $name;?>';
        var content = $.trim($("#edit_message").val());
        if (name == ''){
            alert('请填写收信人');
            return false;
        }
        if(content == ''){
            alert('请填写内容');
            return false;
        }
        $.post('/user/index/send',{username:name,content:content},function(data){
            if(data==2){
                alert('此用户不存在');
            }else if(data==0) {
                alert('请您先登录');
            } else{
                location='/user/index/message?type=<?php echo $type;?>';
            }
        });
	});
    $(".img_message_delete_detail").click(function(){
        var id=<?php echo $this->message['id'];?>;
        $.get('/user/index/delete',{id:id},function(data){
            if(data==1) {
            	location='/user/index/message?type=<?php echo $type;?>';
            } else {
                alert('删除失败');
            	location='/user/index/message?type=<?php echo $type;?>';
            }
        });
    });
})
</script>