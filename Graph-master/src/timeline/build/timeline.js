/** 
 * -------------------------------------------------------------
 * Copyright (c) 2013 timeline, All rights reserved. 
 *  
 * @version: 0.0.0 
 * @author: mail@lizhong.me 
 * @description: timeline 
 * @project: timeline 
 * @date: 2014-10-08 
 * -------------------------------------------------------------
 */ 

(function(window, undefined){ 

"use strict";

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

Timeline.fn.getTimeDate = function(ids){
	var _this = this,
		i = 0,
		ii = 0,
		levels = [],
		num = 0,
		data = [],
		times = {},
		time = 0,
		randint = null,
		result = null,
		o = null,
		test = null,
		obj = null;

	/*
	randint = graph.utils.randint;
	levels = [
		{alarm:1, msg: "有告警数据"},
		{alarm:2, msg: "有异常信息"},
		{alarm:3, msg: "30条业务受影响"},
		{alarm:4, msg: ""},
		{alarm:6, msg: "正常运行中"}
	];

	num = randint(10, 20);

	for(i=0; i<num; i++){
		do{
			time = randint(1, 30) * 5;
		}while(times[time]);
		times[time] = true;
		o = levels[randint(1, levels.length-1)];
		data.push({
			time: time,
			level: o.alarm,
			title: o.msg
		});

	}

	_this.timeData = data;

	for(i=0; i<_this.timeData.length; i++){
		obj = {};
		for(ii=0; ii<_this.options.ids.length; ii++){
			obj[_this.options.ids[ii]] = {
				execpt: graph.utils.randint(1, 10),
				monitor: graph.utils.randint(1, 10),
				alarm: graph.utils.randint(1, 10),
				alarmLevel: graph.utils.randint(1, 5),
				execptLevel: graph.utils.randint(1, 5),
				detail: [
					["关键集成点", "数据量-预警", "运行时间-预警" ,"数据质量", "最新运行状态", "更多"],
					["TableA 到 tableB",1, 0, 1, "SUCCESS", '<a href="#">更多</a>', 2],
					["TableB 到 tableD",0, 0, 0, "RUNNING", '<a href="#">更多</a>', 3],
					["TableE 到 tableF",0, 2, 0, "FAILED", '<a href="#">更多</a>', 6],
				]
			};
		}
		_this.timeData[i].data = obj;
	}
	*/

	test = function(){
		_this.timeData.each(function(){
			for(i=0; i<_this.options.ids; i++){
				if(!this.data[_this.options.ids[i]]){
					this.data[_this.options.ids[i]] = {
						execpt: 0,
						monitor: 0,
						alarm: 0,
						alarmLevel: 0,
						execptLevel: 0,
						detail: [
							["关键集成点", "数据量-预警", "运行时间-预警" ,"数据质量", "最新运行状态", "更多"]
						]
					};
				}
			}
		});
	};

	//result = graph.api.getHistoryEvent(_this.options.ids, _this.options.viewid);
	result = graph.api.queryEventPerfByCurrent(_this.options.ids, 1000*60*5*30, 30);

	if(graph.utils.isTrueRet(result)){
		for(i=0; i<result.data.length; i++){
			result.data[i].time = result.data[i].time * 5;
		}
		_this.timeData = result.data;
		// test();
	}else{
		_this.timeData = [];
	}
};

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

Timeline.fn.onload = function(){
	var _this = this;
	if(_this.options.onload){
		_this.options.onload();
	}
};

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

Timeline.fn.remove = function(){
	var _this = this;

	_this.stopUpdateInterval();
	$(_this.mainElement).remove();
};

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

Timeline.fn.stopUpdateInterval = function(){
	var _this = this;

	window.clearInterval(_this.oUpdateInterval);
	_this.oUpdateInterval = null;
};

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

window.Timeline = Timeline;

})( window );