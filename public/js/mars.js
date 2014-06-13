$(function() {
	console.log('cors: ' + $.support.cors);
	$.ajax({
		  url: 'http://marsweather.ingenology.com/v1/latest?callback=cb', 
		    dataType: 'jsonp',
		    jsonp: false,
		    jsonpCallback: 'cb',
	        success: function(data) {
		    var report = data.report;
		    $('#minTemp').text(report.min_temp);
		    $('#maxTemp').text(report.max_temp);
		    $('date').text(report.terrestrial_date);
		}
	 });
});

function cb(data){
    console.log(data);
}
