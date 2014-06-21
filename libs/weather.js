var fs = require('fs'),
	maas = require('./maas.js'),
	report = require('./report.js');

var keys = { archive: 'archive' };

exports.get = function(res, cache) {
	var result = cache.get(keys.archive);

	if(result) {
		res.render('index', result);
		return;
	}

	maas.archive(function(err, data) {
		if(err) {
			res.send(500, err.message);
			return;
		}

		var result = {
			current: report.latest(data.results[0], cache), 
			source: data
		};

		report.archive(data, function(report) {
			result.temperature = report;
			cache.set(keys.archive, result);
	
			fs.writeFile('public/js/data.js', 'var data=' + JSON.stringify(result) + ';', function() {
				res.render('index', result);
			});
		});
	});
};
