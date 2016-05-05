
lib.zoomIn = (function(){
	var  o ={};
	o.name = "放大";
	o.image = "icon-zoomIn";
	o.func = function(){
		this.graph.zoomIn();
	};
	return o;
})();