
lib.autoSwitching = (function(){
	var o = {};
	o.name = "自动切换模式";
	o.image = "icon-autoswitching";

	o.func = function($node){
		if(this.obj.autoSwitching){
			this.obj.autoSwitching();
		}
	};

	return o;
})();