ICEMAN3D.Text = function () {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.ambientLight = null;
    this.directionalLight = null;
    this.canvas = null;
    this.cameraMove = null;
    this.navigation = null;
    this.settings = null;
    this.drawLoop = null;
    this.enableDraw = null;

    this.scaleGaodu = 3;
    this.scaleSize = 10;
    this.plane = null;
    this.mainMesh = null;
    this.planeSize = 100;
};

ICEMAN3D.Text.prototype.InitSettings = function (settings) {
    this.settings = {
        cameraEyePosition: new ICEMAN3D.Coord(1.0, 1.0, 1.0),
        cameraCenterPosition: new ICEMAN3D.Coord(0.0, 0.0, 0.0),
        cameraUpVector: new ICEMAN3D.Coord(0.0, 0.0, 1.0),
        lightAmbientColor: [0.5, 0.5, 0.5],
        lightDiffuseColor: [0.5, 0.5, 0.5]
    };

    if (settings !== undefined) {
        if (settings.cameraEyePosition !== undefined) {
            this.settings.cameraEyePosition = ICEMAN3D.CoordFromArray(settings.cameraEyePosition);
        }
        if (settings.cameraCenterPosition !== undefined) {
            this.settings.cameraCenterPosition = ICEMAN3D.CoordFromArray(settings.cameraCenterPosition);
        }
        if (settings.cameraUpVector !== undefined) {
            this.settings.cameraUpVector = ICEMAN3D.CoordFromArray(settings.cameraUpVector);
        }
        if (settings.lightAmbientColor !== undefined) {
            this.settings.lightAmbientColor = settings.lightAmbientColor;
        }
        if (settings.lightDiffuseColor !== undefined) {
            this.settings.lightDiffuseColor = settings.lightDiffuseColor;
        }
    }

    return true;
};

ICEMAN3D.Text.prototype.Start = function (canvas, settings) {
    if (!ICEMAN3D.IsWebGLEnabled()) {
        return false;
    }

    if (!this.InitSettings(settings)) {
        return false;
    }

    if (!this.InitThree(canvas)) {
        return false;
    }

    if (!this.InitCamera(settings)) {
        return false;
    }

    if (!this.InitLights()) {
        return false;
    }

    var geometry = new THREE.PlaneBufferGeometry(this.planeSize, this.planeSize);
    //geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    //geometry.applyMatrix( new THREE.Matrix4().makeRotationY(  - Math.PI ) );

    this.plane = new THREE.Mesh(geometry);
    this.plane.visible = false;
    this.scene.add(this.plane);

    this.drawLoop = false;
    this.enableDraw = true;
    this.DrawIfNeeded();
    return true;
};

ICEMAN3D.Text.prototype.InitThree = function (canvas) {
    this.canvas = canvas;
    if (!this.canvas || !this.canvas.getContext) {
        return false;
    }

    this.scene = new THREE.Scene();
    if (!this.scene) {
        return false;
    }

    var parameters = {
        canvas: this.canvas,
        antialias: true,
        preserveDrawingBuffer: true,
        alpha: true
    };
    this.renderer = new THREE.WebGLRenderer(parameters);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    if (!this.renderer) {
        return false;
    }

    //this.renderer.setClearColor(new THREE.Color(0xffffff));
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    return true;
};

ICEMAN3D.Text.prototype.InitCamera = function (settings) {
    this.cameraMove = new ICEMAN3D.Camera(
            ICEMAN3D.CoordFromArray(settings.cameraEyePosition),
            ICEMAN3D.CoordFromArray(settings.cameraCenterPosition),
            ICEMAN3D.CoordFromArray(settings.cameraUpVector),
            settings.fieldOfView,
            settings.nearClippingPlane,
            settings.farClippingPlane
            );

    if (!this.cameraMove) {
        return false;
    }

    this.navigation = new ICEMAN3D.Navigation();
    if (!this.navigation.Init(this.canvas, this.cameraMove, this.DrawIfNeeded.bind(this), this.Resize.bind(this))) {
        return false;
    }

    this.camera = new THREE.PerspectiveCamera(this.cameraMove.fieldOfView, this.canvas.width / this.canvas.height, this.cameraMove.nearClippingPlane, this.cameraMove.farClippingPlane);
    if (!this.camera) {
        return false;
    }

    this.scene.add(this.camera);

    return true;
};

