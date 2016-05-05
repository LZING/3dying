
lib.ciConfig = (function(){
	var o = {};
	o.name = "配置信息";
	o.image = "icon-table";

	o.func = function(){
		if(this.obj.showCiTable){
			this.obj.showCiTable();
		}else{
			alert("此模式不支持配置信息");
		}
	};

	return o;
})();