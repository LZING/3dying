<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en_US" xml:lang="en_US">
 <head>
<META http-equiv=Content-Type content="text/html; charset=UTF-8">
 <link rel="stylesheet" type="text/css" href="../Public/css/user/profile_info.css?v=0.2">
<script type="text/javascript" charset="utf-8" src="../Public/ueditor/editor_config.js"></script>
<script type="text/javascript" charset="utf-8" src="../Public/ueditor/editor_all_min.js"></script>
<script type="text/javascript" src="../Public/js/jquery.min.js" ></script>
<script type="text/javascript">
var swfu;
var URL = '__URL__',
APP = '__APP__',
PUBLIC = '../Public';
</script>
</head>
<body>
       <form method="post" id="form" action="/SJZws/index/repwd/?uid=<?php echo $this->info['id'];?>"  enctype="multipart/form-data">
<div id="panel_info" style="font-size: 14px;min-height:200px;min-width:420px;">
	<TR id=cat>
               <TD class=tbhead colSpan=2><B>修改密码: </B></TD>
            </TR>
    <div class="panel_one_info">
        <div class="label_info">用户名</div>
        <input class="edit_text" id="edit_profile_name" disabled="true" maxlength="16" value="<?php echo $this->info['username'];?>">
    </div>
    <div class="panel_one_info">
        <div class="label_info">*新密码</div>
        <input class="edit_text" type="password" name="newpass" id="newpass" maxlength="20">
        <div class="label_error_info" style="width: 130px;" id="label_password_error"><?php echo isset($this->newpass) ? $this->newpass : '';?></div>
    </div>
    <div class="panel_one_info">
        <div class="label_info">*确认密码</div>
        <input class="edit_text" type="password" name="repass" id="repass" maxlength="20">
        <div class="label_error_info" style="width: 130px;" id="label_password_again_error"><?php echo isset($this->repass) ? $this->repass : '';?></div>
    </div>
    
</div>
<div class="label_click" id="button_submit" style="top: 220px;">保存信息</div>
</form>
<script>
$(function(){
    $("#button_submit").click(function(){
       
        if ($.trim($("#newpass").val()) !='') {
            if ($("#newpass").val().length <6 || $("#newpass").val().length > 20) {
                return $("#newpass").focus(), $("#label_password_error").text("密码长度6-20位");
            }
            $("#label_password_error").text("")
            if ($("#newpass").val() != $("#repass").val()) {
                return $("#repass").focus(), $("#label_password_again_error").text("密码不一致");
            }
            $("#label_password_again_error").text("")
        }
        $("#form").submit();
    });
	
})
</script>
       
    <BR>
   
    <CENTER><a href="javascript:history.go(-1);">返回3dying管理后台</a></CENTER>
</BODY>

</html>