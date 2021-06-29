const mysql = require('mysql');
const { Observable } = require('rxjs');

/* istanbul ignore next */
if (
  !process.env.SQL_HOST ||
  !process.env.SQL_USERNAME ||
  !process.env.SQL_PASSWORD
) {
  console.error('DB connection info missing.'); // eslint-disable-line no-console
  process.exit(1);
}

const getConn = () =>
  mysql.createConnection({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  });

module.exports = (qr) =>
  new Observable((subscriber) => {
    const conn = getConn();
    conn.query(qr, (err, rows) => {
      if (err) {
        subscriber.error(err);
      }
      subscriber.next(rows);
      subscriber.complete();
    });
    conn.end();
  });
