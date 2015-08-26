var host = "0.0.0.0";
var port = 8435;
var express = require("express");
var app = express();
var path = require("path");


app.use("/sensor1", express.static(__dirname));


app.get("/index", function (request, response){

    response.send("This is the index page");
});

app.get("/sensor1", function(request,response){

    response.send("This is the endpoint for sensor 1");

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