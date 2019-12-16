# Final Assignments 1: Alcoholic Anonymous Meeting

The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/final_assignment_1.md)

### Assumptions

Some questions from the data to the end-user interface:

1. What information does the end user need? How? Why?  
2. From the data on AA's meeting list, which data is relevant for display in this project? How should it be displayed?  
3. What does a map marker represent? A meeting group? A meeting? A location?  
4. What is the minimum amount of data that can be queried to provide the necessary data for the visual representation?

*Please check my discussion of scalability and storytelling [here](https://github.com/yujunmjiang/data-structures-fall-19/blob/master/final/data-structures-final.pdf)*

### Data Parsing

The ten "Meeting List Agenda" pages for Manhattan are available at:  
```
https://parsons.nyc/aa/m01.html  
https://parsons.nyc/aa/m02.html  
https://parsons.nyc/aa/m03.html  
https://parsons.nyc/aa/m04.html  
https://parsons.nyc/aa/m05.html  
https://parsons.nyc/aa/m06.html  
https://parsons.nyc/aa/m07.html  
https://parsons.nyc/aa/m08.html  
https://parsons.nyc/aa/m09.html  
https://parsons.nyc/aa/m10.html   
```

Select tag `td` and use attribute to narrow down the requested data. Then, remove all the unnecessary content by tag `b`, `div`, and `span`. This step is a preparation before I add latitude and longitude.

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

Before to build the data mode, I rearranged the AA Meeting's data into six categories: building name, location infomation, meeting title, time information, meeting type, and special interest. As the concept to make a design for a particular organization's needs, I was inspired by the idea of denormalized data. The data model should focus on four entities: location, time, meeting, and special interest. The foreign key (FK) gave an access between each table.

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

#### Design Concept

*Please check my map demo [here](http://34.228.80.227:8080/aaVis)*

