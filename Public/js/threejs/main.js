var Printer = function (_config) {
    this.config = {
        distanceP: 2,
        uid: 0,
        clientid: "",
        uploadUrl:"",
        isAutoConnect: true
    };
    $.extend(this.config, _config);

    this.mid = 0;
    this.localData = null;
    this.localFilename = "";
    this.heartBeatTime = 0;
    this.heartBeatFrequency = 500;
    this.heartBeatHandler = null;

    this.thingiview = null;
    this.socket = null;
    this.isAutoConnect = this.config.isAutoConnect;
    this.isConnecting = false;
    this.isLogin = false;
    this.isConnectedServer = false;
    this.isConnectedPrinter = false;
    this.isManual = false;//是否手动操作
    this.printerName = "";
    this.printerVersion = 0;// 打印机代数
    this.printerDepth = 150;
    this.printerHeight = 150;
    this.printerWidth = 150;
    this.timestamp = 0;
    this.printFileSize = 0;
    this.printStatu = -1;
    this.ReadyToPrint = 1;
    this.tarTemp = 0;// 目标温度
    this.extrudeSpeed = 0;// 流量 百分比
    this.printSpeed = 0;// 速度 百分比
    this.fanSpeed1 = 0;// 底层风扇速度 百分比
    this.fanSpeed2 = 0;// 打印风扇速度 百分比
    this.printTotalSize = 0; //打印文件总大小

    this.showStatusTimer = null;
    this.timer = null;
    this.start_timer = null;
    this.isIgnore = false;
    this.printTime = 0;
    this.printerInfo = null;
    this.getPrinterCameraHandler = null;
    this.getPrinterCameraTime = 2000;
    this.stlData = null;

    this.init();
}

Printer.prototype.setUser = function (obj) {
    if (obj && obj.uid) {
        this.config.uid = obj.uid;
        this.config.clientid = "web_"+obj.uid;
    }
    //window.parent.setUserInfo(obj);
}

Printer.prototype.showDialog = function(content, isShowStatus) {
    if (typeof(isShowStatus) == "undefined") {
        isShowStatus = true;
    }
    window.dialog({id:'status-dialog', title: '提示',content:content,quickClose: true,okValue: '关闭',ok: function () {}}).showModal();
    if (isShowStatus) {
        this.showStatus(content, false);
    }
}
Printer.prototype.showStatus = function(content, isShowDialog) {
    if (typeof(isShowDialog) == "undefined") {
        isShowDialog = false;
    }
    parent.$('#statuLog').html(content);
    if (isShowDialog == true) {
        this.showDialog(content, false);
    }
    /*var parent = this;
     if (this.showStatusTimer) {
     clearTimeout(this.showStatusTimer);
     }
     $('#statuLog').text(log);
     $('#statusbar').show();
     this.showStatusTimer = setTimeout(function() {
     $('#statusbar').fadeOut();
     }, 1000);*/
}

Printer.prototype.checkUserLogin = function(e) {
    if (this.config.uid > 0) {
        return true;
    } else {
        this.loginDialog.showModal();
        return false;
    }
}

