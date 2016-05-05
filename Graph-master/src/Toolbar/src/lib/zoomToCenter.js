
lib.zoomToCenter = (function(){
	var o = {};
	o.name = "适应居中";
	o.image = "icon-zoomtocenter";
	o.func = function(){
		this.graph.zoomToCenter();
	};
	return o;
})();