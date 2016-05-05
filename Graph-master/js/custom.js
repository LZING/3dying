

// 隐藏左右两侧按钮绑定
(function(self){
	
	"use strict";
	
	var sideCloseBtn = null,
		leftMenu = null,
		pageContent = null,
		cssProperty = "",
		oriCssPropertyValue = "",
		rightMenu = null;
		
	leftMenu = $(".leftmenu");
	rightMenu = $(".rightmenu");
	pageContent = $(".page-content");
	cssProperty = "margin-left";
	oriCssPropertyValue = pageContent.css(cssProperty);
	
	sideCloseBtn = $(".sideber-closebtn");
	
	sideCloseBtn.find(".left").click(function(){
		if(self.parseInt(pageContent.css(cssProperty)) === 0){
			pageContent.css(cssProperty, oriCssPropertyValue);
		}else{
			pageContent.css(cssProperty, 0);
		}
	});
	
	sideCloseBtn.find(".right").click(function(){
		if(rightMenu.is(":visible")){
			rightMenu.hide();
		}else{
			rightMenu.show();
		}
	});
	
})(this);


// 图形与表格tab切换
(function(self){
	"use strict";
	
	var container = $(".graph-type-tab");
	
	container.find("a").click(function(){

		if(this.className !== "ok"){
			var tabName = "";
			
			container.find("a.ok").removeClass("ok");
			$(this).addClass("ok");
			tabName = $(this).attr("name");
			
			if(tabName === "graph-display"){
				$(".tableContainer").each(function(){
					if($(this).is(":visible")){
						var container = null,
							modelName = "";
							
						container = $($(this).attr("graphid"));
						container.removeClass("hide").addClass("show");
						$(this).removeClass("show").addClass("hide");
					}
				});
			}
			
			if(tabName === "table-display"){
				$(".graphContainer").each(function(){
					if($(this).is(":visible")){
						var container = null,
							modelName = "";
						
						container = $($(this).attr("tableid"));
						modelName = container.attr("modelname");
						
						if(graph[modelName].table){
							container.removeClass("hide").addClass("show");
							$(this).removeClass("show").addClass("hide");
							
							graph[modelName].table(container);
						}
					}
				});
			}
		}
		
	});
	
})(this);



// 配置信息与监控信息切换
(function(self){
	
	$("a[name=rightConfigTab]").click(function(){
		var element = null;
		element = $($(this).attr("href"));
		graph.ciList.rightConfigDisplay(element);
	});
	
	$("a[name=rightMonitorTab]").click(function(){
		var element = null;
		element = $($(this).attr("href"));
		graph.ciList.rightMonitorDisplay(element);
	});
})(this);
