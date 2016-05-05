lib.endDiamondTrans = (function(){
	var o = {};
	o.name = "菱形(镂空)";
	o.image = "icon-end-diamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_ENDARROW, mxConstants.ARROW_DIAMOND);
		this.graph.setCellStyles("endFill", 0);
	};
	return o;
})();
