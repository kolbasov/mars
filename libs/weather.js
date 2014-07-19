var moment 	= require('moment'),
		report 	= require('./report.js');
		maas 		= require('./maas.js')
		db 			= require('./db.js');

/**
	Gets weather data.

	@param {Function} callback
*/
exports.get = function(cb) {
	getData(function(err, data) {
		if(err) return cb(err);

		if(!data || data.length == 0) {
			cb(null, null);
		}

		data.forEach(report.format);

		var result = {
			current: report.short(data[0]),
			source: data
		};

		cb(null, result);
	});
};

exports.chart = function(cb) {
	getData(function(err, data) {
		if(err) return cb(err);

		if(!data || data.length == 0) {
			cb(null, null);
		}

		var result = report.chart(data);
		cb(null, result);
	});
};

/**
	Get latest data from MAAS and saves it in local db.
*/
exports.sync = function() {
	maas.sync(function(err, data) {
		if(err) {
			console.log('Sync error: ', err);
		} else {
			console.log('Sync date: ', data);
		}
	});
};

function getData(cb) {
	var days = 7;
	var start = moment();
	db.select(start, days, function(err, data) {
		if(err) return cb(err);
		cb(null, data);
	});
}
