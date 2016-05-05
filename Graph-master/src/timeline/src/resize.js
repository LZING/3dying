
Timeline.fn.resize = function(){
	var _this = this,
		lineWidth = 0,
		itemWidth = 0;

	lineWidth = $(_this.lineGraphContainer).width();
	itemWidth = (lineWidth - _this.graduationSpaceWidth)/_this.num;
	_this.graduationItemWidth = itemWidth;

	_this.graduationItems.each(function(i){
		this.style.width = itemWidth + "px";
		this.style.left = itemWidth  * i + "px";
	});

	_this.points.each(function(){
		var time = 0;
		time = Number(this.getAttribute("time"));
		this.style.left = itemWidth  * (_this.num - time) + "px";
	});

	_this.labelItems.each(function(){
		var dataNum = this.getAttribute("data-num"),
			$obj = null,
			pos = null;

		$obj = $(_this.graduationsContainer).find("[data-num="+dataNum+"]");
		pos = $obj.position();
		this.style.width = itemWidth * 5 + "px";
		this.style.left = (pos.left - itemWidth * 2) + "px";
	});
};