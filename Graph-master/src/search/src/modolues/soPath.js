
// 路径
(function(){
	
	var inCell = function(id, arr){
		var i, k;
		for(i=0, k=arr.length; i<k; i++){
			if(arr[i].id === id){
				return true;
			}
		}
		return false;
	};
	
	var exCell = function(formArr, cells){
		var i, k, n, m, arr=[], isin, toArr = [];
		if(formArr && cells.edge.length >= 1){			
			for(i=0; i<cells.edge.length; i++){
				toArr.push(cells.edge[i]);
			}
			
			for(i=0; i<cells.vertex[0].edges.length; i++){
				toArr.push(cells.vertex[0].edges[i]);
			}

			for(i=0; i<formArr.length; i++){
				isin = false;
				
				for(n=0; n<toArr.length; n++){
					if(formArr[i].id === toArr[n].id){
						isin = true;
					}
				}
				
				if(!isin){
					arr.push(formArr[i]);
				}
			}
		}else{
			arr = formArr;
		}
		
		return arr ? arr : [];
	};
	
	var shortPath = function(path){
		var res, i, k, n, m, vertex, length;
		
		if(path.length === 0){
			res = {vertex:[], edge:[]};
		}else{
			for(i=0, k=path.length; i<k; i++){
				vertex = path[i].vertex;
				length = 0;
				for(n=0, m=vertex.length-1; n<m; n++){
					length += dis({
						x : vertex[n].geometry.x,
						y : vertex[n].geometry.y
					},{
						x : vertex[n+1].geometry.x,
						y : vertex[n+1].geometry.y						
					});
				}
				
				path[i].length = length;
			}
			
			path.sort(function(i, k){
				if(i.length>k.length){
					return 1;
				}else{
					return -1;
				}
			});
			
			res = path[0];
		}
		
		return path[0];
	};
	
	var dis = function(fromPos, targetPos){
		var height, width;
		
		height = Math.abs(fromPos.y - targetPos.y);
		width = Math.abs(fromPos.x - targetPos.x );
		
		return Math.sqrt( width*width + height*height );
	};
	
	Search.fn.soPath = function(from, target){
		var _this = this,
			result = {vertex:[], edge:[]},
			path = [],
			i, k;
		
		if(typeof from === "undefined" || typeof target === "undefined"){
			return result;
		}
		
		var exp = function(o){
			var i, k, n, m, last, edges, arr = [], tmp;
			
			if(o.id === target.id){
				tmp = {vertex:[], edge:[]};
				for(n=0; n<result.vertex.length; n++){
					tmp.vertex.push(result.vertex[n]);
				}
				for(n=0; n<result.edge.length; n++){
					tmp.edge.push(result.edge[n]);
				}

				path.push(tmp);
			}else{
				edges = exCell(o.edges, result);
				if(edges.length>=1){
					for(i=0, k=edges.length; i<k; i++){
						if( edges[i].source.id === o.id){
							arr.push({
								vertex : edges[i].target,
								edge : edges[i]
							});
						}else{
							arr.push({
								vertex : edges[i].source,
								edge : edges[i]
							});
						}
						
						if(arr.length >=1 && arr[arr.length-1].vertex.id ===  target.id){
							arr = [arr.pop()];
							break;
						}
					}

					for(i=0; i<arr.length; i++){
						result.vertex.push(arr[i].vertex);
						result.edge.push(arr[i].edge);		
						exp(arr[i].vertex);
						result.vertex.pop();
						result.edge.pop();
					}
				}
			}
		};
		
		result.vertex.push(from);
		exp(from);
		
		return shortPath(path);
	};
	
})();