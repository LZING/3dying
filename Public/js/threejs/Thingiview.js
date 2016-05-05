var Detector = {
    canvas: !! window.CanvasRenderingContext2D,
    webgl: ( function () {

        try {

            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

        } catch ( e ) {

            return false;

        }
    } )(),
    workers: !! window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    getWebGLErrorMessage: function () {

        var element = document.createElement( 'div' );
        element.id = 'webgl-error-message';

        if ( ! this.webgl ) {
            element.innerHTML = window.WebGLRenderingContext ? [
                '<i style="font-size: 48px" class="icondyl" style="color: #fff">&#xe60b;</i><br />Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#f00">WebGL</a>.<br />',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#f00">here</a>.<br /><br />',
                '您的显卡不支持 <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#f00">WebGL</a>.<br />',
                '如何解决请 <a href="http://get.webgl.org/" style="color:#f00">查看</a>.'
            ].join( '\n' ) : [
                '<i style="font-size: 48px" class="icondyl" style="color: #fff">&#xe60b;</i><br />Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#f00">WebGL</a>.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#f00">here</a>.<br /><br />',
                '您的浏览器不支持 <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#f00">3D渲染</a>.<br />',
                '请升级您的浏览器至 Chrome谷歌浏览器、360极速、火狐、Safari等其他浏览器.'
            ].join( '\n' );
        }

        return element;

    },

    addGetWebGLMessage: function ( parameters ) {

        var parent, id, element;

        parameters = parameters || {};

        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';

        element = Detector.getWebGLErrorMessage();
        element.id = id;

        parent.appendChild( element );

    }

};


var Thingiview = function (w, h, showStatus, distanceP, printer) {
    this.width = w ? w : window.innerWidth;
    this.height = h ? h : window.innerHeight;
    this.models = [];
    this.fogColor = 0xcacaca;
    this.scale = 1;
    this.scaleMax = 1;
    this.scaleMin = 1;
    this.scaleFirst = 1;
    this.mainModel = null;
    this.showStatus = showStatus;
    this.distanceP = distanceP ? distanceP : 2;

    this.size = 150;
    this.maxSize = 150;//x
    this.modelWidth = 0;//x
    this.modelHeight = 0;//y
    this.modelDeep = 0;//z
    this.init();

    this.loader = new THREE.STLLoader();
    this.printer = printer;

    this.animate();

    this.cube;
    this.boxHelper;
    this.ground;
    this.plane;
    this.skybox;
}

Thingiview.prototype.loadModel = function (modelUrl, loadModelSuccess) {
    if (this.loader == null) {
        this.loader = new THREE.STLLoader();
    }
    var parent = this;
    $('#progress_loading_container').show();
    $('#progress_loading').css("width", "0%");
    this.loader.load(modelUrl, function (geometry, materials) {
        parent.addModel(geometry);
        parent.showStatus("模型加载成功");
        $('#progress_loading_container').hide();
        if(loadModelSuccess && typeof(loadModelSuccess)=='function'){
            loadModelSuccess(parent);
        }
    }, function (event) {
        var message = "已加载 ";

        if (event.total) {
            var per = (100 * event.loaded / event.total).toFixed(0) + "%";
            message += per;
            $('#progress_loading').css("width", per);
        } else {
            message += (event.loaded / 1000).toFixed(2) + " KB";
            $('#progress_loading').css("width", "100%");
        }
        parent.showStatus(message);
    });
}

Thingiview.prototype.animate = function () {
    var parent = this;

//    setTimeout(function () {
//        parent.animate();
//    }, 1000 / 60);
    requestAnimationFrame(function () {
        parent.animate();
    });
    this.render();
}

