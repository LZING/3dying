
(function(){
	Search.fn.extend = function(o){
		var i;

		for(i in o){
			this[i] = o[i];
		}
	};
		
})();