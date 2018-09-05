// CLASSE : classes des produits

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClasseSchema = new Schema(
  {
    CLASSE_PR: {type: String},
  	LIBEL_CL: {type: String},
    SYMBOLE_CL: {type: String},
    MENTION_CL: {type: String},
    COULEUR_CL: {type: Number},
  },
  {
    collection: 'classe'
  }
);

// Virtual for Classe's URL
ClasseSchema
.virtual('url')
.get(function () {
  return '/classe/' + this._id;
});

//Export model
module.exports = mongoose.model('Classe', ClasseSchema);
