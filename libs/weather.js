var fs = require('fs'),
	maas = require('./maas.js'),
	report = require('./report.js');

var keys = { latest: 'latest', archive: 'archive' };

exports.latest = function(res, cache) {
	
	var result = cache.get(keys.latest);

	if(result) {
		res.render('index', result);
		return;
	}

	maas.latest(function(err, data) {
		if(err) {
			res.send(500, err.message);
			return;
		}

		result = report.latest(data);
		cache.set(keys.latest, result);
		res.render('index', result);		
	});
};

exports.archive = function(res, cache) {
	if(cache.get(keys.archive))
		return;

	maas.archive(function(err, data) {
		if(err) {
			res.send(500, err.message);
			return;
		}

		report.archive(data, function(report) {
			cache.set(keys.archive, true);
			fs.writeFile('public/js/data.js', 'var data=' + JSON.stringify(report) + ';');
		});
	});
};
