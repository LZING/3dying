<!doctype html>
<html class="no-js">
<head>
    <script type="text/javascript" src="/Public/assets/aead01b5/jquery.min.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/three.min.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/NormalControls.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/photo.js?_t=20151227"></script>
    <script type="text/javascript" src="/Public/js/threejs/iceman3d.min.js?_t=2015111011"></script>
    <title>大格科技立体照片</title>
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
<style>
    .am-popover {width: 200px;font-size: 1.4rem}
    .am-panel {margin-bottom: 10px;}
    .am-form-group {margin-bottom: 1rem;}
</style>
<div class="am-g">
    <div class="am-u-lg-9 am-u-md-8 am-u-sm-7" style="padding-right:0;">
        <div id="container"></div>
    </div>
    <div class="am-u-lg-3 am-u-md-4 am-u-sm-5">
        <div class="am-panel am-panel-default">
            <div class="am-panel-bd">
                <div class="am-form-file">
                    <button type="button" class="am-btn am-btn-primary am-btn-block am-btn-lg">
                        <i class="am-icon-cloud-upload"></i> 请选择照片</button>
                    <input id="fileUpload" type="file">
                </div>
                <div class="am-hide" id="prevImage"></div>
                <div class="tile" id="progressBox" style="display:none">
                    <progress id="progressBar" max="100" value="0"></progress>
                    <div id="progressState" > </div>
                </div>
            </div>
        </div>
        <div class="am-panel am-panel-default">
            <div class="am-panel-hd">参数设置 <span style="font-size:1.4rem;color: #808080;">（单位:毫米mm）</span></div>
            <div class="am-panel-bd">
                <form class="am-form am-form-horizontal" id="paramForm">
                    <div class="am-form-group am-form-group-sm">
                        <label for="maximumSize" class="am-u-sm-6 am-form-label">照片尺寸</label>
                        <div class="am-u-sm-6">
                            <input type="text"  id="maximumSize" value="" placeholder="10" onchange="lithophane.updateValues(event);">
                        </div>
                    </div>

                    <div class="am-form-group am-form-group-sm">
                        <label for="thickness" class="am-u-sm-6 am-form-label">照片厚度</label>
                        <div class="am-u-sm-6">
                            <input type="text" id="thickness" value="" placeholder="5" onchange="lithophane.updateValues(event);">
                        </div>
                    </div>

                    <div class="am-form-group am-form-group-sm">
                        <label for="borderThick" class="am-u-sm-6 am-form-label">边框宽度</label>
                        <div class="am-u-sm-6">
                            <input type="text" id="borderThick" value="" placeholder="0" onchange="lithophane.updateValues(event);">
                        </div>
                    </div>
                    <div class="am-form-group am-form-group-sm">
                        <label for="minLayer" class="am-u-sm-6 am-form-label">底板厚度</label>
                        <div class="am-u-sm-6">
                            <input type="text" id="minLayer" value="" placeholder="0.8" onchange="lithophane.updateValues(event);">
                        </div>
                    </div>
                    <div class="am-form-group am-form-group-sm">
                        <label for="vectorsPerPixel" class="am-u-sm-6 am-form-label">分辨率</label>
                        <div class="am-u-sm-6">
                            <input type="text" id="vectorsPerPixel" value="" placeholder="2" onchange="lithophane.updateValues(event);">
                        </div>
                    </div>
                    <div class="am-form-group am-form-group-sm">
                        <label for="baseDepth" class="am-u-sm-6 am-form-label">支架宽度 <a data-am-popover="{content: '如果想给照片添加站立支架，请填写此项。支架宽度范围为-50毫米到50毫米', trigger: 'hover focus'}"><i class="orange am-icon-question-circle"></i></a></label>
                        <div class="am-u-sm-6">
                            <input type="text" id="baseDepth" value="" placeholder="0" onchange="lithophane.updateValues(event);">
                        </div>
                    </div>
                    <div class="am-form-group am-form-group-sm">
                        <label for="curve" class="am-u-sm-6 am-form-label">弯曲度</label>
                        <div class="am-u-sm-6">
                            <select id="curve" onchange="lithophane.updateValues(event);">
                                <option value="0" id="curve000">平面</option>
                                <option value="-30" id="curvem30">向内弯曲30度</option>
                                <option value="-45" id="curvem45">向内弯曲45度</option>
                                <option value="-90" id="curvem90">向内弯曲90度</option>
                                <option value="-120" id="curvem120">向内弯曲120度</option>
                                <option value="-135" id="curvem135">向内弯曲135度</option>
                                <option value="-180" id="curvem180">向内弯曲180度</option>
                                <option value="-270" id="curvem270">向内弯曲270度</option>
                                <option value="-360" id="curvem360">向内弯曲360度</option>
                                <option value="30"   id="curvep30">向外弯曲30度</option>
                                <option value="45"   id="curvep45">向外弯曲45度</option>
                                <option value="90"   id="curvep90">向外弯曲90度</option>
                                <option value="120"  id="curvep120">向外弯曲120度</option>
                                <option value="135"  id="curvep135">向外弯曲135度</option>
                                <option value="180"  id="curvep180">向外弯曲180度</option>
                                <option value="270"  id="curvep270">向外弯曲270度</option>
                                <option value="360"  id="curvep360">向外弯曲360度</option>
                            </select>
                        </div>
                    </div>
                    <div class="am-form-group am-form-group-sm" style="display: none;">
                        <div class="am-u-sm-6"></div>
                        <div class="am-u-sm-6">
                            <label class="checkbox-inline">
                                <input type="checkbox" id="reFlip" onchange="lithophane.updateValues(event)"> 不允许X轴翻转                            </label>
                        </div>
                    </div>

                    <div class="am-form-group" style="margin:0;">
                        <div class="am-u-sm-6 am-u-sm-offset-6 am-text-left">
                            <button type="button" id="update" class="am-btn am-btn-primary am-btn-sm">更新</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="am-panel am-panel-default">
            <div class="am-panel-hd">导出 / 打印</div>
            <div class="am-panel-bd">
                <div class="tile" style="display:none;" id="actionBtn">
                    <button type="button" class="am-btn am-btn-primary" id="exportStl">导出STL</button>
                    <button class="am-btn am-btn-danger" id="onlineSaveAndPrint" data-url="/swf/model/?type=1">在线打印</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var LITHO_StatusMessages = {
        loading: "正在加载...",
        s1Processing: "2D处理中...",
        vProcessing: "转换矢量...",
        fProcessing: "转换面...",
        sProcessing: "转换表面...",
        cvNormals: "计算顶点法线...",
        cfNormals: "计算面法线...",
        aScene: "添加到场景...",
        createSTL: "创建STL文件...",
        download: "正在下载..."
    };
    var LITHO_InputRanges = {
        maximumSize: {name: 'maximumSize', lower: 1, upper: 1000, startval: 100},
        thickness: {name: 'thickness', lower: 1, upper: 100, startval: 5},
        borderThick: {name: 'borderThick', lower: 0, upper: 50, startval: 0},
        minLayer: {name: 'minLayer', lower: 0.1, upper: 10, startval: 0.8},
        vectorsPerPixel: {name: 'vectorsPerPixel', lower: 1, upper: 5, startval: 2},
        baseDepth: {name: 'baseDepth', lower: -50, upper: 50, startval: 0},
        reFlip: {name: 'reFlip', lower: true, upper: false, startval: false},
        curve: {name: 'curve', lower: -360, upper: 360, startval: 0}
    };


    var lithophane = new LITHO.Lithophane();
    var stlGenerator = new LITHO.STLGenerator();
    lithophane.initPage();
    $(document).on('click','#exportStl',function(){
        stlGenerator.saveTxtSTL(lithophane.stlData,'立体照片');
    });

    $(function(){
        $(document).on('click','#update',function(){
            if($("#renderImage").length){
                $('#renderImage').trigger('click');
            }else{
                alert('请先选择图片');
            }
        })
        $(document).on('change','#paramForm input,#paramForm select',function(){
            if($("#renderImage").length){
                $('#renderImage').trigger('click');
            }else{
                alert('请先选择图片');
            }
        })
    })
</script>        <div class="am-modal" tabindex="-1" id="loginDialog">
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
</body>
</html>