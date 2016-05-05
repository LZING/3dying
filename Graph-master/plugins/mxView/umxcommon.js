/**
 * Created by leiting on 14/8/26.
 */
/***
 * 创建mxGraph展示视图基础类
 * 在该文件引用前，页面必须先引用mxClient.js文件
 */
(function(arg){

    var self = arg;

    self.umxcommon = function () {
        //document宽度，用于构建mxEditor的宽度
        this.w = null;
        //document高度，用于构建mxEditor的高度
        this.h = null;
        //视图画布，同一页面只能存在一个画布
        this.viewRender = null;
        //小画板
        this.outLineRender = null;
        //小画板示例
        this.outLineInstance = null;
        //视图的画布编辑器
        this.editor = null;
    };

    //创建原型链
    var UMX = self.umxcommon.prototype;

    UMX.getWH = function () {

        if(window.innerHeight && window.innerWidth){
            this.w = window.innerWidth;
            this.h = window.innerHeight;
        }else{
            this.w = document.body.scrollWidth;
            this.h = document.body.scrollHeight;
        }
    };

    /***
     * 生成整个画布
     */
    UMX.drawRender = function () {

        var _this = this;
        this.getWH();
        var viewRender = document.createElement("div");
        viewRender.style.width = this.w + "px";
        viewRender.style.height = this.h + "px";
        viewRender.style.margin = "0px";
        viewRender.style.padding = "0px";
        //viewRender.style.backgroundImage = "url(images/mxView/bg.png)";
        viewRender.style.backgroundColor = "#222";
        viewRender.id = "viewRender";
        document.body.appendChild(viewRender);
        this.viewRender = viewRender;

        //创建小画板
        this.drawOutline();

        //创建更换皮肤区域
        this.createThemePanel();
        var eventPool = getumxEventInstance();
        //给画布增加更改主题的监听事件
        eventPool.addListener("changetheme", this.changeTheme);
        eventPool.addListener("biztras", this.runTration);
        eventPool.addListener("bizscript", this.runHAMAScript);

        //初始化editor

        this.initEditor(viewRender);
        this.openView();
    };

    /***
     * 生成小画板
     */
    UMX.drawOutline = function () {
        this.outLineInstance = new umxoutline();
        this.outLineInstance.createOutline();

    };

    /***
     * 更新画布
     */
    UMX.updateRender = function () {
        this.getWH();
        this.viewRender.style.width = this.w + "px";
        this.viewRender.style.height = this.h + "px";
    };

    /***
     * 初始化editor画布
     * @param r
     */
    UMX.initEditor = function (r) {
        var _this = this;
        if(r){
            this.editor = new Editor();
            this.editor.graph.init(r);
        }

        //初始化editor中的graph画布
        (function(graph){

            var config = null,
                modelGetStyle = null,
                editor = null;

            modelGetStyle = graph.model.getStyle;

            // 快捷键
            config = mxUtils.load(STENCIL_PATH + '/keyhandler-commons.xml').getDocumentElement();
            editor = new mxEditor(config);
            editor.graph = graph;


            // Maintains swimlanes and installs autolayout
            editor.createSwimlaneManager(graph);
            editor.createLayoutManager(graph);
            editor.graph.setEnabled(false);
            editor.graph.setConnectable(false);
            editor.graph.setDropEnabled(false);
            editor.graph.setAutoSizeCells(true);


            // Add push
            editor.keyHandler.handler.enabled = false;
            graph.keyHandler = editor.keyHandler;

            graph.model.getStyle = function(cell){
                if (cell != null){
                    var style = modelGetStyle.apply(this, arguments);

                    if (this.isCollapsed(cell)){
                        //style = style + ';image;image=vg.svg;';
                        cell.geometry.height = 80;
                        style = style + ';shape=image;image=../resource/svg/CI.svg;verticalLabelPosition=bottom;verticalAlign=top;';

                        // Creates a new overlay with an image and a tooltip
                        var overlay = new mxCellOverlay(new mxImage('images/group.png', 16, 16));

                        // Installs a handler for clicks on the overlay
                        overlay.addListener(mxEvent.CLICK, function(sender, evt){
                            var cell = evt.getProperty('cell');
                            cell.setCollapsed(false);
                            cell.setGeometry(new mxGeometry(
                                cell.geometry.x,
                                cell.geometry.y,
                                cell.geometry.alternateBounds.width,
                                cell.geometry.alternateBounds.height
                            ));

                            graph.removeCellOverlays(cell);
                            graph.refresh(cell);
                            cell.geometry.alternateBounds = new mxRectangle(0, 0, 80, 80);
                            graph.clearSelection();
                            graph.selectionModel.setCell(cell);
                        });

                        graph.addCellOverlay(cell, overlay);
                    }
                    return style;
                }
                return null;
            };

            /***
             * 每个CI的cell鼠标手型
             * @param cell
             * @returns {*}
             */
            graph.getCursorForCell = function(cell){
                var result = null;

                result = mxGraph.prototype.getCursorForCell.apply(this, arguments);
                if((cell && cell.id.indexOf("ci_") >= 0)){
                    result = "pointer";
                }

                return result;
            };

        })(this.editor.graph);

        this.editor.zoomLock = false;
        this.editor.graph.setTooltips(false);
        this.editor.graph.refresh();
        this.editor.graph.container.focus();

        /***
         * 鼠标滚轮放大缩小画布
         */
        $(r).mousewheel(function(event, delta) {
            if(!_this.editor.zoomLock){
                if(delta>0){
                    _this.editor.graph.zoom(1.1);
                    _this.initChart();
                    //执行切换动作
                    _this.runTration();
                }else{
                    _this.editor.graph.zoom(0.9);
                    _this.initChart();
                    //执行切换动作
                    _this.runTration();
                }
            }
        });

        /***
         * 初始化小画板
         */
        if(this.outLineInstance.outLineRender){
            this.editor.outline.init(this.outLineInstance.outLineRender);
            this.outLineInstance.outLineRender.style.display = "none";
        }
    };

    /***
     * 加载模拟数据
     * @param data
     */
    UMX.openView = function (data) {
        /***
         * 获取url参数，此处path0901临时使用,这里的实例id是10548
         * @param name
         * @returns {*}
         */
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }


        var result = mmdb.view.information.getByNeoId(parseInt(getQueryString("viewid")) || 10548);
        if(graph.utils.isTrueRet(result)){
            graph.utils.openXml(this.editor, result.data.xml);
        }else{
            graph.utils.alert(result.message);
        }

        this.editor.graph.zoomToCenter();

        //初始化图表
        this.initChart();

        //初始化mxCell的点击事件
        this.initmxEvent();

        //执行切换动作
        //this.runTration();
    };

    /***
     * 更换皮肤
     */
    UMX.changeTheme = function () {
        var args = arguments;
        var cells = this.editor.graph.getDepCells();
        if(args[1]){
            if(args[1] == "black"){
                //this.viewRender.style.backgroundImage = "url(images/mxView/bg.png)";
                this.viewRender.style.backgroundColor = "#222";
                for(var i = 0 ; i < cells.length ; i++){
                    var cellid = cells[i].getId();
                    var cellstyle = this.editor.graph.getCellStyle(cells[i]);
                    if(!/chart/.test(cellid) && !/label/.test(cellstyle.shape)){

                        this.editor.graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, "none", [cells[i]]);
                        this.editor.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, "#bbb", [cells[i]]);
                        this.editor.graph.setCellStyles(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, "none", [cells[i]]);
                        this.editor.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, "#bbb", [cells[i]]);
                    }
                    if(!/chart/.test(cellid) && /label/.test(cellstyle.shape)){
                        //cells[i].setStyle("html=1;strokeColor=none;");
                    }
                    if(/chart/.test(cellid)){
                        $("#"+cellid).removeClass();
                        $("#"+cellid).addClass("chartthem_black");
                    }
                }
            }
            if(args[1] == "white"){
                this.viewRender.style.backgroundColor = "#fff";
                for(var i = 0 ; i < cells.length ; i++){
                    var cellid = cells[i].getId();
                    var cellstyle = this.editor.graph.getCellStyle(cells[i]);
                    if(!/chart/.test(cellid) && !/label/.test(cellstyle.shape)){

                        this.editor.graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, "#333", [cells[i]]);
                        this.editor.graph.setCellStyles(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, "none", [cells[i]]);
                        this.editor.graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, "#333", [cells[i]]);
                    }
                    if(!/chart/.test(cellid) && /label/.test(cellstyle.shape)){
                        //cells[i].setStyle("html=1;strokeColor=none;fillColor=none;");
                    }
                    if(/chart/.test(cellid)){
                        $("#"+cellid).removeClass();
                        $("#"+cellid).addClass("chartthem_white");
                    }
                }
            }
        }
    };

    /***
     * 创建换肤的面板
     */
    UMX.createThemePanel = function () {
        var _this = this;
        var setPM = function (e) {
            if(e){
                e.style.padding = "0px";
                e.style.margin = "0px";
            }
        };
        var tpc = document.createElement("div");
        setPM(tpc);
        tpc.style.position = "absolute";
        tpc.style.top = "10px";
        tpc.style.left = "10px";
        tpc.style.height = "30px";
        tpc.style.width = "50px";

        var tblack = document.createElement("div");
        setPM(tblack);
        tblack.style.width = "15px";
        tblack.style.height = "15px";
        tblack.style.backgroundColor = "black";
        tblack.style.float = "left";
        tblack.style.cursor = "pointer";

        var twhite = document.createElement("div");
        setPM(twhite);
        twhite.style.width = "15px";
        twhite.style.height = "15px";
        twhite.style.backgroundColor = "#bbbbbb";
        twhite.style.float = "left";
        twhite.style.marginLeft = "5px";
        twhite.style.cursor = "pointer";

        tpc.appendChild(tblack);
        tpc.appendChild(twhite);

        tblack.addEventListener("click", function () {
            var eventPool = getumxEventInstance();
            eventPool.fireEvent("changetheme",_this,"black");
            eventPool.fireEvent("changeoutlinetheme",_this.outLineInstance,"black");
        });

        twhite.addEventListener("click", function () {
            var eventPool = getumxEventInstance();
            eventPool.fireEvent("changetheme",_this,"white");
            eventPool.fireEvent("changeoutlinetheme",_this.outLineInstance,"white");
        });

        var fscontanier = document.createElement("div");
        setPM(fscontanier);
        fscontanier.style.position = "absolute";
        fscontanier.style.top = "10px";
        fscontanier.style.left = "60px";
        fscontanier.style.height = "30px";

        fscontanier.style.width = "30px";
        var fsimg = document.createElement("img");
        fsimg.src = "images/mxView/fullscreen_white.png";
        fsimg.style.width = "15px";
        fsimg.style.height = "15px";
        fsimg.style.cursor = "pointer";
        fsimg.style.verticalAlign = "top";

        fscontanier.appendChild(fsimg);

        function launchFullscreen(e) {
            if(e.requestFullscreen) {
                e.requestFullscreen();
            } else if(e.mozRequestFullScreen) {
                e.mozRequestFullScreen();
            } else if(e.webkitRequestFullscreen) {
                e.webkitRequestFullscreen();
            } else if(e.msRequestFullscreen) {
                e.msRequestFullscreen();
            }
        }
        fsimg.addEventListener("click", function () {
            launchFullscreen(document.documentElement);
        });

        document.body.appendChild(tpc);
        document.body.appendChild(fscontanier);
    };

    /***
     * 初始化图表组件
     */
    UMX.initChart = function () {
        var graph = this.editor.graph;
        var celllist = graph.getChildVertices();
        var chartcelllist = [];

        if(celllist.length > 0){
            for(var i = 0 ; i < celllist.length ; i++){
                var cell = celllist[i];
                var cellType = cell.getAttribute("type",null);
                if(cellType && cellType == "chart"){
                    chartcelllist.push(cell);
                }
            }
        }

        if(chartcelllist.length > 0){
            var chartView = dashboard.getChartView(chartcelllist,graph);
            chartView.excute();
        }
    };

    /***
     * 数据加载后，给mxCell绑定点击事件
     */
    UMX.initmxEvent = function () {
        var editor = this.editor;
        editor.graph.addListener(mxEvent.CLICK, function (sender, evt) {
            var id = 0,
                e = null,
                parent = null,
                cell = null;
            // mouse event
            e = evt.getProperty('event');

            // cell may be null
            cell = evt.getProperty('cell');
            if (e.which == 1) {
                editor.graph.removeLight();
                editor.graph.clearSelection();
                if (cell && cell.id.substr(0, 3) == "ci_") {
                    id = cell.id.split("_")[1];
                    //如果需要点击节点时显示对应ci的kpi小窗口，打开下面一行即可
                    //graph.showDashboard(editor.graph.container, [cell.getId()]);

                    editor.graph.addLight(cell);
                    // Do something useful with cell and consume the event
                    evt.consume();
                }
            }
        });
    };

    /***
     * 模拟加载正在切换的节点
     * 该动作被注册到中介者模式中(eventLibs)，在后台数据改变的时候被自动调用
     */
    UMX.runTration = function () {
        var args = arguments;
        var graph = this.editor.graph;
        //var celllist = graph.getChildVertices();
        var nodesProcessdata = args[1];
        for(var i = 0 ; i < nodesProcessdata.length ; i++){
            var ciid = nodesProcessdata[i]["ciid"];
            var nodeProcessdata = nodesProcessdata[i]["data"];
            var nodeProcessflag = nodesProcessdata[i]["flag"];
            var cell = graph.getCellByID(ciid);
            graph.addCellsFlush(cell,nodeProcessdata,nodeProcessflag);

        }

    };

    UMX.runHAMAScript = function () {
        var args = arguments;
        var graph = this.editor.graph;
        showScriptDialog(graph.container,args[1]);
    }


})(window);