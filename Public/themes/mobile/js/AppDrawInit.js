//撤销的array
var cancelList = new Array();
//撤销的次数
var cancelIndex = 0;
var canvasWidth = 800;
var canvasHeight = 600;

$(function () {
    var header = document.getElementById('draw-top').offsetHeight;
    canvasWidth = $('.canvas_container').width();
    canvasHeight = window.innerHeight - header;

    initCanvas();
    size = 3;

    // 绑定绘画板工具
    $(document).on("click", ".pencil", function () {
        draw_graph('pencil', this);
    });
    $(document).on("click", ".handwriting", function () {
        draw_graph('handwriting', this);
    });

    $(document).on("click", ".rubber", function () {
        draw_graph('rubber', this);
    });
    $(document).on("click", ".drawLine", function () {
        draw_graph('line', this);
    });
    $(document).on("click", ".square", function () {
        draw_graph('square', this);
    });
    $(document).on("click", ".circle", function () {
        draw_graph('circle', this);
    });
    $(document).on("click", ".fill", function () {
        fill(this);
    });
    $(document).on("click", ".cancel", function () {
        cancel(this);
    });
    $(document).on("click", ".next", function () {
        next(this);
    });
    $(document).on("click", ".clearContext", function () {
        clearContext('1');
        context.fillStyle = "white";
        //context.fillRect(0, 0, canvasWidth, canvasHeight);
        //preview();
    });


    // 初始化铅笔工具
    $(".pencil").click();

    // 选择线条大小
    $("#line_size li").click(function () {
        $("#line_size div").removeClass('active');
        size = $('a', this).data("value");
        $('div',this).addClass('active');
    });
   
    
//    $(document).on('longTap', '.apps-draw-image img', function() {
//        handleImage(this);
//    })
    var dx, dy;
    touch.on('.apps-draw-image img', 'touchstart', function (ev) {
        ev.preventDefault();
        dx = dx || 0;
        dy = dy || 0;
        var offx = dx + ev.x + "px";
        var offy = dy + ev.y + "px";
        var moveImg = $(this).clone();
        
        moveImg.attr('id','copyimg')
        moveImg.css({'position': 'absolute','opacity': 0.8,'zIndex': 10000});
        moveImg.appendTo('body');
        
        var hRatio;
        var wRatio;
        var l = 0;
        var t = 0;
        var maxWidth = canvasWidth / 2;
        var maxHeight = canvasHeight / 2;
        var Ratio = 1;
        var w = moveImg.width();
        var h = moveImg.height();

        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        // 图像大小超出绘画板大小，计算出缩放比例
        if (wRatio < 1 || hRatio < 1) {
            Ratio = (wRatio <= hRatio ? wRatio : hRatio);
        }
        // 根据比例重新设置图像大小
        if (Ratio < 1) {
            w = w * Ratio;
            h = h * Ratio;
        }
        moveImg.css({'width':w,'height':h,'left': $(this).offset().left, 'top': $(this).offset().top});
    });
    

    touch.on('.apps-draw-image img', 'drag', function (ev) {
        dx = dx || 0;
        dy = dy || 0;
        
        var offx = dx + ev.x + "px";
        var offy = dy + ev.y + "px";
        $('#copyimg')[0].style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
        
    });

    touch.on('.apps-draw-image img', 'dragend', function (ev) {
        dx += ev.x;
        dy += ev.y;
        var image = new Image();
        image.src = $(this).attr('src');
        var w = $('#copyimg').width();
        var h = $('#copyimg').height();
        var ex = $(this).offset().left + dx;
        var ey = $(this).offset().top + dy - $('#draw-top').height();
        console.log(image, ex, ey, image.width, image.height, dx, dy, w, h);
        image.onload = function () {
            // 居中缩放
            context.drawImage(image, 0, 0, image.width, image.height, ex, ey, w, h);    
            saveImageToAry();
            $('#copyimg').remove();
            $.closePanel();
            dx = 0;
            dy = 0;
        }
    });
    
    $('#fileUpload').on('change', handleFileSelect);
});


