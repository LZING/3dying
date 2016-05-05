
(function(self){

	var initBasePath = null,
		getItems = null,
		itemLib = {},
		getLogoPath = null,
		getTip = null,
		filter = null,
		getHtml = null;

	itemLib = {
		"我的运营工作台": {
			filename: "user.html",
			icon: "images/new/top_ico_05.png"
		},
		"搜索": {
			filename: "searchMain.html",
			icon: "images/new/top_ico_01.png"
		},
		"业务流运营可视": {
			filename: "tree.html",
			icon: "images/new/top_ico_03.png"
		},
		"在线创建业务流": {
			filename: "index.html",
			icon: "images/new/top_ico_02.png"
		},
		"后台管理": {
			filename: "../admin.html",
			icon: "images/new/top_ico_04.png"
		}
	};

	getTip = function(){
		var tip = "在线创建业务流",
			i = "";

		for(i in itemLib){
			if(location.href.indexOf(itemLib[i].filename) >= 0){
				tip = i;
				break;
			}
		}
		return tip;
	};

	getItems = function(items){
		var html = "";
		$.each(items, function(){
			var o = itemLib[this];
			html += '<li>';
				html += '<a href="' + o.filename + '" target="_blank" title="'+ this +'">';
					html += '<img src="'+ o.icon +'"></i>';
				html += '</a>';
			html += '</li>';
		});
		return html;
	};

	getLogoPath = function(){
		return "images/new/logo.png";
	};

	getLogoHtml = function(tip, isHideLogo){
		if(isHideLogo){
			return "";
		}else{
			return [
				'<a class="navbar-brand" href="index.html">',
					'<img src=" '+ getLogoPath() +' " alt="logo" class="img-responsive"  />',
				'</a>',
				'<span class="header-tips"> | '+ tip +'</span>'
			].join("")
		}
	};

	getHtml = function(tip, isHideLogo){
		tip = tip ? tip : getTip();
		document.title = tip + " | ITA";
		return [
			'<div class="header-inner">',
				getLogoHtml(tip, isHideLogo),
				'<ul class="nav pull-right clear">',
					getItems(graph.utils.getAllowMenu(), tip),
				'</ul>',
			'</div>'
		].join("");
	};

	graph.header = function(tip, isHideLogo){
		var $elt = $(".header");
		$elt.addClass("navbar");
		$elt.addClass("navbar-inverse");
		//elt.addClass("navbar-fixed-top");
		$elt.html(getHtml(tip, isHideLogo));
	};
})(nameSpace.reg("graph"));