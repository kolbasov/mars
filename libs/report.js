var moment = require('moment');

exports.latest = function(data) {
	var result = {};

	result.date = formatDate(data.terrestrial_date);
	result.minTemp = formatTemp(data.min_temp);
	result.maxTemp = formatTemp(data.max_temp);
	
	return result;
};

exports.archive = function(data, cb) {
	var report = {
		labels: [],
		datasets: [ { data: [] }, { data: [] } ]
	};

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
};

function formatTemp(t) {
	return t > 0 ? '&plus;' + t : '&minus;' + Math.abs(t);
}

function formatDate(d) {
	return moment(d).format('MMMM Do YYYY');
}