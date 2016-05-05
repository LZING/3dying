

// 类定义
Search = function(options) {
	return new Search.fn.init(options);
};

Search.fn = Search.prototype = {
	constructor : Search,
	init : function(options) {
		var i,k, _this = this;
		THIS = this;
		
		_this.vertexs = [];
		_this.originalStyle = {};
		for(i in options){
			_this[i] = options[i];
		}

	}
};

Search.fn.init.prototype = Search.fn;
