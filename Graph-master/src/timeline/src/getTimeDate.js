
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