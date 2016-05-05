
(function(self){
	
	"use strict";
	
	var SELECT_CACHE = {},
		setSelectCache = null,
		lib = null,
		getLibItem = null,
		isTo = null,
		getSelectCache = null;
	
	self.className = "monitoringindicators";
	self.pageSize = 20;
	self.selectDefault = "全部";
	
	
	self.executeLayout = graph.utils.executeLayout;
	self.randstr = graph.utils.randstr;
	
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
	
	self.getCategoryData = function(name){
		return mmdb.kpi.category.get(name);
	};
	
	self.getCategory = function(){
		return mmdb.kpi.category.getAllByStructure();
	};
	
	self.openChild = function(neo4jId, rs, term, dir){
		var result = null,
			parent = null,
			arr = null,
			v1 = null,
			v2 = null,
			isLayout = false,
			i = 0,
			ii = 0,
			model = null;
			
		result = mmdb.relation.kpiinformation.queryKpiRelationById(neo4jId, rs, term, dir);

		if(graph.utils.isTrueRet(result)){

			result = result.data;
			parent = self.editor.graph.getDefaultParent();
			model = self.editor.graph.getModel();
			model.beginUpdate();
			try {
				for(i=0; i<result.node.length; i++){
					if(!self.editor.graph.getModel().getCell(result.node[i]._neo4jid_)){
						self.createCell(
							self.editor.graph,
							parent,
							result.node[i]._neo4jid_, 
							0,
							0,
							result.node[i]
						);
					}
				}
									
				for(ii=0; ii<result.relation.length; ii++){
					arr = result.relation[ii].split("_");
					v1 = self.editor.graph.model.getCell(arr[0]);
					v2 = self.editor.graph.model.getCell(arr[2]);
					
					if(v1 && v2 && !isTo(v1.edges, v2.id)){
						self.editor.graph.insertEdge(
							parent,
							self.randstr(),
							arr[1],
							v1,
							v2
							// 'verticalAlign=bottom;fontStyle=2'
						);
						
						isLayout = true;
					}
				}
			} finally {
				model.endUpdate();
			}
			
			if(isLayout){
				self.executeLayout(
					self.editor.graph,
					new mxHierarchicalLayout(
						self.editor.graph,
						mxConstants.DIRECTION_WEST
					),
					true,
					true
				);
	
				self.editor.graph.refresh();
				// graph.zoomToCenter();
				self.editor.graph.clearSelection();
			}
		}else{
			graph.utils.alert(result.message);
		}
	};
	
	
	getLibItem = function(id){
		var loop = null;
			
		loop = function(arr){
			var i = 0,
				item = null;
			
			for(i=0; i<arr.length; i++){
				if(arr[i].id === id){
					return arr[i];
				}
				
				if(Array.isArray(arr[i].childrenNode)){
					item = loop(arr[i].childrenNode);
					if(item){
						return item;
					}
				}
			}
			
			return null;
		};
		
		return loop(lib);
	};
	
	getSelectCache = function(key){
		return SELECT_CACHE[key];
	};
	
	setSelectCache = function(key, value){
		SELECT_CACHE[key] = value;
	};
	
	// graph
	self.graph = function(){
		
		self.editor = graph.utils.getEditor(
			self.graphContainer,
			self.outlineContainer
		);
	};
	
	
	// select
	self.select = function(){
		self.editor.graph.keyHandler.handler.enabled = true;
	};
	
	// getBody
	self.getBody = function(){
		var _this = this,
			html = "";
		
		html = graph.utils.render(_this.view, {
			className : self.className
		});
		
		return html;
	};
	
	self.getListData = function(){
		var result;
		
		result = mmdb.kpi.category.getAllByStructure();
		
		if(graph.utils.isTrueRet(result)){
			lib = result.data;
			return result.data;
		}else{
			graph.utils.alert(result.message);
			throw new Error(result.message);
		}
	};
	
	self.initSelect = function(list){
		var i = 0,
			option = null,
			updateSelect = null,
			loop = null,
			update = null,
			ctHtml = null,
			loop = null,
			aSelect = null,
			bSelect = null,
			cInput = null;
			
		update = function(name){
			var result = null,
				option = null,
				i = 0,
				ctHtml = null,
				arr = [];
				
			result = mmdb.kpi.category.get(name);
			bSelect.html("");
			
			if(graph.utils.isTrueRet(result)){
				if(result.data && Array.isArray(result.data.attributes)){
					arr = result.data.attributes;
					arr.unshift({name: self.selectDefault});
					
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
			var i = 0,
				arr = [];

			for(i=0; i<lenth; i++){
				arr.push("-");
			}
			
			arr.push(text);
			return arr.join("");
		};
		
		loop = function(arr, marginleft){
			var i = 0;
			
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
			
		aSelect = self.container.find("select[name=a]");
		bSelect = self.container.find("select[name=b]");
		cInput = self.container.find("input[name=c]");
		
		loop(list, 0);

		aSelect.change(function(){
			update($(this).val());
		});
		
		update(aSelect.val());
		
		self.container.find("input[type=button]").click(function(){
			var cateid = "",
				key = "",
				value = "",
				result = null,
				where = {};
				
			cateid = aSelect.val();
			key = bSelect.val() === self.selectDefault ? "*" : bSelect.val();
			value = cInput.val() === "" ? "*" : "*" + cInput.val() + "*";
			where[key] = value;
			
			result = mmdb.kpi.information.qureyByAdvanced(cateid, where, 1,  self.pageSize);
			
			if(graph.utils.isTrueRet(result)){
				
				setSelectCache("cateid", cateid);
				setSelectCache("where", where);
				setSelectCache("count", result.data.count);
				setSelectCache("page", result.data.page);
				
				setSelectCache("lib", result.data.datas);
				self.writeTable(result.data.datas);
				self.initPage();
				
				self.binding();
			}else{
				graph.utils.alert(result.message);
				throw new Error(result.message);
			}
		});
		
	};
	
	
	self.writeTable = function(arr){
		var html = "";
		if(arr.length > 0){

			html = graph.utils.render("monitoringIndicators/table.html", {
				list: arr
			});
			
			self.containerTable.html(html);
			
			self.containerTable.find("input[type=checkbox][name=all]").click(function(){
				if($(this).is(":checked")){
					self.containerTable.find("input[type=checkbox]").each(function(){
						 $(this).attr("checked", true);
					});
				}else{
					self.containerTable.find("input[type=checkbox]").each(function(){
						 $(this).removeAttr("checked", false);
					});
				}
			});
		}else{
			self.containerTable.html("没有查询到相关数据");
		}
	};
	
	
	self.initPage = function(arr){
		var i = 0,
			currClassName = "yellow",
			count = 0,
			total = 0,
			page = 0,
			a = null;
		
		count = getSelectCache("count");
		page = getSelectCache("page");
		
		if(count){
			self.containerPage.html("");
			
			total = Math.ceil(count/self.pageSize);
			
			for(i=1; i<=total; i++){
				a = document.createElement("span");
				a.innerHTML = i;
				
				a.onclick = function(){
					var result = null;
					
					result = mmdb.kpi.information.qureyByAdvanced(
						getSelectCache("cateid"),
						getSelectCache("where"),
						window.parseInt(this.innerHTML, 10), 
						self.pageSize
					);
					
					if(graph.utils.isTrueRet(result)){
						self.writeTable(result.data.datas);
						self.binding();
						
						if(getSelectCache("count") !== result.data.count){
							setSelectCache("count", result.data.count);
							setSelectCache("page",  result.data.page);
							self.initPage();
						}
						
						$(this).parent().find("." + currClassName).removeClass(currClassName);
						this.className = currClassName;
						
					}else{
						graph.utils.alert(result.message);
						throw new Error(result.message);
					}
				};
				
				a.style.cssText = [
					"margin: 0 5px",
					"cursor: pointer"
				].join(";");
				
				if(i === page){
					a.className = currClassName;
				}
				
				self.containerPage.append(a);
			}
		}
	};
	
	

	self.binding = function(){
		self.containerTable.find("tr:gt(0)").each(function() {
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
	
	self.createCell = function(g, parent, id, x, y, item){
		var width = "",
			height = "",
			row1 = null,
			row2 = null,
			cell = null,
			childCellStyle = "",
			value = "";
		
		width = 200;
		height = 120;
		
		cell = g.insertVertex(
			parent,
			id,
			item._category_,
			x,
			y,
			width,
			height,
			"foldable=0;fillColor=none;fillColor=blue;fontColor=white;spacingTop=5;" +
			"labelPosition=top;verticalAlign=top;strokeColor=blue;strokeWidth=1;"
		);
						
		childCellStyle = "selectable=0;movable=0;fillColor=white;fontColor=blank;" + 
						 "strokeColor=blue;strokeWidth=1;";
		
		cell.geometry.width = DEFINE.KPI_cellWidth;
		cell.geometry.height = DEFINE.KPI_cellHeight;
		
		row1 = g.insertVertex(cell, self.randstr(), item._id_, 0, 30, width, 30, childCellStyle);
		row2 = g.insertVertex(cell, self.randstr(), item["参数描述"], 0, 60, width, 60, childCellStyle);
		
		row1.setConnectable(false);
		row2.setConnectable(false);
		
		row2.setConnectable(false);
		
		g.refresh();
		
	};
	
	
	self.getAttr = function(id){
		var lib = null,
			i = 0;
			
		lib = getSelectCache("lib");
		
		for(i=0; i<lib.length; i++){
			if(lib[i]._neo4jid_ == id){
				return lib[i];
			}
		}
		
		return null;
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
						// id = obj.attr("ciID");
						id = obj.attr("ciID");
						name = obj.attr("ciName");

						if(!getObj(id)){
							cell = self.createCell(graph, parent, id, x, y, self.getAttr(id));
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
				
				result = mmdb.relation.kpiinformation.queryKpiRelationById(id, null, null, {down:9, up: 9});

				if(result.success){
					parent = graph.getDefaultParent();
					model = graph.getModel();
					model.beginUpdate();
					try {
						result = result.data;						
						for(ii=0; ii<result.relation.length; ii++){
							arr = result.relation[ii].split("_");
							v1 = graph.model.getCell(arr[0]);
							v2 = graph.model.getCell(arr[2]);
							
							if(v1 && v2 && !isTo(v1.edges, v2.id)){
								graph.insertEdge(
									parent,
									self.randstr(),
									arr[1],
									v1,
									v2
									//'verticalAlign=bottom;fontStyle=2'
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
			
			
			// 取消多选
			self.container.find("tr input").each(function(){
				$(this).attr("checked", false);
			});
		};
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

	
	
	self.init = function(){
		var arr = [];
		
		self.graph();
		
		// 右键
		new graphContextMenu(self.editor, self.contextMenu);

		self.container = $("." + self.className);
		self.containerTable = self.container.find(".monitoringindicators-table");
		self.containerPage = self.container.find(".monitoringindicators-page");

		arr = self.getListData();
		self.initSelect(arr);
		
	};
	
	
	// right
	self.contextMenu = {
		vertex:[
			{name: DEFINE.MENU_OPEN_URL, aliases: "详细信息"},
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
			],
			
			DEFINE.MENU_VIEW_RELATION,
			[
				DEFINE.MENU_VIEW_RELATION_ADD,
				DEFINE.MENU_VIEW_RELATION_OPEN,
				DEFINE.MENU_VIEW_RELATION_RM
			],
			
			DEFINE.MENU_OPEN_CHILD,
			
			DEFINE.MENU_EDIT,
			[
				DEFINE.MENU_CELL_DELETE
			]
		],
		
		edge: [
			DEFINE.MENU_OPEN_CHILD,
			
			DEFINE.MENU_EDIT,
			[
				DEFINE.MENU_CELL_DELETE
			]
		],
		
		canvas: [
			DEFINE.MENU_SAVE_VIEW,
			DEFINE.MENU_BACKGROUND,
			[
				DEFINE.MENU_SET_BACKGROUND_IMG,
				DEFINE.MENU_RM_BACKGROUND_IMG
			],
			
			DEFINE.MENU_LAYOUT,
			[
				DEFINE.MENU_LAYOUT_H,
				DEFINE.MENU_LAYOUT_V,
				DEFINE.MENU_LAYOUT_C
			],
			
			{name: DEFINE.MENU_BACK_PARENT_VIEW, aliases: "返回上级视图"},
			DEFINE.MENU_ZOOM,
			[
				DEFINE.MENU_ZOOMIN,
				DEFINE.MENU_ZOOMOUT,
				DEFINE.MENU_ZOOMACTUAL
			]
		],
		libs: DEFINE.GRAPH_CONTEXT_MENU_LIBS
	};
	
})(nameSpace.reg("graph.monitoringIndicators"));
