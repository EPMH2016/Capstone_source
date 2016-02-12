    var data_array_daq1 = [];
    var date_array_daq1 = [];

    var data_array_daq2 = [];
    var date_array_daq2 = [];

    var data_array_daq3 = [];
    var date_array_daq3 = [];

    var data_array_daq4 = [];
    var date_array_daq4 = [];

    var data_daq1 = [];
    var data_daq2 = [];
    var data_daq3 = [];
    var data_daq4 = [];


app.controller("DAQGraphController", function($scope, $http, $q){
    console.log("controller initialized");
    $scope.message="This is the message variable in the controller";
    $scope.data  = "This is the data!";
    $scope.selectedType="T1";
    $scope.selectedDAQ="DAQ1";


    $scope.selectedType = "Thermocouple 1 (F)";

    //  make this a different function that simply collects and allocates the data  
    $scope.collect_data = function(sensorType, data_daq1, data_daq2, data_daq3, data_daq4, print_graph){
        if(data_daq1.length != 0)
        {
            data_array_daq1 = [];
            date_array_daq1 = [];
        }

        if(data_daq2.length != 0)
        {
            data_array_daq2 = [];
            date_array_daq2 = [];
        }

        if(data_daq3.length != 0)
        {
            data_array_daq3 = [];
            date_array_daq3 = [];
        }

        if(data_daq4.length != 0)
        {
            data_array_daq4 = [];
            date_array_daq4 = [];
        }

        // console.log(data_array_daq1)


       for(i = 0; i < data_daq1.length; i++)
        {
                data_array_daq1.unshift(data_daq1[i]["Data Value"]);
                var date = new Date(data_daq1[i]["Timestamp"]);
                date_array_daq1.unshift(data_daq1[i]["Timestamp"]);
                //console.log(date.getTime());
                //console.log(date);
                console.log(Date.parse(date_array_daq1[i]));
        }

        for(i = 0; i < data_daq2.length; i++)
        {
                data_array_daq2.unshift(data_daq2[i]["Data Value"]);
                date_array_daq2.unshift(data_daq2[i]["Timestamp"])
        }

        for(i = 0; i < data_daq3.length; i++)
        {
                data_array_daq3.push(data_daq3[i]["Data Value"]);
                date_array_daq3.push(data_daq3[i]["Timestamp"])
        }

        for(i = 0; i < data_daq4.length; i++)
        {
                data_array_daq4.push(data_daq4[i]["Data Value"]);
                date_array_daq4.push(data_daq4[i]["Timestamp"])
        }

        if(print_graph)
        {
            $scope.print_graph();
        }
    }
            


// make a function here with the only purpose to be printing the graph
    $scope.print_graph = function(){

        var graph_array_daq1 = [];

        var graph_array_daq2 = [];
        
        var graph_array_daq3 = [];

        var graph_array_daq4 = [];

        for(i = 0; i < date_array_daq1.length; i++)
        {
            graph_array_daq1.push([Date.parse(date_array_daq1[i]), data_array_daq1[i]]);

            graph_array_daq2.push([Date.parse(date_array_daq2[i]), data_array_daq2[i]]);

            graph_array_daq3.push([Date.parse(date_array_daq3[i]), data_array_daq3[i]]);

            graph_array_daq4.push([Date.parse(date_array_daq4[i]), data_array_daq4[i]]);
        }




        
        var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },

        global: {
                useUTC: false
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
          data: graph_array_daq1
                
        },

        {
            name: 'DAQ2',
            data: graph_array_daq2,
            visible: false
        },
        {
            name: 'DAQ3',
            data: graph_array_daq3,
            visible: false
        },
        {
            name: 'DAQ4',
            data: graph_array_daq4,
            visible: false

        }
        ]
    });
        
    }

    $scope.changeGraphType = function(typeSelected){
        $scope.selectedType = typeSelected;
        console.log("you selected " + $scope.selectedType)     

       switch ($scope.selectedType){
        case "T1":
            $http.get('http://10.17.191.41:8435/DAQ1/T1')

            .success(function(data_daq1, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, false);
            })
            .error(function(data_daq1, status, headers, config){
                console.log("Error, data not found.");
            });

            $http.get('http://10.17.191.41:8435/DAQ2/T1')

            .success(function(data_daq2, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, true);
            })
            .error(function(data_daq2, status, headers, config){
                console.log("Error, data not found.");
            });


        break;
        case "T2":
            $http.get('http://10.17.191.41:8435/DAQ1/T2')

            .success(function(data_daq1, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, false);
            })
            .error(function(data_daq1, status, headers, config){
                console.log("Error, data not found.");
            });

            $http.get('http://10.17.191.41:8435/DAQ2/T2')

            .success(function(data_daq2, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, true);
            })
            .error(function(data_daq2, status, headers, config){
                console.log("Error, data not found.");
            });


        break;
        case "T3":
        
            $http.get('http://10.17.191.41:8435/DAQ1/T3')

            .success(function(data_daq1, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, false);
            })
            .error(function(data_daq1, status, headers, config){
                console.log("Error, data not found.");
            });

            $http.get('http://10.17.191.41:8435/DAQ2/T3')

            .success(function(data_daq2, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, true);
            })
            .error(function(data_daq2, status, headers, config){
                console.log("Error, data not found.");
            });


        break;
        case "T4":
        
            $http.get('http://10.17.191.41:8435/DAQ1/T4')

            .success(function(data_daq1, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, false);
            })
            .error(function(data_daq1, status, headers, config){
                console.log("Error, data not found.");
            });

            $http.get('http://10.17.191.41:8435/DAQ2/T4')

            .success(function(data_daq2, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, true);
            })
            .error(function(data_daq2, status, headers, config){
                console.log("Error, data not found.");
            });


        break;
        case "Light":

            $http.get('http://10.17.191.41:8435/DAQ1/Light')

            .success(function(data_daq1, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, false);
            })
            .error(function(data_daq1, status, headers, config){
                console.log("Error, data not found.");
            });

            $http.get('http://10.17.191.41:8435/DAQ2/Light')

            .success(function(data_daq2, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, true);
            })
            .error(function(data_daq2, status, headers, config){
                console.log("Error, data not found.");
            });


        break;
        case "Ambient":
                      
            $http.get('http://10.17.191.41:8435/DAQ1/AmbientTemp')

            .success(function(data_daq1, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, false);
            })
            .error(function(data_daq1, status, headers, config){
                console.log("Error, data not found.");
            });

            $http.get('http://10.17.191.41:8435/DAQ2/AmbientTemp')

            .success(function(data_daq2, status, headers, config){
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, data_daq4, true);
            })
            .error(function(data_daq2, status, headers, config){
                console.log("Error, data not found.");
            });


        break;
        default:

            console.log("Selected Type is not a valid type: " + typeSelected);

        break;
       }
        
    }
    

    $scope.changeGraphType("T1");
    

    $scope.hello = function(){
        console.log("Hello, world!");
    }
    

});

