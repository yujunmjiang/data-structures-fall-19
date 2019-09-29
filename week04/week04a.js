// Yujun Jiang
// Data Structure Weekly Assignment 04

const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

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

// // Sample SQL statement to create a table: 

var thisQuery = "CREATE TABLE locationInfo (address varchar(100), lat double precision, long double precision);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE locationInfo;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
