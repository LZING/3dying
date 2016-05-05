
(function(self){
	
	"use strict";
	
	self.containerID = "outline";
	self.container = null;

	// init
	self.init = function(){
		self.graphContainer = $("#graph-viewPortfolio");
		graph.utils.render("accordion/newViewPortfolio.html", {
			labelWidth: 4,
			rightWidth: 8,
			configItems: self.getAll()
		}, function(html){
			$("#sidebar-viewPortfolio").html(html);

			$('#toolbarSize').spinner({value:130, step: 10, min: 50, max: 300});
			$('#outLineSize').spinner({value:90, step: 10, min: 10, max: 90});

			$("input[name=toolbarBgColor], input[name=btnColor]").colorpicker();
		});
		self.container = $("#sidebar-viewPortfolio");
		self.addEvent();
		self.open3d();
	};

	self.open3d = function(){
		$("#viewportfolio-3d").click(function(){
			if(self.iframe){
				self.iframe.contentWindow.show3d();
			}
		});
	};

	self.getElement = function(){
		return self.container;
	};
	
	self.openView = function(src, fun){
		var iframe = document.createElement("iframe");
		iframe.setAttribute("scrolling", "no");
		iframe.setAttribute("frameborder", "0");
		iframe.src = src;
		iframe.style.cssText = [
			"width: 100%",
			"height: 100%"
		].join(";");
		
		self.graphContainer.html(iframe);
		
		if(typeof fun === "function"){
			iframe.onload = fun;
		}

		self.iframe = iframe;
		return iframe;
	};
	
	self.getAll = function(){
		var result,
			ret = null,
			text = "";
		result = graph.api.getPortfolio();
		
		if(graph.utils.isTrueRet(result)){
			text = result.data === "" ? "{}" : result.data;
			try{
				ret = JSON.parse(text);
			}catch(e){
				graph.utils.alert(e);
				throw new Error(e);
			}
		}else{
			graph.utils.alert(result.message);
			throw new Error(result.message);
		}
		

		return ret;
	};

	self.select = function(){
		$(".toolbar-menu").hide();
		graph.viewManagement.toolbar.hide();
		graph.onlineEdit.toolbar.hide();
		$("#toolbar-viewPortfolio").show();
	};
	
	self.get = function(key){
		var o = self.getAll();
		return o[key];
	};
	
	self.save = function(key, data, fun){
		var o = self.getAll();
		
		if(typeof o[key] === "object"){
			graph.utils.confirm(key + "已存在，要覆盖吗？", function(){
				o[key] = data;
				self.saveAll(o, fun);
			});

		}else{
			o[key] = data;
			self.saveAll(o, fun);
		}
	};
	
	self.saveAll = function(data, fun){
		var text = "{}",
			result = null;
		try{
			text = JSON.stringify(data);
			result = graph.api.savePortfolio(text);
			if(typeof fun === "function"){
				fun(result);
			}
		}catch(e){
			graph.utils.alert(e);
		}
	};
	
	self.formInit = function(o){
		var outline;
			
		o = typeof o === "object" ? o : {};
		outline = self.getElement();
		outline.find("*[name]").each(function(){
			var _this = this,
				key = $(_this).attr("name");
			if(typeof o[key] !== "undefined"){
				_this.value = o[key];
			}
		});
		
		outline.find("#addViewProfolioList").html("");

		if(typeof o.viewList === "object" && o.viewList.length >= 1){
			self.addView(o.viewList);
		}
	};
	
	self.addView = function(arr){

		graph.utils.render("accordion/addViewPortfolioList.html", {
			list: arr
		}, function(html){
			var $main = $("#addViewProfolioList"),
				index = $main.find("li").length;

			$main.append(html);
			$main.find("li:not(:lt("+index+"))").each(function(){
				var $li = $(this);
				$li.find(".arrowUp").click(function(){
					var index = $li.index();
					if(index>=1){
						var before = $main.find("li:eq("+(index-1)+")");
						before.before($li);
					}
				});

				$li.find(".remove").click(function(){
					$li.remove();
				});
			});
		});
	};
	
	self.proxy = {
		"创建组合视图" : function(){
			var outline = self.getElement();
			
			self.formInit({
				viewName : "",
				count	 : 4,
				toolbarSize : 130,
				outLineSize : 90,
				layout : "top",
				toolbarBgColor : "#000000",
				btnColor : "#FFFFFF",
				viewList : []
			});
			
			outline.find(".import").hide();
		},
		
		"组合视图列表" : function(){

		}
	};


	self.addEvent = function(){
		
		var outline = self.getElement(),
			tabs = outline.find(".nav-tabs");

		(function(){
			var o = self.getAll(),
				importDOM = outline.find("#import");

			outline.find("#import").find("select").change(function(){
				var key = this.value;
				if(key !== "" && typeof o[key] === "object"){
					o[key].outLineSize *= 100;
					self.formInit(o[key]);
				}

				importDOM.hide();
			});
		})();

		outline.find("#importconfig").click(function(){
			var importDOM = outline.find("#import");
			if(importDOM.is(":visible")){
				importDOM.hide();
			}else{
				if(importDOM.find("select option").length >= 2){
					importDOM.show();
					importDOM.removeClass("hide");
				}else{
					graph.utils.alert("没有可选配置！");
				}
			}
		});
		
		outline.find("#saveViewPortfolio").click(function(){
			var obj = {},
				hasError = [],
				viewList = [];
				
			outline.find("#addViewProfolioList").find("li").each(function(){
				var catename,
					viewid,
					viewname;
				
				catename = $(this).attr("data-catename");
				viewid = $(this).attr("data-viewid");
				viewname =  $(this).attr("data-viewname");
				
				viewList.push({
					viewid : viewid,
					viewname: viewname,
					catename: catename
				});
			});
			
			if(viewList.length<=0){
				hasError.push("视图列表：至少要有一个视图！");
			}
			
			outline.find("*[name]").each(function(){
				
				var name = $(this).attr("name"),
					value = $.trim(this.value);
				
				if(value === ""){
					hasError.push($(this).closest(".form-group").find("label").html() + "：不能为空");
				}
				
				if($(this).attr("data-isPercentage")){
					value = value/100;
				}
				
				obj[name] = value;
			});
			
			obj.viewList = viewList;
			obj.createDate = graph.utils.unix_to_datetime((new Date).getTime());
			
			if(hasError.length>=1){
				graph.utils.alert(hasError.join("\n"));
			}else{
				self.save(obj.viewName, obj, function(result){
					if(result){
						graph.utils.alert("创建组合视图" + obj.viewName + "成功！");
						self.init();
					}
				});
			}
		});
		
		outline.find("#addViewPortfolio").click(function(){
			var _this = this;
			graph.viewManagement.selectViews(self.addView);
		});

		$("#viewPortfolioList").find(">li").each(function(){
			var viewname = $(this).attr("data-viewname"),
				$li = $(this);

			$li.find(".btn-link").click(function(){
				var url = "outline.html?view=" + encodeURIComponent(viewname);
				var iframe = self.openView(url);
				//iframe.postMessage(msg, '*');
			});

			$li.find(".remove").click(function(){
				graph.utils.confirm("确认删除操作？", function(){
					var o = self.getAll();

					delete o[viewname];
					self.saveAll(o, function(result){
						var iframe = self.graphContainer.find("iframe"),
							src = iframe.attr("src");

						if(graph.utils.isTrueRet(result)){
							$li.remove();
							if(src && src.indexOf(encodeURIComponent(key)) >= 0){
								iframe.remove();
							}
						}
					});
				});
			});
		});


		tabs.find("li").each(function(){
			var key = $.trim($(this).find("a").html());

			$(this).click(function(){
				if(typeof self.proxy[key] === "function"){
					self.proxy[key]();
				}
			});

			if(this.className === "active"){
				if(typeof self.proxy[key] === "function"){
					self.proxy[key]();
				}
			}
		});

	};
	

})(nameSpace.reg("graph.viewPortfolio"));