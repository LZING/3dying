/**
 * Created by leiting on 14/8/26.
 */
/***
 * 将所有的事件的handler都存入此处，使用监听的方式进行触发。
 * 此处用到两个模式，单例模式：eventPool只保存一个实例，保证每次运行的监听都在同一个实例中能够读取的到
 * Mediator模式：使用监听的方式进行触发
 *
 * 使用场景：换皮肤，比如要将黑色皮肤换成灰色，这个时候不仅仅只是改北京颜色就可以了，相关的控件也需要修改背景颜色。
 */
(function (arg) {

    var self = arg;

    //将单例的实例存入此处
    var instance = null;

    var eventPool = function () {
        this._eventlist = {};
    };

    //创建事件池对象的原型链
    var EVL = eventPool.prototype;

    /***
     * 添加监听
     */
    EVL.addListener = function (evl,fn) {

        if( !this._eventlist.hasOwnProperty(evl) ){
            this._eventlist[evl] = [];
        }

        this._eventlist[evl].push(fn);
        return true;

    };

    /***
     * 移除监听
     */
    EVL.removeListener = function (evl,fn) {

        if( !this._eventlist.hasOwnProperty(evl) ){

            return false;

        }

        for(var i = 0,len = this._eventlist[fn].length; i < len ; i++){

            if(this._eventlist[evl][i] === fn){
                this._eventlist[evl].splice(i,1);

                return true;
            }
        }

        return false;
    };

    /***
     * 按照提供的监听名称执行监听
     */
    EVL.fireEvent = function () {

        var args = Array.prototype.slice.call( arguments );

        var evl = args.shift();

        if( !this._eventlist.hasOwnProperty(evl) ){
            return false;
        }

        for(var i = 0,len = this._eventlist[evl].length ; i < len ; i++){
            this._eventlist[evl][i].apply(args[0],args);
        }

        return true;
    };

    var getInstance = function () {
        if( !instance ){
            instance = new eventPool();
        }
        return instance;
    };

    self.getumxEventInstance = getInstance;

})(window);