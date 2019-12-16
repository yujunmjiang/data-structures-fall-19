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

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week05/data-model.png" width="50%"/>

*Please check my parsed data [here](http://34.228.80.227:8080/whVis)*

#### Visual Design

For the visualization of AA meeting, I use [Mapbox](https://www.mapbox.com/) and [Leaflet.js](https://leafletjs.com/) to build an interactive map with a filter of the zip code base on ten areas that have neen defined by [New York State Department of Health](https://www.health.ny.gov/statistics/cancer/registry/appendix/neighborhoods.htm) in Manhattan.

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/final/image/demo-01.png" width="50%"/>

*Please check my map demo [here](http://34.228.80.227:8080/aaVis)*

