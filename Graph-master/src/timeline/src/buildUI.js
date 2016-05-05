
Timeline.fn.buildUI = function(){
	var mainElement = null,
		collspaceElement = null,
		graphContainer = null,
		lineGraphContainer = null,
		pointsContainer = null,
		graduationsContainer = null,
		lineGraphContainerRule = null,
		labelsContainer = null,
		lineGraphBoxContainer = null,
		timeLabelContainer = null,
		oriHeight = null,
		_this = this;

	graphContainer = $(_this.graph.container);
	graphContainer.parent().find(".timeline").remove();
	mainElement = document.createElement("div");
	mainElement.className = "timeline";

	collspaceElement = document.createElement("div");
	collspaceElement.className = "timeline-collspace timeline-collspace-top";

	collspaceElement.onclick = function(){
		if($(mainElement).height() < oriHeight){
			_this.show();
		}else{
			_this.hide();
		}
	};

	timeLabelContainer = document.createElement("div");
	timeLabelContainer.className = "timeline-graph-time-label";

	lineGraphBoxContainer = document.createElement("div");
	lineGraphBoxContainer.className = "timeline-graph-line-box";

	lineGraphContainer = document.createElement("div");
	lineGraphContainer.className = "timeline-graph-line clear";

	lineGraphContainerRule = document.createElement("div");
	lineGraphContainerRule.className = "timeline-graph-line-rule";
	lineGraphContainer.appendChild(lineGraphContainerRule);

	pointsContainer = document.createElement("div");
	pointsContainer.className = "timeline-graph-line-points";
	lineGraphContainer.appendChild(pointsContainer);

	labelsContainer = document.createElement("div");
	labelsContainer.className = "timeline-graph-labels";
	lineGraphContainer.appendChild(labelsContainer);

	graduationsContainer = document.createElement("div");
	graduationsContainer.className = "timeline-graph-line-graduations clear";
	lineGraphContainer.appendChild(graduationsContainer);

	lineGraphBoxContainer.appendChild(lineGraphContainer);
	mainElement.appendChild(collspaceElement);
	mainElement.appendChild(lineGraphBoxContainer);
	mainElement.appendChild(timeLabelContainer);
	graphContainer.parent().append(mainElement);

	oriHeight = $(mainElement).height();
	$(mainElement).height($(collspaceElement).height());
	graphContainer.height(_this.oriGraphHeight - $(mainElement).height());

	_this.mainElement = mainElement;
	_this.lineGraphContainer = lineGraphContainer;
	_this.lineGraphContainerRule = lineGraphContainerRule;
	_this.pointsContainer = pointsContainer;
	_this.graduationsContainer = graduationsContainer;
	_this.collspaceElement = collspaceElement;
	_this.collspaceElementOriHeight = oriHeight;
	_this.graphContainer = graphContainer;
	_this.labelsContainer = labelsContainer;
	_this.lineGraphBoxContainer = lineGraphBoxContainer;
	_this.timeLabelContainer = timeLabelContainer;

	graphContainer.parent().resize(function(){
		_this.resize();
	});
};