
Timeline.fn.remove = function(){
	var _this = this;

	_this.stopUpdateInterval();
	$(_this.mainElement).remove();
};