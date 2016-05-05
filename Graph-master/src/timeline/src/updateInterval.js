
Timeline.fn.updateInterval = function(){
	var _this = this;

	_this.oUpdateInterval = window.setInterval(function(){
		_this.points.each(function(){
			$(this).remove();
		});

		_this.getTimeDate();
		_this.rawTimeline();

	}, _this.timeout);
};