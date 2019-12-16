# Final Assignments 3: Temperature Sensor

The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/final_assignment_3.md)

### Data Collection

- Complete steps 1 and 2A in the Particle [Getting Started Guide](https://docs.particle.io/guide/getting-started/start/photon/).  
- Log into [the Console](https://console.particle.io/) and verify that my device is listed.   
- Log into [the Web IDE](https://build.particle.io/) and go through the 'Blink an LED' example app.  
- In the Web IDE under 'Settings,' retrieve and make note of my *Access Token*.  
- Set up my sensor. It should look like this: 

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week08/image/sample-1.png" width="50%"/>

### app.js

Add Photon details to the `.env` file.

```javascript
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'tempsensor';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;
```

To check on my database periodically to ensure that sensor values are recording as expected, use [`tempData.js`](https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week09/tempData.js).

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week09/image/sample-3.png" width="50%"/>

*Please check my parsed data [here](http://34.228.80.227:8080/tsData)*

#### Visual Design

For the visualization of my movie watch history blog, I kept some important information such us movie title, type, rating, and IMDb score. I will continue to work on the rest of part includes movie poster, description, and review to give people a reference to select a movie that they want to watch during the holiday season.

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/final/image/demo-03.png" width="50%"/>

*Please check my map demo [here](http://34.228.80.227:8080/tsVis)*


