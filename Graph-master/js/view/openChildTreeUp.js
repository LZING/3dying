(function(self){
	
	"use strict";
	
	var editor = null,
		isTo = null,
		test = null,
		addListener = null,
		heightLightCell = null,
		heightLight = null,
		updateMonitor = null,
		alertStyleWidth = 24,
		alertStyleHeight = 24,
		htmlStyle = "",
		alertStyle = "",
		ids = [],
		displayMonitor = null,
		updateMonitor = null,
		timeout = 30000,
		loopMonitor = null,
		getColor = null,
		getData = null,
		getCiData = null,
		initCategory = null,
		cate = {},
		show = null,
		hide = {},
		oHide = {},
		handle = null,
		filterNode = null,
		filterList = null,
		initLevel = null,
		oLevel = null,
		filterLevel = null,
		levelHide = {},
		cells = null,
		opacity = null,
		getDetailData1 = null,
		getDetailData2 = null,
		lastOpacityCells = null,
		initSelect = null,
		currLevel = null,
		initParams = null,
		pids = null,
		type = null,
		toolbarInit = null,
		toolbar = null,
		showCiTable = null,
		CI_TABLE_LIB = {},
		showGraph = null,
		draw = null;

	filterList = ["bizservice"];

	htmlStyle = "html=1;strokeColor=#99CCFF; strokeWidth=1;movable=0;";
	alertStyle = "ellipse;strokeWidth=none;strokeColor=none;movable=0;";

	getCiData = function(){
		var obj = {},
			result = null;

		// 跳用后台接口
		ids.each(function(){
			var levels = [1, 2, 3, 4, 6];
			obj[this] = {
				execpt: graph.utils.randint(1, 10),
				monitor: graph.utils.randint(1, 10),
				alarm: graph.utils.randint(1, 10),
				alarmLevel: levels[graph.utils.randint(0, levels.length-1)],
				execptLevel: levels[graph.utils.randint(0, levels.length-1)]
			};
		});

		//return obj;

		result = mmdb.alarm.queryEventByCIs(ids);
		if(graph.utils.isTrueRet(result)){
			obj = result.data;
		}

		return obj;
	};

	getDetailData1 = function(id, viewid){
		var data = null,
			result = null;

		/*
		 return [
		 ["关键集成点", "数据量-预警", "运行时间-预警" ,"数据质量", "最新运行状态", "更多"],
		 ["TableA 到 tableB",1, 0, 1, "SUCCESS", '<a href="#">更多</a>', 2],
		 ["TableB 到 tableD",0, 0, 0, "RUNNING", '<a href="#">更多</a>', 3],
		 ["TableE 到 tableF",0, 2, 0, "FAILED", '<a href="#">更多</a>', 6],
		 ];
		 */

		result = mmdb.alarm.queryPerfData(id, viewid);
		if(graph.utils.isTrueRet(result)){
			data = result.data;
		}else{
			throw new Error(result.message);
		}

		return data;
	};

	getDetailData2 = function(){
		var result = null,
			data = null;

		result = mmdb.alarm.queryEventByCI(id);
		if(graph.utils.isTrueRet(result)){
			data = result.data;
		}else{
			throw new Error(result.message);
		}

		return data;
	};

	oLevel = {
		1 : "images/alert/5.png",
		2 : "images/alert/4.png",
		3 : "images/alert/3.png",
		4 : "images/alert/2.png",
		5 : "images/alert/1.png"
	};

	filterLevel = function(filter){
		var cells = null,
			alarmLevel = null,
			i = 0,
			cell = null,
			key = null;

		cells = editor.graph.getChildVertices();

		for(i=0; i<cells.length; i++){
			cell = cells[i];
			if(cell.id.indexOf("ci_") >= 0){
				alarmLevel = editor.graph.getCellAttr(cell, "alarmLevel");
				if(levelHide[alarmLevel]){
					oHide[cell.id.split("_")[1]] = true;
				}else{
					delete oHide[cell.id.split("_")[1]];
				}
			}
		}

		editor.graph.refresh();
		opacity();
	};

	initSelect = function(){
		var html = "",
			i = 0,
			container = null,
			selectContainer = null,
			list = [];

		for(i=1; i<=9; i++){
			list.push(i);
		}

		html = graph.utils.render("share/deLevel.html", {
			list: list,
			currLevel: currLevel
		});

		$("#main").find(".left").append(html);
		container = $("#main").find(".left").find(".selectLevel");
		selectContainer = container.find("select");

		container.find("input[type=button]").click(function(){
			var url = "";

			url = [
				"openChildTree.html?a=a",
				"&id=" + id,
				"&type=" + "min",
				"&level=" + selectContainer.val()
			].join("");

			location.href = url;
		});
	};

	initLevel = function(){
		var html = "",
			container = null;

		html = graph.utils.render("share/level.html", {
			list: oLevel
		});

		$("#main").find(".left").append(html);
		container = $("#main").find(".left").find(".levellist");

		container.find("input[level]").each(function(){
			$(this).click(function(){
				if($(this).is(":checked")){
					delete levelHide[$(this).attr("level")];
				}else{
					levelHide[$(this).attr("level")] = true;
				}
				filterLevel(levelHide);
			});
		});

		container.find("input[name=all]").click(function(){
			var isChecked = false;

			if($(this).is(":checked")){
				isChecked = true;
			}

			container.find("input[level]").each(function(){
				$(this).attr("checked", isChecked);

				if(isChecked){
					delete levelHide[$(this).attr("level")];
				}else{
					levelHide[$(this).attr("level")] = true;
				}
			});

			filterLevel(levelHide);
		});
	};

	filterNode = function(obj, id){
		var filter = [],
			i = 0,
			ii = 0,
			arr = [],
			key = "",
			result = null,
			filterID = [];

		result = mmdb.ci.information.getByNeoId(id);

		for(i=0; i<obj.node.length; i++){
			if(obj.node[i]._categoryId_ == result.data._categoryId_  && obj.node[i]._neo4jid_ != id){
				filterID.push(obj.node[i]._neo4jid_);
				obj.node.splice(i, 1);
				i--;
			}
		}

		for(ii=0; ii<obj.relation.length; ii++){
			arr = obj.relation[ii].split("_");
			if(filterID.inArray(Number(arr[0])) || filterID.inArray(Number(arr[2]))){
				obj.relation.splice(ii, 1);
				ii--;
			}
		}

	};

	initCategory = function(list){
		var i = 0,
			container = null,
			obj = {},
			allCheck = null,
			getHideList = null,
			html = "";

		getHideList = function(){
			var obj = {};
			container.find("input[catename]").each(function(){
				var key = $(this).attr("catename"),
					i = 0;

				if(!$(this).is(":checked")){
					for(i=0; i<cate[key].length; i++){
						obj[cate[key][i]] = true;
					}
				}
			});

			return obj;
		};

		for(i=0; i<list.length; i++){
			if(!cate[list[i]._categoryId_]){
				cate[list[i]._categoryId_] = [];
			}
			cate[list[i]._categoryId_].push(list[i]._neo4jid_);
		}

		for(i in cate){
			obj[i] = graph.ICO[i];
		}

		html = graph.utils.render("share/cate.html", {
			list: obj
		});

		$("#main").find(".left").append(html);
		container = $("#main").find(".left").find(".catelist");
		allCheck = container.find("input[name=all]");
		container.find("input[catename]").each(function(){
			var catename = $(this).attr("catename"),
				ciids = cate[catename];

			$(this).click(function(){
				var allSelect = true;

				container.find("input[catename]").each(function(){
					if(!$(this).is(":checked")){
						allSelect = false;
					}
				});

				if($(this).is(":checked")){
					if(allSelect){
						allCheck.attr("checked", true);
					}
				}else{
					allCheck.attr("checked", false);
				}

				hide = getHideList();
				// editor.graph.refresh();
				opacity();
			});
		});

		allCheck.click(function(){
			var isChecked = false;
			if($(this).is(":checked")){
				isChecked = true;
			}
			container.find("input[catename]").each(function(){
				$(this).attr("checked", isChecked);
			});

			hide = getHideList();
			// editor.graph.refresh();
			opacity();
		});
	};

	getData = function(){
		var result = null,
			dep = null,
			ciid = null,
			filter = null,
			cate = null;

		ciid = pids;

		filter = [
			"bizservice",
			"Cluster",
			"UnixOS",
			"Hypervisor",
			"X86OS",
			"ApplicationSoftware",
			"NASLogicalServer",
			"NASPhysicalServer",
			"DB",
			"Middleware",
			"X86PhysicalHost"
		];

		if(type == "min"){
			cate = {};
			filter.each(function(){
				cate[this] = {"*": "*"};
			});
			cate = JSON.stringify(cate);
		}

		dep = {down:0, up: currLevel};
		result = mmdb.relation.ciinformation.queryCiRelationByIds(ciid, null, cate, dep);
		if(graph.utils.isTrueRet(result)){
			$.each(ciid, function(){
				//filterNode(result.data, this);
			});
			return result.data;
		}else{
			alert(result.message);
		}
	};
	
	draw = function(data){
		var i = 0,
			parent = null,
			model = null,
			v1 = null,
			v2 = null,
			arr = [],
			type = "ci",
			style = "",
			ids = [],
			id = "",
			ii = 0;

		parent = editor.graph.getDefaultParent();
		model = editor.graph.getModel();
		model.beginUpdate();

		try {
			for(i=0; i<data.node.length; i++){
				if(!editor.graph.getCellByID([type, data.node[i]._neo4jid_].join("_"))){
					style = 'image;image=' + graph.ICO[data.node[i]._categoryId_];
					id = [type, data.node[i]._neo4jid_].join("_");
					editor.graph.insertVertex(
						parent,
						id,
						data.node[i]._id_,
						0,
						0,
						DEFINE.INFO_dragWidth,
						DEFINE.INFO_dragHeight,
						style
					);
				}

				CI_TABLE_LIB[data.node[i]._neo4jid_] = data.node[i];
				ids.push(data.node[i]._neo4jid_);
			}
						
			for(ii=0; ii<data.relation.length; ii++){
				arr = data.relation[ii].split("_");
				v1 = editor.graph.getCellByID([type, arr[0]].join("_"));
				v2 = editor.graph.getCellByID([type, arr[2]].join("_"));
				
				if(v1 && v2){
					editor.graph.insertEdge(
						parent,
						graph.utils.randstr(),
						arr[1],
						v1,
						v2
					);
				}
			}
		} finally {
			model.endUpdate();
		}
		
		graph.utils.executeLayout(
			editor.graph,
			new mxHierarchicalLayout(
				editor.graph,
				mxConstants.DIRECTION_NORTH
			),
			true,
			true
		);

		editor.graph.refresh();
		editor.graph.zoomToCenter();
	};
	
	isTo = function(arr, targetID){
		var i=0,
			ret = false;
		
		if(Array.isArray(arr)){
			for(i=0; i<arr.length; i++){
				if(arr[i].source.id === targetID || arr[i].target.id === targetID){
					ret = true;
					break;
				}
			}
		}else{
			ret = false;
		}
		
		return ret;
	};
	
	test = function(){
		window.result = {
			data:{
				node:[
					{
						_categoryId_: "网络设备",
						_id_ : "哈哈1",
						_neo4jid_ : 83
					},
					{
						_categoryId_: "网络设备",
						_id_ : "哈哈2",
						_neo4jid_ : 82
					},
					{
						_categoryId_: "网络设备",
						_id_ : "哈哈3",
						_neo4jid_ : 81
					}
				],
				
				relation:[
					"81_包含_83",
					"82_发起_83"
				]
			}
		};
	};
	
	addListener = function(){
		editor.graph.addListener(mxEvent.CLICK, function(sender, evt) {
			var id = null,
				e = null,
				data = null,
				cell = null;
			// mouse event
			e = evt.getProperty('event');
			
			// cell may be null
			cell = evt.getProperty('cell');
			
			if (e.which == 1) {
				editor.graph.removeLight();
				editor.graph.clearSelection();
				if (cell != null && cell.id.indexOf("ci_")>=0) {
					id = cell.id.split("_")[1];
					data = data = graph.utils.format1(getDetailData1(id, null));
					graph.showDetail(cell, e, data, editor.graph.container, function() {
						editor.graph.removeLight();
					});

					editor.graph.addLight(cell);
					// Do something useful with cell and consume the event
					evt.consume();
				}

				if(cell && cell.id.indexOf("in_") >= 0){
					parent = cell.getParent();
					if(parent && parent.id.substr(0, 3) == "ci_"){
						data = graph.utils.format2(getDetailData2(parent.id.split("_")[1]));
						graph.showDetail(cell, e, data, editor.graph.container, function() {
							editor.graph.removeLight();
							editor.zoomLock = false;
						});
						editor.graph.addLight(cell, "ellipse;");
						editor.zoomLock = true;
						evt.consume();
					}
				}
			}
		});
	};
	
	updateMonitor = function(obj){
		var i = "",
			ii = 0,
			cell = null,
			style = "",
			ret = null,
			container = null;

		for(i in obj){
			cell = editor.graph.getCellByID("ci_" + i);
			if(cell && cell.vertex){
				style = alertStyle + "fillColor=" + getColor(obj[i].alarmLevel).bg + ";fontColor="+getColor(obj[i].alarmLevel).fc;
				if(cell.children && cell.children.length>=1){
					for(ii=0; ii<cell.children.length; ii++){
						if(cell.children[ii].id.indexOf("in_") >= 0){
							cell.children[ii].setValue(obj[i].alarm);
							editor.graph.setCellAttr(cell, "alarmLevel", String(obj[i].alarmLevel));
							cell.children[ii].setStyle(style);
							editor.graph.refresh(cell.children[ii]);
						}
					}
				}
			}else if(cell && cell.edge){
				style = cell.getStyle();
				style = style ? style : "";
				ret =  /strokeColor=(#?\w+){1,10}/.exec(style);
				if(ret && ret[0]){
				 	style = style.replace(
				 		ret[0],
				 		"strokeColor=" + getColor(obj[i].alarmLevel).bg
				 	);
				}else{
					if(style && style[style.length-1] != ";"){
						style += ";";
					}
					style += "strokeColor=" + getColor(obj[i].alarmLevel).bg + ";";
				}
				
			 	cell.setStyle(style);
			 	editor.graph.refresh(cell);
			}
		}
	};
	
	displayMonitor = function(){
		var cells = [],
			obj = {},
			html = "";
		
		ids = [];
		cells = editor.graph.getDepCells();
		
		cells.each(function(){
			var _this = this,
				newGeometry = null,
				geometry = null;
				
			geometry = _this.getGeometry();
			
			if(_this.id.indexOf("ci_") >= 0){
				ids.push(_this.id.split("_")[1]);
				if(_this.vertex){
					editor.graph.insertVertex(
						_this,
						"in_" + graph.utils.randstr(),
						"1",
						Number("-" + alertStyleWidth/2),
						Number("-" + alertStyleHeight/2),
						alertStyleWidth,
						alertStyleHeight,
						alertStyle
					);
				}
			}
		});
	};
	
	opacity = function(){
		var all = null,
			cells = [];
		
		if(lastOpacityCells){
			editor.graph.setCellStyles(mxConstants.STYLE_OPACITY, 100, lastOpacityCells);
		}
		
		all = editor.graph.getChildVertices();
		
		all.each(function(){
			var cell = this,
				key = null,
				i = 0;
				
			if(cell.id.indexOf("ci_") >= 0){
				key = cell.id.split("_")[1];
				if(hide[key] || oHide[key]){
					cells.push(cell);
					if(cell.children){
						for(i=0; i<cell.children.length; i++){
							if(cell.children[i].id.indexOf("in_") >= 0){
								cells.push(cell.children[i]);
							}
						}
					}
					
					if(cell.edges){
						for(i=0; i<cell.edges.length; i++){
							cells.push(cell.edges[i]);
						}
					}
				}
			}
		});
		
		editor.graph.setCellStyles(mxConstants.STYLE_OPACITY, 30, cells);
		lastOpacityCells = cells;
	};

	handle = function(graph){
		graph.isCellVisible = function(cell){
			var key = "",
				opacity = 50,
				cells = [],
				result = null;

			result = mxGraph.prototype.isCellVisible.apply(this, arguments);

			if(result && cell.id.indexOf("ci_") >= 0){
				key = cell.id.split("_")[1];
				result = hide[key] || oHide[key] ? false : true;

				result = true;
				
			}
			return result;
		};
	};

	initParams = function(){
		pids = urlParams.ids.split("_");
		type = urlParams.type ? urlParams.type : "min";
		currLevel = urlParams.level ? Number(urlParams.level) : 9;
	};

	toolbarInit = function(){
		var $main = $("#toolbar");
		$main.show();
		toolbar = new Toolbar({
			editor: editor,
			showCiTable: showCiTable,
			showGraph: showGraph
		}, $main);
	};

	showGraph = function(){
		var container = null;
		container = editor.graph.container;
		$(container).find(".graphtable").remove();
	};

	showCiTable = function(){
		graph.utils.showCiTable(editor.graph, CI_TABLE_LIB);
	};
	
	self.graph = self.graph || {};
	self.graph.onload = function(){
		var mainContainer = null,
			leftContainer = null,
			rightContainer = null,
			data = null;
		
		$(document.body).height($(window).height());
		mainContainer = $("#main");
		leftContainer = mainContainer.find(".left");
		rightContainer = mainContainer.find(".right");
		mainContainer.height($(window).height());
		leftContainer.height($(window).height()-$(".header").height());
		rightContainer.height($(window).height()-$(".header").height());
		editor = graph.utils.getEditor(rightContainer[0]);
		editor.graph.setEnabled(false);
		editor.graph.setConnectable(false);
		editor.graph.setDropEnabled(false);
		editor.graph.container.style.background = "#FFF";
		handle(editor.graph);
		toolbarInit();

		getColor = graph.utils.getLevelColor;
		//urlParams.id = 38;
		if(urlParams.ids){
			addListener();
			initParams();
			data = getData();
			initSelect();
			initLevel();
			initCategory(data.node);
			draw(data);
			cells = editor.graph.getDepCells();

			displayMonitor();
			loopMonitor = window.setInterval(function(){
				updateMonitor(getCiData());
				filterLevel();
				opacity();
			}, timeout);
			updateMonitor(getCiData());
		}
		window.g = editor.graph;
	};
	
})(this);
