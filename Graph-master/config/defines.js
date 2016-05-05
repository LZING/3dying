
// first
(function(self){
	
	"use strict";
	
	// if
	self.IF = function(condition, trueFun, falseFun){
		var result = false;
		if(condition && typeof trueFun === "function"){
			result = trueFun();
		}else if(typeof falseFun === "function"){
			result = falseFun();
		}
		
		return result;
	};	
	
})(this);


// mxGraph defines
(function(self){
	
	"use strict";
	
	self.mxBasePath = 'plugins/mxGraph/';
	
	
	self.IMAGE_PATH = self.mxBasePath + 'images';
	self.STYLE_PATH = self.mxBasePath + 'css';
	self.RESOURCES_PATH = self.mxBasePath + 'resources';
	self.RESOURCE_BASE = self.RESOURCES_PATH + '/grapheditor';
	self.STENCIL_PATH = self.mxBasePath + 'stencils';
	
	self.MAX_REQUEST_SIZE = 10485760;
	self.MAX_AREA = 10000 * 10000;
	
	self.showConnectorImg = true;
	
	self.urlParams = (function(url) {
		var result = new Object();
		var idx = url.lastIndexOf('?');
	
		if (idx > 0) {
			var params = url.substring(idx + 1).split('&');
			for (var i = 0; i < params.length; i++) {
				idx = params[i].indexOf('=');
	
				if (idx > 0) {
					result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
				}
			}
		}
		return result;
	})(self.location.href);
	
	self.mxLanguages = ['de'];
	
})(this);

(function(self){
	
	"use strict";
	
	// 定义缓存
	self.TEMPLATE_CACHE = {};

	// 在线编辑
	self.CATE_treeIcoWidth 	= 16;		// 树形图标宽度
	self.CATE_treeIcoHeight	= 30;		// 树形图标高度
	self.CATE_treeIsFolod		= false;	// 树形是否折叠
	
	self.CATE_boxIcoWidth		= 40;		// 平铺图标宽度
	self.CATE_boxIcoHeight		= 40; 		// 平铺图标高度
	self.CATE_boxIsFolod		= true;		// 平铺是否折叠
	
	self.CATE_dragHeight 		= 80;		// 拖拽高度
	self.CATE_dragWidth 		= 80;		// 拖拽宽度
	
	self.CATE_icoWidth			= 25;		// 其它图标宽度
	self.CATE_icoHeight		= 25;		// 其它图标高度
	
	
	// 配置信息
	self.INFO_dragHeight		= 80;		// 拖拽高度
	self.INFO_dragWidth		= 80;		// 拖拽宽度

    	//仪表盘信息
    	self.CHART_dragHeight = 300;
    	self.CHART_dragWidth = 300;
	
	// KPI配置
	self.KPI_cellWidth			= 200;		// 宽度
	self.KPI_cellHeight		= 120;		// 高度
	self.KPI_row1Height		= 30;		// 第一行高度
	self.KPI_row1Y				= 30;		// 第一行的Y
	self.KPI_row2Height		= 60;		// 第二行高度
	self.KPI_row2Y				= 60;		// 第二行的Y
	
	
	// 模板配置
	self.TEMPLATES_DIR			= 'template';	// 缓存目录
	self.TEMPLATES_ISCACHE		= true;			// 缓存开启


	// EIP
	self.EIP_STROKEWIDTH        = 2;            // eip 宽度
	
	
	// 错误信息
	self.ERROR = {
		not_history: "错误：没有历史记录",
		not_relation_view: "错误：没有关联视图",
		not_open_local_file: "错误：您的浏览器不支持打开本地XML文件，推荐使用Chrome, FireFox, Safari, IE9+等现代浏览器再尝试！"
	};

	// loading
	self.loadingImg = "images/loading.gif";
	
	// 提示信息
	self.MSG_S1 = "请输入填充颜色值";
	self.MSG_S2 = "请输入字体颜色值";
	self.MSG_S3 = "请输入边框颜色值 (输入none为隐藏边框)";
	self.MSG_S4 = "请输入边框颜大小";
	self.MSG_S5 = "请输入字体大小";
	self.MSG_S6 = "请输入字体名称";
	self.MSG_S7 = "请输入透明度 （1 - 100 ）";
	self.MSG_S8 = "请输入投影数值（none关, 1为开） ";
	self.MSG_S9 = "请输入图标URL";
	self.MSG_S10 = "请输入URL";

	
})(nameSpace.reg('DEFINE'));





