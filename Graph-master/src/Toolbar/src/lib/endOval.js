lib.endOval = (function(){
	var o = {};
	o.name = "椭圆";
	o.image = "icon-end-oval";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();
