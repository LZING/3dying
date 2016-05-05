
// 搜索
// 目前只支持傻瓜式搜索
(function(){

	Search.fn.soCell = function(key){
		var _this = this,
			result = {vertex:[], edge:[]};
			
		var loop = function(cells){
			var  i, k, n, m;
			
			for(i=0, k=cells.length; i<k; i++){
				
				if(cells[i].value.replaceAll("\n", "") === key){
					result.vertex.push(cells[i]);
					
					if(cells[i].edges && cells[i].edges.length >= 1){
						for(n=0, m=cells[i].edges.length; n<m; n++){
							result.edge.push(cells[i].edges[n]);
						}
					}
				}
				
				var childs = _this.graph.getChildVertices(cells[i]);
				if(typeof childs === "object" && childs.length >= 1){
					loop(childs);
				}
			}
		};

		cells = _this.graph.getChildVertices();
		loop(cells);
		
		return result;
	};
	
})();