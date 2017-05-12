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
      res.json({message: 'Map created!' });
    });
  });

router.route('/maps')

  .get(function(req, res) {

    Map.find(function(err, maps) {
      if (err)
        res.send(err);

      res.json(maps);
    });
  });


app.use('/', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose = require('mongoose');
mongoose.connect('mongodb://<rdhanaraj>:<[lab]50Fiefs>@ds137801.mlab.com:37801/guorient');

var Map = require('./app/models/Map');
