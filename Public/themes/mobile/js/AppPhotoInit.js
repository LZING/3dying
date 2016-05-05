var LITHO = {
    REVISION: "7"
};
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
"object" == typeof module && (module.exports = LITHO),
LITHO.Lithophane = function() {
    this.scene3d = new LITHO.Scene3D,
    this.outputCanvas = document.createElement("canvas"),
    this.progressBox = document.getElementById("progressBox"),
    this.progressBar = document.getElementById("progressBar"),
    this.progressState = document.getElementById("progressState"),
    this.threeDCanvas = document.getElementById("container"),
    this.fileUpload = document.getElementsByClassName("fileUpload"),
    this.onlineSaveAndPrint = document.getElementById("JsPrint")
},
LITHO.Lithophane.prototype = {
    constructor: LITHO.Lithophane,
    supported: {
        draganddrop: "draggable" in document.createElement("span"),
        filereader: "undefined" != typeof FileReader
    },
    acceptedTypes : {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true,
        'image/bmp': true
    },
    maxOutputDimensionInMM: 100, //尺寸
    actualThicknessInMM: 5, //厚度
    borderThicknessInMM: 0, //边框厚度
    minThicknessInMM: 0.8, //底板厚度
    vertexPixelRatio: 3, //分辨率
    baseDepth: 0, //支架宽度
    curve: 0, //弯曲度
    reFlip: 1,
    borderPixels: 0,
    maxOutputWidth: 0,
    maxOutputDepth: 0,
    maxOutputHeight: 0,
    HeightInMM: 0,
    WidthInMM: 0,
    ThickInMM: 0,
    zScale: 0,
    stlData: null,
    initPage:function () {
        this.setupDragNDrop();
        this.updateValues(undefined);
        this.scene3d.init3D(this.threeDCanvas,this.vertexPixelRatio,true);
    },
    getValue:function (inputRange, defaultVal) {
        var element = document.getElementById(inputRange.name);
        var rawVal=element.value;
        if (rawVal==="") {
            rawVal=inputRange.startval;
            element.value=rawVal;
        }
        var value = parseFloat(rawVal);
        if ((value >= inputRange.lower) && (value <= inputRange.upper)) {
            //element.className = ''; //去掉改变css triston.xu
            return value;
        }
        //element.className = 'outRange'; // mark if out of range   //去掉改变css triston.xu
        return defaultVal; // and use the passed default value instead
    },
    updateValues: function() {
//        this.maxOutputDimensionInMM = this.getValue(LITHO_InputRanges.maximumSize, this.maxOutputDimensionInMM), //尺寸
//        this.actualThicknessInMM = this.getValue(LITHO_InputRanges.thickness, this.actualThicknessInMM),
//        this.borderThicknessInMM = this.getValue(LITHO_InputRanges.borderThick, this.borderThicknessInMM),
//        this.minThicknessInMM = this.getValue(LITHO_InputRanges.minLayer, this.minThicknessInMM),
//        this.vertexPixelRatio = this.getValue(LITHO_InputRanges.vectorsPerPixel, this.vertexPixelRatio),
//        this.baseDepth = this.getValue(LITHO_InputRanges.baseDepth, this.baseDepth),
//        this.curve = this.getValue(LITHO_InputRanges.curve, this.curve),
        //this.reFlip = document.getElementById(LITHO_InputRanges.reFlip.name).checked,
        this.borderPixels = this.vertexPixelRatio * this.borderThicknessInMM,
        this.maxOutputWidth = this.maxOutputDimensionInMM - 2 * this.borderThicknessInMM,
        this.maxOutputDepth = this.maxOutputDimensionInMM - 2 * this.borderThicknessInMM,
        this.maxOutputHeight = this.actualThicknessInMM - this.minThicknessInMM,
        this.HeightInMM = this.maxOutputDimensionInMM,
        this.WidthInMM = this.maxOutputDimensionInMM,
        this.ThickInMM = this.actualThicknessInMM,
        this.zScale = this.maxOutputHeight / 255
    },
    setupDragNDrop: function() {
        var e = this;
        for (var i=0;i<this.fileUpload.length;i++){
            this.fileUpload[i].onchange = function(t) {
        	for (var n = t.target.files,
                    a = 0; a < n.length; a++) e.previewFile(n[a])
            };
        }
        this.previewFile(),
        this.onlineSaveAndPrint.onclick = function(t) {
        	if (e.stlData == null) {
        		alert("错误");
        		return;
        	}
        	//查看图片
        	//window.open(e.scene3d.renderer.domElement.toDataURL('image/png'), 'mywindow');
        	//return;
        	//e.onlineSaveAndPrint.style.visibility = "hidden";
        	var fd = new FormData();
            var fileName = "立体照片";
            fd.append('name', fileName);
            var arr = e.scene3d.renderer.domElement.toDataURL('image/png').split(',');
            var byteString = atob(arr[1]); // decodeURI(arr[1])
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
            }
            fd.append('image', new Blob([ia], { type: 'image/png' }) , fileName+".png");
            fd.append('stl',new Blob( [ e.stlData ], { type: 'text/plain' } ), fileName+".stl");
            var xhr = new XMLHttpRequest();
            
            xhr.open('POST',$(this).data('url'),true); // 异步传输
            xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
            xhr.upload.onprogress = function (ev) {
                    var percent = 0;
                    //if(ev.lengthComputable) {
                            percent = 100 * ev.loaded/ev.total;
                            console.log(percent + '%');
                            e.setProgress(percent, "正在上传("+ percent.toFixed(2) +"%)");
                    //}
            }
            xhr.upload.onloadend = function (ev) {
                    console.log("onloadend=>");
                    e.setProgress(0, "");
            };
            xhr.onload = function(ev) {
            	if (this.status == 200 && !isNaN(this.responseText)) {
            		window.open("http://www.dayin.la/apps/print.html#" + this.responseText);
                } else {
                	alert(this.responseText);
                }
              };
            xhr.upload.onerror = function(status, statusText){
                    console.log(status,statusText);
            };
            xhr.send(fd);	
        }
    },
    /*******************************************************************************
 * 
 *  private setProgress     Update the progress bar and status indicator
 * @param {Number} level - 0-100
 * @param {String} state - "loading..." see createHeightMesh() for examples
 * @returns {undefined}
 */
    setProgress:function (level, state) {
        this.progressBox.style.display = level === 0 ? "none" : "block";
        this.progressBar.value = level;
        this.progressState.innerHTML = state;
    },
    previewFile: function(e) {
        function t(e) {
            var t = e.target;
            t.naturalWidth > t.naturalHeight ? (n.xyScale = n.maxOutputWidth / t.naturalWidth * n.vertexPixelRatio, n.WidthInMM = n.maxOutputDimensionInMM, n.HeightInMM = n.maxOutputDimensionInMM / (t.naturalWidth / t.naturalHeight)) : (n.xyScale = n.maxOutputDepth / t.naturalHeight * n.vertexPixelRatio, n.HeightInMM = n.maxOutputDimensionInMM, n.WidthInMM = n.maxOutputDimensionInMM * (t.naturalWidth / t.naturalHeight)),
            t.edgeThickness = 0 === n.borderPixels ? 1 : n.borderPixels,
            n.outputCanvas.width = Math.ceil(t.naturalWidth * n.xyScale + 2 * t.edgeThickness),
            n.outputCanvas.height = Math.ceil(t.naturalHeight * n.xyScale + 2 * t.edgeThickness),
            n.createHeightMesh(t)
        }
        var n = this;
        //n.onlineSaveAndPrint.style.visibility = "hidden";
        //if (void 0 === e) return this.logoImage.onclick = t,
        //void(this.logoImage.filename = "NestedCube_Logo");
        if (void 0 === e) return;
        if (this.supported.filereader === !0 && this.acceptedTypes[e.type] === !0) {
            var a = new FileReader;
            a.onprogress = function(e) {
                var t = e.loaded / e.total * 100;
                n.setProgress(t, LITHO_StatusMessages.loading)
            },
            a.onload = function(a) {
                var i = new Image;
                i.id = 'renderImage',
                i.src = a.target.result,
                i.onclick = t,
                i.filename = e.name,
                i.naturalWidth > i.naturalHeight ? i.width = 250 : i.height = 250,
                $('#prevImage').empty(),
                $('#prevImage').append(i),
                n.setProgress(0, "");
                setTimeout(function() {$(i).trigger('click');}, 200);
                
            },
            a.readAsDataURL(e);
        };
    },
    createHeightMesh: function(e) {
        function t() {
            var t = new LITHO.ImageMap;
            l = t.processImage(m.outputCanvas, e, m.minThicknessInMM, m.zScale, v),
            t = void 0,
            m.setProgress(20, LITHO_StatusMessages.vProcessing),
            setTimeout(n, 1)
        }
        function n() {
            p = new LITHO.LithoBox,
            d = new THREE.Geometry,
            d.vertices = p.processVectors(l, T, M, m.reFlip, I),
            l = void 0,
            m.setProgress(30, LITHO_StatusMessages.fProcessing),
            setTimeout(a, 1)
        }
        function a() {
            d.faces = p.processFaces(T, M),
            m.setProgress(40, LITHO_StatusMessages.sProcessing),
            setTimeout(i, 1)
        }
        function i() {
            d.faceVertexUvs[0] = p.processUVs(T, M),
            m.setProgress(50, LITHO_StatusMessages.cfNormals),
            setTimeout(s, 1)
        }
        function s() {
            d.mergeVertices(),
            d.computeFaceNormals(),
            m.setProgress(60, LITHO_StatusMessages.cvNormals),
            setTimeout(r, 1)
        }
        function r() {
            p.addBaseSizePos(d, m.WidthInMM, m.HeightInMM, m.ThickInMM, m.borderThicknessInMM, m.baseDepth, v, I),
            p = void 0,
            m.setProgress(70, LITHO_StatusMessages.aScene),
            setTimeout(o, 1)
        }
        function o() {
            m.scene3d.setUp3DScene(d, v, true),
            m.setProgress(80, LITHO_StatusMessages.createSTL),
            setTimeout(h, 1)
        }
        function h() {
            g = new LITHO.STLGenerator,
            m.stlData = g.generateSTL(d, 'exported', 1 / v),
            d = void 0,
            m.setProgress(90, LITHO_StatusMessages.download),
            setTimeout(c, 1)
        }
        function c() {
            //g.saveBinSTL(u, e.filename),
            g = void 0,
            //u = void 0,
            m.setProgress(0, "")
            //m.onlineSaveAndPrint.style.visibility = "visible";
        }
        var l, d, p, g, m = this,
        T = this.outputCanvas.width,
        M = this.outputCanvas.height,
        v = this.vertexPixelRatio,
        I = this.curve;
        m.scene3d.init3D(m.threeDCanvas, v, !1),
        m.setProgress(10, LITHO_StatusMessages.s1Processing),
        setTimeout(t, 1)
    }
},
LITHO.Scene3D = function() {},
LITHO.Scene3D.prototype = {
    constructor: LITHO.Scene3D,
     renderer : undefined,
    scene : undefined,
    camera : undefined,
    controls : undefined,
    container: undefined,
    init3D : function (threeDCanvas,vertexPixelRatio,createBox) {
        var that=this; // needed for call back functions
        function render() {
            that.controls.update();
            requestAnimationFrame(render);
            that.renderer.render(that.scene, that.camera);
        };
        function Resize() {
            var width = parseInt(window.getComputedStyle(this.container).width);
            var header = document.getElementById('draw-top').offsetHeight;
            var height = window.innerHeight - header;
            //var height = parseInt(window.getComputedStyle(that.container).height);
            that.camera.aspect = width / height;
            that.camera.updateProjectionMatrix();
            that.renderer.setSize(width, height);
        };
        
        // should get the Canvas Renderer working for other browsers...
        //if ((Detector!==undefined) && (! Detector.webgl) ) Detector.addGetWebGLMessage();
        
        this.container = threeDCanvas;
        var width = parseInt(window.getComputedStyle(this.container).width);
        var header = document.getElementById('draw-top').offsetHeight;
        var height = window.innerHeight - header;
        //var height = window.getComputedStyle(document.body).height - window.getComputedStyle(document.getElementById('main-nav')).height;
        this.container.innerHTML = "";
        
        this.renderer = new THREE.WebGLRenderer({ antialias: false,preserveDrawingBuffer: true,alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.autoClear = true;
        this.container.appendChild(this.renderer.domElement);
        
        this.camera = new THREE.PerspectiveCamera(37.5, width / height, 1, 5000);
        this.controls = new THREE.NormalControls(this.camera, this.container);
        
        if (createBox) {
            var lithoGeometry = new THREE.BoxGeometry(100*vertexPixelRatio,100*vertexPixelRatio,5*vertexPixelRatio);
            lithoGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 2.5*vertexPixelRatio));
        }
        else {
            var lithoGeometry = new THREE.Geometry();
        }
        this.setUp3DScene(lithoGeometry, vertexPixelRatio, false);
        render();
        window.addEventListener('resize', Resize, false);
    },
    setUp3DScene: function(lithoMesh,vertexPixelRatio, bool) {
        try {
            this.scene = new THREE.Scene;
            var spotLight = new THREE.SpotLight(0xffffff, 1, 0);
            spotLight.position.set(-1000, 1000, 1000);
            spotLight.castShadow = false;
            this.scene.add(spotLight);
            var pointLight = new THREE.PointLight(0xffffff, 1, 0);
            pointLight.position.set(3000, -4000, 3500);
            this.scene.add(pointLight);
            var addBackLights=true;
            if (addBackLights) {
                var spotLight = new THREE.SpotLight(0xffffff, 1, 0);
                spotLight.position.set(-1000, 1000, -1000);
                spotLight.castShadow = false;
                this.scene.add(spotLight);
                var pointLight = new THREE.PointLight(0xffffff, 1, 0);
                pointLight.position.set(3000, -4000, -3500);
                this.scene.add(pointLight);
            }
            if (bool) {
                var material = new THREE.MeshPhongMaterial({ color: 0x001040, specular: 0x006080, side: THREE.DoubleSide,shininess: 6 });//
                var lithoPart = new THREE.Mesh(lithoMesh, material);
                //lithoPart.rotation.y = Math.PI;
                this.scene.add(lithoPart);
            }
            
            var showOverMesh = false;
            if (showOverMesh) {
                var meshmaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, specular: 0x006080, shininess: 10, side: THREE.DoubleSide, wireframe: true });
                var lithoMeshPart = new THREE.Mesh(lithoPart.geometry, meshmaterial);
                this.scene.add(lithoMeshPart);
            }
            
            this.camera.position.x = 0;
            this.camera.position.y = -150*vertexPixelRatio;
            this.camera.position.z = 150*vertexPixelRatio;
        } catch(e) {
            console.log(e.message)
        }
    }
},
LITHO.ImageMap = function() {},
LITHO.ImageMap.prototype = {
    constructor: LITHO.ImageMap,
    /*******************************************************************************
 * public  processImage         Do the 2D processing of the clicked image
 * @param {Canvas}              outputCanvas for display of inverted mono image
 * @param {Image} image         the image to process
 * @param {Number} minThicknessInMM
 * @param {Number} zScale
 * @param {Number} vertexPixelRatio
 * @returns {heightData}
 */
    processImage: function(outputCanvas, image,minThicknessInMM,zScale,vertexPixelRatio) {

        // we'll need the 2D context to manipulate the data
        var canvas_context = outputCanvas.getContext("2d");
        canvas_context.beginPath();
        canvas_context.lineWidth = "1";
        canvas_context.fillStyle = "black";
        canvas_context.rect(0, 0, outputCanvas.width, outputCanvas.height);
        canvas_context.fill();
        //fill the canvas black then place the image in the centre leaving black pixels to form the border
        canvas_context.drawImage(image, image.edgeThickness, image.edgeThickness, outputCanvas.width - 2 * image.edgeThickness, outputCanvas.height - 2 * image.edgeThickness); // draw the image on our canvas
        
        // image_data points to the image metadata including each pixel value
        var image_data = canvas_context.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
        
        // pixels points to the canvas pixel array, arranged in 4 byte blocks of Red, Green, Blue and Alpha channel
        var pixels = image_data.data;
        var numb_pixels = pixels.length / 4; // the number of pixels to process
        
        heightData = new Float32Array(numb_pixels); // an array to hold the result data
        
        var image_pixel_offset = 0; // current image pixel being processed
        for (var height_pixel_index = 0; height_pixel_index < numb_pixels; height_pixel_index++) {
            // extract red,green and blue from pixel array
            var red_channel = pixels[image_pixel_offset], green_channel = pixels[image_pixel_offset + 1], blue_channel = pixels[image_pixel_offset + 2];
            // create negative monochrome value from red, green and blue values
            var negative_average = 255 - (red_channel * 0.299 + green_channel * 0.587 + blue_channel * 0.114);
            
            //heightData[height_pixel_index] = negative_average; 
            heightData[height_pixel_index] = (minThicknessInMM + (negative_average * zScale)) * vertexPixelRatio; // store scaled value in height array

            // store value back in canvas in all channels for 2D display of negative monochrome image
            pixels[image_pixel_offset] = pixels[image_pixel_offset + 1] = pixels[image_pixel_offset + 2] = negative_average;
            image_pixel_offset += 4; // offest of next pixel in RGBA byte array
        }
        // display modified image
        canvas_context.putImageData(image_data, 0, 0, 0, 0, image_data.width, image_data.height);
        return (heightData);
    }
},
/*******************************************************************************
 * 
 * Class LithoBox 
 * @param {Lithophane} parent
 * 
 */
