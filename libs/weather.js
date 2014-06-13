var moment = require('moment');

exports.report = function(data) {
	var result = {};

	var report = JSON.parse(data).report;

	result.date = formatDate(report.terrestrial_date);
	result.minTemp = formatTemp(report.min_temp);
	result.maxTemp = formatTemp(report.max_temp);

	return result;
}

function formatTemp(t) {
	return t > 0 ? '&plus;' + t : '&minus;' + Math.abs(t);
}

function formatDate(d) {
	return moment(d).format('MMMM Do YYYY');
}

