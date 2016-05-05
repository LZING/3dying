
(function(self){

	"use strict";

	self.graph = self.graph || {};

	var Index = {

		init: function(){
			graph.onlineEdit.init();
			graph.viewManagement.init();
			graph.viewPortfolio.init();

			graph.onlineEdit.select();
			graph.openChild = graph.onlineEdit;
			//graph.viewPortfolio.init();
		},

		size: function(){
			var size,
				$tabContent = $("#siderbar").find(".tab-content"),
				$mainBox = $(".main-box"),
				$header = $(".succ-header");

			size = function(){
				var height = $(window).height() - $header.height();
				$mainBox.height(height);
			};

			size();
			$(window).resize(size);

			$tabContent.height($(window).height() - $tabContent.offset().top);
			$tabContent.css("overflow", "auto");
		},

		tooltip: function(){
			$(".tooltips").tooltip();
		},

		collapseLeft: function(){
			var $siderbar = $("#siderbar"),
				$graphs = $("#graphs"),
				oriWidth = $siderbar.width();

			$("#collapse-sidebar").click(function(){
				if($siderbar.width() === 0){
					$siderbar.width(oriWidth);
					$graphs.css("margin-left", oriWidth + "px");
					$(this).removeClass("deg180");
				}else{
					$siderbar.width(0);
					$graphs.css("margin-left", 0);
					$(this).addClass("deg180");
				}
			});
		},

		menuToggle: function(){
			var $iconItems = $(".left-bar-icon-item");
			$iconItems.each(function(){
				$(this).click(function(){
					$iconItems.removeClass("active");
					$(this).addClass("active");

					$(".left-bar-area-item").removeClass("active");
					$($(this).attr("data-sidebar")).addClass("active");

					$(".graphs-item").removeClass("active");
					$($(this).attr("data-graph")).addClass("active");

					graph[$(this).attr("data-module")].select();
					graph.openChild = graph[$(this).attr("data-module")];
				});
			});
		}
	};

	self.graph.onload = function(){
		graph.header();
		Index.size();
		Index.collapseLeft();
		Index.menuToggle();
		Index.tooltip();
		Index.init();
	};

})(this);