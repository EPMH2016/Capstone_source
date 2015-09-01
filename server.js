var host = "0.0.0.0";
var port = 8435;
var express = require("express");
var app = express();
var path = require("path");
var r = require("rethinkdb");
var connection = null;
var sensorData = "";

console.log("Connecting to rethinkdb");

r.connect({host:'localhost', port:28015}, function(err, conn){
    
   if(err) throw err; 
    
    console.log("Connection success!");
    connection = conn;
  //  gatherdata("sensor1");

});

function gatherdata(sensor){
switch(sensor){
    
   case'sensor1': 
r.db('Sensor_data').table('Sensor1TempHumidity').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor1 is " + result);
        sensorData=result;
       // sensorData = JSON.stringify(result, null, 2);
    });
});

}

}

console.log("Gathering data from sensor 1");


app.use("/sensor1", express.static(__dirname));


app.get("/index", function (request, response){

    response.send("This is the index page");

});

app.get("/sensor1", function(request,response){
    gatherdata("sensor1");
    response.send(sensorData);

});

app.get("/sensor2", function(request, response){

    response.send("This is the endpoint for sensor 2");

});

app.get("/sensor3", function(request, response){

    response.send("This is the endpoint for sensor 3");
});

app.get("/sensor4", function(request, response){

    response.send("This is the endpoint for sensor 4");

});

app.get("/sensor5", function(request, response){

    response.send("This is the endpoint for sensor5");

});


app.listen(port, host);

