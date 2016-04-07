    var data_array_daq1 = [];
    var date_array_daq1 = [];

    var data_array_daq2 = [];
    var date_array_daq2 = [];

    var data_array_daq3 = [];
    var date_array_daq3 = [];

    const SERVER_IP = "10.0.0.22";  /* UP */
    //const SERVER_IP = "192.168.1.23";  /* HUY's house */
    const SERVER_PORT = "8435";
    const SERVER_URL = "http://" + SERVER_IP + ":" + SERVER_PORT;

app.controller("DAQGraphController", function($scope, $http, $q){
    console.log("controller initialized");
    $scope.message="This is the message variable in the controller";
    $scope.data  = "This is the data!";
    $scope.selectedType="Thermocouple 1";
    $scope.selectedDAQ="DAQ1";

    $scope.daq1Enabled = true;
    $scope.daq2Enabled = true;
    $scope.daq3Enabled = true;

    $scope.printData = function(array)
    {
        for(i = 0; i < array.length - 2; i++)
        {
            console.log(array[i][0]/1000);
        }
    }

    //  make this a different function that simply collects and allocates the data  
    $scope.collect_data = function(sensorType, data_daq1, data_daq2, data_daq3, print_graph){
        //if(data_daq1.length != 0)
        //{
            data_array_daq1 = [];
            date_array_daq1 = [];
        //}

        //if(data_daq2.length != 0)
        //{
            data_array_daq2 = [];
            date_array_daq2 = [];
        //}

        //if(data_daq3.length != 0)
        //{
            data_array_daq3 = [];
            date_array_daq3 = [];
        //}

        //console.log(data_array_daq1.length)


       for(i = 0; i < data_daq1.length; i++)
        {
                data_array_daq1.unshift(data_daq1[i]["Data Value"]);
                date_array_daq1.unshift(data_daq1[i]["Timestamp"]);
        }

        for(i = 0; i < data_daq2.length ; i++)
        {
                data_array_daq2.unshift(data_daq2[i]["Data Value"]);
                date_array_daq2.unshift(data_daq2[i]["Timestamp"])
        }

        for(i = 0; i < data_daq3.length; i++)
        {
                data_array_daq3.unshift(data_daq3[i]["Data Value"]);
                date_array_daq3.unshift(data_daq3[i]["Timestamp"])
        }

        if(print_graph)
        {
            $.get(SERVER_URL + "/DAQInfoAll", function( data ){
                if(data[0]["Status"] == 'ON')
                {
                    $scope.daq1Enabled = true;
                }
                else
                {
                    $scope.daq1Enabled = false;
                }
                if(data[1]["Status"] == "ON")
                {
                    $scope.daq2Enabled = true;
                }
                else
                {
                    $scope.daq2Enabled = false;
                }
                if(data[2]["Status"] == "ON")
                {
                    $scope.daq3Enabled = true;
                }
                else
                {
                    $scope.daq3Enabled = false;
                }


                /* send get request to server to get current units, then pass the units to the graph function */
                $.get(SERVER_URL + "/getUnits", function( data ){
                    $scope.print_graph(data[0].Units);
                });


                }, "json"
            );
        }
    }
            


// make a function here with the only purpose to be printing the graph
    $scope.print_graph = function(units){

        var graph_array_daq1 = [];

        var graph_array_daq2 = [];
        
        var graph_array_daq3 = [];

        for(i = 0; i < date_array_daq1.length; i++)
        {
            graph_array_daq1.push([Date.parse(date_array_daq1[i]), data_array_daq1[i]]);

            graph_array_daq2.push([Date.parse(date_array_daq2[i]), data_array_daq2[i]]);

            graph_array_daq3.push([Date.parse(date_array_daq3[i]), data_array_daq3[i]]);
        }

        graph_array_daq1 = $scope.trim_array(graph_array_daq1);
        graph_array_daq2 = $scope.trim_array(graph_array_daq2);
        graph_array_daq3 = $scope.trim_array(graph_array_daq3);


        /* check if the graph is for a temperature sensor */
        if($scope.selectedType == "Thermocouple 1" || $scope.selectedType == "Thermocouple 2" || 
            $scope.selectedType == "Thermocouple 3" || $scope.selectedType == "Ambient")
        {
            /* check if current units are F and if so convert all graph data */
            if(units == 'F')
            {
                $scope.convertArrayToF(graph_array_daq1);
                $scope.convertArrayToF(graph_array_daq2);
                $scope.convertArrayToF(graph_array_daq3);
            }
            units = "(" + units + ")";
        }
        else
        {
            units = "";
        }


        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        
        var chart = new Highcharts.Chart({
            credits: {
            enabled: false
        },


        chart: {
            renderTo: 'container',
            type: 'line'
        },
        title: {
            text: $scope.selectedType + ' Data'
        },
        xAxis: {
            type: "datetime"
           // categories: ['9am', '10am', '11am', '12pm', '1pm', '2pm','3pm','4pm','5pm']
        },
        yAxis: {
            title: {
                text: $scope.selectedType + " " + units
            }
        },
        series: [
        {
          name: 'DAQ1',
          data: graph_array_daq1,
          visible: $scope.daq1Enabled,
          showInLegend: $scope.daq1Enabled
                
        },

        {
            name: 'DAQ2',
            data: graph_array_daq2,
            visible: !($scope.daq1Enabled) && $scope.daq2Enabled,
            showInLegend: $scope.daq2Enabled
        },
        {
            name: 'DAQ3',
            data: graph_array_daq3,
            visible: !($scope.daq1Enabled || $scope.daq2Enabled) && $scope.daq3Enabled,
            showInLegend: $scope.daq3Enabled
        }
        ]
    });
        
    }

    $scope.changeGraphType = function(typeSelected){
        console.log("you selected " + typeSelected)

        var data_daq1 = [];
        var data_daq2 = [];
        var data_daq3 = [];     

       switch (typeSelected){
        case "T1":

            $.get(SERVER_URL + "/DAQ1/T1", function( data ){
                data_daq1 = data;
                $.get(SERVER_URL + "/DAQ2/T1", function( data ){
                    data_daq2 = data;
                    $.get(SERVER_URL + "/DAQ3/T1", function( data ){
                        data_daq3 = data;
                        $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
                    });
                });
            });

            // $.get(SERVER_URL + "/DAQ2/T1", function( data ){
            //     data_daq2 = data;
            // });

            // $.get(SERVER_URL + "/DAQ3/T1", function( data ){
            //     data_daq3 = data;
            //     $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
            // });


        break;
        case "T2":
            $.get(SERVER_URL + "/DAQ1/T2", function( data ){
                data_daq1 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ2/T2", function( data ){
                data_daq2 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ3/T2", function( data ){
                data_daq3 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
            });


        break;
        case "T3":
        
            $.get(SERVER_URL + "/DAQ1/T3", function( data ){
                data_daq1 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ2/T3", function( data ){
                data_daq2 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ3/T3", function( data ){
                data_daq3 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
            });


        break;
        case "Light":

            $.get(SERVER_URL + "/DAQ1/Light", function( data ){
                data_daq1 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ2/Light", function( data ){
                data_daq2 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ3/Light", function( data ){
                data_daq3 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
            });

        break;
        case "Ambient":
                      
            $.get(SERVER_URL + "/DAQ1/AmbientTemp", function( data ){
                data_daq1 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ2/AmbientTemp", function( data ){
                data_daq2 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ3/AmbientTemp", function( data ){
                data_daq3 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
            });

        break;
        
        case "Humidity":

            $.get(SERVER_URL + "/DAQ1/Humidity", function( data ){
                data_daq1 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ2/Humidity", function( data ){
                data_daq2 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ3/Humidity", function( data ){
                data_daq3 = data;
                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
            });

        break;

        case "Current":

            $.get(SERVER_URL + "/DAQ1/Current", function( data ){
                data_daq1 = data;

                data_daq1 = $scope.editArrayCurrent(data_daq1);

                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ2/Current", function( data ){
                data_daq2 = data;

                data_daq2 = $scope.editArrayCurrent(data_daq2);

                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, false);
            });

            $.get(SERVER_URL + "/DAQ3/Current", function( data ){
                data_daq3 = data;

                /* edit all three arrays for Current here */
                data_daq3 = $scope.editArrayCurrent(data_daq3);

                $scope.collect_data($scope.selectedType, data_daq1, data_daq2, data_daq3, true);
            });

        break;
        default:

            console.log("Selected Type is not a valid type: " + typeSelected);

        break;
       }
        
    }

    $scope.editArrayCurrent = function(data)
    {
        for(i = 0; i < data.length; i++)
        {
            if(data[i]["Data Value"] < .5 || data[i]["Data Value"] > 30)
            {
                data[i]["Data Value"] = 0;
            }
            else
            {
                data[i]["Data Value"] = 1;
            }
        }

        for(i = data.length - 2; i >= 0; i--)
        {
            /* check if consecutive values are the same */
            /* if not, insert a new data point between the two that is a copy of the first point, with the second point's data value */
            if(data[i+1]["Data Value"] != data[i]["Data Value"])
            {
                var temp = {"Data Value": data[i+1]["Data Value"], "Timestamp": data[i+1]["Timestamp"]};
                data.splice(i+1, 0, temp);
                data[i+1]["Data Value"] = data[i]["Data Value"];
                // console.log(data[i + 2]);
                // console.log(data[i + 1]);
                // console.log(data[i]);
            }
        }

        return data;
    }

    $scope.trim_array = function(array)
    {
        /* check the difference between the first two values in the array (probably the last two values in the array)
           and save that in average, then check the next difference and update average, if at anytime the next difference
           is greater than 4 times the average, truncate everything including and after that data point, looking at the times */ 
        var average = 0; // array[array.length - 1][0] - array[array.length - 2][0];
        var count = 0;
        var difference = 0;

        for(i = array.length - 1; i > 0; i--)
        {
            difference = array[i][0] - array[i-1][0];
            if( count != 0 && (difference > (4*average) || difference < (average/4)) )
            {
                /* the difference is too large or too small, we only want the array above index i-1 */
                /* get array we want */
                /* return the array */
                console.log("trimmed array at index: " + i);
                return array.slice(i);
            }
            else
            {
                /* calculate new average */
                average = ((average * count) + difference) / (count + 1);
                count++;
            }
             
        }

        /* if we get to the end with no trims needed, return the original array */
        return array;

    }

    $scope.convertArrayToF = function(array)
    {
        /* go through all the temperture values and convert them from celcius to farenheit */
        for(i = 0; i < array.length; i++)
        {
            array[i][1] = array[i][1] * 1.8 + 32;
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

    /*
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


app.controller("CDController", function($scope, $timeout, $mdSidenav, $log, $mdDialog){
    $scope.daq_ID = "DAQ ID";
    $scope.daq_location = "DAQ Location"; 
    $scope.currentTimeInterval;
    var hidden = true;


    $scope.getDAQInfo = function(name){
        $.post(SERVER_URL + "/DAQinfo", {Name: name}, function( data ){
            $scope.daq_ID = data[0].DAQID;
            $scope.daq_location = data[0].Location;
        }, "json");
    }


    $scope.newTimeInterval = "";
    $scope.currentDAQ = "DAQ1";
    $scope.updateTimeInterval = function(){

        /* send post request to server to update time interval */
        var numTime = Number($scope.newTimeInterval);

        if(isNaN(numTime))
        {
            console.log("Value in text field is not a number.");
            var errorBox = $mdDialog.alert()
                            .title("Invalid Input!")
                            .content("The value entered is not a valid number.")
                            .ok('OK');
                    $mdDialog.show( errorBox )
                             .finally(function() 
                             {
                                alert = undefined;
                             });
        }
        else
        {
            $.post(SERVER_URL + "/updateTimeInterval", {timeInterval: $scope.newTimeInterval, Name: $scope.currentDAQ}, function(data){
               console.log("Update Time Interval return is: " + data);
               if(data == "Success")
               {
                   var success = $mdDialog.alert()
                            .title("Update Success!")
                            .content("The DAQ's Time Interval has been updated in the database.")
                            .ok('Great!');
                    $mdDialog.show( success )
                             .finally(function() 
                             {
                                alert = undefined;
                             });
                }
                else
                {
                    var failure = $mdDialog.alert()
                            .title("Server Error!")
                            .content("The DAQ's Time Interval was not updated.")
                            .ok('OK');
                    $mdDialog.show( failure )
                             .finally(function() 
                             {
                                alert = undefined;
                             });
                }
            });
        }       

    }

    $scope.radioButtonClicked = function(daq)
    {
        /* send a get request to server to get the time interval for 'daq' and then set it to currentTime Interval */
        $.post(SERVER_URL + "/getTimeInterval", {Name : daq}, function( data ){
            $scope.currentTimeInterval = data[0]["Time Interval"];
        });
    }

    $scope.radioButtonClicked('DAQ1');

    $scope.changeTimeInterval = function()
    {
        var changeTimeIntervalDiv = document.getElementById('changeTimeIntervalDiv');
        if(hidden)
        {
            changeTimeIntervalDiv.style.display="";
            hidden = false;
        }
        else
        {
            hidden = true;
            changeTimeIntervalDiv.style.display="none";
        }
    }

    

});


