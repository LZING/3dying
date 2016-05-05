/**
 * Created by Lee on 2014/8/8.
 */
(function(MAIN, self, $){

	"use strict";

	var id = "loading",
		$id = "#" + id;

	self.show = function(){
		var bg = null,
			content = null,
			winHeight = $(window).height();

		if($($id).length >= 1){
			$($id).show();
		}else{
			bg = document.createElement("div");
			bg.id = id;
			bg.style.cssText = [
				"position: fixed",
				"background: #FFF",
				"opacity: 0.7",
				"left: 0",
				"top: 0",
				"display: none",
				"z-index: 99999999",
				"width: 100%",
					"height: " + winHeight + "px"
			].join(";");

			content = document.createElement("img");
			content.className = "pscc";
			content.src = DEFINE.loadingImg;
			bg.appendChild(content);

			$("body").append(bg);

			$(bg).show();
		}
	};

	self.hide = function(){
		$($id).fadeOut();
	};


})(nameSpace.reg("graph"), nameSpace.reg("graph.loading"), jQuery);