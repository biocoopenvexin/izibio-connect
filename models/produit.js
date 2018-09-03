// UPDATE : traçage des mises à jour depuis MSSQL.
// Un seul document par collection, dont la date est MàJ au fur et à mesure

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProduitSchema = new Schema(
  {
    CODARC_PR: {type: String},
  	CODE_PR: {type: Number},
  	DATE_PR: {type: Date},
  	LIBEL_PR: {type: String},
  	ORIGINE_PR: {type: String},
  	FOURNI_PR: {type: Number}, // clé fournisseur/CODE_FO
  	FOUREF_PR: {type: String},
  	FOURNI2_PR: {type: Number}, // clé fournisseur/CODE_FO
  	FOUREF2_PR: {type: String},
  	CODBAR_PR: {type: String},
  	CODBAR2_PR: {type: String},
  	NBCBAR2_PR: {type: Number},
  	CRDCB2_PR: {type: String},
  	DUPCOB_PR: {type: Boolean},
  	FAMILLE_PR: {type: String}, // clé famille/FAMILLE_PR
  	SOUFAMI_PR: {type: String}, // clé famille/sous-famille/SOUFAMI_PR
  	TYPE_PR: {type: Number},
  	CLASSE_PR: {type: String}, // clé classe/CLASSE_PR
  	RAYON_PR: {type: String}, // clé rayon/RAYON_PR
  	INDISP_PR: {type: Boolean},
  	BJP_PR: {type: Boolean},
  	EMBLEM_PR: {type: Boolean},
  	CONSIGN_PR: {type: Number},
  	CTVA_PR: {type: Number},
  	PRIXA_PR: {type: Number},
  	PRIXA2_PR: {type: Number},
  	CMARGE_PR: {type: String},
  	MARGE_PR: {type: Number},
  	DATMRG_PR: {type: String},
  	PRIXV1_PR: {type: Number},
  	DATPV1_PR: {type: String},
  	PVBLOQ_PR: {type: Boolean},
  	REDUCA_PR: {type: Number},
  	FIDELI_PR: {type: Number},
  	NONRED_PR: {type: Boolean},
  	NONRMZ_PR: {type: Boolean},
  	PRIXV2_PR: {type: Number},
  	PV2RMZ_PR: {type: Boolean},
  	PV2DEB_PR: {type: Date},
  	PV2FIN_PR: {type: Date},
  	PV2FIL_PR: {type: Boolean},
  	PV2ETIQ_PR: {type: Boolean},
  	MINIMAX_PR: {type: Boolean},
  	QMINI_PR: {type: Number},
  	QMAXI_PR: {type: Number},
  	QLOT_PR: {type: Number},
  	QLOT2_PR: {type: Number},
  	QCOMIN_PR: {type: Number},
  	QCOMIN2_PR: {type: Number},
  	CONDI_PR: {type: Number},
  	UNITE_PR: {type: Number},
  	UNISEC_PR: {type: Boolean},
  	ETIQ_PR: {type: String},
  	ETIQ2_PR: {type: String},
  	MARQUE_PR: {type: String},
  	MODETIQ_PR: {type: Boolean},
  	SOMMEIL_PR: {type: Boolean},
  	DATREV_PR: {type: Date},
  	NONVTE_PR: {type: Boolean},
  	SUPPRIM_PR: {type: Boolean},
  	VALGEN_PR: {type: Boolean},
  	DATMOD_PR: {type: String},
  	NDXMOD_PR: {type: Number},
  	CMTAIRE_PR: {type: String},
  	CMTAIR2_PR: {type: String},
  	MESSAG_PR: {type: String},
  	DISCNB_PR: {type: Number},
  	DISCRED_PR: {type: Number},
  	DISC_PR: {type: Boolean},
  	DATVEN_PR: {type: Date},
  	TVENDU_PR: {type: Number},
  	CAHT_PR: {type: Number},
  	QVENDU_PR: {type: Number},
  	TMARGE_PR: {type: Number},
  	TREMISE_PR: {type: Number},
  	TVENTJ_PR: {type: Number},
  	QVENTJ_PR: {type: Number},
  	CONSO_PR: {type: Number},
  	NBCONSO_PR: {type: Number},
  	TPERDU_PR: {type: Number},
  	QPERDU_PR: {type: Number},
  	QPERDJ_PR: {type: Number},
  	QCOM_PR: {type: Number},
  	DATLIV_PR: {type: Date},
  	QLIV_PR: {type: Number},
  	QPERDL_PR: {type: Number},
  	QVENTL_PR: {type: Number},
  	TACHAT_PR: {type: Number},
  	QACHAT_PR: {type: Number},
  	QACHAJ_PR: {type: Number},
  	ASTOCK_PR: {type: Number},
  	STOCK0_PR: {type: Number},
  	STOCK1_PR: {type: Number},
  	STOCK_PR: {type: Number},
  	STOMOY_PR: {type: Number},
  	STORUPT_PR: {type: Number},
  	VSTOCK0_PR: {type: Number},
  	VESTOCK_PR: {type: Number},
  	BJPSEL_PR: {type: Boolean},
  	LOCAL_PR: {type: Boolean},
  	HORSCH_PR: {type: Boolean},
  	ENSEMBL_PR: {type: Boolean},
  	//EXPORT_RECORD" BIT NOT NULL DEFAULT ((1)),
  	//SYNC_DATE" DATETIME(3) NULL DEFAULT NULL,
  	//SYNC_FROM" TINYINT(3,0) NULL DEFAULT NULL,
  	//SYNC_BLOCKED" BIT NOT NULL DEFAULT ((0)),
  	MODIF_DATE: {type: Date},
  	//MODIF_BY" VARCHAR(128) NULL DEFAULT (host_name()),
  	CREAT_DATE: {type: Date},
  	//CREAT_BY" VARCHAR(128) NULL DEFAULT (host_name()),
  	CAHTJ_PR: {type: Number},
  	MARGE_DATE_PR: {type: Date},
  	PRIXV_DATE_PR: {type: Date},
  	OPECOM_ID: {type: String},
  	DISCPV2_PR: {type: Boolean},
  },
  {
    toJSON: { virtuals: true }
  }
);

// Populate virtuals
ProduitSchema.virtual('fournisseur', {
  ref: 'Fournisseur',
  localField: 'FOURNI_PR',
  foreignField: 'CODE_FO',
  justOne: true
});
ProduitSchema.virtual('fournisseur2', {
  ref: 'Fournisseur',
  localField: 'FOURNI2_PR',
  foreignField: 'CODE_FO',
  justOne: true
});
ProduitSchema.virtual('famille', {
  ref: 'Famille',
  localField: 'FAMILLE_PR',
  foreignField: 'FAMILLE_PR',
  justOne: true
});
ProduitSchema.virtual('sous_famille', {
  ref: 'Famille',
  localField: 'SOUFAMI_PR',
  foreignField: 'SOUFAMI_PR',
  justOne: true
});
ProduitSchema.virtual('classe', {
  ref: 'Classe',
  localField: 'CLASSE_PR',
  foreignField: 'CLASSE_PR',
  justOne: true
});
ProduitSchema.virtual('rayon', {
  ref: 'Rayon',
  localField: 'RAYON_PR',
  foreignField: 'RAYON_PR',
  justOne: true
});

// Virtual for Produit's URL
ProduitSchema
.virtual('url')
.get(function () {
  return '/update/' + this._id;
});

//Export model
module.exports = mongoose.model('Produit', ProduitSchema);
