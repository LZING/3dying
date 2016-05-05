
lib.newView = (function(){
	var o = {};
	o.name = "新建画布";
	o.image = "icon-newfile";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_BACKGROUND_IMG_RM].apply(this);
		_this.graph.removeCells(_this.graph.getChildCells());
		_this.obj.clearCache();
	};

	return o;
})();