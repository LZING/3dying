lib.zoomOut = (function(){
	var  o ={};
	o.name = "缩小";
	o.image = "icon-zoomOut";
	o.func = function(){
		this.graph.zoomOut();
	};
	return o;
})();