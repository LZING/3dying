

// 移出细胞高亮
(function(){
	
	Search.fn.cellDelHighlighter = function(){
		
		var _this = this, i, k, cells, removeCells = [];
		
		_this.graph.getModel().beginUpdate();
		try{
			while(_this.vertexs.length>=1){
				removeCells.push(_this.vertexs.pop());
			}
			_this.graph.removeCells(removeCells);
		}finally{
			_this.graph.getModel().endUpdate();
		}

		_this.graph.getModel().beginUpdate();
		try{
			cells = _this.graph.getChildCells();
			
			for(i=0, k=cells.length; i<k; i++){
				if(typeof _this.originalStyle[cells[i].id] === "string"){
					_this.graph.setCellStyle(_this.originalStyle[cells[i].id], [cells[i]]);
				}		
			}
		}finally{
			_this.graph.getModel().endUpdate();
		}

		return _this;
	};
	
})();