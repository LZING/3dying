
<!doctype html>
<html class="no-js">
<head>
    <link rel="stylesheet" type="text/css" href="/Public/css/printer.css" />
    <script type="text/javascript" src="/Public/assets/aead01b5/jquery.min.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/three.71.min.js?_t=2015"></script>
    <script type="text/javascript" src="/Public/js/threejs/STLLoader.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/NormalControls.js?_t=20150428"></script>
    <script type="text/javascript" src="/Public/js/threejs/Thingiview.js?_t=201509221461408356"></script>
    <script type="text/javascript" src="/Public/js/threejs/main.js?_t=201509281461408356"></script>
    <script type="text/javascript" src="/Public/static/jquery-powerFloat.js"></script>
    <title>在线预览stl模型文件</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="author" content="Bobby Chan" />
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/Public/>
    <meta name="keywords" content="3D打印,3D打印机,3D打印技术,3D打印模型,STL模型下载,3D模型" />
    <meta name="description" content="大格科技是国内最大的3D打印模型分享平台，为全球3D打印机用户提供最新最全的3D打印模型免费下载服务，并提供3D模型在线预览。大格科技，秉承“分享”的理念，通过整合3D打印领域最优质的模型资源，以分享为特色，为广大3D打印机用户和模型设计师提供分享下载一站式专业服务。" />
    <link rel="Icon" href="/Public/favicon.ico" type="image/x-icon" />
    <link rel="Shortcut Icon" href="/Public/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="/Public/css/animate.css" />

    <link rel="stylesheet" type="text/css" href="/Public/static/amazeui/css/amazeui.flat.css" />
    <link rel="stylesheet" type="text/css" href="/Public/css/apps.css" />
    <!--[if lt IE 9]>
    <script src="/Public/js/html5shiv.min.js"></script>
    <script src="/Public/js/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="/Public/static/amazeui/js/amazeui.js"></script>
</head>
<body>
<header class="am-topbar" id="main-nav">
    <h1 class="am-topbar-brand">
        <a href="/"><img height="50" width="125" src="/Public/images/logo.png" alt="大格科技模型库"></a>
    </h1>
    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#doc-topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

    <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">
        <ul class="am-nav am-nav-pills am-topbar-nav" style="margin-left: 40px;">
            <li>
                <div class="am-form-file">
                    <button type="button" class="am-btn am-btn-primary am-topbar-btn am-btn-sm">
                        <i class="am-icon-cloud-upload"></i> 打开本地模型</button>
                    <input type="file" id="uploadLocalSTL" />
                </div>
            </li>
        </ul>
        <div class="am-topbar-right">
        </div>

        <div class="am-topbar-right">
            <ul class="am-nav am-nav-pills am-topbar-nav">
                <li><a href="/">大格科技模型库</a></li>
                <li class="am-dropdown" data-am-dropdown="">
                    <a class="am-dropdown-toggle" data-am-dropdown-toggle="" href="javascript:;">
                        3D在线建模 <span class="am-icon-caret-down"></span>
                    </a>
                    <ul class="am-dropdown-content">
                        <li><a href="/apps/">方块世界</a></li>
                        <li><a href="/apps/photo">立体照片</a></li>
                        <li><a href="/apps/draw">手绘图案</a></li>
                        <li><a href="/apps/text">立体文字</a></li>
                        <li><a href="/apps/stamp">图片印章</a></li>
                        <li><a href="/apps/print">模型预览</a></li>
                    </ul>
                </li>
<!--                <li><a href="/download/index">软件下载</a></li>-->
<!--                <li><a href="/apps/help">帮助手册</a></li>-->
<!--                <li class="am-dropdown" data-am-dropdown>-->
<!--                    <a class="am-dropdown-toggle" data-am-dropdown-toggle href="javascript:;">-->
<!--                        我的大格科技 <span class="am-icon-caret-down"></span>-->
<!--                    </a>-->
<!--                    <ul class="am-dropdown-content">-->
<!--                        <li><a href="/Public/account/user/index">个人主页</a></li>-->
<!--                        <li><a href="/Public/account/user/collect">我的收藏</a></li>-->
<!--                        <li><a href="/Public/account/user/design/t0">我发布的</a></li>-->
<!--                        <li class="am-divider"></li>-->
<!--                        <li><a class="dyl-menu-icon-logout" href="/Public/site/logout">退出</a></li>-->
<!--                    </ul>-->
<!--                </li>-->
            </ul>
        </div>
    </div>
</header>        <div class="am-g">
    <div class="am-u-lg-12">
        <div class="am-tabs" id="Js_Tabs">
            <ul class="am-tabs-nav am-nav am-nav-tabs" style="background-color: #f8f8f8;">
