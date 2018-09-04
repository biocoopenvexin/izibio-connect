// PROHIJO : historique des modifications des fiches produits / par jour
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProHiJoSchema = new Schema(
  {
    ID: {type: Number},
  	CODARC_PR: {type: String},
  	DATVEN_PR: {type: Date},
  	CODE_PR: {type: Number}, // produit/CODE_PR
  	PRIXA_PR: {type: Number},
  	PRIXV1_PR: {type: Number},
  	QVENTJ_PR: {type: Number},
  	TVENTJ_PR: {type: Number},
  	QPERDJ_PR: {type: Number},
  	QACHAJ_PR: {type: Number},
  	STOCK1_PR: {type: Number},
  	STOCK_PR: {type: Number},
  	ETAT_HJ: {type: String},
  	CAHTJ_PR: {type: Number},
  },
  {
    toJSON: { virtuals: true }
  }
);

// Populate virtuals
ProduitSchema.virtual('produit', {
  ref: 'Produit',
  localField: 'CODE_PR',
  foreignField: 'CODE_PR',
  justOne: true
});

// Virtual for ProHiJo's URL
ProHiJoSchema
.virtual('url')
.get(function () {
  return '/prohijo/' + this._id;
});

//Export model
module.exports = mongoose.model('ProHiJo', ProHiJoSchema);
