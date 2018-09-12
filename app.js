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

// Les API
getApi("adherent", "dbo.ADHERENT");
getApi("caismois", "dbo.CAISMOIS");
getApi("classes", "dbo.CLASSES");
getApi("familles", "dbo.FAMILLES");
getApi("catalogue", "dbo.CATALOGUE_COMPLET");
getApi("fournisseurs", "dbo.FOURNIS");
getApi("mvtstocks", "dbo.MVT_STOCKS");
getApi("produits", "dbo.PRODUITS");
getApi("prohijo", "dbo.PROHIJO");
getApi("prohimo", "dbo.PROHIMO");
getApi("rayons", "dbo.RAYONS");
getApi("ventes", "dbo.VENTE");
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
function updateCollection(model, url, query) {
  axios.get('http://localhost:5000/api/' + url)
    .then(function (response) {
      // traverse the document
      for (var i = 0; i < response.data.length; i++) {
        var newDocument = response.data[i];
        for (var field in newDocument) {
          let document = {[field]: newDocument[field]};
          var queries = {
            "adherents": {CODE_AD: newDocument.CODE_AD},
            "caismois": {ID_CA: newDocument.ID_CA},
            "classes": {CLASSE_PR: newDocument.CLASSE_PR},
            "familles": {FAMILLE_PR: newDocument.FAMILLE_PR},
            "fournisseurs": {CODE_FO: newDocument.CODE_FO},
            "mvtstock": {ID: newDocument.ID},
            "produit": {CODE_PR: newDocument.CODE_PR},
            "prohijo": {ID: newDocument.ID},
            "prohimo": {MOIS_HM: newDocument.MOIS_HM},
            "rayon": {RAYON_PR: newDocument.RAYON_PR},
            "vente": {NUM_VJ: newDocument.NUM_VJ},
            "ventedt": {NUM_VJ: newDocument.NUM_VJ},
            "ventic": {ID: newDocument.ID},
            "ventmois": {ID_OP: newDocument.ID_OP},
            "vtecredba": {ID_OP: newDocument.ID_OP},
          }

          //const query = {CODE_AD: newDocument.CODE_AD};
          const update = {"$set":document};
          model.findOneAndUpdate(
            queries.url,
            update,
            {
              upsert: true,
            }, function(err, doc){
              if(err){
                  console.log("Something wrong when updating data!");
              } else {
                baseUpdate.updateDate(url);
              }
            }
          )
        }
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

// Gestion de la liste Mailchimp
// mailchimp.updateMailchimp();

// Mise à jour de certaines données, toutes les minutes
// Ventes temps réel
// Mouvements de stocks
// Fiches produits
cron.schedule('* * * * *', function(){
  console.log('running minute update');
  updateCollection(VteCredBa, 'vtecredba');
});

// Liste de l'ensemble des ventes, une fois par jour le matin après le démarrage
// Base adhérents
// Rayons, classes, familles
cron.schedule('45 19 * * *', function(){
  console.log('running daily 19:45 task');
  updateCollection(Adherent, 'adherent');
  updateCollection(VentiIc, 'ventic');
  updateCollection(VentMois, 'ventmois');
  updateCollection(Fournisseur, 'fournisseur');
  updateCollection(Produit, 'produit');
});

cron.schedule('00 9 * * *', function(){
  console.log('running daily 9:00 task');
  updateCollection(ProHiMo, 'prohimo');
  updateCollection(ProHiJo, 'prohijo');

});

// Mise à jour CA quotidien, tous les jours à 19h30 et toutes les secondes
cron.schedule('* 30 19 * * *', function(){
  console.log('running daily 19:30 task');
  updateCollection(CaisMois, 'caismois');
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
