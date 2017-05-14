var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 2,
  host     : process.env['OPENSHIFT_MYSQL_DB_HOST'],
  port     : process.env['OPENSHIFT_MYSQL_DB_PORT'],
  user     : process.env['SQL_USERNAME'],
  password : process.env['SQL_PASSWORD'],
  database : process.env['SQL_DATABASE']
});

module.exports = {
  getPool: function(){
    return pool;
  },
  sqlExecOne: function(qr){
    return new Promise(function(resolve, reject){
      pool.query(qr, function(err, rows, fields){
        if(err){
          reject(err);
        }else{
          resolve(rows);
        }
      });
    });
  }
};