LITHO.LithoBox = function (parent) {
    this.parentLitho=parent;
    this.panelledBack=true;
};
LITHO.LithoBox.prototype = {
    
    constructor: LITHO.LithoBox,
   
/*******************************************************************************
 * 
 *  private processVectors   Create vectors of 2D points from height map
 * @param {Array} heightData  The height data extracted from the image
 * @param {Number} width       The width (X)of the height date
 * @param {Number} height      the height(Y) of the height data
 * @param {Number} reFlip
 * @returns {verts}         Geometry.vertices array to process
 */
    processVectors: function (heightData, width, height,reFlip,curve) {
        var i, j;
        var index = 0;
        var heightPixels = height;
        var widthPixels = width;
        height--;
        width--;
        
        if (curve!==0) {
            var angle=Math.abs(curve);
            var arcRadius=(width/curve)*(180/Math.PI);
            var distanceFromFlat=Math.sin(angle*(360/Math.PI))*arcRadius;
            var startAngle=(0-angle/2);
            if (curve<0) distanceFromFlat=0-distanceFromFlat;
            //console.log("angle="+angle+" distance "+distanceFromFlat+" arcRadius="+arcRadius);
        }
        var verts=[];
        verts.length = height * width;
        for (i = 0; i <= height; i++) {
            for (j = 0; j <= width; j++) {
                if ((i===0)||(i===height)
                 || (((j===0)||(j===width)))) { // make sure the edge pixels go down to the base
                    heightData[index]=0;
                }
                
                var y=heightPixels - i; 
                
                var z,x;
                if (curve===0) {
                    var x=reFlip ? j : widthPixels - j;
                    z=heightData[index];
                    // square up left/right edges
                    if (x===2) x--;
                    if (x===width) x++;
                } else {
                    var jpos=j;
                    // square up left/right edges
                    if (j===1) jpos--; else if (j===width-1) jpos++;
                    
                    var deg2Rad=(Math.PI/180);
                    var u=jpos/width;
                    var degreesRoated=startAngle+(angle*u);
                    var rotation=degreesRoated*deg2Rad;
                    var magnitude=heightData[index]+arcRadius;
                    
                    if (curve<0) {
                    	x=width/2         +magnitude*Math.sin(rotation)*-1;
                    } else {
                    	x=width/2         +magnitude*Math.sin(rotation);
                    }
                    
                    
                    z=distanceFromFlat+magnitude*Math.cos(rotation);
                }
                // square up top/bottom edges
                if (y===2) y--;
                if (y===height) y++;
                verts[index] = new THREE.Vector3(x, y, z);
                index++;
            }
        }
        return verts;
    },
 /*******************************************************************************
 * 
 * private processFaces     Create Face Trangles 
 * @param {type} width       The width (X)of the height date
 * @param {type} height      the height(Y) of the height data
 * @returns {faces}
 */
    processFaces: function(width, height) {
        var i, j;
        var index = 0;
        var heightPixels = height;
        var widthPixels = width;
        height--;
        width--;
        var a, b, c, d;
        var yoffset = 0;
        var y1offset = widthPixels;
        
        var faces=[];
        faces.length = (height * width * 2)+(this.panelledBack?width*2:0);
        
        for (i = 0; i < height; i++) {
            var xoffset = 0;
            var x1offset = 1;
            for (j = 0; j < width; j++) {
                // select 4 vertice indexes
                    a = yoffset + xoffset;
                    b = yoffset + x1offset;
                    c = y1offset + x1offset;
                    d = y1offset + xoffset;
                // add faces
                 // special case for bottom left and top right corners
                 // where the triangle's hypotenuse cuts across the corner
                 // rotate the face 90 degrees so that the output
                 // has nice sharp corners
                if (((j===0)&&(i===0))||((j===width-1)&&(i===height-1))) {
                    faces[index++] = new THREE.Face3(a, b, c);
                    faces[index++] = new THREE.Face3(c, d, a);
                } else {
                    faces[index++] = new THREE.Face3(a, b, d);
                    faces[index++] = new THREE.Face3(b, c, d);
                }
                
                if (this.panelledBack) {
                    if (i===height-1) {
                        a = y1offset + xoffset;
                        b = y1offset + x1offset;
                        c = x1offset;
                        d = xoffset;
                        faces[index++] = new THREE.Face3(a, b, d);
                        faces[index++] = new THREE.Face3(b, c, d);
                    }
                }
                xoffset++;
                x1offset++;
            }
            yoffset += widthPixels;
            y1offset += widthPixels;
        }
        return faces;
    },
    /*******************************************************************************
 * 
 *  private processUVs       Create UV mapping for material visualisation
 * @param {type} width       The width (X)of the height date
 * @param {type} height      the height(Y) of the height data
 * @returns {UVs}
 */
    processUVs: function(width, height) {
        var i, j;
        var index = 0;
        height--;
        width--;
        var uva, uvb, uvc, uvd;
        index = 0;
        var uvs=[];
        uvs.length = (height+(this.panelledBack?1:0)) * (width+(this.panelledBack?1:0)) * 2;
        for (i = 0; i < height; i++) {
            // UV Array holds values from 0-1
            var yProp = i / height;
            var y1Prop = (i + 1) / height;
            for (j = 0; j < width; j++) {
                // UV Array holds values from 0-1
                var xProp = j / width;
                var x1Prop = (j + 1) / width;
                uva = new THREE.Vector2(xProp , yProp );
                uvb = new THREE.Vector2(x1Prop, yProp );
                uvc = new THREE.Vector2(x1Prop, y1Prop);
                uvd = new THREE.Vector2(xProp , y1Prop);
                
                 // special case for bottom left and top right corners
                 // where the triangle's hypotenuse cuts across the corner
                 // rotate the face 90 degrees so that the output
                 // has nice sharp corners
                if (((j===0)&&(i===0))||((j===width-1)&&(i===height-1))) {
                    uvs[index++] = [uva, uvb, uvc];
                    uvs[index++] = [uvc.clone(), uvd, uva.clone()];
                } else {
                    uvs[index++] = [uva, uvb, uvd];
                    uvs[index++] = [uvb.clone(), uvc, uvd.clone()];
                }
                if (this.panelledBack) {
                    // add extra UVs for the back of the lithophane
                    if (j===0) {
                        var uvx = new THREE.Vector2(0.5,0.5);
                        uvs[index++] = [uva.clone(),uvd.clone(),uvx];
                    } else if (j===width-1) {
                        var uvx = new THREE.Vector2(0.5, 0.5);
                        uvs[index++] = [uvc.clone(),uvb.clone(),uvx];
                    } 
                    if (i===0) {
                        var uvx = new THREE.Vector2(0.5, 0.5);
                        uvs[index++] = [uvb.clone(),uva.clone(),uvx];
                    } else if (i===height-1) {
                        var uvx = new THREE.Vector2(0.5, 0.5);
                        uvs[index++] = [uvd.clone(),uvc.clone(),uvx];
                    }
                }
            }
        }
        return uvs;
    },
    
    /*******************************************************************************
 * 
 *  private addBaseSizePos       Add base , centre and set exact size
 * @param {Geometry} toGeometry  The geomentry to modify
 * @param {Number} WidthInMM  - output width in mm
 * @param {Number} HeightInMM - output height in mm
 * @param {Number} ThickInMM  - output thickness in mm
 * @param {Number} borderThicknessInMM - output border in mm
 * @param {Number} baseDepth - output thickness of base in mm
 * @param {Number} vertexPixelRatio 
 * @returns {undefined}
 */
    addBaseSizePos: function(toGeometry, WidthInMM, HeightInMM, ThickInMM ,borderThicknessInMM, baseDepth,vertexPixelRatio,curve) {
        // adjust to exact size required - there is always 1 pixel less on the 
        // width & height due to the vertices being positioned in the middle of each pixel
        toGeometry.computeBoundingBox();
        var gWidth =(toGeometry.boundingBox.max.x - toGeometry.boundingBox.min.x);
        var gHeight=(toGeometry.boundingBox.max.y - toGeometry.boundingBox.min.y);
        var gThick =(toGeometry.boundingBox.max.z - toGeometry.boundingBox.min.z);
        
        if ((!this.panelledBack)&&(curve===0)) {
            toGeometry.center();
            toGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0-toGeometry.boundingBox.min.z));
            //var back=new THREE.PlaneGeometry(gWidth,gHeight,gWidth,gHeight);
            var back=new THREE.PlaneGeometry(gWidth,gHeight,1,1);
            //back.applyMatrix(new THREE.Matrix4().makeTranslation(toGeometry.boundingBox.min.x,toGeometry.boundingBox.min.y,toGeometry.boundingBox.min.z));
            back.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
            toGeometry.merge(back);
            toGeometry.mergeVertices();
        }
        
        if (curve===0) {
            gWidth /=vertexPixelRatio;
            gHeight/=vertexPixelRatio;
            gThick /=vertexPixelRatio;
            toGeometry.applyMatrix(new THREE.Matrix4().makeScale(WidthInMM/gWidth,HeightInMM/gHeight,ThickInMM/gThick));
            // centre mesh
            toGeometry.center();
            // Place on floor
            toGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, ThickInMM*vertexPixelRatio / 2));
        }
        // add a base
        if (baseDepth !== 0) {
            var baseThickness=borderThicknessInMM;
            // if there is no border, add a 2mm thick base
            if (baseThickness===0) {
                var baseThickness=2;
                // if the base sticks out the front, move the litho up above it
                if (baseDepth>0) {
                    toGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, baseThickness*vertexPixelRatio, 0));
                }
            }
            // cube for base
            var lithoBase = new THREE.BoxGeometry(WidthInMM*vertexPixelRatio, 
                                                   baseThickness * vertexPixelRatio, 
                                                   Math.abs(baseDepth) * vertexPixelRatio);
            // move bas to position
            lithoBase.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0 - (HeightInMM-baseThickness)*vertexPixelRatio / 2, (baseDepth * vertexPixelRatio) / 2));
            toGeometry.merge(lithoBase);
            
        }
        if ((curve!==0)||(baseDepth !== 0)) {
            // rotate for vertical printing if there's a base
            toGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
            toGeometry.center();
            toGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, HeightInMM*vertexPixelRatio / 2));
        }
    }
},
/*******************************************************************************
 * 
 * Class STLGenerator
 * 
 */
