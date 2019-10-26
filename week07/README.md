The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_07.md)

#### Request Data 

Use variable `urls` to request all the data from 10 AA meeting URLs, and define a constant reference to a value and change the properties of constant objects.

```javascript
const linkPath = '/home/ec2-user/environment/week07/data/';
const fns = ['m01.txt', 'm02.txt', 'm03.txt', 'm04.txt', 'm05.txt', 'm06.txt', 'm07.txt', 'm08.txt', 'm09.txt', 'm10.txt'];
```

#### Parse Data

Use `for` loop to add 10 AA meeting text files to file array.

```javascript
var file = [];
for (var i = 1; i < 11; i++) {
    if (i < 10) {
        file.push('/home/ec2-user/environment/week07/data/m0' + i + '.txt');
    }
    else {
        file.push('/home/ec2-user/environment/week07/data/m' + i + '.txt');
    }
}
```

Format the file array by the following structure.

```javascript
[{zone: 1, groups:[]}, {zone: 2, groups:[]}, ... {zone: 10, groups:[]}]
```

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week07/image/sample-1.png" width="50%"/>

#### Request Geocodes

Create `.env` file to hide TAMU api key.

```javascript
dotenv.config();
const apiKey = process.env.TAMU_KEY;
```

Make a request to the [Texas A&M Geoservices Geocoding APIs](https://geoservices.tamu.edu/) for each address.
 
```javascript
async.eachSeries(thisZoneAddresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
        apiRequest += 'streetAddress=' + value.split(' ').join('%20');
        apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
        apiRequest += '&format=json&version=4.01';

    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        else {
            var tamuGeo = JSON.parse(body);
            thisZoneGeocodes.push(tamuGeo);
        }
```

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week07/image/sample-2.png" width="50%"/>

#### Merge Data

Use `for` loop to merge all the addresses and geocodes into new JSON files. 

```javascript
for(var i = 0; i < addressesAllZone.length; i++) {
    var thisZoneData = addressesAllZone[i];
    var thisZoneGroups = thisZoneData.groups;
    for(var j = 0; j < thisZoneGroups.length; j++) {
        thisZoneGroups[j].lat = geocodesAllZone[i][j].OutputGeocodes[0].OutputGeocode.Latitude;
        thisZoneGroups[j].lng = geocodesAllZone[i][j].OutputGeocodes[0].OutputGeocode.Longitude;
    }
```

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week07/image/sample-3.png" width="50%"/>

#### Create Table

Use SQL statement to create a table called `meeting` with headers such us meeting_id, group_id, zone_id, address, zip, latitude, longitude, etc.

#### Insert Data
