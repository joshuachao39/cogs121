// server.js

var MAP_EVENT = 'MAP_EVENT';

var mapsData = [];

var mapsInventory = [
{
  id: 0, // Should reflect index of array
  type: MAP_EVENT,
  name: 'SD Hacks',
  description: 'UC San Diegos premier hackathon',
  coords: {
    //Denotes the coordinates to center the map on
      lat: 32.885231,
      lng: -117.239119,
  },
  // Denotes default amount to zoom the map at
  defaultZoom: 0.2,
  boundary: {
    // Boundary is a list of points enclosing the polygon
    // Contains a list of latitudes and longitudes
    points: [
    { lat: 32.885772, lng: -117.238754 },
    { lat: 32.885673, lng: -117.239827 },
    { lat: 32.885456, lng: -117.239741 },
    { lat: 32.885456, lng: -117.240170 },
    { lat: 32.884969, lng: -117.240202 },
    { lat: 32.884924, lng: -117.238722 },
    ],
  },
  points: [
    // Points specify points of interest
  {
    name: 'Help Table',
    boundary: {
      points: [
      { lat: 32.885346, lng: -117.239229 },
      { lat: 32.885253, lng: -117.239248 },
      { lat: 32.885221, lng: -117.239074 },
      { lat: 32.885351, lng: -117.239099 },
      ],
    },
  },
  {
    name: 'Main Event',
    boundary: {
      points: [
      { lat: 32.885415, lng: -117.240061 },
      { lat: 32.885007, lng: -117.240058 },
      { lat: 32.885000, lng: -117.239660 },
      { lat: 32.885157, lng: -117.239666 },
      { lat: 32.885159, lng: -117.239832 },
      { lat: 32.885427, lng: -117.239844 },
      ],
    },
  },
  ],
},

{
  id: 1, // Should reflect index of array
  type: MAP_EVENT,
  name: 'LA Hacks',
  description: 'was once a somewhat hype hackathon, but is now shadowed by the more popular SD Hacks',
  coords: {
    // Denotes the coordinates to center the map on
    lat: 34.068921,
    lng: -118.4473698,
  },
  // Denotes default amount to zoom the map at
  defaultZoom: 0.3,
  boundary: {
    // Boundary is a list of points enclosing the polygon
    // Contains a list of latitudes and lnggitudes
    points: [
    { lat: 34.070029, lng: -118.4482479 },
    { lat: 34.070047, lng: -118.4473143 },
    { lat: 34.070762, lng: -118.4473193 },
    { lat: 34.070758, lng: -118.4485153 },
    ],
  },
  points: [
    // Points specify points of interest
  {
    name: 'Help Table',
    boundary: [
    ],
  },
  ],
},
];

mapsData.push(mapsInventory[0], mapsInventory[1]);

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
