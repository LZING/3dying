
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