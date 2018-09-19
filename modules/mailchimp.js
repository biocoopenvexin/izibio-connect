const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const axios = require('axios');

var baseUpdate = require('./update');

require('dotenv').config();

// process.env.MSSQLCONNECTION

// Gestion de la liste Mailchimp
exports.updateMailchimp = function() {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

  var Adherent = require('../models/adherent');
  Adherent.find({}, function(err, adherents) {
    adherents.forEach(function(adherent) {
      if (adherent.MEL_AD !== null) {
        const hash_mail = md5(adherent.MEL_AD);
        axios.get('https://' + process.env.MAILCHIMP_SERVER + '.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST + '/members/' + hash_mail, {
          // proxy: {
          //   host: '142.93.248.145',
          //   port: 80,
          //   },
          auth:
            {
              username: 'anystring',
              password: process.env.MAILCHIMP_API,
            }
          })
          .then(function(response){
          })
          .catch(function (error) {
            // handle errors
            console.log(error.response.status);
            if (error.response.status == 404)
            {
             console.log(adherent.MEL_AD + " " + error.response.status);
             addMember(adherent);
           } else if (error.response.status == 503) {
             console.log("Service unavailable");
           } else {
             console.log("OK");
           }
          });
      }
    });
  });
}

exports.updateMailchimpSingle = function(adh) {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

  var Adherent = require('../models/adherent');
  Adherent.findOne({CODE_AD: adh.CODE_AD}, function(err, doc) {
      if (doc.MEL_AD !== null) {
        const hash_mail = md5(doc.MEL_AD);
        axios.get('https://' + process.env.MAILCHIMP_SERVER + '.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST + '/members/' + hash_mail, {
          auth:
            {
              username: 'anystring',
              password: process.env.MAILCHIMP_API,
            }
          })
          .then(function(response){
          })
          .catch(function (error) {
            // handle errors
            //console.log(error.response.status);
            if (error.response.status == 404)
            {
             console.log(doc.MEL_AD + " " + error.response.status);
             addMember(doc);
             //console.log(doc.CODE_AD);
           } else if (error.response.status == 503) {
             console.log("Service unavailable");
           } else {
             console.log("OK");
           }
          });
      }
  });
}

var addMember = function(adherent) {
  axios({
    method: 'post',
    url: 'https://' + process.env.MAILCHIMP_SERVER + '.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST + '/members/',
    auth:
      {
        username: 'anystring',
        password: process.env.MAILCHIMP_API,
      },
    headers:
      {
        Authorization: process.env.MAILCHIMP_API,
        'Content-Type': 'application/json;charset=utf-8'
      },
    data:
      {
        "email_address": adherent.MEL_AD,
        "status": "subscribed",
        "merge_fields": {
          "FNAME": adherent.PRENOM_AD,
          "LNAME": adherent.NOM_AD,
          "MMERGE4": adherent.CODE_AD
        }
      }
    })
    .then(function(response){
      if (response.data.status === 200) {
         //console.log(adherent.MEL_AD + " inscrit !");
         baseUpdate.log("success", adherent.MEL_AD + " inscrit !");
       }
    })
    .catch(function (error) {
       //console.log("Inscription échouée pour " + adherent.MEL_AD + ". Code " + error.response.status);
       baseUpdate.log("error", "Inscription échouée pour " + adherent.MEL_AD + ". Code " + error.response.status);
    });
}