LITHO.STLGenerator = function () {
};
LITHO.STLGenerator.prototype = {
    
    constructor: LITHO.STLGenerator,
    
/*******************************************************************************
 * 
 *  public  generateSTL      Create a String containing an ASCII STL blob
 * @param {type} geometry    The geometry to process
 * @param {type} name        The output file name (included in the ST file)
 * @param {type} scale       The scale Vertex to MM for output in MM
 * @returns {String}
 */
    generateSTL: function(geometry, name,scale) {
        var vertices = geometry.vertices;
        var faces = geometry.faces;
        function vertexAsString(vert) {
            return vert.x * scale + " " + vert.y * scale + " " + vert.z * scale;
        }
        function faceAsString(index) {
            return "facet normal " + vertexAsString(faces[index].normal) + 
                " \nouter loop \n" + 
                "vertex " + vertexAsString(vertices[faces[index].a]) + " \n" + 
                "vertex " + vertexAsString(vertices[faces[index].b]) + " \n" + 
                "vertex " + vertexAsString(vertices[faces[index].c]) + " \n" + 
                "endloop \nendfacet \n";
        }
        var stl = "solid " + name + "\n";
        for (var i = 0; i < faces.length; i++) {
            stl += faceAsString(i);
        }
        stl += ("endsolid " + name + "\n");
        return stl;
    },
/*******************************************************************************
 * 
 *  public  saveTxtSTL       Call SaveAs with an ASCII STL Blob
 * @param {type} stlString   the string contaning the STL data
 * @param {type} name        The output file name 
 * @returns {undefined}
 */
    saveTxtSTL: function(stlString, name) {
        var blob;
        try {
            blob = new Blob([stlString], { type: 'text/plain' });
        }
        catch (e) {
            // Old browser, need to use blob builder
            window.BlobBuilder = window.BlobBuilder ||
                                 window.WebKitBlobBuilder ||
                                 window.MozBlobBuilder ||
                                 window.MSBlobBuilder;
            if (window.BlobBuilder) {
                var bb = new BlobBuilder();
                bb.append(stlString);
                blob = bb.getBlob("text/plain");
            }
        }
        
        
        if (blob) {
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, 'modal.stl');
            } else {
                var objectURL = URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = objectURL;
                link.download = 'modal.stl';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                setTimeout(function () {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(objectURL);
                }, 100);
            }

        } else {
            alert('浏览器版本过低，请升级浏览器');
        }
        
        //saveAs(blob, name + '.stl');
    },
