## Weekly Assignment 10

The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_10)

#### Index Page

On the index page, I created three links by HTML5 that can navigate visitors to each project.

```javascript
app.get('/', function(req, res) {
    res.send(`<h1>Data Structures Apps</h1>
            <ul><li><a href="/aa.html">Alcoholic Anonymous Meeting</a></li></ul>
            <ul><li><a href="/wh.html">Movie Watch History</a></li></ul>
            <ul><li><a href="/ts.html">Temperature Sensor</a></li></ul>`);
});
```

After I ran my index page on AWS Could9, here is an example:

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week10/image/sample-1.png" width="50%"/>

#### Project Pages

One the project page (e.g. temperature sensor data), visitos can check both queried and visualized data by two different links.

```javascript
app.get('/ts.html', function(req, res) {
    res.send(`<h1>Temperature Sensor</h1>
            <ul><li><a href="/ts/ts-data.html">Data</a></li></ul>
            <ul><li><a href="/ts/ts-visualization.html">Visualization</a></li></ul>
            <ul><li><a href="/">Back</a></li></ul>`);
});

app.get('/ts/ts-data.html', function(req, res) {
    var db_credentials = new Object();
    db_credentials.user = 'yujunmjiang';
    db_credentials.host = process.env.AWSRDS_EP;
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;

    var client = new Client(db_credentials);
    client.connect();

    var tsoutput = [];

    // Sample SQL statement to query the entire contents of a table:
    var thisQuery = "SELECT * FROM sensorData;"; // print all values
    // var secondQuery = "SELECT COUNT (*) FROM sensorData;"; // print the number of rows
    // var thirdQuery = "SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;";

    client.query(thisQuery, (err, response) => {
        var output = response.rows;
        tsoutput.push(output);
        console.log(err);
        var dataHtml = '' + '<ul><li><a href="/aa.html">Back</a></li></ul>';
        for (var i = 0; i < tsoutput[0].length; i++) {
            dataHtml += "<p>" + JSON.stringify(tsoutput[0][i]) + "</p>";
        }
        res.send(dataHtml);
        client.end();
    });

});
```
