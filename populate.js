// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cron = require('node-cron');
const axios = require('axios');
var app = express();

var sql = require('./modules/sql_server');

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

// liste des DB : 0=>Modèle, 1=>Url, 2=>DBMSSQL
var listeDb = {
  Adherent : ["Adherent", "adherent", "dbo.ADHERENT"],
  CaisMois : ["CaisMois", "caismois", "dbo.CAISMOIS"],
  Classe : ["Classe", "classe", "dbo.CLASSES"],
  Fournisseur : ["Fournisseur", "fournisseur", "dbo.FOURNIS"],
  MvtStock : ["MvtStock", "mvtstock", "dbo.MVT_STOCKS"],
  Produit : ["Produit", "produit", "dbo.PRODUITS"],
  ProHiJo : ["ProHiJo", "prohijo", "dbo.PROHIJO"],
  ProHiMo : ["ProHiMo", "prohimo", "dbo.PROHIMO"],
  Rayon : ["Rayon", "rayon", "dbo.RAYONS"],
  Vente : ["Vente", "vente", "dbo.VENTE"],
  VenteDt : ["VenteDt", "ventedt", "dbo.VENTEDT"],
  VentIc : ["VentIc", "ventic", "dbo.VENTIC"],
  VentMois : ["VentMois", "ventmois", "dbo.VENTMOIS"],
  VteCredBa : ["VteCredBa", "vtecredba", "dbo.VTECREDBA"],
}

// Mongo Connection
mongoose.Promise = global.Promise;

//var adherentRouter = require('./routes/adherentRoute');
//app.use('/', adherentRouter);

// Populate collections
for (var db in listeDb) {
  const model = listeDb[db][0];
  const url = listeDb[db][1];
  const mssql = listeDb[db][2];
  //console.log(model+ " " +url+ " " +mssql);
  getApi(url, mssql);
  mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }, function(err, db) {
    db.db.listCollections({name: url})
        .next(function(err, collinfo) {
            if (collinfo) {
                console.log('La collection ' + url + ' existe déjà !');
            } else {
              console.log('La collection ' + url + ' n\'existe pas...');
              // Création de la base
              var modelInsert = require('./models/' + model);
              axios.get('http://localhost:5000/api/' + url)
                .then(function (response) {
                  modelInsert.insertMany(response.data);
                  console.log('Collection ' + url + ' créée !');
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
                .then(function () {
                  // always executed
                });
            }
        });
  });
}

// Population à partir des archives

// var listeDbArc = {
//   CaisMois : ["CaisMois", "caismois", "dbo.ARC_CAISMOIS"],
//   Produit : ["Produit", "produit", "dbo.ARC_PRODUITS"],
//   ProHiJo : ["ProHiJo", "prohijo", "dbo.ARC_PROHIJO"],
//   VentIc : ["VentIc", "ventic", "dbo.ARC_VENTIC"],
// }
//
// for (var db in listeDbArc) {
//   const model = listeDbArc[db][0];
//   const url = listeDbArc[db][1];
//   const mssql = listeDbArc[db][2];
//   //console.log(model+ " " +url+ " " +mssql);
//   sql.getApi(url, mssql, true);
//   mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }, function(err, db) {
//     db.db.listCollections({name: url})
//         .next(function(err, collinfo) {
//             if (collinfo) {
//               console.log('La collection ' + url + ' existe déjà !');
//               // Ajout des archives dans la base
//               var modelInsert = require('./models/' + model);
//               axios.get('http://localhost:5000/api/' + url)
//                 .then(function (response) {
//                   modelInsert.insertMany(response.data);
//                   console.log('Collection ' + url + ' créée !');
//                 })
//                 .catch(function (error) {
//                   // handle error
//                   console.log(error);
//                 })
//                 .then(function () {
//                   // always executed
//                 });
//             } else {
//               console.log('La collection ' + url + ' n\'existe pas...');
//             }
//         });
//   });
// }








var server = app.listen(5000, function () {
    console.log('Server is running..');
});
