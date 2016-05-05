
(function(self){
	
	"use strict";
	
	var showDetail = null,
		dialog = null,
		move = null,
		weitiao = null,
		i = 0,
		rowspan = null,
		getSpan = null,
		format = null,
		table = null,
		head = null,
		body = null,
		getData = null;

	rowspan = function(indexs){
		var com = null;

		com = function(start, last, index){
			var rows = 0,
				removes = [],
				i = 0;

			start++;
			last++;
			rows = last - start + 1;
			table.find("tr:eq("+start+")").find("td:eq("+index+")").attr("rowspan", rows);
			for(i=start+1; i<=last; i++){
				removes.push(table.find("tr:eq("+i+")").find("td:first"));
			}
			removes.each(function(){
				this.remove();
			});
		};

		if(table.find("tr").length>=3){
			indexs.each(function(){
				var index = this,
					rows = 0,
					lastIndex = 0,
					targetIndex = 0,
					trLeng = 0,
					lastName = false;

				trLeng = table.find("tr").length - 2;
				table.find("tr:gt(0)").each(function(i){
					var html = "";
					html = $(this).find("td:eq("+index+")").html();

					if(i > 0 && html != lastName){
						targetIndex = i - 1;
						if(targetIndex>=2){
							com(lastIndex, targetIndex, index);
						}
						lastIndex = i;
					}else if(html == lastName && i==trLeng){
						targetIndex = i;
						com(lastIndex, targetIndex, index);
					}else{
						lastName = html;
					}
					rows++;
				});
			});
		}
	};

	format = function(data){
		var i = 0,
			ii = 0,
			list = [],
			row = [],
			color = null;

		list.push(data.head);
		for(i=0; i<data.row.length; i++){
			row = [];
			for(ii=0; ii<data.head.length; ii++){
				if(typeof data.row[i][data.head[ii]] === "undefined"){
					row.push("");
				}else{
					row.push(data.row[i][data.head[ii]]);
				}
			}
			list.push(row);
		}
		return list;
	};

	getSpan = function(container, bg, color){
		var span = null;
		span = document.createElement("span");
		span.innerHTML = container;
		span.style.cssText = [
			"display: block",
			"width: 100%",
			"height: 100%",
			"background: " + bg,
			"color: " + color
		].join(";");
		return span.outerHTML;
	};
	
	weitiao = function(main, container){
		var pos,
			width,
			height,
			left = 0,
			top = 0,
			margin = 10,
			w,
			h;
			
		width = $(container).width();
		height = $(container).height();
		w = main.outerWidth();
		h = main.outerHeight();
		pos = main.position();
		
		if( w+pos.left > width){
			main.css("left", left+"px");
		}
		if( h+pos.top > height){
			main.css("top", top+"px");
		}
		
		// 默认到右下
		left = width - w - margin;
		top = height - h - margin;
		main.css("top", top+"px");
		main.css("left", left+"px");
	};
	
	showDetail = function(cell, e, data, container, fun){
		var html = "",
			main = null,
			pos = null,
			height = 0,
			maxHeight = 0,
			id = "";

		$(".alert-dialog").remove();

		id =  graph.utils.randstr();
		pos = $(container).offset();

		if(Array.isArray(data)){
			html = graph.utils.render("share/alertTable.html", {
				x : e.clientX - pos.left,
				y : e.clientY - pos.top,
				id : id,
				list: data
			});
		}else if(typeof data === "string"){
			html = graph.utils.render("share/alertTable1.html", {
				x : e.clientX - pos.left,
				y : e.clientY - pos.top,
				id : id,
				table: data
			});
		}

		if(html){
			$(container).append(html);

			main = $("#" + id);
			main.find(".alert-dialog-close").click(function(){
				main.remove();
				if(typeof fun === "function"){
					fun();
				}
			});

			table = main.find(".alert-table");
			head = main.find(".alert-dialog-head");
			body = main.find(".alert-dialog-body");

			maxHeight = window.parseInt($(container).height() * 0.9);
			if(main.height() > maxHeight){
				main.height(maxHeight);
				body.height(maxHeight-head.height());
			}

			weitiao(main, container);
			rowspan([0, 1]);
			dropElement(container, main[0], head[0]);
		}else{
			alert("格式错误！");
			throw new Error("格式错误！");
		}

		return {
			resize: function(){
				weitiao(main, container);
			}
		};
	};
	
	graph.showDetail = showDetail;
})(graph);
