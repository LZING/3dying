

(function(_this){
	
	"use strict";
	
	var contextMenu = function(o){
		var _this = this;
		o = o ? o : {};
		_this.split = 15;
		_this.id = md5(Date.now());
		_this.className = "context-menu";
		_this.childClassName = "context-menu-child";
		_this.childIcoClassName = "context-menu-child-ico";
		
		_this.bgColor = o.bgColor ? o.bgColor : "#000";
		_this.color = o.color ? o.color : "#FFF";
		_this.width = o.width ? o.width : 150;
		
		
		_this.element = this.createMain();
		_this.element.id = this.id;
		_this.lock = false;
		_this.element.addEventListener("mouseleave", function(){
			_this.hide();
		});
		document.body.appendChild(this.element);
	};
	
	(function(){
		contextMenu.prototype.createMain = function(){
			var _this = this, element;
			
			element = document.createElement("div");
			element.style.cssText = [
				"width:" + _this.width + "px",
				"background:" + _this.bgColor,
				"color:" + _this.color,
				"position: absolute",
				"padding: 5px",
				"border:2px solid #EEE",
				"box-shadow: 3px 3px 6px #C0C0C0",
				"display: none",
				"font-size: 12px"
			].join(";");
			
			element.className = _this.className;
			return element;
		};
	})();
	
	
	(function(){
		
		contextMenu.prototype.addItem = function(title, image, fun, parentElement){
			var _this = this, itemElement, innerElement, nodeElement;
			
			itemElement = document.createElement("div");
			
			itemElement.style.cssText = [
				"position: relative",
				"padding: 2px 5px",
				"border-radius: 3px",
				"cursor: pointer"
			].join(";");
			
			itemElement.addEventListener("click", function(){
				if(typeof fun === "function"){
					fun();
					_this.hide();
				}else if(!_this.getChild(this)){
					_this.hide();
				}
			});
			
			itemElement.addEventListener("mouseleave", function(){
				if(!_this.isIntoChild(this)){
					this.style.background = "none";
					_this.closeChild(this);					
				}		
			});
			itemElement.addEventListener("mouseenter", function(){
				this.style.background = "#666";
				_this.showChild(this);
			});
			
			
			innerElement = document.createElement("span");
			innerElement.innerHTML = title;
			
			itemElement.appendChild(innerElement);
			if(parentElement){
				nodeElement = parentElement.querySelector("." + _this.childClassName);
				if(!nodeElement){
					nodeElement = _this.createMain();
					nodeElement.style.left = (_this.width - _this.split) + "px";
					nodeElement.style.top = 0 + "px";
					nodeElement.className = _this.childClassName;
					_this.addChildLevelIco(parentElement);
					parentElement.appendChild(nodeElement);
				}
				
				nodeElement.appendChild(itemElement);
			}else{
				_this.element.appendChild(itemElement);
			}
			
			return itemElement;
		};
		
		contextMenu.prototype.clearAllItems = function(){
			var _this = this, i, k, childElements;
			while(_this.element.firstChild){
				_this.element.removeChild(_this.element.firstChild);
			}
		};	
		
	})();
	
	
	(function(){
		contextMenu.prototype.hasChildIco = function(element){
			var _this = this;
			return element.querySelector("." + _this.childIcoClassName);
		};
		
		contextMenu.prototype.createChildIco = function(element){
			var _this = this,
				icoElement = null;
				
			icoElement = document.createElement("div");
			icoElement.style.cssText = [
				"width: 0px",
				"height: 0px",
				"font-size: 0px",
				"line-height: 0px",
				"position: absolute",
				"cursor: pointer",
				"border-top: 5px solid transparent",
				"border-bottom: 5px solid transparent",
				"border-left: 7px solid #FFF",
				"right: 5px",
				"top: 0",
				"bottom: 0",
				"z-index: 99999",
				"margin: auto"
			].join(";");
			element.appendChild(icoElement);
		};
		
		contextMenu.prototype.addChildLevelIco = function(element){
			var _this = this;
			if(!_this.hasChildIco(element)){
				_this.createChildIco(element);
			}
		};
	})();
	
	(function(){
		
		contextMenu.prototype.addSeparator = function(parentElement){
			var _this = this,
				nodeElement = null,
				separatorElement = null;
				
			separatorElement = document.createElement("div");
			
			separatorElement.style.cssText = [
				"background: #CCC",
				"display:block",
				"margin:3px 0",
				"height: 1px"
			].join(";");
			
			if(parentElement){
				nodeElement = parentElement.querySelector("." + _this.childClassName);
				nodeElement.appendChild(separatorElement);
			}else{
				_this.element.appendChild(separatorElement);
			}
		};
		
	})();
	
	(function(){
		
		contextMenu.prototype.getChild = function(element){
			var _this = this;
			return element.querySelector("." + _this.childClassName);
		};
		
		contextMenu.prototype.showChild = function(element){
			var _this = this, child;
			child = _this.getChild(element);
			if(child){
				child.style.display = "block";
			}
		};

		contextMenu.prototype.closeChild = function(element){
			var _this = this, child;
			child = _this.getChild(element);
			if(child){
				child.style.display = "none";
			}
		};
	})();
	
	(function(){
		contextMenu.prototype.isIntoChild = function(element){
			var _this = this, child, isVisible;
			
			child = _this.getChild(element);
			if(child && child.style.display === "block"){
				isVisible = true;
			}else{
				isVisible = false;
			}
		};	
	})();
	
	(function(){
		contextMenu.prototype.show = function(x, y){
			var _this = this, doc;
			
			if(_this.element.children.length >= 1){
				_this.element.style.opacity = 0;
				_this.element.style.display = "block";
				
				
				doc = document.documentElement;
				if(doc.clientHeight < y + _this.element.clientHeight){
					y -= _this.element.clientHeight + 1;
				}else{
					y--;
				}
				
				if(doc.clientWidth < x + _this.element.clientWidth){
					x -= _this.element.clientWidth + 1;
				}else{
					x--;
				}
				
				_this.element.style.left = x + "px";
				_this.element.style.top = y + "px";
				_this.element.style.opacity = 1;				
			}
		};
		
		contextMenu.prototype.hide = function(x, y){
			var _this = this;
			_this.element.style.display = "none";
		};
	})();
	

	_this.contextMenu = contextMenu;
	
})(this);
