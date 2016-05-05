lib.italic = (function(){
	var o = {};
	o.name = "斜体";
	o.image = "icon-italic";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_ITALIC);
	};
	return o;
})();