
lib.fontFamily = (function(){
	var o = {},
		dropmenuItem = [];

	o.name = "字体设置";
	o.image = "icon-fontFamily";
	o.dropmenuWidth = 180;

	dropmenuItem = [
		"Helvetica",
		"Verdana",
		"Times New Roman",
		"Garamond",
		"Comic Sans MS",
		"Courier New",
		"Georgia",
		"Lucida Console",
		"Tahoma",
		"sans-serif",
		"custom"
	];
	$.each(dropmenuItem, function(){
		var name = this;
		lib["font_"+name] = (function(){
			var o = {};
			if(name === "custom"){
				o.name = "自定义";
				o.text = "输入值";
				o.func = function(){
					var _this = this,
						cells = [];
					DEFINE.GRAPH_CONTEXT_MENU_LIBS[DEFINE.MENU_FONT_FAMILY].apply(this.editor);
				};
			}else{
				o.name = name;
				o.font = name;
				o.text = name;
				o.func = function(){
					var _this = this,
						cells = [];
					cells = _this.graph.getSelectionCells();
					_this.graph.setCellStyles(mxConstants.STYLE_FONTFAMILY, name, cells);
				};
			}
			return o;
		})();
	});

	return o;
})();