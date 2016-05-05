<!doctype html>
<html class="no-js">
<head>
    <script type="text/javascript" src="/Public/assets/aead01b5/jquery.min.js"></script>
    <script type="text/javascript" src="/Public/js/threejs/iceman3d.min.js?_t=2015111011"></script>
    <title>大格科技图片印章</title>
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
    #savePngBtn {display:none;}
</style>
<div class="am-g">
    <div class="am-u-lg-9 am-u-md-8" style="padding-right:0;">
        <div class="help-btn">
            <span class="glyphicon glyphicon-question-sign" title="帮助" data-toggle="modal" data-target="#welcome"></span>
        </div>
        <div id="container"><canvas id="photo" width="800" height="600"></canvas></div>
    </div>
    <div class="am-u-lg-3 am-u-md-4">
        <div class="am-panel am-panel-default">
            <div class="am-panel-bd">
                <div class="am-form-file">
                    <button id="choosePhoto" type="button" class="am-btn am-btn-primary am-btn-block am-btn-lg">
                        <i class="am-icon-cloud-upload"></i> 请选择图片</button>
                    <input id="fileUpload" type="file">
                </div>
                <div class="tile" style="margin:0" id="file_preview_block" style="display:none;">
                    <img id="file_preview" alt="" style="width:40%;" />
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-5">灰度：<span id="huidu">170</span></div>
                <div class="am-u-md-7">
                    <div id="slider_huidu"></div>
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-5">模糊度：<span id="mohu">4</span></div>
                <div class="am-u-md-7">
                    <div id="slider_mohu"></div>
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-5">模型高度:<span id="height">3</span>MM</div>
                <div class="am-u-md-7">
                    <div id="slider_height"></div>
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-5">模型大小:<span id="size">100</span>MM</div>
                <div class="am-u-md-7">
                    <div id="slider_size"></div>
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-5">图片反转</div>
                <div class="am-u-md-7 am-text-left">
                    <input type="checkbox" id="toggle_huidu"  />
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <div class="am-u-md-5">左右反转</div>
                <div class="am-u-md-7 am-text-left">
                    <input type="checkbox" id="toggle_zuoyou"  />
                </div>
            </div>
        </div>
        <div class="tile control-panel">
            <div class="control-panel-mask"></div>
            <div class="am-g">
                <button onclick="diban(0);">无底板</button>
                <button onclick="diban(1);">底板1</button>
                <button onclick="diban(2);">底板2</button>
                <button onclick="diban(3);">底板3</button>
                <button onclick="diban(4);">底板4</button>
            </div>
        </div>

        <div class="tile">
            <button type="button" class="am-btn am-btn-primary am-disabled" id="exportStl">导出STL</button>
            <button class="am-btn am-btn-danger am-disabled" id="saveAndPrintBtn" data-url="/swf/model?type=6">在线打印</button>
        </div>
        <div class="tile" style="visibility:hidden">
            <progress id="progressBar" max="100" value="0" ></progress>
            <p id="progressState" ></p>
        </div>
    </div>
