(function(self){
	
	"use strict";
	
	var tree = null,
		isHtmlCell = true,
		oriGraphHeight = null,
		displayMonitor = null,
		width = 100,
		height = 80,
		updateMonitor = null,
		ids = [],
		loopMonitor = null,
		timeout = 1000 * 60 * 5,
		alertStyleWidth = 24,
		alertStyleHeight = 24,
		htmlStyle = "",
		alertStyle = "",
		getColor = null,
		rightMenu = null,
		addListener = null,
		openView = null,
		showIn = null,
		htmlCell = null,
		removeCellOverlays = null,
		group = {},
		groupCell = null,
		initIds = null,
		openNeo4jid = null,
		getData = null,
		initTimeline = null,
		timeline = null,
		collspace,
		updateColor = null,
		themeState = "white",
		themeEvent = null,
		themes = null,
		historyState = false,
		historyData = null,
		getDetailData1 = null,
		getDetailData2 = null,
		showDetail = null,
		eipLib = {},
		initEip = null,
		clearAlertDialog = null,
		removeTicketSize = null,
		addTicketSize = null,
		ticketStyle = null,
		getDetailData3 = null,
		openChild,
		filter = {},
		topBtns = [],
		initTopBts = null,
		showHtmlLabel = null,
		hideHtmlLabel = null,
		valueRem = {},
		openXml = null,

		upDateCiTableLib = null,
		CI_TABLE_LIB = null,
		showGraph = null,
		showKpiTable = null,
		showCiTable = null,
		autoSwitching = null,

		initDate = null,
		startTime = null,
		endTime = null,
		currTimePoint = null,
		opacity = null,
		lastOpacityCells = null,
		initChart = null,
		depRela = [],
		depXml = [],
		buildUI,
		editor = null;

	htmlStyle = "html=1;strokeColor=#03B0ED; strokeWidth=1;movable=0;";
	alertStyle = "ellipse;strokeWidth=none;strokeColor=none;movable=0;";
	ticketStyle = "ellipse;strokeWidth=none;strokeColor=none;fillColor=#FF8C00;fontColor=#FFFFFF;movable=0";


	self.graph = self.graph || {};

	showGraph = function(){
		var container;
		editor.zoomLock = false;
		container = editor.graph.container;
		$(container).find(".graphtable").remove();
	};

	showKpiTable = function(){
		var result = null;
		if(openNeo4jid){
			result = graph.api.getViewThreshol(openNeo4jid);
			if(graph.utils.isTrueRet(result)){
				graph.utils.showKpiTable(editor.graph.container, result.data, openNeo4jid);
				editor.zoomLock = true;
			}else{
				alert(result.message);
			}
		}else{
			alert("请先打开视图再操作！");
		}
	};

	showCiTable = function(){
		if(openNeo4jid){
			graph.utils.showCiTable(editor.graph, CI_TABLE_LIB, function(){
				editor.zoomLock = true;
			});
		}else{
			alert("请先打开视图再操作！");
		}
	};

	autoSwitching = function(){
		if(openNeo4jid){
			window.open("index-biztras.html?viewid=" + openNeo4jid);
		}
	};

	initDate = function(){
		var currTime = null;
		if(currTimePoint){
			currTime = (new Date(timeline.nowTime - currTimePoint * 60 * 1000)).getTime();
			startTime = graph.utils.unix_to_datetime(currTime - 60 * 1000 * 5);
			endTime = graph.utils.unix_to_datetime(currTime);

		}else{
			currTime = (new Date(timeline.nowTime)).getTime();
			startTime = graph.utils.unix_to_datetime(currTime - 60 * 1000 * 5);
			endTime = graph.utils.unix_to_datetime(currTime);
		}
	};

	opacity = function(){
		var all,
			cells = [];

		if(lastOpacityCells){
			editor.graph.setCellStyles(mxConstants.STYLE_OPACITY, 100, lastOpacityCells);
			$.each(lastOpacityCells, function(){
				if(typeof valueRem[this.id] !== "undefined"){
					this.setValue(valueRem[this.id]);
				}
			});
		}

		valueRem = {};
		all = editor.graph.getDepCells();

		all.each(function(){
			var cell = this;

			if(filter[cell.id]){
				cells.push(cell);
				if(cell.edge || cell.id.indexOf("in_") === 0 || cell.id.indexOf("ticket_") === 0){
					valueRem[cell.id] = cell.getValue();
					cell.setValue("");
				}
			}
		});

		editor.graph.setCellStyles(mxConstants.STYLE_OPACITY, 0, cells);
		lastOpacityCells = cells;
	};

	showHtmlLabel = function(cells){
		$.each(cells, function(){
			var $container = $("#cell_" + this.id);
			if($container.length >= 1){
				$container.find(".rows").show();
				this.setValue($container[0].outerHTML);
			}
		});
	};

	hideHtmlLabel = function(cells){
		$.each(cells, function(){
			var $container = $("#cell_" + this.id);
			if($container.length >= 1){
				$container.find(".rows").hide();
				this.setValue($container[0].outerHTML);
			}
		});
	};

	initTopBts = function(){
		var offsetX = 10,
			$main = $(document.createElement("div"));

		$("#toolbar").append($main).addClass("text-right");
		$main.css({
			"position": "relative",
			"top": "4px",
			"padding": "0 10px"
		});

		$.each(topBtns, function(i){
			var btn = document.createElement("button"),
				icon = document.createElement("i"),
				btnClass,
				_this = this;

			icon.className = _this.icon;
			btn.innerHTML = [icon.outerHTML, _this.text].join(" ");
			btnClass = _this.btn ? _this.btn : "primary" ;
			btn.className = "top-btn btn btn-xs btn-" + btnClass;
			btn.style.left = (i * 90 + offsetX) + "px";
			if(_this.margin){
				btn.style.marginLeft = _this.margin + "px";
			}
			$(btn).click(function(){
				_this.func();
				opacity();
				editor.graph.refresh();
			});
			$main.append(btn);
		});
	};

	topBtns = [
		{
			text: "全部显示",
			icon: "fa fa-align-justify",
			btn: "warning",
			func: function(){
				filter = {};
				showHtmlLabel(editor.graph.getDepCells());
			}
		},
		{
			text: "应用组件",
			icon: "fa fa-th",
			func: function(){
				var cells = editor.graph.getDepCells();
				filter = {};
				$.each(cells, function(){
					if(this.edge || this.id.indexOf("ticket_") === 0 || this.id.indexOf("in_") === 0){
						filter[this.id] = true;
					}
				});

				hideHtmlLabel(cells);
			}
		},
		{
			text: "集成关系",
			icon: "fa fa-retweet",
			func: function(){
				var cells = editor.graph.getDepCells();
				filter = {};
				$.each(cells, function(){
					if(this.id.indexOf("ticket_") === 0 || this.id.indexOf("in_") === 0){
						filter[this.id] = true;
					}
				});

				hideHtmlLabel(cells);
			}
		},
		{
			text: "预警指标",
			icon: "fa fa-bar-chart-o",
			func: function(){
				var cells = editor.graph.getDepCells();
				filter = {};
				$.each(cells, function(){
					if(this.id.indexOf("ticket_") === 0 || this.id.indexOf("in_") === 0){
						filter[this.id] = true;
					}
				});
				showHtmlLabel(cells);
			}
		},
		{
			text: "监控报警",
			icon: "fa fa-warning",
			func: function(){
				var cells = editor.graph.getDepCells();
				filter = {};
				$.each(cells, function(){
					if(this.id.indexOf("ticket_") >= 0){
						filter[this.id] = true;
					}
				});

				showHtmlLabel(cells);
			}
		},
		{
			text: "事件工单",
			icon: "fa fa-file-text-o",
			func: function(){
				filter = {};
				showHtmlLabel(editor.graph.getDepCells());
			}
		},
		{
			text: "图形模式",
			icon: "fa fa-photo",
			btn: "success",
			margin: 10,
			func: showGraph
		},
		{
			text: "配置信息",
			icon: "fa fa-table",
			btn: "success",
			func: showCiTable
		},
		/*
		{
			text: "监控指标",
			icon: "fa fa-toggle-on",
			btn: "success",
			func: showKpiTable
		},
		*/
		{
			text: "自动切换",
			icon: "fa fa-retweet",
			btn: "success",
			func: autoSwitching
		}
	];

	themes = {
		white: {
			fc: "#000000",
			bg: "#FFFFFF"
		},
		black: {
			fc: "#FFFFFF",
			bg: "#000000"
		}
	};

	clearAlertDialog = function(){
		$(editor.graph.container).find(".alert-dialog").remove();
	};

	initEip = function(){
		var edges,
			result = null,
			update,
			randint = null,
			test,
			eipCells = [],
			eipIds = [];

		randint = graph.utils.randint;
		update = function(){
			eipCells.each(function(){
				if(eipLib[this.id]){
					editor.graph.setCellStyles(
						mxConstants.STYLE_STROKECOLOR,
						graph.utils.getEipColor(eipLib[this.id].status),
						//graph.utils.getEipColor(-1),
						[this]
					);
				}
			});

			editor.graph.refresh(eipCells);
		};

		edges = editor.graph.getDepEdges();
		edges.each(function(){
			if(this.id.indexOf("_eip_") >= 0){
				eipIds.push(this.id);
				eipCells.push(this);
			}
		});

		test = function(){
			eipIds.each(function(){
				eipLib[this] = {
					id: this,
					error: randint(0, 4),
					status: randint(0,2)-1,
					success: randint(0, 4),
					bw: {
						"error": 0,
						"source": "commonservice(commonservice)",
						"request": [
							{
								"processname": "CoreServices/BusinessServices/02.ProcessesNonePub/CFG2CommonService/v001/Dyna/RqTransform.process",
								"error": 0,
								"projectname": "CFG",
								"success": 0
							},
							{
								"processname": "CoreServices/BusinessServices/02.ProcessesNonePub/CFG2CommonService/v001/Dyna/RqTransform.process",
								"error": 0,
								"projectname": "CFG",
								"success": 0
							}
						],
						"target": "cfg(cfg liveupdate)",
						"success": 0
					}
				};

				//eipLib[this].art = eipLib[this].bw;
				eipLib[this].art = {};
			});
		};

		if(eipIds.length >= 1){
			try{
				result = graph.api.getEips(eipIds);
				if(graph.utils.isTrueRet(result)){
					eipLib = result.data;
					update();
				}
			}catch(e){
				test();
				update();
			}
		}
	};

	getDetailData3 = function(id){
		var result,
			data = null;

		result = graph.api.getCiTicket(id);
		if(graph.utils.isTrueRet(result)){
			data = result.data;
		}else{
			throw new Error(result.message);
		}

		return data;
	};

	getDetailData2 = function(id){
		var result,
			data;

		result = graph.api.queryEventDataByCI(id,startTime,endTime);
		if(graph.utils.isTrueRet(result)){
			data = result.data;
		}else{
			throw new Error(result.message);
		}

		return data;
	};

	getDetailData1 = function(id){
		var data = null,
			currTime = null,
			endTime = null,
			isTest = true,
			result;

		if(isTest){
			return {
				head: ["关键集成点", "数据量-预警", "运行时间-预警" ,"数据质量", "最新运行状态", "更多"],
				row: [
					["TableA 到 tableB",1, 0, 1, "SUCCESS", '<a href="#">更多</a>', 1],
					["TableB 到 tableD",0, 0, 0, "RUNNING", '<a href="#">更多</a>', 2],
					["TableE 到 tableF",0, 2, 0, "FAILED", '<a href="#">更多</a>', 6]
				]
			};
		}

//		if(historyState && historyData[id] && historyData[id].detail){
//			data = historyData[id].detail;
//		}else{
//			result = graph.api.getPerf(id, viewid);
//			if(graph.utils.isTrueRet(result)){
//				data = result.data;
//			}else{
//				throw new Error(result.message);
//			}
//		}

		if(currTimePoint){
			currTime = (new Date(timeline.nowTime - currTimePoint * 60 * 1000)).getTime();
			endTime = graph.utils.unix_to_datetime(currTime);
		}
		result = graph.api.queryPerfByCI(id, endTime);
		if(graph.utils.isTrueRet(result)){
			data = result.data;
		}else{
			throw new Error(result.message);
		}

		return data;
	};

	themeEvent = function(){
		$(".theme-btn-white").click(function(){
			themeState = "white";
			updateColor(themeState);
		});

		$(".theme-btn-black").click(function(){
			themeState = "black";
			updateColor(themeState);
		});
	};

	updateColor = function(theme){
		var cells = null,
			vertexs = [],
			swimlanes = [],
			color,
			$id = "",
			table = null,
			edges = [];

		color = themes[theme];
		if(color){
			cells = editor.graph.getDepCells();
			cells.each(function(){
				if(this.edge && this.id.indexOf("_eip_") === -1){
					edges.push(this);
				}
				if(this.vertex
						&& this.style
						&& this.style.indexOf("swimlane") === -1
						&& this.id.indexOf("in_") === -1){
					vertexs.push(this);
					$id = "#cell_" + this.id;
					table = $($id).find("table");
					if(table.length >= 1){
						table[0].className = themeState;
						this.setValue($("#cell_" + this.id)[0].outerHTML);
					}
				}

				if(this.style && this.style.indexOf("swimlane") >= 0){
					swimlanes.push(this);
				}
			});

			editor.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, color.fc, edges);
			editor.graph.setCellStyles(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, "none", edges);
			editor.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, color.fc, edges);
			editor.graph.setCellStyles(mxConstants.STYLE_LABEL_POSITION, color.fc, edges);
			editor.graph.setCellStyles(mxConstants.STYLE_SPACING_BOTTOM, 10, edges);

			editor.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, color.fc, swimlanes);
			editor.graph.setCellStyles(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, "none", vertexs);
			//editor.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, color.fc, vertexs);

			editor.graph.container.style.backgroundColor = color.bg;
		}
	};

	initTimeline = function(){
		timeline = Timeline({
			onload: function(){
				editor.graph.zoomToCenter();
			},
			clickedPoint: function(data, num){
				if(num === 0){
					window.clearInterval(loopMonitor);
					loopMonitor = window.setInterval(function(){
						updateMonitor(getData());
					}, timeout);
					updateMonitor(getData());
					historyState = false;
				}else{
					window.clearInterval(loopMonitor);
					loopMonitor = null;
					updateMonitor(data);
					historyState = true;
					historyData = data;
				}
				currTimePoint = num;
				initDate();
			},
			show: function(){
				if(showDetail){
					showDetail.resize();
				}
				editor.graph.zoomToCenter();
		        //当画布resize的时候重新绘制页面上的图表
		        initChart(editor);
			},
			hide: function(){
				window.clearInterval(loopMonitor);
				loopMonitor = window.setInterval(function(){
					updateMonitor(getData());
				}, timeout);
				updateMonitor(getData());
				editor.graph.zoomToCenter();
				historyState = false;
		                //当画布resize的时候重新绘制页面上的图表
		                initChart(editor);
		        },
			ids: ids,
			viewid: openNeo4jid,
			graph: editor.graph,
			oriGraphHeight: oriGraphHeight
		});

		timeline.show();
		initDate();
	};

	upDateCiTableLib = function(){
		var result,
			ids;

		ids = graph.utils.getGraphCiIds(editor.graph);
		result = graph.api.getCis(ids);
		if(graph.utils.isTrueRet(result)){
			CI_TABLE_LIB = result.data;
		}
	};

	getData = function(){
		var obj = {},
			isTest = true,
			result;

		if(isTest){
			ids.each(function(){
				obj[this] = {
					execpt: graph.utils.randint(1, 10),
					monitor: graph.utils.randint(1, 10),
					alarm: graph.utils.randint(1, 10),
					alarmLevel: graph.utils.randint(1, 5),
					ticketSize: graph.utils.randint(1, 5),
					execptLevel: graph.utils.randint(1, 5)
				};
			});
			return obj;
		}

		result = graph.api.queryEventPerfByCurrent(ids, 3600*1000*2, 30);
		if(graph.utils.isTrueRet(result)){
			obj = result.data[0].data;
		}
		return obj;
	};

	initIds = function(){
		var cells;
		ids = [];
		cells = editor.graph.getDepCells();
		cells.each(function(){
			if(this.id.indexOf("ci_") === 0){
				ids.push(this.id.split("_")[1]);
			}
		});
	};

	showIn = function(){
		var cells;
		cells = editor.graph.getDepVertexs();
		cells.each(function(){
			if(this.id.indexOf("in_") >= 0){
				editor.graph.model.setVisible(this, true);
			}
		});
	};

	removeCellOverlays = function(){
		var cells;
		cells = editor.graph.getDepVertexs();
		cells.each(function(){
			editor.graph.removeCellOverlays(this);
		});
	};

	groupCell = function(cell){
		var loop = null,
			key = null;

		if(cell.id.indexOf("ci_") === 0){
			key = cell.id.split("_")[1];
		}else{
			key = cell.id;
		}

		group[key] = [];

		loop = function(cells){
			var i;
			for(i=0; i<cells.length; i++){
				if(cells[i].id.indexOf("ci_") === 0){
					group[key].push(cells[i].id.split("_")[1]);
				}

				if(cells[i].children){
					loop(cells[i].children);
				}
			}
		};

		if(cell.children){
			loop(cell.children);
		}
	};

	collspace = function(){
		var cells,
			isShow = null;

		isShow = function(list){
			var loop = null;

			loop = function(cells){
				var ext = false,
					i;
				for(i=0; i<cells.length; i++){
					if(cells[i].id.indexOf("ci_") >= 0){
						ext = true;
						break;
					}

					if(cells[i].children){
						ext = loop(cells[i].children);
					}
				}

				return ext;
			};

			return loop(list);
		};

		cells = editor.graph.getChildVertices();
		cells.each(function(){
			var _this = this;

			if((_this.children && _this.collapsed && _this.id.indexOf("ci_") === -1 && isShow(_this.children))
					|| ( _this.collapsed && _this.id.indexOf("ci_") === 0 )){
				_this.setCollapsed(false);
				htmlCell(_this);
				groupCell(_this);
				if(_this.children){
					_this.children.each(function(){
						if(this.id.indexOf("in_") === -1){
							editor.graph.model.setVisible(this, false);
						}
					});
				}
			}
		});
	};

	addListener = function(){
		editor.graph.addListener(mxEvent.CLICK, function(sender, evt) {
			var id = 0,
				e,
				data = null,
				cell;

			// mouse event
			e = evt.getProperty('event');
			
			// cell may be null
			cell = evt.getProperty('cell');
			
			if (e.which == 1) {
				editor.graph.removeLight();
				editor.graph.clearSelection();
				if (cell && cell.id.substr(0, 3) == "ci_") {
					id = cell.id.split("_").pop();

					data = graph.utils.format1(getDetailData1(id, openNeo4jid));
					showDetail = graph.showDetail(cell, e, data, editor.graph.container, function() {
						editor.graph.removeLight();
					});


					//9-1add 在监控视图中，单击节点时，打开kpi显示窗口
					/*
					graph.showDashboard(editor.graph.container,[cell.getId()], {
						startTime: startTime,
						endTime: endTime
					});
					*/
					editor.graph.addLight(cell);
					// Do something useful with cell and consume the event
					evt.consume();
				}

				if (cell && cell.id.indexOf("header_ci_") === 0) {
					id = cell.id.split("_").pop();
					cell = editor.graph.getCellByID("ci_" + id);
					data = graph.utils.format1(getDetailData1(id, openNeo4jid));
					showDetail = graph.showDetail(cell, e, data, editor.graph.container, function() {
						editor.graph.removeLight();
					});

                    //9-1add 在监控视图中，单击节点时，打开kpi显示窗口
                    // graph.showDashboard(editor.graph.container,[cell.getId()]);
					editor.graph.addLight(cell);
					// Do something useful with cell and consume the event
					evt.consume();
				}

				if(cell && cell.id.indexOf("chart_") >= 0){
					graph.showDashboard(cell, e, data, editor.graph.container);
					evt.consume();
				}

				if(cell && cell.id.indexOf("in_") >= 0){
					id = cell.id.split("_").pop();
					data = graph.utils.format2(getDetailData2(id));
					showDetail = graph.showDetail(cell, e, data, editor.graph.container, function() {
						editor.graph.removeLight();
						editor.zoomLock = false;
					});
					editor.graph.addLight(cell, "ellipse;");
					editor.zoomLock = true;
					evt.consume();
				}

				if(cell && eipLib[cell.id]){
					data = graph.utils.format3(eipLib[cell.id]);
					showDetail = graph.showDetail(cell, e, data, editor.graph.container, function() {
						editor.graph.removeLight();
						editor.zoomLock = false;
					});
				}

				if(cell && cell.id.indexOf("ticket_") >= 0){
					id = cell.id.split("_").pop();
					data = graph.utils.format2(getDetailData3(id));
					showDetail = graph.showDetail(cell, e, data, editor.graph.container, function() {
						editor.graph.removeLight();
						editor.zoomLock = false;
					});
					editor.graph.addLight(cell, "ellipse;");
					editor.zoomLock = true;
					evt.consume();
				}
			}
		});
	};
	
	tree = function(){
		var jstree = null,
			$pub = $("#treeViewPub"),
			$pri = $("#treeViewPri");

		jstree = function($container, data){
			var div;
			div = document.createElement("div");
			$container.html(div);
			$(div).jstree({
				core : {data : data},
				plugins: ["wholerow", "crrm"]
			}).on('select_node.jstree', function(event, data) {
				if(data.node.original.view && data.event.which === 1){
					openNeo4jid = data.node.id;
					depRela = [];
					openView(data.node.id);
					window.depRela = depRela;
				}
			});

			graph.utils.jstreeEvent($(div));
		};

		jstree($pub, graph.viewManagement.getTreeDataPub());
		jstree($pri, graph.viewManagement.getTreeDataPri());

		$("#viewTreeRefreshPub").click(function(){
			$pub.html("刷新中...");
			window.setTimeout(function(){
				jstree($pub, graph.viewManagement.getTreeDataPub());
			}, 200);
		});

		$("#viewTreeRefreshPri").click(function(){
			$pri.html("刷新中...");
			window.setTimeout(function(){
				jstree($pri, graph.viewManagement.getTreeDataPri());
			}, 200);
		});
	};

	openXml = function(xml){

		filter = {};
		showGraph();
		graph.utils.openXml(editor, xml);
		upDateCiTableLib();

		initEip();
		clearAlertDialog();
		group = {};
		initIds();

		//collspace();
		removeCellOverlays();
		displayMonitor();
		showIn();
		if(loopMonitor){
			window.clearInterval(loopMonitor);
		}
		loopMonitor = window.setInterval(function(){
			updateMonitor(getData());
		}, timeout);
		updateMonitor(getData());
		updateColor(themeState);

		if(timeline){
			timeline.remove();
			timeline = null;
		}
		initTimeline();
		initChart(editor);
		editor.graph.setConnectable(false);

	};

	openView = function(viewid){
		var result = null;
		result = graph.api.getView(viewid);
		if(graph.utils.isTrueRet(result)){
			graph.loading.show();
			window.setTimeout(function(){
				openXml(result.data.xml);
			}, 200);
			graph.loading.hide();
		}else{
			graph.utils.alert(result.message);
		}
	};

	htmlCell = function(cell){
		var html = "",
			newGeometry,
			value = "",
			title = cell.value,
			geometry = null;

		if(isHtmlCell){
			geometry = cell.getGeometry();

			html = graph.utils.render("ciList/tree_cell.html", {
				width: width-2,
				height: height-2,
				title: cell.value,
				value: value,
				id: cell.id,
				row1Tag: "异常",
				row2Tag: "指标"
			});

			html = html.replaceAll("\n\r", "");

			cell.setStyle(htmlStyle);

			newGeometry = new mxGeometry(
				geometry.x,
				geometry.y,
				width,
				height
			);

			cell.setGeometry(newGeometry);
			cell.setValue(html);
			editor.graph.refresh(cell);


			editor.graph.insertVertex(
				cell.getParent(),
				"header_" + cell.id,
				title,
				geometry.x,
				geometry.y,
				width,
				height * 0.4,
				"fillColor=#03B0ED;fontColor=#FFFFFF;strokeColor=none;movable=0;overflow=hidden;"
			);

		}

		geometry = cell.getGeometry();

		editor.graph.insertVertex(
			cell.getParent(),
			"in_" + cell.id,
			"1",
			geometry.x - alertStyleWidth/2,
			geometry.y - alertStyleHeight/2,
			alertStyleWidth,
			alertStyleHeight,
			alertStyle
		);
	};
	
	displayMonitor = function(){
		var cells,
			rectangles = [],
			resizeCells = [];

		cells = editor.graph.getDepCells();
		cells.each(function(){
			var _this = this;

			if(_this.vertex && _this.id.indexOf("ci_") === 0
					&& _this.style
					&& _this.style.indexOf("html=1") === -1
					&& !_this.children){
				htmlCell(_this);
				resizeCells.push(_this);
				rectangles.push(new mxRectangle(
					_this.getGeometry().x,
					_this.getGeometry().y,
					width,
					height
				));
			}
		});

		if(isHtmlCell){
			editor.graph.resizeCells(resizeCells, rectangles);
		}

		editor.graph.orderCells(true, editor.graph.getDepEdges());
		editor.graph.refresh();
		editor.graph.zoomToCenter();
	};
	
	updateMonitor = function(obj){
		var i,
			cell,
			style = "",
			ret = null,
			updateVertices,
			updateTicketSize,
			container = null;

		updateVertices = function(cell, container, data){
			var style,
				inCell;

			if(container.length >= 1){
				container.find("tr:eq(0)").find("td span").html(data.execpt).css({
					"color" : getColor(data.execptLevel).bg
					//"background" : getColor(data.execptLevel).bg
				});

				container.find("tr:eq(1)").find("td span").html(data.monitor);
				cell.setValue(container[0].outerHTML);
			}

			style = alertStyle + "fillColor=" + getColor(data.alarmLevel).bg + ";fontColor="+getColor(data.alarmLevel).fc;
			inCell = editor.graph.getCellByID("in_" + cell.id);
			if(inCell){
				inCell.setStyle(style);
				inCell.setValue(data.alarm);
				editor.graph.refresh(inCell);
			}
		};

		updateTicketSize = function(cell, ticketSize){
			var ticketCell = editor.graph.getCellByID("ticket_" + cell.id);
			if(ticketCell){
				ticketCell.setValue(ticketSize);
			}else{
				addTicketSize(cell, ticketSize);
			}
		};

		/*
		for(key in group){
			if(!obj[key]){
				obj[key] = {
					execpt: 0,
					monitor: 0,
					alarm: 0,
					alarmLevel: 0,
					execptLevel: 0
				};
				cellid = key;
			}else{
				cellid = "ci_" + key;
			}

			group[key].each(function(){
				obj[key].execpt += obj[this].execpt;
				obj[key].monitor += obj[this].monitor;
				obj[key].alarm += obj[this].alarm;
				if(obj[this].alarmLevel > obj[key].alarmLevel){
					obj[key].alarmLevel = obj[this].alarmLevel;
				}

				if(obj[this].execptLevel > obj[key].execptLevel){
					obj[key].execptLevel = obj[this].execptLevel;
				}

				container = $("#cell_" + cellid);
				cell = editor.graph.getCellByID(cellid);
				updateVertices(cell, container, obj[key]);
			});
		}
		*/
		
		for(i in obj){
			cell = editor.graph.getCellByID("ci_" + i);
			
			if(cell && cell.vertex){
				container = $("#cell_ci_" + i);
				updateVertices(cell, container, obj[i]);
				/*
				if(obj[i].ticketSize){
					updateTicketSize(cell, obj[i].ticketSize);
				}else{
					removeTicketSize(cell);
				}
				*/

			}else if(cell && cell.edge){
				style = cell.getStyle();
				style = style ? style : "";
				ret =  /strokeColor=(#?\w+){1,10}/.exec(style);
				if(ret && ret[0]){
				 	style = style.replace(
				 		ret[0],
				 		"strokeColor=" + getColor(obj[i].execptLevel).bg
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

	removeTicketSize = function(cell){
		var ticketCell = editor.graph.getCellByID("ticket_" + cell.id);
		if(ticketCell){
			editor.graph.removeCells([ticketCell]);
		}
	};

	addTicketSize = function(cell, value){
		var geometry = cell.getGeometry();
		editor.graph.insertVertex(
			cell.getParent(),
			"ticket_" + cell.id,
			value,
			geometry.x + alertStyleWidth/2 + 5,
			geometry.y - alertStyleHeight/2,
			alertStyleWidth,
			alertStyleHeight,
			ticketStyle
		);
	};
	
	rightMenu = function(){
		var fn = "";

		fn = DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_THRESHOLD_UPDATE];
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_THRESHOLD_UPDATE] = function(evt, cell){
			fn(evt, cell, openNeo4jid);
		};

		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_VIEW_RELATION_OPEN] = function(evt, cell){
			var _this = this;
			graph.utils.selectViewForCell(_this, cell, "请输入序号打开相应视图", function(viewid){
				depXml.push(graph.utils.getXml(_this));
				openView(viewid);
				depRela.push(openNeo4jid);
				openNeo4jid = viewid;
			});
		};

		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_BACK_PARENT_VIEW] = function(){
			var viewid = 0,
				xml = null;
			if(depRela.length >= 1){
				viewid = depRela.pop();
				openNeo4jid = viewid;
				//openView(viewid);
				xml = depXml.pop();
				openXml(xml);
			}else{
				graph.utils.alert("错误：没有上级视图");
			}
		};

		new graphContextMenu(editor, {
			vertex:[
				{name: DEFINE.MENU_OPEN_CHILD_NEW_WINDOW, aliases: "查看基础设施"},
				DEFINE.MENU_VIEW_RELATION_OPEN,
				DEFINE.MENU_CONFIG_INFO
			],
			edge: [
			],
			canvas: [
				{name: DEFINE.MENU_BACK_PARENT_VIEW, aliases: "返回上级视图"}
			],
			libs: DEFINE.GRAPH_CONTEXT_MENU_LIBS
		});
	};
	
	openChild = function(cell, neo4jId, rs, term, dir, g){
		var result,
			onself = null,
			win = null;

		result = graph.api.getCiRelationById(neo4jId, rs, term, dir);
		
		if(graph.utils.isTrueRet(result)){
			// 打开新标签
			onself = graph.api.getCi(neo4jId);
			if(graph.utils.isTrueRet(onself)){
				result.data.node.push(onself.data);
			}
			win = window.open("openChildTree.html");
			win.window.result = result;
		}else{
			graph.utils.alert(result.message);
		}
	};

	//patch for dashboard
	initChart = function (editorchart) {
		var graph = editorchart.graph;
		var celllist = graph.getChildVertices();
		var chartcelllist = [];

		if(celllist.length > 0){
			for(var i = 0 ; i < celllist.length ; i++){
				var cell = celllist[i];
				var cellType = cell.getAttribute("type",null);
				if(cellType && cellType == "chart"){
					chartcelllist.push(cell);
				}
			}
		}

		if(chartcelllist.length > 0){
			var chartView = dashboard.getChartView(chartcelllist,graph);
			chartView.excute();
		}
	};

	buildUI = function(){
		graph.header();
		(function(){
			var size,
				$mainBox = $(".main-box"),
				$header = $(".succ-header");

			size = function(){
				var height = $(window).height() - $header.height();
				$mainBox.height(height);
			};

			size();
			$(self).resize(size);
		})();

		(function(){
			var $siderbar = $("#siderbar"),
				$graphs = $("#graphs"),
				oriWidth = $siderbar.width();

			$("#collapse-sidebar").click(function(){
				if($siderbar.width() === 0){
					$siderbar.width(oriWidth);
					$graphs.css("margin-left", oriWidth + "px");
					$(this).removeClass("deg180");
				}else{
					$siderbar.width(0);
					$graphs.css("margin-left", 0);
					$(this).addClass("deg180");
				}

				if(timeline){
					timeline.resize();
				}
			});
		})();
	};

	self.graph.openChild = openChild;
	self.graph.onload = function(){
		getColor = graph.utils.getLevelColor;

		buildUI();
		editor = graph.utils.getEditor($("#graphContainer")[0]);
		new Autolayout(editor.graph);
		tree();
		themeEvent();

		//editor.graph.collapseToPreferredSize = false;
		//editor.graph.constrainChildren = false;
		//editor.graph.extendParentsOnAdd = false;
		//editor.graph.extendParents = false;
		//editor.graph.border = 10;

		editor.graph.setCellsSelectable(false);
		editor.graph.setCellsMovable(false);
		editor.graph.setCellsCloneable(false);
		editor.graph.setCellsEditable(false);
		editor.graph.setCellsDisconnectable(false);
		editor.graph.setCellsResizable(false);
		editor.graph.setExtendParents(false);

		addListener();
		rightMenu();
		editor.graph.container.style.background = "#FFFFFF";

		initTopBts();

		if(urlParams.viewid){
			openView(decodeURIComponent(urlParams.viewid));
		}

		oriGraphHeight = $(editor.graph.container).height();
		window.g = editor.graph;
	};
	
})(this);
