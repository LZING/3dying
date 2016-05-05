/**
 * Created by Lee on 2014/9/19.
 */
lib.setCellImg = (function(){
	var o = {};
	o.name = "设置对象图片";
	o.image = "icon-changeIcon";
	o.func = function(){
		DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_CHANGE_IMAGE].apply(this);
	};
	return o;
})();