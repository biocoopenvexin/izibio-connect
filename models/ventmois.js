// VENTMOIS : liste des ventes des 30 derniers jours
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VentMoisSchema = new Schema(
  {
    NUM_CA: {type: String},
  	NUM_VJ: {type: Number},
  	DATE_VJ: {type: Date},
  	HEURE_VJ: {type: String},
  	NOM_VD: {type: String},
  	ID_OP: {type: String}, // ventic/ID_OP
  	ID_CA: {type: String},
  	MONTAHT_VJ: {type: Number},
  	MONTANT_VJ: {type: Number},
  	RECU_VJ: {type: Number},
  	CODPAIE_VJ: {type: String},
  	COMPAIE_VJ: {type: Boolean},
  	REDUCHT_VJ: {type: Number},
  	REMISHT_VJ: {type: Number},
  	MNTBA_VJ: {type: Number},
  	CUMFID_VJ: {type: Number},
  	CODE_AD: {type: Number}, // adherent/CODE_AD
  	TTCTVA1_VJ: {type: Number},
  	TTCTVA2_VJ: {type: Number},
  	TTCTVA3_VJ: {type: Number},
  	TTCTVA4_VJ: {type: Number},
  	CONSIGN_VJ: {type: Number},
  	DEPOVTE_VJ: {type: Number},
  	TROP_VJ: {type: Number},
  	REDA_VJ: {type: Number},
  	REDO_VJ: {type: Number},
  	REDP_VJ: {type: Number},
  	REDQ_VJ: {type: Number},
  	REDR_VJ: {type: Number},
  	REDS_VJ: {type: Number},
  	RMZ0_VJ: {type: Number},
  	RMZ1_VJ: {type: Number},
  	RMZ2_VJ: {type: Number},
  	ETAT_OP: {type: String},
  	MARQUE_AD: {type: String},
  	MESSAG_AD: {type: String},
  	EXCEPT_VJ: {type: Boolean},
  	TOTFID_VJ: {type: Number},
  	RETRO_CO: {type: Boolean},
  	//"CLE_VJ" VARCHAR(8) NULL DEFAULT NULL,
  	DONARR_VJ: {type: Number},
  	DONVOL_TX: {type: String},
  	DONVOL_VJ: {type: Number},
  	ID: {type: Number},
  	MHTTVA1_VJ: {type: Number},
  	MHTTVA2_VJ: {type: Number},
  	MHTTVA3_VJ: {type: Number},
  	MHTTVA4_VJ: {type: Number},
  	DONFID_VJ: {type: Number},
  	VT_ANNULE: {type: Boolean},
  },
  {
    toJSON: { virtuals: true }
  }
);

// Populate virtuals
ProduitSchema.virtual('vente', {
  ref: 'VentIC',
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

// Virtual for VentMois's URL
VentMoisSchema
.virtual('url')
.get(function () {
  return '/ventmois/' + this._id;
});

//Export model
module.exports = mongoose.model('VentMois', VentMoisSchema);
