// CAISMOIS : récapitulatif des ventes en fin de journée après clôture quotidienne

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FournisseurSchema = new Schema(
  {
    ID_OP: {type: String},
  	ID_CA: {type: String},
  	NUM_CA: {type: String},
  	DATE_CA: {type: Date},
  	NBVENT_CA: {type: Number},
  	TTCTVA1_CA: {type: Number},
  	TTCTVA2_CA: {type: Number},
  	TTCTVA3_CA: {type: Number},
  	TTCTVA4_CA: {type: Number},
  	TVA1_CA: {type: Number},
  	TVA2_CA: {type: Number},
  	TVA3_CA: {type: Number},
  	TVA4_CA: {type: Number},
  	TXTVA1_CA: {type: Number},
  	TXTVA2_CA: {type: Number},
  	TXTVA3_CA: {type: Number},
  	TXTVA4_CA: {type: Number},
  	CONSIGN_CA: {type: Number},
  	DEPOVTE_CA: {type: Number},
  	TROP_CA: {type: Number},
  	REMISHT_CA: {type: Number},
  	REDA_CA: {type: Number},
  	REDO_CA: {type: Number},
  	REDP_CA: {type: Number},
  	REDQ_CA: {type: Number},
  	REDR_CA: {type: Number},
  	REDS_CA: {type: Number},
  	RMZ0_CA: {type: Number},
  	RMZ1_CA: {type: Number},
  	RMZ2_CA: {type: Number},
  	MNTBA_CA: {type: Number},
  	TOTCRED_CA: {type: Number},
  	MCRED_CA: {type: Number},
  	MESP_CA: {type: Number},
  	MCHEQ_CA: {type: Number},
  	MCART_CA: {type: Number},
  	MDIV_CA: {type: Number},
  	MTIC_CA: {type: Number},
  	SOLDEB_CA: {type: Number},
  	SOLDEBCHQ: {type: Number},
  	SOLDCAR_CA: {type: Number},
  	SOLDDIV_CA: {type: Number},
  	SOLDTIC_CA: {type: Number},
  	ERRESPE_CA: {type: Number},
  	ERRCHEQ_CA: {type: Number},
  	ERRCART_CA: {type: Number},
  	ERRDIV_CA: {type: Number},
  	ERRTIC_CA: {type: Number},
  	RHOVESP_CA: {type: Number},
  	RHOVCHQ_CA: {type: Number},
  	RHOVCAR_CA: {type: Number},
  	RHOVDIV_CA: {type: Number},
  	RHOVTIC_CA: {type: Number},
  	DPNSESP_CA: {type: Number},
  	DPNSCHQ_CA: {type: Number},
  	DPNSCAR_CA: {type: Number},
  	DPNSDIV_CA: {type: Number},
  	DPNSTIC_CA: {type: Number},
  	DEPOTESP: {type: Number},
  	DEPOTCHQ: {type: Number},
  	DEPOTCAR: {type: Number},
  	DEPOTDIV: {type: Number},
  	DEPOTTIC: {type: Number},
  	NSOLDESP: {type: Number},
  	NSOLDCHQ: {type: Number},
  	NSOLDCAR: {type: Number},
  	NSOLDDIV: {type: Number},
  	NSOLDTIC: {type: Number},
  	TMARGE_CA: {type: Number},
  	TPERDU_CA: {type: Number},
  	CMTAIRE_CA: {type: String},
  	DONARR_CA: {type: Number},
  	DONVOL_CA: {type: Number},
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
