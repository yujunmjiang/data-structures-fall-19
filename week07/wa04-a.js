// Yujun Jiang
// Data Structure Weekly Assignment 07 (Pt. 04-a)
// Makes a request to the Texas A&M Geoservices Geocoding APIs for each address

const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// var async = require('async');
// var fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'yujunmjiang';
db_credentials.host = 'data-structures.cmqqziujkrxh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE aalocations (building varchar(1000), StreetAddress varchar(1000), City varchar(250), State varchar(250), Zip varchar(250), Latitude double precision, Longitude double precision);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});