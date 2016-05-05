/**
 * Created by zhong on 2014/7/10.
 */

lib.lineElbowHorizontal = (function(){
	var o = {};
	o.name = "折线（水平）";
	o.image = "icon-line-elbow-horizontal";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"elbowEdgeStyle");
		_this.graph.setCellStyles( mxConstants.STYLE_ELBOW, "horizontal");
		_this.graph.refresh(edges);
	};

	return o;
})();