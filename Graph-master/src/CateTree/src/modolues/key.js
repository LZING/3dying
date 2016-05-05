
(function(){

	var key = {

		str : [
			'a','b','c','d','e','f','g','h','i','j','k','l','m',
			'o','p','q','r','s','t','x','u','v','y','z','w','n',
			'0','1','2','3','4','5','6','7','8','9'
		],
		
		randint : function(n,m){
			var c = m-n+1;
			var num = Math.random() * c + n;
			return	Math.floor(num);
		},

		randStr : function(){
			var _this = this;
			var leng = _this.str.length - 1;
			var randkey = _this.randint(0, leng);
			return _this.str[randkey];
		},
		
		create : function(len){
			var _this = this;
			var l = len || 10;
			var str = '';
			
			for(var i = 0 ; i<l ; i++){
				str += _this.randStr();
			}
		
			return str;
		}

	};
	
	T.fn.key = function(length){
		
		if(typeof length !== "number" || length<1 ){
			length = 32;
		}
		
		return key.create(length);
		
	};

})();