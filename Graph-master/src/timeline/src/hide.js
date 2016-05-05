
Timeline.fn.hide = function(){
	var _this = this;

	_this.stopUpdateInterval();
	$(_this.mainElement).height($(_this.collspaceElement).height());
	_this.graphContainer.height(_this.oriGraphHeight - $(_this.mainElement).height());
	_this.collspaceElement.className = "timeline-collspace timeline-collspace-top";
	$(_this.timeLabelContainer).hide();
	if(_this.options.hide){
		_this.options.hide();
	}
};