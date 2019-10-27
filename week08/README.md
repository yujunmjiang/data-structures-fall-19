## Weekly Assignment 08

The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_08.md)

#### Setup

- Complete steps 1 and 2A in the Particle [Getting Started Guide](https://docs.particle.io/guide/getting-started/start/photon/).  
- Log into [the Console](https://console.particle.io/) and verify that my device is listed.   
- Log into [the Web IDE](https://build.particle.io/) and go through the 'Blink an LED' example app.  
- In the Web IDE under 'Settings,' retrieve and make note of my *Access Token*.  
- Set up my sensor. It should look like this: 

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week08/image/sample-1.png" width="50%"/>

#### Part One

- Set up my temperature sensor (or other sensor(s) for different kinf of data) and make connections to the Photon.
- In the [Web IDE](https://build.particle.io), copy and modify the [starter code](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_08) for my sensor. IMPORTANT: must include all three starter code files in the Web IDE project for this micro controller.   
- In the Web IDE, set up a **single variable** that will be accessible with [Particle Cloud API](https://docs.particle.io/reference/api/). [NOTE: If working with multiple sensors, the variable must return a string of valid JSON [[tutorial here](https://community.particle.io/t/using-spark-publish-with-simple-json-data/3469)] that includes the values of my sensors.]
