/**
 * Created by zhong on 2014/7/10.
 */

lib.monitorModel = (function(){
	var o = {};
	o.name = "查看监控";
	o.image = "icon-monitor";

	o.func = function(){
		if(this.obj.showMonitorModel){
			this.obj.showMonitorModel();
		}else{
			alert("此模式不支持查看监控，请到视图管理查看此模式");
		}
	};

	return o;
})();