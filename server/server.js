// server.js

var mapsData = [];

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
app.use('Access-Control-Allow-Origin','*');

var port = process.env.PORT || 8000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8000/)
router.use(function(req, res, next) {
  console.log('Something is happening');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/maps')

  .get(function(req, res) {
    res.json(mapsData);
  });

router.route('/maps/:map_id')
  .get(function(req, res) {
    res.json(mapsData[req.params.map_id]);
  })

  .delete(function(req, res) {
    mapsData.splice(Number(req.params.map_id), 1);
    res.json({ message: 'entry deleted' });   
  });

app.use('/', router);


router.route('/maps/new')
  .post(function(req, res) {
    console.log(req.body);
    mapsData.push(req.body);
    console.log(mapsData);
    res.send('wooo');
  });

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
