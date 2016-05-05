
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
