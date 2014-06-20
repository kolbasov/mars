var restify = require('restify');

var client = restify.createJsonClient({
	url: 'http://marsweather.ingenology.com',
	version: '*'
});

exports.latest = function(cb) {
	client.get('/v1/latest/', function(err, req, res, obj) {
		cb(err, obj);
	});
};

exports.archive = function(cb) {
	client.get('/v1/archive/', function(err, req, res, obj) {
		cb(err, obj);
	});
};