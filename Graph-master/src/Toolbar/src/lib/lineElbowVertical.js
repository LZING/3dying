/**
 * Created by zhong on 2014/7/10.
 */

lib.lineElbowVertical = (function(){
	var o = {};
	o.name = "折线（垂直）";
	o.image = "icon-line-elbow-vertical";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"elbowEdgeStyle");
		_this.graph.setCellStyles( mxConstants.STYLE_ELBOW, "vertical");
		_this.graph.refresh(edges);
	};

	return o;
})();