Thingiview.prototype.init = function () {
    if ( ! Detector.webgl ) {
        Detector.addGetWebGLMessage({ parent: document.getElementById('container') } );
        return;
    }

    var material;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(this.fogColor, 0.0007);
    //this.scene.fognew THREE.Fog( 0xffffff, 1000, 10000 );

    // set up DOM
    //this.container = document.createElement( 'div' );
    this.container = document.getElementById('container');
    //this.container.style.width = this.width + "px";
    //this.container.style.height = this.height + "px";
    //this.container.style.backgroundColor = "#"+this.fogColor.toString(16);
    //document.body.appendChild( this.container );
    //this.renderer = new THREE.CanvasRenderer();
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize(this.width, this.height);
    //this.renderer.setPixelRatio( window.devicePixelRatio );
    //this.renderer.autoClear = false;
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapCullFace = THREE.CullFaceBack;
    this.container.appendChild(this.renderer.domElement);



    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 10, 100000);
    this.camera.position.x = 0;
    this.camera.position.y = -150;
    this.camera.position.z = 100;


    this.camera.up = new THREE.Vector3(0, 0, 1);
    this.controls = new THREE.NormalControls(this.camera, this.container);


    this.reflectCamera = new THREE.CubeCamera(0.1, 5000, 512);
    this.scene.add(this.reflectCamera);

    // Skybox
    material = new THREE.MeshPhongMaterial({color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading, side: THREE.BackSide, visible:false});
    this.skybox = new THREE.Mesh(new THREE.BoxGeometry(this.size, this.size, this.size), material);
    this.skybox.name = 'skybox';
    this.scene.add( this.skybox );
    //this.skybox.position.z = this.size / 2;
    // 网格底板1
    material = new THREE.MeshPhongMaterial({color: 0x888888, wireframe: false, envMap: this.reflectCamera.renderTarget,side: THREE.DoubleSide});
    var x = this.size;
    var y = this.size;
    var division_x = Math.floor(x / 10);
    var division_y = Math.floor(y / 10);
    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(x, y, division_x, division_y), material);
    this.plane.name = 'plane';
    this.plane.receiveShadow = true;
    //this.scene.add(this.plane);


    // 背景LOGO
//    var texture = THREE.ImageUtils.loadTexture('../../images/iceman3d.png');
//    texture.anisotropy = this.renderer.getMaxAnisotropy();
//    material = new THREE.MeshBasicMaterial({map: texture, fog: false, side: THREE.DoubleSide});
//
//    var wirePlane = new THREE.Mesh(new THREE.PlaneGeometry(x, y, division_x, division_y), material);
//    wirePlane.name = 'planewire';
//    wirePlane.receiveShadow = false;
//    wirePlane.rotation.x = Math.PI / 2;
//    wirePlane.position.z = this.size / 2;
//    wirePlane.position.y = this.size / 2;
//    wirePlane.receiveShadow = false;
//    this.scene.add(wirePlane);

    // 右侧网格
//    material = new THREE.MeshPhongMaterial({emissive: 0xffffff, color: 0xffffff, wireframe: true, side:THREE.BackSide, opacity:0.1});
//    wirePlane = new THREE.Mesh(new THREE.PlaneGeometry(x, y, division_x, division_y), material);
//    wirePlane.name = 'planewire';
//    wirePlane.rotation.y = Math.PI / 2;
//    wirePlane.position.x = this.size / 2;
//    wirePlane.position.z = this.size / 2;
//    wirePlane.receiveShadow = false;
//    this.scene.add(wirePlane);

    // 左侧网格
//    wirePlane = new THREE.Mesh(new THREE.PlaneGeometry(x, y, division_x, division_y), material);
//    wirePlane.name = 'planewire';
//    wirePlane.rotation.y = Math.PI / 2;
//    wirePlane.position.x = -this.size / 2;
//    wirePlane.position.z = this.size / 2;
//    wirePlane.receiveShadow = false;
//    this.scene.add(wirePlane);

    // 顶部网格
