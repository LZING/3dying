
(function(){

	/**
	 * 继承
	 * @param {Object} o
	 */
	T.fn.extend = function(o){
		var i;
		
		for(i in o){
			this[i] = o[i];
		}
	};
		
})();