
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
