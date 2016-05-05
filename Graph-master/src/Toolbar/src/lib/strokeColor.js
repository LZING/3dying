
lib.strokeColor = (function(){
	var o = {};
	o.name = "边框颜色";
	o.image = "icon-strokecolor";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_STROKE_COLOR].apply(this.editor);
	};

	return o;
})();