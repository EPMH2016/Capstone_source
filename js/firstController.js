app.controller("firstController", function($scope){
	
	$scope.message="This is the message variable in the controller";
	$scope.data  = "This is the data!";
	
	$scope.keyboard = "This is the keyboard model"
	$scope.hello = function(){
		console.log("Hello, world!");
	}
	
	$scope.sensor1 = function(){
        console.log("Clicked sensor 1");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'Sensor 1 Data'
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
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30]
        }, {
            name: 'Sensor 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'Sensor 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'Sensor 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'Sensor 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
	
    $scope.sensor2 = function(){
        console.log("Clicked sensor 2");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'Sensor 2 Data'
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
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'Sensor 2',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
            
        },
        {
            name: 'Sensor 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'Sensor 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'Sensor 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
    
    $scope.sensor3 = function(){
        console.log("Clicked sensor 3");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'Sensor 3 Data'
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
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'Sensor 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'Sensor 3',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
          
        },
        {
            name: 'Sensor 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'Sensor 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
    
    $scope.sensor4 = function(){
        console.log("Clicked sensor 4");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'Sensor 4 Data'
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
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'Sensor 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'Sensor 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'Sensor 4',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
            },
            {
            name: 'Sensor 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
    
    $scope.sensor5 = function(){
        console.log("Clicked sensor 5");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'Sensor 5 Data'
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
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'Sensor 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'Sensor 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'Sensor 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'Sensor 5',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
            
        }

        ]
    });
		
	}
	
})