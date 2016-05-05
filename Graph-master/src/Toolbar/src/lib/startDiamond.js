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