/*******************************************************************************
 * 
 *  public  saveBinSTL       Call SaveAs with an Binary STL Blob
 * @param {type} dataview    the binary blob contaning the STL data
 * @param {type} name        The output file name 
 * @returns {undefined}
 */
    saveBinSTL: function(dataview, name) {
        var blob = new Blob([dataview], { type: 'application/octet-binary' });
        saveAs(blob, name + '.stl');
    },
/*******************************************************************************
 * 
 *  public  createBinSTL     Create a Binary STL blob
 * @param {type} geometry    The geometry to process
 * @param {type} scale       The scale Vertex to MM for output in MM
 * @returns {LITHO.STLGenerator.prototype.createBinSTL.dv|DataView}
 */
    createBinSTL: function(geometry,scale) {
        var writeVector = function (dataview, offset, vector, isLittleEndian) {
            offset = writeFloat(dataview, offset, vector.x * scale, isLittleEndian);
            offset = writeFloat(dataview, offset, vector.y * scale, isLittleEndian);
            return writeFloat(dataview, offset, vector.z * scale, isLittleEndian);
        };
        var writeFloat = function (dataview, offset, float, isLittleEndian) {
            dataview.setFloat32(offset, float, isLittleEndian);
            return offset + 4;
        };
        var tris = geometry.faces;
        var verts = geometry.vertices;
        var isLittleEndian = true; // STL files assume little endian, see wikipedia page
        var bufferSize = 84 + (50 * tris.length);
        var buffer = new ArrayBuffer(bufferSize);
        var dv = new DataView(buffer);
        var offset = 0;
        offset += 80; // Header is empty
        dv.setUint32(offset, tris.length, isLittleEndian);
        offset += 4;
        for (var n = 0; n < tris.length; n++) {
            offset = writeVector(dv, offset, tris[n].normal, isLittleEndian);
            offset = writeVector(dv, offset, verts[tris[n].a], isLittleEndian);
            offset = writeVector(dv, offset, verts[tris[n].b], isLittleEndian);
            offset = writeVector(dv, offset, verts[tris[n].c], isLittleEndian);
            offset += 2; // unused 'attribute byte count' is a Uint16
        }
        return dv;
    }
};

