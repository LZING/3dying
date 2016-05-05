var Toolbar = null,
	items = null,
	lib = {};

Toolbar = function(obj, container, items) {
	return new Toolbar.fn.init(obj, container, items);
};

Toolbar.fn = Toolbar.prototype = {
	constructor : Toolbar,
	init : function(obj, container) {
		this.graph = obj.editor.graph;
		this.editor = obj.editor;
		this.obj = obj;
		this.itemsLeft = obj.toolbarItemsLeft;
		this.itemsRight = obj.toolbarItemsRight;
		this.container = container;
		this.initUiBuild();
		this.initBtn();
	}
};

Toolbar.fn.init.prototype = Toolbar.fn;