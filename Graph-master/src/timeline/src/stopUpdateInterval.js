
Timeline.fn.stopUpdateInterval = function(){
	var _this = this;

	window.clearInterval(_this.oUpdateInterval);
	_this.oUpdateInterval = null;
};