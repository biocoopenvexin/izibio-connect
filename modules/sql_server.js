require('dotenv').config();

exports.executeQuery = function (res, query) {
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
