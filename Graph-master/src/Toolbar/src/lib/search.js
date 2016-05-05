/**
 * Created by Lee on 2014/10/11.
 */
lib.searchNode = (function(){
	var o = {};
	o.name = "搜索节点";
	o.image = "icon-search-node";
	o.func = function(){
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_SEARCH_NODE].apply(this);
	};
	return o;
})();

lib.searchPath = (function(){
	var o = {};
	o.name = "搜索路径";
	o.image = "icon-search-path";
	o.func = function(){
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_SEARCH_PATH].apply(this);
	};
	return o;
})();

lib.searchClear = (function(){
	var o = {};
	o.name = "清除搜索结果";
	o.image = "icon-search-clear";
	o.func = function(){
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_SEARCH_CLEAR].apply(this);
	};
	return o;
})();