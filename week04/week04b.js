// Yujun Jiang
// Data Structure Weekly Assignment 04

const { Client } = require('pg');
var async = require('async');
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

// AWS RDS POSTGRESQL INSTANCE

var db_credentials = new Object();
db_credentials.user = 'yujunmjiang';
db_credentials.host = 'data-structures.cmqqziujkrxh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Read raw address data from a new JSON file

var rawData = fs.readFileSync('../week04/data/first.json');
addressesForDb = JSON.parse(rawData);

var addressesForDb = [];

async.eachSeries(addressesForDb, function(value, callback) {

    // Connect to the AWS RDS Postgres database
    
    const client = new Client(db_credentials);
    client.connect();

    // Sample SQL statement to create a table: 
    
    var thisQuery = "INSERT INTO locationInfo VALUES (E'" + value.address + "', " + value.latLon.Latitude + ", " + value.latLon.Longitude + ");";
    // Sample SQL statement to delete a table: 
    // var thisQuery = "DROP TABLE locationInfo;";

    console.log(thisQuery);
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000);
});
