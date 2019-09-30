## Weekly Assignment 05

The start code provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_05.md)

```javascript
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {};
params.Item = blogEntries[0]; 
params.TableName = "processblog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
```

## Solution
**Part One: Plan**

This dataset is about all the movies that have been released in 2019 and my personal watching history. I choose the release date as `partition key` and movie category as `sort key`. The dataset also include movie title, rating, IMDb score, and two related questions (e.g. Did I watch this movie? / What did I eat in the theatre?)

![illustrative images](./data-model.png)

**Part Two: Create a table(s) in the database**

The following code creates several "Items" destined for DynamoDB (adhering to the expected Item attributes and values), storing them in an array named `blogEntries`.

```javascript
// Define blog entry
var blogEntries = [];

// Create categories for blog entry
class BlogEntry {
  constructor(primaryKey, date, category, title, rating, imdb, watched, ate) {
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.date = {}; // Partition key
    this.date.S = new Date(date).toDateString();
    this.category = {}; // Sort key
    this.category.S = category;
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

Base on the `blogEntries` array that I have created in the previous step, the AWS SDK to put the first Item into the DynamoDB table. 
