## Weekly Assignment 01

The starter code provided by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_01.md)

```javascript
// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/thesis-2019/', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', body);
    }
    else {console.log("Request failed!")}
});
```

## Solution

Make a request for each of the ten "Meeting List Agenda" pages for Manhattan.

```javascript
var request = require('request');
var fs = require('fs');
```

Ten requested pages for Manhattan.

```javascript
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
```

Define a constant reference to a value and change the properties of constant objects.

```javascript
const linkPath = '/home/ec2-user/environment/week01/data/';
const fns = ['m01.txt', 'm02.txt', 'm03.txt', 'm04.txt', 'm05.txt', 'm06.txt', 'm07.txt', 'm08.txt', 'm09.txt', 'm10.txt'];
```

Use `i` as the variable for the `for` loop to iterate through.

```javascript
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
```
