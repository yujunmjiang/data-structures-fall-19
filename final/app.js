// 1. Create dependencies and configure
var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '/home/ec2-user/environment/.env' });


// 2. AWS credentials for RDS
var db_credentials = new Object();
db_credentials.user = 'yujunmjiang';
db_credentials.host = 'data-structures.cmqqziujkrxh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;


// 3. AWS credentials for Dynamodb
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();


// 4. Serve static files in public folder
app.use(express.static('public'));


// 5. Listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});


// 6. Create an index page for data visualizations and requested data
app.get('/', function(req, res) {
    res.send(`<h1>Data Structures Apps</h1>
            <ul><li><a href="/aaVis">Alcoholic Anonymous Meeting</a></li></ul>
            <ul><li><a href="/aaData">Data</a></li></ul>
            <ul><li><a href="/whVis">Movie Watch History</a></li></ul>
            <ul><li><a href="/whData">Data</a></li></ul>
            <ul><li><a href="/tsVis">Temperature Sensor</a></li></ul>
            <ul><li><a href="/tsData">Data</a></li></ul>`);
});


// 7. AA Meeting: data visualization
// insert a map on AA meeting data visualization page
var aa1 = `<!doctype html>
<html lang="en">
    <head>
      <meta charset="utf-8">
      <title>AA Meetings</title>
      <meta name="description" content="Meetings of AA in Manhattan">
      <meta name="author" content="Yujun Jiang">
      <link rel="stylesheet" href="styles.css?v=1.0">
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
           integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
           crossorigin=""/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.3/dat.gui.js"></script>
    </head>
    
    <body>
        <div id="mapid"></div>
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
           integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
           crossorigin=""></script>
          <script>
          var data = 
          `;

