// Yujun Jiang
// Data Structure Weekly Assignment 09
// Setup for the temperature data table in Postgres SQL database

const { Client } = require('pg');
const dotenv = require('dotenv').config();

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'yujunmjiang';
db_credentials.host = 'data-structures-temp.cmqqziujkrxh.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

var drop = false;
var query;

if (drop == true) {
    // SQL statement to delete a table: 
    query = "DROP TABLE if exists sensordata cascade;";
    
} else {
    // Sample SQL statement to create a table: 
    query = "CREATE TABLE sensorData ( sensorValue real, sensorTime timestamp DEFAULT current_timestamp );";
}

client.query(query, (err, res) => {
    console.log(err, res);
    client.end();
});
