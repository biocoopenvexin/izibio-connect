// ADHERENT : liste des adhérents

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdherentSchema = new Schema(
  {
    CODE_AD: {type: Number, required: true},
    NOM_AD: {type: String},
    PRENOM_AD: {type: String},
    CIVIL_AD: {type: String},
    RUE_AD: {type: String},
    RUE2_AD: {type: String},
    CPOST_AD: {type: String, maxlength: 5, minlength: 5},
    VILLE_AD: {type: String},
    TEL_AD: {type: String, maxlength: 10, minlength: 10},
    MEL_AD: {type: String},
    CLASSE_AD: {type: String},
    DATAD_AD: {type: Date},
    //MOISANN_AD: {type: Number, max: 12},
    //ANNIVER_AD: {type: String},
    //AVCONS_AD: {type: String},
    //NBPS_AD: {type: Number},
    //PARSOC_AD: {type: String} NUMERIC(10,2) NULL DEFAULT NULL,
    //"CUMULER_AD" VARCHAR(1) NULL DEFAULT NULL,
    //"MESSAG_AD" VARCHAR(60) NULL DEFAULT NULL,
    //"MARQUE_AD" VARCHAR(1) NULL DEFAULT NULL,
    //"EMPRUNT_AD" INT(10,0) NULL DEFAULT NULL,
    //"MAXCRED_AD" NUMERIC(9,2) NULL DEFAULT NULL,
    //"NONAVOI_AD" VARCHAR(1) NULL DEFAULT NULL,
    //"LIMCRED_AD" VARCHAR(1) NULL DEFAULT NULL,
    //"REMISE_AD" NUMERIC(4,1) NULL DEFAULT NULL,
    //"RMZBLOQ_AD" BIT NOT NULL DEFAULT ((0)),
    //"REDUCA_AD" BIT NOT NULL DEFAULT ((0)),
    //"ACHISTO_AD" VARCHAR(1) NULL DEFAULT NULL,
    //"DATMOD_AD" VARCHAR(12) NULL DEFAULT NULL,
    //"CMTAIRE_AD" VARCHAR(120) NULL DEFAULT NULL,
    //"INFO_AD" VARCHAR(30) NULL DEFAULT NULL,
    //"NONVTE_AD" BIT NOT NULL DEFAULT ((0)),
    //"RETRO_CO" BIT NOT NULL DEFAULT ((0)),
    //"CODE_FO" INT(10,0) NULL DEFAULT NULL,
    DERPASS_AD: {type: Date},
    //"DATFID_AD" DATE(0) NULL DEFAULT NULL,
    //"CUMFID_AD" NUMERIC(10,2) NULL DEFAULT NULL,
    CUMACH_AD: {type: Number},
    //"ID_OP" VARCHAR(12) NULL DEFAULT NULL,
    //"CODEP_AD" INT(10,0) NULL DEFAULT NULL,
    //"EXP_BLOCKED" BIT NOT NULL DEFAULT ((0)),
    SYNC_DATE: {type: Date},
    //"SYNC_FROM" TINYINT(3,0) NULL DEFAULT NULL,
    //"SYNC_BLOCKED" BIT NOT NULL DEFAULT ((0)),
    MODIF_DATE: {type: Date},
    //"MODIF_BY" VARCHAR(128) NULL DEFAULT (host_name()),
    CREAT_DATE: {type: Date},
    //"CREAT_BY" VARCHAR(128) NULL DEFAULT (host_name()),
    //"PUBOK_AD" BIT NOT NULL DEFAULT ((0)),
    //"SMSOK_AD" BIT NOT NULL DEFAULT ((0)),
    //"MAILOK_AD" BIT NOT NULL DEFAULT ((0)),
    TELMOBI_AD: {type: String, maxlength: 10, minlength: 10},
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