//初始化
var initCanvas = function () {
    $('.canvas_container').width(canvasWidth);
    $('.canvas_container').height(canvasHeight);

    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d');

    //context.fillStyle = "white";
    //context.fillRect(0, 0, canvasWidth, canvasHeight);

    canvasTop = $(canvas).offset().top;
    canvasLeft = $(canvas).offset().left;

    canvas_bak = document.getElementById("canvas_bak");
    canvas_bak.width = canvasWidth;
    canvas_bak.height = canvasHeight;
    context_bak = canvas_bak.getContext('2d');
}

// 填充前景
var fill = function () {
    context.fillStyle = color;
    context_bak.fillStyle = color;
    var $canvas = $("#canvas"),
            w = $canvas.width(),
            h = $canvas.height();
    context.fillRect(0, 0, w, h);

    var image = new Image();
    image.src = canvas_bak.toDataURL();
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
    clearContext();
    saveImageToAry();
}


//撤销上一个操作
var cancel = function () {
	if (cancelList.length <= cancelIndex) {
		return;
	}
    cancelIndex++;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    var image = new Image();
    var index = cancelList.length - 1 - cancelIndex;
    var url = cancelList[index];
    if (url) {
    	image.src = url;
        image.onload = function () {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
            //preview();
        }
        
    }else{
        //preview();
    }
    
}

//重做上一个操作
var next = function () {
	if (cancelIndex <= 0) {
		return;
	}
    cancelIndex--;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    var image = new Image();
    var index = cancelList.length - 1 - cancelIndex;
    var url = cancelList[index];
    if (url) {
    	image.src = url;
        image.onload = function () {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
            //preview();
        }
    }else{
        //preview();
    }
    
}


var rubberFinish = function() {
	clearContext();
}

//保存历史 用于撤销
var saveImageToAry = function () {
    cancelIndex = 0;
    var dataUrl = canvas.toDataURL();
    cancelList.push(dataUrl);
    //preview();
}

// 处理文件拖入事件，防止浏览器默认事件带来的重定向  
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}


// 判断是否图片
function isImage(type) {
    switch (type) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
        case 'image/bmp':
        case 'image/jpg':
        return true;
        default:
        return false;
    }
}

// 处理图片
function handleImage(img){
    $.closePanel();
    var moveImg = $(img).clone();
    moveImg.css({'position': 'absolute','opacity': 0.5,'zIndex': 10000});
    moveImg.appendTo('body');
    
    var hRatio;
    var wRatio;
    var l = 0;
    var t = 0;
    var maxWidth = canvasWidth / 2;
    var maxHeight = canvasHeight / 2;
    var Ratio = 1;
    var w = moveImg.width();
    var h = moveImg.height();

    wRatio = maxWidth / w;
    hRatio = maxHeight / h;
    // 图像大小超出绘画板大小，计算出缩放比例
    if (wRatio < 1 || hRatio < 1) {
        Ratio = (wRatio <= hRatio ? wRatio : hRatio);
    }
    // 根据比例重新设置图像大小
    if (Ratio < 1) {
        w = w * Ratio;
        h = h * Ratio;
    }
    moveImg.css({'width':w,'height':h,'left': $(img).offset().left, 'top': $(img).offset().top});

    $(img).bind('touchmove',function(e) {
        l = e.changedTouches[ 0 ].pageX -  w/2;
        t = e.changedTouches[ 0 ].pageY - h/2; 
        moveImg.css({'left':l,'top':t});
    }).bind('touchend', function(e) {
        $(img).unbind('touchmove');
        $(img).unbind('touchend');
        moveImg.remove();
        
        var image = new Image();
        image.src = $(img).attr('src');
        
        l = e.changedTouches[ 0 ].pageX -  w/2;
        t = e.changedTouches[ 0 ].pageY - $('#draw-top').height() - h/2;
        image.onload = function () {
            // 居中缩放
            context.drawImage(image, 0, 0, image.width, image.height, l, t, w, h);    
            saveImageToAry();
        }
    });
}

