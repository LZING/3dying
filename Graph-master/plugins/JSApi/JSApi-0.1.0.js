/** 
 * -------------------------------------------------------------
 * Copyright (c) 2013 JSApi, All rights reserved. 
 *  
 * @version: 0.1.0 
 * @author: mail@lizhong.me 
 * @description: jsapi 
 * @project: JSApi 
 * @date: 2014-01-23 
 * ------------------------------------------------------------- 
 */ 

(function(window){

/**
 * 数组原型类拓展
 * @class Array
 * @author mail@lizhong.me
 */

/**
 * 数组遍历 
 * @method each
 * @param {Function} fun 回调函数
 * @example
 *          var arr = ["a", "b", "c"];
 *          arr.each(function(index){
 *              alert(this === arr[index]); // true
 *          });
 */
Array.prototype.each = function(fun){
	var i, k, result;
	
	if(typeof fun === "function"){
		for(i=0, k=this.length; i<k; i++){
			result = fun.apply(this[i], [i]);
			if(result === "break"){
				break;
			}
		}
	}
};


/**
 * 是否在数组里 
 * @method inArray
 * @param {String} str 被查找的string
 * @param {Boolean} [isDeepChild=false] 是否搜索子元素
 * @return {Boolean} true 存在    false 不存在
 * @example
 *          var arr = ["a", "b", "c", 5, ["d", "e"]];
 *          arr.inArray("b");   // true
 *          arr.inArray("5");   // false
 *          arr.inArray(5);     // true
 *          arr.inArray("d");   // false
 *          arr.inArray("d", true); // true
 */
Array.prototype.inArray = function(str, isDeepChild){
    var i, k, deepChild, isInArray = false;
    
    deepChild = function(arr){
        var i, k, result = false;
        
        for(i=0, k=arr.length; i<k; i++){
            if(arr[i] === str){
                result = true;
                break;
            }else if(arr[i].constructor === Array){
                result = deepChild(arr[i]);
            }
        }
        
        return result;
    };
    
    if(isDeepChild){
        isInArray = deepChild(this);
    }else{
        for(i=0, k=this.length; i<k; i++){
            if(this[i] === str){
                isInArray = true;
                break;
            }
        }       
    }
    
    return isInArray;
};


/**
 * 所有数字类型的元素总和 <br />
 * 会过滤掉非Number类型
 * @method sum
 * @return Number 总和
 */
Array.prototype.sum = function(){
	var num = 0,
		i = 0,
		k = this.length;
		
	for(i; i<k; i++){
		if(typeof this[i] === "number"){
			num += this[i];
		}
	}
	
	return num;
};


// isArray()
(function(){
	if(typeof Array.isArray === "undefined"){
		/**
		 * 判断对象是否为Number
		 * @method isArray 
		 * @param {Object} value
		 * @return {Boolean} true 是数组 false 非数组
		 * @example
		 * 			Array.isArray([]); 	// true
		 * 			Array.isArray(0);	// false
		 * 			Array.isArray({});	// false
		 * 			Array.isArray(null);// false
		 * 			Array.isArray(function(){});	// false
		 */
		Array.isArray = function(value){
			return Object.prototype.toString.call(value) === "[object Array]"; 
		};
	}
})();



/**
 * 数组原型类拓展
 * @class Element
 * @author mail@lizhong.me
 */

// addEventListener
// removeEventListener
// from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener
(function() {
	if (typeof Event === "object" && !Event.prototype.preventDefault) {
		Event.prototype.preventDefault = function() {
			this.returnValue = false;
		};
	}
	
	if (typeof Event === "object" && !Event.prototype.stopPropagation) {
		Event.prototype.stopPropagation = function() {
			this.cancelBubble = true;
		};
	}
	
	if (typeof Element === "object" && !Element.prototype.addEventListener) {
		var eventListeners = [];

		/**
		 * 节点添加事件监听
		 * @method addEventListener
		 * @param {String} type 事件类型
		 * @param {Function} listener 函数 
		 */
		var addEventListener = function(type, listener /*, useCapture (will be ignored) */) {
			var self = this;
			var wrapper = function(e) {
				e.target = e.srcElement;
				e.currentTarget = self;
				if (listener.handleEvent) {
					listener.handleEvent(e);
				} else {
					listener.call(self, e);
				}
			};
			if (type == "DOMContentLoaded") {
				var wrapper2 = function(e) {
					if (document.readyState == "complete") {
						wrapper(e);
					}
				};
				document.attachEvent("onreadystatechange", wrapper2);
				eventListeners.push({
					object : this,
					type : type,
					listener : listener,
					wrapper : wrapper2
				});

				if (document.readyState == "complete") {
					var e = new Event();
					e.srcElement = window;
					wrapper2(e);
				}
			} else {
				this.attachEvent("on" + type, wrapper);
				eventListeners.push({
					object : this,
					type : type,
					listener : listener,
					wrapper : wrapper
				});
			}
		};
		
		/**
		 * 节点移除事件监听
		 * @method removeEventListener
		 * @param {String} type 事件类型
		 * @param {Function} listener 函数 
		 */
		var removeEventListener = function(type, listener /*, useCapture (will be ignored) */) {
			var counter = 0;
			while (counter < eventListeners.length) {
				var eventListener = eventListeners[counter];
				if (eventListener.object == this && eventListener.type == type && eventListener.listener == listener) {
					if (type == "DOMContentLoaded") {
						this.detachEvent("onreadystatechange", eventListener.wrapper);
					} else {
						this.detachEvent("on" + type, eventListener.wrapper);
					}
					break;
				}
				++counter;
			}
		};
		Element.prototype.addEventListener = addEventListener;
		Element.prototype.removeEventListener = removeEventListener;
		if (typeof HTMLDocument === "object") {
			HTMLDocument.prototype.addEventListener = addEventListener;
			HTMLDocument.prototype.removeEventListener = removeEventListener;
		}
		if (typeof Window === "object") {
			Window.prototype.addEventListener = addEventListener;
			Window.prototype.removeEventListener = removeEventListener;
		}
	}
})();



// remove
(function(){
	if(typeof Element.prototype.remove === "undefined" ){
		/**
		 * 节点删除
		 * @method remove 
		 */
		Element.prototype.remove = function(){
			if(typeof this.parentElement && typeof this.parentElement.removeChild == "function"){
				this.parentElement.removeChild(this);
			}
		};
		if (typeof HTMLDocument === "object") {
			HTMLDocument.prototype.remove = Element.prototype.remove;
		}
		if (typeof Window === "object") {
			Window.prototype.remove = Element.prototype.remove;
		}
	}
})();


// querySelector
// querySelectorAll
(function(){
	
	if(typeof Element.prototype.querySelectorAll === "undefined" &&
			typeof Element.prorotype.querySelector === "undefined" ){
		
		/**
		 * CSS查询器多个
		 * @param {String} query CSS选择器
		 * @return {Element}
		 */
		Element.prototype.querySelectorAll = function(query){
			var result = null;
			
			if(typeof query === "string"){
				if(query.charAt(0) === "."){
					result = document.getElementsByClassName(query.substr(1));
				}else if(query.charAt(0) === "#"){
					result = [document.getElementById(query.substr(1))];
				}else{
					result = document.getElementsByTagName(query);
				}
				
				return result;
			}else{
				throw new TypeError("TypeError!");
			}
		};
		
		/**
		 * CSS查询单个
		 * @param {String} query CSS选择器
		 * @return {Element}
		 */
		Element.prototype.querySelector = function(query){
			var result = this.querySelectorAll(query);
			
			if(result &&  result[0]){
				result = result[0];
			}else{
				result = null;
			}
			
			return result;
		};
		
		if (typeof HTMLDocument === "object") {
			HTMLDocument.prototype.querySelectorAll = Element.prototype.querySelectorAll;
			HTMLDocument.prototype.querySelector = Element.prototype.querySelector;
		}
		if (typeof Window === "object") {
			Window.prototype.querySelectorAll = Element.prototype.querySelectorAll;
			Window.prototype.querySelector = Element.prototype.querySelector;
		}
	}
})();





/**
 * 字符串原型类拓展
 * @class String
 * @author mail@lizhong.me
 */

/**
 * 字符串全部替换 
 * @method replaceAll
 * @param {String} s1 匹配字符串
 * @param {String} s2 替换字符串
 * @example
 *			var str = "abcad";
 *			str.replaceAll("a", "66");	// 66bc66d
 */
String.prototype.replaceAll = function(s1, s2) {
	var r;
	r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
	return this.replace(r, s2);
};


/**
 * 获取最后一个字符
 * @method lastChar
 * @return {String} 字符串
 * @example
 * 		var str = "hello";
 * 		str.lastChar(); // "l"
 */
String.prototype.lastChar = function(){
	return this.charAt(this.length-1);
};


/**
 * 获取第一个字符
 * @method firstChar
 * @return {String} 字符串
 * @example
 * 		var str = "hello";
 * 		str.firstChar(); // "h"
 */
String.prototype.firstChar = function(){
	return this.charAt(0);
};


/**
 * @class JSApi 
 * @param {Object} o
 */
var JSApi = function(o) {
	return new JSApi.fn.init(o);
};

JSApi.fn = JSApi.prototype = {
	constructor : JSApi,
	init : function(o) {
		this.o = o;
	}
};

JSApi.fn.init.prototype = JSApi.fn;


/**
 * 对象中是否有key值
 * @method haskey
 * @param {String} key 被查找的key
 * @param {Boolean} [isDeepChild] 是否查询子成员
 * @return {Boolean} true 存在key值, false不存在
 * @example
 *          var obj = {a: "", b:"", c:{ d:"", "e":"" }};
 *          JSApi(obj).haskey("b");    // true
 *          JSApi(obj).haskey("d");    // false
 *          JSApi(obj).haskey("d", true);  // true
 */
JSApi.fn.haskey = function(key, isDeepChild){
    var i, deepChild, isHasKey = false, _o = this.o;
    
    deepChild = function(obj){
        var i, isHasKey = false;
        
        for(i in obj){
            if(i === key){
                isHasKey = true;
                break;
            }else if(obj[i].constructor === Object){
                isHasKey = deepChild(obj[i]);
            }
        }
        
        return isHasKey;
    };
    
    if(isDeepChild){
        isHasKey = deepChild(_o);
    }else{
        for(i in _o){
            if(i === key){
                isHasKey = true;
                break;
            }
        }
    }
    
    return isHasKey;
};



/**
 * 获取Object的所有键值
 * @method keys
 * @example
 *          var obj = {a: "", b:"", c:{ d:"", "e":"" }};
 *          JSApi(obj).keys();    // [a, b, c]
 */
JSApi.fn.keys = function(){
	var arr = [], i;
	
	if(this.o instanceof Object){
		for(i in this.o){
			arr.push(i);
		}
		
		return arr;
	}else{
		throw new TypeError("TypeError!");	
	}
};


window.JSApi = JSApi;

})(window);