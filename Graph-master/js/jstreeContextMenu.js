
(function(self){

	var F = null;

	self.jstreeContextMenu = function($elt, node, isPub, isAdmin){
		return new F($elt, node, isPub, isAdmin).getItems();
	};

	F = function($elt, node, isPub, isAdmin){
		this.node = node;
		this.isPub = isPub;
		this.isPri = !isPub;
		this.isAdmin = isAdmin;
		this.$elt = $elt;
		this.jstree = $elt.jstree(true);
		this.reName = isPub ? graph.api.pubCateRename : graph.api.priCateRename;
		this.delFold = isPub ? graph.api.pubCateDel : graph.api.priCateDel;
		this.isView = typeof node.original.view === "undefined" ? false : true;
		this.createFoldApi = isPub ? graph.viewManagement.createFoldPublic : graph.viewManagement.createFoldPrivate;
	};

	F.prototype.getItems = function(){
		var _this = this,
			o = {};

		if((_this.isPub && _this.isAdmin) || _this.isPri){
			if(_this.isView){
				o.renameView = _this.renameView();
				o.deleteView = _this.deleteView();
			}else{
				o.renameFold = _this.renameFold();
				o.createFold = _this.createFold();
				o.deleteFold = _this.deleteFold();
			}
		}
		return o;
	};

	F.prototype.reg = function(label, action){
		return {
			label: label,
			action: action
		};
	};

	F.prototype.deleteView = function(){
		var _this = this;
		return _this.reg("删除视图", function(){
			var result = null;
			result = graph.api.viewDel(_this.node.original.id)
			if (graph.utils.isTrueRet(result)) {
				_this.jstree.delete_node([_this.node.original.id]);
			}
			graph.utils.alert(result.message);
		});
	};

	F.prototype.renameView = function(){
		var _this = this;
		return _this.reg("重命名视图", function(){
			var html = "";
			html = graph.utils.render("view/rename.html", {value: _this.node.original.text});
			graph.dialog("重命名", html, function ($elt, dialog) {
				var newName = "",
					result = null;
				newName = $.trim($elt.find("input").val());
				if(newName){
					result = graph.api.viewRename(_this.node.original.id, newName);
					if(graph.utils.isTrueRet(result)){
						_this.jstree.set_text(_this.node.original.id, newName);
						dialog.hide();
					}
					graph.utils.alert(result.message);
				}else{
					graph.utils.alert("名称不能为空");
				}
			});
		});
	};

	F.prototype.createFold = function(){
		var _this = this;
		return _this.reg("创建目录", function(){
			_this.createFoldApi(null, _this.node.original.id);
		});
	};

	F.prototype.renameFold = function(){
		var _this = this;
		return _this.reg("重命名目录", function(){
			var html = "";
			html = graph.utils.render("view/rename.html", {value: _this.node.original.text});
			graph.dialog("重命名目录", html, function ($elt, dialog) {
				var newName = "",
					result = null;
				newName = $.trim($elt.find("input").val());
				if(newName){
					result = _this.reName(_this.node.original.id, newName);
					if(graph.utils.isTrueRet(result)){
						_this.jstree.set_text(_this.node.original.id, newName);
						dialog.hide();
					}
					graph.utils.alert(result.message);
				}else{
					graph.utils.alert("名称不能为空");
				}
			});
		});
	};

	F.prototype.deleteFold = function(){
		var _this = this;
		return _this.reg("删除目录", function(){
			var result = null;
			result = _this.delFold(_this.node.original.id)
			if (graph.utils.isTrueRet(result)) {
				_this.jstree.delete_node([_this.node.original.id]);
			}
			graph.utils.alert(result.message);
		});
	};

})(nameSpace.reg("graph"));