Printer.prototype.bindDomEvent = function () {
    var parent = this;

    this.loginDialog = window.dialog({
        id: 'login-dialog',
        title:'请先登录打印啦',
        content: document.getElementById('login-block'),
        drag: false,
        width: 540,
        fixed: true,
        okValue: '登陆',
        ok: function () {
            var dig = this;
            $.ajax({
                url:$('#login-block form').attr('action'),
                data:$('#login-block form').serialize(),
                type:'POST',
                dataType:'json',
                success:function(obj) {
                    if (obj.errorCode != 0) {
                        parent.showDialog(obj.msg, false);
                    } else {
                        parent.setUser(obj);
                        dig.close();
                    }
                },
                error:function(XHR) {
                    alert(XHR.responseText);
                }
            });
            return false;
        },
        cancelValue:'取消',
        cancel: function () {
            this.close();
            return false;
        },
        onshow: function () {
            $('#login-block form')[0].reset();
        }
    });
    /*
     $('.am-tabs-nav a').eq(2).on('click.tabs.amui', function(e) {
     if (!parent.thingiview.mainModel) {
     parent.showDialog("请先载入3D模型", false);
     return false;
     }
     return true;
     });
     */
    $('.am-tabs-nav a').eq(2).on('opened.tabs.amui', function(e) {
        if (!parent.checkUserLogin(e)) {
            return;
        }
        if (!parent.isConnectedServer) {
            parent.showStatus("正在连接服务器，请稍候…");
        }
        parent.dropdown('.J_PrinterSn','.Js_PrinterList','click');
    });

    $(document).on('click','#Js_showToggle',function(e){
        e.preventDefault();
        var panel =document.getElementById('Js_showTogglePanel');
        panel.style.display=="none" ? panel.style.display="" : panel.style.display="none";
        panel.style.display=="none" ? $(this).html('显示更多参数 <i class="iconfont">&#xe640;</i>') : $(this).html('隐藏更多参数 <i class="iconfont">&#xe63d;</i>');

    });
    $(document).on('click','#J_Adjust',function(){
        var elem = document.getElementById('J_AdjustBox');
        var fanSpeed1 = parent.fanSpeed1,
            fanSpeed2 = parent.fanSpeed2,
            tarTemp = parent.tarTemp,
            printSpeed = parent.printSpeed;
        window.dialog({
            id: 'print-adjust',
            content: elem,
            drag: false,
            width: 400,
            fixed: true,
            okValue: '确定',
            ok: function () {
                var fan_value1 = $('#J_FanValue1').val(),
                    fan_value2 = $('#J_FanValue2').val();
                if(fanSpeed1 != fan_value1 || fanSpeed2 != fan_value2){
                    parent.send('APPTo3D:M106 ' + fan_value1 + " " + fan_value2);
                }
                var temp_value = $('#J_TempValue').val();
                if(tarTemp != temp_value){
                    parent.send('APPTo3D:M104 T0 S ' + temp_value);
                    parent.send('APPTo3D:M105');
                    //alert(tarTemp+'!!!'+temp_value);
                }
                var speed_value = $('#J_SpeedValue').val();
                if(printSpeed != speed_value){
                    parent.send('APPTo3D:M220 S' + speed_value);
                    parent.send('APPTo3D:M254 T2');
                }
                this.remove();
            },
            onshow: function () {
                $('#J_CurFanValue1').text(fanSpeed1);
                $('#J_CurFanValue2').text(fanSpeed2);
                $('#J_FanValue1').val(fanSpeed1);
                $('#J_FanValue2').val(fanSpeed2);
                $('#J_TarTemp').text(tarTemp);
                $('#J_TempValue').val(tarTemp);
                $('#J_CurSpeed').text(printSpeed);
                $('#J_SpeedValue').val(printSpeed);
                $(document).on('change', "#J_FanValue1",  function () { //调整底层风扇速度
                    var cur_value = $(this).val();
                    $('#J_CurFanValue1').text(cur_value);
                });
                $(document).on('change', "#J_FanValue2",  function () { //调整打印风扇速度
                    var cur_value = $(this).val();
                    $('#J_CurFanValue2').text(cur_value);
                });
                $(document).on('change', "#J_TempValue",  function () {
                    var cur_value = $(this).val();
                    $('#J_TarTemp').text(cur_value);
                });
                $(document).on('change', "#J_SpeedValue",  function () {
                    var cur_value = $(this).val();
                    $('#J_CurSpeed').text(cur_value);
                });
            }
        }).showModal();
    });
    $(document).on('click', '#J_cameraTop', function () {
        parent.thingiview.topCamera();
    });
    $(document).on('click', '#J_cameraSide', function () {
        parent.thingiview.sideCamera();
    });
    $(document).on('click', '#J_cameraFront', function () {
        parent.thingiview.frontCamera();
    });
    $(document).on('click', '#J_zoom', function () {
        parent.thingiview.resetCamera();
    });
    $(document).on('click', '#qrCode', function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                // this.showStatus(result);
                $('.J_PrinterSn').val(result);
            }
        });
    });
    $(document).on('click', '#connectServer, .reconnectServer', function () {
        parent.connectServer();
        return false;
    });
    $(document).on('click', '#disConnectServer', function () {
        parent.disConnectServer();
        return false;
    });
    $(document).on('click', '#connectPrinter', function () {
        parent.connectPrinter();
        return false;
    });
    $(document).on('click', '#disConnectPrinter', function () {
        parent.disConnectPrinter();
        return false;
    });

    $(document).on('click', '#readyToPrint', function (e) {
        if (!parent.checkUserLogin(e)) {
            return;
        }
        if (!parent.isConnectedServer) {
            parent.showDialog("请先连接服务器，<a class='reconnectServer' href='#'>点击连接服务器</a>", false);
            return;
        }
        if (!parent.isConnectedPrinter) {
            var elem = document.getElementById('bind-printer');
            parent.dropdown('.J_PrinterSn','.Js_PrinterList','click');
            window.dialog({
                id: 'ready-printer-dialog',
                title: "请先连接3D打印机",
                content: elem,
                drag: false,
                width: 500,
                fixed: true
            }).showModal();
            return;
        }
        if (parent.printStatu <= 0 && !parent.thingiview.mainModel) {
            parent.showDialog("请先选择模型", false);
            return;
        }
        var elem = document.getElementById('prePrintBlock');
        window.dialog({
            id: 'ready-to-print-dialog',
            title: "打印模型",
            content: elem,
            drag: true,
            onshow: function () {
                $('#print').prop("disabled", false);
                $('#print').text('开始打印').addClass('btn-danger');
            },
            width: 620,
            fixed: true
        }).showModal();
    });
    $(document).on('click', '#J_operatePrinter', function (e) {
        if (!parent.checkUserLogin(e)) {
            return;
        }
        if (!parent.isConnectedServer) {
            parent.showDialog("请先连接服务器，<a class='reconnectServer' href='#'>点击连接服务器</a>");
            return;
        }
        if (!parent.isConnectedPrinter) {
            var elem = document.getElementById('bind-printer');
            parent.dropdown('.J_PrinterSn','.Js_PrinterList','click');
            window.dialog({
                id: 'operate-connect-dialog',
                title: "请先连接3D打印机",
                content: elem,
                drag: false,
                width: 500,
                fixed: true
            }).showModal();
            return;
        }
        if(parseInt(parent.printStatu)!=0){
            window.dialog({title: '提示',content:'正在打印，无法进行此操作',quickClose: true,okValue: '关闭',ok: function () {}}).showModal();
            return;
        }

        var elem = document.getElementById('operate-printer');
        window.dialog({
            id: 'operate-printer-dialog',
            title: "操作打印机",
            content: elem,
            drag: false,
            width: 500,
            height:240,
            fixed: true
        }).showModal();
    });
    $(document).on('click', '#J_lookPrinter', function (e) {
        if (!parent.checkUserLogin(e)) {
            return;
        }
        if (!parent.isConnectedServer) {
            parent.showDialog("请先连接服务器，<a class='reconnectServer' href='#'>点击连接服务器</a>");
            return;
        }
        if (!parent.isConnectedPrinter) {
            var elem = document.getElementById('bind-printer');
            parent.dropdown('.J_PrinterSn','.Js_PrinterList','click');
            window.dialog({
                id: 'operate-connect-dialog',
                title: "请先连接3D打印机",
                content: elem,
                drag: false,
                width: 500,
                fixed: true
            }).showModal();
            return;
        }

        var elem = document.getElementById('look-printer');
        window.dialog({
            id: 'look-printer-dialog',
            title: "查看打印机",
            content: elem,
            drag: false,
            width: 400,
            height:400,
            fixed: true,
            onshow: function () {
                if (parent.getPrinterCameraHandler) {
                    clearInterval(parent.getPrinterCameraHandler);
                }
                parent.getPrinterCameraHandler = setInterval(function() {
                    if (parent.isConnectedPrinter) {
                        parent.send("APPTo3D:TakePhoto:");
                    }
                }, parent.getPrinterCameraTime);
            },
            onclose: function () {
                if (parent.getPrinterCameraHandler) {
                    clearInterval(parent.getPrinterCameraHandler);
                }
            }
        }).showModal();
    });
    $(document).on('click', '#J_bindPrinter', function (e) {
        if (!parent.checkUserLogin(e)) {
            return;
        }
        var elem = document.getElementById('bind-printer');
        parent.dropdown('#bind-printer-content .J_PrinterSn','#bind-printer-content .Js_PrinterList','click');
        window.dialog({
            id: 'connect-printer-dialog',
            title: "请先连接3D打印机",
            content: elem,
            drag: false,
            width: 500,
            fixed: true
        }).showModal();
    });
    $(document).on('click', '#stopPrint', function () {
        window.dialog({
            id: 'print-adjust',
            content: '确定要取消打印吗？',
            drag: false,
            width: 400,
            fixed: true,
            cancelValue: '取消',
            cancel: function () {},
            okValue: '确定',
            ok: function () {
                parent.showStatus("正在停止打印，请稍候…");
                parent.send("StopPrint:");
                $('#print').prop("disabled", false);
                $('#print').text('开始打印').addClass('btn-danger');
            },
        }).showModal();
    });
    $(document).on('click', '#print', function () {
        if (!parent.isConnectedServer) {
            parent.showDialog("请先连接服务器，<a class='reconnectServer' href='#'>点击连接服务器</a>", false);
            return;
        }
        if (!parent.isConnectedPrinter) {
            parent.showDialog("请先连接3D打印机", false);
            return;
        }
        if (!parent.thingiview.mainModel) {
            parent.showDialog("请先选择模型", false);
            return;
        }
        if (parent.mid) {
            parent.startPrint(false);
        } else if (parent.localData) {
            parent.showStatus("正在上传模型数据，请稍候…");
            var fd = new FormData();
            fd.append('name', parent.localFilename);
            fd.append('stl', new Blob([ parent.thingiview.StlBinaryData() ], {
                type : 'text/plain'
            }), parent.localFilename + ".stl");
            var xhr = new XMLHttpRequest();

            xhr.open('POST', parent.config.uploadUrl, true); // 异步传输
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.upload.onprogress = function (ev) {
                var percent = 0;
                // if(ev.lengthComputable) {
                percent = 100 * ev.loaded / ev.total;
                console.log(percent + '%');
                // }
            }
            xhr.upload.onloadend = function (ev) {
                console.log("onloadend=>");
            };
            xhr.onload = function (e) {
                if (this.status == 200 && !isNaN(this.responseText)) {
                    console.log(this.responseText);
                    parent.mid = parseInt(this.responseText);
                    parent.startPrint(true);
                    window.location.hash = parent.mid;
                } else {
                    alert(this.responseText);
                }
            };
            xhr.upload.onerror = function (status, statusText) {
                console.log(status, statusText);
                alert(status + statusText);
            };
            xhr.send(fd);
        }

    });

    $(document).on('click','#J_rotation_x',function(){
        parent.thingiview.rotation("X", true);
    }).on('click','#J_rotation_y',function(){
        parent.thingiview.rotation("Y", true);
    }).on('click','#J_rotation_z',function(){
        parent.thingiview.rotation("Z", true);
    }).on('click','#J_rotation_reset',function(){
        parent.thingiview.rotation();
    }).on('click','#J_rotation_xplus',function(){
        parent.thingiview.rotation("X", true, 1);
    }).on('click','#J_rotation_xminus',function(){
        parent.thingiview.rotation("X", false, 1);
    }).on('click','#J_rotation_yplus',function(){
        parent.thingiview.rotation("Y", true, 1);
    }).on('click','#J_rotation_yminus',function(){
        parent.thingiview.rotation("Y", false, 1);
    }).on('click','#J_rotation_zplus',function(){
        parent.thingiview.rotation("Z", true, 1);
    }).on('click','#J_rotation_zminus',function(){
        parent.thingiview.rotation("Z", false, 1);
    });

    $(document).on('mousedown', '.mouseevent', function () {
        // 延迟两秒
        var id = $(this).attr("id");

        switch (id) {
            case "xleft":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {

                        parent.send('APPTo3D:G91');
                        parent.send('APPTo3D:G0 F750 X3 Y0 Z0');
                        parent.send('APPTo3D:G90');

                    }, 250)

                }, 0);
                break;
            case "xright":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {

                        parent.send('APPTo3D:G91');
                        parent.send('APPTo3D:G0 F750 X-3 Y0 Z0');
                        parent.send('APPTo3D:G90');

                    }, 250)

                }, 0);
                break;
            case "yin":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {

                        parent.send('APPTo3D:G91');
                        parent.send('APPTo3D:G0 F750 X0 Y-3 Z0');
                        parent.send('APPTo3D:G90');

                    }, 250)

                }, 0);
                break;
            case "yout":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {

                        parent.send('APPTo3D:G91');
                        parent.send('APPTo3D:G0 F750 X0 Y3 Z0');
                        parent.send('APPTo3D:G90');

                    }, 250)

                }, 0);
                break;
            case "zup":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {

                        parent.send('APPTo3D:G91');
                        parent.send('APPTo3D:G0 F250 X0 Y0 Z-1');
                        parent.send('APPTo3D:G90');

                    }, 250)

                }, 0);
                break;
            case "zdown":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {

                        parent.send('APPTo3D:G91');
                        parent.send('APPTo3D:G0 F250 X0 Y0 Z1');
                        parent.send('APPTo3D:G90');

                    }, 250)

                }, 0);
                break;
            case "J_rotation_x_jia":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.rotation("X", true);
                    }, 150)
                }, 0);
                break;
            case "J_rotation_x_jian":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.rotation("X", false);
                    }, 150)
                }, 0);
                break;
            case "J_rotation_y_jia":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.rotation("Y", true);
                    }, 150)
                }, 0);
                break;
            case "J_rotation_y_jian":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.rotation("Y", false);
                    }, 150)
                }, 0);
                break;
            case "J_rotation_z_jia":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.rotation("Z", true);
                    }, 150)
                }, 0);
                break;
            case "J_rotation_z_jian":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.rotation("Z", false);
                    }, 150)
                }, 0);
                break;
            case "J_move_x_jia":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.move("X", true);
                    }, 20)
                }, 0);
                break;
            case "J_move_x_jian":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.move("X", false);
                    }, 20)
                }, 0);
                break;
            case "J_move_y_jia":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.move("Y", true);
                    }, 20)
                }, 0);
                break;
            case "J_move_y_jian":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.move("Y", false);
                    }, 20)
                }, 0);
                break;
            case "J_move_z_jia":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.move("Z", true);
                    }, 20)
                }, 0);
                break;
            case "J_move_z_jian":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.move("Z", false);
                    }, 20)
                }, 0);
                break;
            case "J_zoomA":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.zoomCamera(true);
                    }, 50)
                }, 0);
                break;
            case "J_zoomB":
                parent.start_timer = setTimeout(function () {
                    parent.timer = setInterval(function () {
                        parent.thingiview.zoomCamera(false);
                    }, 50)
                }, 0);
                break;
        }
    });

    $(document).on('change','#modelZoom_range',function(){ //缩放拖动条
        var val = $(this).val();
        parent.thingiview.zoom(val);
        $('#modelWidth').val(parent.thingiview.modelWidth.toFixed(2));
        $('#modelHeight').val(parent.thingiview.modelHeight.toFixed(2));
        $('#modelDeep').val(parent.thingiview.modelDeep.toFixed(2));
        $('#modelScale').val((parent.thingiview.scale * 100).toFixed(2));
    });


    $(document).on('keyup','#J_scale input',function(){
        var value = /^(([0-9]+[\.]?[0-9\.]{1,2})|[0-9])$/.test($(this).val());
        if(!value){
            $(this).val($(this).val().replace(/[^\d\.]/g,''));
            $('.warning-text').show();
            return false;
        }else{
            $('.warning-text').hide();
        }
    }).on('change','#J_scale input',function(){ //修改模型宽度
        var val = $.trim($(this).val()),
            modelWidth = parent.thingiview.modelWidth,
            modelHeight = parent.thingiview.modelHeight,
            modelDeep = parent.thingiview.modelDeep,
            scale = parent.thingiview.scale,
            percent,id = $(this).attr("id");
        switch (id) {
            case "modelWidth": percent = val / modelWidth * scale; parent.thingiview.zoom(percent);
                break;
            case "modelHeight": percent = val / modelHeight * scale; parent.thingiview.zoom(percent);
                break;
            case "modelDeep": percent = val / modelDeep * scale; parent.thingiview.zoom(percent);
                break;
            case "modelScale": percent = val / 100; parent.thingiview.zoom(percent);
                break;
        }
        $('#modelWidth').val(parent.thingiview.modelWidth.toFixed(2));
        $('#modelHeight').val(parent.thingiview.modelHeight.toFixed(2));
        $('#modelDeep').val(parent.thingiview.modelDeep.toFixed(2));
        $('#modelScale').val((parent.thingiview.scale * 100).toFixed(2));
        $('#modelZoom_range').val(parent.thingiview.scale);
    });
    $(document).on('mousedown', '#J_scale input', function(event) {
        if (!parent.thingiview.mainModel) {
            return;
        }
        var onMouseDownValue = parseFloat($(this).val());
        var distance = 0;
        var prePointer = [event.clientX, event.clientY];
        var p = $(this);
        $(document).bind('mousemove.slider', function(event) {
            var currentValue = $(this).val();
            var pointer = [event.clientX, event.clientY];
            distance += (pointer[0] - prePointer[0]) - (pointer[1] - prePointer[1]);
            var number = onMouseDownValue + (distance/(event.shiftKey ? 5 : 50)) * 1;
            console.log(number);
            p.val(number.toFixed(2));
            p.trigger('change');
            prePointer = [event.clientX, event.clientY];
        }).bind('mouseup.slider', function(event) {
            $(document).unbind('mousemove.slider').unbind('mouseup.slider');
        });
    });
    $(document).on('click', '#modelZoom_max',  function () { //模型放大
        if (!parent.thingiview.mainModel) {
            return;
        }
        parent.thingiview.zoomMax();
        $('#modelWidth').val(parent.thingiview.modelWidth.toFixed(2));
        $('#modelHeight').val(parent.thingiview.modelHeight.toFixed(2));
        $('#modelDeep').val(parent.thingiview.modelDeep.toFixed(2));
        $('#modelZoom_range').val(parent.thingiview.scale);
        $('#modelScale').val((parent.thingiview.scale * 100).toFixed(2));
    });
    $(document).on('click', '#modelZoom_reset',  function () { //模型重置
        if (!parent.thingiview.mainModel) {
            return;
        }
        parent.thingiview.zoomReset();
        $('#modelWidth').val(parent.thingiview.modelWidth.toFixed(2));
        $('#modelHeight').val(parent.thingiview.modelHeight.toFixed(2));
        $('#modelDeep').val(parent.thingiview.modelDeep.toFixed(2));
        $('#modelZoom_range').val(parent.thingiview.scale);
        $('#modelScale').val((parent.thingiview.scale * 100).toFixed(2));
    });

    $(document).bind("mouseup", function () {
        // 清除启动器
        if (parent.start_timer) {
            clearTimeout(parent.start_timer);
        }
        // 清除间隔启动器
        if (parent.timer) {
            clearInterval(parent.timer);
        }
    });

    $(document).on('click', '#xzero', function () {
        parent.send('APPTo3D:G28 X0');
    });
    $(document).on('click', '#yzero', function () {
        parent.send('APPTo3D:G28 Y0');
    });
    $(document).on('click', '#xyzero', function () {
        parent.send('APPTo3D:G28 X0 Y0');
    });
    $(document).on('click', '#zzero', function () {
        parent.send('APPTo3D:G28 Z0');
    });
    $(document).on('click', '#wendujia',  function () {
        if (parent.tarTemp > 100 && parent.tarTemp < 400) {
            parent.tarTemp += 10;
            parent.send('APPTo3D:M104 T0 S' + parent.tarTemp);
            parent.send('APPTo3D:M105');
        }
    });
    $(document).on('click', '#wendujian',  function () {
        if (parent.tarTemp > 100) {
            parent.tarTemp -= 10;
            parent.send('APPTo3D:M104 T0 S' + parent.tarTemp);
            parent.send('APPTo3D:M105');
        }
    });
    $(document).on('click', '#sudujia',  function () {
        if (parent.printSpeed > 10 && parent.printSpeed < 1000) {
            parent.printSpeed += 10;
            parent.send('APPTo3D:M220 S' + parent.printSpeed);
            parent.send('APPTo3D:M254 T2');
        }
    });
    $(document).on('click', '#sudujian',  function () {
        if (parent.printSpeed > 10) {
            parent.printSpeed -= 10;
            parent.send('APPTo3D:M220 S' + parent.printSpeed);
            parent.send('APPTo3D:M254 T2');
        }
    });
    $(document).on('click', '#liuliangjia',  function () {
        if (parent.extrudeSpeed > 10 && parent.extrudeSpeed < 1000) {
            parent.extrudeSpeed += 10;
            parent.send('APPTo3D:M221 S' + parent.extrudeSpeed);
            parent.send('APPTo3D:M254 T3');
        }
    });
    $(document).on('click', '#liuliangjian',  function () {
        if (parent.extrudeSpeed > 10) {
            parent.extrudeSpeed -= 10;
            parent.send('APPTo3D:M221 S' + parent.extrudeSpeed);
            parent.send('APPTo3D:M254 T3');
        }
    });


    window.onbeforeunload = function () {
        parent.disConnectServer();
    };
}

