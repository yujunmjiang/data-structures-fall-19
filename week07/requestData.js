// Yujun Jiang
// Data Structure Weekly Assignment 07 (request data)
// Make a request for each of the ten "Meeting List Agenda" pages for Manhattan

var request = require('request');
var fs = require('fs');

var urls = [
    'https://parsons.nyc/aa/m01.html', 
    'https://parsons.nyc/aa/m02.html', 
    'https://parsons.nyc/aa/m03.html',
    'https://parsons.nyc/aa/m04.html',
    'https://parsons.nyc/aa/m05.html', 
    'https://parsons.nyc/aa/m06.html',
    'https://parsons.nyc/aa/m07.html',
    'https://parsons.nyc/aa/m08.html',
    'https://parsons.nyc/aa/m09.html',
    'https://parsons.nyc/aa/m10.html'
];

// defines a constant reference to a value and change the properties of constant objects
const linkPath = '/home/ec2-user/environment/week07/data/';
const fns = ['m01.txt', 'm02.txt', 'm03.txt', 'm04.txt', 'm05.txt', 'm06.txt', 'm07.txt', 'm08.txt', 'm09.txt', 'm10.txt'];

// use 'i' as the variable for the 'for' loop to iterate through
for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    let writePath = linkPath + fns[i];
    request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                fs.writeFileSync(writePath, body);
                console.log(writePath + 'link corrected'); 
            } else { console.log("Request failed!") }
    });
}