<!--                <li style="cursor: pointer;"><a onClick="$('.js-ajax-apps a:first').click();"><i class="am-icon-cube"></i> 我的模型库</a></li>-->
                <li class="am-active"><a href="#preview"><i class="am-icon-eye"></i> 模型预览</a></li>
                <li><a href="#onlineprint"><i class="am-icon-wifi"></i> 在线打印</a></li>
            </ul>

            <div class="am-tabs-bd" id="mymodellistdata">
                <div class="am-tab-panel am-fade" id="my">
                    <div class="am-g">
                        <div class="am-u-md-10 am-u-md-push-2" id="ulmodellistcontent">

                        </div>
                        <div class="am-u-lg-2 am-u-lg-pull-10 am-u-md-3 am-u-md-pull-9 my-sidebar">
                            <div class="am-offcanvas" id="sidebar">
                                <div class="am-offcanvas-bar">
                                    <ul class="am-nav js-ajax-apps" id="ulmodellistsidebar">
                                        <li class="am-nav-header">列表</li>
                                        <li>
                                            <a class="" href="/Public/apps/history"><i class="am-icon-cloud-upload"></i> 打印历史</a>
                                        </li>
                                        <li>
                                            <a class="" href="/Public/apps/collect"><i class="am-icon-star"></i> 我收藏的</a>
                                        </li>
                                        <li>
                                            <a class="" href="/Public/apps/like"><i class="am-icon-heart"></i> 我喜欢的</a>
                                        </li>
                                        <li>
                                            <a class="" href="/Public/apps/design?type=0"><i class="am-icon-cloud-upload"></i> 我发布的</a>
                                        </li>
                                        <li>
                                            <a class=""  href="/Public/apps/design?type=1"><i class="am-icon-picture-o"></i> 我的照片</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <a style="position:absolute;top: 0;right: 0;" href="#sidebar" class="am-btn am-btn-sm am-btn-success am-icon-bars am-show-sm-only" data-am-offcanvas=""><span class="am-sr-only">侧栏导航</span></a>                            </div>
                </div>
                <div class="am-tab-panel am-fade am-in am-active" id="preview">
                    <div class="am-g">
                        <div class="am-u-md-12 am-u-lg-4">
                            <div class="am-panel-group" id="accordion">
                                <div class="am-progress am-progress-striped" id="progress_loading_container" style="display: none;">
                                    <div id="progress_loading" class="am-progress-bar am-progress-bar-success" style="width: 0%"></div>
                                </div>
                                <div class="am-panel am-panel-default">
                                    <div class="am-panel-hd">
                                        <h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#J_scale'}">
                                            缩放模型                                                </h4>
                                    </div>
                                    <div id="J_scale" class="am-panel-collapse am-collapse am-in">
                                        <div class="am-panel-bd">
                                            <div class="am-form am-form-horizontal">
                                                <div class="am-form-group">
                                                    <label for="modelWidth" class="am-u-sm-4 am-form-label am-text-danger">X(毫米)</label>
                                                    <div class="am-u-sm-8">
                                                        <input style="cursor: col-resize;" id="modelWidth" placeholder="输入X大小" type="text" value=""/Public/>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <label for="modelHeight" class="am-u-sm-4 am-form-label am-text-success">Y(毫米)</label>
                                                    <div class="am-u-sm-8">
                                                        <input style="cursor: col-resize;" id="modelHeight" placeholder="输入Y大小" type="text" value=""/Public/>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <label for="modelDeep" class="am-u-sm-4 am-form-label am-text-primary">Z(毫米)</label>
                                                    <div class="am-u-sm-8">
                                                        <input style="cursor: col-resize;" id="modelDeep" placeholder="输入Z大小" type="text" value=""/Public/>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <label for="modelScale" class="am-u-sm-4 am-form-label">缩放比率</label>
                                                    <div class="am-u-sm-8">
                                                        <input style="cursor: col-resize;" id="modelScale" placeholder="输入缩放比率" type="text" value=""/Public/>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <label for="modelScale" class="am-u-sm-4 am-form-label am-text-primary">拖动</label>
                                                    <div class="am-u-sm-8">
                                                        <input id="modelZoom_range" type="range" max="100" min="0" step="1" disabled="disabled"/Public/>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <div class="am-u-sm-8 am-u-sm-offset-4">
                                                        <button id="modelZoom_max" class="mouseevent am-btn am-btn-default am-btn-sm">最大</button>
                                                        <button id="modelZoom_reset" class="mouseevent am-btn am-btn-default am-btn-sm">重置</button>
                                                        <span class="warning-text">输入无效</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="am-panel am-panel-default">
                                    <div class="am-panel-hd">
                                        <h4 class="am-panel-title" data-am-collapse="{parent: '#accordion', target: '#J_rotation'}">
                                            旋转模型                                                </h4>
                                    </div>
                                    <div id="J_rotation" class="am-panel-collapse am-collapse">
                                        <div class="am-panel-bd">
                                            <div class="am-form am-form-horizontal">
                                                <div class="am-form-group">
                                                    <label class="am-u-sm-2 am-form-label am-text-danger">X轴</label>
                                                    <div class="am-u-sm-10">
                                                        <button id="J_rotation_x" class="am-btn am-btn-danger">+90°</button>
                                                        <button id="J_rotation_xplus" class="am-btn am-btn-danger">+1°</button>
                                                        <button id="J_rotation_xminus" class="am-btn am-btn-danger">-1°</button>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <label for="modelScale" class="am-u-sm-2 am-form-label am-text-success">Y轴</label>
                                                    <div class="am-u-sm-10">
                                                        <button id="J_rotation_y" class="am-btn am-btn-success">+90°</button>
                                                        <button id="J_rotation_yplus" class="am-btn am-btn-success">+1°</button>
                                                        <button id="J_rotation_yminus" class="am-btn am-btn-success">-1°</button>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <label for="modelScale" class="am-u-sm-2 am-form-label am-text-primary">Z轴</label>
                                                    <div class="am-u-sm-10">
                                                        <button id="J_rotation_z" class="am-btn am-btn-primary">+90°</button>
                                                        <button id="J_rotation_zplus" class="am-btn am-btn-primary">+1°</button>
                                                        <button id="J_rotation_zminus" class="am-btn am-btn-primary">-1°</button>
                                                    </div>
                                                </div>
                                                <div class="am-form-group">
                                                    <div class="am-u-sm-10 am-u-sm-offset-2">
                                                        <button id="J_rotation_reset" class="am-btn am-btn-default am-btn-sm">还原</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="am-btn am-btn-danger am-fr" onclick="$('.am-tabs-nav a').eq(2).trigger('click');">在线打印</button>
                        </div>
                        <div class="am-u-md-12 am-u-lg-8">
                            <div class="model-main">
                                <div class="actionbar">
                                    <div class="actionbar-top">
                                        <div class="actionbar-home clearfix">
                                            <a id="J_zoom" class="left"><i class="iconfont">&#xe624;</i></a>
                                            <div class="actionbar-zoom">
                                                <a id="J_zoomA" class="mouseevent"><i class="iconfont">&#xe636;</i></a>
                                                <a id="J_zoomB" class="mouseevent" style="margin-top:4px;"><i class="iconfont">&#xe634;</i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="actionbar-block" style="display:none;">
                                        <div class="actionbar-icon">
                                            <a data-href="view"><i class="iconfont">&#xe63b;</i><em></em></a>
                                            <div id="J_view" class="actionbar-pannel">
                                                <h3>改变视角</h3>
                                                <div class="actionbar-pannel-content">
                                                    <div class="actionbar-pannel-icon icon01"><button id="J_cameraTop" class="am-btn am-btn-default am-btn-xs">上面</button></div>
                                                    <div class="actionbar-pannel-icon icon02"><button id="J_cameraSide" class="am-btn am-btn-default am-btn-xs">侧面</button></div>
                                                    <div class="actionbar-pannel-icon icon03"><button id="J_cameraFront" class="am-btn am-btn-default am-btn-xs">前面</button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div id="container"></div>
                        </div>
                    </div>

                </div>
                <div class="am-tab-panel am-fade" id="onlineprint">
                    <div id="connect-printer" class="am-g">
                        <div class="am-u-sm-6 am-u-lg-centered">
                            <div class="am-form" style="margin:0 auto;padding:50px 0 20px; width:320px;">
                                <div class="am-form-group">
                                    <label for="">请输入打印机序列号</label>
                                    <input class="J_PrinterSn" type="text" placeholder="打印机序列号" value="" name="sn_number" />
                                    <div class="print-dropdown-box">
                                        <ul class="Js_PrinterList">
                                        </ul>
                                    </div>
                                </div>
                                <button type="button" id="connectPrinter" class="am-btn am-btn-primary">连接</button>
                                <button type="button" id="disConnectPrinter" class="am-btn am-btn-default">断开</button>
                                <a  class="am-btn am-btn-default buy-3dprinter-btn" href="https://shop144892902.taobao.com/" target="_blank">购买3D打印机</a>
                            </div>
                            <img style="width:400px;display: block;margin: 0 auto;" src="/Public/images/app/ex1.jpg"/Public/>
                        </div>
                    </div>

                    <div>
                                <span style="display:none;">
                                    <button id="connectServer">连接服务器</button>
                                    <button id="disConnectServer">断开服务器</button>
                                </span>
                        <button class="am-btn am-btn-primary" id="J_bindPrinter">连接打印机</button>
                        <button class="am-btn am-btn-secondary" id="J_operatePrinter">操作打印机</button>
                        <button class="am-btn am-btn-secondary" id="J_lookPrinter" style="display:none">查看打印机</button>
                        <button class="am-btn am-btn-danger" id="readyToPrint" style="background:#ff0909;color: #fff;display:none;">打印</button>
                        <div style="" id="statuLog" class="am-alert am-alert-success animated flash"></div>
                    </div>

                    <div>
                        <!--    <div id="statusbar" style="display:none">
                                <div class="loading-shadow"></div>
                                <div class="am-loading am-loading-show"><div class="am-loading-text"><span class="am-icon-loading"></span> <span id="statuLog">MTN9389BF4C12A08页面正在在初始化，请稍候…</span></div></div>
                            </div>-->
                        <div id="bind-printer" style="display:none">
                            <div id="bind-printer-content" class="am-form" style="margin:0 auto;padding:10px 0 0; width:320px;">
                                <div class="am-form-group">
                                    <label for="">请输入打印机序列号</label>
                                    <input class="J_PrinterSn" type="text" placeholder="打印机序列号" value="" name="sn_number" />
                                    <div class="print-dropdown-box">
                                        <ul class="Js_PrinterList">
                                        </ul>
                                    </div>
                                </div>
                                <button type="button" id="connectPrinter" class="am-btn am-btn-primary">连接</button>
                                <button type="button" id="disConnectPrinter" class="am-btn am-btn-default">断开</button>
                            </div>
                            <hr>
                            <img style="width:100%;" src="/Public/images/app/ex1.jpg"/Public/>
                        </div>
                        <div style="display: none">
                            <div id="operate-printer">
                                <div class="printButtons printButtonStatus fn-clear operate-pannel">
                                    <div class="operate-pannel-left">
                                        <div><button id="yin"  class="mouseevent btn btn-success">Y-</button></div>
                                        <div class="operate-pannel-middle">
                                            <button id="xleft"  class="mouseevent btn btn-primary">X+</button>
                                            <button id="xyzero" class="btn btn-danger">XY回零</button>
                                            <button id="xright" class="mouseevent btn btn-primary">X-</button>
                                        </div>
                                        <div><button id="yout"  class="mouseevent btn btn-success" >Y+</button></div>
                                    </div>
                                    <div class="operate-pannel-right">
                                        <div> <button id="zup"  class="mouseevent btn btn-success">Z-</button></div>
                                        <div class="operate-pannel-middle">
                                            <button id="zzero" class="btn btn-danger">Z回零</button>
                                        </div>
                                        <div><button id="zdown" class="mouseevent btn btn-success">Z+</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: none">
                            <div id="look-printer">
                                <img src="" width="400" height="400" id="look-printer-img" />
                            </div>
                            <div id="login-block">
                                <form class="am-form" action="/Public/app/login" method="post">
                                    <div class="am-form-group">
                                        <label for="mobile" class="control-label">手机号/邮箱</label>
                                        <input type="text" name="username" placeholder="请输入账号">
                                    </div>
                                    <div class="am-form-group">
                                        <label for="password" class="control-label">密码</label>
                                        <input type="password" name="password" placeholder="请输入密码">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="prePrintBlock">
                        <div id="printBlock" style="display:none;">
                            <div id="sliceParams">
                                <div class="am-g">
                                    <div class="am-u-sm-8">
                                        <div class="am-panel am-panel-default">
                                            <div class="am-panel-hd"><h3 class="am-panel-title">基础设置</h3></div>
                                            <div class="am-panel-bd">
                                                <div class="am-form am-form-horizontal">
                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">每层厚度(mm)</label>
                                                        <div class="am-u-sm-6">
                                                            <input type="text" name="layer_height" value="0.15"/Public/>
                                                        </div>
                                                        <div class="am-u-sm-3 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '决定打印成品质量最重要的设置，表示模型在Z轴方向上的每层切片高度。<br>数值越小，打印质量越好，但是打印需要的时间越长。<br>3D打印是一层层来制作物品，如果想把物品制作的更精细，则需要每层厚度减小；<br>如果想提高打印速度，则需要增加层厚，而这势必影响产品的精度质量。', trigger: 'hover focus'}"></i></div>
                                                    </div>
                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">填充密度(%)</label>
                                                        <div class="am-u-sm-6">
                                                            <input type="text" name="fill_density" value="10"/Public/>
                                                        </div>
                                                        <div class="am-u-sm-3 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '控制打印成品的内部填充量。0为完全空心，100为完全实体。<br>通常20已经足够。这个不影响打印成品外观，只调整牢固度。数值越大，所需时间越长。', trigger: 'hover focus'}"></i></div>
                                                    </div>
                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">打印速度(mm/s)</label>
                                                        <div class="am-u-sm-6">
                                                            <input type="text" name="print_speed" value="50" />
                                                        </div>
                                                        <div class="am-u-sm-3 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '打印时喷头的移动速度。<br>速度越快所需时间越短，打印质量会下降。<br>最佳打印速度跟层厚有关，请尽量调整到最佳设置。', trigger: 'hover focus'}"></i></div>
                                                    </div>
                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">支撑类型</label>
                                                        <div class="am-u-sm-6">
                                                            <select name="support"><option value="0">无</option><option value="1">外部支撑</option><option value="2" selected="selected">全部支撑</option></select>
                                                        </div>
                                                        <div class="am-u-sm-3 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '当打印模型有悬空结构时，通常需要让软件自动增加支撑。<br>不同类型支撑效果如图：<br><img src=/Public/images/print/b_support.png />', trigger: 'hover focus'}"></i></div>
                                                    </div>
                                                    <div class="am-form-group">
                                                        <label class="am-u-sm-3 am-form-label">基板类型</label>
                                                        <div class="am-u-sm-6">
                                                            <select name="platform_adhesion"><option value="0">无</option><option value="2" selected="selected">厚底</option></select>
                                                        </div>
                                                        <div class="am-u-sm-3 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '厚底基板可以防止模型翘边。<br>花边可以增加模型和底板的粘合力，防止脱落。', trigger: 'hover focus'}"></i></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="Js_showTogglePanel" style="display:none">
                                            <div class="am-g">
                                                <div class="am-u-sm-6">
                                                    <div class="am-panel am-panel-default">
                                                        <div class="am-panel-hd"><h3 class="am-panel-title">质量</h3></div>
                                                        <div class="am-panel-bd">
                                                            <div class="am-form am-form-horizontal">
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">密封层数</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="solid_layer_count" value="6"/Public/>
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '打印成品最下和最上层的厚度。<br>通常5可以实现很好的密封情况。<br>太低顶部表面会下垂，太高增加打印时间。<br>高的设置通常用于表面打磨、钻孔。<br><img src=/Public/images/print/b_solid_layer_count.png />', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">外壁数量</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="wall_count" value="2"/Public/>
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '打印成品水平方向的厚度。<br>通常设置为2，打印效果很好。<br>高的设置通常用于表面打磨、钻孔。<br>需要结合喷嘴直径计算壁厚。1层壁厚0.4mm<br><img src=/Public/images/print/b_wall_count.png />', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="am-u-sm-6" style="padding-left:0;">
                                                    <div class="am-panel am-panel-default">
                                                        <div class="am-panel-hd"><h3 class="am-panel-title">速度</h3></div>
                                                        <div class="am-panel-bd">
                                                            <div class="am-form am-form-horizontal">
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label" style="padding-left:0;padding-right: 0;">空走速度(mm/s)</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="travel_speed" value="100"/Public/>
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '喷头在打印模型的空隙间移动时的速度。<br>较高的速度可以避免拉丝，但是过高的速度有可能造成电机失步。<br>推荐100左右。', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label" style="padding-left:0;padding-right: 0;">底层速度(mm/s)</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="bottom_layer_speed" value="30"/Public/>
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '以较慢的速度打印第一层，为了让打印物体的第一层跟底板粘合得更好，<br>不容易造成打印失败。推荐设置30。', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="am-g">
                                                <div class="am-u-sm-6">
                                                    <div class="am-panel am-panel-default">
                                                        <div class="am-panel-hd"><h3 class="am-panel-title">回抽</h3></div>
                                                        <div class="am-panel-bd">
                                                            <div class="am-form am-form-horizontal">
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">启用回抽</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input name="retraction_enable" value="1" type="checkbox" checked="checked" />
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '当喷嘴移动到非打印区域要收回耗材。', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">速度(mm/s)</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="retraction_speed" value="50" />
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '打印空走时，喷头挤出电机向上拉出耗材的速度。<br>要跟空走速度结合设置。<br>较高的回抽速度可以避免模型之间的拉丝，让打印成品更光滑。<br>但是过高的速度可能会导致卡料。', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">距离(mm)</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="retraction_amount" value="3" />
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '打印空走时，喷头挤出电机向上拉出耗材的距离，<br>避免耗材下滴形成拉丝。通常5.0可以很好的工作。<br>需要根据模型的实际空隙来设置。', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="am-u-sm-6" style="padding-left:0;">
                                                    <div class="am-panel am-panel-default">
                                                        <div class="am-panel-hd"><h3 class="am-panel-title">支撑</h3></div>
                                                        <div class="am-panel-bd">
                                                            <div class="am-form am-form-horizontal">
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">支撑角度</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="support_angle" value="60" />
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '开始生成支撑的模型和垂直的最小夹角，水平90°垂直0°。<br>数值越小生成的支撑越多。通常设置为45。<br><img src=/Public/images/print/b_support_angle.png />', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">支撑面层数</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="suppor_surface" value="5" />
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '支撑跟模型的接触面之间的面层数。<br>层数越多，支撑效果越平整，也会更不容易剥离。<br><img src=/Public/images/print/b_suppor_surface.png />', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">填充数量(%)</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="support_fill_rate" value="5"/Public/>
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '支撑结构的填充数量，越小越容易剥离，<br>过小很可能在打印过程中移动。<br>通常设置为15。', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">XY距离(mm)</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="support_xy_distance" value="2"/Public/>
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '支撑结构和打印物体在水平方向的距离。<br>推荐2，不易被粘在打印物体上，支撑更容易剥离。<br><img src=/Public/images/print/b_support_xy_distance.png />', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                                <div class="am-form-group">
                                                                    <label class="am-u-sm-6 am-u-lg-4 am-form-label">Z距离(mm)</label>
                                                                    <div class="am-u-sm-5 am-u-lg-6">
                                                                        <input type="text" name="support_z_distance" value="0.2"/Public/>
                                                                    </div>
                                                                    <div class="am-u-sm-1 am-u-lg-2 with-icon"><i class="am-icon-question-circle" data-am-popover="{content: '支撑结构和打印物体在垂直方向的距离。<br>数值越小，支撑面越平整，但不容易剥离，<br>剥离以后不美观。推荐距离0.2。<br><img src=/Public/images/print/b_support_z_distance.png />', trigger: 'hover focus'}"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="am-text-center"><button type="button" id="Js_showToggle" class="am-btn am-btn-primary ">显示更多参数 <i class="iconfont">&#xe640;</i></button></div>
                                    </div>
                                    <div class="am-u-sm-4">
                                        <div class="am-g">
                                            <div class="am-u-md-4 am-u-lg-3">切片进度 </div>
                                            <div class="am-u-md-8 am-u-lg-9">
                                                <div class="am-progress am-progress-striped">
                                                    <div id="progress1" class="am-progress-bar am-progress-bar-success" style="width: 0%"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="am-g">
                                            <div class="am-u-md-4 am-u-lg-3">下载进度 </div>
                                            <div class="am-u-md-8 am-u-lg-9">
                                                <div class="am-progress am-progress-striped">
                                                    <div id="progress2" class="am-progress-bar am-progress-bar-primary" style="width: 0%"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button id="print" class="am-btn am-btn-xl am-btn-danger am-btn-block">开始打印</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="printingBlock" style="display:none;">
                            <div class="am-g">
                                <div class="am-u-md-6" style="margin-top:10px">
                                    <div class="am-g">
                                        <div class="am-u-md-2">
                                            <img src="/Public/static/images/printer_icon.jpg" style="max-width:100px" id="modelImage" alt="模型图片" />
                                        </div>
                                        <div class="am-u-md-10">
                                            <p class="fn-bold" id="filename">模型名称</p>
                                            <div class="am-g" style="margin:15px 0;">
                                                <div class="am-u-md-4"><span id="printReadSize"></span> / <span id="printTotalSize"></span></div>
                                                <div class="am-u-md-4"><span id="printTime"></span></div>
                                                <div class="am-u-md-4"><span id="curTemp"></span> °C / <span id="tarTemp"></span> °C</div>
                                            </div>
                                            <div class="am-progress am-progress-sm am-active am-progress-striped">
                                                <div class="J_Percent am-progress-bar am-progress-bar-success" style="width: 0"></div>
                                            </div>
                                            <div class="am-g">
                                                <div class="am-u-md-6 am-text-left"><a id="J_Adjust" class="btn btn-default"><i class="iconfont">&#xe63e;</i> 调整参数</a></div>
                                                <div class="am-u-md-6 am-text-right"><a id="stopPrint" class="am-text-danger"><i class="am-icon-stop"></i> 停止打印</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="am-u-md-6">
                                    <table class="ui-table ui-table-noborder" style="width: 100%;">
                                        <tr>
                                            <td>层数：</td><td><span id="currentZ"></span> / <span id="zMax"></span></td>
                                            <td>每层厚度：</td><td><span id="layerHeight"></span></td>
                                        </tr>
                                        <tr>
                                            <td>填充密度：</td><td><span id="fillDensity"></span></td>

                                            <td>打印速度：</td><td><span id="printSpeed1"></span></td>
                                        </tr>
                                        <tr>
                                            <td>支撑类型：</td><td><span id="support"></span></td>
                                            <td>基板：</td><td><span id="platformAdhesion"></span></td>
                                        </tr>
                                        <tr>
                                            <td>密封层数：</td><td><span id="solidLayerCount"></span></td>
                                            <td>外壁数量：</td><td><span id="wallCount"></span></td>
                                        </tr>
                                        <tr>
                                            <td>启用回抽：</td><td><span id="retractionEnable"></span></td>
                                            <td>回抽速度：</td><td><span id="retractionSpeed"></span></td>
                                        </tr>
                                        <tr>
                                            <td>回抽距离：</td><td><span id="retractionAmount"></span></td>
                                            <td>支撑角度：</td><td><span id="supportAngle"></span></td>
                                        </tr>
                                        <tr>
                                            <td>支撑面层数：</td><td><span id="supporSurface"></span></td>
                                            <td>填充数量：</td><td><span id="supportFillRate"></span></td>
                                        </tr>
                                        <tr>
                                            <td>XY距离：</td><td><span id="supportXyDistance"></span></td>
                                            <td>Z距离：</td><td><span id="supportZDistance"></span></td>
                                        </tr>
                                        <tr>
                                            <td>空走速度：</td><td><span id="travelSpeed"></span></td>
                                            <td>底层速度：</td><td><span id="bottomLayerSpeed"></span></td>
                                        </tr>
                                        <tr>
                                            <td>底层风扇速度：</td><td><span id="fanSpeed1"></span>%</td>
                                            <td>打印风扇速度：</td><td><span id="fanSpeed2"></span>%</td>
                                        </tr>
                                        <tr>
                                            <td>切片时间：</td><td><span id="sliceTime"></span></td>
                                            <td>总打印时间：</td><td><span id="printTotalTime"></span></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="pull-left fn-ml10" style="width:250px">
                                </div>
                                <div class="pull-right fn-ml10" style="width:150px">
                                    <div>

                                        <!--                    <button id="wendujia" class="btn btn-default">温度+</button>
                                                            <button id="wendujian" class="btn btn-default">温度-</button>
                                                            <button id="liuliangjia" class="btn btn-default">流量+</button>
                                                            <button id="liuliangjian" class="btn btn-default">流量-</button>
                                                            <button id="sudujia" class="btn btn-default">速度+</button>
                                                            <button id="sudujian" class="btn btn-default">速度-</button>-->
                                    </div>
                                </div>
                            </div>

                            <div style="display: none">
                                <div id="J_AdjustBox">
                                    <table class="table" style="width:100%;">
                                        <tr>
                                            <td>
                                                <div class="form-group">
                                                    <label class="control-label">调整目标温度°：<span id="J_TarTemp"></span>°C</label>
                                                    <div class="range-slider">
                                                        <input id="J_TempValue" type="range" min="160" max="260" step="1">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="form-group">
                                                    <label class="control-label">底层风扇速度：<span id="J_CurFanValue1"></span>%</label>
                                                    <div class="range-slider">
                                                        <input id="J_FanValue1" type="range" min="0" max="100" step="1">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="form-group">
                                                    <label class="control-label">打印风扇速度：<span id="J_CurFanValue2"></span>%</label>
                                                    <div class="range-slider">
                                                        <input id="J_FanValue2" type="range" min="0" max="100" step="1">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="form-group">
                                                    <label class="control-label">打印速度比例：<span id="J_CurSpeed"></span>%</label>
                                                    <div class="range-slider">
                                                        <input id="J_SpeedValue" type="range" min="20" max="200" step="1">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="am-modal" tabindex="-1" id="loginDialog">
    <div class="am-modal-dialog">
        <div class="am-modal-hd am-text-left">登录                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
        </div>
        <div class="am-modal-bd am-text-left">
            <form class="am-form" action="/Public/app/login" method="post">
                <div class="am-form-group">
                    <label for="mobile" class="control-label">手机号/邮箱</label>
                    <input type="text" name="username" placeholder="请输入账号">
                </div>
                <div class="am-form-group">
                    <label for="password" class="control-label">密码</label>
                    <input type="password" name="password" placeholder="请输入密码">
                </div>
                <button type="submit" class="am-btn am-btn-primary">登录</button>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript" src="/Public/static/tools/js/modernizr.js"></script>
