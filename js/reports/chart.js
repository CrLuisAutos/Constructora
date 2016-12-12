$(document).ready(function() {
	var data = [
        { name: 'Jonathan', y: 20 },
        {name: 'Marcos', y: 10},
        {name: 'Milena', y: 5 },
        {name: 'Agustin', y: 5 },
        {name: 'Francisco', y: 5 },
        {name: 'Jason', y: 5 }
    ];
    draw_chart('chart-container', data);
	draw_chart('chart-container2', data);
});

function draw_chart(selector, data) {
	Highcharts.chart(selector, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Porcentaje de ventas por vendedor'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data
        }]
    });
}
