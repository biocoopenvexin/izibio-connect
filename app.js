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
        switch (url) {
          case "adherent":
            var query = "select * from " + db + " WHERE MODIF_DATE > '" + lastUpdate + "' OR CREAT_DATE > '" + lastUpdate + "'";
            break;
          case "caismois":
            var query = "select * from " + db + " WHERE DATE_CA > '" + lastUpdate + "'";
            break;
          case "fournisseur":
            var query = "select * from " + db + " WHERE MODIF_DATE > '" + lastUpdate + "' OR CREAT_DATE > '" + lastUpdate + "'";
            break;
          case "mvtstock":
            var query = "select * from " + db + " WHERE DATE_MVT > '" + lastUpdate + "'";
            break;
          case "produit":
            var query = "select * from " + db + " WHERE MODIF_DATE > '" + lastUpdate + "' OR CREAT_DATE > '" + lastUpdate + "'";
            break;
          case "prohijo":
            var query = "select * from " + db + " WHERE DATVEN_PR > '" + lastUpdate + "'";
            break;
          case "vente":
            var query = "select * from " + db + " WHERE DATE_VJ > '" + lastUpdate + "'";
            break;
          case "ventedt":
            var query = "select * from " + db + " WHERE DATE_VJ > '" + lastUpdate + "'";
            break;
          case "ventic":
            var query = "select * from " + db + " WHERE DATE_VJ > '" + lastUpdate + "'";
            break;
          case "ventmois":
            var query = "select * from " + db + " WHERE DATE_VJ > '" + lastUpdate + "'";
            break;
          default:
            var query = "select * from " + db;
        }

        //console.log(query);
        sql.executeQuery (res, query);
    });
  });
};

// // Les API
// //getApi("adherent", "dbo.ADHERENT");
// getApi("caismois", "dbo.CAISMOIS");
// getApi("classe", "dbo.CLASSES");
// getApi("famille", "dbo.FAMILLES");
// getApi("catalogue", "dbo.CATALOGUE_COMPLET");
// getApi("fournisseur", "dbo.FOURNIS");
// getApi("mvtstock", "dbo.MVT_STOCKS");
// getApi("produit", "dbo.PRODUITS");
// getApi("prohijo", "dbo.PROHIJO");
// getApi("prohimo", "dbo.PROHIMO");
// getApi("rayon", "dbo.RAYONS");
// getApi("vente", "dbo.VENTE");
// getApi("ventedt", "dbo.VENTEDT");
// getApi("ventic", "dbo.VENTIC");
// getApi("ventmois", "dbo.VENTMOIS");
// getApi("vtecredba", "dbo.VTECREDBA");

// Mongo Connection
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
			console.log('db.error ' + err);
		});
		mongoose.connection.on('connected', () => {

    });
// Définition des routes
var adherentRouter = require('./routes/adherentRoute');
app.use('/adherent', adherentRouter);

// Récupération des modèles
var Adherent = require('./models/adherent');
var CaisMois = require('./models/caisMois');
var Classe = require('./models/classe');
var Famille = require('./models/famille');
var Fournisseur = require('./models/fournisseur');
var Log = require('./models/log');
var MvtStock = require('./models/mvtStock');
var Produit = require('./models/produit');
var ProHiJo = require('./models/prohijo');
var ProHiMo = require('./models/prohimo');
var Rayon = require('./models/rayon');
var Update = require('./models/update');
var Vente = require('./models/vente');
var VenteDt = require('./models/ventedt');
var VentIc = require('./models/ventic');
var VentMois = require('./models/ventmois');
var VteCredBa = require('./models/vtecredba');

// Mise à jour intégrale de la base
// Vérifier la date de la dernière mise à jour avec update, en fonction du type de base
function updateCollection(model, url, db) {

  getUpdateApi(url, db);

  axios.get('http://localhost:5000/api/' + url)
    .then(function (response) {
      // traverse the document
      if (response.data.length > 0) {
        //var erreur = false;
        for (var i = 0; i < response.data.length; i++) {
          //if (erreur) {break;}
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
            case "mvtstock":
              query = {ID: newDocument.ID};
              break;
            case "produit":
              query = {CODE_PR: newDocument.CODE_PR};
              break;
            case "prohijo":
              query = {ID: newDocument.ID};
              break;
            case "rayon":
              query = {RAYON_PR: newDocument.RAYON_PR};
              break;
            case "vente":
              query = {ID: newDocument.ID};
              break;
            case "ventedt":
              query = {ID: newDocument.ID};
              break;
            case "ventic":
              query = {ID: newDocument.ID};
              break;
            case "ventmois":
              query = {ID: newDocument.ID};
              break;
            case "vtecredba":
              query = {ID_OP: newDocument.ID_OP};
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
                  console.log("Something wrong when updating " + url + " data!");
                  //erreur = true;
              } else {
                //baseUpdate.log("success", "Base " + url + " mise à jour !");
              }
            }
          )
          if(url === 'adherent'){
            mailchimp.updateMailchimpSingle(newDocument);
          }
        }
        // if (erreur) {
        //   console.log("erreur");
        // } else {
          baseUpdate.updateDate(url);
        // }
        var evt = "Base " + url + " mise à jour."
        console.log(evt);
      } else {
        console.log("Pas de mise à jour pour " + url);
      }
    })
    .catch(function (error) {
      // handle errors
      console.log(error);
      baseUpdate.log("error", error);
    })
    .then(function () {
      // always executed
    });
}

// Mise à jour de certaines données, toutes les minutes
// Ventes temps réel
// Mouvements de stocks
// Fiches adhérents
cron.schedule('45 * * * *', function(){
  console.log('Running hourly update: Adherents');
  updateCollection(Adherent, 'adherent', "dbo.ADHERENT");
});

// Fiches adhérents
cron.schedule('*/5 * * * *', function(){
  console.log('Running Produits update');
  updateCollection(Produit, 'produit', "dbo.PRODUITS");
});

// Une fois par jour le matin après le démarrage
cron.schedule('0 9 * * *', function(){
  console.log('running daily 9:00 task');
  updateCollection(Fournisseur, 'fournisseur', "dbo.FOURNIS");
  updateCollection(Classe, 'classe', "dbo.CLASSES");
  updateCollection(Famille, 'famille', "dbo.FAMILLES");
  updateCollection(Rayon, 'rayon', "dbo.RAYONS");
});

// Mise à jour CA quotidien, tous les jours à 19h30 et toutes les 30 secondes
cron.schedule('*/30 30 19 * * *', function(){
  console.log('running daily 19:30 task');
  updateCollection(CaisMois, 'caismois', "dbo.CAISMOIS");
  updateCollection(MvtStock, 'mvtstock', "dbo.MVT_STOCKS");
  updateCollection(Vente, 'vente', "dbo.VENTE");
  updateCollection(VenteDt, 'ventedt', "dbo.VENTEDT");
  updateCollection(VentIc, 'ventic', "dbo.VENTIC");
  updateCollection(VentMois, 'ventmois', "dbo.VENTMOIS");
  updateCollection(ProHiJo, 'prohijo', "dbo.PROHIJO");
  //updateCollection(ProHiMo, 'prohimo', "dbo.PROHIMO");
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
