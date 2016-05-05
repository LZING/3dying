# CLASS
class Universe

	# 初始化函数
	constructor: (@$container) ->
		@defaultNodeDepth = 8
		@defaultLayerWidth = 1600
		@defaultLayerHeight = 900
		@margin = 150
		@layers = []
		@sceneWidth = @$container.width()
		@sceneHeight = @$container.height()
		@ballAnimationQueue = []
		@initThree()
		@initScene()
		@initCamera()
		@initLight()
		@initSkybox()
		@enableScrollWheelZoom()
		@resize()
		@animate()


	# 调整配置
	converPosition: (graphWidth, graphHeight, o)->
		self = @
		offsetX = 0
		offsetY = 0
		if graphWidth >= self.defaultLayerWidth and graphHeight <= self.defaultLayerHeight
			r = self.defaultLayerWidth / graphWidth
			offsetY = (self.defaultLayerHeight - graphHeight * r) / 2

		else if graphHeight >= self.defaultLayerHeight and graphWidth <= self.defaultLayerWidth
			r = self.defaultLayerHeight / graphHeight
			offsetX = (self.defaultLayerWidth - graphWidth * r) / 2

		else if graphHeight <= self.defaultLayerHeight and graphWidth <= self.defaultLayerWidth
			r1 = self.defaultLayerHeight / graphHeight
			r2 = self.defaultLayerWidth / graphWidth
			if r1 < r2
				r = r1
				offsetX = (self.defaultLayerWidth - graphWidth * r) / 2
			else
				r = r2
				offsetY = (self.defaultLayerHeight - graphHeight * r) / 2


		else if graphHeight >= self.defaultLayerHeight and graphWidth >= self.defaultLayerWidth
			r1 = self.defaultLayerHeight / graphHeight
			r2 = self.defaultLayerWidth / graphWidth
			if r1 > r2
				r = r1
				offsetX = (self.defaultLayerWidth - graphWidth * r) / 2
			else
				r = r2
				offsetY = (self.defaultLayerHeight - graphHeight * r) / 2

		if o.nodes
			fn1 = (info)->
				info.x = info.x * r + offsetX
				info.y = info.y * r + offsetY
			fn1 item for item in o.nodes

		if o.edges
			fn2 = (info)->
				info.x = info.x * r + offsetX
				info.y = info.y * r + offsetY
			fn2 item for item in item1.points for item1 in o.edges


	# 绘制节点
	drawNode: (layer, data) ->
		self = @
		layer.node = {}
		fn1 = (info)->
			onProgress = (xhr)->
				if xhr.lengthComputable
					percentComplete = xhr.loaded / xhr.total * 100
					# console.log Math.round(percentComplete, 2) + '% downloaded'

			loaded = (object)->
				object.position.set info.x - self.defaultLayerWidth/2 + info.width/2, info.y - self.defaultLayerHeight/2 + info.height/2, self.defaultNodeDepth/2 * -1
				object.rotation.x = Math.PI / 2 * -1
				object.scale.x = info.width
				object.scale.y = info.height
				object.scale.z = info.width
				layer.node[info.id] = {
					info: info
					cube: object
				}
				# self.drawNodeTexture layer, info
				layer.plane.add object


			action = (resource)->
				loader = new THREE.OBJMTLLoader()
				loader.load( resource.obj, resource.mtl, loaded, onProgress)

			console.log info.img
			$.ajax {
				type: "get"
				url: self.getResource(info.img).obj
				success:()-> action self.getResource(info.img)
				error: ()-> action self.getResource()
				dataType: "text"
			}


		fn1 item for item in data


	getResource :(url)->
		if url
			arr = url.split "/"
			name = arr.pop()
			name = name.substring 0, name.lastIndexOf(".")
		else
			name = "LV"

		return {
			obj: "../resource/3d/" + encodeURIComponent(name) + ".obj"
			mtl: "../resource/3d/" + encodeURIComponent(name) + ".mtl"
		}

	# 绘制线
	drawLine: (layer, points)->
		self = @
		if points
			fn = (item)->
				material = new THREE.LineBasicMaterial { color: 0x0000FF }
				geometry = new THREE.Geometry()
				cfn = (o)-> geometry.vertices.push new THREE.Vector3 o.x - self.defaultLayerWidth/2, o.y - self.defaultLayerHeight/2, -4
				cfn citem for citem in item.points
				line = new THREE.Line geometry, material
				layer.add line

			fn item for item in points


	# 绘制节点名称
	drawNodeTexture: (layer, info)->
		self = @
		o = layer.node[info.id].cube.position
		materialFront = new THREE.MeshBasicMaterial { color: 0x348EF0 }
		materialSide = new THREE.MeshBasicMaterial { color: 0x666666 }
		materialArray = [ materialFront, materialSide ]
		textGeom = new THREE.TextGeometry info.name, {
			size: 15
			height: 1
			curveSegments: 1
			font: "lisu"
			weight: "normal"
			style: "normal"
			extrudeMaterial: 0
		}

		textMaterial = new THREE.MeshFaceMaterial materialArray
		textMesh = new THREE.Mesh textGeom, textMaterial
		textGeom.computeBoundingBox()
		textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x
		textHeight = textGeom.boundingBox.max.y - textGeom.boundingBox.min.y
		textMesh.rotation.x = Math.PI * -1
		# textMesh.position.set textWidth/2 * -1, (o.height - textHeight - 10) * -1, -10
		textMesh.position.set o.x - textWidth/2, o.y + info.height / 2 + textHeight + 2, self.defaultNodeDepth/2 * -2
		layer.plane.add textMesh
		layer.node[info.id].textMesh = textMesh
		return textMesh


	# 改变大小后，自适应
	resize: ()->
		THREEx.ContainerResize @$container[0], @renderer, @camera


	# 初始化WebGL
	initThree: () ->
		@renderer = new THREE.WebGLRenderer {
			antialias : true
		}
		@renderer.setSize @sceneWidth, @sceneHeight
		@$container.append @renderer.domElement
		@renderer.setClearColorHex 0x000000, 1.0


	# load
	loadTexture : (path)->
		if typeof passthrough_vars isnt 'undefined' and passthrough_vars.offline_mode
			b64_data = $ 'img[data-src="' + path + '"]'
						.attr 'src'
			new_image = document.createElement 'img'
			texture = new THREE.Texture new_image
			new_image.onload = ()-> texture.needsUpdate = true
			new_image.src = b64_data
			return texture

		THREE.ImageUtils.loadTexture path

	# 初始化天空盒
	initSkybox: ()->
		geometry = new THREE.SphereGeometry 3000, 60, 40

		uniforms =
			texture:
				type: 't'
				value: @loadTexture "images/skybox.jpg"

		vertexShader = """
			varying vec2 vUV;
			varying float vDensity;
			varying float vDiff;
			void main() {
				vUV = uv;
				vec4 pos = vec4(position, 1.0);
				gl_Position = projectionMatrix * modelViewMatrix * pos;
			}
		"""

		fragmentShader = """
            uniform sampler2D texture;
            varying vec2 vUV;
            void main() {
                vec4 sample = texture2D(texture, vUV);
                gl_FragColor = vec4(sample.xyz, sample.w);
            }
		"""

		material = new THREE.ShaderMaterial {
			uniforms:       uniforms
			vertexShader:   vertexShader
			fragmentShader: fragmentShader
		}

		skyBox = new THREE.Mesh geometry, material
		skyBox.scale.set -1, 1, 1
		skyBox.eulerOrder = 'XZY'
		skyBox.renderDepth = 1000.0
		@scene.add skyBox


	# 初始化摄像机
	initCamera: () ->
		@camera = new THREE.PerspectiveCamera 30, @sceneWidth / @sceneHeight, 0.1, 10000
		@camera.rotation.x = Math.PI / 2
		@camera.position.set 0, 800, @defaultLayerWidth
		@camera.lookAt @scene.position
		@scene.add @camera



	# 初始化场景
	initScene: () ->
		@scene = new THREE.Scene


	# 初始化光
	initLight: () ->
		light = []
		for i in [0..2]
			light.push new THREE.SpotLight 0x999999, 1.2
			@scene.add light[i]

		baseNum = 1000
		light[0].position.set baseNum, baseNum, baseNum
		# light[1].position.set baseNum * -1, baseNum * -1, baseNum
		light[2].position.set baseNum * -1, baseNum, baseNum * -1

	# 渲染
	render: () ->
		@renderer.render @scene, @camera

	# drawText
	drawText: (layer, text)->
		materialFront = new THREE.MeshBasicMaterial { color: 0xffffff }
		materialSide = new THREE.MeshBasicMaterial { color: 0x000088 }
		materialArray = [ materialFront, materialSide ]
		textGeom = new THREE.TextGeometry text, {
			size: 30
			height: 4
			curveSegments: 3
			font: "lisu"
			weight: "normal"
			style: "normal"
			extrudeMaterial: 1
		}

		textMaterial = new THREE.MeshFaceMaterial materialArray
		textMesh = new THREE.Mesh textGeom, textMaterial
		textGeom.computeBoundingBox()
		textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x
		textHeight = textGeom.boundingBox.max.y - textGeom.boundingBox.min.y
		textMesh.rotation.x = Math.PI / 2 * -1
		textMesh.position.set @defaultLayerWidth/2 - textWidth , @defaultLayerHeight/2 - textHeight, 0
		layer.add(textMesh)
		return textMesh

	# 添加层
	addLayer: (option={}) ->
		option.node = if option.node then option.node else []
		option.width = if option.width then option.width else @defaultLayerWidth
		option.height = if option.height then option.height else @defaultLayerHeight
		option.planeQuality = if option.planeQuality then option.planeQuality else 10

		mateOption =
			side : THREE.DoubleSide
			transparent : true
			opacity : 0.7
			color : 0xCCCCCC

		option.material = if option.material then option.material else new THREE.MeshLambertMaterial mateOption

		plane = new THREE.Mesh(new THREE.PlaneGeometry(
			option.width,
			option.height,
			option.planeQuality,
			option.planeQuality
		), option.material)

		plane.receiveShadow = true
		plane.rotation.x = Math.PI / 2
		plane.position.x = 0
		plane.position.z = 0
		plane.position.y = 0
		@scene.add plane

		str = "图层" + (@layers.length + 1)
		textMesh = @drawText plane, str
		layer = {
			plane: plane
			textMesh: textMesh
		}
		@layers.push layer

		@converPosition option.graphWidth, option.graphHeight, option
		@drawNode layer, option.nodes
		@drawLine plane, option.edges
		@autoLayoutLayer()
		@render()



	# 自动布局层
	autoLayoutLayer: ()->
		self = @
		startNum = (self.layers.length - 1) * self.margin / 2 * -1
		fn = (item, i) ->
			item.plane.position.y = startNum + i * self.margin
		fn item, i for item, i in self.layers


	###
	开启鼠标控制
    如果不开启，则无法用鼠标旋转摄像机角度与滚轮退远近
	###
	enableScrollWheelZoom: ()->
		self = @
		@orbitControls = new THREE.OrbitControls @camera, @renderer.domElement
		@orbitControls.damping = 0.2
		@orbitControls.addEventListener 'change', ()-> self.render()

		@stats = new Stats()
		@stats.domElement.style.position = 'absolute'
		@stats.domElement.style.bottom = '0px'
		@stats.domElement.style.zIndex = 100
		@$container.append @stats.domElement

	# 动画
	animate:() ->
		self = @
		fn = ()->
			requestAnimationFrame fn
			self.orbitControls.update()
			self.stats.update()
			self.render()
			self.updateBallAnimation()

		fn()


	# 获取两点不间
	getPointsTween: (points)->
		step = 2
		ret = []
		twoPoints = (source, target)->
			steps = Math.max(Math.abs(source.x - target.x), Math.abs(source.y - target.y), Math.abs(source.z - target.z)) / step
			fn = (item)->
				o = {}
				if source.x > target.x
					o.x = source.x - Math.abs(source.x - target.x) / steps * item
				else
					o.x = source.x + Math.abs(source.x - target.x) / steps * item

				if source.y > target.y
					o.y = source.y - Math.abs(source.y - target.y) / steps * item
				else
					o.y = source.y + Math.abs(source.y - target.y) / steps * item

				if source.z > target.z
					o.z = source.z - Math.abs(source.z - target.z) / steps * item
				else
					o.z = source.z + Math.abs(source.z - target.z) / steps * item

				ret.push o
			fn item for item in [1..steps]

		twoPoints item,points[i+1] for item,i in points when !!points[i+1]
		return ret

	# 白球
	crateLineBallAnimation: (points)->
		self = @
		geometry = new THREE.SphereGeometry( 3, 100, 50 )
		geometry.computeTangents()
		rectMesh = new THREE.Mesh geometry, new THREE.MeshLambertMaterial { color: 0xffffff }
		self.scene.add rectMesh
		pathPoints = self.getPointsTween points
		rectMesh.position.set points[0].x, points[0].y, points[0].z
		self.ballAnimationQueue.push {
			ball : rectMesh
			points: points
			animatePoints: pathPoints
			back: []
		}

	#
	updateBallAnimation: ()->
		self = @
		fn = (item)->
			if item.animatePoints.length is 0
				item.animatePoints = item.back
				item.back = []

			point = item.animatePoints.shift()
			item.back.push point
			item.ball.position.set point.x, point.y, point.z

		fn item for item in self.ballAnimationQueue


	# 根据ID获取node
	getNodeById: (id) ->
		self = @
		ret = null
		fn = (nodes)->
			cfn = (node) ->
				if node.info.id == id
					ret = node
			cfn nodes[index] for index of nodes
		fn item.node for item in self.layers
		return ret

	# 获取节点绝对位置
	getNodeAbsolutePosition: (node)->
		o = {}
		o.x = node.parent.position.x + node.position.x
		o.y = node.parent.position.y
		o.z = node.parent.position.z + node.position.y
		return o


	# 获取两个绝对点之间point
	getNodeBetweenPoints: (source, target)->
		middlePoint = if target.y > source.y then source.y + (target.y - source.y) / 2 else  target.y + (source.y - target.y) / 2
		points = []
		points.push new THREE.Vector3 source.x, source.y, source.z
		points.push new THREE.Vector3 source.x, middlePoint, source.z
		points.push new THREE.Vector3 target.x, middlePoint, source.z
		points.push new THREE.Vector3 target.x, middlePoint, target.z
		points.push new THREE.Vector3 target.x, target.y, target.z
		return points


	# 绘制层间连线
	drawLayerLine: (data)->
		self = @
		fn1 = (info)->
			source = self.getNodeById(info.source)
			target = self.getNodeById(info.target)

			if source and target
				sourcePosition = self.getNodeAbsolutePosition source.cube
				targetPosition = self.getNodeAbsolutePosition target.cube
				points = self.getNodeBetweenPoints sourcePosition, targetPosition
				lineGeometry = new THREE.Geometry
				lineGeometry.vertices = points
				lineMaterial = new THREE.LineBasicMaterial { color: 0xFFFFFF , linecap:'round'}
				lineGeometry.computeLineDistances points
				line = new THREE.Line lineGeometry, lineMaterial
				self.crateLineBallAnimation points
				self.scene.add line

		fn1 item for item in data

	# 获取节点大小
	getNodeSize: (mesh)->
		box = new THREE.Box3().setFromObject(mesh)
		s={}
		s.x=box.max.x-box.min.x
		s.y=box.max.y-box.min.y
		s.z=box.max.z-box.min.z
		box = null
		return s


window.Universe = Universe



