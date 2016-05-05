
(function(self){

	"use strict";

	var initMenu = null,
		config = null,
		initComputerImg = null,
		initSearch = null,
		initImgHover = null;

	config = [
		{
			img: "images/img_graph1.png",
			title: "业务流运营可视",
			des: "业务流运营分析可视，关注业务端到端的运行，直观呈现业务流运行的状态、问题和瓶颈"
		},
		{
			img: "images/img_graph2.png",
			title: "在线创建业务流",
			des: "3分钟，自助创建自己的运营可视业务流，集中定制、创建、编辑、发布可视化运营视图"
		},
		{
			img: "images/img_graph3.png",
			title: "应用基础设施可视",
			des: "自顶向下的呈现应用依赖的IT基础设施的性能容量、告警预警、关联事件等端到端状态"
		}
	];

	initSearch = function(){
		$("#searchBtn").click(function(){
			window.open("search.html?type=ci&s=" + encodeURIComponent($("#searchInput").val()));
		});
	};

	initComputerImg = function(){
		$(".items-computer").each(function(i){
			$(this).click(function(){
				$(".items-group .ok").removeClass("ok");
				$(this).addClass("ok");
				$("#computGraph").attr("src", config[i].img);
				$("#computGraphText").find("h2").html(config[i].title);
				$("#computGraphText").find("p").html(config[i].des);
			});
		});
	};

	initImgHover = function(){
		$(".box3-btns").find("img").each(function(){
			$(this).attr("oriSrc", this.src);
			$(this).mouseenter(function(){
				this.src = $(this).attr("data-hover");
			}).mouseleave(function(){
				this.src = $(this).attr("oriSrc");
			});
		});
	};

	initMenu = function(){
		$(".item-menu").each(function(){
			var _this = this,
				target = $(_this).find("a").attr("data-ad"),
				mLock = false,
				tLock = false,
				tM = null,
				lM = null,
				$main = $(target);

			if($main.length >= 1){
				$(_this).mouseenter(function(){
					$main.show();
					$(".menus .ok").removeClass("ok");
					$(_this).addClass("ok");
					mLock = true;
				}).mouseleave(function(){
					mLock = false;
					window.clearTimeout(tM);
					tM = window.setTimeout(function(){
						if(!tLock){
							$main.hide();
							$(_this).removeClass("ok");
						}
					}, 200);
				});

				$main.mouseenter(function(){
					tLock = true;
				}).mouseleave(function(){
					tLock = false;
					window.clearTimeout(lM);
					lM = window.setTimeout(function(){
						if(!mLock){
							$main.hide();
							$(_this).removeClass("ok");
						}
					}, 200);
				});
			}
		});
	};

	self.graph = window.graph || {};
	self.graph.onload = function(){
		//graph.header("", true);
		initMenu();
		initImgHover();
		initComputerImg();
		initSearch();
	};

})(this);