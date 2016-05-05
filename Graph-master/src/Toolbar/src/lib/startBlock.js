
lib.startBlock = (function(){
	var o = {};
	o.name = "块状";
	o.image = "icon-start-block";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("startFill", 1);
	};
	return o;
})();