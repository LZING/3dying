<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <meta http-equiv="x-ua-compatible" content="ie=7" />

    <meta name="keywords" content="3dsmax,3dmax,maya,3d模型,3d模型免费下载,游戏美术,3d设计师交流论坛,3d建模师,3d模型在线展示,网页嵌入3D模型,分享3D模型,上传3D模型,3d model">

    <meta name="description" content="3Dying—最新最酷的3D模型免费下载网站，提供免费3D模型上传、3D模型在线展示、3D模型外链分享。支持多种流行格式的3D模型直接上传，并可在线展示，以及插入到任何网页中。">

    <title>3Dying—最新最酷的3D模型免费下载网站，提供免费3D模型上传和下载、3D模型在线展示、3D模型外链分享</title>
    <link href="/Public/css/index.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" media="screen" href="/Public/css/sequencejs-theme.modern-slide-in.css" />
    <script type="text/javascript" src="/Public/js/jquery.min.js"></script>
    <script type="text/javascript" src="/Public/js/jquery.sequence-min.js"></script>
    <script type="text/javascript" src="/Public/js/bannnerscroll.js"></script>
    
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

   <script type="text/javascript">

       $(document).ready(function() {

           $("#edit_searcs").bind("focus", function() {

               $(this).val() == this.defaultValue && $(this).val(""), $(this).css("color", "black")

           }), $("#edit_searcs").bind("blur", function() {

               "" == $(this).val() && $(this).val(this.defaultValue), $(this).css("color", "rgb(174, 174, 174)")

           }), $("#edit_searcs").onkeyup = function(a) {

               var b = a || window.event;

               13 == b.keyCode && $("#button_searcs").trigger("click")

           }, $("#button_searcs").bind("click", function() {

               var a = $("#edit_searcs").val();

               window.location = "/list/?q=" + a;

           })

       });

        function writeDateInfo()

        {

            var day="";

            var month="";

            var ampm="";

            var ampmhour="";

            var myweekday="";

            var year="";

            mydate=new Date();

            myweekday=mydate.getDay();

            mymonth=mydate.getMonth()+1;

            myday= mydate.getDate();

            myyear= mydate.getYear();

            year=(myyear > 200) ? myyear : 1900 + myyear;

            if(myweekday == 0)

                weekday=" 星期日";

            else if(myweekday == 1)

                weekday=" 星期一";

            else if(myweekday == 2)

                weekday=" 星期二";

            else if(myweekday == 3)

                weekday=" 星期三";

            else if(myweekday == 4)

                weekday=" 星期四";

            else if(myweekday == 5)

                weekday=" 星期五";

            else if(myweekday == 6)

                weekday=" 星期六";

            document.write(year+"年"+mymonth+"月"+myday+"日"+weekday);

        }

        function tab(name,num,n){

            for(i=1;i<=n;i++){

                var menu=document.getElementById(name+i);

                var con=document.getElementById(name+"_"+"content"+i);

                menu.className=i==num?"selected":"";

                con.style.display=i==num?"block":"none";

            }

        }

    </script>

    <script type="text/javascript">

        function scrollx(p) {

            var d = document, dd = d.documentElement, db = d.body, w = window, o = d.getElementById(p.id), ie6 = /msie 6/i.test(navigator.userAgent), style, timer;

            if (o) {

                cssPub = ";position:"+(p.f&&!ie6?'fixed':'absolute')+";"+(p.t!=undefined?'top:'+p.t+'px;':'bottom:0;');

                if (p.r != undefined && p.l == undefined) {

                    o.style.cssText += cssPub + ('right:'+p.r+'px;');

                } else {

                    o.style.cssText += cssPub + ('margin-left:'+p.l+'px;');

                }

                if(p.f&&ie6){

                    cssTop = ';top:expression(documentElement.scrollTop +'+(p.t==undefined?dd.clientHeight-o.offsetHeight:p.t)+'+ "px" );';

                    cssRight = ';right:expression(documentElement.scrollright + '+(p.r==undefined?dd.clientWidth-o.offsetWidth:p.r)+' + "px")';

                    if (p.r != undefined && p.l == undefined) {

                        o.style.cssText += cssRight + cssTop;

                    } else {

                        o.style.cssText += cssTop;

                    }

                    dd.style.cssText +=';background-image: url(about:blank);background-attachment:fixed;';

                }else{

                    if(!p.f){

                        w.onresize = w.onscroll = function(){

                            clearInterval(timer);

                            timer = setInterval(function(){

                                //双选择为了修复chrome 下xhtml解析时dd.scrollTop为 0

                                var st = (dd.scrollTop||db.scrollTop),c;

                                c = st - o.offsetTop + (p.t!=undefined?p.t:(w.innerHeight||dd.clientHeight)-o.offsetHeight);

                                if(c!=0){

                                    o.style.top = o.offsetTop + Math.ceil(Math.abs(c)/10)*(c<0?-1:1) + 'px';

                                }else{

                                    clearInterval(timer);

                                }

                            },10)

                        }

                    }

                }

            }

        }



        function addFavorite() {

            if(document.all) {

                try {

                    window.external.addFavorite(window.location.href, document.title);

                } catch(e) {

                    alert("加入收藏失败，请使用Ctrl+D进行添加");

                }

            } else if(window.sidebar) {

                window.sidebar.addPanel(document.title, window.location.href, "");

            } else {

                alert("加入收藏失败，请使用Ctrl+D进行添加");

            }

         }

         function setHomepage() {

            if(document.all) {

                document.body.style.behavior = 'url(#default#homepage)';

                document.body.setHomePage(window.location.href);

            } else if(window.sidebar) {

                if(window.netscape) {

                    try {

                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

                    } catch(e) {

                        alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");

                    }

                }

                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);

                prefs.setCharPref('browser.startup.homepage', window.location.href);

            } else {

                alert('您的浏览器不支持自动自动设置首页, 请使用浏览器菜单手动设置!');

            }

         }

    </script>

