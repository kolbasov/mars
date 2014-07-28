var	util 		= require('util'),
		moment 	= require('moment'),
		format	= require('./format.js');

/**
	Builds a short report: date, min temp, max temp.

	@param {Object} MAAS report
	@return {Object} report
*/
exports.short = function(data) {
	var result = {
		date: null,
		minTemp: null,
		maxTemp: null
	};

	if(!data) {
		return result;
	}

	result.date = data.terrestrial_date;
	result.minTemp = data.min_temp;
	result.maxTemp = data.max_temp;

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

	if(!data) {
		return report;
	}

	for(i = 0; i < data.length; i++) {
		var item = data[i];

		item.terrestrial_date = format.isoDate(item.terrestrial_date);

		report.labels.push(item.terrestrial_date);
		report.datasets[0].data.push(item.min_temp);
		report.datasets[1].data.push(item.max_temp);
	}

	report.labels.reverse();
	report.datasets[0].data.reverse();
	report.datasets[1].data.reverse();

	return report;
};
