// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8000/)
router.use(function(req, res, next) {
  console.log('Something is happening');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/maps/new')

.post(function(req, res) {

  var map = new Map();
  console.log("Reached 38");

  map.name = req.body.name;
  map.description = req.body.description;

  map.save(function(err) {
    if (err)
      res.send(err);

    console.log("Reached 48");
    res.json({ message: 'Map created!' });
  });
});

app.use('/', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var uri = "mongodb://rdhanaraj:mangobunny@cluster0-shard-00-00-dssu2.mongodb.net:27017,cluster0-shard-00-01-dssu2.mongodb.net:27017,cluster0-shard-00-02-dssu2.mongodb.net:27017/guorient?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

var mongoose = require('mongoose');
mongoose.connect(uri, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uri + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uri);
  }
});

var Map = require('./app/models/Map');