Printer.prototype.init = function () {
    var parent = this;
    this.thingiview = new Thingiview(this.config.containerWidth, this.config.containerHeight, this.showStatus, this.config.distanceP, this);
    this.bindDomEvent();
    if (this.isAutoConnect) {
        this.connectServer();
        this.heartBeatHandler = setTimeout(function () {
            parent.heartBeat();
        }, this.heartBeatFrequency);
    }

}


Printer.prototype.startPrint = function (isLocalData) {
    var parent = this;
    var p = 1;
    /*
     //机器最小值
     var minS = Math.min(parent.printerDepth, parent.printerWidth, parent.printerHeight);
     //模型最大值
     var curS = Math.max(parent.thingiview.modelWidth, parent.thingiview.modelHeight, parent.thingiview.modelDeep);
     if (curS > minS) {
     p = 1.0 * minS / curS;
     }
     */
//    var m4 = parent.thingiview.mainModel.matrix.elements;
    //var p = 1.0 * minS / parent.thingiview.size;
//
//    var m = m4[0] * p + "," + m4[4] + "," + m4[8] + "," + m4[1] + "," + m4[5] * p + "," + m4[9] + "," + m4[2] + "," + m4[6] + "," + m4[10] * p;
    var mat = parent.thingiview.mainModel.matrix;
    mat.getInverse (mat);
    var position = new THREE.Vector3(), quaternion = new THREE.Quaternion(), scale = new THREE.Vector3();
    mat.decompose(position, quaternion, scale);
    //  console.log(position, quaternion, scale);
    mat.compose(new THREE.Vector3(), quaternion, parent.thingiview.mainModel.scale);
    // mat.decompose(position, quaternion, scale);
    // console.log(position, quaternion, scale);
    var m4 = mat.elements;
    var m = m4[0] * p + "," + m4[4] + "," + m4[8] + "," + m4[1] + "," + m4[5] * p + "," + m4[9] + "," + m4[2] + "," + m4[6] + "," + m4[10] * p;

    if (isLocalData) {
        m = "1,0,0,0,1,0,0,0,1";
    }
    var cmd = "APPPrint:{\"id\":\"" + parent.mid + "\",";
    cmd += "\"uid\":\"" + parent.config.uid + "\",";
    cmd += "\"ctype\":\"" + 2 + "\",";
    $('input,select', '#sliceParams').each(function () {
        cmd += "\"" + $(this).attr('name') + "\":\"" + $(this).val() + "\",";
    });

    cmd += "\"m\":\"" + m + "\"}";
    console.log(cmd);

    parent.showStatus("正在发送打印数据，请稍候…");
    parent.send(cmd);


    parent.ReadyToPrint = 1;
    $('#print').attr('disabled','disabled');
    $('#print').text('正在切片，请稍等').removeClass('btn-danger');
}
Printer.prototype.loadModel = function (id) {
    var parent = this;
    this.mid = id;
    this.localData = null;
    $.ajax({
        url:"/m/stlurl",
        data:{id:id},
        dataType:'JSON',
        success:function(obj) {
            parent.stlData = obj;
            parent.thingiview.loadModel(obj.big_stl, parent.loadModelSuccess);
            $('#sliceParams input[name=fill_density]').val(obj.upload_type == '1' ? 100 : 10);
            //$('#sliceParams select[name=support]').val(obj.upload_type == '1' ? 0 : 1);
        }
    });
}

