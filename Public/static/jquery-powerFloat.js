/*!
 * jquery-powerFloat.js
 * jQuery 万能浮动层插件
 * http://www.zhangxinxu.com/wordpress/?p=1328
 * © by zhangxinxu  
 * 2010-12-06 v1.0.0	插件编写，初步调试
 * 2010-12-30 v1.0.1	限定尖角字符字体，避免受浏览器自定义字体干扰
 * 2011-01-03 v1.1.0	修复连续获得焦点显示后又隐藏的bug
 修复图片加载正则判断不准确的问题
 * 2011-02-15 v1.1.1	关于居中对齐位置判断的特殊处理
 * 2011-04-15 v1.2.0	修复浮动层含有过高select框在IE下点击会隐藏浮动层的问题，同时优化事件绑定			
 * 2011-09-13 v1.3.0 	修复两个菜单hover时间间隔过短隐藏回调不执行的问题
 * 2012-01-13 v1.4.0	去除ajax加载的存储
 修复之前按照ajax地址后缀判断是否图片的问题
 修复一些脚本运行出错
 修复hover延时显示时，元素没有显示但鼠标移出依然触发隐藏回调的问题
 * 2012-02-27 v1.5.0	为无id容器创建id逻辑使用错误的问题
 修复无事件浮动出现时同页面点击空白区域浮动层不隐藏的问题
 修复点击与hover并存时特定时候o.trigger报为null错误的问题
 * 2012-03-29 v1.5.1	修复连续hover时候后面一个不触发显示的问题
 * 2012-05-02 v1.5.2	点击事件 浮动框再次点击隐藏的问题修复
 * 2012-11-02 v1.6.0	兼容jQuery 1.8.2
 * 2012-01-28 v1.6.1	target参数支持funtion类型，以实现类似动态Ajax地址功能
 */

