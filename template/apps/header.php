<header class="am-topbar" id="main-nav">
    <div class="am-container">
        <h1 class="am-topbar-brand">
            <a href="/apps/index"><img height="50" width="125" src="/Public/images/logo.png" alt="大格科技模型库"></a>
        </h1>

        <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#doc-topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

        <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">
            <?php if(!$_SESSION['user']['id']){?>
                <div class="am-topbar-right user-info">
                    <button type="button" data-am-modal="{target: '#loginDialog'}" class="am-btn am-btn-primary am-topbar-btn am-btn-sm">登录</button>
                    <a href="/user/register" class="am-btn am-btn-success am-topbar-btn am-btn-sm">注册</a>
                </div>
            <?php }else {?>
                <div class="am-topbar-right user-info">
                    <a href="/user/index/typelist" class="am-btn am-btn-success am-topbar-btn am-btn-sm"><?php echo $_SESSION['user']['username'];?></a>
                </div>
            <?php }?>
            <div class="am-topbar-right">
                <ul class="am-nav am-nav-pills am-topbar-nav">
                    <li class="<?php echo MODULE_NAME == 'index' ? 'am-active' : '';?>"><a href="/apps/">方块世界</a></li>
                    <li class="<?php echo MODULE_NAME == 'photo' ? 'am-active' : '';?>"><a href="/apps/photo">打印照片</a></li>
                    <li class="<?php echo MODULE_NAME == 'draw' ? 'am-active' : '';?>"><a href="/apps/draw">手绘图案</a></li>
                    <li class="<?php echo MODULE_NAME == 'text' ? 'am-active' : '';?>"><a href="/apps/text">立体文字</a></li>
                    <li class="<?php echo MODULE_NAME == 'stamp' ? 'am-active' : '';?>"><a href="/apps/stamp">图片印章</a></li>
                </ul>

            </div>
        </div>
    </div>
</header>
<script>
    isLogin = <?php echo intval($_SESSION['user']['id'])?>;
</script>