var moment = require('moment');

cache = {};

exports.get = function(name) {
	if(name in cache)
		return cache[name].date == this.now() ? cache[name].value : null;
	else
		return null;
} 

exports.set = function(name, value) {
	cache[name] = { 
		date: this.now(), 
		value: value 
	};
}

exports.now = function() {
	return moment().format('YYYY-MM-DD');	
}