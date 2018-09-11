require('dotenv').config();
var mongoose = require('mongoose');
var moment = require('moment');
moment.locale('fr');

exports.updateDate = function (db) {
  mongoose.Promise = global.Promise;
  var Update = require('../models/update');
  var ISODate = moment().toISOString();
  var baseUpdate = {
    DATE_UP: ISODate,
    BASE_UP: db,
  };
  //console.log(baseUpdate.DATE_UP + " " + baseUpdate.BASE_UP);
  mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }, function(err) {
    Update.findOneAndUpdate(
      {BASE_UP : db},
      baseUpdate,
      {upsert: true},
      function (err, doc) {
        if (err) console.log(err);
    });
  });
}