//    var wirePlane = new THREE.Mesh(new THREE.PlaneGeometry(x, y, division_x, division_y), material);
//    wirePlane.name = 'planewire';
//    wirePlane.position.z = this.size + this.plane.position.z ;
//    wirePlane.receiveShadow = false;
//    this.scene.add(wirePlane);
    var _host=window.location.host;
    var texture=null;
    if(_host.indexOf("dayin.la") > 0 ){
        texture = THREE.ImageUtils.loadTexture('../../images/dayinlaboard.png');

    }
    var geometry = new THREE.BoxGeometry(this.size, this.size, 3);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture,
        //shininess: 0,
        //specular: 0xffffff,
        shading: THREE.SmoothShading
    });

    this.ground = new THREE.Mesh(geometry, material);
    this.ground.castShadow = false;
    this.ground.receiveShadow = true;
    //this.ground.rotation.x = Math.PI / 2;
    this.ground.position.z = -2;
    //this.ground.position.y = 0;
    this.scene.add(this.ground);



//    var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
//    var material = new THREE.MeshBasicMaterial({
//        opacity: 0.1,
//        transparent: true
//    });
//    this.cube = new THREE.Mesh(geometry, material);
    //this.cube.position.z = this.size / 2;
    //this.scene.add(this.cube);
    //this.boxHelper = new THREE.BoxHelper(this.cube);
    //this.scene.add(this.boxHelper);

    this.initLights();
    this.centerCamera();
    var parent = this;
    window.addEventListener( 'resize', function() { parent.windowResize(parent); }, false );

}

Thingiview.prototype.windowResize = function (obj) {
    //var containter = document.getElementById ('container');
    //containter.style.width = window.innerWidth + 'px';
    //containter.style.height = window.innerHeight + 'px';
    obj.camera.aspect = this.width / this.height;
    obj.camera.updateProjectionMatrix();
    obj.renderer.setSize(this.width, this.height);
}


Thingiview.prototype.resize = function (width, height)
{
    this.width = width;
    this.height = height;
    this.container.style.width = this.width + "px";
    this.container.style.height = this.height + "px";
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
}

Thingiview.prototype.initLights = function ()
{
    //this.scene.add( new THREE.AmbientLight( 0x777777 ) );
//    var ambientColor = new THREE.Color ();
//    var diffuseColor = new THREE.Color ();
//    ambientColor.setHex('0xffcc33'); //0x0066CC ��ɫ 0xffcc33 ��ɫ 0x008ab8 ����  0x279b61 ��ɫ 0xcc3333 ��ɫ 0xcc6699 ��ɫ 0xa3e496 ���� 0x95cae4
//    diffuseColor.setHex('0xffcc33');
//    
//    this.ambientLight = new THREE.AmbientLight(ambientColor.getHex());
//    if (!this.ambientLight) {
//        return false;
//    }
//
//    this.scene.add(this.ambientLight);
//
//    this.directionalLight = new THREE.DirectionalLight(diffuseColor.getHex());
//    if (!this.directionalLight) {
//        return false;
//    }
//
//    //var lightPosition = new THREE.Vector3().subVectors(this.cameraMove.eye, this.cameraMove.center);
//    this.directionalLight.position.set(6, -5.5, 4);
//
//    this.scene.add(this.directionalLight);
//    return true;

    this.spotLight = new THREE.SpotLight(0xffffff, .3, 0);
    this.spotLight.position.set(-700, 1000, 1000);
    this.spotLight.castShadow = false;
    this.scene.add(this.spotLight);

    this.pointLights = [];

    var pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
    pointLight.position.set(-700, 1000, 100);
    this.scene.add(pointLight);
    this.pointLights.push(pointLight);

    pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
    pointLight.position.set(200, -1000, 0);
    this.scene.add(pointLight);
    this.pointLights.push(pointLight);

    pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
    pointLight.position.set(0, 0, -10000);
    this.scene.add(pointLight);
    this.pointLights.push(pointLight);

    pointLight = new THREE.PointLight(0xffffff, 0.6, 0);
    pointLight.position.set(0, 0, 10000);
    this.scene.add(pointLight);
    this.pointLights.push(pointLight);

}

