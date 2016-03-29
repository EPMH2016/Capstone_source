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

//app.use(express.bodyParser());
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//DAQinfo - Retrieve info the given DAQ in the database
//Request bodies should contain DAQ name
app.post("/DAQinfo", function(request, response){
console.log("The body name is " + request.body.Name);
getDAQInfo(request.body.Name, response);
});

//DAQinfo - Retrieve info the given DAQ in the database
//Request bodies should contain DAQ name
app.get("/DAQInfoAll", function(request, response){

r.db('HDMI').table('DAQInformation').run(connection, function(err, cursor) {
    if (err) throw err;
    daqData = "";
    cursor.toArray(function(err, result) {
        if (err) throw err;

        response.send(result);
        daqData=result;
        return result
    });
});

});

app.post("/updateTimeInterval", function(request, response){
//Body: {'timeInterval': '3', 'Name':'DAQ1'}
var timeInterval = request.body.timeInterval;
var Name = request.body.Name;

console.log("Updating time interval for " + Name + ": " + timeInterval);
r.db('HDMI').table('DAQInformation').filter({'Name': Name}).update({'Time Interval': timeInterval}).run(connection, function(err){
  if (err){
    response.send("Failure");
  }
  else{
    response.send("Success");
  }
});
});

app.post("/updateLocation", function(request, response){

//{Location: "", id: ""}
var location = request.body.Location;
var id = request.body.id;

console.log("this is the location you are trying to update " + location);

r.db('HDMI').table('DAQInformation').filter({'DAQID': id}).update({'Location': location}).run(connection, function(err){
  if (err){
    response.send("Failure");
  }
  else{
    response.send("Success");
  }
})



});


app.post("/updateDAQStatus", function(request, response){

console.log("updating DAQ statuses");

console.log("POST: " + request.body.statuses);


//get all DAQS
daqData = [];
r.db('HDMI').table('DAQInformation').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        daqData=result;
        for (var i = 0; i < result.length; i++){
    console.log("DAQ name: " + daqData[i].Name);
    r.db('HDMI').table('DAQInformation').filter({'Name': daqData[i].Name}).update({'Status': request.body[daqData[i].Name]}).run(connection, function(err){
  if (err){
    response.send("Failure");
  }
  
  });
  }
  response.send("Success");
  

    return result;
    });
});





// r.db('HDMI').table('DAQInformation').filter({'DAQID': id}).update({'Location': location}).run(connection, function(err){
//   if (err){
//     response.send("Failure");
//   }
//   else{
//     response.send("Success");
//   }
// });



});

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
for (daq in DAQset){
  r.db('HDMI').table(DAQset[daq]).delete().run(connection, function(err){
    if(err){console.log("Cannot be found")}
  });
}

  response.send("success!");

  //!!FOR TESTING PURPOSES, THE FOR LOOP HAS BEEN COMMENTED OUT AND PURGED DATA IS FROM A 
  //  DEPRECATED TABLE
  //for (daq in DAQset){
  // r.db('Sensor_data').table("Sensor1TempHumidity").delete().run(connection, function(err){
  //   if(err){
  //   console.log("Cannot be found");
  //   response.send("fail");}
  //   else{
  //     response.send("success");
  //   }
  // });
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

app.get("/DAQ1/AmbientTemp", function(request, response){
    getDAQData("DAQ1","AmbientTemp", response);
});

app.get("/DAQ1/Light", function(request, response){
    getDAQData("DAQ1","Light", response);
});

app.get("/DAQ1/Humidity", function(request, response){
    getDAQData("DAQ1","Humidity", response);
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

app.get("/DAQ2/AmbientTemp", function(request, response){
    getDAQData("DAQ2","AmbientTemp", response);
});

app.get("/DAQ2/Light", function(request, response){
    getDAQData("DAQ2","Light", response);
});

app.get("/DAQ2/Humidity", function(request, response){
    getDAQData("DAQ2","Humidity", response);
});


//DAQ3
app.get("/DAQ3/T1", function(request, response){
  getDAQData("DAQ3","T1", response)
});

app.get("/DAQ3/T2", function(request, response){
   getDAQData("DAQ3","T2", response);
});

app.get("/DAQ3/T3", function(request, response){
    getDAQData("DAQ3","T3", response);
});

app.get("/DAQ3/AmbientTemp", function(request, response){
    getDAQData("DAQ3","AmbientTemp", response);
});

app.get("/DAQ3/Light", function(request, response){
    getDAQData("DAQ3","Light", response);
});

app.get("/DAQ3/Humidity", function(request, response){
    getDAQData("DAQ3","Humidity", response);
});


app.listen(port, host);

/*
 * getDAQData
 * Description: Acquired data from rethinkDB 
 * based on the DAQ and sensor type given in the route
 * Params:
 * DAQ (String) - Name of the DAQ
 * sensorType(String) - The sensor to gather data from
 * response (response) - The response object used to return data to the API
 */
function getDAQData(DAQ, sensorType, response){
    r.db('HDMI').table(DAQ).orderBy({index:r.desc('Timestamp')}).filter({'Sensor Type':sensorType}).limit(50).run(connection, function(err, cursor) {
    if (err) throw err;
    sensorData = "";
    console.log("Queried");
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log("The result for sensor" + sensorType + " DAQ " + DAQ +"  is " + result);
        response.send(result);
        sensorData=result;
        console.log("returning result")
        return result
    });
});

}

function getDAQInfo(DAQname, response){
r.db('HDMI').table('DAQInformation').filter({'Name':DAQname}).run(connection, function(err, cursor) {
    if (err) throw err;
    daqData = "";
    cursor.toArray(function(err, result) {
        if (err) throw err;

        response.send(result);
        daqData=result;
        return result
    });
});

}






