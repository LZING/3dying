
lib.startBlockTrans = (function(){
	var o = {};
	o.name = "块状(镂空)";
	o.image = "icon-start-blocktrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();