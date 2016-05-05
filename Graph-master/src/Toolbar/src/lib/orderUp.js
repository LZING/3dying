/**
 * Created by Lee on 2014/9/16.
 */

lib.orderUp = (function(){
	var o = {};
	o.name = "向上排序";
	o.image = "icon-orderUp";
	o.func = function(){
		this.graph.orderCells(false, [this.graph.getSelectionCell()]);
	};
	return o;
})();