

// 给细胞添加高亮
(function(){
	
	var vertexStyle = "strokeWidth=4;strokeColor=#0066FF;";
	var edgeStyle = "strokeColor=#0066FF;strokeWidth=4;fillColor=none;";
	
	var setStyle = function(graph, cell, style, ogStyle){
		
		ogStyle = typeof ogStyle === "string" ? ogStyle : "";
		if(ogStyle !== "" && ogStyle.charAt(ogStyle.length - 1) !== ";"){
			ogStyle += ";";
		}
		
		ogStyle += style;
		
		graph.setCellStyle(ogStyle, [cell]);
	};
	
	Search.fn.cellAddHighlighter = function(cells){
		var _this = this,
			i, k, n, m, key, o;

		if(cells){
			_this.graph.getModel().beginUpdate();
			try{
				for(i=0, k=cells.vertex.length; i<k; i++){
					_this.vertexs.push(
						_this.graph.insertVertex(
							cells.vertex[i].getParent(),
							null,
							"",
							cells.vertex[i].geometry.x,
							cells.vertex[i].geometry.y,
							cells.vertex[i].geometry.width,
							cells.vertex[i].geometry.height,
							edgeStyle
						)
					);
				}
				
				for(n=0, m=cells.edge.length; n<m; n++){
					o = cells.edge[n];
					if(typeof _this.originalStyle[o.id] === "undefined"){
						_this.originalStyle[o.id] = typeof o.getStyle() === "string" ? o.getStyle() : "";
					}
	
					setStyle(_this.graph, o, edgeStyle, _this.originalStyle[o.id]);
				}
			}finally{
				_this.graph.getModel().endUpdate();
			}		
		}

		return _this;
	};
	
})();