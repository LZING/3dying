(function(){
	
	var tree = {},
		splitChar = "-";
		
	var toTree = function(key, value, o){
		
		var i, k, arr, tree, _this = this;
		
		arr = key.split(splitChar);
		tree = o;
		
		for(i=0,k=arr.length; i<k; i++){
			if(typeof tree[arr[i]] === "undefined" ){
				tree[arr[i]] = {};
			}
			
			if(k-i === 1){
				tree[arr[i]] = value;
			}
			
			if(typeof tree[arr[i]].childrenNode === "undefined"){
				tree[arr[i]].childrenNode = {};
			}
			
			tree = tree[arr[i]].childrenNode;
		}
		
		return tree;
	};
	
	T.fn.jsonToTree = function(param){
		
		var i,
			_this = this;
			
		_this.setTree({});
		
		/*
		for(i in param){
			toTree(i, param[i], _this.getTree());
		}
		*/
		
		tree[this.key] = param;
		
		return _this;
		
	};
	
	T.fn.getTree = function(){
		return tree[this.key];
	};
	
	T.fn.setTree = function(o){
		tree[this.key] = o;
		return this;
	};

})();