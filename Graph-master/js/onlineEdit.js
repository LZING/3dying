
(function(self){
	
	"use strict";
	
	var autoCreateRelation = null,
		isTo = null,
		selectDefaultVal = "全部",
		heightLightCell = null,
		lastTargetCell = null,
		lastTargetEdge = null,
		
		getSelectTr = null,
		
		binding = null,
		createDragSource = null,
		createDropHandler = null,
		createDragPreview = null,
		pageSize = 15,
	
		initSelect = null,
		getListData = null,
		writeTable = null,
		initPage = null,
		
		ciInit = null,
		ciInfoContainer = null,
		ciPage = null,
		ciTable = null,
		CI_LIB = null,
		CI_SELECT_CACHE = {},
		ciGetSelectCache = null,
		ciSetSelectCache = null,
		ciCreateCell = null,
        chartInit = null,
        chartCreateCell = null,
        createTempChart = null,
        createChartDropHandler = null,
		setCiCacheQueryResult = null,
		getCiCacheQueryResult = null,
		ciCacheQueryResult = {},

		KPI_LIB = null,

		kpiCreateCell = null,
		clearEdges = null,
		
		CACHE = {},
		CI_TABLE_LIB = {},
		tmp = null;
	
	// member defined
	self.isMonitorDisplay = false;
	self.htmlcell_width = 200;
	self.htmlcell_height = 150; 
	self.checkboxLib = null;
	self.htmlStyle = "html=1;strokeColor=blue; strokeWidth=1;";
	self.baseGraphID = "baseGraphID";
	self.treeElementClassName = "ci-tree";
	self.treeStyleBtnID = "btn-tree-style";
	self.tileStyleBtnID = "btn-tile-style";
	self.ciInfoContainer = null,
	self.kpiInfoContainer = null,
	self.graphContainer = null;
	self.icon = {};
	self.randstr = graph.utils.randstr;
	self.executeLayout = graph.utils.executeLayout;

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
		"newView",
		"viewOpen",
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
		"setCellImg",
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
		"guides",
		"|",
		"graphBgImgUpload",
		"graphBgImgClear"
	];

	self.openChild = function(cell, neo4jId, rs, term, dir, g){
		graph.utils.openChild.apply(graph.utils, arguments);
	};

	getListData = function(cate){
		var result;
		
		if(cate == "ci"){
			result = graph.api.getCiCate();
			CI_LIB = result.data;
		}
		
		if(cate == "kpi"){
			result = graph.api.getKpiCate();
			KPI_LIB = result.data;
		}
		
		if(graph.utils.isTrueRet(result)){
			return result.data;
		}else{
			graph.utils.alert(result.message);
			throw new Error(result.message);
		}

	};
	
	self.getCache = function(){
		return CACHE;
	};
	
	self.setCache = function(key, value){
		CACHE[key] = value;
	};

	self.clearCache = function(){
		CACHE = {};
	};

	// init
	self.init = function(){

		self.graph();
		self.category();
		self.initCustomIconArea();
		self.rawBaseGraph();

		ciInit();

		new graphContextMenu(self.editor, self.contextMenu);

		graph.utils.initUrlView(self.editor, function(cateid, viewid){
			CACHE.cateid = cateid;
			CACHE.viewid = viewid;
		});

		new Autolayout(self.editor.graph);

	    //初始化图表页面
	    chartInit();
		self.toolbar();
	};

	self.initCustomIconArea = function(){
		var arr = [],
			$main = $("#icon-custom"),
			addMangerBtn = null,
			result;


		addMangerBtn = function(){
			var box = document.createElement("div"),
				i = document.createElement("i");

			i.className = "fa fa-plus-square  fa-3x";
			box.style.cssText = [
				"float: left",
				"width: 40px",
				"height: 40px",
				"cursor: pointer"
			].join(";");

			i.style.cssText = [
				"color: #CCC"
			].join(";");

			box.addEventListener("click", function(){
				DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_CHANGE_IMAGE].apply(self.editor);
			});

			box.appendChild(i);
			$main.append(box);
		};

		result =  graph.api.qureyForAdmin(null, 1, 100000);

		if(graph.utils.isTrueRet(result)){
			$.each(result.data.datas, function(src){
				arr.push(["../resource/ownsvg",src].join("/"));
			});
		}

		graph.utils.render("share/customIconArea.html", {list: arr}, function(html){
			$main.html(html);
			$main.find(".customIconArea-box").each(function(){
				self.sidebar.addImagePalette(
					this,
					"",
					$(this).attr("data-icon"),
					DEFINE.CATE_dragWidth,
					DEFINE.CATE_dragHeight,
					DEFINE.CATE_dragWidth,
					DEFINE.CATE_dragHeight
				);

				$(this).find("img").remove();
				// $(this).find("a").css("padding", 0);
			});

			addMangerBtn();
		});
	};

	self.toolbar = function(){
		self.toolbar = new Toolbar(self, $("#toolbar-onlineEdit"));
	};
	
	// graph
	self.graph = function(){
		self.graphContainer = $("#graph-onlineEdit").get(0);

		self.editor = graph.utils.getEditor(
			self.graphContainer,
			self.outlineContainer
		);

		self.sidebar = new Sidebar(
			self.editor,
			$("#tab_1_1_1").parent()[0]
		);


        /***
         * mxCell的放大缩小事件
         * 当mxCell被放大或者缩小时，图表的大小跟着被重绘，并且将图表的尺寸写入mxCell的属性
         */
        self.editor.graph.addListener(mxEvent.CELLS_RESIZED, function (sender, evt) {

            var cells = evt.getProperty('cells');
            for(var i = 0 ; i < cells.length ; i++){

                var cell = cells[i];
                var cellGeo = cell.getGeometry();
                var nCellWidth = cellGeo.width;
                var nCellHeight = cellGeo.height;
                var cellType = cell.getAttribute("type","undefined");
                var chartRender = cell.getAttribute("chartRender","");
                var chartType = cell.getAttribute("chartType","");
                var cds = cell.getAttribute("datasource","default");
                var cdi = cell.getAttribute("interval","default");
                var chartTitle = cell.getAttribute("chartTitle","");
                var isxAsix = cell.getAttribute("isxAsix","true");
                var isyAsix = cell.getAttribute("isyAsix","true");
                var xAxistitle = cell.getAttribute("xAxistitle","X轴");
                var yAxistitle = cell.getAttribute("yAxistitle","Y轴");
                var offset = cell.getAttribute("offset",0);
                if(isxAsix == "true"){
                    isxAsix = true;
                }else{
                    isxAsix = false;
                }
                if(isyAsix == "true"){
                    isyAsix = true;
                }else{
                    isyAsix = false;
                }
                if(cellType != "undefined"){
                    cell.setAttribute("label","<div style=\"height:" + nCellHeight + "px;width:" + nCellWidth + "px\" id="+ chartRender +"></div>");
                    cell.setAttribute("chartwidth",nCellWidth);
                    cell.setAttribute("chartheight",nCellHeight);
                    self.editor.graph.refresh(cell);
                    chart.chartInstance.createTempChart(parseInt(chartType),chartRender,parseInt(nCellWidth),parseInt(nCellHeight),chartTitle,isxAsix,isyAsix,xAxistitle,yAxistitle,offset,cds,cdi);
                    setTimeout(function () {
                        cell.setAttribute("label",$("#" + chartRender)[0].outerHTML);
                    },500);
                }
            }
        });
	};

	// category
	self.category = function(){
		var result = null,
		
		result = graph.api.getCiCate();

		Tree(result.data, self.sidebar).createMenu($("#icon-category").get(0), {
			layout : "box",
			icoWidth : DEFINE.CATE_boxIcoWidth,
			icoHeight : DEFINE.CATE_boxIcoHeight,
			dragHeight : DEFINE.CATE_dragHeight,
			dragWidth : DEFINE.CATE_dragWidth,
			foldOpen : DEFINE.CATE_boxIsFolod
		});
	};
	
	// select
	self.select = function(){
		graph.viewManagement.editor.graph.keyHandler.handler.setEnabled(false);
		self.editor.graph.keyHandler.handler.setEnabled(true);
		self.toolbar.show();
		graph.viewManagement.toolbar.hide();
		$("#toolbar-viewPortfolio").hide();
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
			DEFINE.MENU_CONTAINER_FILTER_SET,
			DEFINE.MENU_VIEW_RELATION,
			[
				DEFINE.MENU_VIEW_RELATION_ADD,
				DEFINE.MENU_VIEW_RELATION_OPEN,
				DEFINE.MENU_VIEW_RELATION_RM
			]
		],
        vertex_chart:[DEFINE.MENU_CHARTCONF],
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
			DEFINE.MENU_VIEW_OPEN,
			DEFINE.MENU_VIEW_SAVE,
			DEFINE.MENU_VIEW_UPDATE,
			
			{name: DEFINE.MENU_EXPORT,  aliases: "导出视图"},
			[
				DEFINE.MENU_EXPORT_PNG,
				DEFINE.MENU_EXPORT_PDF,
				DEFINE.MENU_EXPORT_XML
			],
			
			{name: DEFINE.MENU_OPEN_LOCAL_XML_FILE,  aliases: "打开视图文件"},

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
	
	// 绘制基本图形
	self.rawBaseGraph = function(){
		var content = $("#icon-baseShape")[0];
		
		$(content).css("overflow", "hidden");
		
		self.sidebar.addGeneralPalette(content,'swimlane', 200, 200, 'Container');
		self.sidebar.addGeneralPalette(content,'swimlane;horizontal=0', 200, 200, 'Pool');
		self.sidebar.addGeneralPalette(content,'text', 40, 26, 'Text');
		self.sidebar.addGeneralPalette(content, null, 120, 60);
		self.sidebar.addGeneralPalette(content,'rounded=1', 120, 60);
		self.sidebar.addGeneralPalette(content,'ellipse', 80, 80);
		self.sidebar.addGeneralPalette(content,'ellipse;shape=doubleEllipse', 80, 80);
		self.sidebar.addGeneralPalette(content,'triangle', 60, 80);
		self.sidebar.addGeneralPalette(content,'rhombus', 80, 80);
		self.sidebar.addGeneralPalette(content,'shape=hexagon', 120, 80);
		self.sidebar.addGeneralPalette(content,'shape=actor;verticalLabelPosition=bottom;verticalAlign=top', 40, 60);
		self.sidebar.addGeneralPalette(content,'ellipse;shape=cloud', 120, 80);
		self.sidebar.addGeneralPalette(content,'shape=cylinder', 60, 80);
		self.sidebar.addGeneralPalette(content,'line', 160, 10);
		self.sidebar.addGeneralPalette(content,'line;direction=south', 10, 160);
		self.sidebar.addGeneralPalette(content,'shape=xor', 60, 80);
		self.sidebar.addGeneralPalette(content,'shape=or', 60, 80);
		self.sidebar.addGeneralPalette(content,'shape=step', 120, 80);
		self.sidebar.addGeneralPalette(content,'shape=tape', 120, 100);
		self.sidebar.addGeneralPalette(content,'shape=cube', 120, 80);
		self.sidebar.addGeneralPalette(content,'shape=note', 80, 100);
		self.sidebar.addGeneralPalette(content,'shape=folder', 120, 120);
		self.sidebar.addGeneralPalette(content,'shape=card', 60, 80);
		self.sidebar.addGeneralPalette(content,'shape=plus', 20, 20);
		
		self.sidebar.createEdgeTemplate(content,'edgeStyle=none;endArrow=none;', 100, 100);
		self.sidebar.createEdgeTemplate(content,'edgeStyle=none', 100, 100);
		self.sidebar.createEdgeTemplate(content,'edgeStyle=elbowEdgeStyle;elbow=horizontal', 100, 100);
		self.sidebar.createEdgeTemplate(content,'edgeStyle=elbowEdgeStyle;elbow=vertical', 100, 100);
		self.sidebar.createEdgeTemplate(content,'edgeStyle=segmentEdgeStyle', 100, 100);
		self.sidebar.createEdgeTemplate(content,'arrow', 100, 100);
	};
	
	
	
	//=================================================
	// ciInfo
	//=================================================
	
	ciInit = function(){
		var type = "ci";
		
		ciInfoContainer = $("#icon-ciinfo");
		ciTable = ciInfoContainer.find(".configinfo-table");
		ciPage = ciInfoContainer.find(".configinfo-page");
		
		initSelect({
			container : ciInfoContainer,
			list : getListData(type),
			getCate : function(name){
				return graph.api.getCiCateByName(name);
			},
			getInfo : function(categoryId, orExp, page, pageSize){
				var result = graph.api.getCiAdvanced(categoryId, orExp, page, pageSize);
				return result;
				// return graph.api.getCiAdvanced(categoryId, orExp, page, pageSize);
			},
			getCache : ciGetSelectCache,
			setCache : ciSetSelectCache,
			tpl : "share/table.html",
			tableContainer : ciTable,
			pageContainer : ciPage,
			createCell : ciCreateCell,
			type : type,
			queryRelation : function(arr){
				return graph.api.getRelationCiByIds(arr);
			},
			cacheQueryResult : setCiCacheQueryResult
		});
	};
	
	setCiCacheQueryResult = function(list){
		list.each(function(){
			ciCacheQueryResult[this._neo4jid_] = this;
		});
	};
	
	getCiCacheQueryResult = function(id){
		return ciCacheQueryResult[id];
	};
	
	ciGetSelectCache = function(key){
		return CI_SELECT_CACHE[key];
	};
	
	ciSetSelectCache = function(key, value){
		CI_SELECT_CACHE[key] = value;
	};
	
	ciCreateCell = function(g, parent, cateid, id, value, x, y){
		var width, height, style, image, cell;

		image = graph.ICO[cateid],
		width = DEFINE.INFO_dragWidth;
		height = DEFINE.INFO_dragHeight;
		style = 'image;image=' + image;
		cell = g.insertVertex(parent, "ci_" + id, value, x, y, width, height, style);

		return cell;
	};

	/***
	 * patch for dashboard 2014-9-15
	 * 用于初始化仪表盘工具栏，并绑定拖动事件
	 */
	chartInit = function () {
		/*
		var slidebar = dashboard.slidebar.slidebar;
		var sb = new slidebar("tab_1_1_3");
		sb.init();
		*/
	};


	/***
	 * patch for dashboard 2014-9-15
	 *patch by leiting用于显示图标的节点
	 * @param g
	 * @param parent
	 * @param id
	 * @param value
	 * @param x
	 * @param y
	 * @param type 1:饼图 2:柱状图 3:趋势图/折线图 4:面积图
	 * @returns {*}
	 */
	chartCreateCell = function(g, parent, x, y,slideObj){
		var width = "",
			height = "",
			style = "",
			cell = null,
			image = "";
		var chartId = slideObj.getChartGUID();
		var instanceUrl = slideObj.instanceUrl;

		width = slideObj.instanceWidth;
		height = slideObj.instanceHeight;
		style = 'image;image=' + instanceUrl;
		//style = "html=1;strokeColor=none;fillColor=none";
		cell = g.insertVertex(
			parent,
				"chart_" + chartId,
			"",
			x,
			y,
			width,
			height,
			style
		);

		return cell;
	};
	self.chartCreateCell = chartCreateCell;

	/***
	 * patch for dashboard 2014-9-15
	 * 创建画布中丢弃动作的消息句柄
	 * @param sCell
	 * @param allowSplit
	 * @param param
	 * @returns {Function}
	 */
	createChartDropHandler = function(sCell, allowSplit, param, slidebarObj) {
		return function(graph, evt, target, x, y) {
			var model = null;

			var i = 0,
				parent = null,
				cell = null;


			parent = graph.getDefaultParent();
			model = graph.getModel();
			model.beginUpdate();

			try {
				var chartCate = slidebarObj.chartCate;

				if(!graph.getCellByID("chart_" + slidebarObj.itemId)){

					cell = chartCreateCell(graph, parent, x, y, slidebarObj);
					graph.setCellAttr(cell,"type","chart");
					graph.setCellAttr(cell,"chartcate",chartCate);
					graph.refresh(cell);
				}
			} finally {
				model.endUpdate();
			}
		};
	};
	self.createChartDropHandler = createChartDropHandler;

	//=================================================
	// ciInfo END
	//=================================================

	initPage = function(param){
		var i = 0,
			currClassName = "btn btn-default active",
			count = 0,
			total = 0,
			page = 0,
			a = null;
		
		count = param.getCache("count");
		page = param.getCache("page");
		
		param.pageContainer.html("");
		
		if(count){
			
			total = Math.ceil(count/pageSize);
			
			for(i=1; i<=total; i++){
				a = document.createElement("button");
				a.className = "btn btn-default";
				a.innerHTML = i;
				
				a.onclick = function(){
					var result = null,
						page = window.parseInt(this.innerHTML, 10);
					
					result = param.getInfo(
						param.getCache("cateid"),
						param.getCache("where"),
						page, 
						pageSize
					);
					
					if(graph.utils.isTrueRet(result)){
						
						result.data.datas.each(function(i){
							this.index = (page - 1) * pageSize + i;
						});
						
						writeTable(result.data.datas, param);
						binding(param);
						
						if(param.getCache("count") !== result.data.count){
							param.setCache("count", result.data.count);
							param.setCache("page",  result.data.page);
							initPage(param);
						}
						
						$(this).parent().find(".active").removeClass("active");
						this.className = currClassName;
						
					}else{
						graph.utils.alert(result.message);
						throw new Error(result.message);
					}
				};
				
				if(i === page){
					a.className = currClassName;
				}
				
				param.pageContainer.append(a);
			}
		}
	};
	
	initSelect = function(param){
		var option = null,
			loop = null,
			aSelect = null,
			bSelect = null,
			update = null,
			ctHtml = null,
			cInput = null;
			
		update = function(name){
			var result,
				option,
				i,
				arr = [];
				
			result = param.getCate(name);
			bSelect.html("");
			
			if(graph.utils.isTrueRet(result)){
				
				if(result.data && Array.isArray(result.data.attributes)){
					arr = result.data.attributes;
					arr.unshift({name: selectDefaultVal});
					
					for(i=0; i<arr.length; i++){
						option = document.createElement("option");
						option.innerHTML = arr[i].name;
						bSelect.append(option);
					}
				}
			}else{
				graph.utils.alert(result.message);
				throw new Error(result.message);
			}
		};
		
		ctHtml = function(text, lenth){
			var i,arr = [];

			for(i=0; i<lenth; i++){
				arr.push("-");
			}
			
			arr.push(text);
			return arr.join("");
		};
		
		loop = function(arr, marginleft){
			var i;
			
			for(i=0; i<arr.length; i++){
				option = document.createElement("option");
				option.innerHTML = ctHtml(arr[i].id, marginleft);
				option.value = arr[i].id;
				aSelect.append(option);
				
				if(Array.isArray(arr[i].childrenNode)){
					loop(arr[i].childrenNode, marginleft + 2 );
				}
			}
		};
			
		aSelect = param.container.find("select[name=a]");
		bSelect = param.container.find("select[name=b]");
		cInput = param.container.find("input[name=c]");
		
		loop(param.list, 0);

		aSelect.change(function(){
			update($(this).val());
		});
		aSelect.find("option").each(function(){
			if($(this).attr("value") === "bizservice"){
				this.selected = true;
			}
		});
		update(aSelect.val());
		
		param.container.find("button").click(function(){
			var cateid,
				key,
				value,
				result,
				where = {};
				
			cateid = aSelect.val();
			key = bSelect.val() === selectDefaultVal ? "*" : bSelect.val();
			value = cInput.val() === "" ? "*" : "*" + cInput.val() + "*";
			where[key] = value;
			
			result = param.getInfo(cateid, where, 1,  pageSize);
			
			if(graph.utils.isTrueRet(result)){
				if(typeof param.cacheQueryResult === "function"){
					param.cacheQueryResult(result.data.datas);	
				}
				
				param.setCache("cateid", cateid);
				param.setCache("where", where);
				param.setCache("count", result.data.count);
				param.setCache("page", result.data.page);
				param.setCache("lib", result.data.datas);
				
				result.data.datas.each(function(i){
					this.index = i + 1;
				});
				
				writeTable(result.data.datas, param);
				initPage(param);
				binding(param);
				
			}else{
				graph.utils.alert(result.message);
				throw new Error(result.message);
			}
		});
	};
	
	writeTable = function(arr, param, base){
		var html = "",
			table = null;

		if(arr.length > 0){
			
			html = graph.utils.render(param.tpl, {
				list: arr
			});
			
			param.tableContainer.html(html);
			table = param.tableContainer.find("table");
			table.find("input[type=checkbox][name=all]").click(function(){
				if($(this).is(":checked")){
					param.tableContainer.find("input[type=checkbox]").each(function(){
						 $(this).attr("checked", true);
					});
				}else{
					param.tableContainer.find("input[type=checkbox]").each(function(){
						 $(this).removeAttr("checked", false);
					});
				}
			});
		}else{
			param.tableContainer.html("没有查询到相关数据");
		}
	};
	
	
	getSelectTr = function(tableContainer){
		var arr = [];
		tableContainer.find("tr[gname]").each(function(){
			if($(this).find("input").is(":checked")){
				arr.push($(this));
			}
		});
		
		return arr;
	};
	

	binding = function(param){
		param.tableContainer.find("tr:gt(0)").each(function() {
			if($(this).attr("gid")){
		 		createDragSource(
					this,
					createDropHandler(this, true, param),
					createDragPreview(
						DEFINE.CATE_dragWidth,
						DEFINE.CATE_dragHeight
					),
					param
				);
			}
		});
	};
	
	
	createDragSource = function(elt, dropHandler, preview) {
		var dragSource,
			edgeStyle = "strokeColor=#0066FF;strokeWidth=4;fillColor=none;";
		
		dragSource = mxUtils.makeDraggable(
			elt,
			self.editor.graph,
			dropHandler,
			preview,
			0,
			0,
			self.editor.graph.autoscroll,
			true,
			true
		);
		
		// Allows drop into cell only if target is a valid root
		dragSource.getDropTarget = function(graph, x, y) {
			var target = null,
				upTarget = null,
				loop = null,
				style = "",
				newStyle = "";
			
			upTarget = mxDragSource.prototype.getDropTarget.apply(this, arguments);
			
			loop = function(parent){
				var vertex = null,
					child = null;
				
				vertex = graph.getCellAt(x, y, parent, true, true);

				if(vertex && vertex.children 
						&& vertex.children.length>=1 ){
					vertex = loop(vertex);
				}
				
				return vertex;
			};
			
			target = loop(graph.getDefaultParent());
			target = target ? target : upTarget;
			
			if((target && target.vertex && !heightLightCell)
					|| (target && target.vertex && heightLightCell.geometry.x != target.geometry.x)
					|| (target && target.vertex && heightLightCell.geometry.y != target.geometry.y)){
				graph.removeCells([heightLightCell]);
				lastTargetCell = target;
				
				heightLightCell = graph.insertVertex(
					target.getParent(),
					"light_" + self.randstr(),
					"",
					target.geometry.x,
					target.geometry.y,
					target.geometry.width,
					target.geometry.height,
					edgeStyle
				);

			}else if(!target && heightLightCell){
				graph.removeCells([heightLightCell]);
				heightLightCell = null;
				lastTargetCell = null;
			}
			
			if(target && target.edge && !lastTargetEdge){
				lastTargetEdge = target;
				graph.setOriStyle(target, target.getStyle());
				target.setStyle(edgeStyle);
				graph.refresh(target);
			}else if(!target && lastTargetEdge){
				style = graph.getOriStyle(lastTargetEdge);
				graph.setOriStyle(lastTargetEdge, "");
				lastTargetEdge.setStyle(style);
				graph.refresh(lastTargetEdge);
				lastTargetEdge = null;
			}
			
			if (!graph.isValidRoot(target)) {
				target = null;
			}

			return target;
		};

		return dragSource;
	};
	self.createDragSource = createDragSource;
	
	
	createDropHandler = function(sCell, allowSplit, param) {
		return function(graph, evt, target, x, y) {
			var ids = [],
				isSelectMore = false,
				model = null,
				isLayout = true,
				isAutoCreateRe,
				selects;

			if(heightLightCell){
				graph.removeCells([heightLightCell]);
				heightLightCell = null;
			}

			selects = getSelectTr(param.tableContainer);
			
			if(selects.length >= 1){
				isSelectMore = true;
			}else{
				selects = [$(sCell)];
				isSelectMore = false;
			}
			
			(function(list){
				var i = 0,
					obj = null,
					id = 0,
					name = "",
					cate = "",
					parent,
					style = "",
					cell = null;
				
				parent = graph.getDefaultParent();
				model = graph.getModel();
				model.beginUpdate();
				
				try {
					for(i=0; i<list.length; i++) {
						obj = list[i];
						id = obj.attr("gid");
						name = obj.attr("gname");
						cate = obj.find("td:eq(1)").html();

						if(!graph.getCellByID([param.type, id].join("_"))){
							if(!isSelectMore && lastTargetCell && !lastTargetCell.collapsed){
								lastTargetCell.setId([param.type, id].join("_"));
								lastTargetCell.setValue(name);
								if(lastTargetCell.style
										&& lastTargetCell.style.indexOf("swimlane") >= 0
										&& !graph.model.isCollapsed(lastTargetCell)){
									lastTargetCell.geometry.alternateBounds = new mxRectangle(0, 0, 80, 80);
								}
								graph.refresh(lastTargetCell);
								lastTargetCell = null;
							}else if(!isSelectMore && lastTargetCell && lastTargetCell.collapsed){
								if(obj.style.indexOf("image=")){
									var arr = obj.style.split("image=");
									self.editor.graph.setCellStyles(mxConstants.STYLE_IMAGE, arr[1].indexOf(";")[0], lastTargetCell);
								}
							}else if(!isSelectMore && lastTargetEdge){
								lastTargetEdge.setId([param.type, id].join("_"));
								style = graph.getOriStyle(lastTargetEdge);
								graph.setOriStyle(lastTargetEdge, "");
								lastTargetEdge.setStyle(style);
								graph.refresh(lastTargetEdge);
								lastTargetEdge = null;
							}else{
								cell = param.createCell(graph, parent, cate, id, name, x, y);
								CI_TABLE_LIB[id] = getCiCacheQueryResult(id);
								ids.push(id);
								graph.refresh(cell);
							}
						}
					}
				} finally {
					model.endUpdate();
				}
				
			})(selects);

			if(isLayout){
				isAutoCreateRe = autoCreateRelation(ids, param);
			}

			// layout
			if(isLayout && (isAutoCreateRe || isSelectMore)){
				self.executeLayout(
					graph,
					new mxHierarchicalLayout(
						graph,
						mxConstants.DIRECTION_WEST
					),
					true,
					true
				);

				graph.refresh();
				graph.zoomToCenter();
				//graph.clearSelection();
			}
			
			// 取消多选
			param.tableContainer.find("tr input").each(function(){
				$(this).attr("checked", false);
			});
		};
	};

	
	createDragPreview = function(width, height, html) {
		var elt = document.createElement('div');
		elt.style.border = '1px dashed black';
		elt.style.width = width + 'px';
		elt.style.height = height + 'px';
		elt.innerHTML = html?html:'';
		return elt;
	};
	self.createDragPreview = createDragPreview;
	
	
	autoCreateRelation = function(ids, param){
		var i,
			v1 = null,
			v2 = null,
			model,
			parent,
			arr = null,
			isLayout = false,
			ciids = [],
			edgeId = "",
			edgeStyle = "",
			result;
			
		parent = self.editor.graph.getDefaultParent();
		model = self.editor.graph.getModel();
		model.beginUpdate();
		
		self.editor.graph.getDepCells().each(function(){
			if(this.id.indexOf("ci_") >= 0){
				ciids.push(this.id.split("_")[1]);
			}
		});
		
		result = param.queryRelation(ciids);
		if(graph.utils.isTrueRet(result)){
			result = result.data;
			try {
				for(i=0; i<result.length; i++){
					arr = result[i].split("_");
					v1 = self.editor.graph.getCellByID([param.type, arr[0]].join("_"));
					v2 = self.editor.graph.getCellByID([param.type, arr[2]].join("_"));
					clearEdges(v1, v2);
				}

				for(i=0; i<result.length; i++){
					arr = result[i].split("_");
					v1 = self.editor.graph.getCellByID([param.type, arr[0]].join("_"));
					v2 = self.editor.graph.getCellByID([param.type, arr[2]].join("_"));
					
					if(v1 && v2){
						edgeId = ["relation", result[i]].join("_");
						edgeStyle = "";
						if(arr[1] == "eip"){
							edgeId = result[i];
							edgeStyle = "strokeWidth=" + DEFINE.EIP_STROKEWIDTH;
						}

						self.editor.graph.insertEdge(
							parent,
							edgeId,
							arr[1],
							v1,
							v2,
							edgeStyle
						);
						
						isLayout = true;
					}
				}
			} finally {
				model.endUpdate();
			}
		}else{
			alert(result.message);
		}

		return isLayout;
	};

	clearEdges = function(v1, v2){
		var i = 0,
			removeCells = [];

		if(v1 && v2 && Array.isArray(v1.edges)){
			for(i=0; i<v1.edges.length; i++){
				if(v1.edges[i].source.id === v2.id || v1.edges[i].target.id === v2.id){
					removeCells.push(v1.edges[i]);
				}
			}
		}

		self.editor.graph.removeCells(removeCells);
	};
	
	isTo = function(arr, targetID){
		var i = 0,
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

	self.showCiTable = function(){
		graph.utils.showCiTable(self.editor.graph, CI_TABLE_LIB, function(){
			self.editor.zoomLock = true;
		});
	};

	self.showGraph = function(){
		var container;
		self.editor.zoomLock = false;
		container = self.editor.graph.container;
		$(container).find(".graphtable").remove();
	};

	self.resize = function(){
		self.editor.graph.zoomToCenter();
	};

	self.getCiLib = function(){
		return CI_TABLE_LIB;
	};
	
})(nameSpace.reg("graph.onlineEdit"));