Printer.prototype.loadLocalModel = function () {
    var parent = this;
    this.mid = 0;
    this.stlData = null;
    this.localData = localStorage.getItem("local");
    this.localFilename = localStorage.getItem("localName");
    try {
        var geometry = parent.thingiview.loader.parse(this.localData);
        parent.thingiview.addModel(geometry);
        parent.loadModelSuccess(parent.thingiview);
    } catch(e) {
        alert("文件错误或者不支持该文件类型，您可以打开 stl 类型的文件.");
        this.localData = null;
    }
}

Printer.prototype.loadModelSuccess = function (thingiview) {
    if (thingiview.printer.stlData && thingiview.printer.stlData.upload_type == 8 && Math.max(Math.max(thingiview.modelWidth, thingiview.modelHeight), thingiview.modelDeep) < 10) {
        thingiview.zoom(10);
        thingiview.rotation("X", true);
    }

    var rangeInput = $('#modelZoom_range'),
        modelScale = thingiview.scale * 100;
    rangeInput.attr('min', thingiview.scaleMin);
    rangeInput.attr('max', thingiview.scaleMax);
    rangeInput.attr('step', (thingiview.scaleMax - thingiview.scaleMin)/100);
    rangeInput.attr('disabled', false);
    rangeInput.val(thingiview.scale);

    $('#modelWidth').val(thingiview.modelWidth.toFixed(2));
    $('#modelHeight').val(thingiview.modelHeight.toFixed(2));
    $('#modelDeep').val(thingiview.modelDeep.toFixed(2));
    $('#modelZoom_range').val(thingiview.scale);
    $('#modelScale').val(modelScale.toFixed(2));
    //$('.actionbar-block').show();
    //待删除
    $(document).on('click','.actionbar-icon a',function(){
        var _pannel = $(this).next('.actionbar-pannel');
        if(_pannel.is(':visible')) {
            _pannel.hide();return;
        }
        $(this).addClass('active').siblings().removeClass('active');
        $('.actionbar-pannel').not(_pannel).hide();
        _pannel.show();
    });


}

