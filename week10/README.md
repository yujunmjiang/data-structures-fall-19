## Weekly Assignment 10

The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_10)

#### Index

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

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week10/img/sample-1.png">
