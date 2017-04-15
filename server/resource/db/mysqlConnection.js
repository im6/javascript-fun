var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 8,
  host     : process.env['OPENSHIFT_MYSQL_DB_HOST'],
  port     : process.env['OPENSHIFT_MYSQL_DB_PORT'],
  user     : process.env['SQL_USERNAME'],
  password : process.env['SQL_PASSWORD'],
  database : process.env['SQL_DATABASE']
});

module.exports = {
  getPool: function(){
    return pool;
  }
};