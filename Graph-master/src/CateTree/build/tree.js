/** 
 * -------------------------------------------------------------
 * Copyright (c) 2013 tree, All rights reserved. 
 *  
 * @version: 0.0.0 
 * @author: lizhong <mail@lizhong.me> 
 * @description:  
 * @project: tree 
 * @date: 2014-05-14 
 * -------------------------------------------------------------
 */ 

(function(window, undefined){ 

//-----------------
// 变量定义
//-----------------

var

/**
 * 定义一个本地tree的副本
 * @type Class
 */
T,

/**
 * 初始
 * @type Function
 */
INIT,

/**
 * this指针
 * @type Object
 */
THIS,

/**
 * 版本定义
 * @type Number
 */
VERSION;

/**
 * 类定义
 * @class T
 * @param {Object} jsonData
 */
T = function(jsonData, sidebar) {
	
	if(typeof jsonData !== "object"){
		jsonData = {};
	}
	
	return new T.fn.init(jsonData, sidebar);
};

T.fn = T.prototype = {
	constructor : T,
	init : function(jsonData, sidebar) {
		var i,k;
		THIS = this;
		this.KEY = this.key();
		this.jsonToTree(jsonData);
		this.sidebar = sidebar;
	}
};

T.fn.init.prototype = T.fn;

T.fn.VERSION = 1.0;


// 生成菜单模块
(function(){
	
	var htmlCache = {};

	// 默认配置选项
	var getOptions = function(){
	
		return {
			// 布局方式
			// option: tree , box
			layout : "tree",
			
			// 图标宽
			icoWidth : 30,
			
			// 图标高
			icoHeight : 30,
			
			// 拖拽默认宽
			dragWidth : 80,
			
			// 拖拽默认高
			dragHeight : 80,
			
			// 默认子节点是否展开
			foldOpen : false,
			
			// 默认收起折叠按钮的类型
			// char 字符串
			// ico 图标
			foldIcoType : "char",
			
			// 隐藏图标 char类型
			foldIcoHideChar : "+",
			
			// 开启图标 char类型
			foldIcoShowChar : "-",
			
			// 隐藏图标  pic 类型
			foldIcoHidePic : "+",
			
			// 开启图标 pic 类型
			foldIcoShowPic : "-",
			
			// 模板后缀
			templateFix : ".html",
			
			
			// 默认图标
			ico : "../resource/svg/CI.svg"
		
		};
		
	};
	
	// 更新图标
	var updateIco = function(element, defaultOptions, sidebar){
		$(element).find(".ico").each(function(){
			sidebar.addImagePalette(
				this,
				$(this).attr("name"),
				$(this).attr("ico"),
				defaultOptions.dragWidth,
				defaultOptions.dragHeight,
				defaultOptions.icoWidth,
				defaultOptions.icoHeight
			);				
		});
	};
	
	// 删除数组元素
	var removeArrayItem = function(arr, item){
		var i, k;
		
		for(i=0, k=arr.length; i<k; i++){
			if(arr[i] === item){
				arr.splice(i,1);
				break;
			}
		}
		
		return arr;
	};
	
	var treeShow = function(childrenNode, foldElement, defaultOptions){
		childrenNode.removeClass("hide").addClass("show");
		foldElement.html(defaultOptions.foldIcoShowChar);	
	};
	
	var treeHide = function(childrenNode, foldElement, defaultOptions){
		childrenNode.removeClass("show").addClass("hide");
		foldElement.html(defaultOptions.foldIcoHideChar);	
	};
	
	// 添加折叠事件
	var addFoldEvent = function(element, defaultOptions){

		var nodes, foldElement, childrenNode, i, k;

		$(element).find(".node").each(function(){
			var childrenNode, foldElement;

			childrenNode = $(this).find(">.childrenNode");
			foldElement = $(this).find(">.pri>.fold");

			if(childrenNode.length >= 1){
				if(defaultOptions.foldOpen){
					treeShow(childrenNode, foldElement, defaultOptions);
				}else{
					treeHide(childrenNode, foldElement, defaultOptions);
				}

				foldElement.click(function(){
					if( childrenNode.is(":visible") ){
						treeHide(childrenNode, foldElement, defaultOptions);
					}else{
						treeShow(childrenNode, foldElement, defaultOptions);
					}
				});

			}else{
				foldElement.attr("class", "fixMargin");
			}
		});
	};
	
	var addLoading = function(element){
		var div = document.createElement("div");
		div.className = "jsontree-loading";
		div.innerHTML = "loading....";
		div.style.background = "#FFFFFF";
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.position = "absolute";
		div.style.zIndex = 999999;
		div.style.left = 0;
		div.style.top = 0;
		
		element.appendChild(div);
	};
	
	var delLoading = function(element){
		$(".jsontree-loading").remove();
	};
	
	T.fn.createMenu = function(element, options){
		
		var _this = this,
			basePath = "../",
			jsonData,
			defaultOptions,
			tpl,
			div,
			k,
			i;
		
		$(element).addClass("jsontree").html("loading...");
		
		options = typeof options === "undefined" ? {} : options ;
		
		// 检测element是不是有效值 否则终止操作
		if(typeof element === "undefined"){
			console.error(_this.msg.S2);
			return false;
		}
		
		defaultOptions = getOptions();
		jsonData = _this.getTree();
		
		// 传入配置项更新默认配置
		for(i in defaultOptions){
			if(typeof defaultOptions[i] === typeof options[i]){
				defaultOptions[i] = options[i];
			}
		}
		
		if(false && typeof htmlCache[defaultOptions.layout] === "string"){
				element.innerHTML = htmlCache[defaultOptions.layout];
				updateIco(element, defaultOptions);
				addFoldEvent(element, defaultOptions);
				return _this;
		}
		
		tpl = defaultOptions.layout + defaultOptions.templateFix;
		
		switch(defaultOptions.layout){
			case "tree":
				(function(){
					var crehtmlFun = null,
						html = "";
					
					crehtmlFun = function(o){
						var html = [];

						o.each(function(){
							var self = this,
								childrenNode = "";
							
							IF(typeof self.childrenNode === "object", function(){
								childrenNode = crehtmlFun(self.childrenNode);
							});
							
							html.push( _this.template(tpl,{
								name : self.name,
								ico : typeof self.ico === "string" ? basePath + self.ico : defaultOptions.ico ,
								childrenNode : childrenNode,
								layout : defaultOptions.layout
							}));
						});
						
						return html.join("");
					};
					
					html = crehtmlFun(jsonData);
					element.innerHTML = html;
					htmlCache[defaultOptions.layout] = html;
					updateIco(element, defaultOptions, _this.sidebar);
					addFoldEvent(element, defaultOptions);					
				
				})();
				
				break;
				
			case "box":
				(function(){
					var crehtmlFun = null,
						treeToArr = null,
						html = "",
						arr = [];
					
					crehtmlFun = function(o){
						var html = [],
							childrenNode = [];
						
						o.each(function(){
							var self = this;
							
							IF(typeof self.childrenNode == "object", function(){
								treeToArr(self.childrenNode);
							});
							
							arr.unshift({
								name : self.name,
								ico : typeof self.ico === "string" ? basePath + self.ico : defaultOptions.ico
							});
							
							html.push( _this.template(tpl,{
								name : self.name,
								childrenNode : arr,
								layout : defaultOptions.layout
							}));
							
							arr = [];							
						});
						
						return html.join(_this.template("line1.html"));
					};
					
					treeToArr = function(o){
						o.each(function(){
							var self = this;
							
							arr.push({
								name : self.name,
								ico : typeof self.ico === "string" ? basePath + self.ico : defaultOptions.ico
							});
							
							IF(typeof self.childrenNode === "object", function(){
								treeToArr(self.childrenNode);
							});						
						});
					};
					
					html = crehtmlFun(jsonData);
					element.innerHTML = html;
					htmlCache[defaultOptions.layout] = html;
					updateIco(element, defaultOptions, _this.sidebar);
					addFoldEvent(element, defaultOptions);				
				})();
				
				break;
				
			default:
		}

		return _this;
	};
	
})();

(function(){

	/**
	 * 继承
	 * @param {Object} o
	 */
	T.fn.extend = function(o){
		var i;
		
		for(i in o){
			this[i] = o[i];
		}
	};
		
})();
(function(){
	
	var tree = {},
		splitChar = "-";
		
	var toTree = function(key, value, o){
		
		var i, k, arr, tree, _this = this;
		
		arr = key.split(splitChar);
		tree = o;
		
		for(i=0,k=arr.length; i<k; i++){
			if(typeof tree[arr[i]] === "undefined" ){
				tree[arr[i]] = {};
			}
			
			if(k-i === 1){
				tree[arr[i]] = value;
			}
			
			if(typeof tree[arr[i]].childrenNode === "undefined"){
				tree[arr[i]].childrenNode = {};
			}
			
			tree = tree[arr[i]].childrenNode;
		}
		
		return tree;
	};
	
	T.fn.jsonToTree = function(param){
		
		var i,
			_this = this;
			
		_this.setTree({});
		
		/*
		for(i in param){
			toTree(i, param[i], _this.getTree());
		}
		*/
		
		tree[this.key] = param;
		
		return _this;
		
	};
	
	T.fn.getTree = function(){
		return tree[this.key];
	};
	
	T.fn.setTree = function(o){
		tree[this.key] = o;
		return this;
	};

})();

(function(){

	var key = {

		str : [
			'a','b','c','d','e','f','g','h','i','j','k','l','m',
			'o','p','q','r','s','t','x','u','v','y','z','w','n',
			'0','1','2','3','4','5','6','7','8','9'
		],
		
		randint : function(n,m){
			var c = m-n+1;
			var num = Math.random() * c + n;
			return	Math.floor(num);
		},

		randStr : function(){
			var _this = this;
			var leng = _this.str.length - 1;
			var randkey = _this.randint(0, leng);
			return _this.str[randkey];
		},
		
		create : function(len){
			var _this = this;
			var l = len || 10;
			var str = '';
			
			for(var i = 0 ; i<l ; i++){
				str += _this.randStr();
			}
		
			return str;
		}

	};
	
	T.fn.key = function(length){
		
		if(typeof length !== "number" || length<1 ){
			length = 32;
		}
		
		return key.create(length);
		
	};

})();

(function(){

	// 提示信息
	T.fn.msg = {
		S1 : "Param is not a valid argument !",
		S2 : "第一个参数类型不正确",
		S3 : "No find children nodes!"
	};

})();



// 模板模块
(function(){
	
	var 
	
	// 目录
	path = "./template/tree",
	
	// 缓存开启
	cacheEnable = true,
	
	// 缓存数据
	cache = {},
	
	// 获取模板
	getTpl = function(tpl){
	
		var url = "",
			result;
		
		if( tpl.substring(0,1) != "/" ){
			tpl = "/" + tpl;
		}
		
		url = path + tpl;
		
		if(cacheEnable && (url in cache) ){
			result = cache[url];
		}else{
			
			result = $.ajax({ url: url, async: false });
			if( result.readyState === 4 &&  result.status === 200  ){
				
				if(cacheEnable){
					cache[url] = $.trim(result.responseText);
				}
				
				result = $.trim(result.responseText);
				
			}else{
				throw new Error(result.statusText);
			}
		}
		
		return result;		
		
	};
	

	// 模板渲染
	T.fn.template = function(tpl, data){
		return Handlebars.compile(getTpl(tpl))(data);
	};

})();


window.Tree = T;

})( window );