// VENTEDT : détail des ventes du jour (après consolidation)
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VenteDTSchema = new Schema(
  {
    DATE_VJ: {type: Date},
  	NUM_CA: {type: String},
  	NUM_VJ: {type: Number},
  	ID_OP: {type: String}, // vente/ID_OP
  	ETAT_OP: {type: String},
  	CODE_AD: {type: Number}, // adherent/CODE_AD
  	RETRO_CO: {type: Boolean},
  	CODE_LP: {type: Number}, // produit/CODE_PR
  	LIBEL_LP: {type: String}, // produit/LIBEL_PR
  	BA_LP: {type: Boolean},
  	CTVA_LP: {type: Number},
  	QUANT_LP: {type: Number},
  	MONTANT_LP: {type: Number},
  	TMARGE_LP: {type: Number},
  	TREMISE_LP: {type: Number},
  	BRUT_LP: {type: Number},
  	//DATE_FA: {type: Date},
  	//NUM_FA: {type: Number},
  	//SELECT_LP: {type: String},
  	//ORIGN: {type: String},
  	//CLE_LP: {type: String},
  	ID: {type: Number},
  	//HEURE_VJ: {type: String},
  	//FAMILLE_PR VARCHAR(6) NULL DEFAULT NULL,
  	//SOUFAMI_PR VARCHAR(6) NULL DEFAULT NULL,
  	//RAYON_LP VARCHAR(6) NULL DEFAULT NULL,
  	//BJP_PR BIT NOT NULL DEFAULT ((0)),
  	INDISP_PR: {type: Boolean},
  	FIDELI_PR: {type: Number},
  	CONDI_PR: {type: Number},
  	PRIXA_LP: {type: Number},
  	PRIXV1_LP: {type: Number},
  	PRIXV2_LP: {type: Number},
  	NONRED_PR: {type: Boolean},
  	NONRMZ_PR: {type: Boolean},
  	PRIX_LP: {type: Number},
  	MARGE_LP: {type: Number},
  	REDUC_LP: {type: Number},
  	REDUCA_PR: {type: Number},
  	PMAN_LP: {type: Boolean},
  	CCONDIT_LP: {type: String},
  	DISCNB_PR: {type: Number},
  	EMBLEM_PR: {type: Boolean},
  	DISCRED_PR: {type: Number},
  	CODARC_PR: {type: String},
  	TXTVA_LP: {type: Number},
  	MONTAHT_LP: {type: Number},
  	FIDELI_LP: {type: Number},
  	//BJPSEL_PR BIT NOT NULL DEFAULT ((0)),
  	//LOCAL_PR BIT NOT NULL DEFAULT ((0)),
  	//ENSEMBL_PR BIT NOT NULL DEFAULT ((0)),
  	//FOURNI_PR INT(10,0) NULL DEFAULT NULL,
  	PV2DEB_PR: {type: Date},
  	PV2FIN_PR: {type: Date},
  	OPE_BONUS: {type: Number},
  	OPEPTS_LP: {type: Number},
  	OPECOM_ID: {type: String},
  	ID_LP: {type: Number},
  	DISC_LP: {type: Boolean},
  	CREDUC_LP: {type: String},
  	BA_CADEAU: {type: Boolean},
  },
  {
    toJSON: { virtuals: true }
  }
);

// Populate virtuals
ProduitSchema.virtual('vente', {
  ref: 'Vente',
  localField: 'ID_OP',
  foreignField: 'ID_OP',
  justOne: true
});
ProduitSchema.virtual('adherent', {
  ref: 'Adherent',
  localField: 'CODE_AD',
  foreignField: 'CODE_AD',
  justOne: true
});
ProduitSchema.virtual('produit', {
  ref: 'Produit',
  localField: 'CODE_LP',
  foreignField: 'CODE_PR',
  justOne: true
});

// Virtual for VenteDT's URL
VenteDTSchema
.virtual('url')
.get(function () {
  return '/ventedt/' + this._id;
});

//Export model
module.exports = mongoose.model('VenteDT', VenteDTSchema);
