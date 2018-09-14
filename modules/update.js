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

exports.log = function (type, evt) {
  mongoose.Promise = global.Promise;
  var Log = require('../models/log');
  var ISODate = moment().toISOString();
  var logItem = {
    DATE_LOG: ISODate,
    TYPE_LOG: type,
    EVT_LOG: evt,
  };
  //console.log(baseUpdate.DATE_UP + " " + baseUpdate.BASE_UP);
  mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }, function(err) {
    Log.save(
      logItem,
      function (err, doc) {
        if (err) console.log(err);
    });
  });
}
