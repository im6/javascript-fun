import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const dynamodb = new DynamoDB({ apiVersion: '2012-08-10' });

export const validateGithubUrl = (url) =>
  new Promise((resolve, reject) => {
    const params = {
      TableName: 'jsfun_git',
      ScanFilter: {
        github: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [
            {
              S: url,
            },
          ],
        },
      },
    };
    dynamodb.scan(params, (err, raw) => {
      if (err) {
        reject(err);
        return;
      }
      const data = raw.Items.map((v) => unmarshall(v));
      const existed = data.length > 0;
      resolve(existed);
    });
  });

export const validateWebUrl = (url) =>
  new Promise((resolve, reject) => {
    const params = {
      TableName: 'jsfun_site',
      ScanFilter: {
        url: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [
            {
              S: url,
            },
          ],
        },
      },
    };
    dynamodb.scan(params, (err, raw) => {
      if (err) {
        reject(err);
        return;
      }
      const data = raw.Items.map((v) => unmarshall(v));
      const existed = data.length > 0;
      resolve(existed);
    });
  });

export const validateCategoryName = (name) =>
  new Promise((resolve, reject) => {
    const params = {
      TableName: 'jsfun_category',
      ScanFilter: {
        name: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [
            {
              S: name,
            },
          ],
        },
      },
    };
    dynamodb.scan(params, (err, raw) => {
      if (err) {
        reject(err);
        return;
      }
      const data = raw.Items.map((v) => unmarshall(v));
      resolve(data);
    });
  });

export const putNewEntry = (table, item) =>
  new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      Item: marshall(item),
      ReturnConsumedCapacity: 'TOTAL',
    };
    dynamodb.putItem(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
