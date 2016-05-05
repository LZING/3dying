/** 
 * -------------------------------------------------------------
 * Copyright (c) 2013 Toolbar, All rights reserved. 
 *  
 * @version: 0.0.0 
 * @author: mail@lizhong.me 
 * @description:  
 * @project: Toolbar 
 * @date: 2014-07-24 
 * -------------------------------------------------------------
 */ 

(function(window, undefined){ 

"use strict";

var Toolbar = null,
	items = null,
	lib = {};

Toolbar = function(obj, container, items) {
	return new Toolbar.fn.init(obj, container, items);
};

Toolbar.fn = Toolbar.prototype = {
	constructor : Toolbar,
	init : function(obj, container, items) {
		this.graph = obj.editor.graph;
		this.editor = obj.editor;
		this.obj = obj;
		this.itemsLeft = obj.toolbarItemsLeft;
		this.itemsRight = obj.toolbarItemsRight;
		this.container = container;
		this.initUiBuild();
		this.initBtn();
	}
};

Toolbar.fn.init.prototype = Toolbar.fn;

Toolbar.fn.hide = function(){
	this.container.hide();
};

Toolbar.fn.show = function(){
	this.container.show();
};
/**
 * Created by zhong on 2014/7/9.
 */

Toolbar.fn.initBtn = function(){
	var _this = this,
		loop = null,
		dropdown = null;

	dropdown = function(div, list, width){
		var $div = $(div),
			$ul = null;

		$ul = $(document.createElement("ul"));
		$ul.addClass("dropdown-menu");
		$ul.attr("role", "menu");
		$ul.attr("aria-labelledby", "dLabel");

		if(width){
			$ul.width(width);
			$ul.css("min-width", width + "px");
		}

		$.each(list, function(){
			var li = document.createElement("li"),
				i = document.createElement("i"),
				o = lib[this];

			if(o.image){
				$(i).addClass("icon");
				$(i).addClass(o.image);
			}

			if(o.text){
				i.innerHTML = o.text;
				$(i).css("font-style", "normal");
			}

			if(o.font){
				$(i).css("font-family", o.font);
			}

			//i.setAttribute("data-toggle", "tooltip");
			//i.setAttribute("data-placement", "left");
			i.setAttribute("title", o.name);

			if(typeof o.func === "function"){
				$(i).click(function(){
					o.func.apply(_this, [div]);
				});
			}

			li.appendChild(i);
			$ul.append(li);
		});

		$(div).append($ul);
	};

	loop = function(items, $container){
		$.each(items, function(index){
			var div = null,
				i = null,
				o = null;

			if(this === "|"){
				div = document.createElement("div");
				div.className = "dividing-line";
				$container.append(div);
			}else if(typeof this === "string"){
				div = document.createElement("div");
				i = document.createElement("i");
				o = lib[this];
				div.className = "Toolbar-item";

				if(o.icon){
					i.className = "fa " + o.icon;
				}

				if(o.image){
					$(i).addClass("icon");
					$(i).addClass(o.image);
				}

				if(o.bgColor){
					i.style.backgroundColor = o.bgColor;
				}

				if(o.text){
					i.innerHTML = o.text;
					$(i).css("font-style", "normal");
				}

				div.appendChild(i);
				$container.append(div);

				if(typeof o.func === "function"){
					$(i).click(function(){
						o.func.apply(_this, [div, i]);
					});
				}

				//div.setAttribute("data-toggle", "tooltip");
				div.setAttribute("title", o.name);

				if(typeof items[index+1] === "object"){
					$(div).addClass("dropdown");
					$(i).attr("data-toggle", "dropdown");
					dropdown(div, items[index+1], o.dropmenuWidth);
					//div.setAttribute("data-placement", "right");
				}else{
					//div.setAttribute("data-placement", "bottom");
				}
			}
		});
	};

	if(_this.itemsLeft){
		loop(_this.itemsLeft,_this.mainLeft);
	}

	if(_this.itemsRight){
		loop(_this.itemsRight,_this.mainRight);
	}

};
/**
 * Created by zhong on 2014/7/10.
 */

Toolbar.fn.initUiBuild = function(){
	var $parent = null,
		div = document.createElement("div"),
		leftDiv = document.createElement("div"),
		rightDiv = document.createElement("div");

	if(!this.container){
		$parent = $(this.graph.container).parent();
		$(div).prependTo($parent);
		$(this.graph.container).height($parent.height() - 40);
		this.container = $(div);
	}else{
		this.container.append(div);
	}

	div.className = "Toolbar clear";
	leftDiv.className = "Toolbar-left clear";
	rightDiv.className = "Toolbar-right clear";

	this.mainContainer = $(div);
	this.mainRight = $(rightDiv);
	this.mainLeft = $(leftDiv);
	div.appendChild(rightDiv);
	div.appendChild(leftDiv);
};



lib.actualsize = (function(){
	var o = {};
	o.name = "原始大小";
	o.icon = "fa-search";
	o.func = function(){
		this.graph.zoomActual();
	};
	return o;
})();

lib.bold = (function(){
	var o = {};
	o.name = "加粗";
	o.icon = "fa-bold";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_BOLD);
	};
	return o;
})();

