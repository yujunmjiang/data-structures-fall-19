// Yujun Jiang
// Data Structure Weekly Assignment 07 (insert zones)
// Insert all the zones in Manhattan to the table on RDS Postgres

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

const allmtgs = JSON.parse(fs.readFileSync('/home/ec2-user/environment/week07/data/data-manhattan-meetings.json'));

async.eachSeries(allmtgs, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO zone (zone_id, zone_name) VALUES (DEFAULT, " + value.zone + ")";
    setTimeout(callback, 2000);
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });

});