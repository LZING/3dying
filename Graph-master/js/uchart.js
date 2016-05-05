/**
 * Created by leiting on 14/8/6.
 */

/***
 * 图表基础类
 */
(function (arg) {

    var self = arg;

    self.ucommon = function () {
        //设置图表默认宽度
        this.w = 300;
        //设置图表默认高度
        this.h = 300;
        //设置柱状图柱子之间的间隔
        this.barPadding = 35;
        //设置数据集
        this.dataset = null;
        //设置柱状图的尺寸类型，0：自定义尺寸，1-4分别从sizearray中获取数组的值分别作为宽和高
        this.type = 0;
        //设置图标标题
        this.title = "";
        //显示横坐标
        this.hasxAxis = true;
        //显示纵坐标
        this.hasyAxis = true;
        //尺寸数组
        this.sizearray = [[300,300],[500,300],[600,300],[800,300]];
        //设置画布
        this.render = null;
        //设置存放bar的group
        this.grp = null;
        //设置xsclae
        this.xScale = null;
        //设置yscale
        this.yScale = null;
        //设置x坐标轴
        this.xAxis = null;
        //设置x轴标题
        this.xAxistitle = "";
        //x轴g容器
        this.xR = null;
        //设置y坐标轴
        this.yAxis = null;
        //设置y轴标题
        this.yAxistitle = "";
        //y轴容器
        this.yR = null;
        //设置颜色，暂时方案
        this.color = d3.scale.category10();
        //设置bar样式
        this.barstyle = {
            "barText" : "h_bartext",
            "barTitle": "h_bartitle",
            "axisStyle": "h_axis"
        };
        //如果设置了标题，则在最上方留出20px的高度
        this.titlePadding = 30;
        //如果显示x轴，则在最下方留出20px的高度
        this.xAxisPadding = 30;
        //如果显示y轴，则在画布的最左侧留出20px的宽度
        this.yAxisPadding = 30;
        //设置标题栏颜色
        this.titleColor = "#333333"
    };

    var HS = self.ucommon.prototype;

    /***
     * 设置柱状图尺寸类型
     * @param t 类型: 0-4
     */
    HS.setType = function (t) {
        if(typeof  t === "number"){

            this.type = t;
        }else{
            console.log("图表的尺寸类型必须是0-4的数字");
        }
    };

    /***
     * 设置坐标轴样式
     * @param v
     */
    HS.setAxisStyle = function(v){
        this.barstyle["axisStyle"] = v;
    };

    /***
     * 根据柱状图的尺寸类型设置柱状图的宽和高
     * @param w 宽
     * @param h 高
     */
    HS.setSize = function (w,h) {
        if(this.type > 0 && this.type <= 4){
            this.w = this.sizearray[this.type - 1][0];
            this.h = this.sizearray[this.type - 1][1];
        }
        else if(this.type == 0){
            if(typeof w === "number" && typeof h === "number"){

                this.w = w;
                this.h = h;
            }else{
                console.log("图表尺寸只能够接受数字类型,系统已经将数据类型设置为默认500*300大小");
            }
        }else{
            console.log("请先设置正确的图表尺寸类型再进行具体尺寸设置");
        }
    };

    /***
     * 设置图标的标题
     * @param t
     */
    HS.setTitle = function (t) {
        this.title = t;
    };

    /***
     * 设置是否显示横坐标即X轴
     * @param x true/fase
     */
    HS.isxAsix = function (x) {
        if(typeof x === "boolean"){

            this.hasxAxis = x;
        }
    };

    /***
     * 设置是否显示纵坐标即Y轴
     * @param y true/fase
     */
    HS.isyAsix = function (y) {
        if(typeof y === "boolean"){

            this.hasyAxis = y;
        }
    };

    /***
     * 设置x轴标题
     * @param t
     */
    HS.setxAxistitle = function (t) {
        if(t != "" && t != null && typeof t ==="string"){
            this.xAxistitle = t;
        }
    };

    /***
     * 设置y轴标题
     * @param t
     */
    HS.setyAxistitle = function (t) {
        if(t != "" && t != null && typeof t ==="string"){
            this.yAxistitle = t;
        }
    };

    /***
     * 设置图标标题颜色
     * @param t
     */
    HS.setTitleColor = function (t) {
        if(typeof t === "string"){
            this.titleColor = t;
        }
    };

    /**
     * 创建d3的基础对象，将来所有的d3图表中的子对象都要画到该svg中来。
     * @param t 创建画布的来源类型，jo:JavaScript对象，比如div等;id:通过html标签的id来进行创建svg;htmlmark:通过某个html标签来进行创建。
     * @param r 对应的被选择对象的值。
     * @returns {void|*}
     */
    HS.createRender = function (t,r) {
        if(t == "jo"){
            this.render = this._setRendsize(d3.select(r).append("svg"),this.w,this.h);
            return this.render;
        }
        if(t == "id"){
            this.render = this._setRendsize(d3.select('#' + r).append("svg"),this.w,this.h);
            return this.render;
        }
        if(t == "htmlmark"){
            this.render = this._setRendsize(d3.select(r).append("svg"),this.w,this.h);
            return this.render;
        }
    };

    /***
     * 设置画布的大小
     * @param o 画布的d3对象
     * @param w 设置的宽
     * @param h 设置的高
     * @returns {*}
     */
    HS._setRendsize = function (o,w,h){
        o.attr({
            width: w,
            height: h
        });
        return o;
    };

    /**
     * 绑定外部数据源
     * @param d 外部数据源，是一个JavaScript object
     */
    HS.bindData = function (d) {
        if(typeof d === "object"){

            this.dataset = d;
        }else{
            console.log("绑定的数据类型不正确");
        }
    };

    /***
     * 返回是否显示title，用于后续的尺寸判断
     * @returns {boolean}
     */
    HS.hasTtile = function () {
        var rtn = false;
        if(this.title != "" && this.title != null && typeof this.title != "undefined"){
            rtn = true;
        }
        return rtn;
    };

    HS.setBarpadding = function (b) {
        if(typeof b === "number"){
            this.barPadding = b;
        }
    }

    /***
     * 创建title并设置显示位置等属性
     */
    HS.createTitle = function () {
        var _this = this;
        if(this.hasTtile()){

            var ti = this.render.append("text").text(this.title);
            ti.classed(this.barstyle.barTitle,true);
            ti.attr({
                x: _this.w / 2,
                y: 20,
                fill: this.titleColor
            })
        }
    };


})(window);

