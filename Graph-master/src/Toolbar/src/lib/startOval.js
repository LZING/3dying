lib.startOval = (function(){
	var o = {};
	o.name = "椭圆";
	o.image = "icon-start-oval";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();