
Timeline.fn.rawTimeline = function(){
	var createPoint = null,
		itemPoint = null,
		lineWidth = null,
		lastClickedObj = null,
		_this = this;

	createPoint = function(data){
		var point = null,
			clr = null,
			colorObj = null,
			gui = null,
			span = null;

		point = document.createElement("div");
		point.className = "timeline-graph-line-point";
		point.style.left = _this.graduationItemWidth  * (_this.num - data.time) + "px";
		point.style.width = _this.graduationItemWidth + "px";
		point.setAttribute("time", data.time);

		if(data.level){
			colorObj = graph.utils.getLevelColor(data.level);
			point.style.backgroundColor = colorObj.bg;
		}

		if(data.title){
			point.title = data.title;
		}

		point.onclick = function(){
			if(_this.options.clickedPoint){
				if(lastClickedObj){
					$(lastClickedObj).removeClass("ok");
				}
				lastClickedObj = this;
				$(this).addClass("ok");
				_this.options.clickedPoint(data.data, data.time);

				if(data.time === 0){
					$(_this.timeLabelContainer).show().html("实时");
				}else{
					gui = $(_this.graduationsContainer).find("*[data-num="+data.time+"]");
					$(_this.timeLabelContainer).show().html(gui.attr("time"));
				}
			}
		};

		_this.pointsContainer.appendChild(point);
		_this.points.push(point);
	};

	//createPoint({time: 0, level: 6});
	_this.timeData.each(function(){
		createPoint(this);
	});
};