// Yujun Jiang
// Data Structure Weekly Assignment 07 (insert groups)
// Insert all the groups in Manhattan to the table on RDS Postgres

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
let uniqueGroups = new Set([]);

async function collectGroups() {
    // gets outer layer object
    await async.eachSeries(allmtgs, function(meeting, callback) {
        // gets inner layer object
        async.eachSeries(meeting.groups, function(groups, callback) {
            setTimeout(callback, 50);
            // extracts group name and add to set
            uniqueGroups.add(groups.group.trim());
            console.log("read from source: " + groups.group);
        });
        setTimeout(callback, 5000);
    });

    // returns the entire set
    return uniqueGroups;
}

async function execute() {
    let uniqueGroups = await collectGroups();
    const client = new Client(db_credentials);
    const insertStatement = "INSERT INTO groups(group_name) VALUES($1)";
    client.connect();

    uniqueGroups.forEach(function(group) {
        console.log("adding group " + group);
        let groupArg = [group];
        client.query(insertStatement, groupArg, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(res.rows[0]);
            }
        });
    });

}

execute();