Thingiview.prototype.topCamera = function () {
    this.camera.position.z = 300;
    this.camera.position.y = 0;
    this.camera.position.x = 0;
    this.camera.up = new THREE.Vector3(0, 1, 0);

    this.centerCamera();

}
Thingiview.prototype.sideCamera = function () {
    this.camera.position.x = 300;
    this.camera.position.y = 0;
    this.camera.position.z = 75;
    this.camera.up = new THREE.Vector3(0, 0, 1);

    this.centerCamera();
}
Thingiview.prototype.frontCamera = function () {
    this.camera.position.x = 0;
    this.camera.position.y = -300;
    this.camera.position.z = 75;
    this.camera.up = new THREE.Vector3(0, 0, 1);

    this.centerCamera();
}
Thingiview.prototype.resetCamera = function () {
    this.camera.position.x = 0;
    this.camera.position.y = -300;
    this.camera.position.z = 75;
    this.camera.up = new THREE.Vector3(0, 0, 1);

    this.centerCamera();
}


Thingiview.prototype.centerCamera = function () {
    var sceneCenter = undefined;
    var sceneObjects = 0;
    var sceneBox = new THREE.Box3();
    this.scene.traverse(function (object) {
        if (object instanceof THREE.Mesh)
        {
            //if (object.name == "skybox" || object.name == "plane" || object.name == "planewire")
            //    return;
            if (object.name != "skybox") {
                return;
            }
            sceneObjects += 1;

            // center based on the objects' bounding boxes
            object.geometry.computeBoundingBox();
            // convert to world coords
            object.geometry.boundingBox.min.applyMatrix4(object.matrixWorld);
            object.geometry.boundingBox.max.applyMatrix4(object.matrixWorld);
            // matrixWorld is not what it says that it is?  Anyways, it was missing these transforms
            object.geometry.boundingBox.min.x += object.position.x;
            object.geometry.boundingBox.min.y += object.position.y;
            object.geometry.boundingBox.min.z += object.position.z;
            object.geometry.boundingBox.max.x += object.position.x;
            object.geometry.boundingBox.max.y += object.position.y;
            object.geometry.boundingBox.max.z += object.position.z;

            var objectCenter = object.geometry.boundingBox.center();
            objectCenter.z /= 2;
            console.log(objectCenter.x,objectCenter.y,objectCenter.z);
            // update scene bounding box
            sceneBox.min.x = Math.min(sceneBox.min.x, object.geometry.boundingBox.min.x);
            sceneBox.min.y = Math.min(sceneBox.min.y, object.geometry.boundingBox.min.y);
            sceneBox.min.z = Math.min(sceneBox.min.z, object.geometry.boundingBox.min.z);
            sceneBox.max.x = Math.max(sceneBox.max.x, object.geometry.boundingBox.max.x);
            sceneBox.max.y = Math.max(sceneBox.max.y, object.geometry.boundingBox.max.y);
            sceneBox.max.z = Math.max(sceneBox.max.z, object.geometry.boundingBox.max.z);
            // New center in world space
            if (sceneCenter === undefined)
                newCenter = objectCenter.clone();
            else
            {
                var newCenter = new THREE.Vector3();
                newCenter.subVectors(objectCenter, sceneCenter);
                newCenter.divideScalar(sceneObjects + 1);
                newCenter.add(sceneCenter);
            }
            sceneCenter = newCenter;
        }
    });
    this.controls.desiredCameraTarget = sceneCenter;
    // TODO the scale and translate terms don't play well together, hacking it due to other people's votes
    this.controls.desiredCameraTarget.x = this.controls.desiredCameraTarget.y = 0;
    // calculate desired camera zoom based on vertical fov
    var distanceX = (sceneBox.max.x - sceneBox.min.x) / 2 / Math.tan(this.controls.camera.fov * this.controls.camera.aspect * Math.PI / 360);
    var distanceY = (sceneBox.max.y - sceneBox.min.y) / 2 / Math.tan(this.controls.camera.fov * this.controls.camera.aspect * Math.PI / 360);
    var distanceZ = (sceneBox.max.z - sceneBox.min.z) / 2 / Math.tan(this.controls.camera.fov * Math.PI / 360);
    var distance = Math.max(Math.max(distanceX, distanceY), distanceZ);
    // scale outwards a factor
    distance *= this.distanceP * this.scale;
    var cameraPosition = this.controls.target.clone().sub(this.camera.position).normalize().multiplyScalar(distance);
    this.controls.desiredCameraPosition = sceneCenter.clone().sub(cameraPosition);
    // constrain max zoom to some factor of our default
    this.controls.maxDistance = distance * 10;
}