/**
 * Created by wason on 2014/8/6.
 * 基础饼图
 */
(function(arg){

    var self = arg;

    self.upieb = function(){
        //设置是圆和圆环展示，true:圆,false圆环
        this.circle = true;

        //用于存放arcs
        this.arcs = null;

        //用于存放arc
        this.arc = null;

        //是否加图例 true:有图例 false:无图例
        this.isIcon = true;

        //存放图例的g group
        this.iconGroup = null;

        //偏移量
        this.baroffset = 0;

        this.sum = 0;
    };

    var UPB = self.upieb.prototype = new ucommon();

    /***
     * 是饼图还是环形图标志位，true饼图，false环形图
     * @param flag
     */
    UPB.setCircle = function(flag){
        if(typeof flag === "boolean"){
            this.circle = flag;
        }
    };

    /***
     * 是否显示图例，true显示，false不显示
     * @param flag
     */
    UPB.setIcon = function (flag) {
        if(typeof flag === "boolean"){
            this.isIcon = flag;
        }
    };

    /***
     * 设置饼图的比例参数
     * @param x
     */
    UPB.setScale = function(x){
        var outerRadius = Math.min(this.w, this.h)/2;
        if(typeof x === "boolean"){
            outerRadius = Math.min(this.w, this.h)/4 + this.barPadding;
        }
        var innerRadius = 0;
        if(!this.circle){
            innerRadius = Math.min(this.w, this.h)/4;
        }

        //barPadding是饼图和画布四周的距离
        this.arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius - this.barPadding);

    };

    /**
     * 为每个要绘制的扇形分组(g),把用于生成饼图的数据绑定到这些新元素，并把每个分组平移到图表中心
     * @returns {void|*}
     */
    UPB.createGroup = function(){
        var _this = this;

        this.pie = d3.layout.pie().sort(null).value(function(d){
            return d.value;
        });

        this.baroffset = 0;
        if(this.isIcon){
            this.baroffset = 20;
        }
        this.arcs = _this.render.selectAll("g.arc")
            .data(this.pie(this.dataset))
            .enter()
            .append("g").
            attr("class","arc").attr("transform","translate("+(this.w/2 - this.baroffset)+","+this.h/2+")");
    };

    /**
     * 创建path元素并把相关属性的值保存在d中，并设置颜色
     * @param arcs
     * @param arc
     */
    UPB.createPie = function(g){
        var _this = this;

        //自定义颜色
        //var color = d3.scale.ordinal()
        //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        g.each(function(d){
            var e = d3.select(this);
            var b = e.append("path");
            var t = e.append("text").text(d.data.value);
            b.attr({
                "fill":_this.color(d.data.name),
                "d":_this.arc
            })
                .each(function(d) { this._current = d; });

            /*b.transition().duration(500).ease("circle")
             .attr({
             "d":_this.setScale()
             });*/

            t.attr({
                "text-anchor":"middle",
                "font-size":14,
                "fill":"white",
                "transform":function(){
                    return "translate("+_this.arc.centroid(d)+")";
                }
            });
        });

        if(_this.isIcon){
            _this.iconGroup = _this.createLenGroup();
        }

    };

    /***
     * 创建存放图例的g和图例内容
     * @returns {*}
     */
    UPB.createLenGroup = function(){
        var _this = this;

        var pt = 0;
        this.dataset.forEach(function (d) {
            pt += d.value;
        });
        var g = _this.render.append("g").
            attr("transform","translate("+(((_this.w/2 - this.baroffset) + (_this.h/2 - _this.barPadding)) + 10)+","+(this.barPadding + 10)+")");

        var len = g.selectAll("g.len").data(this.dataset).enter().
            append("g").attr({
                "class":"len",
                "transform": function(d,i){return "translate(0," + (i*22) + ")"}

            });
        len.append("rect").attr("width",30).attr("height",20).attr("fill", function (d) {
            return _this.color(d.name);
        });
        len.append("text")
            .text(function(d,i){
                return d.name + " " + Math.floor(d.value/pt*100) + "%";
            })
            .attr({
                "x":32,
                "y": function (d,i) {
                    return i+11;
                },
                "font-size":12
            });

        return g;
    };

    /**
     * 更新各个组
     * @param g
     */
    UPB.updatePie = function(g){
        var _this = this;

        var pt = 0;
        this.dataset.forEach(function (d) {
            pt += d.value;
        });
        g.each(function(d){
            var e = d3.select(this);
            var p = e.select("path");
            var t = e.select("text").text(d.data.value);
            p.transition().duration(500).attrTween("d", function (d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return _this.arc(interpolate(t));
                };
            });
            /*p.attr({
             "fill":_this.color(d.data.name),
             "d":_this.arc
             });*/
            t.transition().duration(500).attr({
                "text-anchor":"middle",
                "font-size":14,
                "fill":"white",
                "transform":function(){
                    return "translate("+_this.arc.centroid(d)+")";
                }
            });
        });
        this.iconGroup.selectAll(g.len).data(this.dataset);
        var te = this.iconGroup.selectAll("text");
        te.each(function () {
            var e = d3.select(this);
            e.text(function(d){
                return d.name + " " + Math.floor(d.value/pt*100) + "%";
            });
        })
    };

    /**
     * 绘制饼图
     */
    UPB.draw = function(){
        this.setScale();
        this.createGroup();
        this.createPie(this.arcs);
        this.createTitle(this.title);
    };

    /**
     * 更新饼图，使用新的数据进行绑定
     * @param d 新传入的数据对象数组
     */
    UPB.update = function(d){
        this.dataset = d;
        this.setScale();
        this.arcs.data(this.pie(this.dataset));
        this.updatePie(this.arcs);
    }

})(window);