$(function () {
    var lithophane = new LITHO.Lithophane();
    var stlGenerator = new LITHO.STLGenerator();
    lithophane.initPage();
    //初始化高度
    var initHeight,range_height;
    range_height = document.getElementById('JsHeightRange');
    initHeight = new Powerange(range_height, {
        finished: function(){
             if ($("#renderImage").length) {
                lithophane.actualThicknessInMM = range_height.value;
                lithophane.updateValues();
                
                $('#renderImage').trigger('click');
            } else {
                alert('请先选择图片');
            }
        }, min: 1, max: 100, start: 5
    });
    //初始化边框
    var initBorder,range_border;
    range_border = document.getElementById('JsBorderRange');
    initBorder = new Powerange(range_border, {
        finished: function(){
            if ($("#renderImage").length) {
                lithophane.borderThicknessInMM = range_border.value;
                lithophane.updateValues();
                $('#renderImage').trigger('click');
            } else {
                alert('请先选择图片');
            }
        }, min: 0, max: 50, start: 0
    });
    //初始化弯曲度
    var initCurve,range_curve;
    range_curve = document.getElementById('JsCurveRange');
    initCurve = new Powerange(range_curve, {
        finished: function(){
            if ($("#renderImage").length) {
                lithophane.curve = range_curve.value;
                lithophane.updateValues();
                $('#renderImage').trigger('click');
            } else {
                alert('请先选择图片');
            }
        }, min: -360, max: 360, start: 0
    });
    
    $(document).on('click','#JsHeight',function(){
        toggleBar('#JsHeightBar');
    }).on('click','#JsBorder',function(){
        toggleBar('#JsBorderBar');
    }).on('click','#JsCurve',function(){
        toggleBar('#JsCurveBar');
    });
    
    $(document).on('click','#JsCloseBtn,#container',function(){
        $('.apps-range-bar div').css('visibility','hidden');
        $('#JsPrint').show();
        $('#JsCloseBtn').hide();
    });
})