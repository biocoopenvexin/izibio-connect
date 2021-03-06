// VENTE : ventes du jour (après consolidation)
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VenteSchema = new Schema(
  {
    NUM_CA: {type: String},
  	NUM_VJ: {type: Number},
  	DATE_VJ: {type: Date},
  	HEURE_VJ: {type: String},
  	NOM_VD: {type: String},
  	ID_OP: {type: String}, // clé ?
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
  	CLE_VJ: {type: String},
  	DONARR_VJ: {type: Number},
  	DONVOL_TX: {type: String},
  	DONVOL_VJ: {type: Number},
  	ID: {type: Number}, // clé ?
  	MHTTVA1_VJ: {type: Number},
  	MHTTVA2_VJ: {type: Number},
  	MHTTVA3_VJ: {type: Number},
  	MHTTVA4_VJ: {type: Number},
  	DONFID_VJ: {type: Number},
  	VT_ANNULE: {type: Boolean},
  },
  {
    collection: 'vente'
  },
  {
    toJSON: { virtuals: true }
  }
);

// Populate virtuals
VenteSchema.virtual('adherent', {
  ref: 'Adherent',
  localField: 'CODE_AD',
  foreignField: 'CODE_AD',
  justOne: true
});

// Virtual for Vente's URL
VenteSchema
.virtual('url')
.get(function () {
  return '/vente/' + this._id;
});

//Export model
module.exports = mongoose.model('Vente', VenteSchema);
