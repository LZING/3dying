
// 模板模块
(function(){
	
	var 
	
	// 目录
	path = "./template/tree",
	
	// 缓存开启
	cacheEnable = true,
	
	// 缓存数据
	cache = {},
	
	// 获取模板
	getTpl = function(tpl){
	
		var url = "",
			result;
		
		if( tpl.substring(0,1) != "/" ){
			tpl = "/" + tpl;
		}
		
		url = path + tpl;
		
		if(cacheEnable && (url in cache) ){
			result = cache[url];
		}else{
			
			result = $.ajax({ url: url, async: false });
			if( result.readyState === 4 &&  result.status === 200  ){
				
				if(cacheEnable){
					cache[url] = $.trim(result.responseText);
				}
				
				result = $.trim(result.responseText);
				
			}else{
				throw new Error(result.statusText);
			}
		}
		
		return result;		
		
	};
	

	// 模板渲染
	T.fn.template = function(tpl, data){
		return Handlebars.compile(getTpl(tpl))(data);
	};

})();
