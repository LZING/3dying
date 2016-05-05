<?php $this->load('Public/header.php');?>
<div id="page">
    <div id="panel_main">
	    <div id="label_main_title">新用户注册</div>
		<div id="panel_main_left">
		    <div class="panel_one_info">
			    <div class="label_info">*用户名</div>
				<input class="edit_text" id="edit_register_username" maxlength="16">
				<div class="label_error_info" id="label_username_error"></div>
			</div>
			<div class="panel_one_info">
			    <div class="label_info">*邮箱</div>
				<input class="edit_text" id="edit_register_email">
				<div class="label_error_info" id="label_email_error"></div>
			</div>
			<div class="panel_one_info">
			    <div class="label_info">*密码</div>
				<input class="edit_text" type="password" id="edit_register_password" maxlength="20">
				<div class="label_error_info" id="label_password_error"></div>
			</div>
			<div class="panel_one_info">
			    <div class="label_info">*确认密码</div>
				<input class="edit_text" type="password" id="edit_register_password_again" maxlength="20">
				<div class="label_error_info" id="label_password_again_error"></div>
			</div>
			<div>
				<p class="agreement">
					<label for="agreement">
						<input type="checkbox" id="agreement" checked="true">我已阅读并同意《<a target="_blank" href="##">3dying网络服务使用协议</a>》
					</label>
				</p>
			</div>
			<button class="label_click" id="button_submit">完成注册</button>
		</div>
		<div id="panel_main_right">
		    <div id="label_registered">已经是注册用户了？请在下面直接登录</div>
			<input class="edit_login" id="edit_main_username" value="用户名或邮箱">
			<input type="password" class="edit_login" id="edit_main_password">
			<div id="edit_main_password_mask">密码</div>
			<div id="panel_main_keep_login">
				<input type="checkbox" id="checkbox_main_keep_login">
				<div id="label_main_keep_login">保持登录</div>
			</div>
			<input type="button" id="button_main_login" value="登录">
			<div id="panel_main_forget_password">
				<div class="label_click button_forget_password img_top_right_arrow"></div>
				<div class="label_click button_forget_password" id="label_main_forget_password"><a href="/user/register/repwd">忘记密码？</a></div>
			</div>
			<div class="oauth_register_label">其他登陆方式：</div>
			<div class="weibo_login"></div>
			<div class="qq_login"></div>
			<span class="main_login_error"></span>
		</div>
	</div>
</div>
<?php $this->load('Public/footer.php');?>