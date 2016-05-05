
lib.shadow = (function(){
	var o = {};
	o.name = "阴影";
	o.image = "icon-shadow";
	o.func = function(){
		this.graph.toggleCellStyles(mxConstants.STYLE_SHADOW);
	};
	return o;
})();