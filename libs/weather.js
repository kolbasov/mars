var fs = require('fs'),
	http = require('http'),
	moment = require('moment');

var keys = { latest: 'latest', archive: 'archive' };

exports.latest = function(res, cache) {
	
	var report = cache.get(keys.latest);

	if(report) {
		res.render('index', report);
		return;
	}

	http.get("http://marsweather.ingenology.com/v1/latest/", function(mars) {
		mars.on('data', function(data) {
			report = latestReport(data);
			cache.set(keys.latest, report);
			res.render('index', report);
		});
	})
	.on('error', function(err) {
		res.send(500, err.message);
	});
};

exports.archive = function(res, cache) {
	if(cache.get(keys.archive))
		return;

	http.get("http://marsweather.ingenology.com/v1/archive/", function(mars) {
		archiveReport(mars, function(report) {
			cache.set(keys.archive, true);
			fs.writeFile('public/js/data.js', 'var data=' + JSON.stringify(report));
		});
	}).on('error', function(err) {
		res.send(500, err.message);
	});
};

function latestReport(data) {
	var result = {};

	var report = JSON.parse(data).report;

	result.date = formatDate(report.terrestrial_date);
	result.minTemp = formatTemp(report.min_temp);
	result.maxTemp = formatTemp(report.max_temp);

	return result;
}

function archiveReport(mars, cb) {
	var report = {
		labels: [],
		datasets: [ { data: [] }, { data: [] } ]
	};

	var data = '';

	mars.on('data', function(chunk) {
		data += chunk;
	});

	mars.on('end', function() {
		
		data = JSON.parse(data);
		
		for(i = 0; i < data.results.length; i++) {
			var item = data.results[i];
			report.labels.push(item.terrestrial_date);
			report.datasets[0].data.push(item.min_temp);
			report.datasets[1].data.push(item.max_temp);
		}

		report.labels.reverse();
		report.datasets[0].data.reverse();
		report.datasets[1].data.reverse();

		cb(report);
	});
}

function formatTemp(t) {
	return t > 0 ? '&plus;' + t : '&minus;' + Math.abs(t);
}

function formatDate(d) {
	return moment(d).format('MMMM Do YYYY');
}