Thingiview.prototype.zoomCamera = function (b) {
    if (b) {
        this.controls.zoom(120*0.001);
    } else {
        this.controls.zoom(120*-0.001);
    }
}

Thingiview.prototype.reCalSize = function (printerDepth, printerWidth, printerHeight) {

    //机器最小值
    var minS = Math.min(printerDepth, printerWidth, printerHeight);

    var oldMaxSize = this.maxSize;
    this.maxSize = minS;

    if (minS != oldMaxSize) {
        var ofs = 1.0*minS/this.size;
        //this.cube.scale.x = this.cube.scale.y = this.cube.scale.z = ofs;
        //this.cube.position.z = minS / 2;
        //this.boxHelper.scale.x = this.boxHelper.scale.y = this.boxHelper.scale.z = ofs;
        this.ground.scale.x = this.ground.scale.y = ofs;
        this.plane.scale.x = this.plane.scale.y = ofs;
        this.skybox.scale.x = this.skybox.scale.y = this.skybox.scale.z = ofs;
    }

    if (!this.mainModel) {//还未加载模型
        return;
    }

    if (minS != oldMaxSize) {//如果连接的机器与当前容器大小一匹配，则重新缩放
        var geometry = this.mainModel.geometry;
        geometry.computeBoundingBox();

        var dims = geometry.boundingBox.max.clone().sub(geometry.boundingBox.min);
        var maxDim = Math.max(Math.max(dims.x, dims.y), dims.z);
        this.scale = this.scaleFirst = this.scaleMax = this.maxSize / maxDim;
        this.scaleMin = Math.min(20 / maxDim, 1);

        this.scale = this.scaleFirst = Math.min(this.scale, 1);
        this.modelWidth = dims.x * this.scale;
        this.modelHeight = dims.y * this.scale;
        this.modelDeep = dims.z * this.scale;

        this.mainModel.position.set( 0, 0, geometry.boundingBox.max.z*this.scale );

        this.mainModel.scale.x = this.mainModel.scale.y = this.mainModel.scale.z = this.scale;

        $('#modelWidth').val(this.modelWidth.toFixed(2));
        $('#modelHeight').val(this.modelHeight.toFixed(2));
        $('#modelDeep').val(this.modelDeep.toFixed(2));
        $('#modelScale').val((this.scale * 100).toFixed(2));

        var rangeInput = $('#modelZoom_range');
        rangeInput.attr('min', this.scaleMin);
        rangeInput.attr('max', this.scaleMax);
        rangeInput.attr('step', (this.scaleMax - this.scaleMin)/100);
        rangeInput.attr('disabled', false);
        rangeInput.val(this.scale);

    }
}

Thingiview.prototype.addMesh = function (mesh) {
    for (var i = 0; i < this.models.length; i++) {
        this.scene.remove(this.models[i]);
        this.models.pop();
    }
    var geometry = mesh.geometry;
    geometry.computeBoundingBox();

    var dims = mesh.geometry.boundingBox.max.clone().sub(mesh.geometry.boundingBox.min);
    maxDim = Math.max(Math.max(dims.x, dims.y), dims.z);
    this.scale = this.scaleFirst = this.scaleMax = this.size / maxDim;
    this.scaleMin = Math.min(20 / maxDim, 1);

    this.scale = this.scaleFirst = Math.min(this.scale, 1);

    mesh.position.set( 0, 0, geometry.boundingBox.max.z*this.scale );


    $('#model-size-x').text((this.scale * Math.abs(mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x)).toFixed(2));
    $('#model-size-y').text((this.scale * Math.abs(mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y)).toFixed(2));
    $('#model-size-z').text((this.scale * Math.abs(mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z)).toFixed(2));
    $('#model-size-s').text((this.scale * 100).toFixed(0));

    this.scene.add(mesh);
    this.models.push(mesh);

    this.mainModel = mesh;





    for (var i = 0; i < this.models.length; i++)
        this.models[i].scale.x = this.models[i].scale.y = this.models[i].scale.z = this.scale;
}

