import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Observable } from 'rxjs';

const dynamodb = new DynamoDB({ apiVersion: '2012-08-10' });

const getDynamoScan$ = (params) =>
  new Observable((subscriber) => {
    dynamodb.scan(params, (err, raw) => {
      if (err) {
        subscriber.error(err);
        return;
      }
      const data = raw.Items.map((v) => unmarshall(v));
      subscriber.next(data);
      subscriber.complete();
    });
  });

export const getCategory$ = () =>
  getDynamoScan$({
    TableName: 'jsfun_category',
  });

export const getSite$ = () => getDynamoScan$({ TableName: 'jsfun_site' });

export const getGithub$ = () =>
  getDynamoScan$({
    TableName: 'jsfun_git',
    // ScanFilter: {
    //   category: {
    //     ComparisonOperator: 'EQ',
    //     AttributeValueList: [
    //       {
    //         N: '1',
    //       },
    //     ],
    //   },
    // },
  });
