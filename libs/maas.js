var url 		= require('url'),
		restify = require('restify'),
		moment 	= require('moment'),
		db 			= require('./db.js'),
		format 	= require('./format.js');

var client = restify.createJsonClient({
	url: 'http://marsweather.ingenology.com',
	version: '*'
});

/**
	Gets data from specified URL.

	@param {String} a path relative to marsweather.ingenology.com
	@param {Function} callback
*/
exports.get = function(path, cb) {
	client.get(path, function(err, req, res, obj) {
		if(err) return cb(err);
		cb(null, obj);
	});
};

/**
	Gets reports since specified date.

	@param {Date} date
	@param {Function} callback
*/
exports.fromDate = function(date, cb) {
	var path = '/v1/archive/';

	if(date) {
		path += '?terrestrial_date_start=' + date;
	}

	this.page(path, function(err, data) {
		if(err) return cb(err);
		cb(null, data);
	});
};

/**
	Gets a page specified by path.

	@param {String} a path relative to marsweather.ingenology.com
*/
exports.page = function(next, cb) {

	var result = [];

	exports.get(next, function(err, obj) {
		if(err) return cb(err);

		result = obj.results;

		if(obj.next) {
			var path = url.parse(obj.next).path;
			console.log(path);
			exports.page(path, function(e, r) {
				if(e) return cb(e);
				result.push.apply(result, r);
				cb(null, result);
			});
		} else {
			cb(null, result);
		}
	});
};

/**
	Get latest data from MAAS and saves it in local db.

	@param {Function} callback
*/
exports.sync = function(cb) {
	db.latest(function(err, latest) {
		if(err) return cb(err);

		var start = null;

		if(latest && latest.terrestrial_date) {
			start = format.addDays(latest.terrestrial_date, 1);
		} else {
			start = moment(0);
		}

		start = format.isoDate(start);

		exports.fromDate(start, function(err, data) {
			if(err) return cb(err);

			for(var i in data) {
				var item = data[i];

				console.log('inserting: ', item.terrestrial_date);
				db.insert(item, function(err) {
					if(err) console.log(err);
				});
			}

			cb(null, start);
		});
	});
};
