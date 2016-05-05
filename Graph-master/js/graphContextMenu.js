

(function(window){
	
	"use strict";
	
	var graphContextMenu = function(o, option){
		this.editor = o.graph ? o : {graph: o};
		this.option = option;
		this.menu = new contextMenu();
		this.items = {
			cell:[],
			vertex: [],
            		vertex_chart: [],
			edge:[],
			canvas:[],
			all:[]
		};
		
		this.that = null;
		if(typeof option === "object" && option.that){
			this.that = option.that;
		}
		this.addLibs(option.libs);
		//this.addConfigDefinedMenu();
		this.itemsInit();
		this.bind();
	};
	
	/**
	 * 初始化ITEM
	 */
	(function(){ 
		
		var append = function(arr, items, libs, _this){
			var i, temp, push;
			
			push = function(name, fun, aliases){
				var text, funt;
				
				text = aliases ? aliases : name;
				funt = fun ? fun : libs[name];
				
				if(typeof funt === "function"){
					items.push({
						name: text,
						fun: function(e){
							var evt = e ? e : _this.evt;
							if(_this.that){
								funt.apply(_this.that, [evt, _this.selectionCell]);
							}else{
								funt.apply(_this.editor, [evt, _this.selectionCell]);
							}
						}
					});					
				}else{
					items.push(text);
				}
			};
			
			for(i=0; i<arr.length; i++){
				if(arr[i].constructor === Object && arr[i].name){
					push(arr[i].name, arr[i].fun, arr[i].aliases);
				}else if(arr[i].constructor === Array){
					temp = [];
					items.push(temp);
					append(arr[i], temp, libs, _this);
				}else{
					push(arr[i], libs[arr[i]]);	
				}
			}		
		};
		
		graphContextMenu.prototype.itemsInit = function(){
			var _this = this, arr, i, libs;
			
			libs = _this.getLibs();
			
			for(i in _this.items){
				arr = _this.option[i] ? _this.option[i] : [];
				append(arr, _this.items[i], libs, _this);
			}
		};
	})();
	
	/**
	 * BIND右键
	 */
	(function(){
		
		var addSeparator = "-";
		
		var addItems = function(menu, items, parentMenu){
			var i, itemMenu;
			
			for(i=0; i<items.length; i++){
				if(items[i].constructor === Array){
					addItems(menu, items[i], itemMenu);
				}else if(items[i].constructor === Object){
					if(typeof parentMenu === "object"){
						menu.addItem(items[i].name, null, items[i].fun, parentMenu);
					}else{
						itemMenu = menu.addItem(items[i].name, null, items[i].fun);
					}
				}else if(items[i].constructor === String){
					if(items[i] === addSeparator){
						menu.addSeparator(parentMenu);
					}else{
						if(typeof parentMenu === "object"){
							menu.addItem(items[i], null, null, parentMenu);
						}else{
							itemMenu = menu.addItem(items[i], null, null);
						}
					}
				}
			}
		};
		
		graphContextMenu.prototype.bind = function(){
			var _this = this;
			
			mxPopupMenu.prototype.popup = function(x, y, cell, evt){
				if(!cell || cell.id.indexOf("in_") === -1){
					if (this.div != null && this.tbody != null && this.factoryMethod != null)
					{
						this.div.style.left = x + 'px';
						this.div.style.top = y + 'px';
						
						// Removes all child nodes from the existing menu
						while (this.tbody.firstChild != null)
						{
							mxEvent.release(this.tbody.firstChild);
							this.tbody.removeChild(this.tbody.firstChild);
						}
						
						this.itemCount = 0;
						
						this.factoryMethod(this, cell, evt);
						
						if (this.itemCount > 0)
						{
							this.showMenu();
							this.fireEvent(new mxEventObject(mxEvent.SHOW));
						}
					}
				}else{
					this.graph.clearSelection();
					this.graph.selectCell(cell.getParent());
				}
			};
			
			// Prevent right-click menu
			mxEvent.disableContextMenu(document.body);
			
			// Configures automatic expand on mouseover
			_this.editor.graph.panningHandler.autoExpand = true;
			
			_this.editor.graph.popupMenuHandler.autoExpand = true;
			
			// Installs context menu
			_this.editor.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt){
				var items = [];
				
				_this.selectionCell = cell;
				
				if(cell && cell.vertex){
		                    var celltype = cell.getAttribute("type","undefined");
		                    if(celltype != "chart"){
		                        items = _this.items.vertex;

		                    }else{
		                        items = _this.items.vertex_chart;
		                    }
				}
				
				if(cell && cell.edge){
					items = _this.items.edge;
				}
				
				if(cell === null){
					items = _this.items.canvas;
				}
				
				//addItems(menu, items);
				_this.evt = evt;
				_this.menu.clearAllItems();
				addItems(_this.menu, items);
				_this.menu.show(evt.clientX, evt.clientY);
			};
		};
	})();
	


	/**
	 * js右键库
	 */
	(function(){
		
		var libs =  {};
		
		graphContextMenu.prototype.addLib = function(name, fun){
			if(typeof fun === "function"){
				libs[name] = fun;
			}
		};
		
		graphContextMenu.prototype.addLibs = function(obj){
			var i;
			if(obj && obj.constructor === Object){
				for(i in obj){
					if(obj[i].constructor === Function){
						libs[i] = obj[i];
					}
				}
			}
		};

		graphContextMenu.prototype.getLibs = function(name, fun){
			return libs;
		};
		
		graphContextMenu.prototype.addConfigDefinedMenu = function(){
			var _this = this;
			if(typeof GRAPH_CONTEXT_MENU === "object"){
				_this.addLibs(GRAPH_CONTEXT_MENU);
			}
		};
	})();

	window.graphContextMenu = graphContextMenu;
	
})(window);
