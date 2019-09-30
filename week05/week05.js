// Yujun Jiang
// Data Structure Weekly Assignment 05

// AWS DynamoDB setup
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

var async = require('async');

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

// Push data into blog entry
blogEntries.push(new BlogEntry(0, 'January 4 2019', "Action", "Escape Room", "PG-13", "7.5", true, ["Diet Coke"]));
blogEntries.push(new BlogEntry(1, 'January 18 2019', "Drama", "Glass", "PG-13", "6.7", true, [""]));
blogEntries.push(new BlogEntry(2, 'February 22 2019', "Animation", "How to Train Your Dragon: The Hidden World", "PG", "6.3", true, ["Diet Coke"]));

console.log(blogEntries);

// Use 'for' loop to push all the data into blog entry
var params = {};
var i = 0;
for (i = 0; i < blogEntries.length; i++) {
  params.Item += blogEntries[i];
}
params.TableName = "process-blog";

async.eachSeries(blogEntries, function(movie, callback) {
  params.Item = movie;
  dynamodb.putItem(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
  setTimeout(callback, 2000);
});