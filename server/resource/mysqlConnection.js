const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 2,
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

module.exports = {
  sqlExecOne: qr =>
    new Promise((resolve, reject) => {
      pool.query(qr, (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }),
};