lib.ciConfig = (function(){
	var o = {};
	o.name = "配置信息";
	o.icon = "fa-table";

	o.func = function(){
		if(this.obj.showCiTable){
			this.obj.showCiTable();
		}else{
			alert("此模式不支持配置信息");
		}
	};

	return o;
})();
lib.delete = (function(){
	var o = {};
	o.name = "删除";
	o.image = "icon-delete";
	o.func = function(){
		this.graph.removeCells();
	};
	return o;
})();

lib.endBlock = (function(){
	var o = {};
	o.name = "块状";
	o.image = "icon-end-block";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();


lib.endBlockTrans = (function(){
	var o = {};
	o.name = "块状(镂空)";
	o.image = "icon-end-blocktrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();


lib.endClassic = (function(){
	var o = {};
	o.name = "经典箭头";
	o.image = "icon-end-classic";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_CLASSIC);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();


lib.endClassicTrans = (function(){
	var o = {};
	o.name = "经典(镂空)";
	o.image = "icon-end-classictrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_CLASSIC);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();

lib.endDiamond = (function(){
	var o = {};
	o.name = "菱形";
	o.image = "icon-end-diamond";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_DIAMOND);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();

lib.endDiamondTrans = (function(){
	var o = {};
	o.name = "菱形(镂空)";
	o.image = "icon-end-diamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_DIAMOND);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();


lib.endNoarrow = (function(){
	var o = {};
	o.name = "没有箭头";
	o.image = "icon-end-noarrow";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.NONE);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();


lib.endOpen= (function(){
	var o = {};
	o.name = "打开";
	o.image = "icon-end-open";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_OPEN);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();

lib.endOval = (function(){
	var o = {};
	o.name = "椭圆";
	o.image = "icon-end-oval";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();

lib.endOvalTrans = (function(){
	var o = {};
	o.name = "椭圆（镂空）";
	o.image = "icon-end-ovaltrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();


lib.endThindiamond = (function(){
	var o = {};
	o.name = "扁菱形";
	o.image = "icon-end-thindiamond";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_DIAMOND_THIN);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();


lib.endThindiamondTrans = (function(){
	var o = {};
	o.name = "扁菱形(镂空)";
	o.image = "icon-end-thindiamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_DIAMOND_THIN);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();



lib.fillColor = (function(){
	var o = {};
	o.name = "填充颜色";
	o.image = "icon-fillcolor";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FILL_COLOR].apply(this.editor);
	};

	return o;
})();


lib.fontColor = (function(){
	var o = {};
	o.name = "文字颜色";
	//o.image = "icon-strokecolor";
	o.icon = "fa-adn";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FONT_COLOR].apply(this.editor);
	};

	return o;
})();

lib.fontFamily = (function(){
	var o = {},
		dropmenuItem = [];

	o.name = "字体设置";
	//o.image = "icon-strokecolor";
	o.icon = "fa-language";
	o.dropmenuWidth = 180;

	dropmenuItem = [
		"Helvetica",
		"Verdana",
		"Times New Roman",
		"Garamond",
		"Comic Sans MS",
		"Courier New",
		"Georgia",
		"Lucida Console",
		"Tahoma",
		"sans-serif",
		"custom"
	];
	$.each(dropmenuItem, function(){
		var name = this;
		lib["font_"+name] = (function(){
			var o = {};
			if(name === "custom"){
				o.name = "自定义";
				o.text = "输入值";
				o.func = function(){
					var _this = this,
						cells = [];
					DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FONT_FAMILY].apply(this.editor);
				};
			}else{
				o.name = name;
				o.font = name;
				o.text = name;
				o.func = function(){
					var _this = this,
						cells = [];
					cells = _this.graph.getSelectionCells();
					_this.graph.setCellStyles(mxConstants.STYLE_FONTFAMILY, name, cells);
				};
			}
			return o;
		})();
	});

	return o;
})();

lib.fontSize = (function(){
	var o = {},
		dropmenuItem = [];

	o.name = "文字大小";
	//o.image = "icon-strokecolor";
	o.icon = "fa-font";
	o.dropmenuWidth = 80;

	dropmenuItem = [6, 8, 9, 10, 11, 12, 14, 18, 24, 36, 48, 72, "custom"];
	$.each(dropmenuItem, function(){
		var num = this;
		lib["fontSize_"+num] = (function(){
			var o = {};
			if(num === "custom"){
				o.name = "自定义";
				o.text = "输入值";
				o.func = function(){
					var _this = this,
						cells = [];
					DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FONT_SIZE].apply(this.editor);
				};
			}else{
				o.name = num + "像素";
				o.text = num;
				o.func = function(){
					var _this = this,
						cells = [];
					cells = _this.graph.getSelectionCells();
					_this.graph.setCellStyles(mxConstants.STYLE_FONTSIZE, num, cells);
				};
			}
			return o;
		})();
	});

	return o;
})();
/**
 * Created by zhong on 2014/7/10.
 */

lib.graphModel = (function(){
	var o = {};
	o.name = "图形模式";
	o.icon = "fa-picture-o";

	o.func = function(){
		if(this.obj.showGraph){
			this.obj.showGraph();
		}
	};

	return o;
})();

lib.grid = (function(){
	var  o = {};
	o.name = "画布辅助点格隐藏显示切换";
	o.image = "icon-grid";
	o.bgColor = "#999";
	o.func = function(div, self){
		if(this.graph.container.style.backgroundImage){
			this.lastImage = this.graph.container.style.backgroundImage;
			this.graph.container.style.backgroundImage = "";
			self.style.backgroundColor = "";
		}else{
			this.graph.container.style.backgroundImage = this.lastImage;
			self.style.backgroundColor = o.bgColor;
		}
	};
	return o;
})();

lib.guides = (function(){
	var o = {};
	o.name = "标尺辅助线开关切换";
	o.image = "icon-guides";
	o.bgColor = "#999";
	o.func = function(div, self){
		this.graph.graphHandler.guidesEnabled = !this.graph.graphHandler.guidesEnabled;
		if(this.graph.graphHandler.guidesEnabled){
			self.style.backgroundColor = o.bgColor;
		}else{
			self.style.backgroundColor = "";
		}
	};
	return o;
})();
lib.italic = (function(){
	var o = {};
	o.name = "斜体";
	o.icon = "fa-italic";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_ITALIC);
	};
	return o;
})();

lib.kpiConfig = (function(){
	var o = {};
	o.name = "监控指标";
	o.icon = "fa-tasks";

	o.func = function($node){
		if(this.obj.showKpiTable){
			this.obj.showKpiTable();
		}else{
			alert("此模式不支持监控指标，请到视图管理查看此模式");
		}
	};

	return o;
})();
lib.line = (function(){
	var o = {};
	o.name = "线条样式";
	//o.icon = "fa-expand";
	o.image = "icon-line-straight";
	o.dropmenuWidth = 40;
	return o;
})();
/**
 * Created by zhong on 2014/7/10.
 */

lib.lineElbowHorizontal = (function(){
	var o = {};
	o.name = "折线（水平）";
	o.image = "icon-line-elbow-horizontal";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"elbowEdgeStyle");
		_this.graph.setCellStyles( mxConstants.STYLE_ELBOW, "horizontal");
		_this.graph.refresh(edges);
	};

	return o;
})();
/**
 * Created by zhong on 2014/7/10.
 */

lib.lineElbowVertical = (function(){
	var o = {};
	o.name = "折线（垂直）";
	o.image = "icon-line-elbow-vertical";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"elbowEdgeStyle");
		_this.graph.setCellStyles( mxConstants.STYLE_ELBOW, "vertical");
		_this.graph.refresh(edges);
	};

	return o;
})();

lib.lineEndclassic = (function(){
	var o = {};
	o.name = "线条结束样式";
	o.image = "icon-end-classic";
	o.dropmenuWidth = 40;
	return o;
})();
/**
 * Created by zhong on 2014/7/10.
 */

lib.lineEntityRelation = (function(){
	var o = {};
	o.name = "实体关系";
	o.image = "icon-line-entity-relation";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"entityRelationEdgeStyle");
		_this.graph.refresh(edges);
	};

	return o;
})();
/**
 * Created by zhong on 2014/7/10.
 */

lib.lineOrthogonal = (function(){
	var o = {};
	o.name = "正交边缘样式";
	o.image = "icon-line-orthogonal";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"orthogonalEdgeStyle");
		_this.graph.refresh(edges);
	};

	return o;
})();
/**
 * Created by zhong on 2014/7/10.
 */

lib.lineSegment = (function(){
	var o = {};
	o.name = "段边样式";
	o.image = "icon-line-segment";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"segmentEdgeStyle");
		_this.graph.refresh(edges);
	};

	return o;
})();

lib.lineStartclassic = (function(){
	var o = {};
	o.name = "线条起始样式";
	o.image = "icon-start-classic";
	o.dropmenuWidth = 40;
	return o;
})();
lib.lineStraight = (function(){
	var o = {};
	o.name = "直线";
	o.image = "icon-line-straight";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.refresh(edges);
	};

	return o;
})();

