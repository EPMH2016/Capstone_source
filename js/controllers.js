app.controller("DAQGraphController", function($scope){
	
	$scope.message="This is the message variable in the controller";
	$scope.data  = "This is the data!";
	

	$scope.hello = function(){
		console.log("Hello, world!");
	}
	
	$scope.DAQ1 = function(){
        console.log("Clicked DAQ 1");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'DAQ 1 Data'
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
            name: 'DAQ 1',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30]
        }, {
            name: 'DAQ 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'DAQ 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'DAQ 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'DAQ 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
	
    $scope.DAQ2 = function(){
        console.log("Clicked DAQ 2");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'DAQ 2 Data'
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
            name: 'DAQ 1',
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'DAQ 2',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
            
        },
        {
            name: 'DAQ 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'DAQ 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'DAQ 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
    
    $scope.DAQ3 = function(){
        console.log("Clicked DAQ 3");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'DAQ 3 Data'
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
            name: 'DAQ 1',
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'DAQ 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'DAQ 3',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
          
        },
        {
            name: 'DAQ 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'DAQ 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
    
    $scope.DAQ4 = function(){
        console.log("Clicked DAQ 4");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'DAQ 4 Data'
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
            name: 'DAQ 1',
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'DAQ 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'DAQ 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'DAQ 4',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
            },
            {
            name: 'DAQ 5',
            data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
            visible:false
        }

        ]
    });
		
	}
    
    $scope.DAQ5 = function(){
        console.log("Clicked DAQ 5");
		var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: 'DAQ 5 Data'
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
            name: 'DAQ 1',
            data: [70, 60, 65, 67, 70, 75, 90, 85, 80],
            visible:false
        }, {
            name: 'DAQ 2',
            data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
            visible:false
        },
        {
            name: 'DAQ 3',
            data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
            visible:false
        },
        {
            name: 'DAQ 4',
            data: [55, 60, 62, 76, 79, 85,65, 76, 89],
            visible:false},
            {
            name: 'DAQ 5',
            data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30],
            
        }

        ]
    });
		
	}
	
})

app.controller("homePageController", function($scope){
    
    $scope.style = {
        
        background:'url(images/HotWaterSystemImage.png) no-repeat'
        
    };
    
});