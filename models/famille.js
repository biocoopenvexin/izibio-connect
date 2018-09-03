// FAMILLE : familles de produits

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UpdateSchema = new Schema(
  {
    "FAMILLE_PR" VARCHAR(6) NOT NULL,
  	"SOUFAMI_PR" VARCHAR(6) NOT NULL DEFAULT ((0)),
  	"NOMFAMI_FM" VARCHAR(60) NULL DEFAULT NULL,
  	"NOMSOUF_FM" VARCHAR(60) NULL DEFAULT NULL,
  	"LIBEL_FM" VARCHAR(80) NULL DEFAULT NULL,
  	"EXP_BLOCKED" BIT NOT NULL DEFAULT ((0)),
  	"SYNC_DATE" DATETIME(3) NULL DEFAULT NULL,
  	"SYNC_FROM" TINYINT(3,0) NULL DEFAULT NULL,
  	"SYNC_BLOCKED" BIT NOT NULL DEFAULT ((0)),
  	"MODIF_DATE" DATETIME(3) NULL DEFAULT (getdate()),
  	"MODIF_BY" VARCHAR(128) NULL DEFAULT (host_name()),
  	"CREAT_DATE" DATETIME(3) NULL DEFAULT (getdate()),
  	"CREAT_BY" VARCHAR(128) NULL DEFAULT (host_name()),
  }
);

// Virtual for Update's URL
UpdateSchema
.virtual('url')
.get(function () {
  return '/famille/' + this._id;
});

//Export model
module.exports = mongoose.model('Update', UpdateSchema);
