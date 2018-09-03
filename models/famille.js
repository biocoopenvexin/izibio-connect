// FAMILLE : familles de produits

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FamilleSchema = new Schema(
  {
    FAMILLE_PR: {type: String},
  	SOUFAMI_PR: {type: String},
  	NOMFAMI_FM: {type: String},
  	NOMSOUF_FM: {type: String},
  	LIBEL_FM: {type: String},
  	//EXP_BLOCKED BIT NOT NULL DEFAULT ((0)),
  	//SYNC_DATE DATETIME(3) NULL DEFAULT NULL,
  	//SYNC_FROM TINYINT(3,0) NULL DEFAULT NULL,
  	//SYNC_BLOCKED BIT NOT NULL DEFAULT ((0)),
  	MODIF_DATE: {type: Date},
  	//MODIF_BY VARCHAR(128) NULL DEFAULT (host_name()),
  	CREAT_DATE: {type: Date},
  	//CREAT_BY VARCHAR(128) NULL DEFAULT (host_name()),
  }
);

// Virtual for Famille's URL
FamilleSchema
.virtual('url')
.get(function () {
  return '/famille/' + this._id;
});

//Export model
module.exports = mongoose.model('Famille', FamilleSchema);
