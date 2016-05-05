/**
 * Created by Lee on 2014/8/19.
 */
lib.graphBgImgClear = (function(){
	var o = {};
	o.name = "移除背景图片";
	o.image = "icon-delGraphBgImg";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_BACKGROUND_IMG_RM].apply(this.editor);
	};

	return o;
})();