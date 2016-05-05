
(function(self){
	
	"use strict";
	
	// member defined
	self.ciListID = "ciList";
	self.graphContainer = null;
	self.tableContainer = null;
	self.template = "accordion/ci.html";
	self.container = null;
	self.cilib = [];
	
	self.monitorLib = {};
	
	self.htmlStyle = "html=1;strokeColor=blue; strokeWidth=1;";
	
	self.htmlcell_width = 200;
	self.htmlcell_height = 150; 
	
	self.checkboxLib = null;
	
	self.key = {

		str : [
			'a','b','c','d','e','f','g','h','i','j','k','l','m',
			'o','p','q','r','s','t','x','u','v','y','z','w','n',
			'0','1','2','3','4','5','6','7','8','9'
		],
		
		randint : function(n,m){
			var c = m-n+1;
			var num = Math.random() * c + n;
			return	Math.floor(num);
		},

		randStr : function(){
			var _this = this;
			var leng = _this.str.length - 1;
			var randkey = _this.randint(0, leng);
			return _this.str[randkey];
		},
		
		create : function(len){
			var _this = this;
			var l = len || 10;
			var str = '';
			
			for(var i = 0 ; i<l ; i++){
				str += _this.randStr();
			}
		
			return str;
		}

	};

	// getBody
	self.getBody = function(){
		var _this = this,
			html = "";
		
		html = graph.utils.render(_this.view, {
			ciListID : self.ciListID
		});
		
		return html;
	};
	
	// init
	self.init = function(){
		var container = document.getElementById(self.ciListID);
		
		// graph
		self.graph();
		
		// 右键
		new graphContextMenu(self.editor, self.contextMenu);
		
		self.container = $("#" + self.ciListID);
		self.write();
		self.binding();
		
		self.tableContainer = $("#graph_table_1");
		
	};
	
	self.getdata = function(){
		var result = mmdb.ci.information.qureyByAdvanced(null,{"*":"*"},1, 10000);
		if(result.success){
			return result.data;
		}else{
			throw new Error(result.message);
		}
	};
	
	self.write = function(){
		var data = null,
			html = "";
		
		self.cilib = self.getdata().datas;
		html = graph.utils.render("ciList/table.html", {
			list : self.cilib
		});
		self.container.html(html);
		
		self.container.find("input[type=checkbox][name=all]").click(function(){
			if($(this).is(":checked")){
				self.container.find("input[type=checkbox]").each(function(){
					 $(this).attr("checked", true);
				});
			}else{
				self.container.find("input[type=checkbox]").each(function(){
					 $(this).removeAttr("checked", false);
				});
			}
		});
	};
	
	// graph
	self.graph = function(){
		self.editor = graph.utils.getEditor(
			self.graphContainer,
			self.outlineContainer,
			self.handle
		);
		
		/*
		self.sidebar = new Sidebar(
			self.editor,
			document.getElementById(self.ciListID)
		);
		*/
	};
	
	// select
	self.select = function(){
		self.editor.graph.keyHandler.handler.enabled = true;
	};
	
	
	
	self.binding = function(){
		self.container.find("table tr").each(function() {
			var id = "",
				obj = {};
				
			if($(this).attr("ciID")){
				self.drag(this);
			}
		});
	};
	
	
	self.drag = function(element){
 		self.createDragSource(
			element,
			self.createDropHandler(element, true),
			self.createDragPreview(60, 60)
		);
	};
	
	self.createDragPreview = function(width, height, html) {
		var elt = document.createElement('div');
		elt.style.border = '1px dashed black';
		elt.style.width = width + 'px';
		elt.style.height = height + 'px';
		elt.innerHTML = html?html:'';
		return elt;
	};
	
	self.createCell = function(g, parent, id, x, y, o){
		var tabName = "",
			width = "",
			height = "",
			style = "",
			image = "",
			value = "";
		
		image = "../resource/svg/1.svg";
		tabName = $(".rightmenu .nav-tabs li.active a").attr("name");
		if(tabName === "rightMonitorTab"){
			width = self.htmlcell_width;
			height = self.htmlcell_height;
			value = graph.utils.render("ciList/cell_html.html", {
				list : self.getMonitorList(),
				info : self.getLibItem(id),
				id : id,
				width: self.htmlcell_width - 5,
				height: self.htmlcell_height - 5
			});
			
			value = value.replaceAll("\r\n", "");
			
			style = self.htmlStyle;
		}
		
		if(tabName === "rightConfigTab"){
			width = DEFINE.INFO_dragWidth;
			height = DEFINE.INFO_dragHeight;
			value = o.attr("ciName");
			
			style = 'image;image=' + image;
		}
		
		return g.insertVertex(
			parent,
			id,
			value,
			x,
			y,
			width,
			height,
			style
		);
	};
	
	self.createDropHandler = function(sCell, allowSplit) {
		return function(graph, evt, target, x, y) {
			var getObj = null,
				have =	null,
				isSave = false,
				sel		= null,
				getSelectTr = null,
				id 	= "",
				i = 0,
				ii = 0,
				arr = [],
				ids = [],
				tabName = "",
				v1 = null,
				v2 = null,
				isLayout = false,
				isSelectMore = false,
				isTo = false,
				result = null,
				model = null,
				selects = null;

			// var all = mmdb.remote.configuration.getAll(false);
			
			// 判断是否重复
			getObj = function(id) {
				var list = null,
					i = "",
					objid = "",
					ret = false;
					
				graph.selectAll();
				list = graph.getSelectionCells();
				ret = null;
				
				for(i=0; i<list.length; i++) {
					objid = list[i].id;
					if (objid == id) {
						ret = true;
						break;
					}
				}
				
				return ret;
			};
			
			getSelectTr = function(){
				var arr = [];
				self.container.find("tr[ciname]").each(function(){
					if($(this).find("input").is(":checked")){
						arr.push($(this));
					}
				});
				
				return arr;
			};
			
			isSave = false;
			selects = getSelectTr();
			
			if(selects.length >= 1){
				isSelectMore = true;
			}else{
				selects = [$(sCell)];
				isSelectMore = false;
			}
			
			(function(list){
				var i = 0,
					obj = null,
					has = false,
					validDropTarget = false,
					select = null,
					id = 0,
					name = "",
					parent = null,
					model = null,
					cell = null;
				
				parent = graph.getDefaultParent();
				model = graph.getModel();
				model.beginUpdate();
				
				try {
					for(i=0; i<list.length; i++) {
						obj = list[i];
						id = obj.attr("ciID");
						name = obj.attr("ciName");

						if(!getObj(id)){
							cell = self.createCell(graph, parent, id, x, y, obj);
							ids.push(id);
							graph.refresh(cell);
						}
					}
				} finally {
					model.endUpdate();
				}
				
			})(selects);
			
			
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
			
			for(i=0; i<ids.length; ids++){
				id = ids[i];
				result = mmdb.relation.ciinformation.queryRelInfoById(id);

				if(result.success){
					parent = graph.getDefaultParent();
					model = graph.getModel();
					model.beginUpdate();
					try {
						result = result.data;
						
						/**
						 * 假数据 
						 */
						
						/*
						result.relation = [
							"3_CI关系_4",
							"4_CI关系_5",
							"7_CI关系_11"
						];
						*/
						
						for(ii=0; ii<result.relation.length; ii++){
							arr = result.relation[ii].split("_");
							v1 = graph.model.getCell(arr[0]);
							v2 = graph.model.getCell(arr[2]);
							
							if(v1 && v2 && !isTo(v1.edges, v2.id)){
								graph.insertEdge(
									parent,
									self.key.create(),
									arr[1],
									v1,
									v2,
									'verticalAlign=bottom;fontStyle=2'
								);
								
								isLayout = true;
							}
						}
					} finally {
						model.endUpdate();
					}
					
				}else{
					console.log(result.message);
				}
			}
			
			
			// layout
			if(isLayout || isSelectMore){

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
				// graph.zoomToCenter();
				graph.clearSelection();
			}
			
			// 默认html 勾选已选中配置信息
			tabName = $(".rightmenu .nav-tabs li.active a").attr("name");
			if(tabName === "rightMonitorTab"){
				self.checked();
			}
			
			
			// 取消多选
			self.container.find("tr input").each(function(){
				$(this).attr("checked", false);
			});
		};
	};
	
	self.checked = function(){
		$("tr[displaytarget]").each(function(){
			var that = this;
			$(this).find("input[type=checkbox]:checked").each(function(){
				var displaytarget = "";
				displaytarget = $(that).attr("displaytarget");
				
				self.rightMonitorDisplay($("#tab_1_2"));
				self.showOne(displaytarget);
			});
		});
	};
	
	self.executeLayout = function(graph, layout, animate, ignoreChildCount) {
		
		graph.getModel().beginUpdate();
		try {
			// layout.execute(graph.getDefaultParent(), cell);
			layout.execute(graph.getDefaultParent());
		} catch (e) {
			throw e;
		} finally {
			// Animates the changes in the graph model except
			// for Camino, where animation is too slow
			if (animate && navigator.userAgent.indexOf('Camino') < 0) {
				// New API for animating graph layout results asynchronously
				var morph = new mxMorphing(graph);
				morph.addListener(
					mxEvent.DONE,
					mxUtils.bind(this,function() {
						graph.getModel().endUpdate();
					})
				);

				morph.startAnimation();
			} else {
				graph.getModel().endUpdate();
			}
		}
	};
	
	self.createDragSource = function(elt, dropHandler, preview) {
		var dragSource = null;
		
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
			
			var target = mxDragSource.prototype.getDropTarget.apply(this, arguments);

			if (!graph.isValidRoot(target)) {
				target = null;
			}

			return target;
		};

		return dragSource;
	};
	
	self.getLibItem = function(id){
		var i = 0,
			o = null;
		
		for(i=0; i<self.cilib.length; i++){
			if(self.cilib[i]._neo4jid_ == id){
				o = self.cilib[i];
				break;
			}
		}
		
		return o;
	};
	
	// 拼写表格html
	self.table = function(element){
		var cells = null,
			html = "",
			getLibItem = null,
			configDiv = null,
			monitorDiv = null,
			createDiv = null,
			tabName = "",
			list = [];
			
		createDiv = function(name){
			var elt = null;
			elt = document.createElement("div");
			elt.setAttribute("name", name);
			elt.style.cssText = [
				"width: 100%",
				"height: 100%",
				//"display: none"
			].join(";");
			element.append(elt);
			return $(elt);
		};
		
		monitorDiv = element.find("div[name=monitor_table]");
		if(monitorDiv.length === 0){
			monitorDiv = createDiv("monitor_table");
		}
		
		configDiv = element.find("div[name=config_table]");
		if(configDiv.length === 0){
			configDiv = createDiv("config_table");
		}
		

		tabName = $(".rightmenu .nav-tabs li.active a").attr("name");
		if(tabName === "rightMonitorTab"){
			self.getMonitorTabData(monitorDiv);
		}else{
			monitorDiv.hide();
		}
		
		
		if(tabName === "rightConfigTab"){
			self.getConfigTabData(configDiv);
		}else{
			configDiv.hide();
		}
	};
	
	self.getConfigTabData = function(element){
		var cells = null,
			html = "",
			list = [];
			
		cells = self.editor.graph.getChildVertices();
		
		cells.each(function(){
			var obj = null;
			obj = self.getLibItem(this.id);
			if(obj){
				list.push(obj);
			}
		});
		
		html = graph.utils.render("ciList/view_table.html", {
			list : list
		});
		
		element.html(html);
	};
	
	
	self.getMonitorTabData = function(element){
		var cells = null,
			table = null,
			row = null,
			col = null,
			keys = [],
			rows = [],
			i = 0,
			ii = 0,
			cols = [];
		
		
		cols.push("ciName");
		$(".rightmenu tr[displaytarget] input:checked").each(function(){
			cols.push($(this).parents("tr").attr("displaytarget"));
		});
		
		rows.push(cols);
		
		cells = self.editor.graph.getChildVertices();
		table = document.createElement("table");
		
		cells.each(function(){
			var i = 0,
				value = null;
			
			cols = [];
			
			for(i=0; i<rows[0].length; i++){
				if(i === 0){
					cols.push(self.getLibItem(this.id)._id_);
				}else{
					value = $("#cell_"+this.id).find("tr[name="+rows[0][i]+"] td:last span").html();
					if(typeof value === "undefined"){
						value = "";
					}else{
						value = window.parseInt(value);
						if(value<60){
							value = '<span style="color:green;">'+value+'</span>';
						}else if(value<80){
							value = '<span style="color:green;">'+value+'</span>';
						}else{
							value = '<span style="color:red;">'+value+'</span>';
						}
					}
					cols.push(value);
				}
			}
			
			rows.push(cols);
		});
		
		for(i=0; i<rows.length; i++){
			row = table.insertRow();
			for(ii=0; ii<rows[i].length; ii++){
				col = row.insertCell();
				col.innerHTML = rows[i][ii];
			}
		}
		
		element.html(table);
	};
	
	
	self.getMonitorList = function(ids){
		var result = null,
			keys = [],
			i = {},
			ret = [];
		
		result = mmdb.relation.cikpiinformation.getKpiByCiNeoIds(ids);
		if(result.success){
			self.checkboxLib = result.data;
			
			for(i in self.checkboxLib){
				self.checkboxLib[i].each(function(){
					if(!keys.inArray(this._id_)){
						keys.push(this._id_);
					}
				});
			}
			
			ret = keys;
			
		}else{
			console.log(result.message);
		}
		
		return keys;
	};
	
	
	self.rightConfigDisplay = function(element){
		var list = [],
			cells = [],
			html = "";		
		
		cells = self.editor.graph.getChildVertices();
		
		cells.each(function(){
			var x = 0,
				y = 0,
				value = "",
				newGeometry = null,
				geometry = null;
				
			geometry = this.getGeometry();
			x = geometry.x;
			y = geometry.y;
			
			this.setStyle("image;image=../resource/svg/1.svg;");
			
			value = self.getLibItem(this.id)._id_;
			
			newGeometry = new mxGeometry(
				geometry.x,
				geometry.y,
				DEFINE.INFO_dragWidth,
				DEFINE.INFO_dragHeight
			);
			
			this.setValue(value);
			this.setGeometry(newGeometry);
		});
		
		self.executeLayout(
			self.editor.graph,
			new mxHierarchicalLayout(
				self.editor.graph,
				mxConstants.DIRECTION_NORTH
			),
			true,
			true
		);
		
		self.editor.graph.refresh();
		// self.editor.graph.zoomToCenter();
		

		// 显示配置表格
		self.tableContainer.find("div[name=config_table]").show();
		self.tableContainer.find("div[name=monitor_table]").hide();
		self.getConfigTabData(self.tableContainer.find("div[name=config_table]"));
	};
	
	self.getGraphCanvasCiIds = function(){
		var arr = [],
			cells = [];
			
		cells = self.editor.graph.getChildVertices();
		cells.each(function(){
			arr.push(this.id);
		});
		
		return arr;
	};
	
	self.rightMonitorDisplay = function(element){
		var list = [],
			cells = [],
			i = 0,
			isLayout = false,
			html = "";
		
		cells = self.editor.graph.getChildVertices();
		
		cells.each(function(){
			var x = 0,
				y = 0,
				value = "",
				newGeometry = null,
				geometry = null;
				
			if(this.getStyle().indexOf("html=1;") === -1){
				isLayout = true;
				geometry = this.getGeometry();
				x = geometry.x;
				y = geometry.y;
				
				this.setStyle(self.htmlStyle);
				
				value = graph.utils.render("ciList/cell_html.html", {
					info : self.getLibItem(this.id),
					width: self.htmlcell_width - 5,
					height: self.htmlcell_height - 5,
					id : this.id
				});
				
				value = value.replaceAll("\r\n", "");
		
				newGeometry = new mxGeometry(
					geometry.x,
					geometry.y,
					self.htmlcell_width,
					self.htmlcell_height	
				);
				
				
				this.setValue(value);
				this.setGeometry(newGeometry);
			}
		});
		
		if(isLayout){
			self.executeLayout(
				self.editor.graph,
				new mxHierarchicalLayout(
					self.editor.graph,
					mxConstants.DIRECTION_NORTH
				),
				true,
				true
			);
			
			
			self.editor.graph.refresh();
		}

		//self.editor.graph.zoomToCenter();

		list = self.getMonitorList(self.getGraphCanvasCiIds());
		
		for(i=0; i<list.length; i++){
			if(element.find("tr[displaytarget="+list[i]+"]").length === 0){
				html = '<tr displayTarget="'+list[i]+'"><td><input type="checkbox" /></td><td>'+list[i]+'</td></tr>';
				element.find("table").append(html);
				
				element.find("table tr:last input").click(function(){
					var displaytarget = "";
					displaytarget = $(this).parents("tr").attr("displaytarget");
					
					if($(this).is(":checked")){
						self.showOne(displaytarget);
					}else{
						self.hideOne(displaytarget);
					}
					
					self.getMonitorTabData(self.tableContainer.find("div[name=monitor_table]"));
				});
				
			}
		}
		
		
		element.find("table input:checked").each(function(){
			var displaytarget = "";
			displaytarget = $(this).parents("tr").attr("displaytarget");
			self.showOne(displaytarget);
			self.getMonitorTabData(self.tableContainer.find("div[name=monitor_table]"));
		});
		
		
		// addEventListen
		self.addEventListen(element);
		
		
		// 显示监控表格
		self.tableContainer.find("div[name=monitor_table]").show();
		self.tableContainer.find("div[name=config_table]").hide();
		self.getMonitorTabData(self.tableContainer.find("div[name=monitor_table]"));
	};
	
	// addEventListen
	self.addEventListen = function(element){

		element.find("input[type=checkbox][name=all]").click(function(){
			if($(this).is(":checked")){
				element.find("input[type=checkbox]").each(function(){
					 $(this).attr("checked", true);
					 
					 $("tr[cellproperty]").each(function(){
					 	$(this).show();
					 });
				});
			}else{
				element.find("input[type=checkbox]").each(function(){
					 $(this).removeAttr("checked", false);
					 $("tr[cellproperty]").each(function(){
					 	$(this).hide();
					 });
				});
			}
		});
	};
	
	
	// display one
	self.showOne = function(key){
		var ids = [];
		ids = self.getGraphCanvasCiIds();
		
		ids.each(function(){
			var i = 0,
				lib = {},
				obj = {},
				list = {},
				html = "",
				id = this,
				info = self.getLibItem(this),
				o = self.checkboxLib[this];
				
			if($("#cell_" + this + " table tr[name="+key+"]").length >= 1){
				$("#cell_" + this + " table tr[name="+key+"]").show();
			}else{
				if(typeof o === "object"){
					for(i=0; i<o.length; i++){
						if(o[i]._id_ === key){
							lib = o[i];
							break;
						}
					}
				}
				
				for(i in lib){
					if(i[0] !== "_"){
						list[i] = lib[i];
					}
				}
				
				dwr.engine.setAsync(false);
				alarmBuz.queryEventByCIs([info._id_], [key], function(result){
					var i = 0,
						ii = 0,
						value = 0,
						o = null;
						
					if(result.success){
						
						for(i=0; i<result.data.length; i++){
							o = result.data[i];
							if(o.ciName === info._id_ && o.value){
								for(ii=0; ii<o.value.length; ii++){
									
									if(typeof o.value[ii][key] !== "undefined"){
										value = o.value[ii][key];
										value = window.parseInt(value);
										if(value<60){
											value = '<span style="color:green;">'+value+'</span>';
										}else if(value<80){
											value = '<span style="color:green;">'+value+'</span>';
										}else{
											value = '<span style="color:red;">'+value+'</span>';
										}
										
										html += '<tr name="'+key+'"><td>'+key+'</td><td>'+value+'</td></tr>';
										break;
									}
								}
							}
						}
					}else{
						html = "";
					}
				});
				
				dwr.engine.setAsync(true);
				
				$("#cell_" + id + " table").append(html);
			}

		});
	};
	

	
	// display one
	self.hideOne = function(key){
		$("tr[name="+key+"]").hide();
	};
	
	// right
	self.contextMenu = {
		vertex:[
			{name: DEFINE.MENU_OPEN_URL, aliases: "详细信息"},
			{name: DEFINE.MENU_OPEN_RELATION_VIEW, aliases: "详细视图"},
			'-',
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
			]
		],
		canvas: [
			{name: DEFINE.MENU_BACK_PARENT_VIEW, aliases: "返回上级视图"},
			DEFINE.MENU_LAYOUT,
			[
				DEFINE.MENU_LAYOUT_H,
				DEFINE.MENU_LAYOUT_V,
				DEFINE.MENU_LAYOUT_C,
				DEFINE.MENU_LAYOUT_P,
				DEFINE.MENU_LAYOUT_R
			],
			DEFINE.MENU_ZOOM,
			[
				DEFINE.MENU_ZOOMIN,
				DEFINE.MENU_ZOOMOUT,
				DEFINE.MENU_ZOOMACTUAL
			]
		],
		libs: DEFINE.GRAPH_CONTEXT_MENU_LIBS
	};
	
})(nameSpace.reg("graph.ciList"));
