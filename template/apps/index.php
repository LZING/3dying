<!doctype html>
<html class="no-js">
<head>
    <script type="text/javascript" src="/Public/js/jquery.min.js"></script>
    <script type="text/javascript" src="/Public/js/iceman3d.min.js?_t=2015111011"></script>
    <title>大格科技方块世界</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="author" content="Bobby Chan" />
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="keywords" content="3D打印,3D打印机,3D打印技术,3D打印模型,STL模型下载,3D模型" />
    <meta name="description" content="大格科技是国内最大的3D打印模型分享平台，为全球3D打印机用户提供最新最全的3D打印模型免费下载服务，并提供3D模型在线预览。大格科技，秉承“分享”的理念，通过整合3D打印领域最优质的模型资源，以分享为特色，为广大3D打印机用户和模型设计师提供分享下载一站式专业服务。" />
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

<style>
    html,body {width:100%; height:100%;}
    #container {width:100%; height:100%;}
    .colorpicker-2x .colorpicker-saturation {
        width: 160px;
        height: 160px;
    }
    .colorpicker-2x .colorpicker-hue,
    .colorpicker-2x .colorpicker-alpha {
        width: 30px;
        height: 160px;
    }
    .colorpicker-2x .colorpicker-color,
    .colorpicker-2x .colorpicker-color div{
        height: 30px;
    }
</style>
<script>
    var isLogin = <?php echo intval($_SESSION['user']['id'])?>;
</script>
<div class="am-g">
    <div class="am-u-lg-1 am-u-md-12" style="padding-right:0">
        <div class="color-box">
            <div class="color-box-content">
                <ul class="clearfix">
                    <li><a class="am-btn am-btn-primary am-active"><i class="setColorBtn" style="background-color:#E01515" data-color="#E01515">红色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#FF6600" data-color="#FF6600">橙色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#fec400" data-color="#fec400">黄色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#5FBC29" data-color="#5FBC29">草绿色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#00ff80" data-color="#00ff80">绿色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#01B3CA" data-color="#01B3CA">青色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#0097DA" data-color="#0097DA">天蓝色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#582DAA" data-color="#582DAA">紫色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#F387C0" data-color="#F387C0">粉红色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#E4249B" data-color="#E4249B">粉红色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#34495E" data-color="#34495E">灰蓝色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#989898" data-color="#989898">灰色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#000000" data-color="#000000">黑色</i></a></li>
                    <li><a class="am-btn am-btn-primary"><i class="setColorBtn" style="background-color:#ecf0f1" data-color="#ecf0f1">白色</i></a></li>
                    <li class="am-hide"><button type="button" id="chooseColor" class="am-btn am-btn-primary am-btn-sm">选择颜色</button></li>
                    <li><button type="button" class="am-btn am-btn-danger am-btn-sm" id="resetBtn">清空方块</button></li>
                    <li><button type="button" class="am-btn am-btn-secondary am-btn-sm" data-am-modal="{target: '#welcome', width: 800}">使用帮助</button></li>
                    <li><button type="button" class="am-btn am-btn-danger am-btn-sm am-hide" id="removeToggleBtn">添加</button></li>
                </ul>

            </div>
        </div>
    </div>
    <div class="am-u-lg-9 am-u-md-9">
        <div id="container">
            <canvas id="cube" width="800" height="600"></canvas>
        </div>
    </div>
    <div class="am-u-lg-2 am-u-md-3">
        <div class="tile">
            <img src="/Public/images/3d/brain-share.png" style="margin:5px 0 15px" alt="" />
            <h3 class="tile-title">请充分发挥你的想象力</h3>
            <p>支持在线打印，导出本地</p>
            <div style="margin-bottom:10px;">
                <button type="button" class="am-btn am-btn-danger am-btn-sm" id="editBtn">我的方块</button>