var aa2 = `;
            var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                minZoom: 10,
                maxZoom: 20,
                id: 'mapbox.dark',
                accessToken: 'pk.eyJ1IjoieXVqdW5tamlhbmciLCJhIjoiY2s0MDhrcGVwMDEwODNscGk5YjlwY2gwciJ9.-RHgBYx0hOK9UciZjMh8Tg'
            }).addTo(mymap);
            
            var circles = [];
            for (var i=0; i<data.length; i++) {
                for (var j=0; j<data[i].location.length; j++){
                    if (data[i].location[j].zip == "10026" || data[i].location[j].zip == "10027" || data[i].location[j].zip == "10030" || data[i].location[j].zip == "10037" || data[i].location[j].zip == "10039"){
                        var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                            color: '#ff007f',
                            radius: 5
                        });
                    } else if (data[i].location[j].zip == "10001" || data[i].location[j].zip == "10011" || data[i].location[j].zip == "10018" || data[i].location[j].zip == "10019" || data[i].location[j].zip == "10020" || data[i].location[j].zip == "10036"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff00ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10029" || data[i].location[j].zip == "10035"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#7f00ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10010" || data[i].location[j].zip == "10016" || data[i].location[j].zip == "10017" || data[i].location[j].zip == "10022"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#0000ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10012" || data[i].location[j].zip == "10013" || data[i].location[j].zip == "10014"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#0080ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10004" || data[i].location[j].zip == "10005" || data[i].location[j].zip == "10006" || data[i].location[j].zip == "10007" || data[i].location[j].zip == "10038" || data[i].location[j].zip == "10280"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#00ffff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10002" || data[i].location[j].zip == "10003" || data[i].location[j].zip == "10009"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#00ff00',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10021" || data[i].location[j].zip == "10028" || data[i].location[j].zip == "10044" || data[i].location[j].zip == "10065" || data[i].location[j].zip == "10075" || data[i].location[j].zip == "10128"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ffff00',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10023" || data[i].location[j].zip == "10024" || data[i].location[j].zip == "10025"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff8000',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10031" || data[i].location[j].zip == "10032" || data[i].location[j].zip == "10033" || data[i].location[j].zip == "10034" || data[i].location[j].zip == "10040"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ffff00',
                          radius: 5
                      });
                    } else {
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#808080',
                          radius: 5
                      });
                    }
 
                // circle.bindPopup(JSON.stringify(data[i].location)).addTo(mymap);
                circle.bindPopup("<dl><dt><b>Schedule</b></dt>"+"<dd>"+data[i].schedule[j].day+"<br>"+data[i].schedule[j].begin+"</dd>"+"<dt><b>Location</b></dt>"+"<dd>"+data[i].location[j].add+"</dd></dl>").addTo(mymap);
                circle.addTo(mymap);
                circles.push(circle);
                
                }
            }
            
            var meeting = {
                "Show All": true,
                "Zip Code": "Pick One"
            };
            
            var gui = new dat.gui.GUI();
            gui.add(meeting, 'Show All').onChange(function(check){
              if (check){
                removeAllCircles();
                for (var i=0; i<data.length; i++) {
                      for (var j=0; j<data[i].location.length; j++){
                        // removeAllCircles();
                           if (data[i].location[j].zip == "10026" || data[i].location[j].zip == "10027" || data[i].location[j].zip == "10030" || data[i].location[j].zip == "10037" || data[i].location[j].zip == "10039"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff007f',
                          radius: 5
                        });
                    } else if (data[i].location[j].zip == "10001" || data[i].location[j].zip == "10011" || data[i].location[j].zip == "10018" || data[i].location[j].zip == "10019" || data[i].location[j].zip == "10020" || data[i].location[j].zip == "10036"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff00ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10029" && data[i].location[j].zip == "10035"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#7f00ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10010" || data[i].location[j].zip == "10016" || data[i].location[j].zip == "10017" || data[i].location[j].zip == "10022"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#0000ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10012" || data[i].location[j].zip == "10013" || data[i].location[j].zip == "10014"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#0080ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10004" || data[i].location[j].zip == "10005" || data[i].location[j].zip == "10006" || data[i].location[j].zip == "10007" || data[i].location[j].zip == "10038" || data[i].location[j].zip == "10280"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#00ffff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10002" || data[i].location[j].zip == "10003" || data[i].location[j].zip == "10009"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#00ff00',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10021" || data[i].location[j].zip == "10028" || data[i].location[j].zip == "10044" || data[i].location[j].zip == "10065" || data[i].location[j].zip == "10075" || data[i].location[j].zip == "10128"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ffff00',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10023" || data[i].location[j].zip == "10024" || data[i].location[j].zip == "10025"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff8000',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10031" || data[i].location[j].zip == "10032" || data[i].location[j].zip == "10033" || data[i].location[j].zip == "10034" || data[i].location[j].zip == "10040"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ffff00',
                          radius: 5
                      });
                    } else {
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#808080',
                          radius: 5
                      });
                    }
                    
                // circle.bindPopup(JSON.stringify(data[i].location)).addTo(mymap);
                circle.bindPopup("<dl><dt><b>Schedule</b></dt>"+"<dd>"+data[i].schedule[j].day+"<br>"+data[i].schedule[j].begin+"</dd>"+"<dt><b>Location</b></dt>"+"<dd>"+data[i].location[j].add+"</dd></dl>").addTo(mymap);
                circle.addTo(mymap);
                circles.push(circle);
                }
            }
          } else {
            removeAllCircles();
          }
        });
            
            gui.add(meeting, 'Zip Code', ["10026","10027","10030","10037","10039","10001","10011","10018","10019","10020","10036","10029","10035","10010","10016","10017","10022","10012","10013","10014","10004","10005","10006","10007","10038","10280","10002","10003","10009","10021","10028","10044","10065","10075","10128","10023","10024","10025"]).onChange(function(zipcode){
                removeAllCircles();
                for (var i=0; i<data.length; i++) {
                    if (data[i].zip == zipcode){
                      for (var j=0; j<data[i].location.length; j++){
                           if (data[i].location[j].zip == "10026" || data[i].location[j].zip == "10027" || data[i].location[j].zip == "10030" || data[i].location[j].zip == "10037" || data[i].location[j].zip == "10039"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff007f',
                          radius: 5
                        });
                    } else if (data[i].location[j].zip == "10001" || data[i].location[j].zip == "10011" || data[i].location[j].zip == "10018" || data[i].location[j].zip == "10019" || data[i].location[j].zip == "10020" || data[i].location[j].zip == "10036"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff00ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10029" && data[i].location[j].zip == "10035"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#7f00ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10010" || data[i].location[j].zip == "10016" || data[i].location[j].zip == "10017" || data[i].location[j].zip == "10022"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#0000ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10012" || data[i].location[j].zip == "10013" || data[i].location[j].zip == "10014"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#0080ff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10004" || data[i].location[j].zip == "10005" || data[i].location[j].zip == "10006" || data[i].location[j].zip == "10007" || data[i].location[j].zip == "10038" || data[i].location[j].zip == "10280"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#00ffff',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10002" || data[i].location[j].zip == "10003" || data[i].location[j].zip == "10009"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#00ff00',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10021" || data[i].location[j].zip == "10028" || data[i].location[j].zip == "10044" || data[i].location[j].zip == "10065" || data[i].location[j].zip == "10075" || data[i].location[j].zip == "10128"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ffff00',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10023" || data[i].location[j].zip == "10024" || data[i].location[j].zip == "10025"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ff8000',
                          radius: 5
                      });
                    } else if (data[i].location[j].zip == "10031" || data[i].location[j].zip == "10032" || data[i].location[j].zip == "10033" || data[i].location[j].zip == "10034" || data[i].location[j].zip == "10040"){
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#ffff00',
                          radius: 5
                      });
                    } else {
                      var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].lng], {
                          color: '#808080',
                          radius: 5
                      });
                    }
                    
                // circle.bindPopup(JSON.stringify(data[i].location)).addTo(mymap);
                circle.bindPopup("<dl><dt><b>Schedule</b></dt>"+"<dd>"+data[i].schedule[j].day+"<br>"+data[i].schedule[j].begin+"</dd>"+"<dt><b>Location</b></dt>"+"<dd>"+data[i].location[j].add+"</dd></dl>").addTo(mymap);
                circle.addTo(mymap);
                circles.push(circle);
                
                  }
                }
            }
        });
        
            function removeAllCircles(){
                // remove each circle from the map and empty our array of references
                circles.forEach(function(circle, i){
                    mymap.removeLayer(circle);
                })
                circles = [];
            }
            
        </script>
    </body>
</html>`;

