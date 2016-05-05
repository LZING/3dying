lib.delete = (function(){
	var o = {};
	o.name = "删除";
	o.image = "icon-delete";
	o.func = function(){
		this.graph.removeCells();
	};
	return o;
})();