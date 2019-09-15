## Weekly Assignment 03

The starter code provided by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_03.md)

```javascript
// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_KEY;

// geocode addresses
var meetingsData = [];
var addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St"];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
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
            meetingsData.push(tamuGeo);
        }
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
});
```

## Solution

```javascript
// Using Node.js, read the assigned AA text file and store the contents of the file in a variable

var fs = require('fs');
var cheerio = require('cheerio');

// Load the AA text file from week01 into a variable, `dataset`
var dataset = fs.readFileSync('/home/ec2-user/environment/week01/data/m03.txt');

// Load `dataset` into a cheerio object
var $ = cheerio.load(dataset);

// Write the project titles to a text file
var dataManhattan = '';

// Select tag and use attribute to narrow down the requested data
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
        dataManhattan += ($(elem).text()).trim() + '\n';
    }
    
// Remove all unnecessary content by tag
    $('b, div, span').remove();
});

fs.writeFileSync('/home/ec2-user/environment/week02/data/data-m03.txt', dataManhattan);
