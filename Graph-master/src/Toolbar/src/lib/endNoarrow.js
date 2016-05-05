
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
