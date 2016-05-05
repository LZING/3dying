<?php $this->load('Public/header.php');?>
<div id="headlines" class="module">
<!-- 头条 --> 
<?php $this->load('index/widget/one_image.php', array('image' => $this->top_image));?>
</div>
<div class="crumbs">
    <a href="__APP__" class="a-blue">首页</a> &gt;用户登陆
</div>
 <div class="set-password">
    <form method="post" action="" id="regForm">
        <p class="red-ae user-tip" <?php if (!$this->error){?>style="display:none;"<?php }?> id="username"><?php echo $this->error;?></p>
        <p class="label">用户名</p>
        <div class="form-item limit-input">
            <input type="text" class="comn-input" value="" name="username" id="userName">
        </div>
        <p class="label">密码</p>
        <div class="form-item limit-input">
            <input type="password" class="comn-input" value="" name="password" id="password">
        </div>
        <input type="submit" value="登陆" class="comn-submit over-submit">
        <div class="clear lp-link">
            <a href="" class="prime-a fl">忘记密码(请联系管理员)</a>
            <a href="<?php echo UrlNamespace::registerUrl();?>" class="prime-a fr">快速注册</a>
         </div>
    </form>
</div>
<?php $this->load('Public/footer.php');?>