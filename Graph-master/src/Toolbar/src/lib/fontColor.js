

lib.fontColor = (function(){
	var o = {};
	o.name = "文字颜色";
	o.image = "icon-fontColor";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FONT_COLOR].apply(this.editor);
	};

	return o;
})();