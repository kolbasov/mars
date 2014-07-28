var http 		= require('http'),
		express = require('express'),
		weather = require('./libs/weather.js'),
		format 	= require('./libs/format.js');

var pub = __dirname + '/public';

var app = express();

app.use(express.static(pub));
app.set('view engine', 'jade');

app.locals.format = format;

app.get('/', function(req, res) {
	weather.get(function(err, data) {
		if(err) return res.send(500, err.message);
		res.render('index', data);
	});
});

app.get('/chart', function(req, res) {
	weather.chart(function(err, data) {
		if(err) return res.send(500, err.message);
		res.send(200, data);
	})
});

weather.sync();

// Sync every hour.
setInterval(weather.sync, 1000 * 3600 * 24);

var port = Number(process.env.PORT || 5000);

var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
});
