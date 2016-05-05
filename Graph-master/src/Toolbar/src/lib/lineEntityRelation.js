/**
 * Created by zhong on 2014/7/10.
 */

lib.lineEntityRelation = (function(){
	var o = {};
	o.name = "实体关系";
	o.image = "icon-line-entity-relation";

	o.func = function(){
		var _this = this,
			edges = null;

		edges = _this.graph.getSelectionEdges();
		graph.utils.clearEdgePoints(edges);
		graph.utils.clearEdgeStyle(_this.graph, edges);

		_this.graph.setCellStyles(mxConstants.STYLE_EDGE,"entityRelationEdgeStyle");
		_this.graph.refresh(edges);
	};

	return o;
})();