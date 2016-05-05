
(function(self){
	
	var dropElement = null;

	dropElement = function(boxElement, infoElement, targetElement){
		var diff = {},
			eventElement = null,
			moveElement = null,
			moveHistory = [],
			moveMinSpeed = 200,
			boxX = 0, 
			boxY = 0;

		eventElement = targetElement ? targetElement : infoElement;
		eventElement.addEventListener("mousedown", function(event){
			var  moveCss = [];
			event = event || window.event;
			
			boxX = $(boxElement).offset().left;
			boxY = $(boxElement).offset().top;
			
			diff.x = event.clientX - $(infoElement).offset().left;
			diff.y = event.clientY - $(infoElement).offset().top;

			moveCss.push("border:1px dotted #000");
			moveCss.push("position:absolute");
			moveCss.push("background:#999");
			moveCss.push("opacity: 0.3");
			moveCss.push("width:" + ($(infoElement).outerWidth()-2) + "px");
			moveCss.push("height:" + ($(infoElement).outerHeight()-2) + "px");
			moveCss.push("left:" + $(infoElement).position().left + "px");
			moveCss.push("top:" + $(infoElement).position().top + "px");
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
		
		var range = function(num, min, max){
			if(num>max){
				num = max;
			}else if(num<min){
				num = min;
			}
			
			return num;
		};
	};
	
	window.dropElement = dropElement;

})(this);
