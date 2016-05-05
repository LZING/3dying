
lib.link = (function(){
	var o = {};
	o.name = "编辑链接";
	o.image = "icon-link";
	o.func = function(){
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_EDIT_URL].apply(this.editor);
	};
	return o;
})();