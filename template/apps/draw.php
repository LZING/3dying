<!doctype html>
<html class="no-js">
<head>
    <link rel="stylesheet" type="text/css" href="/Public/plugins/draw-master/css/canvas.css" />
    <script type="text/javascript" src="/Public/assets/aead01b5/jquery.min.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/three.71.min.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/OrbitControls.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/iceman3d.min.js?_t=2015111011"></script>
    <title>大格科技手绘线条</title>
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
    <link rel="stylesheet" type="text/css" href="/Public/css/animate.old.css" />

    <link rel="stylesheet" type="text/css" href="/Public/static/amazeui/css/amazeui.flat.css" />
    <link rel="stylesheet" type="text/css" href="/Public/css/apps.css" />

    <!--[if lt IE 9]>
    <script src="/Public/js/html5shiv.min.js"></script>
    <script src="/Public/js/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="/Public/static/amazeui/js/amazeui.js"></script>
</head>
<script>
    var isLogin = <?php echo intval($_SESSION['user']['id'])?>;

</script>
<body>
<?php $this->load('apps/header.php');?>
<div class="am-g">
    <div id="draw" class="am-u-lg-6 am-u-md-6">
        <div class="am-g">
            <div class="am-u-md-12">
                <ul id="draw_header" class="draw_controller cf" style="padding-left: 0; width:100%; ">
                    <li class="normal pencil" title="铅笔"></li>
                    <li class="normal handwriting" title="涂鸦"></li>
                    <li class="normal line showLine" title="线条大小"></li>
                    <li class="normal showColor" style="display: none;" id="chooseColor" title="选择颜色"></li>
                    <li class="normal rubber" title="橡皮擦"></li>
                    <span>|</span>
                    <li class="normal drawLine" title="画直线"></li>
                    <li class="normal square" title="方形"></li>
                    <li class="normal circle" title="圆"></li>
                    <li class="normal fill" title="填充前景" style="display:none"></li>
                    <span>|</span>
                    <li class="normal cancel" title="后退"></li>
                    <li class="normal next" title="前进"></li>
                    <li class="normal clearContext" title="清屏"></li>
                    <li class="normal save" title="保存" style="display:none"></li>
                    <li class="normal downloadImage hide" title="下载图案"><a href="#" download="picture.png" id="downloadImage_a"></a></li>
                </ul>
                <div id="line_size"  class="line_size normal">
                    <ul>
                        <!-- <li><button data-value="0.5" class="small"><span style="width: 1px; height: 1px;"></span></button></li> -->
                        <!--                        <li><button data-value="1" class="small"><span style="width: 2px; height: 2px;"></span></button></li>-->
                        <!-- <li><button data-value="2" class="small"><span style="width: 3px; height: 3px;"></span></button></li> -->
                        <li><button data-value="3" class="small selected"><span style="width: 4px; height: 4px;"></span></button></li>
                        <!-- <li><button data-value="4"><span style="width: 6px; height: 6px;"></span></button></li> -->
                        <li><button data-value="5"><span style="width: 8px; height: 8px;"></span></button></li>
                        <li><button data-value="7"><span style="width: 10px; height: 10px;"></span></button></li>
                        <!-- <li><button data-value="9"><span style="width: 12px; height: 12px;"></span></button></li> -->
                        <!-- <li><button data-value="16"><span style="width: 16px; height: 16px;"></span></button></li> -->
                        <!-- <li><button data-value="32" class="large"><span style="width: 28px; height: 28px;"></span></button></li> -->
                    </ul>
                </div>
            </div>
        </div>

        <div class="canvas_container">
            <canvas id="canvas">浏览器不支持哦，亲</canvas>
            <canvas id="canvas_bak"></canvas>
        </div>
    </div>
    <div id="view" class="am-u-lg-6 am-u-md-6" style="position:relative;">
        <div class="am-g" style="height:50px;margin:10px 0 0;">
            <div class="am-u-md-2" style="margin-top:5px;">
                高度：<span id="gaodu">3</span>
            </div>
            <div class="am-u-md-3">
                <div id="slider_height" style="margin:15px 0 0"></div>
            </div>
            <div class="am-u-md-7">
                <button type="button" class="am-btn am-btn-primary am-btn-sm" id="exportStl">导出STL</button>
                <button type="button" class="am-btn am-btn-danger am-btn-sm" id="saveAndPrintBtn" data-url="/swf/model/?type=7">在线打印</button>
            </div>
        </div>
        <div style="height:600px;" id="container"></div>
    </div>
</div>        <div class="am-modal" tabindex="-1" id="loginDialog">
    <div class="am-modal-dialog">
        <div class="am-modal-hd am-text-left">登录                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
        </div>
        <div class="am-modal-bd am-text-left">
            <form class="am-form" action="/user/login" method="post">
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
<script type="text/javascript" src="/Public/static/jquery-ui-slide.js"></script>
<script type="text/javascript" src="/Public/create/js/clipper.js"></script>
<script type="text/javascript" src="/Public/js/threejs/potrace.js?_t=2"></script>
<script type="text/javascript" src="/Public/plugins/draw-master/js/draw.js"></script>
<script type="text/javascript" src="/Public/js/threejs/draw.min.js?_t111011"></script>
</body>
</html>