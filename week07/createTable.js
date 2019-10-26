// Yujun Jiang
// Data Structure Weekly Assignment 07 (create table)
// Create a table for all the meeting in Manhattan on RDS Postgres

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

// connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// use SQL statement to create a table called MEETING: 
var thisQuery = "CREATE TABLE meeting (\
                              meeting_id serial PRIMARY KEY,\
                              meeting_type varchar(10),\
                              group_id integer REFERENCES groups (group_id),\
                              zone_id integer REFERENCES zone (zone_id),\
                              location_name varchar,\
                              address varchar,\
                              zip varchar(10),\
                              city varchar(100),\
                              state varchar(10),\
                              lat double precision,\
                              lng double precision,\
                              accessibility bool,\
                              day varchar(100),\
                              time_begin varchar(200),\
                              time_end varchar(200),\
                              specialInterest varchar(100)\
                              );";

// sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE meeting;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
