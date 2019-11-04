## Weekly Assignment 09

The instruction provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_09)

#### Setup

Decide how I will structure data from temperature sensor into PostgreSQL database and define a data model/schema for my table(s). Create the appropriate table(s), in the same way I did in [weekly assignment 04](https://github.com/yujunmjiang/data-structures-fall-19/tree/master/week04).

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week09/image/sample-1.png" width="50%"/>

To run my script in the background, I will be using [PM2 Runtime](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/), which is a process manager for Node.js. To install it, run:  
`npm install pm2 -g`

Then, initialize a configuration file with:  
`pm2 init`

The initialization creates a configuration file to specify the details of the ecosystem for my script (such as script name and environment variables). The default configuration file is named `ecosystem.config.js` and it will look like [this](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_09/ecosystem.config.js). 

#### app.js

Add Photon details to the `.env` file.

```javascript
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'tempsensor';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;
```

Instead of running the file with the usual `node app.js`, I will use PM2 to begin running it in the background:  
`pm2 start ecosystem.config.js`

Check its status with:  
`pm2 list`

Stop it with:  
`pm2 stop 0`

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week09/image/sample-2.png" width="50%"/>

#### Check my work

To check on my database periodically to ensure that sensor values are recording as expected, use [`tempData.js`](https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week09/tempData.js).

<img src="https://github.com/yujunmjiang/data-structures-fall-19/blob/master/week09/image/sample-3.png" width="50%"/>
