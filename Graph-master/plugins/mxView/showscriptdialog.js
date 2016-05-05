/**
 * Created by leiting on 14/9/2.
 */
(function(self){
    var self = self;
    var showScriptDialog = function (container,bizdata) {
        var html = "",
            main = null,
            head = null,
            cpuontime = null,
            cpuhistory = null,
            montime = null,
            mhistory = null,
            scriptdatas = null,
            pieinstance = null,
            id = "";

        $(".udbk_dialog_script").remove();

        id =  graph.utils.randstr();
        scriptdatas = bizdata;
        var ciip = scriptdatas.ciip;
        var sclist = scriptdatas.data;
        var totalRate = scriptdatas.totalrate;

        Handlebars.registerHelper('scriptstatus', function (i) {
            if(i == "0"){
                return "udbk_script_nostart";
            }
            if(i == "1"){
                return "udbk_script_runing";
            }
            if(i == "2"){
                return "udbk_script_success";
            }
            if(i == "3"){
                return "udbk_script_error";
            }
        });
        Handlebars.registerHelper('scripticon', function (i) {
            if(i == "0"){
                return "";
            }
            if(i == "1"){
                return "○";
            }
            if(i == "2"){
                return "✓";
            }
            if(i == "3"){
                return "×";
            }
        });
        Handlebars.registerHelper('scriptISend', function (i,s,e,ec) {
            if(i == "2"){
                return new Handlebars.SafeString("<div class='udbk_script_success' style='font-size: 9px;clear: left;'>开始时间:" + s + "结束时间:" + e + "执行时长:" + ec + "秒</div>");
            }
            if(i == "3"){
                return new Handlebars.SafeString("<div class='udbk_script_error' style='font-size: 9px;clear: left;'>开始时间:" + s + "结束时间:" + e + "执行时长:" + ec + "秒</div>");
            }
        });
        html = graph.utils.render("share/dashboard-scriptdialog.html", {
            id : id,
            ciip: ciip,
            sclist: sclist
        });
        if(html){
            $(container).append(html);

            main = $("#" + id);
            head = main.find(".udbk_head").children("div")[0];
            main.find(".udbk_closed").click(function(){
                main.remove();
            });



            dropElement(container, main[0], head);
            if(!pieinstance){

                pieinstance = chart.chartInstance.createScriptchart(totalRate,"scriptdashboard");
            }else{
                pieinstance.update(totalRate);
            }

        }
    };

    self.showScriptDialog = showScriptDialog;
})(window);