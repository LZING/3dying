
lib.endThindiamondTrans = (function(){
	var o = {};
	o.name = "扁菱形(镂空)";
	o.image = "icon-end-thindiamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_DIAMOND_THIN);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();
