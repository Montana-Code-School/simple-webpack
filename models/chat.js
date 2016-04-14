var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  message: {type: String},
});


module.exports = mongoose.model('Chat', ChatSchema);