Printer.prototype.connectServer = function () {
    var parent = this;
    if (this.isConnectedServer || this.isConnecting) {
        return;
    }
    if (parent.config.uid > 0 && parent.config.clientid ) {
        this.showStatus("正在连接服务器...");
        this.isConnectedServer = false;
        this.isConnectedPrinter = false;
        this.isConnecting = true;
        this.isLogin = false;
        this.isAutoConnect = true;
        this.checkButtonStatus();
        try {
            this.socket = new WebSocket("ws://connect.iceman3d.net:28867");
            this.socket.onopen = function (msg) {
                parent.isConnectedServer = true;
                parent.isConnectedPrinter = false;
                parent.isConnecting = false;
                parent.isLogin = false;
                parent.showStatus("正在登录...");
                parent.socket.send("APPLogin:" + parent.config.clientid + "|1|"+parent.config.uid+"\n");
                parent.checkButtonStatus();
            };
            this.socket.onmessage = function (msg) {
                parent.timestamp = new Date().getTime();
                parent.onData(msg.data);
            };
            this.socket.onclose = function (msg) {
                parent.isConnectedServer = false;
                parent.isConnectedPrinter = false;
                parent.isConnecting = false;
                parent.isLogin = false;
                parent.checkButtonStatus();

            };
        } catch (ex) {
            this.log(ex);
            this.isConnecting = false;
        }
    }
}

