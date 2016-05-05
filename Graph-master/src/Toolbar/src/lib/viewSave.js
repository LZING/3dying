
lib.viewSave = (function(){
	var o = {};
	o.name = "保存视图";
	o.image = "icon-savefile";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_VIEW_SAVE].apply(this.editor);
	};

	return o;
})();