lib.link = (function(){
	var o = {};
	o.name = "编辑链接";
	o.image = "icon-link";
	o.func = function(){
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_EDIT_URL].apply(this.editor);
	};
	return o;
})();
/**
 * Created by zhong on 2014/7/10.
 */

lib.monitorModel = (function(){
	var o = {};
	o.name = "查看监控";
	o.icon = "fa-video-camera";

	o.func = function(){
		if(this.obj.showMonitorModel){
			this.obj.showMonitorModel();
		}else{
			alert("此模式不支持查看监控，请到视图管理查看此模式");
		}
	};

	return o;
})();

lib.newView = (function(){
	var o = {};
	o.name = "新建画布";
	o.icon = "fa-file";

	o.func = function(){
		var _this = this;
		_this.graph.removeCells(_this.graph.getChildCells());
		_this.obj.clearCache();
	};

	return o;
})();

lib.redo = (function(){
	var o = {};
	o.name = "重做";
	o.image = "icon-redo";
	o.func = function(){
		this.graph.stopEditing(false);
		this.editor.undoManager.redo();
	};
	return o;
})();

lib.shadow = (function(){
	var o = {};
	o.name = "阴影";
	o.image = "icon-shadow";
	o.func = function(){
		this.graph.toggleCellStyles(mxConstants.STYLE_SHADOW);
	};
	return o;
})();

