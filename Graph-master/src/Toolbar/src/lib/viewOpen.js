
lib.viewOpen = (function(){
	var o = {};
	o.name = "打开视图";
	o.image = "icon-openfile";

	o.func = function(){
		var _this = this;
		graph.viewManagement.selectView(function(viewid){
			var result = null;
			result =  graph.api.getView(viewid);
			if(graph.utils.isTrueRet(result)){
				graph.utils.openXml(_this.editor, result.data.xml);
				_this.obj.setCache("viewid", viewid);
			}else{
				graph.utils.alert(result.message);
			}
		});
	};

	return o;
})();