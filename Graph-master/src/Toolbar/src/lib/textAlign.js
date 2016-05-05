
lib.textAlign = (function(){
	var o = {};
	o.name = "文本对齐";
	o.image = "icon-align";
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
	o.name = "底部对齐";
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