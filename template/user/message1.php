<div class="panel_main">
    <div id="label_message_title">共<?php echo $this->count;?>条私信</div>
    <div id="panel_message_search">
    </div>
    
    <div id="panel_messages">
    <?php foreach($this->message as $value){ ?>
        <div class="panel_one_message">
            <img src="<?php if($this->type==1){echo $this->user['thumb'];}else{echo $value['thumb'];}?>"  class="img_message_icon">
            <a href="javascript:void(0)" id="<?php echo $value['id'];?>" class="panel_message_info">
                <div class="label_message_time label_click_"><?php echo date('Y-m-d H:i',$value['time']);?></div>
                <div class="label_message_content label_click_" style="text-indent: <?php if($this->type==1){echo 94;}else{echo (strlen($value['from_name'])+1)*10;}?>px;"><?php echo mb_substr($value['content'], 0,50);?></div>
                <div class="img_message_delete"></div>
                <div class="label_message_reply label_click_">回复</div>
                <div class="line_message"></div>
                <div class="label_message_author label_click_" <?php if($this->type==1){?> style="text-indent: 32px;" <?php }?>><?php echo $value['from_name']?>：</div>
                <div class="label_message_num label_click_"></div>
                <?php if($this->type==1){?><div class="label_message_sendto">发给</div><?php }?>
            </a>
            <?php if($value['read'] == 0 && $this->type==0){?><div class="img_unread"></div><?php }?>
        </div>
        <?php } ?>
    </div>
    <?php echo $this->page;?>
</div>
<script>
$(function(){
    $(".label_click_").click(function(){
        var id=$(this).parent().attr('id');
        location='/user/index/detail?id='+id;
    });
    $(".img_message_delete").click(function(){
        var id=$(this).parent().attr('id');
        $.get('/user/index/delete',{id:id},function(data){
            if(data==1) {
            	location='/user/index/message';
            } else {
                alert('删除失败');
            	location='/user/index/message';
            }
        });
    });
})
</script>