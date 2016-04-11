var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  locationKey: {type: String, unique: true},
  wheat: Array,
  barley: Array,
  cty: {type: String, unique: true},
  twp: {type: String, index: true, unique: true, sparse: true},
  rge: {type: String, unique: true},
  firstKey: { type: String, index: true },
});



module.exports = mongoose.model('Location', LocationSchema);