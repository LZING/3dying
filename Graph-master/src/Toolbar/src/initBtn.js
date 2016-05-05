/**
 * Created by zhong on 2014/7/9.
 */

Toolbar.fn.initBtn = function(){
	var _this = this,
		loop = null,
		dropdown = null;

	dropdown = function(div, list, width){
		var $div = $(div),
			$ul = null;

		$ul = $(document.createElement("ul"));
		$ul.addClass("dropdown-menu");
		$ul.attr("role", "menu");
		$ul.attr("aria-labelledby", "dLabel");

		if(width){
			$ul.width(width);
			$ul.css("min-width", width + "px");
		}

		$.each(list, function(){
			var li = document.createElement("li"),
				i = document.createElement("i"),
				o = lib[this];

			if(o.image){
				$(i).addClass("icon");
				$(i).addClass(o.image);
			}

			if(o.text){
				i.innerHTML = o.text;
				$(i).css("font-style", "normal");
			}

			if(o.font){
				$(i).css("font-family", o.font);
			}

			//i.setAttribute("data-toggle", "tooltip");
			//i.setAttribute("data-placement", "left");
			i.setAttribute("title", o.name);

			if(typeof o.func === "function"){
				$(i).click(function(){
					o.func.apply(_this, [div]);
				});
			}

			li.appendChild(i);
			$ul.append(li);
		});

		$(div).append($ul);
	};

	loop = function(items, $container){
		$.each(items, function(index){
			var div = null,
				i = null,
				o = null;

			if(items[index] === "|"){
				div = document.createElement("div");
				div.className = "dividing-line";
				$container.append(div);
			}else if(typeof items[index] === "string"){
				div = document.createElement("div");
				i = document.createElement("i");
				o = lib[this];
				div.className = "Toolbar-item";

				if(o.icon){
					i.className = "fa " + o.icon;
				}

				if(o.image){
					$(i).addClass("icon");
					$(i).addClass(o.image);
				}

				if(o.bgColor){
					i.style.backgroundColor = o.bgColor;
				}

				if(o.text){
					i.innerHTML = o.text;
					$(i).css("font-style", "normal");
				}

				div.appendChild(i);
				$container.append(div);

				if(typeof o.func === "function"){
					$(i).click(function(){
						o.func.apply(_this, [div, i]);
					});
				}

				//div.setAttribute("data-toggle", "tooltip");
				div.setAttribute("title", o.name);

				if(Array.isArray(items[index+1])){
					$(div).addClass("dropdown");
					$(i).attr("data-toggle", "dropdown");
					dropdown(div, items[index+1], o.dropmenuWidth);
					//div.setAttribute("data-placement", "right");
				}else{
					//div.setAttribute("data-placement", "bottom");
				}
			}
		});
	};

	if(_this.itemsLeft){
		loop(_this.itemsLeft,_this.mainLeft);
	}

	if(_this.itemsRight){
		loop(_this.itemsRight,_this.mainRight);
	}

};