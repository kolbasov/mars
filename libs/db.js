var pg 		 = require('pg'),
		maas 	 = require('./maas.js'),
		format = require('./format.js');

/**
	Executes a query.

	@param {String} query
	@param {Array} query parameters
	@param {Function} callback
*/
exports.execute = function(query, args, cb) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) return cb(err);
		client.query(query, args, function(err, result) {
			done();
			if(err) return cb(err);
			cb(null, result.rows);
		});
	});
};

/**
	Gets the latest report.

	@param {Function} callback
*/
exports.latest = function(cb) {
	var query = 'select * from data order by terrestrial_date desc limit 1';
	this.execute(query, null, function(err, result) {
		if(err) return cb(err);
		cb(null, result[0]);
	});
};

/**
	Retrospectively selects number of reports from specified start date.

	@param {Date} start date
	@param {Number} number of days to select
	@param {Function} callback
*/
exports.select = function(start, days, cb) {
	if(!start) {
		throw new Error('Start date cannot be null');
	}

	if(!days) {
		throw new Error('Number of days cannot be null');
	}

	end = format.isoDate(start);

	var query = 'select * from data where terrestrial_date <= $1 order by terrestrial_date desc limit $2';

	this.execute(query, [start, days], function(err, result) {
		if(err) return cb(err);
		cb(null, result);
	});
};

/**
	Saves a report.

	@param {Object} report
	@param {Function} callback
*/
exports.insert = function(report, cb) {
	if(!report) {
		throw new Error('Report cannot be null');
	}

	var query =
		'insert into data (terrestrial_date, min_temp, max_temp, pressure, atmo_opacity, season, sunrise, sunset)' +
		'values ($1, $2, $3, $4, $5, $6, $7, $8)';

	var args = [
		report.terrestrial_date,
		report.min_temp,
		report.max_temp,
		report.pressure,
		report.atmo_opacity,
		report.season,
		report.sunrise,
		report.sunset
	];

	this.execute(query, args, function(err, result) {
		if(err) return cb(err);
		cb(null);
	});
};
