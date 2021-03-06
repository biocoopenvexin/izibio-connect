// PROHIJO : historique des modifications des fiches produits / par mois
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProHiMoSchema = new Schema(
  {
    MOIS_HM: {type: String},
  	CODARC_PR: {type: String},
  	CODE_PR: {type: Number}, // produit/CODE_PR
  	FAMILLE_PR: {type: String}, // famille/FAMILLE_PR
  	SOUFAMI_PR: {type: String}, // famille/SOUFAMI_PR
  	QACHAT_PR: {type: Number},
  	QVENDU_PR: {type: Number},
  	QPERDU_PR: {type: Number},
  	TACHAT_PR: {type: Number},
  	CAHT_PR: {type: Number},
  	TMARGE_PR: {type: Number},
  	TPERDU_PR: {type: Number},
  },
  {
    collection: 'prohimo'
  },
  {
    toJSON: { virtuals: true }
  }
);

// Populate virtuals
ProHiMoSchema.virtual('produit', {
  ref: 'Produit',
  localField: 'CODE_PR',
  foreignField: 'CODE_PR',
  justOne: true
});
ProHiMoSchema.virtual('famille', {
  ref: 'Famille',
  localField: 'FAMILLE_PR',
  foreignField: 'FAMILLE_PR',
  justOne: true
});
ProHiMoSchema.virtual('sous_famille', {
  ref: 'Famille',
  localField: 'SOUFAMI_PR',
  foreignField: 'SOUFAMI_PR',
  justOne: true
});

// Virtual for ProHiMo's URL
ProHiMoSchema
.virtual('url')
.get(function () {
  return '/prohimo/' + this._id;
});

//Export model
module.exports = mongoose.model('ProHiMo', ProHiMoSchema);
