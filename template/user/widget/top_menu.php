<div id="panel_profile_top">
    <div class="panel_user">
        <img id="image_head" src="<?php echo $this->user['thumb'];?>">
        <div id="panel_username">
            <div id="label_username"><?php echo $this->user['username'];?></div>
            <div class="label_follower">( vip: </div>
            <div class="label_follower label_click" id="label_follower" style="text-decoration: blink;color:#ab3222">&nbsp;<?php echo $this->user['vip'];?>&nbsp;</div>
            <div class="label_follower"> )</div>
            <div class="laocoin-wrapper">
                <div class="laocoin">积分:<?php echo $this->user['score'];?></div>
                <a href="faq.html#q14" style="margin-left:5px" target="_blank" rel="nofollow"><img src="../Public/image/question.png" alt=""></a>
            </div>
            <?php
                //登录
                $show = true;
                if(isset($_SESSION['user']['id']) && $this->user['id']==$_SESSION['user']['id']) {
                    $show = false;
                }
            if($show){?><div class="label_click button_username_panel button_message_box" id="button_message" name="<?php echo $this->user['username'];?>" style="display: block;">私信</div><?php }?>
        </div>
        <div id="panel_user_sign">
            <div class="label_sign_quotation" id="img_left_quotation"></div>
            <div id="label_sign"></div>
            <div id="label_ellipsis">...</div>
            <div class="label_sign_quotation" id="img_right_quotation"></div>
        </div>
    </div>
    <div class="upload-wrapper" data-intro="请点击上传模型！" data-step="1" data-position="bottom" style="display: block;">
        <a id="panel_model_upload" href="/user/upload">上传模型</a>
    </div>
</div>