
/**
 * 类定义
 * @class T
 * @param {Object} jsonData
 */
T = function(jsonData, sidebar) {
	
	if(typeof jsonData !== "object"){
		jsonData = {};
	}
	
	return new T.fn.init(jsonData, sidebar);
};

T.fn = T.prototype = {
	constructor : T,
	init : function(jsonData, sidebar) {
		var i,k;
		THIS = this;
		this.KEY = this.key();
		this.jsonToTree(jsonData);
		this.sidebar = sidebar;
	}
};

T.fn.init.prototype = T.fn;