/**
 * Created by wason on 2014/8/6.
 * 环状进度条
 */
(function(arg){

    var self = arg;

    self.upiep = function(){
        //设置是圆和圆环展示，true:圆,false圆环
        this.circle = true;

        //是否加图例 true:有图例 false:无图例
        this.isIcon = true;

        this.arcs = null;

        this.arc = null;

        //偏移量
        this.baroffset = 0;

        this.piestyle={
            "pieText":"prebarText"
        };

        this.processColor = ["#00C957","gray"];

        this.processTextColor = "#333333";

    };

    var UPP = self.upiep.prototype = new ucommon();


    UPP.setCircle = function(flag){
        if(typeof flag === "boolean"){
            this.circle = flag;
        }
    };

    UPP.setIcon = function (flag) {
        if(typeof flag === "boolean"){
            this.isIcon = flag;
        }
    };

    UPP.setProcesscolor_start = function (c) {
        this.processColor[0] = c;
    };

    UPP.setProcesscolor_end = function (c) {
        this.processColor[1] = c;
    };

    UPP.setScale = function(x){
        var outerRadius = Math.min(this.w, this.h)/2;
        if(typeof x === "boolean"){
            outerRadius = Math.min(this.w, this.h)/4 + this.barPadding;
        }
        var innerRadius = 0;
        if(!this.circle){
            innerRadius = Math.min(this.w, this.h)/4;
        }

        //barPadding是饼图和画布四周的距离
        this.arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius - this.barPadding);
    };
    UPP.setProcessTextColor = function (s) {
        if(typeof s === "string"){
            this.processTextColor = s;
        }
    };

    /**
     * 为每个要绘制的扇形分组(g),把用于生成饼图的数据绑定到这些新元素，并把每个分组平移到图表中心
     * @returns {void|*}
     */
    UPP.createGroup = function(){
        var _this = this;

        this.pie = d3.layout.pie().sort(null).value(function(d){
            return d;
        });

        this.baroffset = 0;
        if(this.isIcon){
            this.baroffset = 20;
        }
        this.arcs = _this.render.selectAll("g.arc")
            .data(this.pie(this.dataset))
            .enter()
            .append("g").
            attr("class","arc").attr("transform","translate("+(this.w/2 - this.baroffset)+","+this.h/2+")");
    };

    /**
     * 创建path元素并把相关属性的值保存在d中，并设置颜色
     * @param arcs
     * @param arc
     */
    UPP.createPie = function(g){
        var _this = this;

        //自定义颜色
        var color = d3.scale.ordinal()
            .range(this.processColor);

        g.each(function(d,i){
            var e = d3.select(this);
            var b = e.append("path");
            b.attr({
                "fill":color(i),
                "d":_this.arc
            })
                .each(function(d) { this._current = d; });
        });

        this.createPreBar();

        if(_this.isIcon){
            _this.createLenGroup();
        }

    };

    UPP.createPreBar = function(){
        var _this = this;

        var gPce = _this.render.append("g").attr("transform","translate("+(_this.w/2)+","+(_this.h/2+10)+")");
        this.pce = gPce.append("text").text(this.dataset[0] + "%");
        this.pce.attr({
            "text-anchor":"middle",
            fill: this.processTextColor
        }).classed(_this.piestyle.pieText,true);

    };


    UPP.createLenGroup = function(){
        var _this = this;

        var g = _this.render.append("g").
            attr("transform","translate("+(((_this.w/2 - this.baroffset) + (_this.h/2 - _this.barPadding)) + 10)+","+(this.barPadding + 10)+")");

        var len = g.selectAll("g.len").data(this.dataset).enter().
            append("g").attr({
                "class":"len",
                "transform": function(d,i){return "translate(0," + (i*22) + ")"}

            });
        len.append("rect").attr("width",30).attr("height",20).attr("fill", function (d) {
            return _this.color(d.name);
        });
        len.append("text")
            .text(function(d,i){
                return d.name;
            })
            .attr({
                "x":32,
                "y": function (d,i) {
                    return i+11;
                },
                "font-size":12
            });

        return g;
    };

    /**
     * 更新各个组
     * @param g
     */
    UPP.updatePie = function(g){
        var _this = this;

        g.each(function(d){
            var e = d3.select(this);
            var p = e.select("path");
            p.transition().duration(100).attrTween("d",function(a) {
                this._current = this._current || d;
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function(t) {
                    return _this.arc(i(t));
                };
            });

        });
    };

    UPP.updatePre = function(){
        var _this = this;
        _this.pce.text(_this.dataset[0] + "%");
    };

    /**
     * 绘制饼图
     */
    UPP.draw = function(){
        this.setScale();
        this.createGroup();
        this.createPie(this.arcs);
        this.createTitle(this.title);
    };

    /**
     * 更新饼图，使用新的数据进行绑定
     * @param d 新传入的数据对象数组
     */
    UPP.update = function(d){
        this.dataset = d;
        this.setScale();
        this.arcs.data(this.pie(this.dataset));
        this.updatePie(this.arcs);
        this.updatePre();
    };

})(window);

