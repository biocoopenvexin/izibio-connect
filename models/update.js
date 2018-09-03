// UPDATE : traçage des mises à jour depuis MSSQL

var mongoose = require('mongoose');

// Modèle qui retrace toutes les mises à jour des différentes collections. Un seul document par collection, qui est MàJ au fur et à mesure

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
  return '/updates/' + this._id;
});

//Export model
module.exports = mongoose.model('Update', UpdateSchema);
