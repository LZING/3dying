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