Printer.prototype.disConnectServer = function () {
    if (this.isConnectedServer && this.socket != null) {
        try {
            this.send('APPOut:');
            this.socket.close();
            this.socket = null;
        }
        catch (ex) {
            this.log(ex);
        }
    }
    this.isConnectedServer = false;
    this.isConnectedPrinter = false;
    this.isConnecting = false;
    this.isLogin = false;
}

Printer.prototype.connectPrinter = function () {
    if (this.isConnectedServer && !this.isConnectedPrinter) {
        this.printerName = $('.J_PrinterSn').val();
        if (this.printerName == "") {
            this.showDialog("请填写3D打印机序列号");
            return;
        }
        this.isManual = true;
        this.showStatus("正在连接3D打印机");
        this.send("APPConnect3D:" + this.config.uid + "|" + this.printerName);
    } else if (!this.isLogin) {
        this.showDialog("请先登录打印啦");
    }else if (!this.isConnectedServer) {
        this.showDialog("正在连接服务器，请稍候…");
    }
}

Printer.prototype.disConnectPrinter = function () {
    var parent = this;
    if (this.isConnectedServer && this.isConnectedPrinter) {
        window.dialog({
            title: '是否断开打印机',
            content:'断开打印机，您将无法查看打印状态',
            cancelValue: '取消',
            cancel: function () {window.dialog.get('connect-printer-dialog').close()},
            okValue: '确定',
            ok: function () {
                parent.showStatus("正在断开打印机");
                parent.isManual = true;
                parent.send("APPDisConnect3D:" + parent.config.uid + "|" + parent.printerName);
            }
        }).showModal();
    }
}

Printer.prototype.checkButtonStatus = function () {
    var parent = this;
    $('#connectServer').attr('disabled', this.isConnectedServer || this.isConnecting);
    $('#disConnectServer').attr('disabled', !this.isConnectedServer || this.isConnecting);
    $('#qrCode').attr('disabled', !this.isConnectedServer || this.isConnectedPrinter);
    $('#connectPrinter').attr('disabled', !this.isConnectedServer || this.isConnectedPrinter);
    $('#disConnectPrinter').attr('disabled', !this.isConnectedServer || !this.isConnectedPrinter);
    $('.J_PrinterSn').attr('disabled', !this.isConnectedServer || this.isConnectedPrinter);
    $('.printButtonStatus button').each(function () {
        $(this).attr('disabled', !parent.isConnectedServer || !parent.isConnectedPrinter);
    });
}

Printer.prototype.checkPrintStatu = function (_printStatu) {
    _printStatu = parseInt(_printStatu);
    if (this.printStatu != _printStatu) {
        if (_printStatu <= 0) {
            $('#printingBlock').hide();
            if (this.isConnectedPrinter) {
                $( "#printBlock" ).show( "normal", function() {
                    $('#print').prop("disabled", false);
                    $('#print').text('开始打印').addClass('btn-danger');
                });
            }
        } else {
            $('#printingBlock').show();
            $('#printBlock').hide();
            $('#progress1').css("width", 0);
            $('#progress2').css("width", 0);
        }

        this.printStatu = _printStatu;
    }
}

Printer.prototype.log = function (msg) {
    console.log(msg);
}

Printer.prototype.dropdown = function (source,target,event) {
    if(source==null || target==null) {
        return;
    }
    $(source).powerFloat({
        target: $(target),
        eventType: event,
        showCall: function () {
            $(this).addClass("show");
        },
        hideCall: function () {
            $(this).removeClass("show");
        }
    });
}

Printer.prototype.setPrinterInfo = function(obj) {//参考goods_sn表
    this.printerInfo = obj;
    //console.log(obj);
    if (obj.has_camera == "1") {
        $('#J_lookPrinter').show();
    } else {
        $('#J_lookPrinter').hide();
    }
}