</div>
<script>

    var photo;
    var stlloader;
    function PreviewFile (file,photo) {

        Potrace.setParameter({turnpolicy: "minority", turdsize: 4, optcurve: true, alphamax: 1, opttolerance: 0.2, bmgrayNO: photo.bmgrayNO, bmgray: photo.modelHuidu, maxSize:600});
        Potrace.loadImageFromFile(file);
        RenderPhoto(photo);
    }

    function RenderPhoto (parent) {
        $('#choosePhoto').text('正在生成…请稍等');
        $('#loading').show();
        Potrace.process(function () {
            var subj_paths = Potrace.getPolygons(1, 8);
            //ClipperLib.JS.ScaleDownPaths (subj_paths, 4);
            //ClipperLib.JS.ScaleUpPaths (subj_paths, 4);
            var offsetX = 0;
            var offsetY = 0;
            var cpr = new ClipperLib.Clipper();
            cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
            cpr.AddPaths([[]], ClipperLib.PolyType.ptClip, true);
            var pt = new ClipperLib.PolyTree();
            cpr.Execute(ClipperLib.PolyFillType.ctUnion, pt, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftNonZero);
            var solution_exPolygons = ClipperLib.JS.PolyTreeToExPolygons(pt);
            var scale = 1;
            var thickness = 3;
            var extrudeSettings = {amount: thickness / scale, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1};

            var i = 0;
            var j = 0;
            var jj = 0;
            var geometryGroup = new THREE.Geometry();
            for (i = 0; i < solution_exPolygons.length; i++) {
                var shape = new THREE.Shape();
                shape.moveTo(solution_exPolygons[i].outer[0].X - offsetX, solution_exPolygons[i].outer[0].Y - offsetY);
                for (j = 1; j < solution_exPolygons[i].outer.length; j++) {
                    shape.lineTo(solution_exPolygons[i].outer[j].X - offsetX, solution_exPolygons[i].outer[j].Y - offsetY);
                }
                shape.lineTo(solution_exPolygons[i].outer[0].X - offsetX, solution_exPolygons[i].outer[0].Y - offsetY);
                for (j = 0; j < solution_exPolygons[i].holes.length; j++) {
                    var holePath = new THREE.Path();
                    holePath.moveTo(solution_exPolygons[i].holes[j][0].X - offsetX, solution_exPolygons[i].holes[j][0].Y - offsetY);
                    for (jj = 1; jj < solution_exPolygons[i].holes[j].length; jj++) {
                        holePath.lineTo(solution_exPolygons[i].holes[j][jj].X - offsetX, solution_exPolygons[i].holes[j][jj].Y - offsetY);
                    }
                    holePath.lineTo(solution_exPolygons[i].holes[j][0].X - offsetX, solution_exPolygons[i].holes[j][0].Y - offsetY);
                    shape.holes.push(holePath);
                }
                var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                //	                THREE.GeometryUtils.merge(geometryGroup,geometry);
                geometryGroup.merge(geometry);
            };
            //	        THREE.GeometryUtils.center(geometryGroup);
            geometryGroup.center();
            var matrix = new THREE.Matrix4();
            var m1 = new THREE.Matrix4();
            var m2 = new THREE.Matrix4();
            m1.makeRotationY(Math.PI);
            m2.makeRotationZ(Math.PI);
            matrix.multiplyMatrices(m1, m2);
            matrix.multiplyScalar(scale);
            geometryGroup.applyMatrix(matrix);
            //geometryGroup.computeVertexNormals();

            if (parent.mainMesh) {
                parent.scene.remove(parent.mainMesh);
            }

            var material = new THREE.MeshPhongMaterial({color: 0x1abc9c, specular: 0xA0A0A0, shininess: 2, side: THREE.DoubleSide, wireframe: false, shading: THREE.SmoothShading});

            parent.mainMesh = new THREE.Mesh(geometryGroup, material);
            parent.mainMesh.name = "meshPhoto";

            //console.log(parent.mainMesh);

            parent.scene.add(parent.mainMesh);
            //

            parent.mainMesh.geometry.computeBoundingBox();
            var _x = Math.abs(parent.mainMesh.geometry.boundingBox.max.x - parent.mainMesh.geometry.boundingBox.min.x);
            var _y = Math.abs(parent.mainMesh.geometry.boundingBox.max.y - parent.mainMesh.geometry.boundingBox.min.y);
            var _max = Math.max(_x, _y);
            parent.mainMesh.scale.x = parent.mainMesh.scale.y = 1.0 * parent.modelSize / _max;

            var rGao = Math.abs(parent.mainMesh.geometry.boundingBox.max.z - parent.mainMesh.geometry.boundingBox.min.z);
            parent.mainMesh.scale.z = 1.0 * parent.modelHeight / rGao;
            parent.mainMesh.position.z = rGao * parent.mainMesh.scale.z / 2;
            parent.mainMesh.rotation.y = parent.isFromRight ? Math.PI : 0;

            parent.DrawIfNeeded();
            $('#saveAndPrintBtn,#exportStl').removeClass('am-disabled');
            $('.control-panel-mask').remove();

            $('#choosePhoto').text('选择图片');
        });
    }
    function Resize()
    {
        var canvas = document.getElementById('photo');
        var header = document.getElementById('main-nav').offsetHeight;
        var height = window.innerHeight - header;
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

    function Load()
    {
        //showWelcome();
        window.onresize = Resize;
        Resize();

        var viewerSettings = {
            //cameraEyePosition: [-6.0, -5.5, 4.0],
            cameraEyePosition: [0, -120, 80],
            cameraCenterPosition: [0.0, 0.0, 0.0],
            cameraUpVector: [0.0, 0.0, 1.0]
        };

        photo = new ICEMAN3D.Photo();
        if (!photo.Start(document.getElementById('photo'), viewerSettings)) {
            return;
        }
        photo.Draw();

        $('#huidu').text(photo.modelHuidu);
        $('#height').text(photo.modelHeight);
        $('#size').text(photo.modelSize);
        $('#mohu').text(photo.modelMohu);
        $(document).on('change','#toggle_huidu',function(event){
            if (!photo.mainMesh) {
                return;
            }
            photo.bmgrayNO = $(this).is(':checked');
            Potrace.setParameter({bmgrayNO:photo.bmgrayNO,bmgray:photo.modelHuidu,turdsize:photo.modelMohu});
            Potrace.reBuild();
            RenderPhoto(photo);
        });
        $(document).on('change','#toggle_zuoyou',function(event){
            if (!photo.mainMesh) {
                return;
            }
            photo.isFromRight = !$(this).is(':checked');
            photo.mainMesh.rotation.y = photo.isFromRight ? Math.PI : 0;
            photo.DrawIfNeeded();
        });

        var $slider = $("#slider_huidu");
        var $slider_height = $("#slider_height");
        var $slider_size = $("#slider_size");
        var $slider_mohu = $("#slider_mohu");
        if ($slider.length > 0) {
            $slider.slider({
                min: 0,
                max: 255,
                value: photo.modelHuidu,
                orientation: "horizontal",
                range: "min",
                step: 10,
                stop: function( event, ui ) {
                    if (!photo.mainMesh) {
                        return;
                    }
                    photo.modelHuidu = ui.value;
                    $('#huidu').text(photo.modelHuidu);
                    Potrace.setParameter({bmgrayNO:photo.bmgrayNO,bmgray:photo.modelHuidu,turdsize:photo.modelMohu});
                    Potrace.reBuild();
                    RenderPhoto(photo);
                }
            });
        };
        if ($slider_height.length > 0) {
            $slider_height.slider({
                min: 1,
                max: 20,
                value: photo.modelHeight,
                orientation: "horizontal",
                range: "min",
                step: 1,
                slide: function( event, ui ) {
                    if (!photo.mainMesh) {
                        return;
                    }
                    photo.modelHeight = ui.value;
                    $('#height').text(photo.modelHeight);
                    photo.mainMesh.geometry.computeBoundingBox();
                    var rGao = Math.abs(photo.mainMesh.geometry.boundingBox.max.z - photo.mainMesh.geometry.boundingBox.min.z);
                    photo.mainMesh.scale.z = 1.0 * photo.modelHeight/rGao;
                    photo.mainMesh.position.z = photo.modelHeight/2;
                    photo.DrawIfNeeded();
                }
            });
        };
        if ($slider_size.length > 0) {
            $slider_size.slider({
                min: 10,
                max: 100,
                value: photo.modelSize,
                orientation: "horizontal",
                range: "min",
                step: 1,
                slide: function( event, ui ) {
                    if (!photo.mainMesh) {
                        return;
                    }
                    photo.modelSize = ui.value;
                    $('#size').text(photo.modelSize);
                    photo.mainMesh.geometry.computeBoundingBox();
                    var rGao = Math.max(Math.abs(photo.mainMesh.geometry.boundingBox.max.x - photo.mainMesh.geometry.boundingBox.min.x), Math.abs(photo.mainMesh.geometry.boundingBox.max.y - photo.mainMesh.geometry.boundingBox.min.y));
                    photo.mainMesh.scale.x = photo.mainMesh.scale.y = 1.0 * photo.modelSize/rGao;
                    photo.DrawIfNeeded();
                }
            });
        };
        if ($slider_mohu.length > 0) {
            $slider_mohu.slider({
                min: 1,
                max: 100,
                value: photo.modelMohu,
                orientation: "horizontal",
                range: "min",
                step: 1,
                slide: function( event, ui ) {
                    if (!photo.mainMesh) {
                        return;
                    }
                    photo.modelMohu = ui.value;
                    $('#mohu').text(photo.modelMohu);
                    Potrace.setParameter({bmgrayNO:photo.bmgrayNO,bmgray:photo.modelHuidu,turdsize:photo.modelMohu});
                    Potrace.reBuild();
                    RenderPhoto(photo);
                }
            });
        };

        $(document).on('click', '#saveAndPrintBtn', function() {
            //console.log(stlData());return;
            if (!photo.mainMesh) {
                alert("请先选择照片"); return;
            }

            var fd = new FormData();
            var fileName = "照片图章";
            fd.append('name', fileName);

            var arr = photo.canvas.toDataURL('image/png').split(',');
            var byteString = atob(arr[1]); // decodeURI(arr[1])
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            fd.append('image', new Blob([ia], { type: 'image/png' }) , fileName+".png");

            try {
                fd.append('stl',new Blob([ICEMAN3D.StlBinaryData(photo,'meshPhoto')], {type: "text/plain"}), fileName+".stl");
            } catch (e) {
                fd.append('stl', ICEMAN3D.StlData(photo));
            }

            var xhr = new XMLHttpRequest();

            xhr.open('POST',$(this).data('url'),true); // 异步传输
            xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
            xhr.upload.onprogress = function (ev) {
                var percent = 0;
                //if(ev.lengthComputable) {
                percent = 100 * ev.loaded/ev.total;
                console.log(percent + '%');
                //}
                setProgress(percent, "正在提交数据 " + percent.toFixed(2) + '%');
            }
            xhr.upload.onloadend = function (ev) {
                console.log("onloadend=>");
                setProgress(0, "");
            };
            xhr.onload = function(e) {
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
            xhr.upload.onerror = function(status, statusText){
                console.log(status,statusText);
                alert(status + statusText);
            };
            xhr.send(fd);
            return false;
        }).on('change', '#fileUpload', function(e) {
            if (!window.FileReader) return;
            var i,files = e.target.files;
            for (i = 0; i < files.length; i++) {
                if (!files[i].type.match('image.*')) {
                    alert('请选择图片格式的文件！');
                    continue;
                }
                var reader = new FileReader();
                reader.onload = (function() {
                    return function(e) {
                        // img 元素
                        document.getElementById('file_preview').src = e.target.result;
                        document.getElementById('file_preview_block').style.display = 'block';
                    };
                })(files[i]);
                reader.readAsDataURL(files[i]);
                PreviewFile(files[i],photo);
            }
        }).on('click','#exportStl',function(){
            if(photo.VertexCount()>0){
                ICEMAN3D.SaveStl(photo,'meshPhoto');
            }else{
                alert('请选择图片');return false;
            }
        });

    }

    function diban(type) {
        if (photo.bottomMesh) {
            photo.scene.remove(photo.bottomMesh);
            photo.bottomMesh = null;
            photo.DrawIfNeeded();
        }
        if (type) {
            var stlUrl = ["/Public/static/stamp/Yfh.STL", "/Public/static/stamp/Ykl.STL", "/Public/static/stamp/Ysz.STL", "/Public/static/stamp/Ytl.STL"];
            stlloader.load(stlUrl[type-1], function (geometry, materials) {

                var material = new THREE.MeshPhongMaterial({color: 0xfca837, specular: 0xfca837, shading: THREE.SmoothShading, shininess: 30, fog: false, side: THREE.DoubleSide});

                if ( geometry instanceof THREE.Geometry )
                    geometry = new THREE.BufferGeometry().fromGeometry( geometry );

                photo.bottomMesh = new THREE.Mesh(geometry, material);
                photo.bottomMesh.name = "meshPhoto";

                photo.bottomMesh.castShadow = true;
                photo.bottomMesh.receiveShadow = true;

                photo.bottomMesh.geometry.computeBoundingBox();

                var positions = geometry.attributes.position.array;
                var ttt=geometry.boundingBox.max.clone().add(geometry.boundingBox.min).multiplyScalar(0.5)
                for(var i=0;i<positions.length;i+=3){
                    positions[i]-=ttt.x;
                    positions[i+1]-=ttt.y;
                    positions[i+2]-=ttt.z;
                    //minZ = Math.min(positions[i+2],minZ);
                }
                geometry.computeBoundingBox();

                var dims = photo.bottomMesh.geometry.boundingBox.max.clone().sub(photo.bottomMesh.geometry.boundingBox.min);
                var maxDim = Math.max(Math.max(dims.x, dims.y), dims.z);
                var scale = 200 / maxDim;
                scale = Math.min(scale, 1);



                geometry.computeVertexNormals();
                photo.bottomMesh.position.set( 0, 0, geometry.boundingBox.max.z*scale );

                photo.bottomMesh.rotation.x = Math.PI;
                photo.bottomMesh.position.z = -geometry.boundingBox.max.z*scale;

                photo.scene.add(photo.bottomMesh);
                photo.DrawIfNeeded();

            });
        }
    }

    window.onload = function ()
    {
        Load();
        stlloader = new THREE.STLLoader();
        diban(1);
    }
</script>        <div class="am-modal" tabindex="-1" id="loginDialog">
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
<script type="text/javascript" src="/Public/static/jquery-ui-slide.js"></script>
<script type="text/javascript" src="/Public/js/threejs/three.71.min.js"></script>
<script type="text/javascript" src="/Public/js/threejs/STLLoader.js"></script>
<script type="text/javascript" src="/Public/create/js/clipper.js"></script>
<script type="text/javascript" src="/Public/js/threejs/potrace.js?_t=1"></script>
<script type="text/javascript" src="/Public/js/threejs/stamp.min.js?_t=2222"></script>
</body>
</html>