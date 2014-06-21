var http = require('http')
	fs = require('fs'),
	express = require('express'),
	weather = require('./libs/weather.js'),
	cache = require('./libs/cache.js');

var pub = __dirname + '/public';

var app = express();

app.use(express.static(pub));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	weather.get(res, cache);
});

var port = Number(process.env.PORT || 5000);

var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
});