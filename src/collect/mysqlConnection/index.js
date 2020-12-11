import mysql from 'mysql';

const getConn = () =>
  mysql.createConnection({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  });

(() => {
  const testConn = getConn();
  testConn.connect((err) => {
    if (err) {
      console.error('mySQL connect error.');
      throw err;
    }
    console.log('mySQL connect successfully.');
    testConn.end();
  });
})();

export default (qr, cb) => {
  const conn = getConn();
  conn.query(qr, (err, rows) => {
    cb(err, rows);
  });
  conn.end();
};
