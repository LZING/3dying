

(function(self){

"use strict";

var isAdmin = true;
self.templateCache = {};
self.history = {};

self.getEditor = function(diagramContainer, outlineContainer){
	var editor = null;
	
	editor = new Editor();
	editor.graph.init(diagramContainer);

	(function(graph, globalGrahp){

		var config,
			modelGetStyle = null,
			editor;

		modelGetStyle = graph.model.getStyle;

		// 快捷键
		config = mxUtils.load(STENCIL_PATH + '/keyhandler-commons.xml').getDocumentElement();
		editor = new mxEditor(config);
		editor.graph = graph;
	
		// Overrides the dblclick method on the graph to
		// invoke the dblClickAction for a cell and reset
		// the selection tool in the toolbar
		editor.installDblClickHandler(graph);
		
		// Installs the command history
		editor.installUndoHandler(graph);
	
		// Installs the handlers for the root event
		editor.installDrillHandler(graph);
		
		// Installs the handler for validation
		editor.installChangeHandler(graph);
	
		// Installs the handler for calling the
		// insert function and consume the
		// event if an insert function is defined
		editor.installInsertHandler(graph);
	
		// Redirects the function for creating the
		// popupmenu items
		graph.panningHandler.factoryMethod =
			mxUtils.bind(editor, function(menu, cell, evt)
			{
				return this.createPopupMenu(menu, cell, evt);
			});


		// Redirects the function for creating
		// new connections in the diagram
		graph.connectionHandler.factoryMethod =
			mxUtils.bind(editor, function(source, target)
			{
				return this.createEdge(source, target);
			});
		
		// Maintains swimlanes and installs autolayout
		//editor.createSwimlaneManager(graph);
		editor.createLayoutManager(graph);

		graph.connectionHandler.createTargetVertex = function(evt, source){
			var clone = mxConnectionHandler.prototype.createTargetVertex.apply(graph.connectionHandler, arguments);
			if(source.id.indexOf("ci_") === 0){
				var result = globalGrahp.api.getCi(source.id.split("_")[1]);
				if(globalGrahp.utils.isTrueRet(result)){
					var cateResult = globalGrahp.api.getCiCateByName(result.data._categoryId_);
					if(globalGrahp.utils.isTrueRet(cateResult)){
						var attr = {};
						$.each(result.data, function(key){
							attr[key] = result.data[key];
						});
						attr[cateResult.data.major.name] = '[复制]'+ attr[cateResult.data.major.name];
						var saveResult = globalGrahp.api.saveCi(result.data._categoryId_, attr);
						if(globalGrahp.utils.isTrueRet(saveResult)){
							clone.setValue(saveResult.data._name_);
							clone.setId(["ci", saveResult.data._neo4jid_].join("_"));
						}else{
							clone.setValue(result.data._categoryId_);
						}
					}else{
						clone.setValue(result.data._categoryId_);
					}
				}
			}
			return clone;
		};
		
		
		// Add push
		editor.keyHandler.handler.enabled = false;
		graph.keyHandler = editor.keyHandler;


		graph.model.getStyle = function(cell){
			if (cell != null){
				var style = modelGetStyle.apply(this, arguments),
					url = "";

				if (this.isCollapsed(cell)){
					//style = style + ';image;image=vg.svg;';
					cell.geometry.height = 80;
					url = graph.getCellAttr(cell, "collapsed");
					url = url ? url : "../resource/svg/CI.svg";
					style = style + ';shape=image;image=' + url + ';verticalLabelPosition=bottom;verticalAlign=top;';

					// Creates a new overlay with an image and a tooltip
					var overlay = new mxCellOverlay(new mxImage('images/group.png', 16, 16));

					// Installs a handler for clicks on the overlay
					overlay.addListener(mxEvent.CLICK, function(sender, evt){
						var cell = evt.getProperty('cell');
						cell.setCollapsed(false);
						cell.setGeometry(new mxGeometry(
							cell.geometry.x,
							cell.geometry.y,
							cell.geometry.alternateBounds.width,
							cell.geometry.alternateBounds.height
						));

						cell.setStyle("swimlane");
						graph.removeCellOverlays(cell);
						graph.refresh(cell);
						cell.geometry.alternateBounds = new mxRectangle(0, 0, 80, 80);
						graph.clearSelection();
						graph.selectionModel.setCell(cell);

						if(graph.foldHandle){
							graph.foldHandle(cell);
						}
					});

					graph.addCellOverlay(cell, overlay);
				}
				return style;
			}
			return null;
		};

		graph.getCursorForCell = function(cell){
			var result = null;

			result = mxGraph.prototype.getCursorForCell.apply(this, arguments);
			if((cell && cell.id.indexOf("in_") === 0)
					|| (cell && cell.id.indexOf("ticket_") === 0)
					|| (cell && cell.id.indexOf("header_ci_") === 0)
				|| (cell && cell.id.indexOf("chart_") === 0)
					|| (cell && cell.id.indexOf("_eip_") >= 0)){
				result = "pointer";
			}

			return result;
		};
		
	})(editor.graph, graph);

	editor.zoomLock = false;
	editor.graph.setTooltips(false);
	editor.graph.refresh();
	editor.graph.container.style.backgroundImage = 'url(' + IMAGE_PATH + '/grid.gif)';
	editor.graph.container.focus();
	
	if(outlineContainer){
		editor.outline.init(outlineContainer);
	}
	
	// 滚轮缩放
	$(diagramContainer).mousewheel(function(event, delta) {
		if(!editor.zoomLock){
			if(delta>0){
				editor.graph.zoomIn();
			}else{
				editor.graph.zoomOut();
			}
		}
	});
	
	return editor;
};

/**
 * 获取随机整数
 * @param {Object} n 最小整数
 * @param {Object} m 最大整数
 */
self.randint = function(n,m){
	var c = m-n+1, num;
	num = Math.random() * c + n;
	return	Math.floor(num);
};


/**
 * 获取随机字符串
 * @param {Object} length 随机字符串长度
 */
self.randstr = function(length){
	var key = {

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
	
	length = length ? length : 10;
	
	return key.create(length);
};


/**
 * 模板渲染
 * @param {Object} url
 * @param {Object} dict
 */
self.render = function(templateUrl, dict, func){
	var template = "",
		url = "",
		result = "",
		html = "",
		key = "";
	
	url = templateUrl.charAt(1) === "/" ?  templateUrl : "/" + templateUrl;
	url = DEFINE.TEMPLATES_DIR + url;
	key = md5(url);
	
	if(DEFINE.TEMPLATES_ISCACHE && (key in self.templateCache) ){
		template = self.templateCache[key];
	}else{	
		result = $.ajax({ url: url, async: false });
		if( result.readyState === 4 &&  result.status === 200  ){
			template = $.trim(result.responseText);
			if(DEFINE.TEMPLATES_ISCACHE){
				self.templateCache[key] = template;
			}
		}else{
			throw new Error(result.statusText);
		}
	}
	
	html = Handlebars.compile(template)(dict);
	if(typeof func === "function"){
		func(html);
	}

	return html;
};


self.getVisibleModuleObj = function(){
	return graph.openChild;
};

self.confirm = function(msg, func){
	$.messager.confirm("重要提示", msg, func);

	$(".dialog .btn-default").each(function(){
		if(this.innerHTML === ""){
			$(this).remove();
		}
	});
};

self.prompt = function(msg){
	return window.prompt(msg, "");
};

self.alert = function(msg){
	$.messager.alert(msg);

	$(".dialog .btn-default").each(function(){
		if(this.innerHTML === ""){
			$(this).remove();
		}
	});
};

self.isTrueRet = function(result){
	return !!result.success;
};

self.openXml = function(editor, xml){
	var doc,
		url = "",
		width = 0,
		height = 0,
		img = null,
		element = null;
		
	doc = mxUtils.parseXml(xml);
	
	if(doc.documentElement.nodeName === "parsererror"){
		self.alert("错误：解析XML文档错误，可能XML文档损坏！");
		throw new Error("错误：解析XML文档错误，可能XML文档损坏！");
	}else{
		
		editor.graph.setBackgroundImage(null);
		
		element = doc.documentElement;
		
		editor.graph.model.clear();
		editor.setGraphXml(element);
		editor.graph.zoomActual();
		editor.graph.view.setTranslate(0, 0);
		editor.graph.zoomToCenter();

		url = element.getAttribute("background-url");
		width = element.getAttribute("background-width");
		height = element.getAttribute("background-height");
		
		if(url && width && height){
			
			img = new mxImage(url, width, height);
			editor.graph.setBackgroundImage(img);
			editor.graph.view.validate();
		}
	}
};


self.getXml = function(editor){
	var xml,
		img;
		
	xml = editor.getGraphXml();
	img = editor.graph.getBackgroundImage();
	
	if(img){
		xml.setAttribute("background-url", img.src);
		xml.setAttribute("background-width", img.width);
		xml.setAttribute("background-height", img.height);
	}

	return mxUtils.getXml(xml);
};


self.executeLayout = function(graph, layout, animate, ignoreChildCount) {
	var cells = [];
		
	cells = graph.getChildVertices();
	
	graph.getModel().beginUpdate();
	try {
		layout.execute(graph.getDefaultParent(), cells);
	} catch (e) {
		throw e;
	} finally {
		// Animates the changes in the graph model except
		// for Camino, where animation is too slow
		if (animate && navigator.userAgent.indexOf('Camino') < 0) {
			// New API for animating graph layout results asynchronously
			var morph = new mxMorphing(graph);
			morph.addListener(mxEvent.DONE, mxUtils.bind(this, function() {
				graph.getModel().endUpdate();
			}));

			morph.startAnimation();
		} else {
			graph.getModel().endUpdate();
		}
	}
};

self.setViewForCell = function(g, cell, viewname, viewid){
	var str,
		com,
		arr = [];
	
	str = g.getViewForCell(cell);
	if(str){
		arr = str.split("##");
	}

	com = [viewname,viewid].join("$$");
	if($.inArray(com, arr) === -1){
		arr.push(com);
	}
	
	g.setViewForCell(cell, arr.join("##"));
};


self.getViewForCell = function(g, cell){
	var str,
		arr = [],
		i,
		ret = [];
	
	str = g.getViewForCell(cell);
	if(str){
		arr = str.split("##");
	}
	
	for(i=0; i<arr.length; i++){
		ret.push({
			viewname: (arr[i].split("$$"))[0],
			viewid: (arr[i].split("$$"))[1]
		});
	}
	
	return ret;
};


self.delViewForCell = function(g, cell, viewname, viewid){
	var str = "",
		i = 0,
		com = "",
		ret = false,
		arr = [];
	
	str = g.getViewForCell(cell);
	if(str){
		arr = str.split("##");
	}
	com = [viewname, viewid].join("$$");
	
	for(i=0; i<arr.length; i++){
		if(arr[i] === com){
			arr.splice(i, 1);
			ret = true;
			g.setViewForCell(cell, arr.join("##"));
			break;
		}
	}
	
	return ret;
};


self.selectViewForCell = function(editor, cell, title, fun){
	var _this = editor,
		arr;

	arr = self.getViewForCell(_this.graph, cell);
	
	if(arr.length >= 1){
		self.render("share/selectRelationViews.html", {list: arr}, function(html){
			var dialog = graph.dialog(title, html, function(element, dialog){
				var selectArr = [];
				element.find("input[type=radio]:checked").each(function(){
					selectArr.push({
						viewname: $(this).attr("data-viewname"),
						viewid: $(this).attr("data-viewid")
					});
				});

				if(selectArr.length >= 1){
					$.each(selectArr, function(){
						fun(this.viewid, this.viewname);
					});
					dialog.hide();
				}else{
					self.alert("未选择视图！");
				}
			});

			dialog.element.find('.radio-list input[type=radio]').change(function() {
				var $label = $(this).closest("label");
				$label.parent().find(".checked").removeClass("checked");
				if ($(this).is(':checked')) {
					$label.find(".radio > span").addClass("checked");
				} else {
					$label.find(".radio > span").removeClass("checked");
				}
			});
		});
	}else{
		self.alert("未关联任何视图！");
	}
};

self.relationDialog = function(container, list){
	var html,
		item = "relation-dialog-item",
		select = null,
		show = "show",
		hide = "hide";
	
	html = self.render("share/relation.html", {
		list: list
	});
	
	container.append(html);
	select = container.find("select[name=relation-type]");
	
	select.change(function(){
		container.find("." + show).removeClass(show).addClass(hide);
		container.find("." + item + "[name="+$(this).val()+"]").removeClass(hide).addClass(show);
	});

	container.find("." + item + "[name="+select.val()+"]").removeClass(hide).addClass(show);
	
	return function(){
		var obj = {},
			tab;
		
		obj.type = select.val();
		obj.attr = {};
		
		tab = container.find("." + item + "[name="+select.val()+"]");
		tab.find("input[name]").each(function(){
			obj.attr[$(this).attr("name")] = $(this).val();
		});
		
		return obj;
	};
};


self.initUrlView = function(editor, fun){
	var viewid,
		result = null;
	viewid = decodeURIComponent(urlParams.viewid);
	
	if(viewid != "undefined" && cateid != "undefined"){
		result =  graph.api.getView(viewid);
		if(graph.utils.isTrueRet(result)){
			graph.utils.openXml(editor, result.data.xml);
			if(typeof fun === "function"){
				fun(cateid, viewid);
			}
		}else{
			graph.utils.alert(result.message);
		}
	}
};


self.getGraphCiList = function(g){
	var cells,
		arr = [];

	cells = g.getDepCells();
	cells.each(function(){
		if(this.id.split("_")[0] == "ci"){
			arr.push(this.id.split("_")[1]);
		}
	});
	
	g.clearSelection();
	
	return arr;
};

self.graphStopDbClick = function(graph){
	graph.dblClick = function(evt, cell) {
		var mxe = new mxEventObject(mxEvent.DOUBLE_CLICK, 'event', evt, 'cell', cell);
		this.fireEvent(mxe);

		if (this.isEnabled() && !mxEvent.isConsumed(evt) && !mxe.isConsumed()) {
			mxUtils.alert('Hello, World!');
			mxe.consume();
		}
	}
};


self.getLevelColor = function(n){

	switch(n){
		case 1:
			return {bg: "#FD0004", fc: "#FFFFFF"};
			break;

		case 2:
			return {bg: "#FFC100", fc: "#FFFFFF"};
			break;

		case 3:
			return {bg: "#FF8201", fc: "#000000"};
			break;

		case 4:
			return {bg: "#03B0ED", fc: "#FFFFFF"};
			break;

		case 6:
		default:
			return {bg: "#94D04A", fc: "#FFFFFF"};
			break;
	}
};

self.getGraphCiIds = function(graph){
	var cells = null,
		ids = [];

	cells = graph.getDepCells();
	cells.each(function(){
		if(this.id.indexOf("ci_") === 0){
			ids.push(this.id.split("_")[1]);
		}
	});

	return ids;
};

self.comArr = function(arr){
	var o = {},
		filterField = null;

	filterField = {
		_id_ : true,
		ID : true,
		_categoryId_ : true,
		_neo4jid_ : true,
		_category_ : true,
		icon: true,
		index: true
	};

	$.each(arr, function(){
		var keysArr = [],
			tmp = [],
			i = 0,
			_this = this;

		if(!o[_this._category_]){
			o[_this._category_] = {
				columns: [],
				key: [],
				name: _this._category_,
				rows: []
			};

			//o[_this._category_].columns.push("ID");
			o[_this._category_].columns.push("分类");
			o[_this._category_].columns.push("名称");

			//o[_this._category_].key.push("_neo4jid_");
			o[_this._category_].key.push("_category_");
			o[_this._category_].key.push("_name_");

			for(i in _this){
				if(!filterField[i]){
					o[_this._category_].key.push(i);
					o[_this._category_].columns.push(i);
				}
			}
		}

		$.each(o[_this._category_].key, function(){
			tmp.push(_this[this]);
		});

		o[_this._category_].rows.push(tmp);

	});

	return o;
};


// svg to string
self.svgToExportFormat = function(container){
	var head = "",
		width,
		height,
		html;

	width = Math.max(container.clientWidth, container.scrollWidth);
	height = Math.max(container.clientHeight, container.scrollHeight);
	head += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"';
	head += ' width="'+width+'"';
	head += ' height="'+height+'"';
	head += '>';
	html = container.innerHTML;
	html = head + html.substr(html.indexOf(">")+1);
	html = html.replaceAll(" href=", " xlink:href=");
	html = html.replaceAll('fill="transparent"', 'fill="none"');
	html = html.replaceAll("<g></g>", "");

	return html;
};

self.showToggleTable = function(container, obj, disabledField, func){
	var html = "",
		dom = document.createElement("div");

	dom.className = "graphtable";
	dom.style.cssText = [
		"position: absolute",
		"left: 0",
		"top: 0",
		"z-index: 999",
		"width: 100%",
		"background: #EFEFEF",
		"overflow: auto",
		"height: 100%"
	].join(";");
	$.each(obj, function(key){
		var _this = this,
			len = _this.columns.length,
			baseWidth = 150;
		_this.width = len >= 8 && (len + 1) * baseWidth > $(window).width() ? (len + 1) * baseWidth + "px" : "100%";
		html += self.render("share/ciTable.html", this);
	});

	dom.innerHTML = html;
	$(container).find(".graphtable").remove();
	$(container).append(dom);
	$(container).find(".graphtable table").each(function() {
		$(this).DataTable({
			paging: false,
			stateSave: true,
			oLanguage: {
				sInfo: "共找到 _TOTAL_ 条记录，当前显示(_START_ 到 _END_)",
				sSearch: "在结果中查找： _INPUT_"
			}
		});
	});

	$(container).find("td").each(function(){
		var _this = this,
			id = "",
			field = "";

		id = $(_this).parents("tr[ciid]").attr("ciid");
		field = $(container).find("tr:eq(0) th:eq("+$(this).index()+")").html();

		if(!disabledField[field]){
			$(_this).dblclick(function(){
				var value = _this.innerHTML,
					input = null;

				input = document.createElement("input");
				input.style.cssText = [
					"width: 100%",
					"height: 100%",
					"background: black",
					"border: none",
					"color: white"
				].join(";");
				input.type = "text";
				input.value = value;
				$(_this).html(input);

				input.focus();
				input.onclick = function(e){
					e.stopPropagation();
				};

				input.onblur = function(){
					$(_this).html(this.value);
					if(value != this.value.trim() && func){
						$(_this).css("background", "#F5F5F5");
						func(this, id, field, this.value);
					}
				};
			});
		}
	});
};

self.showCiTable = function(graph, CACHE, func){
	var list,
		container,
		disabledField,
		arr = [];

	disabledField = {
		"ID": true,
		"分类": true,
		"名称": true
	};
	container = graph.container;
	$(container).find(".graphtable").remove();
	list = self.getGraphCiIds(graph);
	list.each(function(){
		arr.push(CACHE[this]);
	});

	self.showToggleTable(
		container,
		self.comArr(arr),
		disabledField,
		function(dom, id, key, value){
			var result,
				updateResult = null;
			result = graph.api.getCi(id);
			if(self.isTrueRet(result)){
				result.data[key] = value.trim();
				updateResult = graph.api.updateCi(id, result.data);
				if(self.isTrueRet(updateResult)){
					CACHE[id][key] = value.trim();
				}else{
					alert("更新信息失败");
				}
			}else{
				alert("更新信息失败");
			}
		}
	);

	if(func){
		func();
	}

};


self.showKpiTable = function(container, data, viewid){
	var table,
		thead,
		i,
		ii = 0,
		iii = 0,
		columns = [],
		th = null,
		tr,
		td = null,
		keys = {},
		div,
		updateFields,
		firstCol = "CI名称",
		flag,
		btn = null,
		btnClass1 = "btn btn-default",
		btnClass2 = "btn btn-success",
		tbody;

	updateFields = {
		threshold1: true,
		threshold2: true,
		threshold3: true,
		threshold4: true
	};

	$(container).find(".graphtable").remove();
	div = document.createElement("div");
	div.className = "graphtable";

	columns.push(firstCol);
	for(i in data){
		if(data[i].length >= 1){
			for(ii in data[i][0]){
				columns.push(ii);
				keys[ii] = true;
			}
			break;
		}
	}

	table = document.createElement("table");
	table.style.cssText = [
		"width: 100%"
	].join(";");

	thead = document.createElement("thead");
	tr = document.createElement("tr");
	for(i=0; i<columns.length; i++){
		th = document.createElement("th");
		th.innerHTML = columns[i];
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	table.appendChild(thead);

	tbody = document.createElement("tbody");
	for(i in data){
		flag = true;
		for(ii=0; ii<data[i].length; ii++){
			data[i][ii].view = viewid;
			data[i][ii].ci = i;

			tr = document.createElement("tr");
			for(iii=0; iii<columns.length; iii++){
				if(columns[iii] === firstCol){
					if(flag){
						td = document.createElement("td");
						td.innerHTML = i;
						//td.setAttribute("rowspan", data[i].length);
						tr.appendChild(td);
						//flag = false;
					}
				}else{
					td = document.createElement("td");
					td.innerHTML = data[i][ii][columns[iii]];
					tr.appendChild(td);

					if(columns[iii] === "enabled"){
						btn = document.createElement("input");
						btn.type = "button";

						if(data[i][ii][columns[iii]] == "Y"){
							btn.className = btnClass2;
							btn.value = "Y";
						}else{
							btn.className = btnClass1;
							btn.value = "N";
						}

						btn.onclick = function(field, obj){
							return function(){
								var _this = this,
									result = null,
									save = false;

								if(_this.value == "Y"){
									save = true;
									_this.value = "N";
									_this.className = btnClass1;
								}else if(_this.value == "N"){
									save = true;
									_this.value = "Y";
									_this.className = btnClass2;
								}

								if(save){
									obj[field] = _this.value;
									result = graph.api.saveThreshol(obj);
									if(!graph.utils.isTrueRet(result)){
										alert(result.message);
									}
								}
							};

						}(columns[iii], data[i][ii]);

						td.innerHTML = "";
						td.appendChild(btn);
					};

					if(updateFields[columns[iii]]){
						td.ondblclick = function(field, obj){
							return function(){
								var input1 = null,
									input2 = null,
									inputCss = null,
									arr = null,
									_this = this,
									btn = null;

								if($(_this).find("input").length == 0){
									inputCss = [
										"width: 40px"
									].join(";");
									arr = this.innerHTML.split(",");
									arr[0] = arr[0].substr(1);
									arr[1] = window.parseInt(arr[1]);

									input1 = document.createElement("input");
									input1.value = arr[0];
									input1.style.cssText = inputCss;

									input2 = document.createElement("input");
									input2.value = arr[1];
									input2.style.cssText = inputCss;

									btn = document.createElement("a");
									btn.href = "javascript:void(0);";
									btn.innerHTML = "保存";

									btn.onclick = function(){
										var html,
											result;

										html = [
											"(",
											input1.value,
											",",
											input2.value,
											"]"
										].join("");

										obj[field] = html;
										result = graph.api.saveThreshol(obj);
										if(graph.utils.isTrueRet(result)){
											$(_this).html(html);
										}else{
											alert(result.message);
										}
									};

									$(_this).html("");
									$(_this).append(input1);
									$(_this).append(" - ");
									$(_this).append(input2);
									$(_this).append(btn);
								}
							};
						}(columns[iii], data[i][ii]);
					}
				}
			}
			tbody.appendChild(tr);
		}
	}

	table.appendChild(tbody);
	div.appendChild(table);
	$(container).append(div);

	$(table).DataTable({
		paging:false,
		stateSave:true,
		oLanguage:{
			sInfo: "共找到 _TOTAL_ 条记录，当前显示(_START_ 到 _END_)",
			sSearch: "在结果中查找： _INPUT_"
		}
	});
};


self.format1 = function(data){
	var i,
		ii = 0,
		list = [],
		row = [],
		fieldFormat;

	fieldFormat = {
		"当前值": function(obj, value){
			var color;

			color = self.getLevelColor(obj.status);
			return self.getSpan(value, color.bg, color.fc);
		},

		"历史数据": function(obj, value){
			var a,
				url;

			a = document.createElement("a");
			a.href = "javascript:void(0);";
			url = [
				"../history.html?a=a",
				"&monStandardId=" + obj.standard_id,
				"&ciname=" + encodeURIComponent(obj["CI名称"]),
				"&sl=" + encodeURIComponent(obj["实例"]),
				"&dqz=" + encodeURIComponent(obj["当前值"]),
				"&zb=" + encodeURIComponent(obj["指标"]),
				"&zblb=" + encodeURIComponent(obj["指标类别"])
			].join("");
			a.setAttribute("onclick", "graph.utils.openLink('.right', '"+ url +"', '历史趋势');");
			//a.target = "_blank";
			a.innerHTML = "详情";
			return a.outerHTML;
		},

		"详细信息": function(obj, value){
			var a,
				url;

			a = document.createElement("a");
			a.href = "javascript:void(0);";
			url = [
				"../historyDetail.html?a=a",
				"&monStandardId=" + obj.standard_id,
				"&monMetricDataId=" + obj.metric_data_id,
				"&ciname=" + encodeURIComponent(obj["CI名称"]),
				"&sl=" + encodeURIComponent(obj["实例"]),
				"&dqz=" + encodeURIComponent(obj["当前值"]),
				"&zb=" + encodeURIComponent(obj["指标"]),
				"&zblb=" + encodeURIComponent(obj["指标类别"])
			].join("");

			a.setAttribute("onclick", "graph.utils.openLink('.right','"+ url +"', '历史详细');");
			//a.target = "_blank";
			a.innerHTML = "详情";
			return a.outerHTML;
		}
	};

	if($.inArray("详细信息", data.head) === -1){
		data.head.push("详细信息");
	}
	if($.inArray("历史数据", data.head) === -1){
		data.head.push("历史数据");
	}

	list.push(data.head);
	for(i=0; i<data.row.length; i++){
		row = [];
		for(ii=0; ii<data.head.length; ii++){
			if(!fieldFormat[data.head[ii]] && typeof data.row[i][data.head[ii]] === "undefined"){
				row.push("");
			}else{
				if(fieldFormat[data.head[ii]]){
					row.push(fieldFormat[data.head[ii]](data.row[i], data.row[i][data.head[ii]]));
				}else{
					row.push(data.row[i][data.head[ii]]);
				}
			}
		}
		list.push(row);
	}
	return list;
};

self.format2 = function(data){
	var i,
		ii = 0,
		list = [],
		row = [],
		fieldFormat;

	fieldFormat = {
		"级别": function(obj, value){
			var color = null;

			color = self.getLevelColor(Number(value));
			return self.getSpan(value, color.bg, color.fc);
		},
		TICKETID: function(obj, value){
			var a = "",
				url = "";

			a = document.createElement("a");
			a.href = [
				"http://w3.huawei.com/sm/index.do?ctx=docEngine&file=probsummary&query=number%3D%22",
				value,
				"%22&action=&title=IM&queryHash=2ba06af9"
			].join("");
			a.target = "_blank";
			a.innerHTML = value;
			return a.outerHTML;
		}
	};

	list.push(data.head);
	for(i=0; i<data.row.length; i++){
		row = [];
		for(ii=0; ii<data.head.length; ii++){
			if(typeof data.row[i][data.head[ii]] === "undefined"){
				row.push("");
			}else{
				if(!fieldFormat[data.head[ii]] && typeof data.row[i][data.head[ii]] === "undefined"){
					row.push("");
				}else{
					if(fieldFormat[data.head[ii]]){
						row.push(fieldFormat[data.head[ii]](data.row[i], data.row[i][data.head[ii]]));
					}else{
						row.push(data.row[i][data.head[ii]]);
					}
				}
			}
		}
		list.push(row);
	}
	return list;
};


self.format3 = function(data){
	var func,
		cols = null,
		linkHTML = [],
		getUrl = [],
		list = [];

	cols = [
		"type",
		"source",
		"target",
		"success",
		"error",
		"detail"
	];

	getUrl = function(type, o, target, source){
		var url = "";

		if(target.indexOf("(") >= 0){
			target = target.substr(0, target.indexOf("("));
		}

		if(source.indexOf("(") >= 0){
			source = source.substr(0, source.indexOf("("));
		}

		if(type === "bw"){
			url = [
				"http://w3.huawei.com/eipvms#!eip/eipvms/byadvance/listBwByAdvance.html?a=a",
				"&projectName=" + o.projectname,
				"&processName=" + o.processname,
				"&targetCI=" + target,
				"&sourceCI=" + source
			].join("");
		}

		if(type === "art"){
			url = [
				"http://nkweb-sit.huawei.com/eipvms/#!eip/eipvms/art/listArtBySys.html?a=a",
				"&pubDataModelName=" + o.pubdatamodelname,
				"&subDataModelName=" + o.subdatamodelname,
				"&targetCI=" + target,
				"&sourceCI=" + source
			].join("");
		}

		return url;
	};

	list.push(cols);
	func = function(key){
		var tmp = [],
			i = 0,
			a = null;

		cols.each(function(){
			if(this == "type"){
				tmp.push(key);
			}else if(this == "detail"){
				linkHTML = "";
				if(Array.isArray(data[key].request)){
					linkHTML = [];
					for(i=0; i<data[key].request.length; i++){
						a = document.createElement("a");
						a.innerHTML = "异常信息" + (i+1);

						a.href = getUrl(
							key,
							data[key].request[i],
							data[key].target,
							data[key].source
						);

						// a.setAttribute("onclick", "graph.utils.openLink();");
						a.target = "_blank";
						linkHTML.push(a.outerHTML);
					}
					linkHTML = linkHTML.length >= 1 ? linkHTML.join(" | ") : linkHTML[0];
				}

				tmp.push(linkHTML);
			}else{
				if(typeof data[key][this] === "undefined"){
					tmp.push("-");
				}else{
					tmp.push(data[key][this]);
				}
			}
		});
		list.push(tmp);
	};

	func("art");
	func("bw");
	return list;
};

self.openLink = function(select, url, title){
	title = title ? title : "";
	$(".iframe").remove();
	self.render("share/iframe.html", {url: url, title: title}, function(html){
		$(select).append(html);
		$(".iframe").find(".back-title").click(function(){
			$(".iframe").remove();
		});
	});
};

self.getEipColor = function(status){
	switch(status){
		case -1:
			return "#FF4D04";
			break;
		case 0:
			return "#3BA2FB";
			break;

		case 1:
			return "#63D114";
			break;

		default:
			return "black";
	}
};

self.getSpan = function(container, bg, color){
	var span;
	span = document.createElement("span");
	span.innerHTML = container;
	span.style.cssText = [
		"display: block",
		"width: 100%",
		"height: 100%",
		"background: " + bg,
		"color: " + color
	].join(";");
	return span.outerHTML;
};


self.isIE = function(version, comparison ){
	var $div,
		ieTest;

	$div = $('<div style="display:none;"/>').appendTo($('body'));
	$div.html('<!--[if '+(comparison||'')+' IE '+(version||'')+']><a>&nbsp;</a><![endif]-->');
	ieTest = $div.find('a').length;
	$div.remove();

	return ieTest;
};

self.clearEdgePoints = function(list){
	$.each(list, function(){
		this.geometry.points = [];
	});
};

self.clearEdgeStyle = function(graph, list){
	var attr;

	attr = [
		mxConstants.STYLE_EDGE,
		mxConstants.STYLE_ELBOW,
		"noEdgeStyle",
		"orthogonal"
	];

	$.each(attr, function(){
		graph.setCellStyles(this, null, list);
	});
};

self.getStyleForAttr = function(cell, key){
	var arr = "",
		ret = "";

	if(cell.style && cell.style != ""){
		arr = cell.style.split(";");
		$.each(arr, function(){
			if(this.indexOf(key) >= 0){
				ret = this.split("=")[1];
				return false;
			}
		});
	}else{
		ret = "";
	}
	return ret;
};

self.colorDialog = function(_graph, colorName, title){
	var dialog = null,
		cells = [],
		color = "",
		$input = "";

	cells = _graph.getSelectionCells();
	if(cells.length >= 1){
		color = self.getStyleForAttr(cells[0], colorName);

		self.render("style/color.html", {
			title : title,
			color: color
		}, function(html){
			dialog = graph.dialog(title, html, function(element, dialog){
				var color = "none";
				if(element.find("input[name=selectType]:checked").val() === "color"){
					color = $input.val();
				}
				_graph.setCellStyles(colorName, color, cells);
				dialog.hide();
			});

			dialog.element.find('input[type=radio]').change(function() {
				var $label = $(this).closest("label");
				$label.parents(".form-body").find(".checked").removeClass("checked");
				if ($(this).is(':checked')) {
					$label.find(".radio > span").addClass("checked");
				} else {
					$label.find(".radio > span").removeClass("checked");
				}
			});

			$input = dialog.element.find("#selectColor");
			$input.colorpicker();

			dialog.element.find("input[name=selectType]").click(function(){
				if($(this).val() == "none"){
					$input.attr("disabled", true);
				}else{
					$input.removeAttr("disabled");
				}
			});

		});
	}
};

self.isAdmin = function(){
	var result = null;
	if(typeof isAdmin === "boolean"){
		return isAdmin;
	}else{
		result = graph.api.getUserFunc();
		if(graph.isTrueRet(result)){
			if($.inArray("视图管理", result.data) >= 0){
				isAdmin = true;
			}else{
				isAdmin = false;
			}
			return isAdmin;
		}else{
			return false;
		}
	}
};

self.getAllowMenu = function(){
	return ["搜索", "在线创建业务流", "业务流运营可视", "后台管理", "我的运营工作台"];
};


self.jstreeEvent = function($main){
	$main.on("open_node.jstree", function(event, data) {
		var tree = $main.jstree(true);
		tree.set_icon([data.node.id], "fa fa-folder-open");
	}).on("close_node.jstree", function(event, data) {
		var tree = $main.jstree(true);
		tree.set_icon([data.node.id], "fa fa-folder");
	}).on('select_node.jstree', function(event, data) {
		var jstree = $main.jstree(true),
			node = jstree.get_node(data.node.id);
		if(node.children && node.children.length >= 1){
			if(node.state.opened){
				jstree.close_node(node.id);
			}else{
				jstree.open_node(node.id);
			}
		}
	});
};

self.datetime_to_unix = function(datetime){
	var tmp_datetime = datetime.replace(/:/g,'-');
	tmp_datetime = tmp_datetime.replace(/ /g,'-');
	var arr = tmp_datetime.split("-");
	var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
	return parseInt(now.getTime()/1000);
};


self.unix_to_datetime = function(unix) {
	//var now = new Date(parseInt(unix) * 1000);
	var now = new Date(unix);
	return [
		[
			now.getFullYear(),
			now.getMonth() + 1,
			now.getDate()
		].join("-"),
		[
			now.getHours(),
			now.getMinutes(),
			now.getSeconds()
		].join(":")
	].join(" ");
};


self.selectIcon = function(func){
	var dialog = null,
		eventBox = null,
		result = null,
		change = null,
		arr = [];

	eventBox = function(_this){
		$(_this).find("img").click(function(){
			if(func){
				func($(this).attr("src"));
			}
			dialog.hide();
		});

		$(_this).find(".selectIcon-delete-btn").click(function(){
			var name = $(_this).find("img").attr("src").split("/").pop();
				result;
			result = graph.api.deleteByNameForAdmin(name);
			if(self.isTrueRet(result)){
				$(_this).remove();
			}else{
				self.alert(result.message);
			}
		});
	};

	change = function(){
		var dom = this;
		if(dom.value !== ""){
			graph.api.importSvgForAdmin(this, function(result){
				if(self.isTrueRet){
					var html,
						url;

					url = ["../resource/ownsvg", dom.value.split("\\").pop()].join("/");
					self.render("share/selectIconItem.html", {url: url}, function(html){
						dialog.element.find(".selectIcon-list").append(html);
						eventBox(dialog.element.find(".selectIcon-box:last").get(0));
					});

					html = dialog.element.find("#uploadIconFile").get(0).outerHTML;
					dialog.element.find("#uploadIconFile").parent().html(html);
					dialog.element.find("#uploadIconFile").change(change);
					graph.onlineEdit.initCustomIconArea();
				}
				self.alert(result.message);
			});
		}
	};

	result =  graph.api.qureyForAdmin(null, 1, 100000);

	IF(self.isTrueRet(result), function(){
		$.each(result.data.datas, function(src){
			arr.push(["../resource/ownsvg",src].join("/"));
		});
	});

	self.render("share/selectIcon.html", {list: arr}, function(html){
		dialog = graph.dialog("选择图标", html, function(element, dialog){
			self.alert("请选择图标");
		});

		dialog.element.find(".selectIcon-box").each(function(){
			eventBox(this);
		});

		dialog.element.find("#uploadIconFile").change(change);
	});
};

self.openChild = function(cell, neo4jId, rs, term, dir, g){
	var result,
		parent = null,
		arr = null,
		v1 = null,
		v2 = null,
		isLayout = true,
		i = 0,
		ii = 0,
		ids = [],
		type,
		createCell,
		clearEdges,
		model = null;

	type = cell.id.split("_")[0];
	result = graph.api.getCiRelationById(neo4jId, rs, term, dir);

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

		g.removeCells(removeCells);
	};

	createCell = function(g, parent, cateid, id, value, x, y){
		var width,
			height,
			style,
			cell,
			image;
		image = graph.ICO[cateid];
		width = DEFINE.INFO_dragWidth;
		height = DEFINE.INFO_dragHeight;
		style = 'image;image=' + image;
		cell = g.insertVertex(parent, "ci_" + id, value, x, y, width, height, style);
		return cell;
	};

	/*
	if(type === "ci"){
		createCell = ciCreateCell;
		result = graph.api.getCiRelationById(neo4jId, rs, term, dir);
	}


	if(type === "kpi"){
		createCell = kpiCreateCell;
		result = graph.api.getKpiRelationById(neo4jId, rs, term, dir);
	}
	*/

	if(graph.utils.isTrueRet(result)){

		result = result.data;
		parent = g.getDefaultParent();
		model = g.getModel();
		model.beginUpdate();
		try {
			for(i=0; i<result.node.length; i++){
				if(!g.getCellByID([type, result.node[i]._neo4jid_].join("_"))){
					createCell(
						g,
						parent,
						result.node[i]._categoryId_,
						result.node[i]._neo4jid_,
						result.node[i]._name_,
						0,
						0
					);
				}

				//CI_TABLE_LIB[result.node[i]._neo4jid_] = result.node[i];
				ids.push(result.node[i]._neo4jid_);
			}

			for(ii=0; ii<result.relation.length; ii++){
				arr = result.relation[ii].split("_");
				v1 = g.getCellByID([type, arr[0]].join("_"));
				v2 = g.getCellByID([type, arr[2]].join("_"));

				if(v1 && v2){
					clearEdges(v1, v2);
				}
			}

			for(ii=0; ii<result.relation.length; ii++){
				arr = result.relation[ii].split("_");
				v1 = g.getCellByID([type, arr[0]].join("_"));
				v2 = g.getCellByID([type, arr[2]].join("_"));

				if(v1 && v2){
					g.insertEdge(
						parent,
						["relation", result.relation[ii]].join("_"),
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

		if(isLayout){
			self.executeLayout(
				g,
				new mxHierarchicalLayout(
					g,
					mxConstants.DIRECTION_WEST
				),
				true,
				true
			);

			g.refresh();
			g.zoomToCenter();
			g.clearSelection();
		}
	}else{
		graph.utils.alert(result.message);
	}
};


self.createWebGl = function(options){
	var div = document.createElement("div"),
		universe,
		container,
		closeBtn = document.createElement("div");

	container = options.container ? options.container : document.body;
	$("#webgl").remove();
	div.id = "webgl";
	div.style.cssText = [
		"width: 100%",
		"height: 100%",
		"position: absolute",
		"left: 0",
		"background: #000",
		"top: 0",
		"z-index: 99999"
	].join(";");

	closeBtn.style.cssText = [
		"width: 30px",
		"height: 30px",
		"position: absolute",
		"background: #fff",
		"cursor: pointer",
		"right: 0",
		"top: 0",
		"z-index: 99"
	].join(";");

	$(div).append(closeBtn);
	$(container).append(div);
	universe = new Universe($(div));

	$.each(options.layers, function(){
		universe.addLayer(this);
	});

	if(options.relation){
		universe.drawLayerLine(options.relation);
	}

	$(closeBtn).click(function(){
		$(div).remove();
	});

	window.universe = universe;
	window.node = universe.layers[0].node;
};


self.getCellValue = function(g,cell){
	if(cell){
		return typeof cell.value === "object" ? g.getCellAttr(cell, "label") : cell.value;
	}else{
		return "";
	}
};

})(nameSpace.reg("graph.utils"));