Printer.prototype.onData = function (msg) {
    var parent = this;
    //this.log(msg);
    if (msg.indexOf("BEAT:") == 0) {
        //this.showStatus("");
        if (msg.indexOf("|") > 0) {
            var _data = msg.substring(5).split("|");
            if (_data.length > 3) {
                if (this.isIgnore) {
                    this.isIgnore = false;
                } else {
                    this.checkPrintStatu(_data[2]);
                }
            }
            if (_data.length >= 8) {
                $('#tarTemp').text(_data[0]);
                $('#curTemp').text(_data[1]);
                $('#printMode').text(_data[2] > 0 ? "正在打印" : "当前空闲");
                $('#extrudeSpeed').text(_data[3] + " %");
                $('#currentZ').text(_data[4]);
                $('#fanSpeed1').text(_data[9]);//底层风扇
                $('#fanSpeed2').text(_data[10]);//打印风扇
                $('#printSpeed2').text(_data[5] + " %");
                $('#printReadSize').text(this.bytesToSize(_data[6]));
                //$('#printTime').text(_data[7]);
                this.printTime = parseInt(_data[7]);
                this.fanSpeed1 = parseInt(_data[9]);
                this.fanSpeed2 = parseInt(_data[10]);
                this.tarTemp = parseInt(_data[0]);
                this.extrudeSpeed = parseInt(_data[3]);
                this.printSpeed = parseInt(_data[5]);
                var percent = Math.round(100.0 *_data[6] / this.printTotalSize);
                $('.J_Percent').css('width', percent+'%');
            }
        } else {
            //this.isConnectedPrinter = false;
            if (this.isIgnore) {
                this.isIgnore = false;
            }
        }
    } else if (msg.indexOf("APPLogin:") == 0) {
        this.isLogin = false;
        $.ajax({
            url: this.config.encUrl,
            data: {str: msg},
            success: function (s) {
                parent.showStatus("正在验证…");
                parent.send("APPVerify:" + s);
            }
        });
    } else if (msg.indexOf("APPVerify:") == 0) {
        if (msg[10] == "0") {
            parent.showStatus("连接服务器成功！");
            parent.send("BEAT:");
            this.isLogin = true;
        } else {
            this.isLogin = false;
            this.showStatus("登录超时，请重新登录！");
        }
    } else if (msg.indexOf("APPConnect3D:") == 0) {
        if (msg[13] == "0") {
            this.isConnectedPrinter = true;
            var _data = msg.split("|");
            if (_data.length >= 12) {
                this.printerDepth = parseInt(_data[5]);
                this.printerWidth = parseInt(_data[6]);
                this.printerHeight = parseInt(_data[7]);
                this.printerVersion = parseInt(_data[10]);
                this.printerName = _data[11];
                $('.J_PrinterSn').val(this.printerName);
                this.thingiview.reCalSize(this.printerDepth, this.printerWidth, this.printerHeight);
            };
            $.ajax({//保存序列号
                url: this.config.snUrl,
                type: 'POST',
                data: {sn_number: this.printerName},
                dataType: 'json',
                success: function (obj) {
                    if (obj) {
                        parent.setPrinterInfo(obj);
                    }
                },
                error: function(XHR) {
                    alert(XHR.responseText);
                }
            });
            $('#connect-printer').hide();
            $('#printBlock').show();
            this.showStatus("打印机连接成功", this.isManual);
        } else {
            if (msg[13] == "1") {
                this.showStatus("打印机已被其它手机绑定", this.isManual);
            } else if (msg[13] == "3") {
                this.showStatus("打印机不在线，或您输入的序列号有误", this.isManual);
            } else {
                this.showStatus("无法连接打印", this.isManual);
            }
            this.isConnectedPrinter = false;
        }
        this.isManual = false;
        this.checkButtonStatus();
    } else if (msg.indexOf("3DBindEsc:") == 0) {
        this.isConnectedPrinter = false;
        this.checkButtonStatus();
    } else if (msg.indexOf("APPDisConnect3D:") == 0) {
        this.isConnectedPrinter = false;
        this.showStatus("已经断开打印机", this.isManual);
        if (this.isManual) {
            window.dialog.get('connect-printer-dialog').close().remove();
        }
        this.checkButtonStatus();
        this.isManual = false;
        $('#connect-printer').show();
        $('#printBlock').hide();
        $('#printingBlock').hide();
    } else if (msg.indexOf("APPPrint:") == 0) {
        if (msg[9] == "5") {
            this.showDialog("未连接打印机");
        } else if (msg[9] == "8") {
            this.showDialog("目标打印机正忙");
        } else if (msg[9] == "7") {
            this.showDialog("目标打印机无TF卡或TF已损坏");
        } else if (msg[9] == "6") {
            this.showDialog("目标打印机TF卡空间已满");
        } else if (msg[9] == "4") {
            this.showDialog("切片失败");
        } else if (msg[9] == "3") {
            this.showDialog("打印文件不存在");
        } else if (msg[9] == "2") {
            this.showDialog("未知错误");
        } else if (msg[9] == "1") {
            var _data = msg.split("|");
            $('#progress1').css("width", (_data[1] * 100) + "%");
            $('#progress1').text((_data[1] * 100).toFixed(2) + "%");
        } else if (msg[9] == "0") {
            // 切片完成
        }
        if (msg[9] != "1") {
            $('#print').prop("disabled", false);
            $('#print').text('开始打印').addClass('btn-danger');
        }
    } else if (msg.indexOf("ReadyToPrint:") == 0) {
        this.ReadyToPrint = parseInt(msg[13]);
    } else if (msg.indexOf("wifiPrintStart:") == 0) {
        this.printFileSize = parseInt(msg.substring(15));
    } else if (msg.indexOf("downloading:") == 0) {
        var _size = parseInt(msg.substring(12));
        if (this.printFileSize > 0) {
            $('#progress2').css("width", (_size / this.printFileSize * 100) + "%");
            $('#progress2').text((_size / this.printFileSize * 100).toFixed(2) + "%");
        }
    } else if (msg.indexOf("downloaded:") == 0) {
        if (this.ReadyToPrint == 1) {
            // 开始打印
        }
        // this.showDialog("下载成功");
    } else if (msg.indexOf("downloaderror:") == 0) {
        this.showDialog("下载出错");
    } else if (msg.indexOf("StopPrint:") == 0) {
        this.showStatus("已停止打印");
        this.isIgnore = true;
        this.checkPrintStatu(0);
    } else if (msg.indexOf("PausePrint:") == 0) {
        this.showStatus("已暂停打印");
    } else if (msg.indexOf("ResumePrint:") == 0) {
        this.showStatus("已恢复打印");
    } else if (msg.indexOf("IsHeating:") == 0) {
        this.showDialog("打印机正在加热");
    } else if (msg.indexOf("Wait:") == 0) {
        this.showStatus("请稍候再操作");
    } else if (msg.indexOf("SliceParams:") == 0) {
        // 切片参数，表示正在打印
        this.showStatus("正在打印…");
        var SliceParams = jQuery.parseJSON(msg.substring(12));
        var support = SliceParams.support.replace(/\ +/g,"") .toLowerCase();
        if(support=='touchingbuildplate'){
            support = "外部支撑";
        }else if(support=='everywhere') {
            support = "全部支撑";
        }else {
            support = "无";
        };
        var platformAdhesion = SliceParams.platformAdhesion.replace(/\ +/g,"") .toLowerCase();
        if(platformAdhesion=='brim'){
            platformAdhesion = "裙边";
        }else if(platformAdhesion=='raft') {
            platformAdhesion = "厚底";
        }else {
            platformAdhesion = "无";
        };
        this.isIgnore = true;
        this.checkPrintStatu(SliceParams.printMode);
        this.printTotalSize = SliceParams.printTotalSize;
        $('#materialLength').text(SliceParams.materialLength + " mm");
        $('#printTotalTime').text(this.timeFormat(SliceParams.printTotalTime));
        $('#printStartTime').text(this.dateFormat(SliceParams.printStartTime));
        $('#printTotalSize').text(this.bytesToSize(SliceParams.printTotalSize));
        $('#sliceTime').text(this.dateFormat(SliceParams.sliceTime));
        $('#printMode').text(SliceParams.printMode > 0 ? "正在打印" : "当前空闲");
        $('#zMax').text(SliceParams.zMax);
        $('#bottomLayerSpeed').text(SliceParams.bottomLayerSpeed) + " mm/s";
        $('#travelSpeed').text(SliceParams.travelSpeed + " mm/s");
        $('#supportXyDistance').text(SliceParams.supportXyDistance + " mm");
        $('#supportZDistance').text(SliceParams.supportZDistance + " mm");
        $('#supportFillRate').text(SliceParams.supportFillRate + " %");
        $('#supporSurface').text(SliceParams.supporSurface);
        $('#supportAngle').text(SliceParams.supportAngle + " °");
        $('#retractionAmount').text(SliceParams.retractionAmount + " mm");
        $('#retractionSpeed').text(SliceParams.retractionSpeed + " mm/s");
        $('#retractionEnable').text(SliceParams.retractionEnable == '1' ? "是" : "否");
        $('#wallCount').text(SliceParams.wallCount);
        $('#solidLayerCount').text(SliceParams.solidLayerCount);
        $('#platformAdhesion').text(platformAdhesion);
        $('#support').text(support);
        $('#layerHeight').text(SliceParams.layerHeight + " mm");
        $('#fillDensity').text(SliceParams.fillDensity + " %");
        $('#printSpeed1').text(SliceParams.printSpeed + " mm/s");
        $('#filename').text(SliceParams.filename);



        //SliceParams.id
        if (SliceParams.imageUrl) {
            $('#modelImage').attr('src', SliceParams.imageUrl);
        }
    } else if (msg.indexOf("APPOut:") == 0) {
        this.disConnectServer();
        this.isAutoConnect = false;
    } else if (msg.indexOf("showPhoto:") == 0) {
        var obj = jQuery.parseJSON(msg.substring(10));
        $('#look-printer-img').attr('src', obj.url);
    } else {
        // console.log(msg);
    }
}

