# Final Assignments 2: Movie Watch History

The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/final_assignment_2.md)

### Assumptions

Some decisions that will help with this drawing:

1. Will you use a [Normalized Data Model or a Denormalized Data Model](https://www.quora.com/What-is-normalized-vs-denormalized-data)? Why?  
2. When the data comes back out of the database, how should it be structured? Why?  
3. How would I describe the hierarchy of the data?  

### Data Parsing

In Part Three of this assignment, I will be using [`putItem`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property) in the [AWS SDK for JavaScript in Node.js](https://aws.amazon.com/sdk-for-node-js/). Reference the [DynamoDB class](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) for information about the [PutItem method](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property) and data types. The documentation shows how the items should be mapped and how to specify data types. In preparation for Part Three, the following starter code creates several "Items" destined for DynamoDB (adhering to the expected Item attributes and values), storing them in an array named `blogEntries`: 
```javascript
var blogEntries = [];

class BlogEntry {
  constructor(date, category, title, rating, imdb, watched, ate) {
    // this.pk = {};
    // this.pk.N = primaryKey.toString();
    this.category = {}; // Partition key
    this.category.S = category;
    this.date = {}; // Sort key
    this.date.S = new Date(date).toISOString();
    this.type = {};
    this.type.S = type; 
    this.title = {};
    this.title.S = title;
    this.rating = {};
    this.rating.S = rating;
    this.imdb = {};
    this.imdb.S = imdb;
    this.watched = {};
    this.watched.BOOL = watched;
    if (ate != null) {
      this.ate = {};
      this.ate.SS = ate;
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}
```

This dataset is about all the movies that have been released in 2019 and my personal watching history. I choose the release date as `partition key` and movie category as `sort key`. The dataset also include movie title, rating, IMDb score, and two related questions (e.g. Did I watch this movie? / What did I eat in the theatre?)

```javascript
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
        dataManhattan += ($(elem).text()).trim() + '\n';
    }
    $('b, div, span').remove();
});
```

Make a request to the [Texas A&M Geoservices Geocoding APIs](https://geoservices.tamu.edu/) for each address and create `.env` file to hide TAMU api key. Add all elements to the end of an array called `addresses`, use `eachSeries` in the async module iterates over an array and operates on each item in the array in series.

```javascript
dotenv.config();
const apiKey = process.env.TAMU_KEY;
```

Before to build the data mode, I rearranged the AA meeting's data into six categories: building name, location infomation, meeting title, time information, meeting type, and special interest. As the concept to make a design for a particular organization's needs, I was inspired by the idea of denormalized data. The data model should focus on four entities: location, time, meeting, and special interest. The foreign key (FK) gave an access between each table.

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week04/data-model.png" width="50%"/>

Use the [`pg` module](https://node-postgres.com/) in Node to insert my AA data in the database I created. Modify the starter code to replace the database credentials with my own. It includes three SQL queries that I can modify to accomplish the following tasks in my new database, with the help of the `pg` module in Node. Base on the data model in [weekly assignment 04](https://github.com/yujunmjiang/data-structures-fall-19/tree/master/week04), I used SQL statement to query address and Geocode from AA dataset.

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week06/sample-1.png" width="50%"/>

I have rewrote my query for AA data and used latitude, longitude, and zip code to group the data points.

```javascript
  var thisQuery = `SELECT lat, lng, zip, json_agg(json_build_object('loc', location_name, 'add', address, 'zip', zip, 'lat', lat, 'lng', lng)) as location, json_agg(json_build_object('day', day, 'begin', time_begin, 'end', time_end)) as schedule 
                   FROM meeting     
                   GROUP BY lat, lng, zip;`;
```

*Please check my parsed data [here](http://34.228.80.227:8080/aaData)*

#### Visual Design

For the visualization of AA meeting, I use [Mapbox](https://www.mapbox.com/) and [Leaflet.js](https://leafletjs.com/) to build an interactive map with a filter of the zip code base on ten areas that have neen defined by [New York State Department of Health](https://www.health.ny.gov/statistics/cancer/registry/appendix/neighborhoods.htm) in Manhattan.

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/final/image/demo-01.png" width="50%"/>

*Please check my map demo [here](http://34.228.80.227:8080/aaVis)*

