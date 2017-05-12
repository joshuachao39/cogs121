// app/models/map.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MapSchema   = new Schema({
  id: Schema.ObjectId,
  name: String,
  description: String
});

module.exports = mongoose.model('Map', MapSchema);
