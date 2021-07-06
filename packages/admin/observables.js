const { forkJoin } = require('rxjs');
const mysqlObservable = require('mysql-observable');

const sqlRes$ = forkJoin([
  mysqlObservable('SELECT * FROM git'),
  mysqlObservable('SELECT * FROM category'),
]);

module.exports = {
  sqlRes$,
};
