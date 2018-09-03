// UPDATE : traçage des mises à jour depuis MSSQL.
// Un seul document par collection, dont la date est MàJ au fur et à mesure

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UpdateSchema = new Schema(
  {
    DATE_UP: {type: Date},
  	BASE_UP: {type: String},
  }
);

// Virtual for Update's URL
UpdateSchema
.virtual('url')
.get(function () {
  return '/update/' + this._id;
});

//Export model
module.exports = mongoose.model('Update', UpdateSchema);