<script type="text/javascript" src="/Public/static/dialog-plus.min.js"></script>
<script type="text/javascript">
    var printer;
    function loadModel(id) {
        printer.loadModel(id);
        $("#Js_Tabs").tabs('open', 1);
    }
    $(function () {
        $('#Js_Tabs').tabs({noSwipe: 1});
        printer = new Printer({
            "uid": "35815",
            "clientid": "web_35815",
            //"beatUrl": "/Public/apps/heartBeat",
            "encUrl": "/Public/apps/enc",
            "snUrl": "/Public/apps/saveSn",
            "containerWidth": $("#container").width(),
            "containerHeight": window.innerHeight - 140,
            "uploadUrl":"/Public/account/model/uploadModel?type=0"
        });
        $(document).on('click', '.Js_PrinterList a', function () {
            $('.J_PrinterSn').val($(this).data('sn'));
            $.powerFloat.hide();
        }).on('click','.js-ajax-apps a',function(){
            $.ajax({
                url: $(this).attr('href'),
                success: function (html) {
                    $('#my').replaceWith(html);
                }
            });
            return false;
        }).on('click', '.Js_PrinterDel', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var link = $(this).attr('href');
            var parent = $(this).parents('.js-div');
            window.dialog({
                title: '提示？',
                content: '确定删除这条记录吗',
                cancelValue: '取消',
                cancel: function () {},
                okValue: '确定',
                ok: function () {
                    $.ajax({
                        url: link,
                        success: function () {
                            parent.remove();
                        }
                    });
                }
            }).showModal();
        }).on('click','.Js_CancelCollect',function(e){
            e.preventDefault();
            var url = $(this).attr('href'),element = $(this).parents('.Board');
            var parent = $(this).parents('.js-div');
            var dialog = window.dialog({
                title: "提示",
                drag: false,
                content: '确定要取消吗？',
                okValue: '确定',
                ok: function () {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        cache: false,
                        success: function () {
                            dialog.statusbar('<div class="collect-success">'+'取消成功！'+'</div>');
                            $('[i-id=ok]').attr('disabled',true);
                            setTimeout(function () {
                                element.remove();
                                dialog.close().remove();
                            }, 1000);
                            parent.remove();
                            return false;
                        },
                        error: function (XHR) {
                            dialog.statusbar(XHR.responseText);
                        }
                    });
                    return false;
                },
                cancelValue: '取消',
                cancel: function () {}
            }).width(400).showModal();
        }).on('change', '#uploadLocalSTL', function (e) {
            if (!window.FileReader)
                return;
            var i, files = e.target.files;
            for (i = 0; i < files.length; i++) {
                console.log(files[i]);
                localStorage.setItem("localName",files[i].name);
                var reader = new FileReader();
                reader.onload = function (e) {
                    localStorage.setItem("local",e.target.result);
                    printer.loadLocalModel();
                    window.location.hash = "local";
                };
                reader.readAsBinaryString(files[i]);
                break;
            }
            $("#Js_Tabs").tabs('open', 1);
        });
        $('#loginDialog').on('opened.modal.amui', function () {
            $('#loginDialog form input').eq(0).focus();
        });

        $(document).on('submit', '#loginDialog form', function () {
            $.ajax({
                url: $(this).attr('action'),
                data: $(this).serialize(),
                type: 'POST',
                dataType: 'json',
                success: function (obj) {
                    if (obj.errorCode != 0) {
                        alert(obj.msg);
                    } else {
                        window.location.reload();
                        //$('#loginDialog').modal('hide');
                    }
                },
                error: function (XHR) {
                    alert(XHR.responseText);
                }
            });
            return false;
        });

        var _id = _oldId = window.location.hash.replace("#", "");
        if (_id && _id > 0) {
            loadModel(_id);
        } else if (_id == 'local') {
            printer.loadLocalModel();
        }
        $(window).focus(function() {
            _id = window.location.hash.replace("#", "");
            if(_id && _id > 0 && _id != _oldId){
                _oldId = _id;
                loadModel(_id);
            }
        });

    })
</script>
</body>
</html>