ICEMAN3D.Text.prototype.InitLights = function () {
    var ambientColor = new THREE.Color();
    var diffuseColor = new THREE.Color();
    ambientColor.setRGB(this.settings.lightAmbientColor[0], this.settings.lightAmbientColor[1], this.settings.lightAmbientColor[2]);
    diffuseColor.setRGB(this.settings.lightDiffuseColor[0], this.settings.lightDiffuseColor[1], this.settings.lightDiffuseColor[2]);

    this.ambientLight = new THREE.AmbientLight(ambientColor.getHex());
    if (!this.ambientLight) {
        return false;
    }

    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(diffuseColor.getHex());
    if (!this.directionalLight) {
        return false;
    }

    var lightPosition = new THREE.Vector3().subVectors(this.cameraMove.eye, this.cameraMove.center);
    this.directionalLight.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
    this.scene.add(this.directionalLight);


    return true;
};

ICEMAN3D.Text.prototype.Resize = function () {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.DrawIfNeeded();
};

ICEMAN3D.Text.prototype.EnableDraw = function (enable) {
    this.enableDraw = enable;
};

ICEMAN3D.Text.prototype.Draw = function () {
    if (!this.enableDraw) {
        return;
    }

    this.camera.position.set(this.cameraMove.eye.x, this.cameraMove.eye.y, this.cameraMove.eye.z);
    this.camera.up.set(this.cameraMove.up.x, this.cameraMove.up.y, this.cameraMove.up.z);
    this.camera.lookAt(new THREE.Vector3(this.cameraMove.center.x, this.cameraMove.center.y, this.cameraMove.center.z));
    //console.log(this.camera.position);
    var lightPosition = new THREE.Vector3().subVectors(this.cameraMove.eye, this.cameraMove.center);
    this.directionalLight.position.set(lightPosition.x, lightPosition.y, lightPosition.z);

    this.renderer.render(this.scene, this.camera);
    if (this.drawLoop) {
        setStyle(this.Draw.bind(this));
    }
};

ICEMAN3D.Text.prototype.DrawIfNeeded = function () {
    if (!this.drawLoop) {
        this.Draw();
    }
};

ICEMAN3D.Text.prototype.VertexCount = function ()
{
    var count = 0;
    this.scene.traverse(function (current) {
        if (current instanceof THREE.Mesh && current.name == 'meshText') {
            if (current.geometry instanceof THREE.Geometry) {
                count = count + current.geometry.vertices.length;
            }
        }
    });

    return count;
};



