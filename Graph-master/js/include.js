

(function(self){
	
	
	"use strict";
	
	var debug = false,
		msieversion,
		injs;

	msieversion = function() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");

		if(msie > 0){
			return false;
		}else{
			return true;
		}
	};
	
    /**
     * 命名空间
     * @author lizhong
     */
    self.nameSpace = {
    
        reg: function(s){
			var arr = s.split('.');
			var namespace = self;
			
			for (var i = 0, k = arr.length; i < k; i++) {
				if (typeof namespace[arr[i]] == 'undefined') {
					namespace[arr[i]] = {};
				}
				
				namespace = namespace[arr[i]];
			}
			
			return namespace;
        },
        
		del: function(s){
			var arr = s.split('.');
			var namespace = self;
		    
			for (var i = 0, k = arr.length; i < k; i++) {
				if (typeof namespace[arr[i]] == 'undefined') {
				    return;
				}else if (k == i + 1) {
					delete namespace[arr[i]];
					return;
				}else{
					namespace = namespace[arr[i]];
				}
			}
		},
        
		isDefined: function(s){
			var arr = s.split('.');
			var namespace = self;
			
			for (var i = 0, k = arr.length; i < k; i++) {
				if (typeof namespace[arr[i]] == 'undefined') {
					return false;
				}
				
				namespace = namespace[arr[i]];
			}
			
			return true;
		}
    };
	
	self.addTime = function(str){
		var arr = [],
			now = Date.now();
		if(debug){
			arr = str.split("?");
			if(arr[1]){
				str += "&" + now;
			}else{
				str += "?" + now;
			}
		}
		
		return str;
	};
	
	
	self.includeJs = function(arr, fn){
		var i=0,
			k=arr.length,
			script = null,
			src = "",
			head = null,
			loop=null;

		head = document.getElementsByTagName('head')[0];

		if(arr instanceof Array || Object.prototype.toString.apply(arr) === '[object Array]'){
			loop = function(){
				src = arr.shift();
				script = document.createElement("script");
				script.type = "text/javascript";
				script.src = self.addTime(src);
				/*
				script.onreadystatechange = function() {
					if (script.readyState === 'loaded' || script.readyState === 'complete') {
						script.onreadystatechange = null;
						if(arr.length>=1){
							loop();
						}else if(typeof fn === "function"){
							fn();
						}
					}else{
						// throw new Error(src + " Error");
					}
				};
				*/
				script.onload = function(){
					if(arr.length>=1){
						loop();
					}else if(typeof fn === "function"){
						fn();
					}
				};
				script.onerror = function(e){
					throw new Error(e);
				};

				head.appendChild(script);
			};

			loop();
		}else{
			alert("错误：includeJs 参数不是一个数组");
		}
	};
	
	self.includeCss = function(arr){
		var i = 0,
			head = null,
			k = arr.length,
			link = null;

		head = document.getElementsByTagName('head')[0];

		if(arr instanceof Array || Object.prototype.toString.apply(arr) === '[object Array]'){
			for(i=0; i<k; i++){
				link = document.createElement("link");
				link.type = "text/css";
				link.setAttribute("rel", "stylesheet");
				link.href = self.addTime(arr[i]);
				head.appendChild(link);
			}
		}else{
			alert("错误：includeCss 参数不是一个数组");
		}
	};

	self.includeCss([

		// bootstrap
		"plugins/googleapi/googleapis.css",
		"plugins/bootstrap/assets/plugins/font-awesome/css/font-awesome.min.css",
		"plugins/bootstrap/assets/plugins/bootstrap/css/bootstrap.css",
		"plugins/bootstrap/assets/plugins/uniform/css/uniform.default.css",
		"plugins/bootstrap/assets/plugins/bootstrap-switch/css/bootstrap-switch.min.css",
		//"plugins/bootstrap/assets/plugins/fuelux/css/tree-metronic.css",
		
		// theme style
		"plugins/bootstrap/assets/css/components.css",
		"plugins/bootstrap/assets/css/style-metronic.css",
		//"plugins/bootstrap/assets/css/style.css",
		"plugins/bootstrap/assets/css/style-responsive.css",
		"plugins/bootstrap/assets/css/plugins.css",
		"plugins/bootstrap/assets/css/themes/default.css",
		"plugins/bootstrap/assets/css/custom.css",
		"plugins/bootstrap/assets/plugins/data-tables/DT_bootstrap.css",
		"plugins/bootstrap/assets/plugins/select2/select2.css",
		"plugins/bootstrap/assets/css/pages/tasks.css",
		
		// plugins
		"plugins/colorpicke/spectrum.css",
		"plugins/DataTables/css/jquery.dataTables.css",
		"plugins/DataTables/css/jquery.dataTables_themeroller.css",
		"plugins/DataTables/editor/css/dataTables.editor.css",
		"plugins/colorpicker/css/colorpicker.css",
		"plugins/bootstrap-daterangepicker/daterangepicker-bs3.css",
		"plugins/bootstrap-slider/css/bootstrap-slider.css",
		"plugins/font-awesome-4.2.0/css/font-awesome.css",
		"plugins/jstree/themes/custom/style.css",

		// Project style
		"css/timeline.css",
		"css/Toolbar.css",
		"css/style.css",
		"css/tree.css"

		//patch for dashboard
//		"dashboard/css/chart/default.css",
//		"dashboard/css/chart/dashboard.css",
//		"dashboard/css/chartsetting.css",
//		"dashboard/plugins/select2/select2.css"
	]);



	injs = [

		// require plugins
		"plugins/JSApi/JSApi-0.1.0.js",
		//"plugins/jquery/jquery-1.11.1.min.js",
		"plugins/jquery/jquery-2.1.1.min.js",
		//"plugins/bootstrap/assets/plugins/jquery-migrate-1.2.1.min.js",

		// server api
		"../dwr/engine.js",
		"../dwr/interface/kpiCateBuz.js",
		"../dwr/interface/ciCateBuz.js",
		"../dwr/interface/kpiCateBuz.js",
		"../dwr/interface/relCateBuz.js",
		"../dwr/interface/ciRelBuz.js",
		"../dwr/interface/kpiRelBuz.js",
		"../dwr/interface/ciKpiRelBuz.js",
		"../dwr/interface/ciViewRelBuz.js",
		"../dwr/interface/inCiCateMapBuz.js",
		"../dwr/interface/taskBuz.js",
		"../dwr/interface/eipBuz.js",
		"../dwr/interface/organizationBuz.js",
		"../dwr/interface/roleBuz.js",
		"../dwr/interface/authorizeBuz.js",
		"../dwr/interface/reportBuz.js",
		"../dwr/interface/userBuz.js",
		"../dwr/interface/userGroupBuz.js",
		"../dwr/interface/eventPerfBuz.js",
		"../dwr/interface/userViewBuz.js",

		"../dwr/interface/ciInfoBuz.js",
		"../dwr/interface/kpiInfoBuz.js",
		"../dwr/interface/viewCateBuz.js",
		"../dwr/interface/ownViewCateBuz.js",
		"../dwr/interface/viewInfoBuz.js",
		"../dwr/interface/viewPortfolioBuz.js",
		"../dwr/interface/alarmBuz.js",
		"../dwr/interface/dataBaseBuz.js",
		"../dwr/interface/dbCateMapBuz.js",
		"../dwr/interface/outCiCateMapBuz.js",
		"../dwr/interface/outKpiCateMapBuz.js",
		"../dwr/interface/imageBuz.js",
		"../dwr/interface/iconLibraryBuz.js",
		"../scripts/js/init.js",
		"../scripts/js/remote.js",

		// bootstrap
		"plugins/jquery/jquery-migrate-1.2.1.min.js",
		"plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js",
		"plugins/bootstrap/assets/plugins/bootstrap/js/bootstrap.min.js",
		"plugins/bootstrap/assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js",
		"plugins/bootstrap/assets/plugins/uniform/jquery.uniform.min.js",
		"plugins/jquery-slimscroll/jquery.slimscroll.min.js",
		"plugins/jquery/jquery.blockui.min.js",
		"plugins/bootstrap/assets/plugins/jquery.cokie.min.js",
		"plugins/jquery/jquery.cookie.min.js",
		"plugins/bootstrap/assets/plugins/fuelux/js/spinner.min.js",
		"plugins/jquery/jquery.mousewheel.js",
		"plugins/bootstrap/assets/plugins/uniform/jquery.uniform.min.js",
		"plugins/FileSaver/FileSaver.js",
		//"plugins/bootstrap/assets/plugins/data-tables/jquery.dataTables.js",
		"plugins/DataTables/js/jquery.dataTables.js",
		//"plugins/DataTables/js/fnFakeRowspan.js",
		"plugins/DataTables/editor/js/dataTables.editor.js",
		"plugins/bootstrap/assets/plugins/data-tables/DT_bootstrap.js",
		"plugins/bootstrap/assets/plugins/select2/select2.js",
		"plugins/bootstrap-slider/js/bootstrap-slider.js",

		"plugins/bootstrap-daterangepicker/moment.js",
		"plugins/bootstrap-daterangepicker/daterangepicker.js",
		"plugins/colorpicker/js/bootstrap-colorpicker.js",
		"plugins/bootstrap/assets/plugins/excanvas.min.js",
		"plugins/bootstrap/assets/plugins/respond.min.js",

		//patch for dashboard
		"dashboard/plugins/json.js",
		"dashboard/plugins/select2/select2.min.js",

		// config
		"config/defines.js",
		"config/contextMenuLibs.js",

		//patch for dashboard
		"dashboard/plugins/d3.min.js",
		"dashboard/plugins/uchart.debug.js",
		"dashboard/dist/chartsetting.debug.js",
		"dashboard/dist/chartview.debug.js",

		// plugins
		"plugins/mxGraph/mxClient.js",
		"plugins/mxGraph/Graph.js",
		"plugins/mxGraph/Graph_extend.js",
		"plugins/mxGraph/Editor.js",
		"plugins/mxGraph/Actions.js",
		"plugins/mxGraph/Shapes.js",
		"plugins/mxGraph/Sidebar.js",
		"plugins/colorpicke/spectrum.js",
		"plugins/md5/md5.min.js",
		"plugins/handlebars/handlebars-v2.0.0.js",
		"plugins/handlebars/extend.js",
		"plugins/Snap.svg/snap.svg.js",
		"plugins/jquery/jquery.bootstrap.min.js",
		"plugins/jstree/jstree.js",
		"plugins/jstree/jstree.wholerow.js",
		"plugins/jstree/jstree.contextmenu.js",
		"plugins/jstree/jstree.checkbox.js",
		//"plugins/jstree/jstree.dnd.js",
		//"plugins/jstree/jstree.types.js",
		//"plugins/jstree/jstree.state.js",
		"plugins/AngularJS/angular.min.js"
	];

	if(msieversion()){
		injs = injs.concat([
			"plugins/threejs/three.min.js",
			"font/lisu_regular.typeface.js",
			"plugins/threejs/OrbitControls.js",
			"plugins/threejs/stats.min.js",
			"plugins/threejs/THREEx.ContainerResize.js",
			"plugins/threejs/threex.dynamictexture.js",
			"plugins/threejs/MTLLoader.js",
			"plugins/threejs/OBJLoader.js",
			"plugins/threejs/OBJMTLLoader.js"
		]);
	}

	injs = injs.concat([
		// js
		"js/api.js",
		"js/loading.js",
		"js/Autolayout.js",
		"js/header.js",
		"js/utils.js",
		"js/dialog.js",
		"js/contextMenu.js",
		"js/graphContextMenu.js",
		"js/tree.js",
		"js/chartInstance.js",
		"js/onlineEdit.js",
		"js/viewManagement.js",
		"js/configInfo.js",
		"js/monitoringIndicators.js",
		"js/viewPortfolio.js",
		"js/outline.js",
		"js/Search.js",
		"js/randMonitor.js",
		"js/ciList.js",
		"js/showDetail.js",
		"js/showDashboard.js",
		"js/dropElement.js",
		"js/Timeline.js",
		"js/jstreeContextMenu.js",
		"js/Toolbar.js",
		"js/Universe.js",
		"js/init.js"

		//patch for dashboard
		//"dashboard/dist/dashboard.debug.js"
	]);
	
	self.includeJs(injs);

})(this);