(function($) {
    $.fn.powerFloat = function(options) {
        return $(this).each(function() {
            var s = $.extend({}, defaults, options || {});
            var init = function(pms, trigger) {
                if (o.target && o.target.css("display") !== "none") {
                    o.targetHide();
                }
                o.s = pms;
                o.trigger = trigger;
            }, hoverTimer;

            switch (s.eventType) {
                case "hover": {
                    $(this).hover(function() {
                        if (o.timerHold) {
                            o.flagDisplay = true;
                        }

                        var numShowDelay = parseInt(s.showDelay, 10);

                        init(s, $(this));
                        //鼠标hover延时
                        if (numShowDelay) {
                            if (hoverTimer) {
                                clearTimeout(hoverTimer);
                            }
                            hoverTimer = setTimeout(function() {
                                o.targetGet.call(o);
                            }, numShowDelay);
                        } else {
                            o.targetGet();
                        }
                    }, function() {
                        if (hoverTimer) {
                            clearTimeout(hoverTimer);
                        }
                        if (o.timerHold) {
                            clearTimeout(o.timerHold);
                        }

                        o.flagDisplay = false;

                        o.targetHold();
                    });
                    if (s.hoverFollow) {
                        //鼠标跟随
                        $(this).mousemove(function(e) {
                            o.cacheData.left = e.pageX;
                            o.cacheData.top = e.pageY;
                            o.targetGet.call(o);
                            return false;
                        });
                    }
                    break;
                }
                case "click": {
                    $(this).click(function(e) {
                        if (o.display && o.trigger && e.target === o.trigger.get(0)) {
                            o.flagDisplay = false;
                            o.displayDetect();
                        } else {
                            init(s, $(this));
                            o.targetGet();

                            if (!$(document).data("mouseupBind")) {
                                $(document).bind("mouseup", function(e) {
                                    var flag = false;
                                    if (o.trigger) {
                                        var idTarget = o.target.attr("id");
                                        if (!idTarget) {
                                            idTarget = "R_" + Math.random();
                                            o.target.attr("id", idTarget);
                                        }
                                        $(e.target).parents().each(function() {
                                            if ($(this).attr("id") === idTarget) {
                                                flag = true;
                                            }
                                        });
                                        if (s.eventType === "click" && o.display && e.target != o.trigger.get(0) && !flag) {
                                            o.flagDisplay = false;
                                            o.displayDetect();
                                        }
                                    }
                                    return false;
                                }).data("mouseupBind", true);
                            }
                        }
                    });

                    break;
                }
                case "focus": {
                    $(this).focus(function() {
                        var self = $(this);
                        setTimeout(function() {
                            init(s, self);
                            o.targetGet();
                        }, 200);
                    }).blur(function() {
                        o.flagDisplay = false;
                        setTimeout(function() {
                            o.displayDetect();
                        }, 190);
                    });
                    break;
                }
                default: {
                    init(s, $(this));
                    o.targetGet();
                    // 放置页面点击后显示的浮动内容隐掉
                    $(document).unbind("mouseup").data("mouseupBind", false);
                }
            }
        });
    };

    var o = {
        targetGet: function() {
            //一切显示的触发来源
            if (!this.trigger) { return this; }
            var attr = this.trigger.attr(this.s.targetAttr), target = typeof this.s.target == "function"? this.s.target.call(this.trigger): this.s.target;

            switch (this.s.targetMode) {
                case "common": {
                    if (target) {
                        var type = typeof(target);
                        if (type === "object") {
                            if (target.size()) {
                                o.target = target.eq(0);
                            }
                        } else if (type === "string") {
                            if ($(target).size()) {
                                o.target = $(target).eq(0);
                            }
                        }
                    } else {
                        if (attr && $("#" + attr).size()) {
                            o.target = $("#" + attr);
                        }
                    }
                    if (o.target) {
                        o.targetShow();
                    } else {
                        return this;
                    }

                    break;
                }
                case "ajax": {
                    //ajax元素，如图片，页面地址
                    var url = target || attr;
                    this.targetProtect = false;

                    if (!url) { return; }

                    if (!o.cacheData[url]) {
                        o.loading();
                    }

                    //优先认定为图片加载
                    var tempImage = new Image();

                    tempImage.onload = function() {
                        var w = tempImage.width, h = tempImage.height;
                        var winw = $(window).width(), winh = $(window).height();
                        var imgScale = w / h, winScale = winw / winh;
                        if (imgScale > winScale) {
                            //图片的宽高比大于显示屏幕
                            if (w > winw / 2) {
                                w = winw / 2;
                                h = w / imgScale;
                            }
                        } else {
                            //图片高度较高
                            if (h > winh / 2) {
                                h = winh / 2;
                                w = h * imgScale;
                            }
                        }
                        var imgHtml = '<img class="float_ajax_image" src="' + url + '" width="' + w + '" height = "' + h + '" />';
                        o.cacheData[url] = true;
                        o.target = $(imgHtml);
                        o.targetShow();
                    };
                    tempImage.onerror = function() {
                        //如果图片加载失败，两种可能，一是100%图片，则提示；否则作为页面加载
                        if (/(\.jpg|\.png|\.gif|\.bmp|\.jpeg)$/i.test(url)) {
                            o.target = $('<div class="float_ajax_error">图片加载失败。</div>');
                            o.targetShow();
                        } else {
                            $.ajax({
                                url: url,
                                success: function(data) {
                                    if (typeof(data) === "string") {
                                        o.cacheData[url] = true;
                                        o.target = $('<div class="float_ajax_data">' + data + '</div>');
                                        o.targetShow();
                                    }
                                },
                                error: function() {
                                    o.target = $('<div class="float_ajax_error">数据没有加载成功。</div>');
                                    o.targetShow();
                                }
                            });
                        }
                    };
                    tempImage.src = url;

                    break;
                }
                case "list": {
                    //下拉列表
                    var targetHtml = '<ul class="float_list_ul">',  arrLength;
                    if ($.isArray(target) && (arrLength = target.length)) {
                        $.each(target, function(i, obj) {
                            var list = "", strClass = "", text, href;
                            if (i === 0) {
                                strClass = ' class="float_list_li_first"';
                            }
                            if (i === arrLength - 1) {
                                strClass = ' class="float_list_li_last"';
                            }
                            if (typeof(obj) === "object" && (text = obj.text.toString())) {
                                if (href = (obj.href || "javascript:")) {
                                    list = '<a href="' + href + '" class="float_list_a">' + text + '</a>';
                                } else {
                                    list = text;
                                }
                            } else if (typeof(obj) === "string" && obj) {
                                list = obj;
                            }
                            if (list) {
                                targetHtml += '<li' + strClass + '>' + list + '</li>';
                            }
                        });
                    } else {
                        targetHtml += '<li class="float_list_null">列表无数据。</li>';
                    }
                    targetHtml += '</ul>';
                    o.target = $(targetHtml);
                    this.targetProtect = false;
                    o.targetShow();
                    break;
                }
                case "remind": {
                    //内容均是字符串
                    var strRemind = target || attr;
                    this.targetProtect = false;
                    if (typeof(strRemind) === "string") {
                        o.target = $('<span>' + strRemind + '</span>');
                        o.targetShow();
                    }
                    break;
                }
                default: {
                    var objOther = target || attr, type = typeof(objOther);
                    if (objOther) {
                        if (type === "string") {
                            //选择器
                            if (/^.[^:#\[\.,]*$/.test(objOther)) {
                                if ($(objOther).size()) {
                                    o.target = $(objOther).eq(0);
                                    this.targetProtect = true;
                                } else if ($("#" + objOther).size()) {
                                    o.target = $("#" + objOther).eq(0);
                                    this.targetProtect = true;
                                } else {
                                    o.target = $('<div>' + objOther + '</div>');
                                    this.targetProtect = false;
                                }
                            } else {
                                o.target = $('<div>' + objOther + '</div>');
                                this.targetProtect = false;
                            }

                            o.targetShow();
                        } else if (type === "object") {
                            if (!$.isArray(objOther) && objOther.size()) {
                                o.target = objOther.eq(0);
                                this.targetProtect = true;
                                o.targetShow();
                            }
                        }
                    }
                }
            }
            return this;
        },
        container: function() {
            //容器(如果有)重装target
            var cont = this.s.container, mode = this.s.targetMode || "mode";
            if (mode === "ajax" || mode === "remind") {
                //显示三角
                this.s.sharpAngle = true;
            } else {
                this.s.sharpAngle = false;
            }
            //是否反向
            if (this.s.reverseSharp) {
                this.s.sharpAngle = !this.s.sharpAngle;
            }

            if (mode !== "common") {
                //common模式无新容器装载
                if (cont === null) {
                    cont = "plugin";
                }
                if ( cont === "plugin" ) {
                    if (!$("#floatBox_" + mode).size()) {
                        $('<div id="floatBox_' + mode + '" class="float_' + mode + '_box"></div>').appendTo($("body")).hide();
                    }
                    cont = $("#floatBox_" + mode);
                }

                if (cont && typeof(cont) !== "string" && cont.size()) {
                    if (this.targetProtect) {
                        o.target.show().css("position", "static");
                    }
                    o.target = cont.empty().append(o.target);
                }
            }
            return this;
        },
        setWidth: function() {
            var w = this.s.width;
            if (w === "auto") {
                if (this.target.get(0).style.width) {
                    this.target.css("width", "auto");
                }
            } else if (w === "inherit") {
                this.target.width(this.trigger.width());
            } else {
                this.target.css("width", w);
            }
            return this;
        },
        targetHold: function() {
            if (this.s.hoverHold) {
                var delay = parseInt(this.s.hideDelay, 10) || 200;
                if (this.target) {
                    this.target.hover(function() {
                        o.flagDisplay = true;
                    }, function() {
                        if (o.timerHold) {
                            clearTimeout(o.timerHold);
                        }
                        o.flagDisplay = false;
                        o.targetHold();
                    });
                }

                o.timerHold = setTimeout(function() {
                    o.displayDetect.call(o);
                }, delay);
            } else {
                this.displayDetect();
            }
            return this;
        },
        loading: function() {
            this.target = $('<div class="float_loading"></div>');
            this.targetShow();
            this.target.removeData("width").removeData("height");
            return this;
        },
        displayDetect: function() {
            //显示与否检测与触发
            if (!this.flagDisplay && this.display) {
                this.targetHide();
                this.timerHold = null;
            }
            return this;
        },
        targetShow: function() {
            o.cornerClear();
            this.display = true;
            this.container().setWidth();
            this.target.show();
            if ($.isFunction(this.s.showCall)) {
                this.s.showCall.call(this.trigger, this.target);
            }
            return this;
        },
        targetHide: function() {
            this.display = false;
            this.targetClear();
            this.cornerClear();
            if ($.isFunction(this.s.hideCall)) {
                this.s.hideCall.call(this.trigger);
            }
            this.target = null;
            this.trigger = null;
            this.s = {};
            this.targetProtect = false;
            return this;
        },
        targetClear: function() {
            if (this.target) {
                if (this.target.data("width")) {
                    this.target.removeData("width").removeData("height");
                }
                if (this.targetProtect) {
                    //保护孩子
                    this.target.children().hide().appendTo($("body"));
                }
                this.target.unbind().hide();
            }
        },
        cornerClear: function() {
            if (this.corner) {
                //使用remove避免潜在的尖角颜色冲突问题
                this.corner.remove();
            }
        },
        target: null,
        trigger: null,
        s: {},
        cacheData: {},
        targetProtect: false
    };

    $.powerFloat = {};
    $.powerFloat.hide = function() {
        o.targetHide();
    };

    var defaults  = {
        width: "auto", //可选参数：inherit，数值(px)
        offsets: {
            x: 0,
            y: 0
        },
        zIndex: 999,

        eventType: "hover", //事件类型，其他可选参数有：click, focus

        showDelay: 0, //鼠标hover显示延迟
        hideDelay: 0, //鼠标移出隐藏延时

        hoverHold: true,
        hoverFollow: false, //true或是关键字x, y

        targetMode: "common", //浮动层的类型，其他可选参数有：ajax, list, remind
        target: null, //target对象获取来源，优先获取，如果为null，则从targetAttr中获取。
        targetAttr: "rel", //target对象获取来源，当targetMode为list时无效

        container: null, //转载target的容器，可以使用"plugin"关键字，则表示使用插件自带容器类型
        //reverseSharp: false, //是否反向小三角的显示，默认ajax, remind是显示三角的，其他如list和自定义形式是不显示的

        //position: "4-1", //trigger-target
        edgeAdjust: true, //边缘位置自动调整

        showCall: $.noop,
        hideCall: $.noop

    };
})(jQuery);