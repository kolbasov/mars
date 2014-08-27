var moment = require('moment');

/**
  Returns date string in "YYYY-MM-DD" format.

  @param {Date} date
  @return {String} formatted date
*/
exports.isoDate = function(date) {
    return moment(date).format('YYYY-MM-DD');
}

/**
  Returns date string in "YYYY-MM-DDTHH:mm:ss+00:00" format.

  @param {Date} date
  @return {String} formatted date
*/
exports.isoDateTime = function(date) {
  return moment(date).utc().format();
}

/**
  Returns date string in "MMMM Do YYYY" format.

  @param {Date} date
  @return {String} formatted date
*/
exports.shortDate = function(date) {
  return moment(date).format('MMMM Do YYYY');
}

/**
  Adds a number of days to a date.

  @param {Date} date
  @param {Number} number of days to add
  @return {Date} modified date
*/
exports.addDays = function(date, days) {
  return moment(date).add('days', days);
}

/**
  Returns time string from the specified date
  in "HH:mm" format.

  @param {Date} date
  @return {String} time
*/
exports.time = function(date) {
  return moment(date).utc().format("HH:mm");
}

/**
  Formats temperature.

  @param {Number} temp
  @return {String} formatted temperature
*/
exports.temp = function(temp) {
  if(!temp) return null;
  return temp > 0 ? '&plus;' + temp : '&minus;' + Math.abs(Math.round(temp));
}
