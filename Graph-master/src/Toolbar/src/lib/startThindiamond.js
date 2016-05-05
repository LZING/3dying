
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