Thingiview.prototype.addModel = function (geometry) {
    for (var i = 0; i < this.models.length; i++) {
        this.scene.remove(this.models[i]);
        this.models.pop();
    }
    var obj, i;
    var material = new THREE.MeshPhongMaterial({color: 0xfca837, specular: 0xfca837, shading: THREE.SmoothShading, shininess: 30, fog: false, side: THREE.DoubleSide});

    if ( geometry instanceof THREE.Geometry )
        geometry = new THREE.BufferGeometry().fromGeometry( geometry );

    var mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    //mesh.rotation.x = 1;
    //mesh.updateMatrix();
    mesh.geometry.computeBoundingBox();

    var positions = geometry.attributes.position.array;
    var ttt=geometry.boundingBox.max.clone().add(geometry.boundingBox.min).multiplyScalar(0.5)
    for(var i=0;i<positions.length;i+=3){
        positions[i]-=ttt.x;
        positions[i+1]-=ttt.y;
        positions[i+2]-=ttt.z;
        //minZ = Math.min(positions[i+2],minZ);
    }
    geometry.computeBoundingBox();

    var dims = mesh.geometry.boundingBox.max.clone().sub(mesh.geometry.boundingBox.min);
    maxDim = Math.max(Math.max(dims.x, dims.y), dims.z);
    //console.log(mesh.geometry.boundingBox);
    this.scale = this.scaleFirst = this.scaleMax = this.size / maxDim;
    this.scaleMin = Math.min(10 / maxDim, 1);

    this.scale = this.scaleFirst = Math.min(this.scale, 1);
    this.modelWidth = dims.x * this.scale;
    this.modelHeight = dims.y * this.scale;
    this.modelDeep = dims.z * this.scale;

    if (this.scale != 1) {
        this.printer.showDialog("原始模型大小为："+dims.x.toFixed(2)+" x "+dims.y.toFixed(2)+" x "+dims.z.toFixed(2)+
            "<br>已被自动缩放为：" + this.modelWidth.toFixed(2)+" x "+this.modelHeight.toFixed(2)+" x "+this.modelDeep.toFixed(2));
    }


    geometry.computeVertexNormals();
    mesh.position.set( 0, 0, geometry.boundingBox.max.z*this.scale );

    //mesh.rotation.z = Math.PI;

    // center object
    //mesh.position.x = -(mesh.geometry.boundingBox.min.x + mesh.geometry.boundingBox.max.x) / 2 * this.scale;
    //mesh.position.y = -(mesh.geometry.boundingBox.min.y + mesh.geometry.boundingBox.max.y) / 2 * this.scale;
    //mesh.position.z = -mesh.geometry.boundingBox.min.z * this.scale;

    this.scene.add(mesh);
    this.models.push(mesh);

    this.mainModel = mesh;


    /*
     this.control2 = new THREE.TransformControls( this.camera, this.renderer.domElement  );
     this.control2.addEventListener( 'change', this.render );
     this.control2.attach( mesh );
     this.control2.name = "control2";
     this.scene.add( this.control2 );
     */

    //console.log(this.mainModel.matrix.elements);
    //console.log(this.mainModel.matrixWorld.elements);

    // scale everything to this new object
    for (var i = 0; i < this.models.length; i++)
        this.models[i].scale.x = this.models[i].scale.y = this.models[i].scale.z = this.scale;
    /*
     this.wirePlane.scale.x = this.wirePlane.scale.y = this.wirePlane.scale.z = this.scale;
     this.plane.scale.x = this.plane.scale.y = this.plane.scale.z = this.scale;
     this.skybox.scale.x = this.skybox.scale.y = this.skybox.scale.z = this.scale;
     */
    this.centerCamera();
}

