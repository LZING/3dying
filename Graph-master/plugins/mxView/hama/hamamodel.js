/**
 * Created by leiting on 14/9/2.
 * nodesTrasData:[{"ciid":"***","data":[0,100]},...]
 *
 */
(function (arg) {

    var self = arg;
    var eventPool = getumxEventInstance();
    var nodeScriptstep = 0;

    /***
     * 在后台hama提供的data中提取节点进度数据，并且绑定到视图中进行显示
     * 通过发布biztras的广播，接收到此广播的节点都进行更新进度状态
     * @param obj
     */
    var nodeTrasProcess = function (obj) {

        /***
         * 如果需要和hama系统对接，接受后台数据，修改22行的mmdb.***.***即可，回调函数参数的data是data.data
         */
        mmdb.hamadata.gethamaData(function (data){
            //metadata:处理过以后可以展示成进度的数据对象
            var metedata = getNodeprocessdata(obj,data);
            eventPool.fireEvent("biztras",obj,metedata);
        });

    };

    /***
     * 在后台hama提供的data中提取节点脚本数据，并且绑定到视图中进行显示
     * 通过发布bizscript的广播，视图中进行轮训展示
     * @param obj
     */
    var nodeTransScript = function (obj) {
        mmdb.hamadata.gethamaData(function (data){
            //metadata:处理过以后可以展示成进度的数据对象
            var metedata = getNodeScriptdata(obj,data);
            eventPool.fireEvent("bizscript",obj,metedata);
        });
    };

    /***
     * 获取节点的进度数据
     * @param obj mxView对象
     * @param data 后台提供的原始数据
     * @returns {Array} [{"ciid":"***","data":[0,100]},...]
     */
    function getNodeprocessdata (obj,data) {
        var nodesProcessdata = [];
        var cellslist = [];
        var cellslisttemp = obj.editor.graph.getChildVertices();
        var nodesProcessdataTemp = data.severExecRate;
        var nodesFlagTemp = data.serviceFlag;
        //此循环将页面中是ci的节点给过滤出来
        for(var i = 0 ; i < cellslisttemp.length ; i++){
            if(/ci_/.test(cellslisttemp[i].getId())){
                cellslist.push(cellslisttemp[i].getId());
            }
        }
        var maps = hmbrige(cellslist,data);

        for(var k = 0 ; k < maps.length ; k++){
            for(var key in maps[k]){
                //临时保存nodesTrasData的item
                var d = {};
                var serverip = maps[k][key];
                for(var m = 0 ; m < nodesProcessdataTemp.length ; m++){
                    for(var keysub in nodesProcessdataTemp[m]){
                        if(keysub == serverip){
                            var trasvalue = nodesProcessdataTemp[m][keysub];
                            d["ciid"] = key;
                            d["data"] = [trasvalue,(100-trasvalue)];
                            d["flag"] = nodesFlagTemp[m][keysub];
                            nodesProcessdata.push(d);
                        }
                    }
                }
            }
        }

        return nodesProcessdata;
    }

    /***
     * 获取正在进行中每个节点的执行脚本数据
     * @param obj
     * @param data
     * @returns {array} [{"ciid":"***","data":[{...},...]},...]
     */
    function getNodeScriptdata (obj,data) {
        var nodesScriptdata = [];
        var rtn = null;
        var cellslist = [];
        var cellslisttemp = obj.editor.graph.getChildVertices();
        var nodesScriptdataTemp = data.ServersScriptsInfo;
        var tempTotalExecRate = data.TotalExecRate;
        var nodesTotalExecRate = [tempTotalExecRate,((100 - tempTotalExecRate) + "")];
        //此循环将页面中是ci的节点给过滤出来
        for(var i = 0 ; i < cellslisttemp.length ; i++){
            if(/ci_/.test(cellslisttemp[i].getId())){
                cellslist.push(cellslisttemp[i].getId());
            }
        }
        var maps = hmbrige(cellslist,data);

        for(var k = 0 ; k < maps.length ; k++){
            for(var key in maps[k]){
                //临时保存nodesTrasData的item
                var d = {};
                var serverip = maps[k][key];
                for(var keysub in nodesScriptdataTemp){
                    if(keysub == serverip){
                        d["ciid"] = key;
                        d["ciip"] = keysub;
                        d["totalrate"] = nodesTotalExecRate;
                        d["data"] = nodesScriptdataTemp[keysub];
                        nodesScriptdata.push(d);
                    }
                }
            }
        }
        if(nodeScriptstep < nodesScriptdata.length){
            rtn = nodesScriptdata[nodeScriptstep];
            nodeScriptstep++;
        }else{
            nodeScriptstep = 0;
            rtn = nodesScriptdata[nodeScriptstep];
        }


        return rtn;
    }

    self.nodeTrasProcess = nodeTrasProcess;
    self.nodeTransScript = nodeTransScript;
})(nameSpace.reg("mmdb.hamadata"));