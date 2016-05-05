(function(self){

	"use strict";

	var displayMonitor = null,
		updateMonitor = null,
		editor = null,
		width =120,
		height = 80,
		ids = [],
		loopMonitor = null,
		timeout = 3000,
		alertStyleWidth = 24,
		alertStyleHeight = 24,
		htmlStyle = "",
		alertStyle = "",
		openView,
		rightMenu = null,
		getColor = null;

	htmlStyle = "html=1;strokeColor=#99CCFF; strokeWidth=1;movable=0;";
	alertStyle = "ellipse;strokeWidth=none;strokeColor=none;movable=0;";

	displayMonitor = function(){
		var cells,
			html = "";

		ids = [];
		cells = editor.graph.getDepCells();

		cells.each(function(){
			var _this = this,
				newGeometry = null,
				geometry;

			geometry = _this.getGeometry();

			if(_this.id.indexOf("ci_") >= 0){
				ids.push(_this.id.split("_")[1]);
				if(_this.vertex){
					html = graph.utils.render("ciList/tree_cell.html", {
						width: width,
						height: height,
						value: _this.value,
						id: _this.id,
						row1Tag: "异常",
						row2Tag: "指标"
					});

					html = html.replaceAll("\n\r", "");

					//console.log(html);
					_this.setStyle(htmlStyle);
					newGeometry = new mxGeometry(
						geometry.x,
						geometry.y,
						width,
						height
					);

					_this.setGeometry(newGeometry);
					_this.setValue(html);
					editor.graph.refresh(_this);

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

		editor.graph.orderCells(true, editor.graph.getDepEdges());
		editor.graph.refresh();
		editor.graph.zoomToCenter();
	};

	updateMonitor = function(){
		var i,
			ii = 0,
			obj = {},
			cell,
			style = "",
			ret = null,
			container = null;

		// 跳用后台接口
		ids.each(function(){
			obj[this] = {
				execpt: graph.utils.randint(1, 9999),
				monitor: graph.utils.randint(1, 9999),
				alert: graph.utils.randint(1, 200),
				relation: graph.utils.randint(1, 200)
			};
		});

		for(i in obj){
			cell = editor.graph.getCellByID("ci_" + i);

			if(cell && cell.vertex){
				container = $("#cell_ci_" + i);
				container.find("tr:eq(1)").find("td:last").html(obj[i].execpt).css({
					"color" : getColor(obj[i].execpt).fc,
					"background" : getColor(obj[i].execpt).bg
				});

				container.find("tr:eq(2)").find("td:last").html(obj[i].monitor);

				style = alertStyle + "fillColor=" + getColor(obj[i].alert).bg + ";fontColor="+getColor(obj[i].alert).fc;
				if(cell.children && cell.children.length>=1){
					for(ii=0; ii<cell.children.length; ii++){
						if(cell.children[ii].id.indexOf("in_") >= 0){
							cell.children[ii].setStyle(style);
							cell.children[ii].setValue(obj[i].alert);
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
							"strokeColor=" + getColor(obj[i].relation).bg
					);
				}else{
					if(style && style[style.length-1] != ";"){
						style += ";";
					}
					style += "strokeColor=" + getColor(obj[i].relation).bg + ";";
				}

				cell.setStyle(style);
				editor.graph.refresh(cell);
			}
		}
	};

	getColor = function(n){
		if(n<50){
			return {bg: "green", fc: "#FFFFFF"};
		}else if(n<100){
			return {bg: "yellow", fc: "#000000"};
		}else if(n<200){
			return {bg: "blue", fc: "#FFFFFF"};
		}else{
			return {bg: "red", fc: "#FFFFFF"};
		}
	};

	rightMenu = function(){
		new graphContextMenu(editor, {
			vertex:[
				{name: DEFINE.MENU_OPEN_CHILD_NEW_WINDOW, aliases: "查看基础设施"}
			],
			edge: [
			],
			libs: DEFINE.GRAPH_CONTEXT_MENU_LIBS
		});
	};

	self.graph = self.graph || {};
	graph.onload = function(){

		var viewid = "",
			cateid = "",
			result = null;

		$("body").width($(window).width());
		$("body").height($(window).height());

		viewid = decodeURIComponent(urlParams.viewid);
		cateid = decodeURIComponent(urlParams.cateid);

		if(viewid && cateid){
			result =  grpah.api.getView(viewid);
			if(graph.utils.isTrueRet(result)){
				editor = graph.utils.getEditor(document.getElementById("main"));
				editor.graph.container.style.background = "#FFF";
				editor.graph.setEnabled(false);
				rightMenu();
				graph.utils.openXml(editor, result.data.xml);
				displayMonitor();
				if(loopMonitor){
					window.clearInterval(loopMonitor);
				}
				loopMonitor = window.setInterval(updateMonitor, timeout);
				updateMonitor();
				//graph.randMonitor(editor.graph);
			}else{
				graph.utils.alert(result.message);
			}
		}else{
			graph.utils.alert("系统错误！");
		}
	};

})(this);