app.controller("homePageController", function($scope){
    
    $scope.style = {
        
        background:'url(images/HotWaterSystemImage.png) no-repeat'
        
    };
    
});

app.controller("navController", function($scope, $timeout, $mdSidenav, $log){

    $scope.test = function(){

        console.log("It works!");

    }

    $scope.toggleRight = buildToggler('right');

    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };

      /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }


});

app.controller("DMController", function($scope, $timeout, $mdSidenav, $log, $mdDialog){

    $scope.archiveData = function(){
        var wait = $mdDialog.alert()
        .title("Please wait.")
        .ok('Sure');
        var backupSuccess = $mdDialog.alert()
        .title("Archive Success!")
        .content("Data file has been sent to your email.")
        .ok('Great!');
            $mdDialog
          .show( wait )
          .finally(function() {
            alert = undefined;
          });

        $.get("http://10.17.191.41:8435/archive", function(data){
            console.log("Data returned is " + data);

            if(data=="Success"){
                $mdDialog.hide(wait);
        

            $mdDialog
            .show( backupSuccess )
            .finally(function() {
            alert = undefined;
                });
            }
        });
    }


    $scope.purgeData = function(){
        console.log("Purging data..");
        var confirm = $mdDialog.confirm()
        .title("Are you sure?")
        .content("All your data will be forever lost.")
        .ok("Yes")
        .cancel("No");

        $mdDialog.show(confirm).then(function(){
            console.log("You have chosen to delete your data.");

            confirm = $mdDialog.alert()
                .title("Please wait")
                .content("Your data is being purged.")
                .ok("ok")
                $mdDialog.show(confirm);

            $.get("http://10.17.191.41:8435/archive", function(data){
            if(data == "Success"){
                console.log("Data returned is " + data);
                confirm = $mdDialog.alert()
                .title("Success!")
                .content("Your data is now forever lost.")
                .ok("Thanks")
                $mdDialog.show(confirm);
            }
            });

        },
        function(){
            console.log("You have changed your mind.");
        });
    }

});

