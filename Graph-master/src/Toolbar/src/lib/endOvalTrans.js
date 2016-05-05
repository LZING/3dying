lib.endOvalTrans = (function(){
	var o = {};
	o.name = "椭圆（镂空）";
	o.image = "icon-end-ovaltrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_OVAL);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();
