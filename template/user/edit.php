<form method="post" id="form"  enctype="multipart/form-data">

<div id="panel_info">

    <div class="panel_one_info">

        <div class="label_info">用户名</div>

        <input class="edit_text" id="edit_profile_name"  disabled="true" maxlength="16" value="<?php echo $_SESSION['user']['username'];?>">

    </div>

    <div class="panel_one_info">

        <div class="label_info">旧密码</div>

        <input class="edit_text" type="password" name="oldpass" id="oldpass" maxlength="20">

        <div class="label_error_info" id="old_password_error"><?php echo isset($this->oldpass) ? $this->oldpass : '';?></div>

    </div>

    <div class="panel_one_info">

        <div class="label_info">*新密码</div>

        <input class="edit_text" type="password" name="newpass" id="newpass" maxlength="20">

        <div class="label_error_info" id="label_password_error"><?php echo isset($this->newpass) ? $this->newpass : '';?></div>

    </div>

    <div class="panel_one_info">

        <div class="label_info">*确认密码</div>

        <input class="edit_text" type="password" name="repass" id="repass" maxlength="20">

        <div class="label_error_info" id="label_password_again_error"><?php echo isset($this->repass) ? $this->repass : '';?></div>

    </div>

    <div style="color:red;font-size: 10px;">若修改密码请填写此处</div>

    <div class="panel_one_info" id="line_panel_one_info"></div>

    <div class="panel_one_info" id="panel_icon">

        <div class="label_info">修改头像</div>

        <div id="panel_select_icon">

            <img id="img_icon" src="<?php echo $this->user['thumb'];?>">

            <div id="label_icon_type">你可以上传JPG、JPEG、PNG文件。(头像大小：94px*94px)<?php echo isset($this->image) ? $this->image : '';?></div>

            <div id="button_upload_icon" class="uploadify" style="height: 30px; width: 120px;">

                <div  style="height: 30px; line-height: 30px; width: 76px;">

                    <input id="image" name="image" style="width: 300px;height: 21px;" type="file" value="" />选择图片</div>

            </div>

        </div>

    </div>

    <div class="panel_one_info">

        <div class="label_info">性别</div>

        <div id="panel_gender" class="edit_text">

            <input type="radio" <?php if($this->user['sex'] == 1){?> checked="checked"<?php } ?> name="sex" value="1" id="radio_gender_male">男

            <input type="radio" <?php if($this->user['sex'] == 2){?> checked="checked"<?php } ?> name="sex" value="2" id="radio_gender_female">女

        </div>

    </div>

    <div class="panel_one_info" id="panel_profile_introduce">

        <div class="label_info">个人签名</div>

        <textarea class="edit_text" id="textarea_introduce" maxlength="30" name="sign"><?php echo $this->user['sign'];?></textarea>

        <div class="label_error_info" id="label_introduce_error"></div>

        <div id="label_introduce_word_num">最多30字</div>

    </div>

</div>

<div class="label_click" id="button_submit">保存信息</div>

</form>

<script>

$(function(){

    $("#button_submit").click(function(){

        

        if ($.trim($("#oldpass").val()) !='') {

            if ($("#newpass").val().length <6 || $("#newpass").val().length > 20) {

                return $("#newpass").focus(), $("#label_password_error").text("密码长度4-20位");

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