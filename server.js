var host = "0.0.0.0";
var port = 8435;
var appPort = 9000

//Node express module for server admin
var express = require("express");
var app = express();
var path = require("path");
var r = require("rethinkdb");
var connection = null;
var sensorData = "";

var async = require("async");

console.log("Connecting to rethinkdb");

//Attempt to connect to rethinkDB server
//Note: server must be started on the raspberry pi
r.connect({host:'localhost', port:28015}, function(err, conn){
    
   if(err) throw err; 
    
    console.log("Connection success!");
    connection = conn;
  
});

console.log("Successfully connected to database");

app.use("/", express.static(__dirname));

app.get("/index", function (request, response){

    response.send("This is the index page");

});

app.get("/DAQ1/T1", function(request, response){
//    gatherdata("DAQ1");
//   async.parallel([
//    function(callback){getDAQData("DAQ1","T1"); console.log("Finished executing function 1");},
//    function(callback){response.send(sensorData); console.log("Finished executing function 2");}
//   ]    
// );

  getDAQData("DAQ1","T1", response)
});

app.get("/DAQ1/T2", function(request, response){
   // gatherdata("DAQ1");
//    async.parallel([
//    function(callback){getDAQData("DAQ1","T2"); console.log("Finished executing function 1");},
//    function(callback){response.send(sensorData); console.log("Finished executing function 2");}
//   ]    
// );

   getDAQData("DAQ1","T2", response);
   });


app.get("/DAQ1/T3", function(request, response){
   // gatherdata("DAQ1");

    getDAQData("DAQ1","T3");
  
    response.send(sensorData);
});

app.get("/DAQ1/T4", function(request, response){
   // gatherdata("DAQ1");

    getDAQData("DAQ1","T4");
  
    response.send(sensorData);
});

app.get("/DAQ1/AmbientTemp", function(request, response){
   // gatherdata("DAQ1");
    getDAQData("DAQ1","AmbientTemp");
    response.send(sensorData);
});

app.get("/DAQ1/Light", function(request, response){
   // gatherdata("DAQ1");
   getDAQData("DAQ1","Light");
    response.send(sensorData);
});

//API requests
//app.get("/sensor1", function(request,response){
//    gatherdata("sensor1");
//    response.send(sensorData);

//});

app.get("/sensor2", function(request, response){
    gatherdata("sensor2");
     response.send(sensorData);

});

app.get("/sensor3", function(request, response){
     gatherdata("sensor3");
     response.send(sensorData);
});

app.get("/sensor4", function(request, response){
     gatherdata("sensor4");
     response.send(sensorData);

});

app.get("/sensor5", function(request, response){
     gatherdata("sensor5");
     response.send(sensorData);

});

//Establish server params
app.listen(port, host);


function getDAQData(DAQ, sensorType, response){

//r.db('HDMI').table('DAQ1').filter({'Sensor Type':'T1'}).orderBy(r.desc('Timestamp')).limit(50)

    r.db('HDMI').table(DAQ).filter({'Sensor Type':sensorType}).orderBy(r.desc('Timestamp')).limit(50).run(connection, function(err, cursor) {
    if (err) throw err;
    sensorData = "";
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor" + sensorType + "  is " + result);
        response.send(result);
        sensorData=result;
        return result
       // sensorData = JSON.stringify(result, null, 2);
    });
});

}



/*
*gatherData
* Description: Acquire data from rethinkdb based on the GET request
* Params:
* sensor (String) - The sensor to gather data from 
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
       // sensorData = JSON.stringify(result, null, 2);
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
       // sensorData = JSON.stringify(result, null, 2);
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
       // sensorData = JSON.stringify(result, null, 2);
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
       // sensorData = JSON.stringify(result, null, 2);
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