/**
 * Created by leiting on 14/8/6.
 * 柱状图
 */
(function (arg) {

    var self = arg;

    self.ubarb = function () {

    };

    //实现从基类继承
    var UBB = self.ubarb.prototype = new ucommon();

    /***
     * 设置x和y的比例
     * 该项必须在bindData后执行，这样才能够绑定最新的数据源以产生坐标
     */
    UBB.setScale = function () {
        var x = 0,y = 0;
        if(this.hasTtile()){
            y += this.titlePadding;
        }
        if(this.hasxAxis){
            y += this.xAxisPadding;
        }
        if(this.hasyAxis){
            x += this.yAxisPadding;
        }
        //this.xScale = d3.scale.ordinal().domain(d3.range(this.dataset.length)).rangeRoundBands([0,this.w - x],0.05);
        var dname = [];
        this.dataset.forEach(function (d) {
            dname.push(d.name);
        });
        this.xScale = d3.scale.ordinal().domain(dname).rangeRoundBands([0,this.w - x],0.25);
        this.yScale = d3.scale.linear()
            .domain([0,d3.max(this.dataset, function (d) {
                return d.value;
            })])
            .range([this.h,y]);
    };

    /***
     * 定义坐标轴
     */
    UBB.setAxis = function () {
        var _this = this;
        this.xAxis = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom").ticks(8);

        this.yAxis = d3.svg.axis()
            .scale(this.yScale)
            .orient("left").ticks(5);
    };

    /***
     * 按照数据创建每个bar的group
     * @returns {void|*}
     */
    UBB.createGroup = function () {
        var _this = this;
        var g = this.render.selectAll("g")
            .data(this.dataset)
            .enter()
            .append("g");
        g.attr("transform", function (d,i) {
            var y = 0,x = 0;
            if(_this.hasxAxis){
                y += _this.xAxisPadding;
            }
            if(_this.hasyAxis){
                x += _this.yAxisPadding;
            }
            var tr =  "translate(" + (_this.xScale(d.name) + x) +","+ -y +")";
            return tr;
        });
        return g;
    };

    /***
     * 生成每个bar的rect
     * @param g
     */
    UBB.createBar = function (g) {
        var _this = this;
        g.each(function (d) {
            var e = d3.select(this);
            var b = e.append("rect");
            var t = e.append("text").text(d.value).classed(_this.barstyle.barText,true);
            b.attr({
                width: _this.xScale.rangeBand(),
                y: _this.h,
                height: 0,
                fill: _this.color(d.value)
            });
            b.transition().duration(500).ease("linear").attr({
                height: _this.h - _this.yScale(d.value),
                y: _this.yScale(d.value)
            });
            t.attr({
                y: _this.yScale(d.value) + 15,
                x: _this.xScale.rangeBand()/2
            });
        })
    };

    /***
     * 更新滚动条
     * @param g
     */
    UBB.updateBar = function (g) {
        var _this = this;
        g.each(function (d) {
            var e = d3.select(this);
            var g = e.select("rect");
            var t = e.select("text");
            g.transition().duration(500).ease("linear").attr({
                height: _this.h - _this.yScale(d.value),
                y: _this.yScale(d.value)
            });
            t.transition().duration(500).ease("linear").attr({
                y: _this.yScale(d.value) + 15,
                x: _this.xScale.rangeBand()/2
            }).text(d.value);
        });
    };

    /***
     * 创建坐标轴
     */
    UBB.createAxis = function () {
        var _this = this;
        if(this.hasxAxis){
            //this.xAxis = d3.svg.axis().scale(this.xScale).orient("bottom");
            this.xR = this.render.append("g")
                .classed(_this.barstyle.axisStyle,true)
                .attr({
                    transform: "translate(" + _this.yAxisPadding +"," + (_this.h - _this.xAxisPadding) + ")"
                })
                .call(this.xAxis);
            //添加横坐标标题
            if(this.xAxistitle != ""){
                this.xR.append("text")
                    .attr({
                        x: _this.w - _this.yAxisPadding - 10,
                        y: -5
                    })
                    .style("text-anchor","end")
                    .text(this.xAxistitle);
            }
        }
        if(this.hasyAxis){
            //this.yAxis = d3.svg.axis().scale(this.yScale).orient("left");
            this.yR = this.render.append("g")
                .classed(_this.barstyle.axisStyle,true)
                .attr({
                    transform: "translate(" + _this.yAxisPadding +"," + (_this.yAxisPadding - _this.xAxisPadding - _this.titlePadding) + ")"
                })
                .call(this.yAxis);
            //添加纵坐标标题
            if(this.yAxistitle != ""){
                this.yR.append("text")
                    .attr({
                        transform: "rotate(-90)",
                        y: 15,
                        x: -(_this.yAxisPadding + _this.xAxisPadding)
                    })
                    .style("text-anchor", "end")
                    .text(this.yAxistitle);
            }

        }
    };

    /***
     * 绘制柱状图
     */
    UBB.draw = function () {
        this.setScale();
        this.setAxis();
        this.createTitle(this.title);
        this.grp = this.createGroup();
        this.createBar(this.grp);
        this.createAxis();
    };

    /***
     * 更新柱状图，使用新的数据进行绑定
     * @param d 新传入的数据对象数组
     */
    UBB.update = function (d) {
        this.dataset = d;
        this.setScale();
        this.setAxis();
        this.grp.data(this.dataset);
        this.updateBar(this.grp);
        if(this.hasxAxis){

            this.xR.transition().duration(500).ease("linear").call(this.xAxis);
        }
        if(this.hasyAxis){

            this.yR.transition().duration(500).ease("linear").call(this.yAxis);
        }
    }

})(window);

