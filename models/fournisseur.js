// FOURNISSEUR : liste des fournisseurs 

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FournisseurSchema = new Schema(
  {
    CODE_FO: {type: Number, required: true},
  	NOM_FO: {type: String},
  	RUE_FO: {type: String},
  	RUE2_FO: {type: String},
  	CPOST_FO: {type: String},
  	VILLE_FO: {type: String},
  	TEL_FO: {type: String},
  	FAX_FO: {type: String},
  	MEL_FO: {type: String},
  	CONTACT_FO: {type: String},
  	CLASSE_FO: {type: String},
  	FRANCO_FO: {type: Number},
  	FRANCOP_FO: {type: Number},
  	FRPOIDS_FO: {type: Boolean},
  	PORT_FO: {type: Number},
  	DISTAN_FO: {type: Number},
  	PRODUIT_FO: {type: String},
  	NUMCLI_FO: {type: String},
  	COLIS_FO: {type: Boolean},
  	ORIBAR_FO: {type: Boolean},
  	CALINDI_FO: {type: Boolean},
  	CALBJP_FO: {type: Boolean},
  	COMMEN1_FO: {type: String},
  	COMMEN2_FO: {type: String},
  	CORRESP_FO: {type: String},
  	MARQUE_FO: {type: String},
  	MODELBC_FO: {type: String},
  	FICBAL_FO: {type: String},
  	PPNBL_FO: {type: Number},
  	RMPLBL_FO: {type: Number},
  	MELBC_FO: {type: String},
  	DATMOD_FO: {type: Date},
  	DELIVR_FO: {type: Number},
  	DURLIVR_FO: {type: Number},
  	DATLIV_FO: {type: Date},
  	EXP_BLOCKED: {type: Boolean},
  	SYNC_DATE: {type: Date},
  	SYNC_FROM: {type: Number},
  	SYNC_BLOCKED: {type: Boolean},
  	MODIF_DATE: {type: Date, default: Date.now, required: true},
  	MODIF_BY: {type: String},
  	CREAT_DATE: {type: Date, default: Date.now, required: true},
  	CREAT_BY: {type: String},
  }
);

// Virtual for Fournisseur's URL
FournisseurSchema
.virtual('url')
.get(function () {
  return '/fournisseur/' + this._id;
});

//Export model
module.exports = mongoose.model('Fournisseur', FournisseurSchema);
