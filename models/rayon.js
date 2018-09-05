// RAYON : liste des rayons du magasin

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RayonSchema = new Schema(
  {
    RAYON_PR: {type: String},
  	LIBEL_RA: {type: String},
  },
  {
    collection: 'rayon'
  }
);

// Virtual for Rayon's URL
RayonSchema
.virtual('url')
.get(function () {
  return '/rayon/' + this._id;
});

//Export model
module.exports = mongoose.model('Rayon', RayonSchema);
