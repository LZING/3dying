
lib.guides = (function(){
	var o = {};
	o.name = "标尺辅助线开关切换";
	o.image = "icon-guides";
	o.bgColor = "#999";
	o.func = function(div, self){
		this.graph.graphHandler.guidesEnabled = !this.graph.graphHandler.guidesEnabled;
		if(this.graph.graphHandler.guidesEnabled){
			self.style.backgroundColor = o.bgColor;
		}else{
			self.style.backgroundColor = "";
		}
	};
	return o;
})();