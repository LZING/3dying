lib.orderDown = (function(){
	var o = {};
	o.name = "向下排序";
	o.image = "icon-orderDown";
	o.func = function(){
		this.graph.orderCells(true, [this.graph.getSelectionCell()]);
	};
	return o;
})();