<!--                <button type="button" class="am-btn am-btn-secondary am-btn-sm" id="demoBtn" data-am-modal="{target: '#cubeDemoDialog',width: 800}">官方推荐</button>-->
                <button type="button" class="am-btn am-btn-secondary am-hide" id="createBtn">新建</button>
            </div>
        </div>
        <div class="tile">
            <button type="button" id="savePng" class="am-hide">保存图片</button>
            <button title="方便随时修改" type="button" class="am-btn am-btn-secondary am-btn-block" id="saveBtn" data-url="/user/myfangkuai/?uid=<?php echo $_SESSION['user']['id']; ?>&type=file&dir=<?php echo date('H') . rand(1, 10000);?>">保存到大格科技</button>
            <button type="button" class="am-btn am-btn-success am-btn-block" id="exportStl">导出STL</button>
            <button type="button" class="am-btn am-btn-danger am-btn-block" id="saveAndPrintBtn" data-url="/swf/model/?type=3">在线打印</button>


        </div>
        <div class="tile" id="progress" style="visibility:hidden">
            <progress id="progressBar" max="100" value="0"></progress>
            <div id="progressState" > </div>
        </div>
        <div id="cubeDialog" class="am-modal" tabindex="-1">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">我创建过的方块
                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>

                </div>
                <div class="am-modal-bd">
                    <div id="cubeList">
                        <div class="am-g">
                            <?php if($_SESSION['user']['id'] && $this->list){
                                foreach($this->list as $value){
                                ?>
                            <div class="am-u-md-3 am-u-sm-4 cubelist">
                                <div class="tile">
                                    <img class="tile-image big-illustration" src="<?php echo $value['image']?>">
                                    <div>
                                        <a data-data="/apps/demoimage/?id=<?php echo $value['id']?>" data-id="387" class="editThis am-btn am-btn-primary am-btn-sm">修改</a>
                                        <a class="am-btn am-btn-default am-btn-sm J_DeleteCube" href="/apps/deletecube/?id=<?php echo $value['id']?>">删除</a>                </div>
                                </div>
                            </div>
                            <?php }}?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="cubeDemoDialog" class="am-modal" tabindex="-1">
            <div class="am-modal-dialog">
                <div class="am-modal-hd">官方推荐                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
                </div>
                <div class="am-modal-bd">
                    <div id="cubeDemoList"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="welcome" class="am-modal" tabindex="-1">
    <div class="am-modal-dialog">
        <div class="am-modal-hd">欢迎使用大格科技方块堆积            <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
        </div>
        <div class="am-modal-bd">
            <div class="am-g">
                <div class="am-u-md-4">
                    <h6>创建属于你的方块世界!</h6>
                    <p>世界万物尽在方寸之间，想到即可实现</p>
                    <p class="am-text-center"><img src="/Public/images/3d/critter.png"></p>
                </div>
                <div class="am-u-md-4">
                    <div class="tile help-controls">
                        <h6 style="margin-top:1px;">如何操作？</h6>
                        <p>在网格上单击<strong>左键</strong>可添加一个方块</p>
                        <p>单击<strong>右键</strong>或按住<strong>shift+左键</strong>可删除一个方块</p>
                        <p>滚动<strong>鼠标滚轮</strong>可缩放网格距离</p>
                        <p>按住<strong>鼠标左键拖动</strong>可调整网格视角</p>
                        <p>点击<strong>清空按钮</strong>可清除网格上所有方块</p>
                    </div>
                </div>
                <div class="am-u-md-4">
                    <h6>如何打印？</h6>
                    <p>当你完成了你的作品，你可以直接上传到大格科技,与大家分享你的作品，或者点击“在线打印”按钮，连接ICEMAN3D打印机直接开始打印，或者导出STL文件</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="am-btn am-btn-primary" data-am-modal-close>知道啦</button>
            </div>
        </div>
    </div>
