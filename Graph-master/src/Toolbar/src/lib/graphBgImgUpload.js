/**
 * Created by Lee on 2014/8/19.
 */
lib.graphBgImgUpload = (function(){
	var o = {};
	o.name = "上传背景图片";
	o.image = "icon-setGraphBgImg";

	o.func = function(){
		var _this = this;
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_BACKGROUND_IMG_SET].apply(this.editor);
	};

	return o;
})();