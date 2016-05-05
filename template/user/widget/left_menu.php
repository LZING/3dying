<?php 
if(isset($_SESSION['user']['id']) && $_SESSION['user']['id']==$this->user['id']) {
    $login = true;
    $_name = '我';
}else {
    $login = false;
    $_name = 'Ta';
}
?>
<div id="panel_profile_left">
    <div id="label_left_arrow" style="top: 40px;"></div>
    <div class="panel_left_one label_click">
    <a href="/user/index/typelist?id=<?php echo $this->user['id'];?>">
        <div class="img_left label_click" id="img_left_libs" style="background-image: url(../Public/image/menu_icons_libs.png);"></div>
        <div id="label_libs" class="label_click label_left label_libs" style="color: rgb(156, 156, 156);"><?php echo $_name;?>的3D作品</div>
        <div class="line_left"></div>
        </a>
    </div>
    <?php if($login) {?>
    <div class="panel_left_one label_click">
    <a href="/user/edit">
        <div class="img_left label_click" id="img_left_follow" style="background-image: url(../Public/image/menu_icons_follow.png);"></div>
        <div id="label_follow" class="label_click label_left label_follow" style="color: rgb(156, 156, 156);">个人信息</div>
        <div class="line_left"></div>
    </a>
    </div>
    <?php }?>
    <div class="panel_left_one label_click">
    <a href="/user/index/collect?id=<?php echo $this->user['id'];?>">
        <div class="img_left" id="img_left_favorite" style="background-image: url(../Public/image/menu_icons_favorite.png);"></div>
        <div id="label_favorite" class="label_click label_left label_favorite" style="color: rgb(156, 156, 156);"><?php echo $_name;?>的收藏</div>
        <div class="line_left enterprise-hock"></div>
    </div>
    </a>
</div>