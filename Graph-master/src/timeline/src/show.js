
Timeline.fn.show = function(){
	var _this = this;
	$(_this.mainElement).height(_this.collspaceElementOriHeight);
	_this.collspaceElement.className = "timeline-collspace timeline-collspace-bottom";
	_this.graphContainer.height(_this.oriGraphHeight - $(_this.mainElement).height());
	_this.updateInterval();
	if(_this.options.show){
		_this.options.show();
	}
};