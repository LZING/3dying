/**
 * Created by leiting on 14/9/2.
 */

(function (arg) {

    var self = arg;

    /****
     * 用于将页面上显示的mxcell和hama的ip地址进行映射，映射后存入一个数组中。供后续使用。
     * @param mxcells 页面上的mxcell集合数组
     * @param hamadatas hama返回的数据
     * @returns {Array}
     *
     * demo:[{"ci_1":"192.168.0.1"},...]
     */
    function hmbrige (mxcells,hamadatas) {
        var maplist = [];
        if(typeof mxcells === "object" && typeof hamadatas === "object"){
            var serverlist = hamadatas.severExecRate;
            var cellidlist = [];
            for(var i = 0 ; i < mxcells.length ; i ++){
                //var cellid = mxcells[i].getId();
                var cellid = mxcells[i];
                cellidlist.push(cellid);
            }
            if(cellidlist.length > serverlist.length){
                for(var k = 0 ; k < serverlist.length ; k++){
                    var tempobj = {};
                    for(var key in serverlist[k]){
                        tempobj[cellidlist[k]] = key;
                    }
                    maplist.push(tempobj);
                }
            }else{
                for(var k = 0 ; k < cellidlist.length ; k++){
                    var tempobj = {};
                    for(var key in serverlist[k]){
                        tempobj[cellidlist[k]] = key;
                    }
                    maplist.push(tempobj);
                }
            }
        }

        return maplist;
    }

    self.hmbrige = hmbrige;
})(window);