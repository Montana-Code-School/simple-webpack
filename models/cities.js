var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: {type: String, unique: true},
  key: {type: String, unique: true},
});

module.exports = mongoose.model('City', CitySchema);