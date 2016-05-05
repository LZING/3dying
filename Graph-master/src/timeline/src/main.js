var Timeline = null;

// 类定义
Timeline = function(options) {
	return new Timeline.fn.init(graph, options);
};

Timeline.fn = Timeline.prototype = {
	constructor : Timeline,
	init : function(graph, options) {
		var _this = this;

		_this.timeout = 1000 * 60 * 5;
		_this.graduationItems = [];
		_this.points = [];
		_this.graduationSpaceWidth = 10;
		_this.num = 150;
		_this.labelItems = [];
		_this.options = options;
		_this.graph = options.graph;
		_this.getTimeDate();
		_this.buildUI();
		_this.rawGraduation();
		_this.rawTimeline();
		_this.onload();
		_this.oriGraphHeight = options.oriGraphHeight + 2;
	}
};

Timeline.fn.init.prototype = Timeline.fn;
