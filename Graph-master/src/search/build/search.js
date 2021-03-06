/** 
 * -------------------------------------------------------------
 * Copyright (c) 2013 search, All rights reserved. 
 *  
 * @version: 0.0.0 
 * @author: lizhong <mail@lizhong.me> 
 * @description:  
 * @project: search 
 * @date: 2014-10-11 
 * -------------------------------------------------------------
 */ 

(function(window, undefined){ 

//-----------------
// 变量定义
//-----------------

var

/**
 * 定义一个本地Search的副本
 * @type Class
 */
Search,

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


// 类定义
Search = function(options) {
	return new Search.fn.init(options);
};

Search.fn = Search.prototype = {
	constructor : Search,
	init : function(options) {
		var i,k, _this = this;
		THIS = this;
		
		_this.vertexs = [];
		_this.originalStyle = {};
		for(i in options){
			_this[i] = options[i];
		}
	}
};

Search.fn.init.prototype = Search.fn;

Search.fn.VERSION = 1.0;



// 给细胞添加高亮
(function(){
	
	var vertexStyle = "strokeWidth=4;strokeColor=#0066FF;";
	var edgeStyle = "strokeColor=#0066FF;strokeWidth=4;fillColor=none;";
	
	var setStyle = function(graph, cell, style, ogStyle){
		
		ogStyle = typeof ogStyle === "string" ? ogStyle : "";
		if(ogStyle !== "" && ogStyle.charAt(ogStyle.length - 1) !== ";"){
			ogStyle += ";";
		}
		
		ogStyle += style;
		
		graph.setCellStyle(ogStyle, [cell]);
	};
	
	Search.fn.cellAddHighlighter = function(cells){
		var _this = this,
			i, k, n, m, key, o;

		if(cells){
			_this.graph.getModel().beginUpdate();
			try{
				for(i=0, k=cells.vertex.length; i<k; i++){
					_this.vertexs.push(
						_this.graph.insertVertex(
							cells.vertex[i].getParent(),
							null,
							"",
							cells.vertex[i].geometry.x,
							cells.vertex[i].geometry.y,
							cells.vertex[i].geometry.width,
							cells.vertex[i].geometry.height,
							edgeStyle
						)
					);
				}
				
				for(n=0, m=cells.edge.length; n<m; n++){
					o = cells.edge[n];
					if(typeof _this.originalStyle[o.id] === "undefined"){
						_this.originalStyle[o.id] = typeof o.getStyle() === "string" ? o.getStyle() : "";
					}
	
					setStyle(_this.graph, o, edgeStyle, _this.originalStyle[o.id]);
				}
			}finally{
				_this.graph.getModel().endUpdate();
			}		
		}

		return _this;
	};
	
})();


// 移出细胞高亮
(function(){
	
	Search.fn.cellDelHighlighter = function(){
		
		var _this = this, i, k, cells, removeCells = [];
		
		_this.graph.getModel().beginUpdate();
		try{
			while(_this.vertexs.length>=1){
				removeCells.push(_this.vertexs.pop());
			}
			_this.graph.removeCells(removeCells);
		}finally{
			_this.graph.getModel().endUpdate();
		}

		_this.graph.getModel().beginUpdate();
		try{
			cells = _this.graph.getChildCells();
			
			for(i=0, k=cells.length; i<k; i++){
				if(typeof _this.originalStyle[cells[i].id] === "string"){
					_this.graph.setCellStyle(_this.originalStyle[cells[i].id], [cells[i]]);
				}		
			}
		}finally{
			_this.graph.getModel().endUpdate();
		}

		return _this;
	};
	
})();

(function(){
	Search.fn.extend = function(o){
		var i;

		for(i in o){
			this[i] = o[i];
		}
	};
		
})();

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
	
	Search.fn.key = function(length){
		
		if(typeof length !== "number" || length<1 ){
			length = 32;
		}
		
		return key.create(length);
		
	};

})();

(function(){

	// 提示信息
	Search.fn.msg = {
		S1 : "源:",
		S2 : "目标:",
		S3 : "--",
		S4 : "-->",
		S5 : "Close the dialog",
		
		F1 : function(string){
			return "( " + string + " )";
		}
	};

})();



