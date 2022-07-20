const AWS = require('aws-sdk');
import { forkJoin, Observable } from 'rxjs';

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const getDynamoScan$ = (params) =>
  new Observable((subscriber) => {
    dynamodb.scan(params, (err, raw) => {
      if (err) {
        subscriber.error(err);
        return;
      }
      const data = raw.Items.map((v) => AWS.DynamoDB.Converter.unmarshall(v));
      subscriber.next(data);
      subscriber.complete();
    });
  });

export const getDynamoPut$ = (table, item) =>
  new Observable((subscriber) => {
    const params = {
      TableName: table,
      Item: AWS.DynamoDB.Converter.marshall(item),
      ReturnConsumedCapacity: 'TOTAL',
    };
    dynamodb.putItem(params, (err, data) => {
      if (err) {
        subscriber.error(err);
        return;
      }
      subscriber.next(data);
      subscriber.complete();
    });
  });

export const dynamoScanGitAndCategory$ = forkJoin([
  getDynamoScan$({ TableName: 'jsfun_git' }),
  getDynamoScan$({ TableName: 'jsfun_category' }),
]);
