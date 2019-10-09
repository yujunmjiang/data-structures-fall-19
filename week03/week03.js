// Yujun Jiang
// Data Structure Weekly Assignment 03
// Makes a request to the Texas A&M Geoservices Geocoding APIs for each address

var request = require('request');
var async = require('async');
var fs = require('fs');
const dotenv = require('dotenv');

// TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_KEY;

// Read raw address data from a new JSON file
var rawData = fs.readFileSync('../week03/data/data-m03-update.json');
rawData = JSON.parse(rawData);

// Geocode addresses
var dataManhattan = [];
var addresses = [];

// Add all elements to the end of an array, 'addresses'
for (var i = 0; i<rawData.length; i++) {
addresses.push(rawData[i]['streetAddress']);
}

// 'eachSeries' in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            console.log(tamuGeo['FeatureMatchingResultType']);
            dataManhattan.push(tamuGeo);
        }
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('../week03/data/first.json', JSON.stringify(dataManhattan));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(dataManhattan.length);
});
