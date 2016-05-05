(function(){
	
	"use strict";
	
	Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
		var result;
		
		switch (operator) {
			case '==':
				result = (v1 == v2) ? options.fn(this) : options.inverse(this);
				break;
			case '===':
				result = (v1 === v2) ? options.fn(this) : options.inverse(this);
				break;
			case '<':
				result = (v1 < v2) ? options.fn(this) : options.inverse(this);
				break;
			case '<=':
				result = (v1 <= v2) ? options.fn(this) : options.inverse(this);
				break;
			case '>':
				result = (v1 > v2) ? options.fn(this) : options.inverse(this);
				break;
			case '>=':
				result = (v1 >= v2) ? options.fn(this) : options.inverse(this);
				break;
			default:
				result = options.inverse(this);     
				break;
		}
		
		return result;
	});
	
	Handlebars.registerHelper('isEmpty', function (value, options) {
		var result = null;
		
		result = value.length >= 1 ? options.inverse(this) : options.fn(this) ;
		
		return result;
	});
	
	
	Handlebars.registerHelper('add', function (value) {
		var result = null;
		
		return window.parseInt(value, 10) + 1;
	});

	Handlebars.registerHelper('first', function (value) {
		return value[0];
	});

	Handlebars.registerHelper('isEven', function (value, options) {
		return value%2 === 0 ? options.inverse(this) : options.fn(this);
	});
})(Handlebars);