Thingiview.prototype.zoom = function (value, isPercent, xyz) {
    var mesh = this.mainModel;
    mesh.geometry.computeBoundingBox();
    //console.log(this.scale);
    //console.log(this.scaleFirst);
    /*
     if (value > 100) {
     this.scale = Math.min(this.scaleMax, this.scaleFirst * value / 100);
     } else if (value < 100) {
     this.scale = Math.max(this.scaleMin, this.scaleFirst * value / 100);
     } else {
     this.scale = this.scaleFirst;
     }
     */
    this.scale = isPercent ? this.scale*value : value;


    if (xyz == 'x' || xyz == 'X') {
        mesh.scale.x = this.scale;
    } else if (xyz == 'y' || xyz == 'Y') {
        mesh.scale.y = this.scale;
    } else if (xyz == 'z' || xyz == 'Z') {
        mesh.scale.z = this.scale;
    } else {
        this.scale = Math.min(this.scaleMax, this.scale);
        this.scale = Math.max(this.scaleMin, this.scale);
        mesh.scale.x = mesh.scale.y = mesh.scale.z = this.scale;
    }

    // center object
    //mesh.position.x = -(mesh.geometry.boundingBox.min.x + mesh.geometry.boundingBox.max.x) / 2 * this.scale;
    //mesh.position.y = -(mesh.geometry.boundingBox.min.y + mesh.geometry.boundingBox.max.y) / 2 * this.scale;
    //mesh.position.z = -mesh.geometry.boundingBox.min.z * this.scale;


    var dims = mesh.geometry.boundingBox.max.clone().sub(mesh.geometry.boundingBox.min);
    this.modelWidth = dims.x * this.scale;
    this.modelHeight = dims.y * this.scale;
    this.modelDeep = dims.z * this.scale;

    //mesh.geometry.computeBoundingBox();
    //this.render();
    //console.log(this.mainModel.matrix.elements);
    //console.log(this.mainModel.matrixWorld.elements);

    //this.centerCamera();

    this.render();

    this.snapToFloor();
}

Thingiview.prototype.zoomBig = function () {
    this.zoom(1.1, true);
}
Thingiview.prototype.zoomSmall = function () {
    this.zoom(0.9, true);
}
Thingiview.prototype.zoomMax = function () {
    this.zoom(this.scaleMax);
}
Thingiview.prototype.zoomReset = function () {
    this.zoom(this.scaleFirst);
}


Thingiview.prototype.rotation = function (xyz, b, isN) {
    var mesh = this.mainModel;
    isN = isN || 90;
    var deg = 1.0 * isN / 180 * Math.PI;

    if (xyz == 'X' || xyz == 'x') {
        if (b) {
            mesh.rotation.x += deg;
        } else {
            mesh.rotation.x -= deg;
        }
    } else if (xyz == 'Y' || xyz == 'y') {
        if (b) {
            mesh.rotation.y += deg;
        } else {
            mesh.rotation.y -= deg;
        }
    } else if (xyz == 'Z' || xyz == 'z') {
        if (b) {
            mesh.rotation.z += deg;
        } else {
            mesh.rotation.z -= deg;
        }
    } else {
        mesh.rotation.x = 0;
        mesh.rotation.y = 0;
        mesh.rotation.z = 0;
    }
    this.render();

    this.snapToFloor();
}

Thingiview.prototype.snapToFloor = function(){
    var object = this.mainModel;
    var geometry = object.geometry;

    //geometry.computeBoundingBox();

    var positions;
    var point;
    var minZ = 1000;
    var maxZ = 0;

    if ( geometry instanceof THREE.BufferGeometry ) {
        //console.log("geometry", "THREE.BufferGeometry");
        //console.log("geometry", geometry.attributes.position.array);
        positions = geometry.attributes.position.array;
        //var minZ = 1000;
        //var point;
        //console.log("positions.length", positions.length);
        for(var i=0;i<positions.length;i+=3){
            point = new THREE.Vector3( positions[i], positions[i+1], positions[i+2] );
            point.applyMatrix4( object.matrix );
            minZ = Math.min(minZ, point.z);
            maxZ = Math.max(maxZ, point.z);
        }

    }else if ( geometry instanceof THREE.Geometry ) {
        //console.log("geometry", "THREE.Geometry");
        //console.log(geometry.vertices.length);
        //console.log(geometry.faces.length);
        positions = geometry.vertices;
        //console.log(positions.length);
        for(var i=0;i<positions.length;i++){
            point = new THREE.Vector3( positions[i].x, positions[i].y, positions[i].z );
            point.applyMatrix4( object.matrix );
            minZ = Math.min(minZ, point.z);
        }
    }else{
        minZ = 0;
    }
    //console.log("minZ", minZ);
    //console.log(object.position.z);
    var mat = object.matrix.elements;
    //var mat = object.matrixWorld.elements;
    //console.log(mat[0]+","+mat[4]+","+mat[8]+","+mat[1]+","+mat[5]+","+mat[9]+","+mat[2]+","+mat[6]+","+mat[10]);
    //console.log(mat)
    //console.log(object.position.z-minZ,object.position.z,minZ,maxZ-minZ,maxZ)
    object.position.set( 0, 0, object.position.z-minZ );
}

