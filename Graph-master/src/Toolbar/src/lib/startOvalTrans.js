lib.startOvalTrans = (function(){
	var o = {};
	o.name = "椭圆（镂空）";
	o.image = "icon-start-ovaltrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();