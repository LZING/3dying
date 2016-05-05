
(function(window){
	
	"use strict";

	var App = function(json, container, option){
		var _this = this;
		
		option = option || {};
		_this.layout = option.layout || "top";
		_this.json = json;
		_this.container = container;
		_this.speed = 400;
		_this.graphMargin = 10;
		_this.graph = [];
		_this.clearClassName = "clear";
		_this.maskClassName = "mask";
		_this.maskHoverClassName = "maskHover";
		_this.maskElements = [];
		_this.graphElements = [];
		_this.scrollDivSize = option.toolbarSize || 130;
		_this.outLineDiv = {
			Magnification : 1.5,
			borderWidth: 1,
			size : option.outLineSize || 0.9,
			marginLR : 10,
			boxBgColor : "#000",
			boxBorderWidth: 0,
			boxBorderColor: "#FFF",
			maxDisplayCount : option.count || 4
		};
		_this.loading = {
			width: 300,
			height: 30,
			borderWidth: 1,
			borderColor: "green",
			padding: 5,
			fontSize: 30,
			color: "green",
			bgColor: "#F5F5F5",
			text: "Waiting Please ..."
		};
		_this.tip = {
			height: 40,
			fontSize: 12,
			padding: 5,
			bgColor: "rgb(112, 176, 222)",
			color: "#FFF"
		};
		_this.page = {
			size: 20,
			padding: 3,
			fontSize: 10,
			color: "#FFF",
			bgColor: "rgb(112, 176, 222)",
			opacity: 0.8
		};
		_this.pageBtnStyle = {
			size : 20,
			marginLR : 20,
			offset: 5,
			color : option.btnColor || "white"
		};
		_this.upBgColor = option.toolbarBgColor || "black";
		
		_this.init();
		_this.loadData();
		_this.createDiv();
		_this.createGraph();
		_this.outlineEvents();
		
		if(_this.json.length > _this.outLineDiv.maxDisplayCount){
			_this.createPageBtn();
			_this.pageBtnEvents();
		}
		
		_this.contextMenu();
		
	};
	
	(function(){
		
		App.prototype.init = function(){
			var _this = this, o;
			
			o = _this.outLineDiv;
			
			if(o.size>0.9){
				o.size = 0.9;
			}else if(o.size < 0.1){
				o.size = 0.1;
			}
			
			if(_this.isHorizontalLayout()){
				o.height = parseInt(_this.scrollDivSize * o.size, 10);
				o.width = parseInt(o.height * o.Magnification, 10);
			}else{
				o.width = parseInt(_this.scrollDivSize * o.size, 10);
				o.height = parseInt(o.width / o.Magnification, 10);			
			}
		};
		
	})();
	
	(function(){
		
		var createDiv = function(id){
			var div = document.createElement("div");
			div.id = id;
			return div;
		};
		
		
		var createVerticalLayout = function(){
			var _this = this, o = _this.outLineDiv, t = _this.loading;
			
			// 滚动区域
			_this.scrollContainer = createDiv("scroll");
			_this.scrollContainer.style.cssText = [
				"width: " + _this.scrollDivSize + "px",
				"height: 100%",
				"overflow: hidden",
				"background: " + _this.upBgColor,
				"position: absolute",
				"top: 0",
				_this.layout + " : 0"
			].join(";");
			
			
			_this.centerElement = createDiv("center");
			_this.centerElement.style.cssText = [
				"border: " + o.boxBorderWidth +"px solid " + o.boxBorderColor,
				"position: absolute",
				"left: 0",
				"right: 0",
				"bottom: 0",
				"top :0",
				"height: " + ((o.height + o.borderWidth * 2 + o.marginLR * 2) * o.maxDisplayCount) + "px",
				"width: " + (o.width + o.borderWidth * 2) + "px",
				"margin: auto"
			].join(";");
			
			
			_this.actionElement = createDiv("action");
			_this.actionElement.style.cssText = [
				"width: 100%",
				"height: 100%",
				"overflow: hidden"
			].join(";");				
			
			_this.scrollItemsContainer = createDiv("items");
			_this.scrollItemsContainer.style.cssText = [
				"height: " + ((o.width + o.borderWidth * 2 + o.marginLR * 2) * _this.json.length) + "px",
				"width: 100%",
				"overflow: hidden"
			].join(";");
			_this.scrollItemsContainer.className = _this.clearClassName;
			
			_this.actionElement.appendChild(_this.scrollItemsContainer);
			_this.centerElement.appendChild(_this.actionElement);
			_this.scrollContainer.appendChild(_this.centerElement);
			
			_this.mainContainer = createDiv("main");
			_this.mainContainer.style.cssText = [
				"position: absolute",
				"width: " + ($(_this.container).width() - _this.scrollDivSize) + "px",
				"height: 100%",
				"top: 0",
				_this.layout === "left" ? "right: 0" : "left: 0"
			].join(";");
			
			_this.loadingContainer = createDiv("loading");
			_this.loadingContainer.style.cssText = [
				"width: " + t.width + "px",
				"height: " + t.height + "px",
				"padding: " + t.padding + "px",
				"color: " + t.color,
				"background: " + t.bgColor,
				"position: absolute",
				"font-size: " + t.fontSize + "px",
				"border: " + t.borderWidth + "px solid " + t.borderColor,
				"left: 0",
				"top: 0",
				"right: 0",
				"bottom: 0",
				"font-width: bold",
				"line-height: " + t.height + "px",
				"text-align: center",
				"font-family: Arial",
				"margin: auto"
			].join(";");
			_this.loadingContainer.innerHTML = t.text;
			_this.mainContainer.appendChild(_this.loadingContainer);
		
			// Insert DOM
			_this.container.appendChild(_this.scrollContainer);
			_this.container.appendChild(_this.mainContainer);			
		};
		
		var createHorizontalLayout = function(){
			var _this = this, o = _this.outLineDiv, t = _this.loading;
			
			// 滚动区域
			_this.scrollContainer = createDiv("scroll");
			_this.scrollContainer.style.cssText = [
				"width: 100%",
				"overflow: hidden",
				"position: absolute",
				"background: " + _this.upBgColor,
				"height: " + _this.scrollDivSize + "px",
				"left: 0",
				_this.layout + ": 0"
			].join(";");
			
			
			_this.centerElement = createDiv("center");
			_this.centerElement.style.cssText = [
				"border: " + o.boxBorderWidth +"px solid " + o.boxBorderColor,
				"position: absolute",
				"left: 0",
				"right: 0",
				"bottom: 0",
				"top :0",
				// "background: " + o.boxBgColor,
				"width: " + ((o.width + o.borderWidth * 2 + o.marginLR * 2) * o.maxDisplayCount) + "px",
				"height: " + (o.height + o.borderWidth * 2) + "px",
				"margin: auto"
			].join(";");
			
			
			_this.actionElement = createDiv("action");
			_this.actionElement.style.cssText = [
				"width: 100%",
				"height: 100%",
				"overflow: hidden"
			].join(";");				
			
			_this.scrollItemsContainer = createDiv("items");
			_this.scrollItemsContainer.style.cssText = [
				"width: " + ((o.width + o.borderWidth * 2 + o.marginLR * 2) * _this.json.length) + "px",
				"height: 100%",
				"overflow: hidden"
			].join(";");
			_this.scrollItemsContainer.className = _this.clearClassName;
			
			_this.actionElement.appendChild(_this.scrollItemsContainer);
			_this.centerElement.appendChild(_this.actionElement);
			_this.scrollContainer.appendChild(_this.centerElement);
			
			_this.mainContainer = createDiv("main");
			_this.mainContainer.style.cssText = [
				"position: absolute",
				"width: 100%",
				"height: " + ($(_this.container).height()-_this.scrollDivSize) + "px",
				"left: 0",
				_this.layout === "top" ? "bottom: 0" : "top: 0"
			].join(";");
			
			_this.loadingContainer = createDiv("loading");
			_this.loadingContainer.style.cssText = [
				"width: " + t.width + "px",
				"height: " + t.height + "px",
				"padding: " + t.padding + "px",
				"color: " + t.color,
				"background: " + t.bgColor,
				"position: absolute",
				"font-size: " + t.fontSize + "px",
				"border: " + t.borderWidth + "px solid " + t.borderColor,
				"left: 0",
				"top: 0",
				"right: 0",
				"bottom: 0",
				"font-width: bold",
				"line-height: " + t.height + "px",
				"text-align: center",
				"font-family: Arial",
				"margin: auto"
			].join(";");
			_this.loadingContainer.innerHTML = t.text;
			_this.mainContainer.appendChild(_this.loadingContainer);
		
			// Insert DOM
			_this.container.appendChild(_this.scrollContainer);
			_this.container.appendChild(_this.mainContainer);			
		};
		
		App.prototype.createDiv = function(){
			var _this = this;
			
			if(_this.isHorizontalLayout()){
				createHorizontalLayout.apply(_this);
			}else{
				createVerticalLayout.apply(_this);
			}
		};
		
	})();
	
	
	(function(){
		
		App.prototype.isHorizontalLayout = function(){
			var _this = this, result;
			if(_this.layout == "top" || _this.layout == "bottom"){
				result = true;
			}else{
				result = false;
			}
			
			return result;			
		};
		
		App.prototype.isVerticalLayout = function(){
			var _this = this, result;
			if(_this.layout == "left" || _this.layout == "right"){
				result = true;
			}else{
				result = false;
			}
			
			return result;
		};
		
	})();
	
	
	(function(){
		
		App.prototype.createGraph = function(){
			var _this = this,
				o = _this.outLineDiv,
				bounds = null,
				i = 0,
				k = 0,
				container = null,
				outlineBox = null,
				pageContainer = null,
				tipContainer = null,
				tipContainerChild = null,
				outlineContainer = null,
				outlineMask = null,
				doc = null,
				codec = null,
				editor = null;
				
			for(i=0, k=_this.json.length; i<k; i++){
				container = document.createElement("div");
				container.style.cssText = [
					"width: 100%",
					"height: 100%",
					"position: absolute",
					//"z-index: 999999",
					"background: #FFF",
					"left: 8888px",
					"top: 0"
				].join(";");
				_this.graphElements.push(container);
				
				outlineBox = document.createElement("div");
				outlineBox.style.cssText = [
					"width: " + o.width + "px",
					"height: " + o.height + "px",
					_this.isHorizontalLayout() ? "margin:0 " + o.marginLR + "px" : "margin:" + o.marginLR + "px 0",
					"border: " + o.borderWidth + "px solid #CCC",
					"overflow: hidden",
					"position: relative",
					"float: left",
					"background: #FFF"
				].join(";");
				
				outlineContainer = document.createElement("div");
				outlineContainer.style.cssText = [
					"width: 100%",
					"height: 100%",
					"position: absolute",
					"left: 0",
					"top: 0"
				].join(";");
				
								
				outlineMask = document.createElement("div");
				outlineMask.style.cssText = [
					"width: 100%",
					"height: 100%",
					"position: absolute",
					"background: #000",
					"cursor: pointer",
					"left: 0",
					"opacity: .5",
					"top: 0",
					"z-index: 9999"
				].join(";");
				outlineMask.title = _this.json[i].viewname;
				_this.maskElements.push(outlineMask);
				
				tipContainer = document.createElement("div");
				tipContainer.style.cssText = [
					"width: 100%",
					"height: " + _this.tip.height + "px",
					"position: absolute",
					"background: " + _this.tip.bgColor,
					"z-index: 22",
					"left: 0",
					"bottom: 0"
				].join(";");
				
				tipContainerChild = document.createElement("div");
				tipContainerChild.style.cssText = [
					"position: absolute",
					"padding: " + _this.tip.padding + "px",
					"color: " + _this.tip.color,
					"font-size: " + _this.tip.fontSize + "px",
					"z-index: 22",
					"line-height: 1em",
					"left: 0",
					"bottom: 0",
					"top: 0",
					"right: 0",
					"margin: auto"
				].join(";");
				tipContainerChild.innerHTML = [
					"Cate : " + _this.json[i].catename,
					"Name : " + _this.json[i].viewname
				].join("<br />");
				tipContainer.appendChild(tipContainerChild);
								
				pageContainer = document.createElement("div");
				pageContainer.style.cssText = [
					"width: " + _this.page.size + "px",
					"height: " + _this.page.size + "px",
					"border-radius: " + ((_this.page.size+_this.page.padding*2)/2) + "px",
					"padding: " + _this.page.padding + "px",
					"position: absolute",
					"text-align: center",
					"line-height: 15px",
					"color: " + _this.page.color,
					"font-size: " + _this.page.fontSize + "px",
					"opacity: " + _this.page.opacity,
					"background: " + _this.page.bgColor,
					"z-index: 22",
					"right: 0",
					"top: 0"
				].join(";");
				pageContainer.innerHTML = [i+1, k].join("/");
				
				// Insert DOM
				outlineBox.appendChild(outlineContainer);
				outlineBox.appendChild(outlineMask);
				outlineBox.appendChild(pageContainer);
				outlineBox.appendChild(tipContainer);
				_this.scrollItemsContainer.appendChild(outlineBox);
				_this.mainContainer.appendChild(container);

				editor = new Editor();
				_this.graph.push(editor);

				editor.zoomLock = true;
				editor.graph.init(container);
				editor.graph.setEnabled(false);
				editor.graph.getModel().clear();
				editor.graph.zoomTo(1);
				editor.graph.json = _this.json[i];
				doc = mxUtils.parseXml(_this.json[i].xml);
				codec = new mxCodec(doc);
				codec.decode(doc.documentElement, editor.graph.getModel());
				
				// View center
				editor.graph.zoomToCenter();
				
				// Create outline
				new mxOutline(editor.graph, outlineContainer);
			}
				
		};
		
	})();
	
	
	(function(){
		
		App.prototype.loadData = function(){
			var i = 0,
				result = null,
				_this = this;
				
			if(_this.json){
				for(i=0; i<_this.json.length; i++){
					result = graph.api.getView(_this.json[i].viewid);
					
					if(result.success){
						_this.json[i].xml = result.data.xml;
					}
				}
			}
		};
		
	})();
	
	(function(){
		
		var createHorizontalBtn = function(){
			var _this = this,
				itemsWidth = $(_this.centerElement).width(),
				itemsHeight = $(_this.centerElement).height(),
				o = _this.pageBtnStyle;
			
			_this.nextBtn = document.createElement("div");
			_this.nextBtn.style.cssText = [
				"width: 0px",
				"height: 0px",
				"font-size: 0px",
				"line-height: 0px",
				"position: absolute",
				"cursor: pointer",
				"border-bottom: "+ o.size +"px solid transparent",
				"border-top: "+ o.size +"px solid transparent",
				"border-left: "+ o.size +"px solid " + o.color,
				"top: " + ((itemsHeight - o.size * 2) / 2) + "px",
				"z-index: 99999",
				"left: " + ( itemsWidth + o.offset ) + "px"
			].join(";");
			
			_this.prevBtn = document.createElement("div");
			_this.prevBtn.style.cssText = [
				"width: 0px",
				"height: 0px",
				"font-size: 0px",
				"line-height: 0px",
				"position: absolute",
				"cursor: pointer",
				"border-bottom: "+ o.size +"px solid transparent",
				"border-top: "+ o.size +"px solid transparent",
				"border-right: "+ o.size +"px solid " + o.color,
				"top: " + ((itemsHeight - o.size * 2) / 2) + "px",
				"z-index: 99999",
				"left: " +  (-1 * (o.offset + o.size))  + "px"
			].join(";");
			
			// Insert DOM
			_this.centerElement.appendChild(_this.nextBtn);
			_this.centerElement.appendChild(_this.prevBtn);			
		};
		
		var createVerticalBtn = function(){
			var _this = this,
				itemsWidth = $(_this.centerElement).width(),
				itemsHeight = $(_this.centerElement).height(),
				o = _this.pageBtnStyle;
			
			_this.nextBtn = document.createElement("div");
			_this.nextBtn.style.cssText = [
				"width: 0px",
				"height: 0px",
				"font-size: 0px",
				"line-height: 0px",
				"position: absolute",
				"cursor: pointer",
				"border-right: "+ o.size +"px solid transparent",
				"border-left: "+ o.size +"px solid transparent",
				"border-top: "+ o.size +"px solid " + o.color,
				"left: 0",
				"right: 0",
				"top: " + ( itemsHeight + o.offset ) + "px",
				"z-index: 99999",
				"margin: auto"
			].join(";");
			
			_this.prevBtn = document.createElement("div");
			_this.prevBtn.style.cssText = [
				"width: 0px",
				"height: 0px",
				"font-size: 0px",
				"line-height: 0px",
				"position: absolute",
				"cursor: pointer",
				"border-left: "+ o.size +"px solid transparent",
				"border-right: "+ o.size +"px solid transparent",
				"border-bottom: "+ o.size +"px solid " + o.color,
				"z-index: 99999",
				"left: 0",
				"right: 0",
				"top: " +  (-1 * (o.offset + o.size))  + "px",
				"margin: auto"
			].join(";");
			
			// Insert DOM
			_this.centerElement.appendChild(_this.nextBtn);
			_this.centerElement.appendChild(_this.prevBtn);
		};
		
		App.prototype.createPageBtn = function(){
			var _this = this;
			
			if(_this.isHorizontalLayout()){
				createHorizontalBtn.apply(_this);
			}else{
				createVerticalBtn.apply(_this);
			}
		};
		
	})();
	
	(function(){
		
		var each = function(arr, fun){
			var i, k;
			for(i=0, k=arr.length; i<k; i++){
				(function(num){
					fun.apply(arr[i], [num]);
				})(i);
			}
		};
		
		App.prototype.outlineEvents = function(){
			var _this = this;
			
			$(_this.graphElements[0]).css("left", "0px");
			
			each(_this.maskElements, function(i){
				var index,
					target;
				
				if(i===0){
					$(this).addClass(_this.maskClassName);
				}
				
				$(this).mouseover(function(){
					$(this).addClass(_this.maskHoverClassName);
				}).mouseout(function(){
					$(this).removeClass(_this.maskHoverClassName);
				}).click(function(){
					target = this;
					each(_this.maskElements, function(i){
						if(target === _this.maskElements[i]){
							index = i;
							$(this).addClass(_this.maskClassName);
						}else{
							$(this).removeClass(_this.maskClassName);
						}
						
					});
					
					each(_this.graphElements, function(i){
						if(index === i){
							$(this).css("left", "0");
						}else{
							$(this).css("left", "88888px");
						}
					});
					
				});
			
			});	
		};
		
	})();
	
	(function(){
		
		var horizontalMove = function(){
			var _this = this,
				o = _this.outLineDiv,
				outlineOffsetWidth = o.width + o.marginLR * 2 + o.borderWidth * 2 ,
				maxLeft = (_this.json.length - _this.outLineDiv.maxDisplayCount) *  outlineOffsetWidth;
			
			$(_this.nextBtn).click(function(){
				$(_this.actionElement).stop();
				var offset = $(_this.actionElement).scrollLeft() + outlineOffsetWidth;
				if(offset <= maxLeft){
					$(_this.actionElement).animate({scrollLeft : offset}, _this.speed);
				}
			});
			
			$(_this.prevBtn).click(function(){
				$(_this.actionElement).stop();
				var offset = $(_this.actionElement).scrollLeft() - outlineOffsetWidth;
				if($(_this.actionElement).scrollLeft() > 0){
					$(_this.actionElement).animate({scrollLeft : offset}, _this.speed);
				}
			});				
		};
		
		var verticalMove = function(){
			var _this = this,
				o = _this.outLineDiv,
				outlineOffsetHeight = o.height + o.marginLR * 2 + o.borderWidth * 2 ,
				maxLeft = (_this.json.length - _this.outLineDiv.maxDisplayCount) *  outlineOffsetHeight;
			
			$(_this.nextBtn).click(function(){
				$(_this.actionElement).stop();
				var offset = $(_this.actionElement).scrollTop() + outlineOffsetHeight;
				if(offset <= maxLeft){
					$(_this.actionElement).animate({scrollTop : offset}, _this.speed);
				}
			});
			
			$(_this.prevBtn).click(function(){
				$(_this.actionElement).stop();
				var offset = $(_this.actionElement).scrollTop() - outlineOffsetHeight;
				if($(_this.actionElement).scrollTop() > 0){
					$(_this.actionElement).animate({scrollTop : offset}, _this.speed);
				}
			});				
		};
		
		App.prototype.pageBtnEvents = function(){
			var _this = this;
			
			if(_this.isHorizontalLayout()){
				horizontalMove.apply(_this);
			}else{
				verticalMove.apply(_this);
			}
		};
	})();
	
	
	(function(){
		App.prototype.contextMenu = function(){
			var _this = this, i;

			for(i=0; i<_this.graph.length; i++){
				(function(editor){
					// 右键
					new graphContextMenu(editor,{
						vertex:[
							{name: DEFINE.MENU_OPEN_URL, aliases: "关联信息"},
							{name: DEFINE.MENU_VIEW_RELATION_OPEN, aliases: "关联视图"}
						],
						canvas: [
							{name: DEFINE.MENU_BACK_PARENT_VIEW, aliases: "返回上级视图"}
						],
						libs: DEFINE.GRAPH_CONTEXT_MENU_LIBS
					});
				})(_this.graph[i]);
			}
		};
	})();
	
	window.App = App;
	
})(window);