Thingiview.prototype.move = function (xyz, b) {
    var mesh = this.mainModel;

    if (xyz == 'X') {
        if (b) {
            if (mesh.position.x >= this.size/2 - mesh.geometry.boundingBox.max.x*this.scale) {
                return;
            }
            mesh.position.x += 1;
        } else {
            if (mesh.position.x <= -(this.size/2 + mesh.geometry.boundingBox.min.x*this.scale)) {
                return;
            }
            mesh.position.x -= 1;
        }
    } else if (xyz == 'Y') {
        if (b) {
            if (mesh.position.y >= this.size/2 - mesh.geometry.boundingBox.max.y*this.scale) {
                return;
            }
            mesh.position.y += 1;
        } else {
            if (mesh.position.y <= -(this.size/2 + mesh.geometry.boundingBox.min.y*this.scale)) {
                return;
            }
            mesh.position.y -= 1;
        }
    } else if (xyz == 'Z') {
        if (b) {
            if (mesh.position.z >= this.size - (mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z)*this.scale) {
                return;
            }
            mesh.position.z += 1;
        } else {
            if (mesh.position.z <= 0) {
                return;
            }
            mesh.position.z -= 1;
        }
    }
}

Thingiview.prototype.render = function () {
    // update clock
    var now = Date.now();
    if (this.lastRenderTime == undefined)
        this.timeElapsed = 0;
    else
        this.timeElapsed = now - this.lastRenderTime;
    this.lastRenderTime = now;

    this.controls.dirty = false;
    this.controls.update(this.timeElapsed);

    /*
     this.reflectCamera.position.z = -this.camera.position.z;
     this.reflectCamera.position.y = this.camera.position.y;
     this.reflectCamera.position.x = this.camera.position.x;
     // turn off the wire plane visibility for reflection rendering
     this.scene.traverse( function (object) {
     if ( object.name=="plane" || object.name=="planewire" )
     object.visible = true;
     if ( object.name=="skybox" )
     object.visible = true;
     });
     // render the reflection texture
     this.reflectCamera.updateCubeMap( this.renderer, this.scene );

     // turn back on the plane visibility
     this.scene.traverse( function (object) {
     if ( object.name=="plane" || object.name=="planewire" )
     object.visible = true;
     if ( object.name=="skybox" )
     object.visible = true;
     });
     */
    this.renderer.render(this.scene, this.camera);

    //console.log(this.camera.position.x,this.camera.position.y,this.camera.position.z);
}

Thingiview.prototype.StlBinaryData = function () {
    var vector = new THREE.Vector3();
    var normalMatrixWorld = new THREE.Matrix3();
    var triangles = 0;
    var geometry = this.mainModel.geometry;
    if ( geometry instanceof THREE.BufferGeometry )
        geometry = new THREE.Geometry().fromBufferGeometry( geometry );

    triangles += geometry.faces.length;

    var offset = 80; // skip header
    var bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
    var arrayBuffer = new ArrayBuffer(bufferLength);
    var output = new DataView(arrayBuffer);
    output.setUint32(offset, triangles, true);
    offset += 4;



    var matrixWorld = this.mainModel.matrixWorld;

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

    return output;
}


