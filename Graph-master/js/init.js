
(function(self){
	
	"use strict";
	
	
	// ========
	// mxGraph
	// ========
	
	// Enables crisp rendering of rectangles in SVG
	if(typeof mxRectangleShape === "object"){
		mxRectangleShape.prototype.crisp = true;
	}
	
	// =========
	// Index
	// =========
	var Index = {
		
		updateIconLib: function(){
			var o = null,
				result = null,
				loop = null;
				
			o = nameSpace.reg("graph.ICO");
			result = graph.api.getCiCate();
				
			loop = function(arr){
				var i = 0;
				for(i=0; i<arr.length; i++){
					if(typeof arr[i].ico === "string"){
						o[arr[i].name] = "../" + arr[i].ico;
					}
					
					if(typeof arr[i].childrenNode === "object"){
						loop(arr[i].childrenNode);
					}
				}
			};
			
			loop(result.data);
		},
		
		onload: function(){
			if(typeof graph.onload === "function"){
				graph.onload();
			}
		},

		checkBrowser: function(){
			if(graph.utils.isIE(6) || graph.utils.isIE(7) || graph.utils.isIE(8)){
				window.location.href = "browser-support.html";
			}
		},

		tooltips: function(){
			$('*[data-toggle=tooltip]').tooltip();
		},

		collapse: function(){
			$('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function(e) {
				e.preventDefault();
				var el = $(this).closest(".portlet").children(".portlet-body");
				if ($(this).hasClass("collapse")) {
					$(this).removeClass("collapse").addClass("expand");
					el.slideUp(200);
				} else {
					$(this).removeClass("expand").addClass("collapse");
					el.slideDown(200);
				}
			});
		}

	};

	
	$(window).ready(function(){
		// check browser
		Index.checkBrowser();
		// init ICO
		Index.updateIconLib();
		// tooptips
		Index.tooltips();

		Index.collapse();

		// onload
		Index.onload();

	});

})(this);


