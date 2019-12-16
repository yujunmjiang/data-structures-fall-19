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

Select tag `td` and use attribute to narrow down the requested data and Remove all unnecessary content by tag `b`, `div`, and `span`.

```javascript
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
        dataManhattan += ($(elem).text()).trim() + '\n';
    }
    $('b, div, span').remove();
});
```

#### AA Meeting Map

*Please check my map demo [here](http://34.228.80.227:8080/aaVis)*

