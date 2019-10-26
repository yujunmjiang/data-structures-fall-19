The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_07.md)

#### Request Data 

Use variable `urls` to request all the data from 10 AA meeting URLs, and define a constant reference to a value and change the properties of constant objects.

```javascript
const linkPath = '/home/ec2-user/environment/week07/data/';
const fns = ['m01.txt', 'm02.txt', 'm03.txt', 'm04.txt', 'm05.txt', 'm06.txt', 'm07.txt', 'm08.txt', 'm09.txt', 'm10.txt'];
```

#### Parse Data

Use `for loop` to add 10 AA meeting text files a file array.

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
