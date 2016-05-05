
lib.startClassicTrans = (function(){
	var o = {};
	o.name = "经典(镂空)";
	o.image = "icon-start-classictrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_CLASSIC);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();