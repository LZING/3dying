<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="1;URL=<?php echo urldecode(HttpNamespace::getGET('url'));?>">
<title>3dying —— 最新最酷的3D设计师社交网站，提供3D模型上传、3D模型在线展示、3D模型外链分享</title>
<meta name="keywords" content="3dsmax,3dmax,maya,3d模型,3d模型免费下载,游戏美术,3d设计师交流论坛,3d建模师,3d模型在线展示,网页嵌入3D模型,分享3D模型,上传3D模型,3d model">
<meta name="description" content="3dying —— 最新最酷的3D设计师社交网站，提供3D模型上传、3D模型在线展示、3D模型外链分享。支持多种流行格式的3D模型直接上传，并可在线展示，以及插入到任何网页中。">

<?php
if(is_array($this->cssfile) && !empty($this->cssfile)) {
    foreach($this->cssfile as $css) {
        echo '<link rel="stylesheet" type="text/css" href="../Public/' . $css . '?v='. VISION . '">';
    }
}
if(is_array($this->jsfile) && !empty($this->jsfile)) {
    foreach($this->jsfile as $js) {
        echo '<script type="text/javascript" src="../Public/' . $js . '?v='. VISION . '"></script>';
    }
}
?>      
</head>
<style>
a:visited{color: #1da4de;}
a:link{color: #1da4de;}
</style>
<body>
    <div id="panel_top">
        <div id="panel_top_inner">
            <a href="/"><div id="label_logo" class="label_click"></div></a>
            <div id="panel_search">
                <input id="edit_search" value="<?php echo isset($this->q) && $this->q ? $this->q : '搜索3D作品'; ?>" style="padding: 0;">
                <input id="category" value="<?php echo isset($this->cate_id) ? $this->cate_id : 0;?>" type="hidden">
                <div id="button_search" class="label_click"><div id="img_search"></div></div>
            </div>
        <?php if(isset($_SESSION['user']) && !empty($_SESSION['user'])) { ?>
            <div class="panel_top_right" id="panel_account_border" style="display: block;">
                <div class="label_click label_account panel_top_right_icon" id="img_account"></div>
                <div class="label_click label_top_right label_account">账号</div>
                <div class="panel_top_right_mask" id="panel_top_right_mask_account"></div>
                <div id="panel_account">
                    <div id="panel_personal_info">
                        <a href="/user/edit">
                            <div class="label_click img_top_right_arrow button_personal_info"></div>
                            <div class="label_click button_personal_info" id="label_personal_info">个人信息</div>
                        </a>
                    </div>
                    <div id="panel_logout">
                        <a href="/user/logout">
                            <div class="label_click img_top_right_arrow button_logout"></div>
                            <div class="label_click button_logout" id="label_logout">退出</div>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="panel_top_right" id="panel_message_border" style="display: block;">
                <a href="/user/index/message">
                    <div class="label_click label_message panel_top_right_icon" id="img_message"></div>
                    <div class="label_click label_top_right label_message" id="label_message">私信</div>
                    <div class="img_top_right_unread" <?php if($this->messageCount > 0){?>style="display:block;"<?php }?>><?php echo $this->messageCount;?></div>
                </a>
            </div>
            <?php if(CHANNEL_NAME == 'index' && MODULE_NAME == 'index' && ACTION_NAME == 'default') {?>
            <div class="panel_top_right" style="display: block;">
                <a id="label_user" class="label_click label_top_right" href="/user/index/typelist" style="overflow: hidden;"><?php echo $_SESSION['user']['username'];?></a>
            </div>
           <?php } else { ?>
           <div class="panel_top_right" id="panel_mypage_border" style="display: block;">
               <a href="/user/index/typelist">
                   <div class="label_click label_mypage panel_top_right_icon" id="img_mypage"></div>
                   <div class="label_click label_top_right label_mypage" id="label_mypage">我的主页</div>
               </a>
           </div>
           <?php } ?>
        <?php }else{ ?>
            <div class="panel_top_right" id="panel_login_border" style="display: block;">
                <div class="label_click label_login panel_top_right_icon" id="img_login"></div>
                <div class="label_click label_top_right label_login">登录</div>
                <div class="panel_top_right_mask" id="panel_top_right_mask_login"></div>
                <div id="panel_login">
                    <input class="edit_login edit_username" value="用户名或邮箱">
                    <input type="password" class="edit_login edit_password">
                    <div class="edit_password_mask">密码</div>
                    <div class="panel_keep_login">
                        <input type="checkbox" class="checkbox_keep_login">
                        <div class="label_keep_login">保持登录</div>
                    </div>
                    <input type="button" class="button_login" value="登录">
                    <span class="login_error"></span>
                    <div class="line_login"></div>
                    <div class="oauth_label">其它登录方式：</div>
                    <div id="weibo_login" class="oauth_weibo"></div>
                    <div id="qq_login" class="oauth_qq"></div>
                    <div class="panel_forget_password">
                        <div class="label_click img_top_right_arrowok button_forget_password"></div>
                        <div class="label_click button_forget_password label_forget_password">忘记密码？</div>
                    </div>
                    <div class="panel_register_hint">
                        <a href="/user/register">
                            <div class="label_click img_top_right_arrowok button_register_hint"></div>
                            <div class="label_click button_register_hint label_register_hint">还没有注册吗？快加入吧</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="panel_top_right" id="panel_register_border" style="display: block;">
                <a href="/user/register">
                    <div class="label_click label_register panel_top_right_icon" id="img_register"></div>
                    <div class="label_click label_top_right label_register">注册</div>
                </a>
            </div>
        <?php } ?>
        <?php if(CHANNEL_NAME != 'index' || MODULE_NAME != 'index' || ACTION_NAME != 'default') {?>
            <div class="panel_top_right" id="panel_home_border" style="display: block;">
                   <a href="/">
                       <div class="label_click label_home panel_top_right_icon" id="img_home"></div>
                       <div class="label_click label_top_right label_home" id="label_home">首页</div>
                   </a>
            </div>
        <?php } ?>
        </div>
        <div id="panel_top_line"></div>
    </div>
    
    
    
<div id="page">
   
    <div id="panel_main" style="height:300px">

        <div id="panel_main_inner">
         
        
           <div id="panel_upload_model" style="background-color:#FFFFFF;height:50px;text-align: left;top: 80px;font-size: 30px;color: #1da4de;">
                
               
                    <span class="legend"><?php echo HttpNamespace::getGET('msg');?>！</span>
                
               
            </div>
       </div>

   </div>
</div>
<?php $this->load('Public/footer1.php');?>