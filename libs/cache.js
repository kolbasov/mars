var moment = require('moment');

var cache = { date: null, value: null };

exports.get = function() {
	return cache.date == this.now() ? cache.value : null;
} 

exports.set = function(value) {
	cache.date = this.now();
	cache.value = value;
}

exports.now = function() {
	return moment().format('YYYY-MM-DD');	
}