
lib.bold = (function(){
	var o = {};
	o.name = "加粗";
	o.image = "icon-bold";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_BOLD);
	};
	return o;
})();