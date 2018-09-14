// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');
const app = express();

var sql = require('./modules/sql_server');
var mailchimp = require('./modules/mailchimp');
var baseUpdate = require('./modules/update');

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//GET API
var getApi = function (url, db) {
  app.get("/api/" + url, function(req, res){
    var query = "select * from " + db;
    sql.executeQuery (res, query);
  } );
};

var getUpdateApi = function (url, db) {

  app.get("/api/" + url, function(req, res){

    var Update = require('./models/update');
    Update.findOne({"BASE_UP": url}, "DATE_UP", function(err, date) {
        if (err) return handleError(err);
        var lastUpdate = date.DATE_UP.toISOString();
        console.log(lastUpdate);
        var query = "select * from " + db + " WHERE MODIF_DATE > '" + lastUpdate + "' OR CREAT_DATE > '" + lastUpdate + "'";
        console.log(query);
        sql.executeQuery (res, query);
    });


  } );

};

getUpdateApi("adherent", "dbo.ADHERENT");

// Les API
//getApi("adherent", "dbo.ADHERENT");
getApi("caismois", "dbo.CAISMOIS");
getApi("classe", "dbo.CLASSES");
getApi("famille", "dbo.FAMILLES");
getApi("catalogue", "dbo.CATALOGUE_COMPLET");
getApi("fournisseur", "dbo.FOURNIS");
getApi("mvtstock", "dbo.MVT_STOCKS");
getApi("produit", "dbo.PRODUITS");
getApi("prohijo", "dbo.PROHIJO");
getApi("prohimo", "dbo.PROHIMO");
getApi("rayon", "dbo.RAYONS");
getApi("vente", "dbo.VENTE");
getApi("ventedt", "dbo.VENTEDT");
getApi("ventic", "dbo.VENTIC");
getApi("ventmois", "dbo.VENTMOIS");
getApi("vtecredba", "dbo.VTECREDBA");

// Mongo Connection
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

// Définition des routes
var adherentRouter = require('./routes/adherentRoute');
app.use('/adherent', adherentRouter);

// Récupération des modèles
var Adherent = require('./models/adherent');
var CaisMois = require('./models/caisMois');
var Classe = require('./models/classe');
var Famille = require('./models/famille');
var Fournisseur = require('./models/fournisseur');
var MvtStock = require('./models/mvtStock');
var Produit = require('./models/produit');
var ProHiJo = require('./models/prohijo');
var ProHiMo = require('./models/prohimo');
var Rayon = require('./models/rayon');
var Update = require('./models/update');
var Vente = require('./models/vente');
var VenteDt = require('./models/ventedt');
var VentIc = require('./models/ventic');
var VentMoi = require('./models/ventmois');
var VteCredBa = require('./models/vtecredba');

// Mise à jour intégrale de la base
// Vérifier la date de la dernière mise à jour avec update, en fonction du type de base
function updateCollection(model, url) {


  axios.get('http://localhost:5000/api/' + url)
    .then(function (response) {
      // traverse the document
      if (response.data.length > 0) {
        for (var i = 0; i < response.data.length; i++) {
          var newDocument = response.data[i];
          switch(url) {
            case "adherent":
              var query = {CODE_AD: newDocument.CODE_AD};
              break;
            case "caismois":
              var query = {ID_CA: newDocument.ID_CA};
              break;
            case "classe":
              var query = {CLASSE_PR: newDocument.CLASSE_PR};
              break;
            case "famille":
              query = {FAMILLE_PR: newDocument.FAMILLE_PR};
              break;
            case "fournisseur":
              query = {CODE_FO: newDocument.CODE_FO};
              break;
          }
          model.findOneAndUpdate(
            query,
            {"$set": newDocument},
            {
              upsert: true,
              new: true,
            }, function(err, doc){
              if(err){
                  console.log("Something wrong when updating data!");
              } else {
                baseUpdate.updateDate(url);
              }
            }
          )
        }
      } else {
        console.log("Pas de mise à jour pour " + url);
      }
    })
    .catch(function (error) {
      // handle errors
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

// Mise à jour de certaines données, toutes les minutes
// Ventes temps réel
// Mouvements de stocks
// Fiches produits
cron.schedule('* * * * *', function(){
  console.log('running minute update');
  // Gestion de la liste Mailchimp
  //mailchimp.updateMailchimp();
  updateCollection(Adherent, 'adherent');
});

// Liste de l'ensemble des ventes, une fois par jour le matin après le démarrage
// Base adhérents
// Rayons, classes, familles

  //updateCollection(Fournisseur, 'fournisseur');

// Mise à jour CA quotidien, tous les jours à 19h30 et toutes les secondes
cron.schedule('* 30 19 * * *', function(){
  console.log('running daily 19:30 task');
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
