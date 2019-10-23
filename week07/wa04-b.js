// Yujun Jiang
// Data Structure Weekly Assignment 07 (Pt. 04-b)
// Makes a request to the Texas A&M Geoservices Geocoding APIs for each address

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
var rawData = fs.readFileSync('/home/ec2-user/environment/week07/data/data-manhattan-geocodes-1.json');

var addressesForDb = JSON.parse(rawData);

console.log(addressesForDb);

async.eachSeries(addressesForDb, function(value, callback) {

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();
    
    // Sample SQL statement to create a table: 
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.Building + "', " + value.streetAddress + ", " + value.City + ", " + value.State + ", " + value.Zip + ", " + value.Geocode.Latitude + ", " + value.Geocode.Longitude + ");";
    // Sample SQL statement to delete a table: 
    // var thisQuery = "DROP TABLE aalocations;";

    console.log(thisQuery);
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 10000);
});