app.controller("SystemConfigController", function($scope, $timeout, $mdSidenav, $log, $mdDialog, $http){

    $scope.selectedDAQ = 'DAQ1'; /* holds the name of the selected daq */
    $scope.daq_id;      /* used for the update location post request */
    $scope.daq_array;   /* stores all daq information from DAQInfoAll request */
    $scope.daq_1_enabled;
    $scope.daq_2_enabled;
    $scope.daq_3_enabled;

    $scope.selectedUnit; /* connected to the convert units radio buttons */

    $.get(SERVER_URL + "/getUnits", function( data ){
            $scope.selectedUnit = data[0].Units;
    });

    var hidden = true; /* indicates if the convert units elements are hidden */


    $.get(SERVER_URL + "/DAQInfoAll", function( data ){
        $scope.daq_array = data;
        $scope.daq_1_enabled = data[0].Status;
        $scope.daq_2_enabled = data[1].Status;
        $scope.daq_3_enabled = data[2].Status;
    });

    $scope.submitClicked = function(){
 
        $.post(SERVER_URL + "/DAQinfo", {Name: $scope.selectedDAQ}, function( data ){
            $scope.daq_id = data[0].DAQID;
            

            $.post(SERVER_URL + "/updateLocation", {Location: document.getElementById("inputLocation").value, id: $scope.daq_id}, function(data){
                console.log("Update location post request return is " + data);
                        var success = $mdDialog.alert()
                        .title("Update Success!")
                        .content("The DAQ's location has been updated in the database.")
                        .ok('Great!');
                            $mdDialog
                          .show( success )
                          .finally(function() {
                            alert = undefined;
                          });
            });

        }, "json");
    }

    $scope.enableDAQClicked = function(){
        /* don't need this */
    }

    $scope.enableSubmitClicked = function(){
        $.post(SERVER_URL + "/updateDAQStatus", {"DAQ1": $scope.daq_1_enabled, 
                                                            "DAQ2": $scope.daq_2_enabled, 
                                                            "DAQ3": $scope.daq_3_enabled}, function(data){
            console.log("Update Daq Status post request return is " + data);
            var success = $mdDialog.alert()
            .title("Success!")
            .content("DAQ statuses have been updated.")
            .ok('Great!');
            if(data == 'Success')
            {
                $mdDialog
              .show( success )
              .finally(function() {
                alert = undefined;
              });
            }
        });
    }

    $scope.convertClicked = function(){
       var convertSubmit = document.getElementById('ConvertSubmit');
       var convertRadioGroup = document.getElementById('ConvertRadioGroup');
       if(hidden)
       {
           convertRadioGroup.style.display = "";
           convertSubmit.style.display = "block";
           hidden = false;
       }
       else
       {
            convertRadioGroup.style.display = "none";
            convertSubmit.style.display = "none";
            hidden = true;
       }
    }

    $scope.unitSubmitClicked = function(){
        $.post(SERVER_URL + "/convertUnits", {"Units": $scope.selectedUnit}, function(data){
            var success = $mdDialog.alert()
                                   .title("Success!")
                                   .content("Units have been converted to " + $scope.selectedUnit + ".")
                                   .ok('Great!');
            if(data == "Success")
            {
                $mdDialog.show( success )
                         .finally(function() {
                            alert = undefined;
                            var convertSubmit = document.getElementById('ConvertSubmit');
                            var convertRadioGroup = document.getElementById('ConvertRadioGroup');
                            convertRadioGroup.style.display = "none";
                            convertSubmit.style.display = "none";
                            hidden = true;
                         });
            }
        });
    }


    /****************************/
    /* EnableModalInformation */
    /****************************/

    // Get the modal
    var EnableModal = document.getElementById('EnableModal');

    // Get the button that opens the modal
    var EnableDAQBtn = document.getElementById("EnableDAQBtn");

    // Get the <span> element that closes the modal
    var EnableSpan = document.getElementById("EnableSpan");

    // When the user clicks on the button, open the modal 
    EnableDAQBtn.onclick = function() {
        EnableModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    EnableSpan.onclick = function() {
        EnableModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == EnableModal) {
            EnableModal.style.display = "none";
        }
    }



    /****************************/
    /* LocationModalInformation */
    /****************************/

    // Get the modal
    var LocationModal = document.getElementById('LocationModal');

    // Get the button that opens the modal
    var MoveDAQBtn = document.getElementById("MoveDAQBtn");

    // Get the <span> element that closes the modal
    var LocationSpan = document.getElementById("LocationSpan");

    // When the user clicks on the button, open the modal 
    MoveDAQBtn.onclick = function() {
        LocationModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    LocationSpan.onclick = function() {
        LocationModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == LocationModal) {
            LocationModal.style.display = "none";
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

        $.get(SERVER_URL + "/archive", function(data){
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

            $.get(SERVER_URL + "/archive", function(data){
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

app.controller("HomeController", function($scope, $interval, $timeout, $mdSidenav, $log, $mdDialog, $http){
        // $scope.D1T1=(Math.random()*50).toFixed(2);
        // $scope.D1T2=(Math.random()*50).toFixed(2);
        // $scope.D1T3=(Math.random()*50).toFixed(2);
        // $scope.D1Amb=(Math.random()*50).toFixed(2);
        // $scope.D1L=(Math.random()*50).toFixed(2);

       updateData();
        // $scope.D2T1 = (Math.random()*50).toFixed(2);
        // $scope.D2T2 = (Math.random()*50).toFixed(2);
        // $scope.D2T3 = (Math.random()*50).toFixed(2);
        // $scope.D2Amb = (Math.random()*50).toFixed(2);
        // $scope.D2L = (Math.random()*50).toFixed(2);

        // $scope.D3T1 = (Math.random()*50).toFixed(2);
        // $scope.D3T2 = (Math.random()*50).toFixed(2);
        // $scope.D3T3 = (Math.random()*50).toFixed(2);
        // $scope.D3Amb = (Math.random()*50).toFixed(2);
        // $scope.D3L = (Math.random()*50).toFixed(2);

//     setTimeout(function(){
//     $scope.T1 +=1;
//     alert("changed!");
// }, 200);
    //works
    $interval(updateData, 10000);

    function updateData(){

        var DAQ1IP = "http://10.0.0.21/";
        var DAQ2IP = "http://10.0.0.20/";
        var DAQ3IP = "http://10.0.0.19/";


        //DAQ1
        $.getJSON(DAQ1IP+"Current", function success(data){
            $scope.$apply(function () {
            console.log("DAQ1 Current data is " + data);
            $scope.D1C = data;
            });
            })
         .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D1C = "N/A";
            });
            });
         $.getJSON(DAQ1IP+"T1", function success(data){
            $scope.$apply(function () {
            console.log("DAQ1 T1 data is " + data);
            $scope.D1T1 = data;
            });
            })
         .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
           // $scope.D1T1 = "N/A";
            });
            });


         $.getJSON(DAQ1IP+"T2", function success(data){
            $scope.$apply(function () {
            $scope.D1T2 = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D1T2 = "N/A";
            });
            });

         $.getJSON(DAQ1IP+"T3", function success(data){
            $scope.$apply(function () {
            $scope.D1T3 = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
         //   $scope.D1T3 = "N/A";
            });
            });

         $.getJSON(DAQ1IP+"AmbientTemp", function success(data){
            $scope.$apply(function () {
            $scope.D1Amb = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
         //   $scope.D1Amb = "N/A";
            });
            }); 

         $.getJSON(DAQ1IP+"Light", function success(data){
            $scope.$apply(function () {
            $scope.D1L = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
          //  console.log("Data not found");
            $scope.D1L = "N/A";
            });
            });

            $.getJSON(DAQ1IP+"Humidity", function success(data){
            $scope.$apply(function () {
            $scope.D1H = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
         //   console.log("Data not found");
            $scope.D1H = "N/A";
            });
            });

         //DAQ2
         $.getJSON(DAQ2IP+"T1", function success(data){
            $scope.$apply(function () {
            $scope.D2T1 = data;
        })
        ;
        })
        .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D2T1 = "N/A";
            });
            });

        $.getJSON(DAQ2IP+"T2", function success(data){
            $scope.$apply(function () {
            $scope.D2T2 = data;
        });
            })
        .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
           // $scope.D2T2 = "N/A";
            });
            });

        $.getJSON(DAQ2IP+"T3", function success(data){
            $scope.$apply(function () {
            $scope.D2T3 = data;
            });
            })
        .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
           // $scope.D2T3 = "N/A";
            });
            });

        $.getJSON(DAQ2IP+"AmbientTemp", function success(data){
            $scope.$apply(function () {
            $scope.D2Amb = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
           // $scope.D2Amb = "N/A";
            });
            });

        $.getJSON(DAQ2IP+"Light", function success(data){
            $scope.$apply(function () {
            $scope.D2L = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
           // $scope.D2L = "N/A";
            });
            });

        $.getJSON(DAQ2IP+"Humidity", function success(data){
            $scope.$apply(function () {
            $scope.D2H = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
           // $scope.D2H = "N/A";
            });
            });

        //DAQ3
         $.getJSON(DAQ3IP+"T1", function success(data){
            $scope.$apply(function () {
            $scope.D3T1 = data;
        })
        ;
        })
        .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D3T1 = "N/A";
            });
            });

        $.getJSON(DAQ3IP+"T2", function success(data){
            $scope.$apply(function () {
            $scope.D3T2 = data;
        });
            })
        .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D3T2 = "N/A";
            });
            });

        $.getJSON(DAQ3IP+"T3", function success(data){
            $scope.$apply(function () {
            $scope.D3T3 = data;
            });
            })
        .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D3T3 = "N/A";
            });
            });

        $.getJSON(DAQ3IP+"AmbientTemp", function success(data){
            $scope.$apply(function () {
            $scope.D3Amb = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D3Amb = "N/A";
            });
            });

        $.getJSON(DAQ3IP+"Light", function success(data){
            $scope.$apply(function () {
            $scope.D3L = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
         //   $scope.D3L = "N/A";
            });
            });

        $.getJSON(DAQ3IP+"Humidity", function success(data){
            $scope.$apply(function () {
            $scope.D3H = data;
            });
            })
            .error(function() { 
            $scope.$apply(function () {
            console.log("Data not found");
          //  $scope.D3H = "N/A";
            });
            });
        //indicate data has changed
        console.log("Data changed!");
    }

    
    

});



