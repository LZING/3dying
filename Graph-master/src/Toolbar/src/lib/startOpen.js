
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