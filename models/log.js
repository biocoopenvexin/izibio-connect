// LOG: Journal des événements de la base
// Un seul document par collection, dont la date est MàJ au fur et à mesure

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = new Schema(
  {
    DATE_LOG: {type: Date, default: Date.now, required: true},
    TYPE_LOG: {type: String},
  	EVT_LOG: {type: String},
  }
);

// Virtual for Log's URL
LogSchema
.virtual('url')
.get(function () {
  return '/log/' + this._id;
});

//Export model
module.exports = mongoose.model('Log', LogSchema);
