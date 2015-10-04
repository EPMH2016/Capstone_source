
$(function () { 
    $('#container').highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'line'
        },
        title: {
            renderTo: 'container',
            text: 'Sensor temperatures'
        },
        xAxis: {
            categories: ['9am', '10am', '11am', '12pm', '1pm', '2pm','3pm','4pm','5pm']
        },
        yAxis: {
            title: {
                text: 'Temperature (F)'
            }
        },
        series: [{
            name: 'Sensor 1',
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80]
        }, {
            name: 'Sensor 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81]
        },
        {
            name: 'Sensor 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74]
        },
        {
            name: 'Sensor 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89]},
            {
            name: 'Sensor 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60]
        }
        
        
        
        
        ]
    });
});


$(document).ready(function(){
    graph_sensor_1();
});

function graph_sensor_1()
{
    $('#graph').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Temperature'
        },
        xAxis: {
            categories: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
                '11 AM', '12 PM', '1 PM','2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'] 
        },
        yAxis:{
            title: {
                text: 'Temperature'
            }
        },
        series: [{
            name: 'Sensor 1',
            data: [70, 69, 68, 67, 66, 65, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 75, 74, 73, 72, 71]
        }]
    });
}

function graph_sensor_2()
{
    $('#graph').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Temperature Sensor 2'
        },
        xAxis: {
            categories: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
                '11 AM', '12 PM', '1 PM','2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM']
        },
        yAxis:{
            title: {
                text: 'Temperature'
            }
        },
        series: [{
            name: 'Sensor 2',
            data: [55, 67, 45, 87, 67, 56, 87, 54, 67,89,83, 67, 74, 80, 72, 69, 89, 58, 32, 71, 66, 45, 76, 87]
        }]
    });
}

function graph_daily_highs()
{
    $('#graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Daily Highs'
        },
        xAxis: {
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        yAxis:{
            min: 75,
            title: {
                text: 'Temperature'
            }
        },
        series: [{
            data: [ 90, 94, 99, 96, 100, 92, 94]
        }]
    });
}

function graph_humidity_sensor()
{
    $('#graph').highcharts({
        chart: {
            type: 'line',
            borderWidth: '2',
            borderColor: 'red'
        },
        colors: ['green'],
        title: {
            text: 'Humidity'
        },
        xAxis: {
            categories: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM',
                '7 PM','8 PM','9 PM']
        },
        yAxis: {
            title: 
            {
                text: 'Humidity'
            }
        },
        plotOptions: {
            series: {
                lineWidth: 5
            }
        },
        series: [{
            data: [3, 5, 7, 3, 4, 2, 7, 4, 3, 2, 6, 1, 3]
        }]
    });
}
