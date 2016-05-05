lib.startDiamondTrans = (function(){
	var o = {};
	o.name = "菱形(镂空)";
	o.image = "icon-start-diamondtrans";
	o.func = function(){
		this.graph.setCellStyles(mxConstants.STYLE_STARTARROW, mxConstants.ARROW_DIAMOND);
		this.graph.setCellStyles("startFill", 0);
	};
	return o;
})();