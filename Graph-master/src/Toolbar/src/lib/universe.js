/**
 * Created by Lee on 2014/10/21.
 */
lib.universe = (function(){
	var  o = {};
	o.name = "切换到3D";
	o.image = "icon-grid";

	o.func = function(){
		graph.utils.createWebGl({
			layers: [
				this.graph.getJson()
			]
		});
	};
	return o;
})();