Printer.prototype.heartBeat = function () {
    var parent = this;
    this.heartBeatTime++;

    if (this.heartBeatTime >= 99) {
        this.heartBeatTime = 0;
    }

    if (this.config.uid > 0) {
        if (this.printTime >= 999999999) {
            this.printTime = 0;
        }

        if (!this.isConnectedServer && !this.isAutoConnect) {
            this.showStatus("您的账号在其它地方登录，已与服务器断开连接！<a class='reconnectServer' href='#'>点击重新连接</a>");
            if (this.heartBeatHandler) {
                clearTimeout(this.heartBeatHandler);
            }
            return;
        }
        if (this.heartBeatTime % 2 == 0) {
            this.printTime++;
        }
        $('#printTime').text(this.timeFormat(this.printTime));

        if (this.heartBeatTime % 10 == 0) {
            if (this.isLogin) {
                this.send("BEAT:");
            }
            if (!this.isConnectedServer && !this.isConnecting) {
                this.connectServer();
            }
            if (this.timestamp > 0 && ((new Date().getTime()) - this.timestamp > 10000)) {
                this.disConnectServer();
            }
        }

    }

    if (this.heartBeatTime % 10 == 0) {
        //$.ajax({
        //    url: parent.config.beatUrl,
        //    data:{isLogin:parent.config.uid > 0 ? 1 : 0},
        //    dataType:'json',
        //    type:'POST',
        //    success: function (obj) {
        //        parent.setUser(obj);
        //    },
        //    error: function(XHR) {
        //        //alert(XHR.responseText);
        //        parent.setUser();
        //        window.location.reload(true);
        //    }
        //});
    }

    this.heartBeatHandler = setTimeout(function() {
        parent.heartBeat();
    }, this.heartBeatFrequency);
}

Printer.prototype.send = function (msg) {
    try {
        this.socket.send(msg + "\n");
    } catch (ex) {
        this.log(ex);
    }
}

Printer.prototype.bytesToSize = function (bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

Printer.prototype.timeFormat = function (time) {
    time = parseInt(time);
    var h = parseInt(time / 3600);
    var m = (parseInt(time / 60) % 60);
    var s = (time % 60);
    h = h < 10 ? '0'+h : h;
    m = m < 10 ? '0'+m : m;
    s = s < 10 ? '0'+s : s;
    return h+":"+m+":"+s;
}

Printer.prototype.dateFormat = function (date) {
    //return new Date(date * 1000).toLocaleString();
    var date = new Date(date * 1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s
}