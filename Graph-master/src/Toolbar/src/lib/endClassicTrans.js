
lib.endClassicTrans = (function(){
	var o = {};
	o.name = "经典(镂空)";
	o.image = "icon-end-classictrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_CLASSIC);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();