// 搜索
// 目前只支持傻瓜式搜索
(function(){

	Search.fn.soCell = function(key){
		var _this = this,
			result = {vertex:[], edge:[]};
			
		var loop = function(cells){
			var  i, k, n, m;
			
			for(i=0, k=cells.length; i<k; i++){
				
				if(cells[i].value.replaceAll("\n", "") === key){
					result.vertex.push(cells[i]);
					
					if(cells[i].edges && cells[i].edges.length >= 1){
						for(n=0, m=cells[i].edges.length; n<m; n++){
							result.edge.push(cells[i].edges[n]);
						}
					}
				}
				
				var childs = _this.graph.getChildVertices(cells[i]);
				if(typeof childs === "object" && childs.length >= 1){
					loop(childs);
				}
			}
		};

		cells = _this.graph.getChildVertices();
		loop(cells);
		
		return result;
	};
	
})();

// 路径
(function(){
	
	var inCell = function(id, arr){
		var i, k;
		for(i=0, k=arr.length; i<k; i++){
			if(arr[i].id === id){
				return true;
			}
		}
		return false;
	};
	
	var exCell = function(formArr, cells){
		var i, k, n, m, arr=[], isin, toArr = [];
		if(formArr && cells.edge.length >= 1){			
			for(i=0; i<cells.edge.length; i++){
				toArr.push(cells.edge[i]);
			}
			
			for(i=0; i<cells.vertex[0].edges.length; i++){
				toArr.push(cells.vertex[0].edges[i]);
			}

			for(i=0; i<formArr.length; i++){
				isin = false;
				
				for(n=0; n<toArr.length; n++){
					if(formArr[i].id === toArr[n].id){
						isin = true;
					}
				}
				
				if(!isin){
					arr.push(formArr[i]);
				}
			}
		}else{
			arr = formArr;
		}
		
		return arr ? arr : [];
	};
	
	var shortPath = function(path){
		var res, i, k, n, m, vertex, length;
		
		if(path.length === 0){
			res = {vertex:[], edge:[]};
		}else{
			for(i=0, k=path.length; i<k; i++){
				vertex = path[i].vertex;
				length = 0;
				for(n=0, m=vertex.length-1; n<m; n++){
					length += dis({
						x : vertex[n].geometry.x,
						y : vertex[n].geometry.y
					},{
						x : vertex[n+1].geometry.x,
						y : vertex[n+1].geometry.y						
					});
				}
				
				path[i].length = length;
			}
			
			path.sort(function(i, k){
				if(i.length>k.length){
					return 1;
				}else{
					return -1;
				}
			});
			
			res = path[0];
		}
		
		return path[0];
	};
	
	var dis = function(fromPos, targetPos){
		var height, width;
		
		height = Math.abs(fromPos.y - targetPos.y);
		width = Math.abs(fromPos.x - targetPos.x );
		
		return Math.sqrt( width*width + height*height );
	};
	
	Search.fn.soPath = function(from, target){
		var _this = this,
			result = {vertex:[], edge:[]},
			path = [],
			i, k;
		
		if(typeof from === "undefined" || typeof target === "undefined"){
			return result;
		}
		
		var exp = function(o){
			var i, k, n, m, last, edges, arr = [], tmp;
			
			if(o.id === target.id){
				tmp = {vertex:[], edge:[]};
				for(n=0; n<result.vertex.length; n++){
					tmp.vertex.push(result.vertex[n]);
				}
				for(n=0; n<result.edge.length; n++){
					tmp.edge.push(result.edge[n]);
				}

				path.push(tmp);
			}else{
				edges = exCell(o.edges, result);
				if(edges.length>=1){
					for(i=0, k=edges.length; i<k; i++){
						if( edges[i].source.id === o.id){
							arr.push({
								vertex : edges[i].target,
								edge : edges[i]
							});
						}else{
							arr.push({
								vertex : edges[i].source,
								edge : edges[i]
							});
						}
						
						if(arr.length >=1 && arr[arr.length-1].vertex.id ===  target.id){
							arr = [arr.pop()];
							break;
						}
					}

					for(i=0; i<arr.length; i++){
						result.vertex.push(arr[i].vertex);
						result.edge.push(arr[i].edge);		
						exp(arr[i].vertex);
						result.vertex.pop();
						result.edge.pop();
					}
				}
			}
		};
		
		result.vertex.push(from);
		exp(from);
		
		return shortPath(path);
	};
	
})();

window.Search = Search;

})( window );