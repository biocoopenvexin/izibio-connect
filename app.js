// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
