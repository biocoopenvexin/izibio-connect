const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const axios = require('axios');

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
            if (error.response.status == 404)
            {
             console.log(adherent.MEL_AD + " " + error.response.status);
             addMember(adherent);
            }
          });
      }
    });
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
      if (response.data.status == "200") {
         console.log(adherent.MEL_AD + " inscrit !");
       }
    })
    .catch(function (error) {
       console.log(adherent.MEL_AD + " " + error.response.status);
    });
}
