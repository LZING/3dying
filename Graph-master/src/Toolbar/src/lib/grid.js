
lib.grid = (function(){
	var  o = {};
	o.name = "画布辅助点格隐藏显示切换";
	o.image = "icon-grid";
	o.bgColor = "#999";
	o.func = function(div, self){
		if(this.graph.container.style.backgroundImage){
			this.lastImage = this.graph.container.style.backgroundImage;
			this.graph.container.style.backgroundImage = "";
			self.style.backgroundColor = "";
		}else{
			this.graph.container.style.backgroundImage = this.lastImage;
			self.style.backgroundColor = o.bgColor;
		}
	};
	return o;
})();