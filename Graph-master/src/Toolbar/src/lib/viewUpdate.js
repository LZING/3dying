
lib.viewUpdate = (function(){
	var o = {};
	o.name = "更新视图";
	o.image = "icon-updatefile";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_VIEW_UPDATE].apply(this.editor);
	};

	return o;
})();