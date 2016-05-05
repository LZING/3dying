/**
 * Created by zhong on 2014/7/10.
 */

Toolbar.fn.initUiBuild = function(){
	var $parent = null,
		div = document.createElement("div"),
		leftDiv = document.createElement("div"),
		rightDiv = document.createElement("div");

	if(!this.container){
		$parent = $(this.graph.container).parent();
		$(div).prependTo($parent);
		$(this.graph.container).height($parent.height() - 40);
		this.container = $(div);
	}else{
		this.container.append(div);
	}

	div.className = "Toolbar clear";
	leftDiv.className = "Toolbar-left clear";
	rightDiv.className = "Toolbar-right clear";

	this.mainContainer = $(div);
	this.mainRight = $(rightDiv);
	this.mainLeft = $(leftDiv);
	div.appendChild(rightDiv);
	div.appendChild(leftDiv);
};