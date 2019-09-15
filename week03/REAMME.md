## Weekly Assignment 02

The starter code provided by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_02.md)

```javascript
// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/thesis.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
$('h3').each(function(i, elem) {
    console.log($(elem).text());
});

// write the project titles to a text file
var thesisTitles = ''; // this variable will hold the lines of text

$('.project .title').each(function(i, elem) {
    thesisTitles += ($(elem).text()).trim() + '\n';
});

fs.writeFileSync('data/thesisTitles.txt', thesisTitles);
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
```
