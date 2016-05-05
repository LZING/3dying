
(function(self){
	
	var msg = null,
		randInt = null,
		randomsort = null;
		
	
	msg = [
		{
			level:1,
			time:"发生时间:11/18/2013 14:03:00",
			info: "开放系统应用支持部:柜面及理财产品群组:员工渠道整合平台::by12ygqggap2001的MEMORY Linux服务器内存利用率高,当前值为:85.22,告警阈值为:[85 - 100]"
		},
		{
			level:2,
			time:"发生时间:11/18/2013 14:04:00",
			info: "开放系统应用支持部:信息总线群组:用户认证:业务成功率异常:[用户认证]子系统AP视图[by10aqzzwap2001]业务成功率(BUS_SUCC_RATE)异常, 当前值为68, 告警范围[50, 70)"
		},
		{
			level:3,
			time:"发生时间:11/18/2013 14:04:00",
			info: "开放系统应用支持部:信息总线群组:用户认证:业务成功率异常:[用户认证]子系统AP视图[by10aqzzwap2001]业务成功率(BUS_SUCC_RATE)异常, 当前值为68, 告警范围[50, 70)"
		},
		{
			level:4,
			time:"发生时间:11/18/2013 13:58:54",
			info: "开放系统应用支持部:信息总线群组:企业服务总线::by14fwzmlap1001的AdminServer Weblogic中间件JVM使用的Heap空间异常,当前值为:93.14,告警阈值为:[90 - 100]"
		},
		{
			level:5,
			time:"发生时间:11/18/2013 13:59:41",
			info: "开放系统应用支持部:公司及机构系统群组:企业现金::by18qyxzdap2001的tcp_10001_ESTABLISHED 端口连接数异常,当前值为:0.00,告警阈值为:[0 - 0]"
		},
		{
			level:1,
			time:"发生时间:11/18/2013 14:06:43",
			info: "开放系统应用支持部:企业级数据应用群组:数据集成平台::by19rdws2db1001 表空间:RDWSVPD11@RDWSVPD11_DAT_P12XJGL,当前值为:1.00,告警阈值为:[1 - 1]"
		},
		{
			level:2,
			time:"发生时间:11/18/2013 13:44:34",
			info: "开放系统应用支持部:公司及机构系统群组:企业现金::by18qyxzdap1001的日志文件:/home/ap/cmswls/domains/cmsDomain/cmslogs/mSrv1/cms-all-app.log 匹配到1次错误关键字"
		},
		{
			level:3,
			time:"发生时间:11/18/2013 11:48:00",
			info: "开放系统应用支持部:柜面及理财产品群组:员工渠道整合平台::by12ygqglwb2001的MEMORY Linux服务器内存利用率高,当前值为:85.00,告警阈值为:[85 - 100]"
		},
		{
			level:4,
			time:"发生时间:11/18/2013 09:40:48",
			info: "开放系统应用支持部:信息总线群组:外连服务总线::by15fwzdlwb2001<11.168.192.2>:端口状态异常,端口为:21150,发生时间:11/18/2013 11:11:24"
		},
		{
			level:5,
			time:"发生时间:11/18/2013 09:45:48",
			info: "开放系统应用支持部:信息总线群组:外连服务总线::by15fwzdlwb2001<11.168.192.2>:端口状态异常,端口为:21150,发生时间:11/18/2013 11:11:24"
		}
	];
	
	self.randMonitor = function(graph){
		var cells = null,
			loop = null,
			div = null,
			btn = null,
			time = null,
			imageLevel = null,
			delOverlay = null,
			addOverlay = null,
			createOverlay = null,
			update = null;
			
		cells = graph.getChildVertices();
		loop = null;
		div = document.createElement("div");
		div.className = "info";
		div.style.cssText = [
			"width : 150px",
			"height : 30px",
			"position: absolute",
			"top:10px",
			"right:10px"
		].join(";");
		btn = document.createElement("input");
		btn.type = "button";
		btn.value = "update";

		time = document.createElement("input");
		time.type = "text";
		time.value = "1";
		time.style.width = "50px";
		
		div.appendChild(time);
		div.appendChild(btn);
		document.body.appendChild(div);
		
		btn.onclick = function(){
			if(loop){
				window.clearInterval(loop);
				loop = null;
			}
			
			update();
			loop = window.setInterval(update, time.value * 1000);		
		};
		
		imageLevel = {
			"1" : { ico : "images/alert/1.png" },
			"2" : { ico : "images/alert/2.png" },
			"3" : { ico : "images/alert/3.png" },
			"4" : { ico : "images/alert/4.png" },
			"5" : { ico : "images/alert/5.png" }
		};
		
		// 移出报警
		delOverlay = function(cell){

			// 获取ID单元
			//var cell = graph.getModel().getCell(id);	

			// 移除告警
			graph.removeCellOverlays(cell);
		};

		// 给物体添加报警
		addOverlay = function(cell, state, level){
			graph.addCellOverlay(
				cell,
				createOverlay({
					src: imageLevel[level].ico, 
					width:16,
					height:16
				},
				'state: '+state)
			);
		};

		// 创建告警信息
		createOverlay = function(image, tooltip){

			var overlay = new mxCellOverlay(image, tooltip);

			overlay.addListener(mxEvent.CLICK, function(sender, evt){
				mxUtils.alert(tooltip);
			});
			
			return overlay;
		};	
		
		update = function(){
			
			for(i=0; i<cells.length; i++){
				delOverlay(cells[i]);
			}
			
			if(cells.length > 10){
				cells.sort(randomsort);
				var min = Math.floor(cells.length / 3);
				var max =  Math.floor(cells.length / 2);
				
			}else{
				var min = 1;
				var max = cells.length;
			}
			
			var to = randInt(min, max);
			
			var i, k, tip;
			for(i=0; i<to; i++){
				tip = msg[randInt(0, msg.length-1)];
				addOverlay(
					cells[i],
					[tip.info, tip.time].join(" | "),
					tip.level
				);
			}

		};
	};
	
	randInt = function(n, m){
		var c = m-n+1;
		var num = Math.random() * c + n;
		return	Math.floor(num);
	};
	
	randomsort = function(a, b) {
		return Math.random()>0.5 ? -1 : 1;
	};
	
})(graph);
