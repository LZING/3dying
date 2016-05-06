<!doctype html>
<html class="no-js">
<head>
    <script type="text/javascript" src="/Public/assets/aead01b5/jquery.min.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/iceman3d.min.js?_t=2015111011"></script>
    <title>大格科技立体文字</title>
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
<body>
<?php $this->load('apps/header.php');?>
<div class="am-g">
    <div class="am-u-lg-9 am-u-md-8" style="padding-right:0;">
        <div class="help-btn">
            <span class="glyphicon glyphicon-question-sign" title="帮助" data-toggle="modal" data-target="#welcome"></span>
        </div>
        <div id="container"><canvas id="text" width="800" height="600"></canvas></div>
    </div>
    <div class="am-u-lg-3 am-u-md-4">
        <div class="am-text-left tile am-form">
            <div class="am-form-group">
                <input class="am-input-lg" type="text" id="fontStr" value="大格科技" placeholder=请输入文字>
            </div>
            <div class="am-form-group">
                <select class="select select-default am-input-lg" style="width:100%" name="font_id" id="font_id">
                    <option value="">请选择字体</option>
                    <optgroup label="中文字体">
                        <option value="42" selected="selected">微软雅黑</option>
                        <option value="19">方正行楷_简体</option>
                        <option value="14">高端黑</option>
                        <option value="10">方正胖头鱼</option>
                        <option value="6">方正粗圆_简体</option>
                        <option value="24">方正粗圆_繁体</option>
                        <option value="11">方正少儿_简体</option>
                        <option value="23">方正少儿_繁体</option>
                        <option value="12">方正小篆体</option>
                        <option value="5">方正粗宋_简体</option>
                        <option value="25">方正粗宋_繁体</option>
                        <option value="13">方正臧体</option>
                        <option value="7">方正琥珀体_简体</option>
                        <option value="8">方正汉真广标</option>
                    </optgroup>
                    <optgroup label="英文字体">
                        <option value="1">Arial</option>
                        <option value="43">Arial粗体</option>
                        <option value="15">Georgia</option>
                        <option value="17">verdana</option>
                        <option value="32">Advert</option>
                    </optgroup>
                </select>                    </div>

            <button type="button" class="am-btn am-btn-primary am-btn-block am-btn-lg" id="previewBtn">文字预览</button>
            <script type="text/javascript" id="fontScript"></script>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-4" style="padding: 0;">厚度(Z)：<span id="gaodu">3</span>mm</div>
                <div class="am-u-md-8" style="padding: 0;">
                    <div id="slider_height"></div>
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-4" style="padding: 0;">大小(Y)：<span id="size">3</span>mm</div>
                <div class="am-u-md-8" style="padding: 0;">
                    <div id="slider_size"></div>
                </div>
            </div>
        </div>
        <div class="tile">
            <button type="button" class="am-btn am-btn-primary am-btn-lg am-disabled" id="exportStl">导出STL</button>
            <button class="am-btn am-btn-danger am-btn-lg am-disabled" id="saveAndPrintBtn" data-url="/swf/model/?type=5">在线打印</button>
        </div>
    </div>
