<?php $this->load('Public/header.php');?>
<div id="page">
    <?php $this->load("user/widget/top_menu.php");?>
    <div id="panel_profile_body">
        <?php $this->load("user/widget/left_menu.php");?>
        <div id="panel_profile_right">
            <!--首页不展示面包屑-->
            <!--面包屑-->
            <div class="panel_main_top">
                <div class="panel_crumbs">
                    <div class="label_crumb label_crumb_last"><?php echo $this->bread;?></div>
                    <?php if(isset($this->type)){?>
                    <div style="margin-left:50px" class="label_click button_sort <?php if($this->type==0){?>button_sort_clicked<?php }?> button_sort_createtime">
                        <div class="button_sort_label receivemessage">收到的私信</div>
                        <div class="img_sort img_sort_clicked"></div>
                     </div>
                     <div style="margin-left:150px" class="label_click button_sort <?php if($this->type==1){?> button_sort_clicked<?php }?> button_sort_createtime">
                        <div class="button_sort_label sendmessage">发送的私信</div>
                        <div class="img_sort img_sort_clicked"></div>
                     </div>
                    <?php }?>
                </div>
                <?php if(isset($this->ismessage)){?>
                <!-- 私信 -->
                <div class="panel_main_top_new">
                    <div class="label_main_top_new label_click button_main_top_new_message">发私信</div>
                    <div class="img_main_top_new label_click button_main_top_new_message" id="img_new_message"></div>
                </div>
                <?php } ?>
                <div class="panel_main_top_line"></div>
            </div>
            <!--动态加载不同的页面-->
            <?php $this->load("user/" . $this->template);?>
        </div>
    </div>
    <?php $this->load("Public/messagebox.php");?>
</div>
<iframe id="panel_message_box_mask" style="display: none;"></iframe>
<script>
var my_id = <?php if(isset($_SESSION['user'])){echo $_SESSION['user']['id'];}else{echo 0;}?>;
$(function(){
	$(".receivemessage").click(function(){
		location='/user/index/message';
	});
	$(".sendmessage").click(function(){
		location='/user/index/message?type=1';
	});
	$(".panel_main_top_new").click(function(){
	    $("#panel_message_box").show();
	    $("#panel_message_box_mask").show();
	});
	$("#button_message_box_close").click(function(){
		$("#panel_message_box").hide();
	    $("#panel_message_box_mask").hide();
	});
	$("#button_message").click(function(){
		if(my_id==0) {
			alert('请您先登录');return false;
		}
		$("#edit_message_to").val($(this).attr('name'));
		$("#panel_message_box").show();
	    $("#panel_message_box_mask").show();
	});
	$("#button_message_box_send").click(function(){
        var name = $.trim($("#edit_message_to").val());
        var content = $.trim($("#edit_message_box_content").val());
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
            	window.location.reload(); 
            }
        });
	});
})

</script>
<?php $this->load('Public/footer.php');?>