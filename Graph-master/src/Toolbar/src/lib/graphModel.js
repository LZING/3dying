/**
 * Created by zhong on 2014/7/10.
 */

lib.graphModel = (function(){
	var o = {};
	o.name = "图形模式";
	o.image = "icon-graph";

	o.func = function(){
		if(this.obj.showGraph){
			this.obj.showGraph();
		}
	};

	return o;
})();