// 处理拖放文件列表  
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $.closePanel();

    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
        var t = f.type ? f.type : 'n/a';
        reader = new FileReader();
        isImg = isImage(t);

        // 处理得到的图片  
        if (isImg) {
            reader.onload = (function (theFile) {
                return function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var hRatio;
                        var wRatio;
                        var l = 0;
                        var t = 0;
                        var maxWidth = canvasWidth / 2;
                        var maxHeight = canvasHeight / 2;
                        var Ratio = 1;
                        var w = image.width;
                        var h = image.height;
                        wRatio = maxWidth / w;
                        hRatio = maxHeight / h;
                        // 图像大小超出绘画板大小，计算出缩放比例
                        if (wRatio < 1 || hRatio < 1) {
                            Ratio = (wRatio <= hRatio ? wRatio : hRatio);
                        }
                        // 根据比例重新设置图像大小
                        if (Ratio < 1) {
                            w = w * Ratio;
                            h = h * Ratio;

                        }
                        // 图片居中摆放
                        l = (maxWidth - w / 2);
                        t = (maxHeight - h / 2);
                    
                        // 居中缩放
                        context.drawImage(image, 0, 0, image.width, image.height, l, t, w, h);
                    }

                };
            })(f)
            reader.readAsDataURL(f);
        }
    }
}

