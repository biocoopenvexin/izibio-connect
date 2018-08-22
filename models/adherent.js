var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdherentSchema = new Schema(
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
AdherentSchema
.virtual('url')
.get(function () {
  return '/adherent/' + this._id;
});

//Export model
module.exports = mongoose.model('Adherent', AdherentSchema);
