// MVTSTOCK : journal des mouvements de stocks
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MvtStockSchema = new Schema(
  {
    ID: {type: Number},
  	CODE_PR: {type: Number},
  	DATE_MVT: {type: Date},
  	POSTE_MVT: {type: String},
  	USER_MVT: {type: String},
  	TYPE_MVT: {type: String},
  	VALEUR_MVT: {type: Number},
  	STOCK_AVANT: {type: Number},
  	STOCK_APRES: {type: Number},
  	ID_OP: {type: String},
  	//ANNULATION BIT NULL: {type: Boolean},
  },
  {
    collection: 'mvtstock'
  },
  {
    toJSON: { virtuals: true }
  }
);

// Populate virtuals
MvtStockSchema.virtual('produit', {
  ref: 'Produit',
  localField: 'CODE_PR',
  foreignField: 'CODE_PR',
  justOne: true
});

// Virtual for MvtStock's URL
MvtStockSchema
.virtual('url')
.get(function () {
  return '/mvtstock/' + this._id;
});

//Export model
module.exports = mongoose.model('MvtStock', MvtStockSchema);
