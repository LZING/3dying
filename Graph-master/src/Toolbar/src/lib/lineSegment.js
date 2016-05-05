/**
 * Created by zhong on 2014/7/10.
 */

lib.lineSegment = (function(){
	var o = {};
	o.name = "段边样式";
	o.image = "icon-line-segment";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"segmentEdgeStyle");
		_this.graph.refresh(edges);
	};

	return o;
})();