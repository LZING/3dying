
lib.redo = (function(){
	var o = {};
	o.name = "重做";
	o.image = "icon-redo";
	o.func = function(){
		this.graph.stopEditing(false);
		this.editor.undoManager.redo();
	};
	return o;
})();