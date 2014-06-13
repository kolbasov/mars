var http = require('http');
var express = require('express');
var weather = require('./libs/weather.js')
var cache = require('./libs/cache.js');

var pub = __dirname + '/public';

var app = express();

app.use(express.static(pub));
app.set('view engine', 'jade');

app.get('/', function(req, earth) {

	var report = cache.get();

	if(report) {
		earth.render('index', report);
		return;
	}

	http.get("http://marsweather.ingenology.com/v1/latest/", function(mars) {
		mars.on('data', function(data) {
			report = weather.report(data);
			cache.set(report);
			earth.render('index', report);
		});
	})
	.on('error', function(err) {
		earth.send(500, err.message);
	});
});

var server = app.listen(1337, function() {
	console.log('Listening on port %d', server.address().port);
});