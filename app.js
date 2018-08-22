// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

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

//EXPORT MODULE

var executeQuery = function (res, query) {

    var sql = require('mssql/msnodesqlv8');
    var config = {
      driver: 'msnodesqlv8',
      connectionString: process.env.MSSQLCONNECTION,
    };
    const pool = new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(query)
        }).then(result => {
          let rows = result.recordset
          res.status(200).json(rows);
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: `${err}`})
          sql.close();
        });
}

//GET API - REFACTORISER
var getApi = function (url, db) {
  app.get("/api/" + url, function(req, res){
    var query = "select * from " + db;
    executeQuery (res, query);
  } );
};

// Adherents
getApi("adherents", "dbo.ADHERENT");

//app.get("/api/adherents", function(req , res){
//                var query = "select * from dbo.ADHERENT";
//                executeQuery (res, query);
//});

app.get("/api/catalogue", function(req , res){
                var query = "select * from dbo.CATALOGUE_COMPLET";
                executeQuery (res, query);
});

app.get("/api/fournisseurs", function(req , res){
                var query = "select * from dbo.FOURNIS";
                executeQuery (res, query);
});


// Mongo Connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

var adherentRouter = require('./routes/adherentRoute');
app.use('/', adherentRouter);

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
