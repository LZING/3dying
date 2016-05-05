/**
 * Created by leiting on 14/8/19.
 */
/***
 * 实例化图表和图表数据获取
 */
(function (self) {
    /***
     * !!!该类以后需要删除，暂时供从左边拖动仪表盘到右侧提供临时数据使用
     * 创建临时仪表盘，因为每次页面加载时，仪表盘都需要实时加载，页面退出后即销毁
     * @param charttype 图表类型
     * @param chartrender 图表的画布id
     * @param width 图表的宽度
     * @param height 图表的高度
     * @param cds 图表所需要的数据源
     * @param cdi 图表的刷新时间间隔
     */

    self.createTempChart = function (charttype,chartrender,width,height,chartTitle,isxAsix,isyAsix,xAxistitle,yAxistitle,offset,cds,cdi,ptextcolor,titlecolor) {

        /***
         * 创建环形图
         */
        var createTempPieprocess = function () {
            var dataset  = [22];
            var interval = 1000;
            var failVal = 100-dataset[0];
            dataset.push(failVal);

            /*if(cds != "default" && cds != ""){
                dataset = self[cds];
            }
            if(cdi != "default" && cdi != ""){
                interval = parseInt(cdi);
            }*/

            var piegram = new upiep();
            piegram.setCircle(false);//是否生成圆环
            piegram.bindData(dataset);
            piegram.setType(0);
            piegram.setTitleColor(titlecolor);
            piegram.setTitle(chartTitle);
            piegram.setSize(width,height);
            piegram.setIcon(false);
            if(ptextcolor){
                piegram.setProcessTextColor(ptextcolor);
            }
            piegram.createRender("id",chartrender);
            piegram.draw();
            if(cds != "default" && cds != ""){

                setInterval(function () {

                    piegram.update(self[cds]);
                },interval);
            }


        };

        /***
         * 创建柱状图
         */
        var createTempBar = function () {
            var dataset = [{
                "name":"北京",
                "value":5
            },{
                "name":"上海",
                "value":10
            },{
                "name":"广州",
                "value":13
            },{
                "name":"深圳",
                "value":19
            },{
                "name":"厦门",
                "value":21
            }];
            var interval = 2000;


            /*if(cds != "default" && cds != ""){
                dataset = self[cds];
            }
            if(cdi != "default" && cdi != ""){
                interval = parseInt(cdi);
            }*/

            var histgram2 = new ubarb();
            histgram2.bindData(dataset);
            histgram2.setType(0);
            histgram2.setSize(width,height);
            histgram2.setTitleColor(titlecolor);
            histgram2.setTitle(chartTitle);
            histgram2.isxAsix(isxAsix);
            histgram2.isyAsix(isyAsix);
            if(isyAsix){

                histgram2.setyAxistitle(yAxistitle);
            }
            if(isxAsix){

                histgram2.setxAxistitle(xAxistitle)
            }
            histgram2.createRender("id",chartrender);
            histgram2.draw();

            if(cds != "default" && cds != ""){

                setInterval(function () {
                    histgram2.update(self[cds]);
                },interval);
            }
        };

        var createTempLine = function () {
            var data2 = [{
                "name":"北京",
                "values":[{
                    "date":"2011-10-01 12:48:01",
                    "value":23.1
                },{
                    "date":"2011-10-01 12:48:02",
                    "value":24.1
                },{
                    "date":"2011-10-01 12:48:03",
                    "value":43.3
                },{
                    "date":"2011-10-01 12:48:04",
                    "value":23.5
                },{
                    "date":"2011-10-01 12:48:05",
                    "value":45.1
                },{
                    "date":"2011-10-01 12:48:06",
                    "value":27.1
                },{
                    "date":"2011-10-01 12:48:07",
                    "value":42.1
                },{
                    "date":"2011-10-01 12:48:08",
                    "value":26.1
                },{
                    "date":"2011-10-01 12:48:09",
                    "value":23.1
                },{
                    "date":"2011-10-01 12:48:10",
                    "value":24.1
                },{
                    "date":"2011-10-01 12:48:11",
                    "value":43.3
                },{
                    "date":"2011-10-01 12:48:12",
                    "value":23.5
                },{
                    "date":"2011-10-01 12:48:13",
                    "value":45.1
                },{
                    "date":"2011-10-01 12:48:14",
                    "value":27.1
                },{
                    "date":"2011-10-01 12:48:15",
                    "value":42.1
                },{
                    "date":"2011-10-01 12:48:16",
                    "value":26.1
                }]
            }];

            var interval = 1000;


            var barline2 = new uline();
            barline2.bindData(data2);
            barline2.setType(0);
            barline2.setSize(width,height);
            barline2.setyTicks(5);
            barline2.setTitle(chartTitle);
            barline2.setTitleColor(titlecolor);
            barline2.setAxisStyle("h_axis_white");
            barline2.setYfixed(0,100);
            barline2.setLinecategory("basis");
            barline2.setxAxistitle("");
            barline2.setyAxistitle("利用率");
            barline2.createRender("id",chartrender);
            barline2.draw();

            setInterval(function () {
                barline2.updateLine(self[cds]);
            },interval);

        };

        var createTempArea = function () {
            alert("创建面积图");
        };

        switch(charttype){
            case 1:
                createTempPieprocess();
                break;
            case 2:
                createTempBar();
                break;
            case 3:
                createTempLine();
                break;
            case 4:
                createTempArea();
                break;
            default :
                createTempPieprocess();
                break;
        }
    };

    /***
     * 创建随机的实时数据模拟
     */
    var createSamplChartDataset = function () {

        setInterval(function () {
            //随机生成柱状图的数据
            var tempbardataset = [];
            for(var i = 0 ; i < 5 ; i++){
                var tempsub = {
                    name : "IBM",
                    value: Math.floor(Math.random() * 150)
                };
                switch (i){
                    case 0:
                        tempsub.name = "网银";
                        break;
                    case 1:
                        tempsub.name = "前置";
                        break;
                    case 2:
                        tempsub.name = "核心";
                        break;
                    case 3:
                        tempsub.name = "接口";
                        break;
                    case 4:
                        tempsub.name = "离岸";
                        break;
                }
                tempbardataset.push(tempsub);
            }

            //随机生成环状图的数据
            var temppiepdataset = [];
            var temppiepsub1 = Math.floor(Math.random() * 100);
            var temppiepsub2 = 100 - temppiepsub1;
            temppiepdataset.push(temppiepsub1);
            temppiepdataset.push(temppiepsub2);

            (function (){

                var templinedata = [];
                var newobj = {"name":"上海",values:[]};
                for(var i = 1 ; i < 60 ; i++){
                    var obj = {};
                    obj.value = Math.floor(Math.random() * 47);
                    obj.date = "2011-10-01 12:48:"+i;
                    newobj.values.push(obj);
                }
                templinedata[0] = newobj;
                self.intervalLinedataset = templinedata;
            })();
            (function (){

                var templinedata = [];
                var newobj = {"name":"上海",values:[]};
                for(var i = 1 ; i < 60 ; i++){
                    var obj = {};
                    obj.value = Math.floor(Math.random() * 47);
                    obj.date = "2011-10-01 12:48:"+i;
                    newobj.values.push(obj);
                }
                templinedata[0] = newobj;
                self.intervalLine1dataset = templinedata;
            })();


            self.intervalBarDataset = tempbardataset;
            self.intervalPiePdataset = temppiepdataset;

        },100);

    };
    createSamplChartDataset();

    self.createDashboardchart = function (charttype,chartrender,width,height,chartTitle,isxAsix,isyAsix,xAxistitle,yAxistitle,offset,biz,cdi,ptextcolor,titlecolor,ciid, timeobj){

	    Date.prototype.format =function(format)
	    {
		    var o = {
			    "M+" : this.getMonth()+1, //month
			    "d+" : this.getDate(), //day
			    "h+" : this.getHours(), //hour
			    "m+" : this.getMinutes(), //minute
			    "s+" : this.getSeconds(), //second
			    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
			    "S" : this.getMilliseconds() //millisecond
		    }
		    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
			    (this.getFullYear()+"").substr(4- RegExp.$1.length));
		    for(var k in o)if(new RegExp("("+ k +")").test(format))
			    format = format.replace(RegExp.$1,
					    RegExp.$1.length==1? o[k] :
					    ("00"+ o[k]).substr((""+ o[k]).length));
		    return format;
	    };

        //获取实时kpi数据
        var getkpicdata = function(biz,obj,ciid){
            var kpi = [];
            if(biz == "cpuc"){
                kpi = ["cpu_util"];
            }
            if(biz == "memc"){
                kpi = ["mem_util"];
            }
            if(ciid && /ci/.test(ciid[0])){

	            var subciid = ciid[0].substr(3);
	            var startTimeTemp = new Date((new Date(timeobj.endTime).getTime()-6*3600*1000)).format('yyyy-M-dd hh:mm:ss');
	            var data = mmdb.eventPerf.queryPerfByHistory(subciid,kpi,startTimeTemp,timeobj.endTime);
	            var temparray = [];
	            var rawdata = data.data[0].valc.val;
	            var tempdata = 100 - rawdata;
	            temparray.push(rawdata);
	            temparray.push(tempdata);
	            obj.update(temparray);
            }
        };

        //获取历史kpi数据
        var getkpihdata = function(biz,obj,ciid){
            var kpi = "";
            if(biz == "cpuh"){
                kpi = ["cpu_util"];
            }
            if(biz == "memh"){
                kpi = ["mem_util"];
            }
            if(ciid && /ci/.test(ciid)){

	            var subciid = ciid[0].substr(3);
	            var startTimeTemp = new Date((new Date(timeobj.endTime).getTime()-6*3600*1000)).format('yyyy-M-dd hh:mm:ss');
	            var data = mmdb.eventPerf.queryPerfByHistory(subciid,kpi,startTimeTemp,timeobj.endTime);
	            var rawdata = data.data;
	            obj.updateLine(rawdata);

               /* kpiBuz.getKpiByCi(kpi,"2014-08-27 20:17:59","2014-08-27 20:21:39",ciid,function(data) {

                    var rawdata = data.data;
                    obj.updateLine(rawdata);
                });*/
            }
        };

        /***
         * 创建环形图
         */
        var createTempPieprocess = function () {
            var dataset  = [22];
            var interval = 1000;
            var failVal = 100-dataset[0];
            dataset.push(failVal);

            /*if(biz != "default" && biz != ""){
             dataset = self[biz];
             }*/
             if(cdi != "default" && cdi != ""){
             interval = parseInt(cdi);
             }

            var piegram = new upiep();
            piegram.setCircle(false);//是否生成圆环
            piegram.bindData(dataset);
            piegram.setType(0);
            piegram.setTitleColor(titlecolor);
            piegram.setTitle(chartTitle);
            piegram.setSize(width,height);
            piegram.setIcon(false);
            if(ptextcolor){
                piegram.setProcessTextColor(ptextcolor);
            }
            piegram.createRender("id",chartrender);
            piegram.draw();
            if(biz != "default" && biz != "" && typeof biz === "string"){

                setInterval(function () {

                    if(ciid && /ci/.test(ciid)){
                        getkpicdata(biz,piegram,ciid);
                    }
                },interval);
            }


        };


        var createTempLine = function () {
            var data2 = [{
                "name":"北京",
                "vals":[{
                    "time":"2011-10-01 12:48:01",
                    "val":23.1
                },{
                    "time":"2011-10-01 12:48:02",
                    "val":24.1
                },{
                    "time":"2011-10-01 12:48:03",
                    "val":43.3
                },{
                    "time":"2011-10-01 12:48:04",
                    "val":23.5
                },{
                    "time":"2011-10-01 12:48:05",
                    "val":45.1
                },{
                    "time":"2011-10-01 12:48:06",
                    "val":27.1
                },{
                    "time":"2011-10-01 12:48:07",
                    "val":42.1
                },{
                    "time":"2011-10-01 12:48:08",
                    "val":26.1
                },{
                    "time":"2011-10-01 12:48:09",
                    "val":23.1
                },{
                    "time":"2011-10-01 12:48:10",
                    "val":24.1
                },{
                    "time":"2011-10-01 12:48:11",
                    "val":43.3
                },{
                    "time":"2011-10-01 12:48:12",
                    "val":23.5
                },{
                    "time":"2011-10-01 12:48:13",
                    "val":45.1
                },{
                    "time":"2011-10-01 12:48:14",
                    "val":27.1
                },{
                    "time":"2011-10-01 12:48:15",
                    "val":42.1
                },{
                    "time":"2011-10-01 12:48:16",
                    "val":26.1
                }]
            }];

            var interval = 1000;

            if(cdi != "default" && cdi != ""){
                interval = parseInt(cdi);
            }


            var barline2 = new uline();
            barline2.bindData(data2);
            barline2.setType(0);
            barline2.setSize(width,height);
            barline2.setyTicks(5);
            barline2.setTitle(chartTitle);
            barline2.setTitleColor(titlecolor);
            barline2.setAxisStyle("h_axis_white");
            barline2.setYfixed(0,100);
            barline2.setLinecategory("basis");
            barline2.setxAxistitle("");
            barline2.setyAxistitle("利用率");
            barline2.createRender("id",chartrender);
            barline2.draw();

            getkpihdata(biz,barline2,ciid);
            /*setInterval(function () {
             },interval);*/

        };


        switch(charttype){
            case 1:
                createTempPieprocess();
                break;
            case 2:
                //createTempBar();
                break;
            case 3:
                createTempLine();
                break;
            case 4:
                //createTempArea();
                break;
            default :
                createTempPieprocess();
                break;
        }

    }

    self.createScriptchart = function (d,c) {
        var dataset = [0,100];
        var piegram = new upiep();
        piegram.setCircle(false);//是否生成圆环
        piegram.bindData(dataset);
        piegram.setType(0);
        piegram.setTitleColor("#ffffee");
        piegram.setTitle("切换总进度");
        piegram.setSize(300,300);
        piegram.setIcon(false);
        piegram.setProcessTextColor("#ffffee");
        piegram.createRender("id",c);
        piegram.draw();
        piegram.update(d);
        return piegram;
    };

})(nameSpace.reg("chart.chartInstance"));