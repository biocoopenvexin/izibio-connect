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

// Les API
getApi("adherents", "dbo.ADHERENT");
getApi("catalogue", "dbo.CATALOGUE_COMPLET");
getApi("fournisseurs", "dbo.FOURNIS");


// Mongo Connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

var adherentRouter = require('./routes/adherentRoute');
app.use('/', adherentRouter);

// Mise à jour intégrale de la base adherent
var Adherent = require('./models/adherent');
axios.get('http://localhost:5000/api/adherents')
  .then(function (response) {
    //Adherent.insertMany(response.data);
    //console.log('Adhérents à jour !');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Mise à jour des données classiques
cron.schedule('* * * * *', function(){
  //console.log('running a task');
});

// Mise à jour CA quotidien
cron.schedule('* 30 19 * * *', function(){
  //console.log('running a task');
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
