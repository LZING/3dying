
// 常规名称定义
(function(self){
	
	"use strict";
	
	self.MENU_OPEN_URL = "打开URL";
	self.MENU_EDIT_URL = "编辑URL";
	self.MENU_BACK_PARENT_VIEW = "返回父级视图";
	self.MENU_OPEN_LOCAL_XML_FILE = "打开本地XML文件";
	
	self.MENU_FILL_COLOR = "填充颜色";
	self.MENU_FONT_COLOR = "字体颜色";
	self.MENU_STROKE_COLOR = "边框颜色";
	self.MENU_STROKE_WIDTH = "边框宽度";
	self.MENU_FONT_SIZE = "字体大小";
	self.MENU_FONT_FAMILY = "字体名称";
	self.MENU_OPACITY = "透明度";
	self.MENU_SHADOW = "阴影";
	self.MENU_CHANGE_IMAGE = "修改图标";
	
	
	self.MENU_ZOOMIN = "放大";
	self.MENU_ZOOMOUT = "缩小";
	self.MENU_ZOOMFIT = "适应画布";
	self.MENU_ZOOMACTUAL = "实际大小";
	
	self.MENU_STYLE = "样式";
	self.MENU_ZOOM = "缩放";
	
	self.MENU_VIEW = "视图";
	self.MENU_VIEW_SAVE = "保存视图";
	self.MENU_VIEW_UPDATE = "更新视图";
	self.MENU_VIEW_OPEN = "打开视图";
	
	self.MENU_VIEW_URL = "视图URL";
	self.MENU_VIEW_NEW_WINDOW = "在新标签页打开此视图";
	
	self.MENU_VIEW_RELATION = "视图关联";
	self.MENU_VIEW_RELATION_ADD = "添加视图关联";
	self.MENU_VIEW_RELATION_RM = "移除视图关联";
	self.MENU_VIEW_RELATION_OPEN = "打开关联视图";
	
	self.MENU_BACKGROUND = "背景";
	self.MENU_BACKGROUND_IMG_SET = "设置背景图";
	self.MENU_BACKGROUND_IMG_RM = "移除背景图";

	self.MENU_LAYOUT = "布局";
	self.MENU_LAYOUT_H = "横向布局";
	self.MENU_LAYOUT_V = "纵向布局";
	self.MENU_LAYOUT_C = "圆形布局";
	self.MENU_LAYOUT_O = "有机布局";
	self.MENU_LAYOUT_L = "平行线布局";
	self.MENU_LAYOUT_SV = "垂直堆栈";
	self.MENU_LAYOUT_SH = "水平堆栈";
	
	self.MENU_EXPORT = "导出";
	self.MENU_EXPORT_PNG = "导出PNG";
	self.MENU_EXPORT_PDF = "导出PDF";
	self.MENU_EXPORT_XML = "导出XML";
	
	self.MENU_OPEN_CHILD = "打开子节点";
	
	
	self.MENU_EDIT = "编辑";
	self.MENU_CELL_DELETE = "删除";
	self.MENU_CELL_COPY = "复制";
	self.MENU_CELL_CUT = "剪切";
	self.MENU_CELL_PASTE = "粘贴";
	
	
	self.MENU_OBJECT_CREATE = "创建对象";
	self.MENU_OBJECT_DETAIL = "详细信息";
	self.MENU_OBJECT_DETAIL_RELATION = "关系配置信息";
	self.MENU_CONFIG_INFO = "配置信息";
	
	self.MENU_GRAPH_CLEAR = "清空画布";
	
	self.MENU_RELATION_CREATE = "创建关系";
	
	self.MENU_MODULE = "模式";
	self.MENU_MODULE_ORI = "原始模式";
	self.MENU_MODULE_TAG = "标签模式";
	
	self.MENU_OPEN_CHILD_NEW_WINDOW = "在新标签页展开字节点";
	self.MENU_THRESHOLD_UPDATE = "修改阀值";

	self.MENU_CONTAINER_FILTER_SET = "设置容器过滤条件";
	self.MENU_CHARTCONF ="仪表盘配置配置";

	self.MENU_SEARCH_NODE = "搜索节点";
	self.MENU_SEARCH_PATH = "搜索路径";
	self.MENU_SEARCH_CLEAR = "删除搜索结果";

})(nameSpace.reg("DEFINE"));