$(function () {
    var gaodu = 3;
    var mainMesh;

    var container;
    var camera, scene, renderer, controls, mainMesh;
    var plane;
    var planeSize = 300;

    //init();
    //animate();

    function init() {

        container = document.getElementById('container');

        renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize($(container).width(), $(container).height());
        // renderer.sortObjects = false;
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(40, $(container).width() / $(container).height(), 1, 10000);
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

        // Grid

        var size = planeSize / 2, step = 5;

        var geometry = new THREE.Geometry();

        for (var i = -size; i <= size; i += step) {

            geometry.vertices.push(new THREE.Vector3(-size, i, 0));
            geometry.vertices.push(new THREE.Vector3(size, i, 0));

            geometry.vertices.push(new THREE.Vector3(i, -size, 0));
            geometry.vertices.push(new THREE.Vector3(i, size, 0));

        }

        var material = new THREE.LineBasicMaterial({
            color: 0x000000,
            opacity: 0.2,
            transparent: true
        });

        var line = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line);

        var geometry = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        // geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
        // geometry.applyMatrix( new THREE.Matrix4().makeRotationY( - Math.PI ) );

        plane = new THREE.Mesh(geometry);
        plane.visible = false;
        scene.add(plane);

        // var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        // Lights
        // var ambientColor = new THREE.Color ();
        // var diffuseColor = new THREE.Color ();
        // ambientColor.setRGB (0.5, 0.5, 0.5);
        // diffuseColor.setRGB (0.5, 0.5, 0.5);
        // //ambientColor.setHex('0xffcc33');
        // // diffuseColor.setHex('0xffcc33');
        //
        // var ambientLight = new THREE.AmbientLight(ambientColor.getHex());
        //
        // scene.add(ambientLight);
        //
        // var directionalLight = new THREE.DirectionalLight(diffuseColor.getHex());
        //
        // var lightPosition = new THREE.Vector3().subVectors(this.cameraMove.eye, this.cameraMove.center);
        // directionalLight.position.set (lightPosition.x, lightPosition.y, lightPosition.z);
        //
        // scene.add(directionalLight);
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

        // var ambientLight = new THREE.AmbientLight(0x606060);
        // scene.add(ambientLight);
        //
        // var directionalLight = new THREE.DirectionalLight(0xffffff);
        // directionalLight.position.set( 1, 0.75, 0.5 ).normalize();

        //

        window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {

        camera.aspect = $(container).width() / $(container).height();
        camera.updateProjectionMatrix();

        renderer.setSize($(container).width(), $(container).height());

        // render();

    }

    function render() {

        renderer.render(scene, camera);

    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function stlData() {
        var vector = new THREE.Vector3();
        var normalMatrixWorld = new THREE.Matrix3();

        var output = '';

        output += 'solid exported\n';

        scene.traverse(function (object) {
            if (object instanceof THREE.Mesh && object.name == 'photoTo3D') {

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
            if (object instanceof THREE.Mesh && object.name == 'photoTo3D') {
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
            if (object.name != "photoTo3D")
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
})

var current = current || '打印啦';

function Resize()
{
    var height = window.innerHeight;
    var canvas = document.getElementById('text');
    var container = document.getElementById('container');
    var width = parseInt(window.getComputedStyle(container).width);
    canvas.width = width;
    canvas.height = height;
}

function setProgress(value, info) {
    $('#progress').css('visibility', 0 === value ? "hidden" : "visible");
    $('#progressBar').val(value);
    $('#progressState').html(info);
}

function Load() {
    window.onresize = Resize;
    Resize();

    var viewerSettings = {
        //cameraEyePosition: [-6.0, -5.5, 4.0],
        cameraEyePosition: [0, -40, 80],
        cameraCenterPosition: [0.0, 0.0, 0.0],
        cameraUpVector: [0.0, 0.0, 1.0]
    };

    var text = new ICEMAN3D.Text();
    if (!text.Start(document.getElementById('text'), viewerSettings)) {
        return;
    }
    text.Draw();
    render(text, '打印啦');
    //初始化高度
    var initHeight, range_height;
    range_height = document.getElementById('JsHeightRange');
    initHeight = new Powerange(range_height, {
        callback: function () {
            if (!text.mainMesh) {
                return;
            }
            text.scaleGaodu = range_height.value;
            //$('#gaodu').text(text.scaleGaodu);
            text.mainMesh.geometry.computeBoundingBox();
            var rGao = Math.abs(text.mainMesh.geometry.boundingBox.max.z - text.mainMesh.geometry.boundingBox.min.z);
            text.mainMesh.scale.z = 1.0 * text.scaleGaodu / rGao;
            text.mainMesh.position.z = rGao * text.mainMesh.scale.z / 2;
            text.DrawIfNeeded();
            document.getElementById('JsHeightVal').innerHTML = range_height.value;
        }, min: 1, max: 20, start: 3, hideRange: true
    });
    //初始化大小
    var initSize, range_size;
    range_size = document.getElementById('JsSizeRange');
    initSize = new Powerange(range_size, {
        callback: function () {
            if (!text.mainMesh) {
                return;
            }
            text.scaleSize = range_size.value;
            text.mainMesh.geometry.computeBoundingBox();
            var _y = Math.abs(text.mainMesh.geometry.boundingBox.max.y - text.mainMesh.geometry.boundingBox.min.y);
            text.mainMesh.scale.x = text.mainMesh.scale.y = 1.0 * text.scaleSize / _y;
            text.DrawIfNeeded();
            document.getElementById('JsSizeVal').innerHTML = range_size.value;
        }, min: 5, max: 50, start: 10, hideRange: true
    });

    $(document).on('click', '#JsHeight', function () {
        toggleBar('#JsHeightBar');
    }).on('click', '#JsSize', function () {
        toggleBar('#JsSizeBar');
    });

    $(document).on('click', '#JsCloseBtn,#container', function () {
        $('.apps-range-bar div').css('visibility', 'hidden');
        $('#JsCloseBtn').hide();
    });

    $(document).on('click', '#JsPrint', function () {
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
        fd.append('image', new Blob([ia], {
            type: 'image/png'
        }), fileName + ".png");
        fd.append('stl', new Blob([ICEMAN3D.StlBinaryData(text, 'meshText')], {
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
            console.log("onload");
            if (this.status == 200 && !isNaN(this.responseText)) {
                window.location.href = "http://www.dayin.la/apps/view.html?id=" + this.responseText;
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
    })

    $(document).on('click', '#JsTextInput', function () {
        $.prompt('请输入文字',
                function (value) {
                    if (value == '') {
                        value = '输入文字';
                        $.alert('请先输入文字');
                    }
                    current = value;
                    render(text, value);
                },
                function (value) {
                }
        );
    }).on('click', '#JsTextType', function () {
        $.popup('.popup-text');
        //$.openPanel("#JsTextPanel");
    });
    $('.popup-text').on('close', function () {
        render(text, current);
    });

}

function render(text, value) {
    var script = document.createElement('script');
    script.src = "http://www.dayin.la/app/font?platform=2&str_font=" + encodeURI(value) + '&font_id=' + $("input[name='text-radio']:checked").val();
    script.type = 'text/javascript';
    $('body')[0].appendChild(script);
    script.onload = function () {
        var textMaterial = new THREE.MeshPhongMaterial({color: 0x8BC34A, specular: 0xaaaaaa, shininess: 5, side: THREE.DoubleSide, wireframe: false, shading: THREE.SmoothShading})
        var textGeom = new THREE.TextGeometry(value, {
            size: 16,
            height: 2,
            curveSegments: 20,
            font: 'customfont',
            weight: 'normal',
            style: 'normal',
            bevelThickness: 2,
            bevelSize: 1,
            bevelEnabled: false,
            material: 0,
            extrudeMaterial: 1
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
        text.mainMesh.position.z = _z * text.mainMesh.scale.z / 2;

        //var _x = Math.abs(text.mainMesh.geometry.boundingBox.max.x - text.mainMesh.geometry.boundingBox.min.x);
        var _y = Math.abs(text.mainMesh.geometry.boundingBox.max.y - text.mainMesh.geometry.boundingBox.min.y);
        //var _max = Math.max(_x, _y);
        //if (_max > text.planeSize) {
        //        text.mainMesh.scale.x = text.mainMesh.scale.y = text.planeSize / _max;
        //}
        text.mainMesh.scale.x = text.mainMesh.scale.y = 1.0 * text.scaleSize / _y;


        text.DrawIfNeeded();
        $('#saveAndPrintBtn').removeClass('am-disabled');

    }
}

window.onload = function () {
    Load();
}