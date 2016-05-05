
lib.kpiConfig = (function(){
	var o = {};
	o.name = "监控指标";
	o.image = "icon-kpi";

	o.func = function($node){
		if(this.obj.showKpiTable){
			this.obj.showKpiTable();
		}else{
			alert("此模式不支持监控指标，请到视图管理查看此模式");
		}
	};

	return o;
})();