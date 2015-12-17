

app.controller("DAQGraphController", function($scope, $http, $q){
	console.log("controller initialized");
	$scope.message="This is the message variable in the controller";
	$scope.data  = "This is the data!";
    $scope.selectedType="T1";
    $scope.selectedDAQ="DAQ1";

    var data_array = [];
    var date_array = [];
    //upon initialization collected all data for each sensor on each DAQ
    $scope.selectedType = "Thermocouple 1 (F)";

        $http.get('http://10.17.177.164:8435/DAQ1/T1')

        .success(function(data, status, headers, config){
            $scope.DAQ1($scope.selectedType, data);
            // put all the data values in the data_array 
            for(i = 0; i < data.length; i++)
            {
                data_array.push(data[i]["Data Value"]);
                date_array.push(data[i]["Timestamp"])
            }
            //console.log(data_array);
        })
        .error(function(data, status, headers, config){
            console.log("Error, data not found.");
        });


    $scope.changeGraphType = function(typeSelected){
        $scope.selectedType = typeSelected;  
        console.log("you selected" + $scope.selectedType)
        $scope.selectedType = typeSelected;      
       
       
       switch ($scope.selectedDAQ){
       case "DAQ1":
       
       $scope.DAQ1($scope.selectedType);
       break;
       case "DAQ2":
       $scope.DAQ2();
       break;
       case "DAQ3":
       $scope.DAQ3();
       break;
       case "DAQ4":
       $scope.DAQ4();
       break;
       case "DAQ5":
       $scope.DAQ5();
       break;
       }
        
    }
    
	$scope.hello = function(){
		console.log("Hello, world!");
	}
	
    
    
	$scope.DAQ1 = function(sensorType, data){
        for(i = 0; i < data.length; i++)
        {
                data_array.push(data[i]["Data Value"]);
                date_array.push(data[i]["Timestamp"])
        }

        //console.log(data_array);

        var graph_array = [];

        for(i = 0; i < data.length; i++)
        {
            graph_array.push([Date.parse(date_array[i]), data_array[i]]);
        }

        console.log(graph_array);
        console.log(Date.UTC(2010, 11, 1, 1, 35));

        console.log("The selected sensor is " + sensorType)
        $http.get('http://10.17.177.164:8435/DAQ1/T1')
        .success(function(data, status, headers, config){
            console.log("Data is ");
            console.log(data);
        })
        .error(function(data, status, headers, config){
            console.log("Error, data not found.");
        });

        $scope.selectedDAQ = "DAQ1";
        console.log("Clicked DAQ 1");
        
        switch($scope.selectedType){
        case "Ambient Temp (F)":
       console.log ("Ambient Temp (F) selected");
        break;
        case "Pipe temp (F)":
        console.log ("Pipe Temp (F) selected");
        break;
        case "Thermocouple 1 (F)":
        console.log ("Thermocouple 1 (F) selected");
        break;
        case "Thermocouple 2 (F)":
        console.log ("Thermocouple 2 (F) selected");
        break;
        case "Thermocouple 3 (F)":
        console.log ("Thermocouple 3 (F) selected");
        break;
        case "Light":
        console.log("Light selected");
        break;
        }
        
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
            type: "datetime"
           // categories: ['9am', '10am', '11am', '12pm', '1pm', '2pm','3pm','4pm','5pm']
        },
        yAxis: {
            title: {
                text: $scope.selectedType
            }
        },
        series: [
        {
          name: 'DAQ1',
          data: graph_array
                //Javascript date object: (Year, Month, Day, hours, minutes)
                
        },

        {
            name: 'DAQ2',
            data: [
                [Date.UTC(2010, 11, 1, 1, 35), 29.9],
                [Date.UTC(2010, 11, 1, 1, 45), 71.5],
                [Date.UTC(2010, 11, 1, 4, 13), 106.4],
                [Date.UTC(2010, 11, 1, 5, 11), 129.2],
                [Date.UTC(2010, 11, 1, 6, 12), 144.0],
                [Date.UTC(2010, 11, 1, 6, 52), 176.0]
                ]
        },
        {
            name: 'DAQ3',
            data: [
                [Date.UTC(2010, 11, 1, 1, 35), 34.4],
                [Date.UTC(2010, 11, 1, 1, 36), 65.7],
                [Date.UTC(2010, 11, 1, 4, 37), 23.5],
                [Date.UTC(2010, 11, 1, 5, 9), 67.8],
                [Date.UTC(2010, 11, 1, 6, 10), 78.8],
                [Date.UTC(2010, 11, 1, 6, 51), 78.9]
                ]
        },
        {
            name: 'DAQ4',
            data: [
                [Date.UTC(2010, 11, 1, 4, 35), 29.9],
                [Date.UTC(2010, 11, 1, 5, 35), 71.5],
                [Date.UTC(2010, 11, 1, 6, 35), 106.4],
                [Date.UTC(2010, 11, 1, 7, 35), 129.2],
                [Date.UTC(2010, 11, 1, 8, 35), 144.0],
                [Date.UTC(2010, 11, 1, 9, 35), 176.0]
                ]
        }
        // {
        //     name: 'DAQ 1',
        //     data: [Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30, Math.random()*70+30]
        // }, {
        //     name: 'DAQ 2',
        //     data: [75, 64, 62, 69, 75, 80, 96, 89, 81],
        //     visible:false
        // },
        // {
        //     name: 'DAQ 3',
        //     data: [85, 62, 67, 75, 75, 89, 99, 73, 74],
        //     visible:false
        // },
        // {
        //     name: 'DAQ 4',
        //     data: [55, 60, 62, 76, 79, 85,65, 76, 89],
        //     visible:false},
        //     {
        //     name: 'DAQ 5',
        //     data: [60, 69, 85, 76, 69, 83, 75, 65, 60],
        //     visible:false
        // }
    
        ]
    });
		
	}
	
    $scope.DAQ2 = function(){
        $scope.selectedDAQ = "DAQ2";
        console.log("Clicked DAQ 2");
        
        switch($scope.selectedType){
        case "Ambient Temp (F)":
       console.log ("Ambient Temp (F) selected");
        break;
        case "Pipe temp (F)":
        console.log ("Pipe Temp (F) selected");
        break;
        case "Thermocouple 1 (F)":
        console.log ("Thermocouple 1 (F) selected");
        break;
        case "Thermocouple 2 (F)":
        console.log ("Thermocouple 2 (F) selected");
        break;
        case "Thermocouple 3 (F)":
        console.log ("Thermocouple 3 (F) selected");
        break;
        case "Light":
        console.log("Light selected");
        break;
        }
         
         
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
                text: $scope.selectedType
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
        $scope.selectedDAQ = "DAQ3";
        console.log("Clicked DAQ 3");
        
        switch($scope.selectedType){
        case "Ambient Temp (F)":
       console.log ("Ambient Temp (F) selected");
        break;
        case "Pipe temp (F)":
        console.log ("Pipe Temp (F) selected");
        break;
        case "Thermocouple 1 (F)":
        console.log ("Thermocouple 1 (F) selected");
        break;
        case "Thermocouple 2 (F)":
        console.log ("Thermocouple 2 (F) selected");
        break;
        case "Thermocouple 3 (F)":
        console.log ("Thermocouple 3 (F) selected");
        break;
        case "Light":
        console.log("Light selected");
        break;
        }
        
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
                text: $scope.selectedType
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
        $scope.selectedDAQ = "DAQ4";
        console.log("Clicked DAQ 4");
        
        switch($scope.selectedType){
        case "Ambient Temp (F)":
       console.log ("Ambient Temp (F) selected");
        break;
        case "Pipe temp (F)":
        console.log ("Pipe Temp (F) selected");
        break;
        case "Thermocouple 1 (F)":
        console.log ("Thermocouple 1 (F) selected");
        break;
        case "Thermocouple 2 (F)":
        console.log ("Thermocouple 2 (F) selected");
        break;
        case "Thermocouple 3 (F)":
        console.log ("Thermocouple 3 (F) selected");
        break;
        case "Light":
        console.log("Light selected");
        break;
        }
        
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
                text: $scope.selectedType
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
        $scope.selectedDAQ = "DAQ5";
        console.log("Clicked DAQ 5");
        
        switch($scope.selectedType){
        case "Ambient Temp (F)":
       console.log ("Ambient Temp (F) selected");
        break;
        case "Pipe temp (F)":
        console.log ("Pipe Temp (F) selected");
        break;
        case "Thermocouple 1 (F)":
        console.log ("Thermocouple 1 (F) selected");
        break;
        case "Thermocouple 2 (F)":
        console.log ("Thermocouple 2 (F) selected");
        break;
        case "Thermocouple 3 (F)":
        console.log ("Thermocouple 3 (F) selected");
        break;
        case "Light":
        console.log("Light selected");
        break;
        }
        
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
                text: $scope.selectedType
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
	
   // $scope.DAQ1($scope.selectedType);

});

app.controller("homePageController", function($scope){
    
    $scope.style = {
        
        background:'url(images/HotWaterSystemImage.png) no-repeat'
        
    };
    
});
