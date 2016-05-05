/**
 * Created by leiting on 14/8/22.
 */
(function(self){
    var showDashboard = function (container, ciid, timeobj) {
        var html = "",
            main = null,
            head = null,
            cpuontime = null,
            cpuhistory = null,
            montime = null,
            mhistory = null,
            id = "";

        $(".udbk_dialog").remove();

        id =  graph.utils.randstr();

        html = graph.utils.render("share/dashboard-kpidialog.html", {
            id : id
        });
        if(html){
            $(container).append(html);

            main = $("#" + id);
            main.find(".udbk_closed").click(function(){
                main.remove();
            });

            head = main.find(".udbk_head").children("div")[0];
            cpuontime = main.find("#cpuontime");
            cpuhistory = main.find("#cpuhistory");
            montime = main.find("#montime");
            mhistory = main.find("#mhistory");

            //绑定模拟数据
            initChart("cpuontime",1,"CPU实时利用率","cpuc",ciid, timeobj);
            initChart("cpuhistory",3,"CPU利用率趋势图","cpuh",ciid, timeobj);
            initChart("montime",1,"内存实时利用率","memc",ciid, timeobj);
            initChart("mhistory",3,"内存利用率趋势图","memh",ciid, timeobj);

            /**
             * 给cpu按钮绑定点击事件
             */
            main.find("#udbk_cpu").click(function () {
                $(this).addClass("udbk_func_active");
                $("#udbk_memory").removeClass("udbk_func_active");

                //显示cpu画布，隐藏内存画布
                $("#mcontainer").slideUp();
                $("#cpucontainer").slideDown();
            });

            /**
             * 给内存按钮绑定点击事件
             */
            main.find("#udbk_memory").click(function () {
                $(this).addClass("udbk_func_active");
                $("#udbk_cpu").removeClass("udbk_func_active");

                //显示内存画布，隐藏cpu画布
                $("#cpucontainer").slideUp();
                $("#mcontainer").slideDown();
            });

            dropElement(container, main[0], head);


        }
    };

    var initChart = function(container,type,title,biz,ciid, timeobj){
        if(biz == "cpuc"){

            chart.chartInstance.createDashboardchart(type,container,300,200,title,true,true,"","",0,biz,10000,"#ffffee","#ffffee",ciid, timeobj);

        }
        if(biz == "memc"){

            chart.chartInstance.createDashboardchart(type,container,300,200,title,true,true,"","",0,biz,10000,"#ffffee","#ffffee",ciid, timeobj);

        }
        if(biz == "cpuh"){

            chart.chartInstance.createDashboardchart(type,container,300,200,title,true,true,"","",0,biz,10000,"","#ffffee",ciid, timeobj);

        }
        if(biz == "memh"){

            chart.chartInstance.createDashboardchart(type,container,300,200,title,true,true,"","",0,biz,10000,"","#ffffee",ciid, timeobj);

        }
    };

    graph.showDashboard = showDashboard;
})(graph);