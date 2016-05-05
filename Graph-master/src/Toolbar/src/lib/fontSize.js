
lib.fontSize = (function(){
	var o = {},
		dropmenuItem = [];

	o.name = "文字大小";
	o.image = "icon-fontSize";
	o.dropmenuWidth = 80;

	dropmenuItem = [6, 8, 9, 10, 11, 12, 14, 18, 24, 36, 48, 72, "custom"];
	$.each(dropmenuItem, function(){
		var num = this;
		lib["fontSize_"+num] = (function(){
			var o = {};
			if(num === "custom"){
				o.name = "自定义";
				o.text = "输入值";
				o.func = function(){
					var _this = this,
						cells = [];
					DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FONT_SIZE].apply(this.editor);
				};
			}else{
				o.name = num + "像素";
				o.text = num;
				o.func = function(){
					var _this = this,
						cells = [];
					cells = _this.graph.getSelectionCells();
					_this.graph.setCellStyles(mxConstants.STYLE_FONTSIZE, num, cells);
				};
			}
			return o;
		})();
	});

	return o;
})();