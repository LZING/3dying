
lib.startClassic = (function(){
	var o = {};
	o.name = "经典箭头";
	o.image = "icon-start-classic";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_CLASSIC);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();