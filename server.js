var host = "0.0.0.0";
var port = 8435;
var appPort = 9000
var cors = require("cors");
var express = require("express");
var app = express();
var path = require("path");
var r = require("rethinkdb");
var exec = require("exec-php");
var async = require("async");
var connection = null;
var sensorData = "";

//Set of all DAQs
var DAQset = ["DAQ1", "DAQ2"];

console.log("Connecting to rethinkdb");

app.use(cors());


//Attempt to connect to rethinkDB server
//Note: server must be started on the raspberry pi
r.connect({host:'localhost', port:28015}, function(err, conn){
    
   if(err) throw err; 
    
    console.log("Connection success!");
    connection = conn;
  
});

console.log("Successfully connected to database");

/*
 * Server routes
 */

app.use("/", express.static(__dirname));


//Archive - Email the data to the client in JSON format
app.get("/archive", function(request, response){

    exec("php/backup.php", function(error, php, output){
	
      php.archivedata(function(err, result, output, printed){
        if(result==1){
          response.send("Success");
        }
        else{
          response.send("Failure");
        }

      });

    }
);
});

//Purge - Delete all data from every table in the database
app.get("/purge", function(request, response){
// for (daq in DAQset){
//   r.db('HDMI').table(DAQset[daq]).delete().run(connection, function(err){
//     if(err){console.log("Cannot be found")}
//   });
// }

  //!!FOR TESTING PURPOSES, THE FOR LOOP HAS BEEN COMMENTED OUT AND PURGED DATA IS FROM A 
  //  DEPRECATED TABLE
  //for (daq in DAQset){
  r.db('Sensor_data').table("Sensor1TempHumidity").delete().run(connection, function(err){
    if(err){
    console.log("Cannot be found");
    response.send("fail");}
    else{
      response.send("success");
    }
  });
  //}

});


app.get("/index", function (request, response){

    response.send("This is the index page");

});

//DAQ sensor routes

//DAQ1
app.get("/DAQ1/T1", function(request, response){


  getDAQData("DAQ1","T1", response)
});

app.get("/DAQ1/T2", function(request, response){
   getDAQData("DAQ1","T2", response);
   });


app.get("/DAQ1/T3", function(request, response){
    getDAQData("DAQ1","T3", response);
});

app.get("/DAQ1/T4", function(request, response){
    getDAQData("DAQ1","T4", response);
});

app.get("/DAQ1/AmbientTemp", function(request, response){
    getDAQData("DAQ1","AmbientTemp", response);
});

app.get("/DAQ1/Light", function(request, response){
    getDAQData("DAQ1","Light", response);
});

//DAQ2
app.get("/DAQ2/T1", function(request, response){
  getDAQData("DAQ2","T1", response)
});

app.get("/DAQ2/T2", function(request, response){
   getDAQData("DAQ2","T2", response);
   });


app.get("/DAQ2/T3", function(request, response){
    getDAQData("DAQ2","T3", response);
});

app.get("/DAQ2/T4", function(request, response){
    getDAQData("DAQ2","T4", response);
});

app.get("/DAQ2/AmbientTemp", function(request, response){
    getDAQData("DAQ2","AmbientTemp", response);
});

app.get("/DAQ2/Light", function(request, response){
    getDAQData("DAQ2","Light", response);
});


app.listen(port, host);

/*
 *getDAQData
 * Description: Acquired data from rethinkDB 
 * based on the DAQ and sensor type given in the route
 * Params:
 * DAQ (String) - Name of the DAQ
 * sensorType(String) - The sensor to gather data from
 * response (response) - The response object used to return data to the API
 */
function getDAQData(DAQ, sensorType, response){
    r.db('HDMI').table(DAQ).filter({'Sensor Type':sensorType}).orderBy(r.desc('Timestamp')).limit(50).run(connection, function(err, cursor) {
    if (err) throw err;
    sensorData = "";
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor" + sensorType + "  is " + result);
        console.log("The result for the first element is " + result[0]['Timestamp']);
        response.send(result);
        sensorData=result;
        return result
    });
});

}



/*
*gatherData
* Description: Acquire data from rethinkdb based on the GET request
* Params:
* sensor (String) - The sensor to gather data from 
* DEPRECATED
*/
function gatherdata(sensor){
switch(sensor){
    
   case'sensor1': 
r.db('Sensor_data').table('Sensor1TemperatureHumidity').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor1 is " + result);
        sensorData=result;
    });
});
    break;
    
    case 'sensor2':
    r.db('Sensor_data').table('Sensor2Temperature').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor 2 is " + result);
        sensorData=result;
    });
});
    break;
    
    case 'sensor3':
    r.db('Sensor_data').table('Sensor3Temperature').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor1 is " + result);
        sensorData=result;
    });
});
    break;
    
    case 'sensor4':
    r.db('Sensor_data').table('Sensor4TemperatureLight').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor1 is " + result);
        sensorData=result;
    });
});
    break;
    
    case 'sensor5':
    r.db('Sensor_data').table('Sensor5Temperature').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor1 is " + result);
        sensorData=result;
    });
});
    
    break;
    case 'DAQ1':
    r.db('HDMI').table('DAQ1').run(connection, function(err, cursor) {
   if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
       console.log("The result for DAQ1 is " + result);
       sensorData=result;
   });
});
    break;

}
}

