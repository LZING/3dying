

lib.fillColor = (function(){
	var o = {};
	o.name = "填充颜色";
	o.image = "icon-fillcolor";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FILL_COLOR].apply(this.editor);
	};

	return o;
})();