</head>

<body>

<!--qqbegin-->

<div style="z-index: 0; position: fixed; width: 76px; height: 24px; top: 15%; left: 20px;">

    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=712670126&site=qq&menu=yes">

        <img border="0" complete="true" src="../Public/images/qq2.png" alt="点击这里给我发消息" title="欢迎来到3d鹰" data-pinit="registered">

    </a>

</div>

<!--qqend-->

<div class="header"><!--header头部开始-->

    <div class="top-nav"><!--top-nav顶部导航开始-->

        <div class="navs"><!--navs开始-->

            <div class="times"><!--times时间开始-->

                <img src="/Public/images/top01.gif" />&nbsp;今天是：<script type="text/javascript">writeDateInfo();</script>

            </div><!--times时间结束-->

     

            <div class="login"><!--login开始-->

            <?php if(isset($_SESSION['user']) && !empty($_SESSION['user'])) { ?>

                <a rel="nofollow" href="/user/index/typelist"><?php echo $_SESSION['user']['username'];?></a>,欢迎您来到3D鹰！|<a rel="nofollow" href="/user/index/message" <?php if($this->messageCount > 0){echo 'style="color:red;"';}?>>私信<?php if($this->messageCount > 0){echo '('.$this->messageCount.')';}?></a>|<a href="#" rel="nofollow">论坛</a>|<a href="/user/logout" rel="nofollow">退出</a>

            <?php }else{?>

                <a href="/user/register" rel="nofollow">登录</a>|<a href="/user/register" rel="nofollow">注册</a>|<a href="#" rel="nofollow">论坛</a>

            <?php } ?>

            </div><!--login结束-->

            <div class="set"><!--set开始-->

                <a class="sy" onclick="return addFavorite();" style="cursor:hand;" rel="nofollow">设为首页</a>

                <a class="sc" onclick="return setHomepage();" style="cursor:hand;" rel="nofollow">加入收藏</a>

            </div><!--set结束-->

        </div><!--navs结束-->

    </div><!--top-nav顶部导航结束-->

    <div class="clear"></div>

    <div class="head"><!--head开始-->

        <div class="logo"><a href="/" rel="nofollow"><img src="/Public/images/logo.jpg" /></a></div>

        <div class="ads"> <img src="/Public/images/xc.jpg" /></div>

        <div class="search">

            <div class="search-one">

                <a target="_blank" href="http://4006581521.114.qq.com/" rel="nofollow"><img src="/Public/images/icon_bookmark.gif" /></a>
                <a target="_blank" href="http://weibo.com/5110073943/profile?topnav=1&wvr=5&from=company&user=1">
                <img src="/Public/images/icon_weibo.gif" /></a>
                <a target="_blank" href="http://baike.sogou.com/v74553112.htm"><img src="/Public/images/icon_mobile.gif" /></a>

            </div>

            <div class="search-two">

                <input class="enter" id="edit_searcs" name="keyword" type="text" value="<?php echo isset($this->q) && $this->q ? $this->q : '搜索3D作品'; ?>"/>

                <input class="btn" id="button_searcs" name="" type="button" />

            </div>

        </div>

    </div><!--head结束-->

    <div class="clear"></div>

</div>

<div class="clear"></div>

</div>