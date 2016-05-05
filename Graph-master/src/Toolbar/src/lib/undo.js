
lib.undo = (function(){
	var o = {};
	o.name = "撤销";
	o.image = "icon-undo";
	o.func = function(){
		this.graph.stopEditing(false);
		this.editor.undoManager.undo();
	};
	return o;
})();