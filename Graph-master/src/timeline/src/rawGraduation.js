
Timeline.fn.rawGraduation = function(){
	var _this = this,
		draw = null,
		lineWidth = null,
		itemWidth = null,
		getLabel = null,
		splitNum = 5,
		nowTime = (new Date()).getTime(),
		i = 0;

	_this.nowTime = nowTime;
	getLabel = function(num){
		var reValue = "",
			currTime = null,
			minu = 0,
			now = null;

		if(num === 0){
			reValue = "实时";
		}else{
			currTime = new Date(nowTime - num * 60000);
			minu = currTime.getMinutes();

			reValue = [
				currTime.getHours(),
				minu >= 10 ? minu : 0 + "" + minu
			].join(":");
		}

		return reValue;
	};

	draw = function(width, vWidth, num){
		var item = null,
			v = null,
			pos = null,
			label = null,
			timeValue = null,
			span = null;

		timeValue = getLabel(num);
		item = document.createElement("div");
		item.className = "timeline-graph-line-graduations-item";
		item.style.width = width + "px";
		item.style.left = width * (_this.num - num) + "px";
		item.setAttribute("data-num", num);
		item.setAttribute("time", timeValue);

		v = document.createElement("div");
		v.className = "timeline-graph-line-graduations-item-v";
		v.style.width = vWidth + "px";
		item.appendChild(v);

		_this.graduationsContainer.appendChild(item);
		_this.graduationItems.push(item);

		if(vWidth === 2){
			label = document.createElement("div");
			label.className = "timeline-graph-line-graduations-label";
			label.setAttribute("data-num", num);
			label.innerHTML = timeValue;
			pos = $(item).position();
			label.style.width = width * 5 + "px";
			label.style.left = (pos.left - width * 2) + "px";
			_this.labelsContainer.appendChild(label);
			_this.labelItems.push(label);
		}
	};

	lineWidth = $(_this.lineGraphContainer).width();
	itemWidth = (lineWidth - _this.graduationSpaceWidth)/_this.num;
	_this.graduationItemWidth = itemWidth;

	for(i=_this.num; i>=0; i--){
		if(i==0 || i%splitNum == 0){
			draw(itemWidth, 2, i);
		}else{
			draw(itemWidth, 1, i);
		}
	}
};