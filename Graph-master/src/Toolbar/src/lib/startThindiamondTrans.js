
lib.startThindiamondTrans = (function(){
	var o = {};
	o.name = "扁菱形(镂空)";
	o.image = "icon-start-thindiamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_DIAMOND_THIN);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();