
(function(self){
	
	"use strict";

	self.dialog = function(title, html, fun){
		return new F(title, html, fun);
	};

	var F = function(title, html, fun){
		this.title = title;
		this.html = html;
		this.fun = fun;
		this.createDialog();
		this.addEvent();
	};
	
	F.prototype.createDialog = function(){
		var id = "",
			that = this,
			html = "";
			
		id = self.utils.randstr();
		html = self.utils.render("dialog/base.html", {
			id : id,
			title: that.title,
			html : that.html
		});

		$("body").append(html);
		
		that.element = $("#dialog-" + id).find(".modal-body");
		that.main = $("#dialog-" + id);
		that.main.modal("show");
		that.main.on("hidden.bs.modal", function(){
			that.removeElement();
		});
	};
	
	F.prototype.addEvent = function(){
		var that = this;
		
		if(that.main){
			that.main.find(".dialog-btn-ok").click(function(){
				if(typeof that.fun === "function"){
					that.fun(that.element, that);
				}else{
					that.removeElement();
				}
			});
			
			that.main.find(".dialog-btn-cancel").click(function(){
				that.removeElement();
			});
		}
	};
	
	F.prototype.removeElement = function(){
		var that = this;
		
		that.main.remove();
	};
	
	F.prototype.hide = function(){
		var that = this;
		that.main.modal("hide");
	};
	
	
})(nameSpace.reg("graph"));