(function(self, fix){
	
	"use strict";
	
	// 打开本地XML文件
	self[fix.MENU_OPEN_LOCAL_XML_FILE] = function(){
		var _this = this,
			html = "",
			dialog = null;
		
		if (typeof FileReader === "function") {
			
			html = graph.utils.render("share/openXml.html");
			dialog = graph.dialog("打开本地XML", html, function(element){
				var xml = null,
					form = null;
				
				var xml = element.find("input[name=xml]");
				if(xml.val() === ""){
					graph.utils.alert("错误：未选择文件！");
				}else if(xml.val().split(".").pop() !== "xml"){
					graph.utils.alert("错误：请选XML类型文件！");
				}else{
					form = element.find("form")[0];
					
					(function(file){
						var reader = new FileReader();
						
						reader.onload = function(e){
							try {
								graph.utils.openXml(_this, e.target.result);
							}catch (e) {
								graph.utils.alert(e);
							}
							
							dialog.hide();
						};
						
						reader.onerror = function(e){
							graph.utils.alert(e);
						};
						
						reader.readAsText(file);						
						
					})(form.xml.files[0]);
				}
			});
			
		}else{
			graph.utils.alert("错误：您的浏览器不支持打开本地XML文件，推荐使用Chrome, FireFox, Safari, IE10+等现代浏览器再尝试！");
		}
	};
	
	
	// 实际大小
	self[fix.MENU_ZOOMACTUAL] = function(){
		this.graph.zoomActual();
	};	
	
	
	// 缩小
	self[fix.MENU_ZOOMOUT] = function(){
		this.graph.zoomOut();
	};
	
	
	// 放大
	self[fix.MENU_ZOOMIN] = function(){
		this.graph.zoomIn();
	};
	
	self[fix.MENU_ZOOMFIT] = function(){
		this.graph.fit();
	};

	// 编辑链接
	self[fix.MENU_EDIT_URL] = function(){
		var graph = this.graph,
			cells = null,
			link = "",
			oriLink = "";
			
		cells = graph.getSelectionCells();
		oriLink = graph.getLinkForCell(cells[0], "link");
		oriLink = oriLink ? oriLink : "";
		link = window.prompt(DEFINE.MSG_S10, oriLink);
		
		IF(link, function(){
			cells.each(function(){
				graph.setLinkForCell(this, link);
			});
		});
	};
	
	// 修改图标
	self[fix.MENU_CHANGE_IMAGE] = function(){
		var vertexs = [],
			change = null,
			_this = this,
			cells = [];

		change = function(image, cells){
			cells.each(function(i){
				var gt = null,
					style = "",
					has = false,
					cell = this;

				has = false;
				gt = cell.getGeometry();
				style = cell.getStyle() || "";

				IF(style !== "" && style.charAt(style.length-1) === ";", function(){
					style = style.substring(0, style.length-2);
				});

				IF(style === "", function(){
					style = [];
				},function(){
					style = style.split(";");
				});

				style.each(function(j){
					var item = this.split("=");

					return IF($.trim(item[0]) === "image" && item[1], function(){
						item[1] = image;
						has = true;
						style[j] = item.join("=");
						return true;
					});
				});


				IF(!has, function(){
					style.push([
						"shape=label",
						"image=" + image,
						"imageAlign=center",
						"imageVerticalAlign=center",
						"imageWidth=" + gt.width,
						"imageHeight=" + gt.height
					].join(";"));
				});

				style = style.join(";");
				cell.setStyle(style);
			});
		};

		cells = this.graph.getSelectionCells();
		$.each(cells, function(){
			if(this.vertex){
				vertexs.push(this);
			}
		});

		graph.utils.selectIcon(function(src){
			change(src, vertexs);
			_this.graph.refresh();
		});
	};
	
	// 阴影
	self[fix.MENU_SHADOW] = function(){
		var graph = this.graph,
			shadow = "",
			cells = null;
			
		shadow = window.prompt(DEFINE.MSG_S8, "");
		cells = graph.getSelectionCells();
		graph.setCellStyles(mxConstants.STYLE_SHADOW, shadow, cells);		
	};
	
	// 透明度
	self[fix.MENU_OPACITY] = function(){
		var _this = this;

		graph.utils.render("style/opacity.html", null, function(html){
			var $input = null,
				cells = _this.graph.getSelectionCells(),
				opacity = 100;

			opacity = graph.utils.getStyleForAttr(cells[0], "opacity");
			opacity = /\d+/.test(opacity) ? Number(opacity) : 100;
			graph.dialog("设置透明度(数值越小越透明)", html, function(element, dialog){
				_this.graph.setCellStyles(mxConstants.STYLE_OPACITY, $input.val(), cells);
				dialog.hide();
			});

			$input = $("#opacityInput");
			$('#spinner4').spinner({value:opacity, step: 5, min: 0, max: 100});
		});
	};
	
	
	// 字体名称
	self[fix.MENU_FONT_FAMILY] = function(){
		var _this = this,
			dialog = "",
			html = "",
			cells = [],
			family = "",
			$input = null;

		cells = _this.graph.getSelectionCells();
		if(cells.length >= 1){
			family = graph.utils.getStyleForAttr(cells[0], "fontFamily");
			family = family !== "" ? family : "Georgia";

			html = graph.utils.render("style/family.html", {
				family: family
			});

			dialog = graph.dialog("修改字体", html, function(element){
				var family = $("#family").val();
				_this.graph.setCellStyles("fontFamily", family, cells);
				dialog.hide();
			});
		}
	};
	
	// 字体大小
	self[fix.MENU_FONT_SIZE] = function(){
		var _this = this,
			dialog = "",
			html = "",
			cells = [],
			size = "",
			$fontSizeExample = null,
			$currVal = null,
			$input = null;

		cells = _this.graph.getSelectionCells();
		if(cells.length >= 1){
			size = graph.utils.getStyleForAttr(cells[0], "fontSize");
			size = size !== "" ? window.parseInt(size, 10) : 12;

			html = graph.utils.render("style/fontsize.html", {
				size: size
			});

			dialog = graph.dialog("字体大小", html, function(element){
				var size = $input.val();
				_this.graph.setCellStyles("fontSize", size, cells);
				dialog.hide();
			});

			$fontSizeExample = dialog.element.find("#fontSizeExample");
			$currVal = dialog.element.find("#fontSizeSliderVal");
			$input = dialog.element.find("#fontSize");
			$input.slider();
			$input.on('slide', function(slideEvt) {
				$currVal.text(slideEvt.value);
				$fontSizeExample.css("font-size", slideEvt.value + "px");
			});
		}
	};
	
	// 边框宽度
	self[fix.MENU_STROKE_WIDTH] = function(){
		var graph = this.graph,
			width = "",
			cells = null;
			
		width = window.prompt(DEFINE.MSG_S4, "");
		cells = graph.getSelectionCells();
		graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, width, cells);
	};
	
	// 边框颜色
	self[fix.MENU_STROKE_COLOR] = function(){
		graph.utils.colorDialog(this.graph, "strokeColor", fix.MENU_STROKE_COLOR);
	};
	
	// 字体颜色
	self[fix.MENU_FONT_COLOR] = function(){
		graph.utils.colorDialog(this.graph, "fontColor", fix.MENU_FONT_COLOR);
	};
	
	// 填充颜
	self[fix.MENU_FILL_COLOR] = function(){
		graph.utils.colorDialog(this.graph, "fillColor", fix.MENU_FILL_COLOR);
	};

	// 打开URL
	self[fix.MENU_OPEN_URL] = function(evt, cell){
		var graph = this.graph,
			link = graph.getLinkForCell(cell, "link");

		if(link){
			window.open(link);
		}
	};

	
	// 返回父级视图
	self[fix.MENU_BACK_PARENT_VIEW] = function(){
		var _this = this,
			xml = "",
			o = null;
		
		o = graph.utils.getVisibleModuleObj();
		
		if(Array.isArray(o.history) && o.history.length >= 1){
			xml = o.history.pop();
			graph.utils.openXml(_this, xml);
		}else{
			graph.utils.alert("没有历史记录");
		}
	};
	
	// 保存视图
	self[fix.MENU_VIEW_SAVE] = function(){
		var _this = this,
			html = "",
			xml = "",
			result = null,
			$reservationtime = null,
			$timeState,
			refreshTree,
			jstree = null,
			selected = false,
			share = null,
			isAdmin = graph.utils.isAdmin(),
			g = _this.graph;

		xml = graph.utils.getXml(_this);
		graph.dialog("保存视图", graph.utils.render("view/save.html", {
			isAdmin : isAdmin
		}), function(element, o){
			var obj = null,
				json,
				ciarr = [],
				viewName = "";

			if(selected){
				viewName = $("#viewname").val();

				if(viewName){
					_this.graph.zoomActual();
					json = JSON.stringify(_this.graph.getJson());
					_this.graph.zoomToCenter();
					ciarr = graph.utils.getGraphCiList(g);

					result = graph.api.saveView(selected, viewName, xml, json, share, ciarr);
					graph.utils.alert(result.message);

					if(graph.utils.isTrueRet(result)){
						obj = graph.utils.getVisibleModuleObj();
						obj.setCache("viewid", result.data._neo4jid_);
						obj.setCache("isFromPub", (share==="public"));
						o.hide();
						graph.viewManagement.refreshPub();
						graph.viewManagement.refreshPri();
					}
				}else{
					graph.utils.alert("视图名称不能为空！");
				}
			}else{
				graph.utils.alert("必须选择一个分类");
				throw new Error("必须选择一个分类");
			}
		});

		jstree = function($container, data, type){
			var list = [];
			$.each(data, function(){
				if(typeof this.view === "undefined"){
					list.push(this);
				}
			});

			$container.jstree({
				core : {
					data : list,
					check_callback : true
				}
			}).bind('select_node.jstree', function(event, data) {
				selected = data.node.id;
				share = type;
			});

			graph.utils.jstreeEvent($container);
		};

		refreshTree = function(){
			jstree($("#privateTab").find(".tree-main"), graph.viewManagement.getTreeDataPri(), "private");
			if(isAdmin){
				jstree($("#publicTab").find(".tree-main"), graph.viewManagement.getTreeDataPub(), "public");
			}
		};

		refreshTree();
		$reservationtime = $("#reservationtime");
		$timeState = $("#timeState");
		$reservationtime.daterangepicker({
			format: 'YYYY-MM-DD'
		},function(start, end) {
			/*
			 var startDate = start.year()+"-"+(start.month()+1) + "-" +start.date() + " " +start.hour()+":"+start.minute()+":00";
			 var endDate = end.year()+"-"+(end.months()+1) + "-" +end.date() + " " +end.hour()+":"+end.minute()+":00";

			 var data = getData(urlParams.monStandardId,  startDate, endDate);
			 draw(data);
			 */
		});
		$reservationtime.hide();
		$timeState.change(function(){
			if(this.value === "1"){
				$reservationtime.show();
			}else{
				$reservationtime.hide();
			}
		});

		$("#publicTab").find(".create-fold-btn").click(function(){
			graph.viewManagement.createFoldPublic(function(pos, obj){
				var jstree;
				jstree = $("#publicTab").find(".tree-main").jstree(true);
				jstree.create_node(pos, obj);
				jstree.open_node(pos);
			});
		});

		$("#privateTab").find(".create-fold-btn").click(function(){
			graph.viewManagement.createFoldPrivate(function(pos, obj){
				var jstree;
				jstree = $("#privateTab").find(".tree-main").jstree(true);
				jstree.create_node(pos, obj);
				jstree.open_node(pos);
			});
		});
	};
	
	// 更新视图
	self[fix.MENU_VIEW_UPDATE] = function(){
		var _this = this,
			xml = "",
			viewid = "",
			tmp,
			getData = null,
			html = "",
			dialog = null,
			g = _this.graph;

		tmp = graph.utils.getVisibleModuleObj().getCache();
		if((tmp.isFromPub && graph.utils.isAdmin()) || !tmp.isFromPub){
			viewid = tmp.viewid;
			getData =  graph.api.getView(viewid);
			xml = graph.utils.getXml(_this);

			if(graph.utils.isTrueRet(getData)){
				html = graph.utils.render("view/update.html", {
					xml : xml,
					viewid : viewid,
					viewname: getData.data.name,
					isPrivate : getData.data.open === "private"
				});

				dialog = graph.dialog("更新视图", html, function(element){
					var json,
						ciarr,
						result,
						viewname;

					viewname = $.trim(element.find("input[name=viewname]").val());
					if(viewname){
						_this.graph.zoomActual();
						json = JSON.stringify(_this.graph.getJson());
						_this.graph.zoomToCenter();
						ciarr = graph.utils.getGraphCiList(g);
						result = graph.api.updateView(viewid, viewname, xml, json, getData.data.open, ciarr);
						if(graph.utils.isTrueRet(result)){
							dialog.hide();
						}
						graph.utils.alert(result.message);
					}else{
						graph.utils.alert("视图名称不能为空");
					}
				});
			}else{
				graph.utils.alert(getData.message);
			}
		}else{
			graph.utils.alert("您没有权限更新公有视图，您可以另存到您的私有视图里");
		}

	};
	
	
	self[fix.MENU_VIEW_OPEN] = function(){
		var _this = this,
			obj  = null;
		
		graph.viewManagement.selectView(function(viewid, isPub){
			var result;
			result =  graph.api.getView(viewid);
			if(graph.utils.isTrueRet(result)){
				graph.utils.openXml(_this, result.data.xml);
				obj = graph.utils.getVisibleModuleObj();
				obj.setCache("viewid", viewid);
				obj.setCache("isFromPub", isPub);
			}else{
				graph.utils.alert(result.message);
			}
		});
	};
	
	self[fix.MENU_VIEW_URL] = function(){
		var tmp,
			url;
		
		tmp = graph.viewManagement.getCache();
		
		url = [
			window.location.origin,
			"/mmdb2/graph/tree.html",
			"?viewid="+encodeURIComponent(tmp.viewid),
			"&viewname="+encodeURIComponent(tmp.viewname)
		].join("");

		window.prompt("视图URL", url);
	};
	
	self[fix.MENU_VIEW_NEW_WINDOW] = function(){
		var tmp,
			url;
		
		tmp = graph.viewManagement.getCache();
		
		url = [
			"tree.html",
			"?cateid="+encodeURIComponent(tmp.cateid),
			"&viewid="+encodeURIComponent(tmp.viewid),
			"&neo4jid="+encodeURIComponent(tmp.neo4jid)
		].join("");
		
		window.open(url);
	};
	
	
	// 设置背景图
	self[fix.MENU_BACKGROUND_IMG_SET] = function(){
		var _this = this,
			o = null,
			input;
			
		input = document.createElement("input");
		input.type = "file";
		
		o = graph.dialog("上传图片", input.outerHTML, function(element){
			var file = element.find("input[type=file]")[0];
			graph.api.uploadImg(file, function(result){
				var url = "",
					element;

				//graph.loading.hide();
				$(".modal-backdrop").remove();
				if(graph.utils.isTrueRet(result)){
					url = "../" + result.data;
					
					element = document.createElement("img");
					element.src = url;
					element.onload = function(){
						var img = null;
						
						img = new mxImage(url, this.width, this.height);
						_this.graph.setBackgroundImage(img);
						_this.graph.view.validate();
						o.removeElement();
					};
					
					element.onerror = function(){
						graph.utils.alert("加载图片出错");
						o.removeElement();
					};
					
				}else{
					graph.utils.alert(result.message);
				}
			});
		});
	};
	
	
	// 移除背景图片
	self[fix.MENU_BACKGROUND_IMG_RM] = function(){
		var _this = this;
			
		_this.graph.setBackgroundImage(null);
		_this.graph.view.validate();
	};
	
	
	self[fix.MENU_LAYOUT_H] = function(){
		var _this = this;
		
		graph.utils.executeLayout(
			_this.graph,
			new mxHierarchicalLayout(_this.graph, mxConstants.DIRECTION_WEST),
			true,
			true
		);
		
		_this.graph.zoomToCenter();
	};
	
	
	self[fix.MENU_LAYOUT_V] = function(){
		var _this = this;
		
		graph.utils.executeLayout(
			_this.graph,
			new mxHierarchicalLayout(_this.graph, mxConstants.DIRECTION_NORTH),
			true,
			true
		);
		
		_this.graph.zoomToCenter();
	};
	
	
	self[fix.MENU_LAYOUT_C] = function(){
		var _this = this;
		
		graph.utils.executeLayout(
			_this.graph,
			new mxCircleLayout(_this.graph),
			true,
			true
		);
		
		_this.graph.zoomToCenter();
	};
	
	self[fix.MENU_LAYOUT_O] = function(){
		var _this = this;
		
		graph.utils.executeLayout(
			_this.graph,
			new mxFastOrganicLayout(_this.graph),
			true,
			true
		);
		
		_this.graph.zoomToCenter();
	};
	
	 
	self[fix.MENU_LAYOUT_L] = function(){
		var _this = this;
		
		graph.utils.executeLayout(
			_this.graph,
			new mxParallelEdgeLayout(_this.graph),
			true,
			true
		);
		
		_this.graph.zoomToCenter();
	};
	
	
	self[fix.MENU_LAYOUT_SV] = function(){
		var _this = this;
		
		graph.utils.executeLayout(
			_this.graph,
			new mxStackLayout(_this.graph, true),
			true,
			true
		);
		
		_this.graph.zoomToCenter();
	};
	
	self[fix.MENU_LAYOUT_SH] = function(){
		var _this = this;
		
		graph.utils.executeLayout(
			_this.graph,
			new mxStackLayout(_this.graph, false),
			true,
			true
		);
		
		_this.graph.zoomToCenter();
	};


	self[fix.MENU_EXPORT_PNG] = function(){
		var _this = this,
			svg;
		
		svg = graph.utils.svgToExportFormat(_this.graph.container);
		graph.api.exportPng(null, null, svg);
	};


	self[fix.MENU_EXPORT_PDF] = function(){
		var _this = this,
			svg;
		
		svg = graph.utils.svgToExportFormat(_this.graph.container);
		graph.api.exportPdf(null, null, svg);
	};

	self[fix.MENU_EXPORT_XML] = function(){
		var _this = this,
			xml,
			fileName;
			
		fileName = "mxGraph_" + (Date.now()) + ".xml";
		xml = graph.utils.getXml(_this);
		if(typeof Blob === "function"){
			saveAs(
				new Blob([xml], {type: "text/plain;charset=utf-8"}),
				fileName
			);
		}else{
			graph.utils.alert("您的浏览器不支持导出XML功能，请使用IE10+, chrome, Firefox浏览器");
		}

	};

	self[fix.MENU_VIEW_RELATION_ADD] = function(evt, cell){
		var _this = this;
		graph.viewManagement.selectViews(function(arr){
			$.each(arr, function(){
				graph.utils.setViewForCell(_this.graph, cell, this.viewname, this.viewid);
			});

			graph.utils.render("share/openViewPath.html", null, function(html){
				var dialog = graph.dialog("选择关联视图打开方向（3D）", html, function(element, dialog){
					var value = element.find("input[name=path]:checked").val();
					_this.graph.setCellAttr(cell, "openViewPath", value);
					dialog.hide();
				});

				dialog.element.find('.radio-list input[type=radio]').change(function() {
					var $label = $(this).closest("label");
					$label.parents().find(".checked").removeClass("checked");
					if ($(this).is(':checked')) {
						$label.find(".radio > span").addClass("checked");
					} else {
						$label.find(".radio > span").removeClass("checked");
					}
				});
			});
		});
	};
	
	self[fix.MENU_VIEW_RELATION_OPEN] = function(evt, cell){
		var _this = this,
			o = null,
			title;
			
		title = "打开关联视图";
		graph.utils.selectViewForCell(_this, cell, title, function(viewid){
			var result;
			
			result =  graph.api.getView(viewid);
			
			if(graph.utils.isTrueRet(result)){
				o = graph.utils.getVisibleModuleObj();
				
				if(!Array.isArray(o.history)){
					o.history = [];
				}
				
				o.history.push(graph.utils.getXml(_this));
				
				try{
					graph.utils.openXml(_this, result.data.xml);
				}catch(e){
					o.history.pop();
				}
				
			}else{
				graph.utils.alert(result.message);
			}
		});
	};
	
	
	self[fix.MENU_VIEW_RELATION_RM] = function(evt, cell){
		var _this = this,
			title = "";

		title = "删除关联视图";
		graph.utils.selectViewForCell(_this, cell, title, function(viewid, viewname){
			graph.utils.delViewForCell(_this.graph, cell, viewname, viewid);
		});
	};
	
	
	self[fix.MENU_OPEN_CHILD] = function(evt, cell){
		var _this = this,
			ciCate = "",
			utils = null,
			html = null,
			dialog = null,
			addCi = null,
			getRs = null,
			getTerm = null,
			getDepthDown = null,
			getDepthUp = null,
			cilistElement = null,
			ciMain = null,
			rsMain = null,
			ciResult = null,
			rsResult = null,
			rsHtml = "",
			obj = null,
			type = null,
			formatData = null,
			treeData = null;
			
		obj = graph.utils.getVisibleModuleObj();
		type = cell.id.split("_")[0];

		getRs = function(){
			var ret = [];
			rsMain.find(".selected").each(function(){
				ret.push($(this).attr("rsname"));
			});
			return ret.length>=1 ? ret : null;
		};

		getTerm = function(){
			var dict = {},
				has = false;
			
			cilistElement.find(">div[ciname]").each(function(){
				var key = $(this).attr("ciname"),
					inputVal = "",
					selectVal = "";
				has = true;
				inputVal = $(this).find("input[type=text]").val();
				inputVal = inputVal === "" ? "*" : inputVal;
				selectVal = $(this).find("select").val();
				selectVal = selectVal === "全部" ? "*" : selectVal;
				dict[key] = {};
				dict[key][selectVal] = inputVal;
			});

			return has ? JSON.stringify(dict) : null;
		};

		getDepthDown = function(){
			var val = "";
			val = dialog.element.find("select[name=depth-down]").val();
			return val === "全部" ? -1 : val;
		};
		getDepthUp = function(){
			var val = "";
			val = dialog.element.find("select[name=depth-up]").val();
			return val === "全部" ? null : val;
		};
		
		addCi = function(treeid, ciname){
			var ciitem = "",
				i = 0,
				option = null,
				select = null,
				result = null,
				element = null;
				
			if(cilistElement.find(">div[ciname='"+ciname+"']").length === 0){
				ciitem = utils.render("share/ciitem.html", {
					ciname : ciname,
					treeid: treeid
				});
				
				cilistElement.append(ciitem);
				element = cilistElement.find(">div:last");
				select = element.find("select");
				
				if(type == "ci"){
					result = mmdb.ci.category.get(ciname);
				}
				
				if(type == "kpi"){
					result = mmdb.kpi.category.get(name);
				}

				if(utils.isTrueRet(result) && Array.isArray(result.data.attributes)){
					for(i=0; i<result.data.attributes.length; i++){
						option = document.createElement("option");
						option.innerHTML = result.data.attributes[i].name;
						select.append(option);
					}
				}else{
					utils.alert(result.message);
				}
				
			}else{
				utils.alert("此分类已添加");
			}
		};

		formatData = function(data){
			var ret = [],
				loop = null;

			loop = function(list){
				$.each(list, function(){
					this.text = this.name;
					delete this.id;
					if(this.childrenNode){
						this.children = this.childrenNode;
						loop(this.childrenNode);
					}
				});
			};
			loop(data);
			return data;
		};
			
		utils = graph.utils;
		
		if(type == "ci"){
			ciResult = graph.api.getCiCate();
			if(utils.isTrueRet(ciResult)){
				treeData = formatData(ciResult.data);
			}else{
				alert(ciResult.message);
				throw new Error(ciResult.message);
			}
		}
		
		if(type == "kpi"){
			ciResult = graph.api.getKpiCate();
		}
		rsResult = graph.api.getRelationStructure();
		html = utils.render("share/base.html", {
			rslist: rsResult.data
		});
		dialog = graph.dialog("展开子节点", html, function(element){
			var result = null,
				neo4jId = "",
				rs = null,
				term = "",
				dir = 0,
				depth = null;

			if(obj && obj.openChild){
				neo4jId = cell ? cell.id : "";
				rs = getRs();
				term = getTerm();
				dir = {
					down: getDepthDown(),
					up : getDepthUp()
				};

				obj.openChild(cell, neo4jId.split("_")[1], rs, term, dir, _this.graph);
			}
			dialog.hide();
		});
		
		$("#myCateTree").jstree({
			core : {data : treeData},
			plugins:["checkbox", "crrm", "state"]
		}).on("changed.jstree", function(event, data){
			var jstree = $("#myCateTree").jstree(true),
				selected = jstree.get_selected();

			cilistElement.find("div[ciname]").each(function(){
				var treeid = $(this).attr("treeid");
				if($.inArray(treeid, selected) === -1){
					$(this).remove();
				}
			});

			$.each(selected, function(){
				if(cilistElement.find("div[treeid="+this+"]").length === 0){
					addCi(this, jstree.get_node(this).text);
				}
			});
		});

		cilistElement = $("#addCiList");
		rsMain = $("#tab_8_3");
		rsMain.find("button").each(function(){
			$(this).click(function(){
				if($(this).hasClass("selected")){
					$(this).html("选择");
					$(this).removeClass("selected");
					$(this).removeClass("btn-danger");
					$(this).addClass("btn-success");
				}else{
					$(this).html("取消");
					$(this).addClass("selected");
					$(this).addClass("btn-danger");
					$(this).removeClass("btn-success");
				}
			});
		});
	};
	
	
	self[fix.MENU_CELL_DELETE] = function(evt, cell){
		var cells;

		cells = this.graph.getSelectionCells();
		if(cells.length == 0){
			cells.push(cell);
		}
		this.graph.removeCells(cells);
	};
	
	self[fix.MENU_CELL_COPY] = function(evt, cell){
		mxClipboard.copy(this.graph);
	};
	
	self[fix.MENU_CELL_CUT] = function(){
		mxClipboard.cut(this.graph);
	};
	
	self[fix.MENU_CELL_PASTE] = function(){
		mxClipboard.paste(this.graph);
	};
	

	self[fix.MENU_OBJECT_CREATE] = function(evt, cell){
		var _this = this,
			result = null,
			html = "",
			dialog = null;
		
		if(cell.vertex && cell.value){
			result = mmdb.ci.category.get(cell.value);
			if(graph.utils.isTrueRet(result)){
				
				html = graph.utils.render("share/attr.html", {
					list : result.data.attributes
				});
				
				dialog = graph.dialog("配置信息创建", html, function(element){
					var error = [],
						result = null,
						obj = {};
						
					element.find(".attr-edit input[name]").each(function(){
						var key,
							value,
							required;
						
						key = $(this).attr("name");
						value = $(this).val().trim();
						required = $(this).attr("required") == "1";
						
						obj[key] = value;
						
						if(required && !value){
							error.push(key + "：值不能为空");
						}
					});
					
					if(error.length === 0){
						result = graph.api.saveCi(cell.value, obj);
						
						if(graph.utils.isTrueRet(result)){
							dialog.hide();
	
							cell.setId(["ci", result.data._neo4jid_].join("_"));
							cell.setValue(result.data._id_);
								
							_this.graph.refresh();
							
						}else{
							graph.utils.alert(result.message);
						}
						
					}else{
						graph.utils.alert(error.join("\r\n"));
					}
				});
				
			}else{
				graph.utils.alert(result.message);
			}
		}else{
			graph.utils.alert("对象不能编辑属性");
		}
		
	};
	
	self[fix.MENU_OBJECT_DETAIL] = function(evt, cell){
		var _this = this,
			html = "",
			arr = [],
			key = 0,
			dialog = null,
			result;

		result = graph.api.getCi(cell.id.split("_")[1]);
		
		if(graph.utils.isTrueRet(result)){
			for(key in result.data){
				if(key.substr(0, 1) !== "_"){
					arr.push({
						name : key,
						defaultVal : result.data[key],
						required : key === "配置项名称"
					});
				}
			}

			html = graph.utils.render("share/attr.html", {
				list : arr
			});

			dialog = graph.dialog("配置信息", html, function(element){
				var error = [],
					result = null,
					obj = {};

				element.find(".attr-edit input[name]").each(function(){
					var key,
						value,
						required;

					key = $(this).attr("name");
					value = $(this).val().trim();
					required = $(this).attr("required") == "1";

					obj[key] = value;

					if(required && !value){
						error.push(key + "：值不能为空");
					}
				});

				if(error.length === 0){

					result = graph.api.updateCi(cell.id.split("_")[1], obj);

					if(graph.utils.isTrueRet(result)){
						dialog.hide();
					}
					graph.utils.alert(result.message);

				}else{
					graph.utils.alert(error.join("\r\n"));
				}
			});
		}else{
			graph.utils.alert(result.message);
		}
	};

	self[fix.MENU_OBJECT_DETAIL_RELATION] = function(evt, cell){
		var _this = this,
			html = "",
			arr = [],
			key = 0,
			dialog = null,
			tmp = null,
			rid = "",
			result = null;

		tmp = cell.id.split("_");
		tmp.shift();
		rid = tmp.join("_");
		result = graph.api.getCiRelation(rid);

		if(graph.utils.isTrueRet(result)){
			for(key in result.data.relValue){
				if(key.substr(0, 1) !== "_"){
					arr.push({
						name : key,
						defaultVal : result.data.relValue[key],
						required : key === "配置项名称" ? true : false
					});
				}
			}

			html = graph.utils.render("share/attr.html", {
				list : arr
			});

			dialog = graph.dialog("配置信息", html, function(element){
				var error = [],
					result = null,
					obj = {};

				element.find(".attr-edit input[name]").each(function(){
					var key,
						value,
						required;

					key = $(this).attr("name");
					value = $(this).val().trim();
					required = $(this).attr("required") == "1";

					obj[key] = value;

					if(required && !value){
						error.push(key + "：值不能为空");
					}
				});

				if(error.length === 0){

					result = graph.api.updateCiRelation(rid, obj);

					if(graph.utils.isTrueRet(result)){
						dialog.hide();
					}
					graph.utils.alert(result.message);

				}else{
					graph.utils.alert(error.join("\r\n"));
				}
			});
		}else{
			graph.utils.alert(result.message);
		}
	};
	
	self[fix.MENU_CONFIG_INFO] = function(evt, cell){
		var _this = this,
			type = "";

		if(cell.id.indexOf('ci_') >= 0){
			type = "ci";

			if(cell.id.indexOf('header_') >= 0){
				var id = cell.id.split("_").pop();
				cell = _this.graph.getCellByID("ci_"+id);
			}
		}else{
			type = cell.id.split("_")[0];
		}

		if(type == "ci" || type == "kpi"){
			self[fix.MENU_OBJECT_DETAIL].apply(_this, [evt, cell]);
		}else if(type == "relation") {
			self[fix.MENU_OBJECT_DETAIL_RELATION].apply(_this, arguments);
		}else{
			self[fix.MENU_OBJECT_CREATE].apply(_this, [evt, cell]);
			// graph.utils.alert("此对象不能编辑");
		}
	};

	self[fix.MENU_GRAPH_CLEAR] = function(){
		self[fix.MENU_BACKGROUND_IMG_RM].apply(this);
		this.graph.removeCells(this.graph.getChildCells());
	};
	
	self[fix.MENU_RELATION_CREATE] = function(evt, cell){
		var _this = this,
			error = [],
			result = null,
			showDialog;
			
		showDialog = function(list){
			var dialog = null,
				relationRet = null;
			
			dialog = graph.dialog("关系创建", "", function(element){
				var ret,
					result;
				
				ret = relationRet();
				result = graph.api.saveCiRelation(
					cell.source.id.split("_")[1],
					cell.target.id.split("_")[1],
					ret.type,
					ret.attr
				);
				
				if(graph.utils.isTrueRet(result)){
					cell.setValue(ret.type);
					cell.setId(["relation", cell.source.id.split("_")[1],ret.type ,cell.target.id.split("_")[1]].join("_"));
					dialog.hide();

					if(ret.type == "eip"){
						_this.graph.setCellStyles(
							mxConstants.STYLE_STROKEWIDTH,
							DEFINE.EIP_STROKEWIDTH,
							[cell]
						);

						cell.setId([
							cell.source.id.split("_")[1],
							"eip",
							cell.target.id.split("_")[1]
						].join("_"));
					}

					_this.graph.refresh(cell);
				}
				graph.utils.alert(result.message);
			});
			
			relationRet = graph.utils.relationDialog(dialog.element, list);
		};
		
		if(cell.isEdge()){
			if(cell.source.id.split("_")[0] != "ci"){
				error.push("错误：" + cell.source.value + "不是CI对象");
			}
			
			if(cell.target.id.split("_")[0] != "ci"){
				error.push("错误：" + cell.target.value + "不是CI对象");
			}
			
			if(error.length === 0){
				
				result = graph.api.getRelation();
				
				if(graph.utils.isTrueRet(result)){
					showDialog(result.data);
				}else{
					graph.utils.alert(result.message);
				}
				
			}else{
				graph.utils.alert(error.join("\r\n"));
			}
			
		}else{
			graph.utils.alert("错误：只有edge才能建立关系");
		}
	};
	
	
	self[fix.MENU_MODULE_ORI] = function(){
		var _this = this,
			cells;

		cells = _this.graph.getDepCells();
		cells.each(function(){
			if(this.vertex 
					&& this.id.indexOf("in_") === -1
					&& this.id.indexOf("kpi_") === -1){
				//_this.graph.setOriStyle(this, this.getStyle());
				this.setStyle(_this.graph.getOriStyle(this));
				_this.graph.refresh(this);
			}
		});
	};
	
	self[fix.MENU_MODULE_TAG] = function(){
		var _this = this,
			cells;

		cells = _this.graph.getDepCells();
		cells.each(function(){
			if(this.vertex 
					&& this.id.indexOf("in_") === -1
					&& this.id.indexOf("kpi_") === -1){
				_this.graph.setOriStyle(this, this.getStyle());
				this.setStyle('whiteSpace=wrap;');
				_this.graph.refresh(this);
			}
		});
	};

	self[fix.MENU_OPEN_CHILD_NEW_WINDOW] = function(evt, cell){
		var _this = this,
			arr = [];

		if(cell.id.indexOf("ci_") >= 0){
			arr = cell.id.split("_");
			window.open("openChildTree.html?level=5&type=min&id=" + arr[arr.length - 1]);
		}else{
			graph.utils.alert("不是一个ci");
		}
	};

	self[fix.MENU_THRESHOLD_UPDATE] = function(evt, cell){
		var key,
			arr = [],
			obj;

		obj = {
			"id":15,
			"view": "其它",
			"threshold1":378,
			"threshold2":98,
			"threshold3":76,
			"threshold4":129,
			"threshold5":34,
			"kpiClass": "fasfdgasfd",
			"kpi": "asfsaf",
			"instance": "asdfasfd",
			"ci": "39, 58, 28"
		};

		for(key in obj){
			arr.push({
				name : key,
				defaultVal : obj[key],
				update : key.indexOf("threshold")>=0 ? true : false
			});
		}

		graph.utils.render("share/threshold.html", {
			list : arr
		}, function(html){
			graph.dialog("更新阀值", html, function(element){

			});
		});
	};

	self[fix.MENU_CONTAINER_FILTER_SET] = function(){
		graph.utils.render("share/filterSet.html", null, function(html){
			graph.dialog("设置容器过滤条件", html, function(element){

			});
		});
	};

	self[fix.MENU_SEARCH_NODE] = function (evt) {
		var _this = this,
			dialog,
			obj = graph.utils.getVisibleModuleObj();

		var search = function(){
			var value = $.trim($("#searchNode").val()),
				result;

			if(value){
				if(!obj.search){
					obj.search = Search({graph: _this.graph});
				}

				obj.search.cellDelHighlighter();
				result = obj.search.soCell(value);
				if(result.vertex.length >= 1){
					obj.search.cellAddHighlighter(result);
					dialog.hide();
				}else{
					graph.utils.alert("未搜素到" + value + "节点");
				}
			}else{
				graph.utils.alert("错误：搜索名称不能为空");
			}
		};

		graph.utils.render("share/searchNode.html", null, function(html){
			dialog = graph.dialog("搜索节点", html, search);
			dialog.element.find("#searchNodeBtn").click(search);
			dialog.element.find("form").submit(function(e){
				e.preventDefault();
				search();
			});
		});
	};


	self[fix.MENU_SEARCH_PATH] = function (evt) {
		var _this = this,
			dialog,
			obj = graph.utils.getVisibleModuleObj();

		var search = function(){
			var startNode = $.trim($("#startNode").val()),
				endNode = $.trim($("#endNode").val()),
				startResult,
				endResult,
				result;

			if(startNode && endNode){
				if(!obj.search){
					obj.search = Search({graph: _this.graph});
				}

				obj.search.cellDelHighlighter();
				startResult = obj.search.soCell(startNode);
				endResult = obj.search.soCell(endNode);
				if(startResult.vertex.length >= 1 && endResult.vertex.length >= 1){
					result = obj.search.soPath(startResult.vertex[0], endResult.vertex[0]);
					obj.search.info(result);
					obj.search.cellAddHighlighter(result);
					dialog.hide();
				}else{
					graph.utils.alert("未搜素到[" + startNode + "] 到 ["+ endNode +"] 路径");
				}
			}else{
				graph.utils.alert("错误：搜索名称不能为空");
			}
		};

		graph.utils.render("share/searchPath.html", null, function(html){
			dialog = graph.dialog("搜索路径", html, search);
			dialog.element.find("#searchPathBtn").click(search);
			dialog.element.find("form").submit(function(e){
				e.preventDefault();
				search();
			});
		});
	};

	self[fix.MENU_SEARCH_CLEAR] = function (evt) {
		var _this = this,
			obj = graph.utils.getVisibleModuleObj();

		if(obj.search && obj.search.cellDelHighlighter){
			obj.search.cellDelHighlighter();
		}
	};

	/**
	 * patch for dashboard 2014-9-15
	 * 用于定义仪表盘上右键菜单的动作-仪表盘配置
	 * @param evt
	 * @param cell
	 */
	self[fix.MENU_CHARTCONF] = function (evt,cell) {
		dashboard.chartsetting.runSetting(this,cell,graph);
	};
	
})(nameSpace.reg("DEFINE.GRAPH_CONTEXT_MENU_LIBS"), nameSpace.reg("DEFINE"));
