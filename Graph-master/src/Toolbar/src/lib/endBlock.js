
lib.endBlock = (function(){
	var o = {};
	o.name = "块状";
	o.image = "icon-end-block";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("endFill", 1);
	};
	return o;
})();
