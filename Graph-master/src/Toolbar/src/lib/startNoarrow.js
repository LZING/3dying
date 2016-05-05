
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