var styles = {
	datasets : [
		{
			fillColor: "rgba(220,220,220,0.5)",
			strokeColor: "#428bca",
			pointColor: "#428bca",
			pointStrokeColor: "#fff",
			data: []
		},
		{
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "#d9534f",
			pointColor: "#d9534f",
			pointStrokeColor: "#fff",
			data: []
		}
	]
};

$(function() {
	$.getJSON('/chart', function(data) {
		data = $.extend(true, data, styles);
		var ctx = $("#chart")[0].getContext("2d");
		ctx.canvas.width  = $('#chart').parent().width();

		var chart = new Chart(ctx).Line(
			data,
			{
				datasetFill: false,
				scaleLabelFontFamily: "'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif"
			}
		);

		$('#btnChart').click(function() {
			$('#chart').show();
			$('#table').addClass('hidden');
		});

		$('#btnTable').click(function() {
			$('#chart').hide();
			$('#table').removeClass('hidden');
		});
	});
});
