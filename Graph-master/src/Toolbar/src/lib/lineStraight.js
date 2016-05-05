lib.lineStraight = (function(){
	var o = {};
	o.name = "直线";
	o.image = "icon-line-straight";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.refresh(edges);
	};

	return o;
})();