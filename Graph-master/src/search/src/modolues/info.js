
(function(){

	var elementId = "desagasdfljaslfjeljalsdjf",
		br = "<br />",
		hr = '<hr style="margin: 10px 0;" />',
		href = ["javascript","void(0)"].join(":"),
		moveHistory = [],
		moveMinSpeed = 200,
		closeSpeed = 500,
		closeBtnCss = [
			"position:absolute",
			"background:#999",
			"color:#FFF",
			"text-align:center",
			"line-height:20px",
			"top:10px",
			"right:10px",
			"text-decoration:none",
			"font-family:Arial",
			"width:20px",
			"height:20px",
			"z-index:999",
			"display:block"		
		],
		foldBtnCss = [
			"position:absolute",
			"background:#999",
			"color:#FFF",
			"text-align:center",
			"line-height:20px",
			"top:10px",
			"right:35px",
			"text-decoration:none",
			"font-family:Arial",
			"width:20px",
			"height:20px",
			"z-index:999",
			"display:block"
		],
		liStyle = [
			"list-style: none"
		],
		cssText = [
			"position:absolute",
			"border:2px solid #ccc",
			"background:#F5F5F5",
			"top:10px",
			"right:10px",
			"width:380px",
			"padding:10px",
			"font-size:12px",
			"line-height:150%",
			"cursor:move",
			"color:#000",
			"opacity: 0.8",
			"overflow:hidden",
			"-moz-user-select:none",
			"user-select:none",
			"-webkit-user-select:none",
			"display:block"
		];
		
	var getElement = function(parentElement){
		var nodes, i;
		
		nodes = parentElement.getElementsByTagName("div");
		
		for(i=0; i<nodes.length; i++){
			if(nodes[i].id === elementId){
				return nodes[i];
			}
		}
		
		return null;
	};
	
	var createElement = function(parentElement){
		var element, a;
		
		element = getElement(parentElement);
		
		if(element){
			removeElement(parentElement);
		}
		
		element = document.createElement("div");
		element.id = elementId;
		element.style.cssText = cssText.join(";");
		
		parentElement.appendChild(element);
		
		return element;
	};
	
	var createCloseBtn = function(element){
		var a;
		
		a = document.createElement("a");
		a.href = href;
		a.innerHTML = "X";
		a.title = "Close the dialog";
		a.style.cssText = closeBtnCss.join(";");
		
		a.addEventListener("mouseover", function(){
			this.style.fontWeight = "bold";
		});
		
		a.addEventListener("mouseout", function(){
			this.style.fontWeight = "normal";
		});
		
		a.addEventListener("click", function(event){
			event = event || window.event;
			stopEvent(event);
			$(element).fadeOut(closeSpeed ,function(){
				$(this).remove();
			});
		});
		
		a.addEventListener("mousedown",function(event){
			stopEvent(event);
		});
		
		element.appendChild(a);
	};
	
	var move = function(boxElement, infoElement){
		var diff = {}, moveElement, boxX, boxY;

		infoElement.addEventListener("mousedown", function(event){
			var  moveCss = [];
			event = event || window.event;
			
			boxX = $(boxElement).offset().left;
			boxY = $(boxElement).offset().top;
			
			diff.x = event.clientX - $(this).offset().left;
			diff.y = event.clientY - $(this).offset().top;

			moveCss.push("border:1px dotted #000");
			moveCss.push("position:absolute");
			moveCss.push("background:#999");
			moveCss.push("opacity: 0.3");
			moveCss.push("width:" + ($(this).outerWidth()-2) + "px");
			moveCss.push("height:" + ($(this).outerHeight()-2) + "px");
			moveCss.push("left:" + $(this).position().left + "px");
			moveCss.push("top:" + $(this).position().top + "px");
			moveCss.push("cursor:move");
			
			moveElement = document.createElement("div");
			moveElement.style.cssText = moveCss.join(";");
			
			boxElement.appendChild(moveElement);
			document.addEventListener("mousemove", moveHandle);
			document.addEventListener("mouseup",moveFish);
			document.body.setAttribute("onmousedown", "return false;");
		});
		
		var returnFalse = function(){
			return false;
		};

		var moveFish = function(event){
			var lg;
			
			lg = dis({
				x: $(infoElement).position().left,
				y: $(infoElement).position().top
			},{
				x: $(moveElement).position().left,
				y: $(moveElement).position().top
			});
			
			lg = lg<moveMinSpeed ? moveMinSpeed : lg;
			
			$(moveElement).css({"z-index":0});
			$(infoElement).css({
				"left": $(infoElement).position().left + "px"
			}).animate({
				left: $(moveElement).position().left,
				top : $(moveElement).position().top
			}, lg, function(){
				moveHistory.pop();
				moveHistory.push($(this).position());
			});
			
			$(moveElement).fadeOut(lg, function(){
				$(this).remove();
			});

			document.removeEventListener("mousemove", moveHandle);
			document.removeEventListener("mouseup", moveFish);
			document.body.removeAttribute("onmousedown");
		};
		
		var dis = function(fromPos, targetPos){
			var height, width;
			
			height = Math.abs(fromPos.y - targetPos.y);
			width = Math.abs(fromPos.x - targetPos.x );
			
			return Math.sqrt( width*width + height*height );
		};
		
		var moveHandle = function(event){
			var x, y, toX, toY, arr=[];
			
			event = event || window.event;

			x = event.clientX - boxX;
			y = event.clientY - boxY;

			toX = range( x-diff.x, 0, $(boxElement).width() - $(moveElement).outerWidth() );
			toY = range( y-diff.y, 0, $(boxElement).height() - $(moveElement).outerHeight() );
			
			moveElement.style.left = toX + "px";
			moveElement.style.top = toY + "px";
		};
	};
	
	var range = function(num, min, max){
		if(num>max){
			num = max;
		}else if(num<min){
			num = min;
		}
		
		return num;
	};
	
	var fold = function(element, num){
		var a, originHeight, originOuterHeight, arr=[];
		
		moveHistory.push($(element).position());
		num = num || 45;
		originOuterHeight = $(element).outerHeight();
		originHeight = element.clientHeight;
		
		a = document.createElement("a");
		a.href = href;
		a.innerHTML = "-";
		a.title = "Fold the dialog";
		a.style.cssText = foldBtnCss.join(";");
		
		a.addEventListener("mouseover", function(){
			this.style.fontWeight = "bold";
		});
		
		a.addEventListener("mouseout", function(){
			this.style.fontWeight = "normal";
		});
		
		a.addEventListener("click", function(event){
			var parent, pos, toY, height, text;
			
			event = event || window.event;
			stopEvent(event);
			
			if(element.clientHeight <= num){
				this.innerHTML  = "-";
				parent = $(element).parent();
				pos = $(element).position();
				moveHistory.push(pos);
				toY = range( pos.top, 0, parent.height() - originOuterHeight );
				height = originHeight;
			}else{
				this.innerHTML  = "+";
				parent = $(element).parent();
				pos = moveHistory.length >= 1 ? moveHistory.pop() : $(element).position();
				height = num;
				if(pos.top === parent.height() - originOuterHeight){
					toY =  parent.height() - ($(element).outerHeight() - (element.clientHeight - num));
				}else{
					toY = pos.top;
				}
			}

			$(element).stop();
			$(element).animate({
				top : toY,
				height : height
			}, Math.abs(height - $(element).height()));
			
		});
		
		a.addEventListener("mousedown",function(event){
			stopEvent(event);
		});
		
		element.appendChild(a);		
	};
	
	var stopEvent = function(e){
		if(e.preventDefault){
			e.preventDefault();
		}
			
		if (e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}	
	};
	
	var removeElement = function(parentElement){
		var element;
		
		element = getElement(parentElement);
		if(element){
			$(element).remove();
		}
	};

	// 提示信息
	Search.fn.info = function(path){
		var _this = this, element, i, k, msg = [], tmp=[], html = "", li = null;
		
		if(typeof path === "undefined" || path.vertex.length === 0){
			removeElement(_this.graph.container);
			return false;
		}
		
		element = createElement(_this.graph.container);
		
		tmp.push(_this.msg.S1);
		tmp.push(path.vertex[0].value);
		tmp.push(_this.msg.S2);
		tmp.push(path.vertex[path.vertex.length-1].value);
		msg.push(tmp.join("  "));
		msg.push(hr);
		
		for(i=0, k=path.vertex.length-1; i<k; i++){
			tmp = [];
			tmp.push(_this.msg.F1(i+1));
			tmp.push(_this.msg.S1);
			tmp.push(path.vertex[i].value);
			tmp.push(_this.msg.S3);
			tmp.push(path.edge[i].value);
			tmp.push(_this.msg.S4);
			tmp.push(path.vertex[i+1].value);
			msg.push(tmp.join("  "));
		}
		

		html = "";
		
		for(i=0, k=msg.length; i<k; i++){
			li = document.createElement("li");
			li.innerHTML = msg[i];
			li.style.cssText = liStyle;
			html += li.outerHTML;
		}
		
		element.innerHTML = html;
		
		createCloseBtn(element);
		move(_this.graph.container, element);
		fold(element);
	};

})();
