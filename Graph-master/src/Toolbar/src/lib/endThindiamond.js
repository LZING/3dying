
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
