
lib.actualsize = (function(){
	var o = {};
	o.name = "原始大小";
	o.image = "icon-zoomProportional";
	o.func = function(){
		this.graph.zoomActual();
	};
	return o;
})();