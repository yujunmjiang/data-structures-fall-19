// Yujun Jiang
// Data Structure Weekly Assignment 02
// Using Node.js, read the assigned AA text file and store the contents of the file in a variable

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `dataset`
// this is the file that we created in the starter code from last week
var data = fs.readFileSync('/home/ec2-user/environment/week01/data/m03.txt');

// load `data` into a cheerio object
var $ = cheerio.load(data);

// print (to the console) required data
$('td').each(function(i, address) {
    console.log($(address).text());
});

// write the project titles to a text file
var dataManhattan = '';

$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
        dataManhattan += ($(elem).text()).trim() + '\n';
    }
    
// remove all unnecessary content by tag
    $('b, div, span').remove();
});

fs.writeFileSync('/home/ec2-user/environment/week02/data/data-m03.txt', dataManhattan);