lib.startBlock = (function(){
	var o = {};
	o.name = "块状";
	o.image = "icon-start-block";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();

lib.startBlockTrans = (function(){
	var o = {};
	o.name = "块状(镂空)";
	o.image = "icon-start-blocktrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();

lib.startClassic = (function(){
	var o = {};
	o.name = "经典箭头";
	o.image = "icon-start-classic";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_CLASSIC);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();

lib.startClassicTrans = (function(){
	var o = {};
	o.name = "经典(镂空)";
	o.image = "icon-start-classictrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_CLASSIC);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();
lib.startDiamond = (function(){
	var o = {};
	o.name = "菱形";
	o.image = "icon-start-diamond";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_DIAMOND);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();
lib.startDiamondTrans = (function(){
	var o = {};
	o.name = "菱形(镂空)";
	o.image = "icon-start-diamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_DIAMOND);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();

lib.startNoarrow = (function(){
	var o = {};
	o.name = "没有箭头";
	o.image = "icon-start-noarrow";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.NONE);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();

lib.startOpen= (function(){
	var o = {};
	o.name = "打开";
	o.image = "icon-start-open";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_OPEN);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();
lib.startOval = (function(){
	var o = {};
	o.name = "椭圆";
	o.image = "icon-start-oval";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();
lib.startOvalTrans = (function(){
	var o = {};
	o.name = "椭圆（镂空）";
	o.image = "icon-start-ovaltrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();

lib.startThindiamond = (function(){
	var o = {};
	o.name = "扁菱形";
	o.image = "icon-start-thindiamond";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_DIAMOND_THIN);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();

lib.startThindiamondTrans = (function(){
	var o = {};
	o.name = "扁菱形(镂空)";
	o.image = "icon-start-thindiamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_DIAMOND_THIN);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();

lib.strokeColor = (function(){
	var o = {};
	o.name = "边框颜色";
	//o.image = "icon-strokecolor";
	o.icon = "fa-pencil-square";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_STROKE_COLOR].apply(this.editor);
	};

	return o;
})();

lib.textAlign = (function(){
	var o = {};
	o.name = "文本对齐";
	o.icon = "fa-align-left";
	o.dropmenuWidth = 40;
	return o;
})();

lib.alignLeft = (function(){
	var o = {};
	o.name = "左对齐";
	o.image = "icon-align-left";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ALIGN, mxConstants.ALIGN_LEFT);
	};
	return o;
})();

lib.alignRight = (function(){
	var o = {};
	o.name = "右对齐";
	o.image = "icon-align-right";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ALIGN, mxConstants.ALIGN_RIGHT);
	};
	return o;
})();

lib.alignCenter = (function(){
	var o = {};
	o.name = "水平居中";
	o.image = "icon-align-center";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);
	};
	return o;
})();

lib.alignTop = (function(){
	var o = {};
	o.name = "顶部对齐";
	o.image = "icon-align-top";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_TOP);
	};
	return o;
})();

lib.alignBottom = (function(){
	var o = {};
	o.name = "低部对齐";
	o.image = "icon-align-bottom";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_BOTTOM);
	};
	return o;
})();

lib.alignMiddle = (function(){
	var o = {};
	o.name = "垂直中部对齐";
	o.image = "icon-align-middle";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
	};
	return o;
})();
lib.textShadow = (function(){
	var o = {};
	o.name = "文字阴影";
	o.text = "S";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_SHADOW);
	};
	return o;
})();
lib.underline = (function(){
	var o = {};
	o.name = "下划线";
	o.icon = "fa-underline";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_UNDERLINE);
	};
	return o;
})();

lib.undo = (function(){
	var o = {};
	o.name = "撤销";
	o.image = "icon-undo";
	o.func = function(){
		this.graph.stopEditing(false);
		this.editor.undoManager.undo();
	};
	return o;
})();

lib.viewOpen = (function(){
	var o = {};
	o.name = "打开视图";
	o.icon = "fa-folder-open";

	o.func = function(){
		var _this = this;
		graph.viewManagement.selectView(function(cateid, viewid){
			var result = null;
			result =  mmdb.view.information.get(cateid, viewid);
			if(graph.utils.isTrueRet(result)){
				graph.utils.openXml(_this.editor, result.data.xml);
				_this.obj.setCache("cateid", cateid);
				_this.obj.setCache("viewid", viewid);
			}else{
				graph.utils.alert(result.message);
			}
		});
	};

	return o;
})();

lib.viewPreview = (function(){
	var o = {};
	o.name = "查看预览";
	o.icon = "fa-external-link-square";

	o.func = function(){
		graph.utils.alert("暂时未开通！");
	};

	return o;
})();

lib.viewSave = (function(){
	var o = {};
	o.name = "保存视图";
	o.icon = "fa-save";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_VIEW_SAVE].apply(this.editor);
	};

	return o;
})();

lib.viewUpdate = (function(){
	var o = {};
	o.name = "更新视图";
	o.icon = "fa-refresh";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_VIEW_UPDATE].apply(this.editor);
	};

	return o;
})();

lib.zoomOut = (function(){
	var  o ={};
	o.name = "缩小";
	o.icon = "fa-search-minus";
	o.func = function(){
		this.graph.zoomOut();
	};
	return o;
})();
lib.zoomIn = (function(){
	var  o ={};
	o.name = "放大";
	o.icon = "fa-search-plus";
	o.func = function(){
		this.graph.zoomIn();
	};
	return o;
})();

lib.zoomToCenter = (function(){
	var o = {};
	o.name = "适应居中";
	o.icon = "fa fa-arrows-alt";
	o.func = function(){
		this.graph.zoomToCenter();
	};
	return o;
})();

window.Toolbar = Toolbar;

})( window );