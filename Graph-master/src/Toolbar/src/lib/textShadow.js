lib.textShadow = (function(){
	var o = {};
	o.name = "文字阴影";
	o.text = "S";
	o.func = function(){
		this.graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, mxConstants.FONT_SHADOW);
	};
	return o;
})();