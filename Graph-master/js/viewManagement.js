
(function(self){
	
	"use strict";

	var createMenu,
		CI_TABLE_LIB = null,
		upDateCiTableLib = {},
		pubContextMenuItems = null,
		priContextMenuItems = null,
		jstreePub = null,
		jstreePri = null,
		CACHE = {};

	pubContextMenuItems = function(node){
		return graph.jstreeContextMenu(jstreePub, node, true, graph.utils.isAdmin());
	};

	priContextMenuItems = function(node){
		return graph.jstreeContextMenu(jstreePri, node, false, graph.utils.isAdmin());
	};

	upDateCiTableLib = function(){
		var result = null,
			ids = null;

		ids = graph.utils.getGraphCiIds(self.editor.graph);
		result = graph.api.getCis(ids);
		if(graph.utils.isTrueRet(result)){
			CI_TABLE_LIB = result.data;
		}
	};
	
	// member defined
	self.viewTreeID = "viewTree";
	self.graphContainer = null;
	self.dirTemplate = "accordion/viewTree_1.html";
	self.fileTemplate = "accordion/viewTree_2.html";

	self.toolbarItemsRight = [
		"searchNode",
		"searchPath",
		"searchClear",
		"|",
		"ciConfig",
		"kpiConfig",
		"graphModel",
		"|",
		"monitorModel",
		"viewPreview",
		"universe"
	];

	self.toolbarItemsLeft = [
		"viewSave",
		"viewUpdate",
		"|",
		"zoomToCenter",
		"actualsize",
		"zoomIn",
		"zoomOut",
		"|",
		"orderUp",
		"orderDown",
		"|",
		"undo",
		"redo",
		"delete",
		"link",
		"|",
		"fillColor",
		"strokeColor",
		"shadow",
		"|",
		"fontFamily",
		[
			"font_Helvetica",
			"font_Verdana",
			"font_Times New Roman",
			"font_Garamond",
			"font_Comic Sans MS",
			"font_Courier New",
			"font_Georgia",
			"font_Lucida Console",
			"font_Tahoma",
			"font_sans-serif",
			"font_custom"
		],
		"fontColor",
		"textAlign",
		[
			"alignLeft",
			"alignCenter",
			"alignRight",
			"alignTop",
			"alignMiddle",
			"alignBottom"
		],
		"fontSize",
		[
			"fontSize_6",
			"fontSize_8",
			"fontSize_9",
			"fontSize_10",
			"fontSize_11",
			"fontSize_12",
			"fontSize_14",
			"fontSize_18",
			"fontSize_24",
			"fontSize_36",
			"fontSize_48",
			"fontSize_72",
			"fontSize_custom"
		],
		"bold",
		"italic",
		"underline",
		"|",
		"lineStartclassic",
		[
			"startNoarrow",
			"startClassic",
			"startOpen",
			"startBlock",
			"startOval",
			"startDiamond",
			"startThindiamond",
			"startClassicTrans",
			"startBlockTrans",
			"startOvalTrans",
			"startDiamondTrans",
			"startThindiamondTrans"
		],
		"lineEndclassic",
		[
			"endNoarrow",
			"endClassic",
			"endOpen",
			"endBlock",
			"endOval",
			"endDiamond",
			"endThindiamond",
			"endClassicTrans",
			"endBlockTrans",
			"endOvalTrans",
			"endDiamondTrans",
			"endThindiamondTrans"
		],
		"line",
		[
			"lineStraight",
			"lineEntityRelation",
			"lineElbowHorizontal",
			"lineElbowVertical",
			"lineSegment",
			"lineOrthogonal"
		],
		"|",
		"grid",
		"guides"
	];
	
	self.openChild = function(cell, neo4jId, rs, term, dir, g){
		graph.utils.openChild.apply(graph.utils, arguments);
	};

	self.createFoldPrivate = function(func, dfValue){
		var result = graph.api.getPriViewCate();
		if(graph.utils.isTrueRet(result)){
			self.createFold(jstreePri, func, dfValue, [result.data], graph.api.priViewCateCreate);
		}else{
			alert(graph.utils.alert(result.message));
		}
	};

	self.createFoldPublic = function(func, dfValue){
		var data = [],
			result = null;
		result = graph.api.getPubViewCate();
		if(graph.utils.isTrueRet(result)){
			data.push({
				text: "根",
				id: 0,
				children: result.data
			});
			self.createFold(jstreePub, func, dfValue, data, graph.api.pubViewCateCreate);
		}else{
			alert(graph.utils.alert(result.message));
		}
	};

	self.createFold = function($elt, func, dfValue, data, api){
		var html = "",
			loop = null,
			depName = [],
			getName = null,
			split = " / ",
			$select = null,
			$name = null,
			$main = null;

		html = graph.utils.render("view/addFold.html");

		graph.dialog("创建目录", html, function($element, dialog){
			var name = "",
				pid = "",
				pos = "",
				obj = null,
				jstree = null,
				result = null;

			name = $.trim($name.val());
			pid = $select.val() === "0" ? null : $select.val();
			pos = pid ? pid : "#";
			if(name !== ""){
				result = api(name, pid);
				if(graph.utils.isTrueRet(result)){
					obj = {text: result.data.name, id: result.data.id, icon: "fa fa-folder"};
					jstree = $elt.jstree(true);
					jstree.create_node(pos, obj);
					jstree.open_node(pos);
					dialog.hide();

					if(typeof func === "function"){
						func(pos, obj);
					}
				}else{
					graph.utils.alert(result.message);
				}
			}else{
				graph.utils.alert("错误：请输入创建目录名称");
			}
		});

		$select = $("#foldparent");
		$name = $("#foldname");

		getName = function(name){
			if(depName.length >= 1){
				return [depName.join(split), name].join(split);
			}else{
				return name;
			}
		};

		loop = function(list){
			$.each(list, function(){
				var option = document.createElement("option");
				option.value = this.id;
				option.innerHTML = getName(this.text);
				option.selected = dfValue === this.id ? true : false;
				$select.append(option);

				if(this.children){
					depName.push(this.text);
					loop(this.children);
					depName.pop();
				}
			});
		};

		loop(data);
	};
	
	self.selectViews = function(fun){
		var $pub = null,
			$pri = null,
			jstree;

		graph.dialog("选择视图(可选多个)", graph.utils.render("view/selectView.html"), function($elt, dialog){
			var arr,
				ret = [],
				jstreePri = $pri.jstree(true),
				jstreePub = $pub.jstree(true);

			arr = jstreePri.get_selected().concat(jstreePub.get_selected());
			if(arr.length >= 1){
				dialog.hide();

				$.each(jstreePri.get_selected(), function(){
					var o = jstreePri.get_node(this);
					if(o.children.length === 0){
						ret.push({
							viewid: o.id,
							viewname: o.text,
							cateid: o.parent,
							catename: jstreePri.get_node(o.parent).text
						});
					}
				});

				$.each(jstreePub.get_selected(), function(){
					var o = jstreePub.get_node(this);
					if(o.children.length === 0) {
						ret.push({
							viewid: o.id,
							viewname: o.text,
							cateid: o.parent,
							catename: jstreePub.get_node(o.parent).text
						});
					}
				});
				fun(ret);
			}else{
				graph.utils.alert("请至少选择一个视图");
			}
		});

		jstree = function($container, data){
			$.each(data, function(){
				if(typeof this.view === "undefined"){
					if(!this.state){
						this.state = {};
					}
					//this.state.disabled = true;
				}
			});
			$container.jstree({
				core : { data : data },
				plugins: ["checkbox"]
			});
			graph.utils.jstreeEvent($container);
		};

		$pri = $("#privateTab").find(".tree-main");
		$pub = $("#publicTab").find(".tree-main");
		jstree($pri, self.getTreeDataPri(), false);
		jstree($pub, self.getTreeDataPub(), true);
	};
	
	self.selectView = function(fun){
		var jstree = null,
			selected = null,
			isFromPub = null;

		graph.dialog("选择视图", graph.utils.render("view/selectView.html"), function($elt, dialog){
			if(selected){
				dialog.hide();
				fun(selected, isFromPub);
			}else{
				graph.utils.alert("请选择一个视图");
			}
		});

		jstree = function($container, data, isPub){
			$.each(data, function(){
				if(typeof this.view === "undefined"){
					if(!this.state){
						this.state = {};
					}
					this.state.disabled = true;
				}
			});
			$container.jstree({
				core : { data : data }
			}).bind('select_node.jstree', function(event, data) {
				selected = data.node.id;
				isFromPub = isPub;
			});
			graph.utils.jstreeEvent($container);
		};

		jstree($("#privateTab").find(".tree-main"), self.getTreeDataPri(), false);
		jstree($("#publicTab").find(".tree-main"), self.getTreeDataPub(), true);
	};

	self.getCache = function(){
		return CACHE;
	};

	self.showMonitorModel = function(){
		var url = "";
		if(CACHE.viewid){
			url = [
				"tree.html?a&a",
				"&viewid="+encodeURIComponent(CACHE.viewid)
			].join("");
			window.open(url);
		}else{
			graph.utils.alert("请打开某个视图后再做此操作！");
		}
	};
	
	self.setCache = function(key, value){
		CACHE[key] = value;
	};
	
	// getBody
	self.getBody = function(){
		var _this = this,
			html = "";
		html = graph.utils.render(_this.view, {
			viewTreeID : self.viewTreeID,
			isAdmin : graph.utils.isAdmin()
		});
		return html;
	};
	
	// init
	self.init = function(){
		self.graph();
		new graphContextMenu(self.editor, self.contextMenu);
		self.refreshPub();
		self.refreshPri();
		
		self.addEvent();
		self.toolbar();

		new Autolayout(self.editor.graph);
	};

	self.toolbar = function(){
		self.toolbar = new Toolbar(self, $("#toolbar-viewManage"));
		self.toolbar.hide();
	};

	self.addEvent = function(){

		if(graph.utils.isAdmin()){
			$("#viewAddRootCatePub").click(function(){
				self.createFoldPublic();
			});
		}

		$("#viewAddRootCatePri").click(function(){
			self.createFoldPrivate();
		});

		$("#viewTreeRefreshPub").click(function(){
			$("#treeViewPub").html("刷新中...");
			window.setTimeout(self.refreshPub, 200);
		});

		$("#viewTreeRefreshPri").click(function(){
			$("#treeViewPri").html("刷新中...");
			window.setTimeout(self.refreshPri, 200);
		});
	};
	
	self.refreshPub = function(){
		var $container = $("#treeViewPub"),
			div;

		div = document.createElement("div");
		$container.html(div);
		jstreePub = $(div).jstree({
			core : {
				data : self.getTreeDataPub(),
				check_callback : true
			},
			plugins: ["wholerow", "contextmenu", "crrm"],
			contextmenu: {
				items: pubContextMenuItems
			}
		}).bind('select_node.jstree', function(event, data) {
			if(data.node.original.view && data.event.which === 1){
				self.setCache("isFromPub", true);
				self.openView(data.node.id, data.node.text);
			}
		});
		graph.utils.jstreeEvent($(div));
	};

	self.refreshPri = function(){
		var $container = $("#treeViewPri"),
			div;

		div = document.createElement("div");
		$container.html(div);
		jstreePri = $(div).jstree({
			core : {
				data : self.getTreeDataPri(),
				check_callback : true
			},
			plugins:["wholerow", "contextmenu", "crrm", "state"],
			contextmenu: {
				items: priContextMenuItems
			}
		}).on('select_node.jstree', function(event, data) {
			if(data.node.original.view && data.event.which === 1){
				self.setCache("isFromPub", false);
				self.openView(data.node.id, data.node.text);
			}
		});
		graph.utils.jstreeEvent($(div));
	};

	self.openView = function(viewid, viewname){
		var result = graph.api.getView(viewid);
		if(graph.utils.isTrueRet(result)){
			graph.utils.openXml(self.editor, result.data.xml);
			self.setCache("viewid", viewid);
			self.setCache("viewname", viewname);
			upDateCiTableLib();
			self.showGraph();
		}else{
			graph.utils.alert(result.message);
		}
	};

	self.formatTreeData = function(data){
		$.each(data, function(){
			if(typeof this.view === "string"){
				//this.icon = "jstree-icon jstree-file";
				this.icon = "fa fa-file-image-o";
			}else{
				this.icon = "fa fa-folder";
			}
		});
		return data;
	};

	// get Tree Data
	self.getTreeDataPub = function(){
		var result = null;
		
		result = graph.api.getPubViewCateByTree();
		return IF(result.success, function(){
			return self.formatTreeData(result.data);
		}, function(){
			return [];
			throw new Error(result.data);
		});
	};

	// get Tree Data
	self.getTreeDataPri = function(){
		var result = null,
			data = null;

		result = graph.api.getPriViewCateByTree();
		return IF(result.success, function(){
			data = self.formatTreeData(result.data);
			$.each(data, function(){
				if(this.parent === "#"){
					this.state = {
						opened : true
					};
				}
			});

			return data;
		}, function(){
			return [];
			throw new Error(result.data);
		});
	};

	// graph
	self.graph = function(){
		self.graphContainer = $("#graph-viewManage")[0];

		self.editor = graph.utils.getEditor(
			self.graphContainer,
			self.outlineContainer
		);
	};

	// select
	self.select = function(){
		graph.onlineEdit.editor.graph.keyHandler.handler.setEnabled(false);
		self.editor.graph.keyHandler.handler.setEnabled(true);
		graph.onlineEdit.toolbar.hide();
		self.toolbar.show();
		$("#toolbar-viewPortfolio").hide();
	};

	self.saveView = function(o){
		o.fun = function(element){
			alert("here");
		};
	};

	self.showGraph = function(){
		var container = null;
		self.editor.zoomLock = false;
		container = self.editor.graph.container;
		$(container).find(".graphtable").remove();
	};

	self.showCiTable = function(){
		graph.utils.showCiTable(self.editor.graph, CI_TABLE_LIB, function(){
			self.editor.zoomLock = true;
		});
	};

	self.showKpiTable = function(){
		var result = null;

		//CACHE.neo4jid = 10493;
		if(CACHE.viewid){
			result = graph.api.getViewThreshol(CACHE.viewid);
			if(graph.utils.isTrueRet(result)){
				graph.utils.showKpiTable(self.editor.graph.container, result.data, CACHE.viewid);
				self.editor.zoomLock = true;
			}else{
				alert(result.message);
			}
		}else{
			alert("请先打开视图再操作！");
		}
	};

	self.resize = function(){
		self.editor.graph.zoomToCenter();
	};
	
	// right
	self.contextMenu = {
		vertex:[
			DEFINE.MENU_CELL_COPY,
			DEFINE.MENU_CELL_CUT,
			DEFINE.MENU_CELL_DELETE,
			DEFINE.MENU_STYLE,
			[
				DEFINE.MENU_FILL_COLOR,
				DEFINE.MENU_FONT_COLOR,
				DEFINE.MENU_STROKE_COLOR,
				'-',
				DEFINE.MENU_STROKE_WIDTH,
				DEFINE.MENU_FONT_SIZE,
				DEFINE.MENU_FONT_FAMILY,
				DEFINE.MENU_OPACITY,
				DEFINE.MENU_SHADOW,
				DEFINE.MENU_CHANGE_IMAGE
			],
			'-',
			DEFINE.MENU_CONFIG_INFO,
			{name: DEFINE.MENU_OPEN_CHILD, aliases: "遍历关联对象"},
			'-',
			DEFINE.MENU_VIEW_RELATION,
			[
				DEFINE.MENU_VIEW_RELATION_ADD,
				DEFINE.MENU_VIEW_RELATION_OPEN,
				DEFINE.MENU_VIEW_RELATION_RM
			]
		],
		edge: [
			DEFINE.MENU_CELL_COPY,
			DEFINE.MENU_CELL_CUT,
			DEFINE.MENU_CELL_DELETE,
			DEFINE.MENU_STYLE,
			[
				DEFINE.MENU_FILL_COLOR,
				DEFINE.MENU_FONT_COLOR,
				DEFINE.MENU_STROKE_COLOR,
				'-',
				DEFINE.MENU_STROKE_WIDTH,
				DEFINE.MENU_FONT_SIZE,
				DEFINE.MENU_FONT_FAMILY,
				DEFINE.MENU_OPACITY,
				DEFINE.MENU_SHADOW,
				DEFINE.MENU_CHANGE_IMAGE
			],
			'-',
			DEFINE.MENU_CONFIG_INFO,
			{name: DEFINE.MENU_OPEN_CHILD, aliases: "遍历关联对象"},
			'-',
			DEFINE.MENU_VIEW_RELATION,
			[
				DEFINE.MENU_VIEW_RELATION_ADD,
				DEFINE.MENU_VIEW_RELATION_OPEN,
				DEFINE.MENU_VIEW_RELATION_RM
			],
			'-',
			DEFINE.MENU_RELATION_CREATE
		],
		canvas: [
			
			DEFINE.MENU_VIEW_UPDATE,
			{name: DEFINE.MENU_VIEW_SAVE, aliases: "另存视图"},
			
			{name: DEFINE.MENU_EXPORT,  aliases: "导出视图"},
			[
				DEFINE.MENU_EXPORT_PNG,
				DEFINE.MENU_EXPORT_PDF,
				DEFINE.MENU_EXPORT_XML
			],
			{name: DEFINE.MENU_VIEW_NEW_WINDOW, aliases: "打开监控视图" },
			DEFINE.MENU_VIEW_URL,

			"-",
			
			DEFINE.MENU_GRAPH_CLEAR,
			DEFINE.MENU_CELL_PASTE,
			"-",
			DEFINE.MENU_LAYOUT,
			[
				DEFINE.MENU_LAYOUT_H,
				DEFINE.MENU_LAYOUT_V,
				DEFINE.MENU_LAYOUT_O,
				DEFINE.MENU_LAYOUT_C,
				// DEFINE.MENU_LAYOUT_L,
				DEFINE.MENU_LAYOUT_SV,
				DEFINE.MENU_LAYOUT_SH
			],
			
			DEFINE.MENU_ZOOM,
			[
				DEFINE.MENU_ZOOMIN,
				DEFINE.MENU_ZOOMOUT,
				DEFINE.MENU_ZOOMFIT,
				DEFINE.MENU_ZOOMACTUAL
			],
			
			DEFINE.MENU_BACKGROUND,
			[
				DEFINE.MENU_BACKGROUND_IMG_SET,
				DEFINE.MENU_BACKGROUND_IMG_RM
			],
			DEFINE.MENU_MODULE,
			[
				DEFINE.MENU_MODULE_TAG,
				DEFINE.MENU_MODULE_ORI
			],
			'-',

			{name: DEFINE.MENU_BACK_PARENT_VIEW, aliases: "返回上级视图"}
		],
		libs: DEFINE.GRAPH_CONTEXT_MENU_LIBS
	};
	
})(nameSpace.reg("graph.viewManagement"));
