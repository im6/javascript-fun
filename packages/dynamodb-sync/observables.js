const AWS = require('aws-sdk');
const {
  map,
  from,
  concat,
  finalize,
  switchMap,
  concatMap,
  bufferCount,
  Observable,
} = require('rxjs');
const mysqlObservable = require('mysql-observable');
const {
  convertSiteToPutRequest,
  convertGithubToPutRequest,
  convertCategoryToPutRequest,
} = require('./helper');

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const bufferWindowSize = 10;

const dynamoBatchWrite$ = (params) =>
  new Observable((subscriber) => {
    dynamodb.batchWriteItem(params, (err, data) => {
      if (err) {
        subscriber.error(err);
        return;
      }
      subscriber.next(data);
      subscriber.complete();
    });
  });

const categoryBatchWrite$ = mysqlObservable('SELECT * FROM category').pipe(
  switchMap((v) => from(v)),
  bufferCount(bufferWindowSize),
  map((v) => convertCategoryToPutRequest(v)),
  concatMap((v) => dynamoBatchWrite$(v)),
  finalize(() => console.log('category complete.')) // eslint-disable-line no-console
);

const githubBatchWrite$ = mysqlObservable(
  'SELECT * FROM git WHERE grp IS NOT NULL'
).pipe(
  switchMap((v) => from(v)),
  bufferCount(bufferWindowSize),
  map((v) => convertGithubToPutRequest(v)),
  concatMap((v) => dynamoBatchWrite$(v)),
  finalize(() => console.log('github complete.')) // eslint-disable-line no-console
);

const siteBatchWrite$ = mysqlObservable(
  'SELECT * FROM site WHERE grp IS NOT NULL'
).pipe(
  switchMap((v) => from(v)),
  bufferCount(bufferWindowSize),
  map((v) => convertSiteToPutRequest(v)),
  concatMap((v) => dynamoBatchWrite$(v)),
  finalize(() => console.log('site complete.')) // eslint-disable-line no-console
);

const syncTask$ = concat(
  siteBatchWrite$,
  githubBatchWrite$,
  categoryBatchWrite$
);

module.exports = syncTask$;