/**
 * Created by leiting on 2014/8/6.
 */
(function(arg){

    var self = arg;

    self.upiemxp = function(){
        //设置是圆和圆环展示，true:圆,false圆环
        this.circle = false;

        //是否加图例 true:有图例 false:无图例
        this.isIcon = false;

        this.arcs = null;

        this.arc = null;

        //偏移量
        this.baroffset = 0;

        this.piestyle={
            "pieText":"prebarText"
        };

        this.processground = null;

        this.barPadding = 2;

        this.processColor = ["#32CD32","#666"];


    };

    var UPMXP = self.upiemxp.prototype = new ucommon();


    UPMXP.setCircle = function(flag){
        if(typeof flag === "boolean"){
            this.circle = flag;
        }
    };

    UPMXP.setIcon = function (flag) {
        if(typeof flag === "boolean"){
            this.isIcon = flag;
        }
    };

    UPMXP.setScale = function(x){
        var outerRadius = Math.min(this.w, this.h)/2;
        if(typeof x === "boolean"){
            outerRadius = Math.min(this.w, this.h)/4 + this.barPadding;
        }
        var innerRadius = 0;
        if(!this.circle){
            innerRadius = Math.min(this.w, this.h)/3;
        }

        //barPadding是饼图和画布四周的距离
        this.arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius - this.barPadding);
    };

    UPMXP.setProcessGround = function (g) {
        if(typeof g === "string"){
            this.processground = g;
        }
    };

    UPMXP.setProcesscolor_start = function (c) {
        this.processColor[0] = c;
    };

    UPMXP.setProcesscolor_end = function (c) {
        this.processColor[1] = c;
    };

    /**
     * 为每个要绘制的扇形分组(g),把用于生成饼图的数据绑定到这些新元素，并把每个分组平移到图表中心
     * @returns {void|*}
     */
    UPMXP.createGroup = function(){
        var _this = this;

        var bg = this.render.append("g");
        bg.append("image").attr({
            "xlink:href": _this.processground,
            width: _this.w,
            height: _this.h,
            opacity:1
        });

        this.pie = d3.layout.pie().sort(null).value(function(d){
            return d;
        });

        this.arcs = _this.render.selectAll("g.arc")
            .data(this.pie(this.dataset))
            .enter()
            .append("g").
            attr("class","arc").attr("transform","translate("+(this.w/2 - this.baroffset)+","+this.h/2+")");
    };

    /**
     * 创建path元素并把相关属性的值保存在d中，并设置颜色
     * @param arcs
     * @param arc
     */
    UPMXP.createPie = function(g){
        var _this = this;

        //自定义颜色
        var color = d3.scale.ordinal()
            .range(this.processColor);

        g.each(function(d,i){
            var e = d3.select(this);
            var b = e.append("path");
            b.attr({
                "fill":color(i),
                "d":_this.arc
            })
                .each(function(d) { this._current = d; });
        });

        this.createPreBar();

        if(_this.isIcon){
            _this.createLenGroup();
        }

    };

    UPMXP.createPreBar = function(){
        var _this = this;

        var gPce = _this.render.append("g").attr("transform","translate("+(_this.w/2)+","+(_this.h/2+5)+")");
        this.pce = gPce.append("text").text("准备中...");
        this.pce.attr({
            "text-anchor":"middle",
            "font-family":"Arial",
            "font-size":14,
            "font-weight":"bold",
            "fill":_this.processColor[1]
        });

    };


    UPMXP.createLenGroup = function(){
        var _this = this;

        var g = _this.render.append("g").
            attr("transform","translate("+(((_this.w/2 - this.baroffset) + (_this.h/2 - _this.barPadding)) + 10)+","+(this.barPadding + 10)+")");

        var len = g.selectAll("g.len").data(this.dataset).enter().
            append("g").attr({
                "class":"len",
                "transform": function(d,i){return "translate(0," + (i*22) + ")"}

            });
        len.append("rect").attr("width",30).attr("height",20).attr("fill", function (d) {
            return _this.color(d.name);
        });
        len.append("text")
            .text(function(d,i){
                return d.name;
            })
            .attr({
                "x":32,
                "y": function (d,i) {
                    return i+11;
                },
                "font-size":12
            });

        return g;
    };

    /**
     * 更新各个组
     * @param g
     */
    UPMXP.updatePie = function(g){
        var _this = this;

        var color = d3.scale.ordinal()
            .range(this.processColor);

        g.each(function(d,k){
            var e = d3.select(this);
            var p = e.select("path");
            p.transition().duration(100).attrTween("d",function(a) {
                this._current = this._current || d;
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function(t) {
                    return _this.arc(i(t));
                };
            });
            p.attr({
                "fill":color(k)
            });

        });
    };

    UPMXP.updatePre = function(){
        var _this = this;
        _this.pce.text(_this.dataset[0] + "%");
    };

    /**
     * 绘制饼图
     */
    UPMXP.draw = function(){
        this.setScale();
        this.createGroup();
        this.createPie(this.arcs);
        this.createTitle(this.title);
    };

    /**
     * 更新饼图，使用新的数据进行绑定
     * @param d 新传入的数据对象数组
     */
    UPMXP.update = function(d){
        this.dataset = d;
        this.setScale();
        this.arcs.data(this.pie(this.dataset));
        this.updatePie(this.arcs);
        this.updatePre();
    };

    UPMXP.interValcreate = function (d) {
        var interval = 100;
        /*if(i != "undefined" && typeof i === "number"){
            interval = i;
        }*/
        var _this = this;
        var dataset = this.dataset = [0,100];
        this.draw();
        _this.update(d);

        /*//update
        setInterval(function () {

            if(dataset[0]>=0&&dataset[0]<100&&dataset[1]>=0&&dataset[1]<=100){
                dataset[0]++;
                dataset[1]--
            }
            _this.update(dataset);
        },interval);*/
    }

})(window);

