// Setup empty JS array to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
  console.log(`server running on localhost: ${port}`);
};

// Creating GET route
app.get('/data', (req, res)=> {
  res.send(projectData);
});

// Creating POST route
app.post('/addData', (req, res)=> {
  let d = new Date();
  let n = d.getTime().toString();
  newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    comment: req.body.comment
  };
  projectData[n] = newEntry;
});
