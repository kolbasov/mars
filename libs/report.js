var	util 		= require('util'),
		moment 	= require('moment'),
		df 			= require('./date-format.js');

/**
	Builds a short report: date, min temp, max temp.

	@param {Object} MAAS report
	@return {Object} report
*/
exports.short = function(data) {
	var result = {};

	result.date = df.shortDate(data.terrestrial_date);
	result.minTemp = formatTemp(data.min_temp);
	result.maxTemp = formatTemp(data.max_temp);

	return result;
};


/**
	Builds a report for a chart.

	@param {Array} MAAS reports
	@return {Object} report
*/
exports.chart = function(data) {
	var report = {
		labels: [],
		datasets: [ { data: [] }, { data: [] } ]
	};

	for(i = 0; i < data.length; i++) {
		var item = data[i];

		this.format(item);

		report.labels.push(item.terrestrial_date);
		report.datasets[0].data.push(item.min_temp);
		report.datasets[1].data.push(item.max_temp);
	}

	report.labels.reverse();
	report.datasets[0].data.reverse();
	report.datasets[1].data.reverse();

	return report;
};

/**
	Formats dates in a report.

	@param {Object} report
*/
exports.format = function(report) {
	report.terrestrial_date = df.isoDate(report.terrestrial_date);
	report.sunrise = df.isoDateTime(report.sunrise);
	report.sunset = df.isoDateTime(report.sunset);
}

/**
	Replaces - and + with &minus; and &plus;

	@param {Number} temperature
	@return {String} formatted temperature
*/
function formatTemp(temp) {
	return temp > 0 ? '&plus;' + t : '&minus;' + Math.abs(temp);
}
