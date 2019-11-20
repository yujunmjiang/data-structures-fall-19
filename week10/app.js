var express = require('express'), // npm install express
    app = express();

const dotenv = require('dotenv').config({ path: '/home/ec2-user/environment/.env' });
const { Client } = require('pg');
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";



// ************ Index ************

app.get('/', function(req, res) {
    res.send(`<h1>Data Structures Apps</h1>
            <ul><li><a href="/aa.html">Alcoholic Anonymous Meeting</a></li></ul>
            <ul><li><a href="/wh.html">Movie Watch History</a></li></ul>
            <ul><li><a href="/ts.html">Temperature Sensor</a></li></ul>`);
});



// ************ Alcoholic Anonymous Meeting ************

app.get('/aa.html', function(req, res) {
    res.send(`<h1>Alcoholic Anonymous Meeting</h1>
            <ul><li><a href="/aa/aa-data.html">Data</a></li></ul>
            <ul><li><a href="/aa/aa-visualization.html">Visualization</a></li></ul>
            <ul><li><a href="/">Back</a></li></ul>`);
});

app.get('/aa/aa-data.html', function(req, res) {
    var db_credentials = new Object();
    db_credentials.user = 'yujunmjiang';
    db_credentials.host = 'data-structures.cmqqziujkrxh.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    var client = new Client(db_credentials);
    client.connect();

    var aaoutput = [];

    // Sample SQL statement to query the entire contents of a table:
    var thisQuery = "SELECT * FROM zone;";

    client.query(thisQuery, (err, response) => {
        var output = response.rows;
        aaoutput.push(output);
        console.log(err);
        var dataHtml = '' + '<ul><li><a href="/aa.html">Back</a></li></ul>';
        for (var i = 0; i < aaoutput[0].length; i++) {
            dataHtml += "<p>" + JSON.stringify(aaoutput[0][i]) + "</p>";
        }
        res.send(dataHtml);
        client.end();
    });

});

app.get('/aa/aa-visualization.html', function(req, res) {
    var db_credentials = new Object();
    db_credentials.user = 'yujunmjiang';
    db_credentials.host = 'data-structures.cmqqziujkrxh.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    var client = new Client(db_credentials);
    client.connect();

    var aaoutput = [];

    // Sample SQL statement to query the entire contents of a table:
    var thisQuery = "SELECT * FROM zone;";

    client.query(thisQuery, (err, response) => {
        var output = response.rows;
        aaoutput.push(output);
        console.log(err);
        var visHtml = '' + '<ul><li><a href="/aa.html">Back</a></li></ul>';
        // for (var i = 0; i < aaoutput[0].length; i++) {
        //     visHtml += "<p>" + JSON.stringify(aaoutput[0][i]) + "</p>";
        // }
        res.send(visHtml);
        client.end();
    });

});



// ************ Movie Watch History ************

app.get('/wh.html', function(req, res) {
    res.send(`<h1>Movie Watch History</h1>
            <ul><li><a href="/wh/wh-data.html">Data</a></li></ul>
            <ul><li><a href="/wh/wh-visualization.html">Visualization</a></li></ul>
            <ul><li><a href="/">Back</a></li></ul>`);
});

app.get('/wh/wh-data.html', function(req, res) {
    var dynamodb = new AWS.DynamoDB();
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

    var something = '' + '<ul><li><a href="/wh.html">Back</a></li></ul>';
    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
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

app.get('/wh/wh-visualization.html', function(req, res) {
    var dynamodb = new AWS.DynamoDB();
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

    var something = '' + '<ul><li><a href="/wh.html">Back</a></li></ul>';
    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
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


// ************ Temperature Sensor ************

app.get('/ts.html', function(req, res) {
    res.send(`<h1>Temperature Sensor</h1>
            <ul><li><a href="/ts/ts-data.html">Data</a></li></ul>
            <ul><li><a href="/ts/ts-visualization.html">Visualization</a></li></ul>
            <ul><li><a href="/">Back</a></li></ul>`);
});

app.get('/ts/ts-data.html', function(req, res) {
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
        var dataHtml = '' + '<ul><li><a href="/aa.html">Back</a></li></ul>';
        for (var i = 0; i < tsoutput[0].length; i++) {
            dataHtml += "<p>" + JSON.stringify(tsoutput[0][i]) + "</p>";
        }
        res.send(dataHtml);
        client.end();
    });

});

app.get('/ts/ts-visualization.html', function(req, res) {
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
        var visHtml = '' + '<ul><li><a href="/aa.html">Back</a></li></ul>';
        // for (var i = 0; i < tsoutput[0].length; i++) {
        //     visHtml += "<p>" + JSON.stringify(tsoutput[0][i]) + "</p>";
        // }
        res.send(visHtml);
        client.end();
    });

});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});