app.get('/aaVis', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL statement to query the selected contents of a table:
    // var thisQuery = `SELECT lat, lng, location_name, city, state, zip, json_agg(json_build_object('locationName', location_name, 'meetingAddress', address, 'meetingDay', day, 'meetingType', meeting_type, 'timeBegin', time_begin, 'timeEnd', time_end)) as meeting 
    // FROM meeting     
    // GROUP BY lat, lng, location_name, city, state, zip;`;

    var thisQuery = `SELECT lat, lng, zip, json_agg(json_build_object('loc', location_name, 'add', address, 'zip', zip, 'lat', lat, 'lng', lng)) as location, json_agg(json_build_object('day', day, 'begin', time_begin, 'end', time_end)) as schedule 
    FROM meeting     
    GROUP BY lat, lng, zip;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }

        else {
            var resp = aa1 + JSON.stringify(qres.rows) + aa2;
            res.send(resp);
            client.end();
            console.log('1) responded to request for aa meeting data');
        }
    });
});


// 8. AA Meeting: data request
app.get('/aaData', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL statement to query the entire contents of a table:
    var thisQuery = "SELECT * FROM meeting;";

    client.connect();
    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('1.1) responded to request for aa meeting data');
        }
    });
});


// 9. Watch History: data visualization
app.get('/whVis', function(req, res) {
    // var dynamodb = new AWS.DynamoDB();
    var params = {
        TableName: "watch-history",
        KeyConditionExpression: "#tp = :categoryName and #dt between :minDate and :maxDate", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp": "category",
            "#dt": "date"
        },
        ExpressionAttributeValues: { // the query values
            ":categoryName": { S: "Action" },
            ":minDate": { S: new Date("January 1, 2019").toISOString() },
            ":maxDate": { S: new Date("December 31, 2019").toISOString() }
        }
    };

    var something = '' + '<ul><li><a href="/">Back</a></li></ul>';
    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log("***** ***** ***** ***** ***** \n", item);
                something += item.date.S;
            });
            res.send(something);

        }
    });
});


// 10. Watch History: data request
app.get('/whData', function(req, res) {
    // var dynamodb = new AWS.DynamoDB();

    var output = {};
    output.wh = [];

    var params = {
        TableName: "watch-history",
        KeyConditionExpression: "#tp = :categoryName and #dt between :minDate and :maxDate", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp": "category",
            "#dt": "date"
        },
        ExpressionAttributeValues: { // the query values
            ":categoryName": { S: "Movie" },
            ":minDate": { S: new Date("January 1, 2019").toISOString() },
            ":maxDate": { S: new Date("December 31, 2019").toISOString() }
        }
    };

    // var something = '' + '<ul><li><a href="/">Back</a></li></ul>';
    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log("***** ***** ***** ***** ***** \n", item);
                // something += item.date.S;
                output.wh.push({ 'type': item.type.S, 'date': item.date.S });
            });
            res.send(output);

        }
    });
});


// 11. Temperature Sensor: data visualization
app.get('/tsVis', function(req, res) {
    const { Client } = require('pg');
    var db_credentials = new Object();
    db_credentials.user = 'yujunmjiang';
    db_credentials.host = process.env.AWSRDS_EP;
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    var client = new Client(db_credentials);
    client.connect();

    var tsoutput = [];

    // Sample SQL statement to query the entire contents of a table:
    var thisQuery = "SELECT * FROM sensorData;"; // print all values
    // var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
    // var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;";

    client.query(thisQuery, (err, response) => {
        var output = response.rows;
        tsoutput.push(output);
        console.log(err);
        var visHtml = '' + '<ul><li><a href="/">Back</a></li></ul>';
        // for (var i = 0; i < tsoutput[0].length; i++) {
        //     visHtml += "<p>" + JSON.stringify(tsoutput[0][i]) + "</p>";
        // }
        res.send(visHtml);
        client.end();
    });

});


// 12. Temperature Sensor: data request
app.get('/tsData', function(req, res) {
    const { Client } = require('pg');
    var db_credentials = new Object();
    db_credentials.user = 'yujunmjiang';
    db_credentials.host = process.env.AWSRDS_EP;
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    var client = new Client(db_credentials);
    client.connect();

    var tsoutput = [];

    // Sample SQL statement to query the entire contents of a table:
    var thisQuery = "SELECT * FROM sensorData;"; // print all values
    // var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
    // var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;";

    client.query(thisQuery, (err, response) => {
        var output = response.rows;
        tsoutput.push(output);
        console.log(err);
        var dataHtml = '' + '<ul><li><a href="/">Back</a></li></ul>';
        for (var i = 0; i < tsoutput[0].length; i++) {
            dataHtml += "<p>" + JSON.stringify(tsoutput[0][i]) + "</p>";
        }
        res.send(dataHtml);
        client.end();
    });

});