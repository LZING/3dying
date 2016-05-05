lib.underline = (function(){
	var o = {};
	o.name = "下划线";
	o.image = "icon-underline";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_UNDERLINE);
	};
	return o;
})();