</div>
<script type="text/javascript">
    function Resize()
    {
        var header = document.getElementById('main-nav').offsetHeight;
        var height = window.innerHeight - header;
        var canvas = document.getElementById('text');
        var container = document.getElementById('container');
        var width = parseInt(window.getComputedStyle(container).width);
        canvas.width = width;
        canvas.height = height;
    }

    function showWelcome() {
        var seenWelcome = localStorage.getItem('seenWelcome');
        if (seenWelcome) return
        $('#welcome').modal();
        localStorage.setItem('seenWelcome', true)
    }

    function setProgress(value, info) {
        $('#progress').css('visibility', 0 === value ? "hidden" : "visible");
        $('#progressBar').val(value);
        $('#progressState')(info);
    }

    function Load() {
        //showWelcome();
        window.onresize = Resize;
        Resize();

        var viewerSettings = {
            //cameraEyePosition: [-6.0, -5.5, 4.0],
            cameraEyePosition: [0, -50, 80],
            cameraCenterPosition: [0.0, 0.0, 0.0],
            cameraUpVector: [0.0, 0.0, 1.0]
        };

        var text = new ICEMAN3D.Text();
        if (!text.Start(document.getElementById('text'), viewerSettings)) {
            return;
        }
        text.Draw();
        Render(text,'大格科技');
        var $slider_height = $("#slider_height");

        if ($slider_height.length > 0) {
            $slider_height.slider({
                min: 1,
                max: 20,
                value: 3,
                orientation: "horizontal",
                range: "min",
                step: 1,
                slide: function( event, ui ) {
                    if (!text.mainMesh) {return;}
                    text.scaleGaodu = ui.value;
                    $('#gaodu').text(text.scaleGaodu);
                    text.mainMesh.geometry.computeBoundingBox();
                    var rGao = Math.abs(text.mainMesh.geometry.boundingBox.max.z - text.mainMesh.geometry.boundingBox.min.z);
                    console.log("rGao:", rGao);
                    text.mainMesh.scale.z = 1.0 * text.scaleGaodu / rGao;
                    text.mainMesh.position.z = rGao * text.mainMesh.scale.z / 2;
                    text.DrawIfNeeded();
                }
            });
        };

        $('#slider_size').slider({
            min: 5,
            max: 100,
            value: 20,
            orientation: "horizontal",
            range: "min",
            step: 1,
            slide: function( event, ui ) {
                if (!text.mainMesh) {return;}
                text.scaleSize = ui.value;
                $('#size').text(text.scaleSize);
                text.mainMesh.geometry.computeBoundingBox();
                var _y = Math.abs(text.mainMesh.geometry.boundingBox.max.y - text.mainMesh.geometry.boundingBox.min.y);
                text.mainMesh.scale.x = text.mainMesh.scale.y = 1.0 * text.scaleSize / _y;
                text.DrawIfNeeded();
            }
        });

        $('#gaodu').text(text.scaleGaodu);
        $('#size').text(text.scaleSize);
        $('#fontStr').bind('keyup', function(event) {
            if (event.keyCode == "13") {
                $('#previewBtn').click();
            }
        });
        $('#font_id').bind('change', function(event) {
            Render(text,$('#fontStr').val() || '大格科技');
        });
        $(document).on('click', '#previewBtn', function() {
            if ($('#fontStr').val() == '') {
                var d = dialog({
                    title: '提示',
                    content: '请先输入文字',
                    quickClose: true
                });
                d.showModal();
            }
            $('#fontScript').remove();
            Render(text,$('#fontStr').val());
        }).on('click', '#saveAndPrintBtn', function() {
            // console.log(stlData());return;
            var fd = new FormData();
            var fileName = "立体文字";
            fd.append('name', fileName);
            var arr = text.canvas.toDataURL('image/png').split(',');
            var byteString = atob(arr[1]); // decodeURI(arr[1])
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            fd.append('image', new Blob([ ia ], {
                type : 'image/png'
            }), fileName + ".png");
            fd.append('stl', new Blob([ ICEMAN3D.StlBinaryData(text,'meshText') ], {
                type : 'text/plain'
            }), fileName + ".stl");
            var xhr = new XMLHttpRequest();

            xhr.open('POST', $(this).data('url'), true); // 异步传输
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.upload.onprogress = function (ev) {
                var percent = 0;
                // if(ev.lengthComputable) {
                percent = 100 * ev.loaded / ev.total;
                console.log(percent + '%');
                // }
            }
            xhr.upload.onloadend = function (ev) {
                console.log("onloadend=>");
            };
            xhr.onload = function (e) {
                if (this.status == 200 && !isNaN(this.responseText)) {
//                    var a = document.createElement("a");
//                    a.setAttribute("href", "http://www.dayin.la/apps/print#" + this.responseText);
//                    a.setAttribute("target", "_blank");
//                    a.setAttribute("id", "openwin");
//                    document.body.appendChild(a);
//                    a.click();
                    location.href='/apps/print#'+this.responseText;
                    //window.open("http://www.dayin.la/apps/print#" + this.responseText);
                } else {
                    alert(this.responseText);
                }
            };
            xhr.upload.onerror = function (status, statusText) {
                console.log(status, statusText);
                alert(status + statusText);
            };
            xhr.send(fd);
            return false;
        }).on('click','#exportStl',function(){
            if(text.VertexCount()>0){
                ICEMAN3D.SaveStl(text,'meshText',true);
            }else{
                alert('请先输入文字');return false;
            }
        });

    }

    function Render(text,value) {
        var script = document.createElement('script');
        script.src = "http://www.dayin.la/app/font?platform=2&str_font=" + encodeURI(value)+'&font_id='+$('#font_id').val();
        console.log(script.src);
        //script.src = "http://www.dayin.la/static/TextFonts/Arial_Bold.js";
        script.type = 'text/javascript';
        $('body')[0].appendChild(script);
        script.onload = function() {
            var textMaterial = new THREE.MeshPhongMaterial({color: 0x009999 ,specular: 0xeeeeee, shininess: 1, side: THREE.DoubleSide, wireframe: false, shading: THREE.SmoothShading})
            var textGeom = new THREE.TextGeometry(value, {
                size : 16,
                height : 2,
                curveSegments : 20,
                font : 'customfont',
                weight : 'normal',
                style : 'normal',
                bevelThickness : 2,
                bevelSize : 1,
                bevelEnabled : false,
                material : 0,
                extrudeMaterial : 1
            });

            if (text.mainMesh) {
                text.scene.remove(text.mainMesh);
            }
            text.mainMesh = new THREE.Mesh(textGeom, textMaterial);

            textGeom.computeBoundingBox();
            // var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

            // textMesh.position.set( -0.5 * textWidth, -100, 0 );
            text.mainMesh.position.sub(textGeom.center());
            text.mainMesh.position.set(0, 0, (textGeom.boundingBox.max.z - textGeom.boundingBox.min.z) / 2);
            // mainMesh.name = strstr
            text.mainMesh.maker = "font";
            // mainMesh.uuid = null

            text.mainMesh.name = "meshText";
            text.scene.add(text.mainMesh);


            var _z = Math.abs(text.mainMesh.geometry.boundingBox.max.z - text.mainMesh.geometry.boundingBox.min.z);
            text.mainMesh.scale.z = 1.0 * text.scaleGaodu / _z;
            text.mainMesh.position.z = _z * text.mainMesh.scale.z/2;

            //var _x = Math.abs(text.mainMesh.geometry.boundingBox.max.x - text.mainMesh.geometry.boundingBox.min.x);
            var _y = Math.abs(text.mainMesh.geometry.boundingBox.max.y - text.mainMesh.geometry.boundingBox.min.y);
            //var _max = Math.max(_x, _y);
            //if (_max > text.planeSize) {
            //        text.mainMesh.scale.x = text.mainMesh.scale.y = text.planeSize / _max;
            //}
            text.mainMesh.scale.x = text.mainMesh.scale.y = 1.0 * text.scaleSize / _y;


            text.DrawIfNeeded();
            $('#saveAndPrintBtn,#exportStl').removeClass('am-disabled');
            $('.control-panel-mask').remove();
        }
    }

    window.onload = function ()
    {
        Load();

    }

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
<script type="text/javascript" src="/Public/js/threejs/three.71.min.js"></script>
<script type="text/javascript" src="/Public/js/threejs/text.min.js?_t=20121009"></script>
</body>
</html>