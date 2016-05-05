
lib.endBlockTrans = (function(){
	var o = {};
	o.name = "块状(镂空)";
	o.image = "icon-end-blocktrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_BLOCK);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();