</div>
<script>
    var editId = 0,
        showCube = false,
        showOnline = false;
    function Resize()
    {
        var canvas = document.getElementById('cube');
        canvas.width = $('#container').width();
        canvas.height = $('body').height()- $('#main-nav').height();
    }

    function showWelcome() {
        var seenWelcome = localStorage.getItem('seenWelcome');
        if (seenWelcome)
            return
        $('#welcome').modal();
        localStorage.setItem('seenWelcome', true)
    }

    function setProgress(value, info) {
        $('#progress').css('visibility', 0 === value ? "hidden" : "visible");
        $('#progressBar').val(value);
        $('#progressState')(info);
    }

    function savePng(cube) {
        window.open(cube.canvas.toDataURL('image/png'), 'mywindow');
        return false;
    }

    function Load()
    {
        showWelcome();
        window.onresize = Resize;
        Resize();

        var viewerSettings = {
            //cameraEyePosition: [-6.0, -5.5, 4.0],
            cameraEyePosition: [-80, -80, 60],
            cameraCenterPosition: [0.0, 0.0, 0.0],
            cameraUpVector: [0.0, 0.0, 1.0]
        };

        var cube = new ICEMAN3D.Cube();
        if (!cube.Start(document.getElementById('cube'), viewerSettings)) {
            return;
        }
        cube.Draw();

        $(document).on('click', '#removeToggleBtn', function() {
            cube.isShiftDown = !cube.isShiftDown;
            $(this).text(cube.isShiftDown ? "删除" : "添加");
            return false;
        });


        $(document).on('submit', '#loginDialog form', function () {
            $.ajax({
                url: $(this).attr('action'),
                data: $(this).serialize(),
                type: 'POST',
                dataType: 'json',
                success: function (obj) {
                    if (obj.code != 0) {
                        isLogin = 0;
                        alert(obj.msg);
                    } else {
                        isLogin = 1;
                        loadCubeList();
                        $('#loginDialog').modal('close');

                        if (showCube) {
                            $('#cubeDialog').modal('open');
                        }
                        if (showOnline) {
                            $('#saveAndPrintBtn').trigger('click');
                        }
                        showCube = false;
                        showOnline = false;
                        console.log(obj);
                    }
                },
                error: function (XHR) {
                    isLogin = 0;
                    alert(XHR.responseText);
                }
            });
            return false;
        });
        $(document).on('click', '.setColorBtn', function () {
            $('.color-box-content a').removeClass('am-active');
            $(this).parent().addClass('am-active');
            var color = $(this).data('color');
            cube.ChangeColor(color);
        }).on('click', '#savePng', function () {
            savePng(cube);
        }).on('click', '#exportStl', function () {
            if (cube.VertexCount() > 0) {
                ICEMAN3D.SaveStl(cube, 'meshCube');
            } else {
                alert('请先添加方块');
                return false;
            }
        });
        $(document).on('click', '#resetBtn', function () {
            editId = 0;
            for (var i = 1; i < cube.objects.length; i++) {
                cube.scene.remove(cube.objects[i]);
            }
            cube.objects.splice(1, cube.objects.length - 1);
            cube.DrawIfNeeded();
        }).on('click', '#saveBtn', function () {
            if (cube.VertexCount() <= 0) {
                alert("请先添加方块");
                return false;
            }
            if(!isLogin){
                $('#loginDialog').modal();
                return false;
            }
            var data = "";
            cube.scene.traverse(function (object) {
                if (object instanceof THREE.Mesh && object.name == 'meshCube') {
                    data += object.position.x + "," + object.position.y + "," + object.position.z + "," + object.material.color.getHexString() + "," + object.material.specular.getHexString() + "\n";
                }
            });
            var fd = new FormData();
            var fileName = "方块堆积";
            fd.append('name', fileName);
            fd.append('id', editId);
            var arr = cube.canvas.toDataURL('image/png').split(',');
            var byteString = atob(arr[1]); // decodeURI(arr[1])
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            fd.append('image', new Blob([ia], {type: 'image/png'}), fileName + ".png");
            fd.append('data', data);
            var xhr = new XMLHttpRequest();

            xhr.open('POST', $(this).data('url'), true); // 异步传输
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.upload.onprogress = function (ev) {
                var percent = 0;
                //if(ev.lengthComputable) {
                percent = 100 * ev.loaded / ev.total;
                console.log(percent + '%');
                //}
                setProgress(percent, "正在提交数据 " + percent.toFixed(2) + '%');
            }
            xhr.upload.onloadend = function (ev) {
                //console.log("onloadend=>");
                setProgress(0, "");
            };
            xhr.onload = function (ev) {
                if (this.status == 200 && !isNaN(this.responseText)) {
                    console.log(this.responseText);
                    loadCubeList();
                    editId = this.responseText;
                    alert('保存成功');
                } else {
                    var d = dialog({
                        title: '提示',
                        content: this.responseText
                    });
                    d.showModal();
                }
            };
            xhr.upload.onerror = function (status, statusText) {
                console.log(status, statusText);
            };
            xhr.send(fd);
        }).on('click', '#saveAndPrintBtn', function () {

            if (cube.VertexCount() <= 0) {
                alert("请先添加方块");
                return false;
            }
            var fd = new FormData();
            var fileName = "方块堆积";
            fd.append('name', fileName);
            var arr = cube.canvas.toDataURL('image/png').split(',');
            var byteString = atob(arr[1]); // decodeURI(arr[1])
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            fd.append('image', new Blob([ia], {
                type: 'image/png'
            }), fileName + ".png");
            fd.append('stl', new Blob([ICEMAN3D.StlBinaryData(cube, 'meshCube')], {
                type: 'text/plain'
            }), fileName + ".stl");
            var xhr = new XMLHttpRequest();

            xhr.open('POST', $(this).data('url'), true); // 异步传输
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.upload.onprogress = function (ev) {
                var percent = 0;
                //if(ev.lengthComputable) {
                percent = 100 * ev.loaded / ev.total;
                console.log(percent + '%');
                //}
                setProgress(percent, "正在提交数据 " + percent.toFixed(2) + '%');
            }
            xhr.upload.onloadend = function (ev) {
                //console.log("onloadend=>");
                setProgress(0, "");
            };
            xhr.onload = function (ev) {
//                                if(!isLogin){
//                                    showCube = true;
//                                    $('#loginDialog').modal();
//                                }else{
//                                    showCube = false;
//                                    $('#cubeDialog').modal();
//                                }
                if (this.status == 200 && (this.responseText>0)) {
                    //console.log(this.responseText);
//                    var a = document.createElement("a");
//                    a.setAttribute("href", "/apps/print#" + this.responseText);
//                    a.setAttribute("target", "_blank");
//                    a.setAttribute("id", "openwin");
//                    document.body.appendChild(a);
//                    a.click();
                    location.href='/apps/print#'+this.responseText;
                    //window.open("http://www.dayin.la/apps/print#" + this.responseText);
                } else {
                    showOnline = true;
                    $('#loginDialog').modal();
                    //alert(this.responseText);
                }
            };
            xhr.upload.onerror = function (status, statusText) {
                console.log(status, statusText);
            };
            xhr.send(fd);
        });
        $(document).on('click', '#cubeList .editThis', function () {
            $('#resetBtn').trigger('click');
            editId = $(this).data('id');
            $.ajax({
                url: $(this).data('data'),
                success: function (data) {
                    data = data.split("\n");
                    for (var _k in data) {
                        var line = data[_k];
                        var row = line.split(",");
                        //console.log(row);
                        var color = new THREE.Color();
                        color.setHex("0x" + row[3]);
                        var specular = new THREE.Color();
                        specular.setHex("0x" + row[4]);
                        var addMaterial = new THREE.MeshPhongMaterial({
                            color: color.getHex(),
                            specular: specular.getHex(),
                            shading: THREE.SmoothShading,
                            shininess: 0,
                            side: THREE.DoubleSide
                        });
                        var voxel = new THREE.Mesh(cube.addGeometry, addMaterial);
                        voxel.position.set(row[0], row[1], row[2]);
                        voxel.name = "meshCube";
                        cube.scene.add(voxel);
                        cube.objects.push(voxel);
                    }
                    cube.DrawIfNeeded();
                    $('#cubeDialog').modal('close');
                }
            });
            return false;

        }).on('click', '#createBtn', function () {
            $('#resetBtn').trigger('click');
            editId = 0;
        });

        $(document).on('click', '#cubeDemoList .editThis', function () {
            $('#resetBtn').trigger('click');
            editId = $(this).data('id');
            $.ajax({
                url: $(this).data('data'),
                success: function (data) {
                    data = data.split("\n");
                    for (var _k in data) {
                        var line = data[_k];
                        var row = line.split(",");
                        //console.log(row);
                        var color = new THREE.Color();
                        color.setHex("0x" + row[3]);
                        var specular = new THREE.Color();
                        specular.setHex("0x" + row[4]);
                        var addMaterial = new THREE.MeshPhongMaterial({
                            color: color.getHex(),
                            specular: specular.getHex(),
                            shading: THREE.SmoothShading,
                            shininess: 0,
                            side: THREE.DoubleSide
                        });
                        var voxel = new THREE.Mesh(cube.addGeometry, addMaterial);
                        voxel.position.set(row[0], row[1], row[2]);
                        voxel.name = "meshCube";
                        cube.scene.add(voxel);
                        cube.objects.push(voxel);
                    }
                    cube.DrawIfNeeded();
                    $('#cubeDemoDialog').modal('close');
                    editId = 0;
                }
            });
            return false;

        });



//        $('#chooseColor').colorpicker({
//           // format: 'rgb',
//            'align': 'left',
//            colorSelectors: {
//                'default': '#777777',
//                'primary': '#337ab7',
//                'success': '#5cb85c',
//                'info': '#5bc0de',
//                'warning': '#f0ad4e',
//                'danger': '#d9534f'
//            }
//        }).on('changeColor.colorpicker', function (event) {
//            $('.color-box-content a').removeClass('active');
//            cube.ChangeColor(event.color.toHex());
//        });

        $(document).on('click', '.J_DeleteCube', function () {
            if (confirm("确定要删除吗？")) {
                var self = this;
                $.ajax({
                    url: $(this).attr('href'),
                    type: 'POST',
                    success: function (html) {
                        $(self).parents('.cubelist').remove();
                    }
                });
            }
            return false;
        });

        $(document).on('click', '#editBtn', function () {
            if (!isLogin) {
                showCube = true;
                $('#loginDialog').modal({width: 800});
            } else {
                showCube = false;
                $('#cubeDialog').modal({width: 800});
            }
        })

        loadCubeList();
        loadCubeDemoList();
    }

    window.onload = function ()
    {
        Load();
        $(document).on('click', '#cubeList .yiiPager a', function () {
            $('#cubeList').load($(this).attr('href'));
            return false;
        });
        $(document).on('click', '#cubeDemoList .yiiPager a', function () {
            $('#cubeDemoList').load($(this).attr('href'));
            return false;
        });

    };

    function loadCubeList() {
        if (isLogin) {
            $.ajax({
                url: '/apps/cubeList?type=1',
                success: function (obj) {
                    $('#cubeList')(obj);
                }
            });
        }
    }

    function loadCubeDemoList() {
        $.ajax({
            url: '/apps/cubeDemoList?type=1',
            success: function (obj) {
                $('#cubeDemoList')(obj);
            }
        });
    }

</script>
<div class="am-modal" tabindex="-1" id="loginDialog">
    <div class="am-modal-dialog">
        <div class="am-modal-hd am-text-left">登录                    <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
        </div>
        <div class="am-modal-bd am-text-left">
            <form class="am-form" action="/user/login" method="post">
                <div class="am-form-group">
                    <label for="mobile" class="control-label">用户名/邮箱</label>
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
<script type="text/javascript" src="/Public/js/three.71.js"></script>
<script type="text/javascript" src="/Public/js/cube.min.js?_t=1111111111"></script>
</body>
</html>
<script>

</script>