var mainMesh, scene;
var planeSize = 150;
function renderPhoto() {
    Potrace.process(function () {
        var subj_paths = Potrace.getPolygons(1, 8);
        // ClipperLib.JS.ScaleDownPaths (subj_paths, 4);
        // ClipperLib.JS.ScaleUpPaths (subj_paths, 4);
        var offsetX = 0;
        var offsetY = 0;
        var cpr = new ClipperLib.Clipper();
        cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);
        cpr.AddPaths([[]], ClipperLib.PolyType.ptClip, true);
        var pt = new ClipperLib.PolyTree();
        cpr.Execute(ClipperLib.PolyFillType.ctUnion, pt, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftNonZero);
        var solution_exPolygons = ClipperLib.JS.PolyTreeToExPolygons(pt);

        console.log("make mesh");
        var scale = 1;
        var thickness = 3;
        var extrudeSettings = {
            amount: thickness / scale,
            bevelEnabled: false,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 1,
            bevelThickness: 1
        };

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
            // THREE.GeometryUtils.merge(geometryGroup,geometry);
            geometryGroup.merge(geometry);
        }
        ;
        // THREE.GeometryUtils.center(geometryGroup);
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

        if (mainMesh) {
            scene.remove(mainMesh);
        }
        mainMesh = new THREE.Mesh(geometryGroup, new THREE.MeshPhongMaterial({
            color: 0x16a085,
            specular: 24704,
            shading: THREE.SmoothShading,
            shininess: 10,
            fog: false,
            side: THREE.DoubleSide
        }));
        // mesh.position.set(0, 0, thickness/2);
        mainMesh.name = "meshDraw";
        // group.add(mesh);
        scene.add(mainMesh);

        var gaodu = 3;
        var rGao = Math.abs(mainMesh.geometry.boundingBox.max.z - mainMesh.geometry.boundingBox.min.z);
        mainMesh.scale.z = 1.0 * gaodu / rGao;

        var _x = Math.abs(mainMesh.geometry.boundingBox.max.x - mainMesh.geometry.boundingBox.min.x);
        var _y = Math.abs(mainMesh.geometry.boundingBox.max.y - mainMesh.geometry.boundingBox.min.y);
        var _max = Math.max(_x, _y);
        if (_max > planeSize) {
            mainMesh.scale.x = mainMesh.scale.y = planeSize / _max;
        }

        mainMesh.position.z = rGao * mainMesh.scale.z / 2;
    });
}

    var gaodu = 3;

    var container;
    var camera, renderer, controls;
    var plane,height;

    function init() {
        var header = document.getElementById('draw-top').offsetHeight;
        
        height = window.innerHeight - header;
        container = document.getElementById('draw-container');

        renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true, alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize($(container).width(), height);
        // renderer.sortObjects = false;
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(40, $(container).width() / height, 1, 10000);
        camera.position.set(0, -100, 180);

        camera.up.x = 0;// 设置相机的上为「x」轴方向
        camera.up.y = 0;// 设置相机的上为「y」轴方向
        camera.up.z = 1;// 设置相机的上为「z」轴方向

        camera.lookAt(new THREE.Vector3());// 设置视野的中心坐标

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target = new THREE.Vector3(0, 0, 0);
        controls.noPan = false;
        controls.mouseButtons = {
            ORBIT: THREE.MOUSE.LEFT,
            ZOOM: THREE.MOUSE.MIDDLE,
            PAN: THREE.MOUSE.RIGHT
        };
        controls.update();

        scene = new THREE.Scene();

        var geometry = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        // geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
        // geometry.applyMatrix( new THREE.Matrix4().makeRotationY( - Math.PI ) );

        plane = new THREE.Mesh(geometry);
        plane.visible = false;
        scene.add(plane);

        var spotLight = new THREE.SpotLight(0xffffff, .3, 0);
        spotLight.position.set(-700, 1000, 1000);
        spotLight.castShadow = false;
        scene.add(spotLight);

        var pointLights = [];

        var pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
        pointLight.position.set(-700, 1000, 100);
        scene.add(pointLight);
        pointLights.push(pointLight);

        pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
        pointLight.position.set(200, -1000, 0);
        scene.add(pointLight);
        pointLights.push(pointLight);

        pointLight = new THREE.PointLight(0xffffff, 0.7, 0);
        pointLight.position.set(3200, -3900, 3500);
        scene.add(pointLight);
        pointLights.push(pointLight);

        pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
        pointLight.position.set(0, 0, -10000);
        scene.add(pointLight);
        pointLights.push(pointLight);

        pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
        pointLight.position.set(0, 0, 10000);
        scene.add(pointLight);
        pointLights.push(pointLight);

        window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {
        camera.aspect = $(container).width() / height;
        camera.updateProjectionMatrix();

        renderer.setSize($(container).width(), height);
    }

    function render() {

        renderer.render(scene, camera);

    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    
    function preview() {
        //console.log(document.getElementById("canvas").toDataURL());
        Potrace.loadImageFromUrl(document.getElementById("canvas").toDataURL());
        Potrace.setParameter({
            turnpolicy: "majority",
            turdsize: 4,
            optcurve: true,
            alphamax: 1,
            opttolerance: 0.2,
            bmgray: 127
        });
        renderPhoto();
        onWindowResize();
    }

$(function () {
    //$('#gaodu').text(gaodu);
    init();
    animate();
    //初始化高度
    var initHeight,range_height;
    range_height = document.getElementById('JsHeightRange');
    initHeight = new Powerange(range_height, {
        callback: function(){
            if (!mainMesh) {return;};
            gaodu = range_height.value;
            mainMesh.geometry.computeBoundingBox();
            var rGao = Math.abs(mainMesh.geometry.boundingBox.max.z - mainMesh.geometry.boundingBox.min.z);
            mainMesh.scale.z = 1.0 * gaodu / rGao;
            mainMesh.position.z = rGao * mainMesh.scale.z / 2;
        }, min: 1, max: 60, start: 3
    });
    $(document).on('click', '#JsPreview', function () {
        preview();
    }).on('click', '#saveAndPrintBtn', function () {
        // console.log(stlData());return;

        var fd = new FormData();
        var fileName = "手绘线条";
        fd.append('name', fileName);
        var arr = renderer.domElement.toDataURL('image/png').split(',');
        var byteString = atob(arr[1]); // decodeURI(arr[1])
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        fd.append('image', new Blob([ia], {
            type: 'image/png'
        }), fileName + ".png");
        fd.append('stl', new Blob([stlBinaryData()], {
            type: 'text/plain'
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
            	window.open("http://www.dayin.la/apps/print.html#" + this.responseText);
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
        if (mainMesh) {
            saveStl();
        }else{
            alert('请绘制图案');return false;
        }
    });
    function stlData() {
        var vector = new THREE.Vector3();
        var normalMatrixWorld = new THREE.Matrix3();

        var output = '';

        output += 'solid exported\n';

        scene.traverse(function (object) {
            if (object instanceof THREE.Mesh && object.name == 'meshDraw') {

                var geometry = object.geometry;
                var matrixWorld = object.matrixWorld;

                if (geometry instanceof THREE.Geometry) {

                    var vertices = geometry.vertices;
                    var faces = geometry.faces;

                    normalMatrixWorld.getNormalMatrix(matrixWorld);

                    for (var i = 0, l = faces.length; i < l; i++) {

                        var face = faces[i];

                        vector.copy(face.normal).applyMatrix3(normalMatrixWorld).normalize();

                        output += '\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
                        output += '\t\touter loop\n';

                        var indices = [face.a, face.b, face.c];

                        for (var j = 0; j < 3; j++) {

                            vector.copy(vertices[indices[j]]).applyMatrix4(matrixWorld);

                            output += '\t\t\tvertex ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';

                        }

                        output += '\t\tendloop\n';
                        output += '\tendfacet\n';
                    }
                }
            }
        });

        output += 'endsolid exported\n';

        return output;
    }

    function stlBinaryData() {
        var vector = new THREE.Vector3();
        var normalMatrixWorld = new THREE.Matrix3();
        var triangles = 0;
        scene.traverse(function (object) {
            if (object instanceof THREE.Mesh && object.name == 'meshDraw') {
                if (object.geometry instanceof THREE.Geometry) {
                    triangles += object.geometry.faces.length;
                }
            }
        });

        var offset = 80; // skip header
        var bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
        var arrayBuffer = new ArrayBuffer(bufferLength);
        var output = new DataView(arrayBuffer);
        output.setUint32(offset, triangles, true);
        offset += 4;

        scene.traverse(function (object) {

            if (!(object instanceof THREE.Mesh))
                return;
            if (!(object.geometry instanceof THREE.Geometry))
                return;
            // console.log(object, object.parent, object.name)
            if (object.name != "meshDraw")
                return; // add

            var geometry = object.geometry;
            var matrixWorld = object.matrixWorld;

            var vertices = geometry.vertices;
            var faces = geometry.faces;

            normalMatrixWorld.getNormalMatrix(matrixWorld);

            for (var i = 0, l = faces.length; i < l; i++) {

                var face = faces[i];

                vector.copy(face.normal).applyMatrix3(normalMatrixWorld).normalize();

                output.setFloat32(offset, vector.x, true);
                offset += 4; // normal
                output.setFloat32(offset, vector.y, true);
                offset += 4;
                output.setFloat32(offset, vector.z, true);
                offset += 4;

                var indices = [face.a, face.b, face.c];

                for (var j = 0; j < 3; j++) {

                    vector.copy(vertices[indices[j]]).applyMatrix4(matrixWorld);

                    output.setFloat32(offset, vector.x, true);
                    offset += 4; // vertices
                    output.setFloat32(offset, vector.y, true);
                    offset += 4;
                    output.setFloat32(offset, vector.z, true);
                    offset += 4;

                }

                output.setUint16(offset, 0, true);
                offset += 2; // attribute byte count

            }

        });

        return output;
    }
    
    
    function saveStl(isBinary) {
        var output = stlData();
        var blob;
        try {
            blob = new Blob([output], {type: 'text/plain'});
        }
        catch (e) {
            // Old browser, need to use blob builder
            window.BlobBuilder = window.BlobBuilder ||
                    window.WebKitBlobBuilder ||
                    window.MozBlobBuilder ||
                    window.MSBlobBuilder;
            if (window.BlobBuilder) {
                var bb = new BlobBuilder();
                bb.append(output);
                blob = bb.getBlob("text/plain");
            }
        }
        saveAs(blob, "手绘图案" + '.stl');
    }
});