/**
 * Created by leiting on 14/8/6.
 */
(function (arg) {

    var self = arg;

    self.uline = function () {
        //格式化日期，并保存在这个变量中
        this.parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

        //绘制线条的方法
        this.line = null;

        //存放所有元素的group g
        this.lgroup = null;

        //存放每个line的cell g的集合
        this.lcell = null;

        //y轴是否固定值
        this.yfixed = false;

        //y轴固定值范围
        this.yfixedrange = {
            min: 0,
            max: 100
        };
        this.linecategory = "basis";

        //存放所有的line相关的样式
        this.linestyle = {
            "linestyle": "linestyle",
            "linetext": "linetext"
        };

        this.xTicks = 0;

        this.yTicks = 0;

        this.lineColor = ["#ffffee","red","green"];
    };

    var UL = self.uline.prototype = new ucommon();

    /***
     * 格式化接收到的参数中日期
     * @param f 日期格式，如：20111001 为2011年10月1日，格式为%Y%m%d
     */
    UL.setparseDate = function (f) {
        if(typeof f === "string"){
            this.parseDate = d3.time.format(f).parse;
        }
    };
    /***
     * 设置x和y的比例
     * 该项必须在bindData后执行，这样才能够绑定最新的数据源以产生坐标
     */
    UL.setScale = function () {
        var _this = this;
        this.xScale = d3.time.scale().range([0,(this.w - this.barPadding * 2)]);
        this.yScale = d3.scale.linear().range([(this.h - this.barPadding * 2),0]);
    };

    /***
     * 定义坐标轴
     */
    UL.setAxis = function () {
        var _this = this;
        this.xAxis = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom").ticks(this.xTicks);

        this.yAxis = d3.svg.axis()
            .scale(this.yScale)
            .orient("left").ticks(this.yTicks);
    };

    /***
     * 设置线条样式
     * @param l
     */
    UL.setLinecategory = function (l) {
        if(typeof l === "string"){
            this.linecategory = l;
        }
    };

    /***
     * 设置x轴的刻度个数
     */

    UL.setxTicks = function (x) {
        if(typeof x === "number"){
            this.xTicks = x;
        }
    };

    /***
     * 设置y轴的刻度个数
     */
    UL.setyTicks = function (y) {
        if(typeof y === "number"){
            this.yTicks = y;
        }
    };

    /***
     * 定义画曲线的函数
     */
    UL.setLine = function () {
        var _this = this;
        this.line = d3.svg.line()
            .interpolate(this.linecategory)
            .x(function (d) {
                return _this.xScale(d.time);
            })
            .y(function (d) {
                return _this.yScale(d.val);
            })
    };

    /***
     * 设置固定y轴的范围
     * @param x 最小值
     * @param y 最大值
     */
    UL.setYfixed = function (x,y) {
        if(typeof x === "number" && typeof y === "number"){
            this.yfixedrange.min = x;
            this.yfixedrange.max = y;
            this.yfixed = true;
        }
    };

    /***
     * 格式化数据中的日期
     * 格式化后为xscle和yscale的domain
     */
    UL.formatDate = function () {
        var _this = this;

        this.dataset.forEach(function (d) {
            d.vals.forEach(function (ds) {
                ds.time = _this.parseDate(ds.time);
            });

        });


        //设置x轴的domain
        this.xScale.domain([
            d3.min(_this.dataset, function (d) {
                return d3.min(d.vals, function (t) {
                    return t.time;
                });
            }),
            d3.max(_this.dataset, function (d) {
                return d3.max(d.vals, function (t) {
                    return t.time;
                });
            })
        ]);
        //这段作用使Y轴随着数据的区间来取大小范围，y轴不固定
        if(!this.yfixed){

            this.yScale.domain([
                d3.min(_this.dataset, function (d) {
                    return d3.min(d.vals, function (t) {
                        return t.val;
                    });
                }),
                d3.max(_this.dataset, function (d) {
                    return d3.max(d.vals, function (t) {
                        return t.val;
                    });
                })
            ]);
        }else{

            this.yScale.domain([this.yfixedrange.min,this.yfixedrange.max]);
        }
    };

    /***
     * 在画布svg上直接创建g，用于存放所有元素
     * 在svg上先创建一个g的目的是使svg画布留有四周的padding
     */
    UL.createLgroup = function () {
        return this.render.append("g")
            .attr("transform", "translate(" + this.barPadding + "," + this.barPadding + ")");
    };

    /***
     * 创建x轴和y轴
     */
    UL.createAxis = function (g) {
        var _this = this;
        if(this.hasxAxis){
            this.xR = g.append("g")
                .classed(_this.barstyle.axisStyle,true)
                .attr({
                    transform: "translate(0," + (_this.h - this.barPadding*2) + ")"
                })
                .call(this.xAxis);
            if(_this.xAxistitle != ""){
                _this.xR.append("text")
                    .attr({
                        transform: "translate(" + (_this.w - _this.barPadding*2) +"," + -10 + ")"
                    })
                    .style("text-anchor","end")
                    .text(this.xAxistitle);
            }
        }
        if(this.hasyAxis){
            this.yR = g.append("g")
                .classed(_this.barstyle.axisStyle,true)
                .call(this.yAxis);
            if(_this.yAxistitle != ""){
                _this.yR.append("text")
                    .attr({
                        transform: "rotate(-90)",
                        y: 15
                    })
                    .style("text-anchor", "end")
                    .text(this.yAxistitle);
            }
        }
    };

    /***
     * 绘制线条，如果数据集中有多个name，则绘制多个曲线
     * @param g createLgroup中所创建的g，用于存放曲线及坐标轴等元素
     * @returns {*}
     */
    UL.createLine = function (g) {
        var _this = this;
        var lgs = g.selectAll(".lineg")
            .data(this.dataset)
            .enter()
            .append("g")
            .attr("class","lineg");

        lgs.append("path")
            .attr({
                class: this.linestyle.linestyle,
                d: function (d) {
                    return _this.line(d.vals);
                }
            })
            .style("stroke",function (d,i) {
                return _this.lineColor[i];
            });

        //为line最后面添加名称
        /*lgs.append("text")
         .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
         .attr("transform", function(d) { return "translate(" + _this.xScale(d.value.date) + "," + _this.yScale(d.value.value) + ")"; })
         .attr("x", 3)
         .attr("dy", ".35em")
         .attr("class",_this.linestyle.linetext)
         .text(function(d) { return d.name; });*/

        return lgs;
    };

    UL.updateLine = function (d) {
        console.log(d);
        var _this = this;
        this.dataset = d;
        this.formatDate();
        this.lcell.data(this.dataset);
        var e = this.lcell.select("path");
        e.transition().duration(500).ease("basis")
            .attr({
                d: function (d) {
                    return _this.line(d.vals);
                }
            });
        if(this.hasxAxis){

            this.xR.transition().duration(500).ease("basis").call(this.xAxis);
        }
        if(this.hasyAxis){

            this.yR.transition().duration(500).ease("basis").call(this.yAxis);
        }
    };

    UL.draw = function () {
        this.setScale();
        this.createTitle(this.title);
        this.setAxis();
        this.setLine();
        this.formatDate();
        this.lgroup = this.createLgroup();
        this.createAxis(this.lgroup);
        this.lcell = this.createLine(this.lgroup);
    };

})(window);
